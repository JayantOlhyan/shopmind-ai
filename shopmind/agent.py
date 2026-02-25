import time
import logging
from typing import Dict, Any

from langgraph.graph import StateGraph, START, END

from .models import AgentState
from .memory import memory_store
from .researcher import research_engine
from .formatter import report_formatter

logger = logging.getLogger(__name__)

def clarify_node(state: AgentState) -> Dict:
    """Node 1: Clarify and rewrite the query if needed."""
    try:
        # In a very complex agent, we could use an LLM here to rewrite the query.
        # For efficiency, we will keep it simple. But we'll add basic cleanup.
        query = state.get("original_query", "").strip()
        
        # A simple implementation might just lowercase or remove trailing punctuation
        # For ShopMind, we just pass it through unless we wanted to expand abbreviations.
        clarified = query
        return {"clarified_query": clarified}
    except Exception as e:
        logger.error(f"Error in clarify_node: {e}")
        return {"clarified_query": state.get("original_query", "")}

def retrieve_memory_node(state: AgentState) -> Dict:
    """Node 2: Pull context from Qdrant history and preferences."""
    try:
        user_id = state.get("user_id", "default")
        query = state.get("clarified_query", state.get("original_query", ""))
        
        prefs_dict = memory_store.get_preferences(user_id)
        
        # Format preferences nicely for the LLM
        prefs_context = ""
        if prefs_dict:
            prefs_context = (
                f"KPIs: {', '.join(prefs_dict.get('kpis', []))}\n"
                f"Marketplaces: {', '.join(prefs_dict.get('marketplaces', []))}\n"
                f"Categories: {', '.join(prefs_dict.get('categories', []))}\n"
                f"Goals: {', '.join(prefs_dict.get('goals', []))}"
            )
            
        history_context = memory_store.query_history(query, user_id, limit=3)
        
        return {
            "preferences_context": prefs_context, 
            "history_context": history_context
        }
    except Exception as e:
        logger.error(f"Error in retrieve_memory_node: {e}")
        return {"preferences_context": "", "history_context": ""}

def research_node(state: AgentState) -> Dict:
    """Node 3: Claude + Tavily web search."""
    try:
        query = state.get("clarified_query", "")
        mode = state.get("mode", "quick")
        prefs_ctx = state.get("preferences_context", "")
        hist_ctx = state.get("history_context", "")
        
        result = research_engine.run_research(query, mode, prefs_ctx, hist_ctx)
        
        return {
            "research_results": result["text"],
            "tokens_input": state.get("tokens_input", 0) + result.get("input_tokens", 0),
            "tokens_output": state.get("tokens_output", 0) + result.get("output_tokens", 0)
        }
    except Exception as e:
        logger.error(f"Error in research_node: {e}")
        return {
            "research_results": f"Research failed internally: {str(e)}", 
            "error_message": str(e),
            "success": False
        }

def format_node(state: AgentState) -> Dict:
    """Node 4: Format output into structured JSON."""
    try:
        raw_results = state.get("research_results", "")
        query = state.get("original_query", "")
        mode = state.get("mode", "quick")
        
        fmt_result = report_formatter.format_to_json(raw_results, query, mode)
        
        return {
            "final_report": fmt_result["report"],
            "tokens_input": state.get("tokens_input", 0) + fmt_result.get("input_tokens", 0),
            "tokens_output": state.get("tokens_output", 0) + fmt_result.get("output_tokens", 0),
            "error_message": fmt_result.get("error") if not state.get("error_message") else state.get("error_message"),
            "success": state.get("success", True) if not fmt_result.get("error") else False
        }
    except Exception as e:
        logger.error(f"Error in format_node: {e}")
        return {
            "error_message": str(e),
            "success": False
        }

def store_memory_node(state: AgentState) -> Dict:
    """Node 5: Save insight back to Qdrant."""
    try:
        user_id = state.get("user_id", "default")
        query = state.get("original_query", "")
        report = state.get("final_report", {})
        
        if state.get("success", False) and report:
            # We store the summary representing the core insight
            insight_context = report.get("summary", "")
            memory_store.store_history(user_id, query, insight_context)
            
        return {}
    except Exception as e:
        logger.error(f"Error in store_memory_node: {e}")
        # Even if memory storage fails, the query succeeded for the user
        return {}

# Build the Graph
def build_agent_graph():
    builder = StateGraph(AgentState)
    
    # Add nodes
    builder.add_node("clarify", clarify_node)
    builder.add_node("retrieve_memory", retrieve_memory_node)
    builder.add_node("research", research_node)
    builder.add_node("format", format_node)
    builder.add_node("store_memory", store_memory_node)
    
    # Add edges
    builder.add_edge(START, "clarify")
    builder.add_edge("clarify", "retrieve_memory")
    builder.add_edge("retrieve_memory", "research")
    builder.add_edge("research", "format")
    builder.add_edge("format", "store_memory")
    builder.add_edge("store_memory", END)
    
    return builder.compile()

# Instantiate the compiled graph for use
agent_graph = build_agent_graph()

def run_agent(query: str, mode: str = "quick", user_id: str = "default") -> AgentState:
    """Main entrypoint to run the LangGraph orchestrated agent."""
    initial_state = {
        "original_query": query,
        "mode": mode,
        "user_id": user_id,
        "clarified_query": "",
        "preferences_context": "",
        "history_context": "",
        "research_results": "",
        "final_report": None,
        "success": True,
        "error_message": None,
        "tokens_input": 0,
        "tokens_output": 0,
        "start_time": time.time()
    }
    
    try:
        final_state = agent_graph.invoke(initial_state)
        return final_state
    except Exception as e:
        logger.error(f"Catastrophic graph failure: {e}")
        # Always return a valid state even on crash
        initial_state["success"] = False
        initial_state["error_message"] = f"CRITICAL Graph failure: {str(e)}"
        
        # Build minimal fallback report
        initial_state["final_report"] = report_formatter._fallback_report(
            "CRITICAL EXCEPTION OCCURRED. SERVER DID NOT CRASH.", query, mode, str(e)
        )["report"]
        
        return initial_state
