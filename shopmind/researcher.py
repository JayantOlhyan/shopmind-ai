import os
import json
import logging
from typing import Dict, Any, List

from anthropic import Anthropic
from tavily import TavilyClient

logger = logging.getLogger(__name__)

class Researcher:
    def __init__(self):
        self.anthropic_api_key = os.getenv("ANTHROPIC_API_KEY")
        self.tavily_api_key = os.getenv("TAVILY_API_KEY")
        
        # We will use the anthropic SDK directly for simplicity and robustness in error handling
        self.claude = Anthropic(api_key=self.anthropic_api_key) if self.anthropic_api_key else None
        self.tavily = TavilyClient(api_key=self.tavily_api_key) if self.tavily_api_key else None
        
        self.model_name = "claude-3-5-sonnet-20241022" 

    def search_web(self, query: str, deep: bool = False) -> str:
        """Perform a web search. Fallback to empty string if it fails."""
        if not self.tavily:
            logger.warning("TAVILY_API_KEY not set. Skipping web search.")
            return ""
            
        try:
            search_depth = "advanced" if deep else "basic"
            response = self.tavily.search(query=query, search_depth=search_depth, max_results=5)
            
            results = []
            for res in response.get("results", []):
                results.append(f"Title: {res.get('title')}\nURL: {res.get('url')}\nContent: {res.get('content')}")
            
            return "\n\n---\n\n".join(results)
        except Exception as e:
            logger.error(f"Web search failed: {e}")
            return "" # Fallback to no web context -> Claude's knowledge

    def run_research(self, query: str, mode: str, prefs_context: str, history_context: str) -> Dict[str, Any]:
        """
        Runs the research pipeline by fetching web context if necessary, 
        and then calling Claude to synthesize everything.
        Returns raw text response and token usage.
        """
        if not self.claude:
            return {"text": "Anthropic API key not configured. Cannot perform research.", "input_tokens": 0, "output_tokens": 0}
            
        deep_mode = (mode == "deep")
        
        # 1. Fetch web data
        web_context = self.search_web(query, deep=deep_mode)
        
        # 2. Build prompt
        system_prompt = (
            "You are an expert E-Commerce Intelligence Research Agent named ShopMind AI. "
            "You analyze product catalogs, customer reviews, pricing, and competitors to generate business insights. "
            "You will be given the user's current query, their historical preferences, past search context, and fresh web search results.\n\n"
            "If the web search results are empty, rely purely on your internal knowledge to answer the query as best as you can.\n"
            f"Mode: {'DEEP (thorough synthesis)' if deep_mode else 'QUICK (fast focused insights)'}"
        )
        
        user_prompt = f"USER QUERY: {query}\n\n"
        
        if prefs_context:
            user_prompt += f"USER PREFERENCES:\n{prefs_context}\n\n"
            
        if history_context:
            user_prompt += f"PAST CONTEXT/HISTORY:\n{history_context}\n\n"
            
        if web_context:
            user_prompt += f"LIVE WEB SEARCH RESULTS:\n{web_context}\n\n"
        else:
            user_prompt += "LIVE WEB SEARCH RESULTS:\n(Web search failed or unavailable. Rely on your internal knowledge.)\n\n"
            
        user_prompt += "Synthesize this information and provide a comprehensive research response."

        try:
            response = self.claude.messages.create(
                model=self.model_name,
                max_tokens=4000 if deep_mode else 1000,
                system=system_prompt,
                messages=[
                    {"role": "user", "content": user_prompt}
                ]
            )
            
            text_result = response.content[0].text
            input_tokens = response.usage.input_tokens
            output_tokens = response.usage.output_tokens
            
            return {
                "text": text_result,
                "input_tokens": input_tokens,
                "output_tokens": output_tokens
            }
        except Exception as e:
            logger.error(f"Claude research failed: {e}")
            return {
                "text": f"Error during research generation: {str(e)}",
                "input_tokens": 0,
                "output_tokens": 0
            }

research_engine = Researcher()
