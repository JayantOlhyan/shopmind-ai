import time
import logging
from typing import Dict, Any

from fastapi import FastAPI, HTTPException
from pydantic import ValidationError

from .models import (
    ResearchRequest, 
    ResearchResponse, 
    PreferenceUpdateRequest, 
    Preferences,
    Finding
)
from .agent import run_agent
from .memory import memory_store
from .cost_tracker import CostTracker

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI(title="ShopMind AI API", version="1.0.0")

@app.post("/research", response_model=ResearchResponse)
async def perform_research(request: ResearchRequest):
    """
    Runs quick or deep research on e-commerce catalogs or queries.
    """
    cost_tracker = CostTracker()
    start_time = time.time()
    
    try:
        # Run LangGraph Agent
        state = run_agent(
            query=request.query,
            mode=request.mode,
            user_id=request.user_id
        )
        
        # Track cost
        cost_tracker.add_tokens(
            state.get("tokens_input", 0), 
            state.get("tokens_output", 0)
        )
        
        # Fallback empty report structure if missing
        report = state.get("final_report") or {
            "summary": "Failed to generate report structure.",
            "findings": [],
            "recommendations": [],
            "sources": [],
            "confidence_score": 0.0
        }
        
        # Map findings from dict to Pydantic objects if needed
        findings_objects = []
        for f in report.get("findings", []):
            try:
                findings_objects.append(Finding(**f))
            except Exception as e:
                logger.warning(f"Skipping badly formatted finding: {e}")
        
        latency = time.time() - start_time
        
        return ResearchResponse(
            query=request.query,
            mode=request.mode,
            success=state.get("success", False) and state.get("error_message") is None,
            summary=report.get("summary", "Fallback summary generated due to error."),
            findings=findings_objects,
            recommendations=report.get("recommendations", []),
            sources=report.get("sources", []),
            confidence_score=report.get("confidence_score", 0.0),
            tokens_used=cost_tracker.get_total_tokens(),
            cost_usd=cost_tracker.get_total_cost(),
            latency_seconds=latency
        )
        
    except Exception as e:
        logger.error(f"Catastrophic error in /research endpoint: {e}")
        latency = time.time() - start_time
        return ResearchResponse(
            query=request.query,
            mode=request.mode,
            success=False,
            summary=f"Critical server error: {str(e)}",
            findings=[],
            recommendations=[],
            sources=[],
            confidence_score=0.0,
            tokens_used=cost_tracker.get_total_tokens(),
            cost_usd=cost_tracker.get_total_cost(),
            latency_seconds=latency
        )

@app.post("/preferences")
async def save_preferences(request: PreferenceUpdateRequest):
    """
    Saves user KPIs, marketplaces, and categories to Qdrant.
    """
    try:
        memory_store.store_preferences(
            user_id=request.user_id,
            preferences=request.preferences.model_dump()
        )
        return {"status": "success", "message": "Preferences saved."}
    except Exception as e:
        logger.error(f"Error saving preferences: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/preferences/{user_id}", response_model=Preferences)
async def fetch_preferences(user_id: str):
    """
    Fetch stored preferences for a user from Qdrant.
    """
    try:
        prefs_dict = memory_store.get_preferences(user_id)
        if not prefs_dict:
            return Preferences() # return default empty preferences
        return Preferences(**prefs_dict)
    except Exception as e:
        logger.error(f"Error fetching preferences: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/health")
async def health_check():
    """Health check endpoint."""
    return {"status": "healthy", "version": "1.0.0"}
