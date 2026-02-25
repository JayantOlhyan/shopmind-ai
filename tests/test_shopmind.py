import pytest
from fastapi.testclient import TestClient
from unittest.mock import patch, MagicMock

from shopmind.api import app
from shopmind.models import ResearchResponse, Preferences

client = TestClient(app)

def test_health_endpoint():
    response = client.get("/health")
    assert response.status_code == 200
    assert response.json()["status"] == "healthy"

@patch('shopmind.api.run_agent')
@patch('shopmind.api.CostTracker')
def test_research_endpoint_success(mock_cost_tracker, mock_run_agent):
    # Setup mock
    mock_tracker_instance = mock_cost_tracker.return_value
    mock_tracker_instance.get_total_tokens.return_value = 100
    mock_tracker_instance.get_total_cost.return_value = 0.05
    
    mock_state = {
        "success": True,
        "error_message": None,
        "tokens_input": 50,
        "tokens_output": 50,
        "final_report": {
            "summary": "This is a summary",
            "findings": [{"title": "Test Finding", "detail": "Detail", "source": "Source", "confidence": 0.9}],
            "recommendations": ["Action"],
            "sources": ["Src"],
            "confidence_score": 0.9
        }
    }
    mock_run_agent.return_value = mock_state
    
    # Run test
    response = client.post("/research", json={"query": "test query", "mode": "quick", "user_id": "test_user"})
    assert response.status_code == 200
    data = response.json()
    assert data["success"] is True
    assert data["summary"] == "This is a summary"
    assert data["tokens_used"] == 100

@patch('shopmind.api.memory_store')
def test_preferences_endpoints(mock_memory):
    # Setup mocks
    mock_prefs = {"kpis": ["ROI"], "marketplaces": ["Amazon"], "categories": ["Tech"], "goals": ["Growth"]}
    mock_memory.get_preferences.return_value = mock_prefs
    
    # GET test
    get_response = client.get("/preferences/test_user")
    assert get_response.status_code == 200
    assert get_response.json()["kpis"] == ["ROI"]
    
    # POST test
    post_data = {"user_id": "test_user", "preferences": mock_prefs}
    post_response = client.post("/preferences", json=post_data)
    assert post_response.status_code == 200
    assert post_response.json()["status"] == "success"
    mock_memory.store_preferences.assert_called_once()
