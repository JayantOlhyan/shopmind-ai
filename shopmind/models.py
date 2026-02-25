from pydantic import BaseModel, Field
from typing import List, Optional, Dict, Literal, TypedDict, Annotated, Sequence
import operator
from langchain_core.messages import BaseMessage

class Finding(BaseModel):
    title: str = Field(description="Finding name")
    detail: str = Field(description="Explanation of the finding")
    source: str = Field(description="Where it came from")
    confidence: float = Field(description="Confidence score for this finding")

class ResearchResponse(BaseModel):
    query: str
    mode: Literal["quick", "deep"]
    success: bool
    summary: str
    findings: List[Finding]
    recommendations: List[str]
    sources: List[str]
    confidence_score: float
    tokens_used: int
    cost_usd: float
    latency_seconds: float

class ResearchRequest(BaseModel):
    query: str
    mode: Literal["quick", "deep"] = "quick"
    user_id: str = "default"

class Preferences(BaseModel):
    kpis: List[str] = Field(default_factory=list)
    marketplaces: List[str] = Field(default_factory=list)
    categories: List[str] = Field(default_factory=list)
    goals: List[str] = Field(default_factory=list)

class PreferenceUpdateRequest(BaseModel):
    user_id: str
    preferences: Preferences

# LangGraph State
class AgentState(TypedDict):
    original_query: str
    mode: Literal["quick", "deep"]
    user_id: str
    
    clarified_query: str
    preferences_context: str
    history_context: str
    
    research_results: str
    
    final_report: Optional[Dict] 
    
    # Error tracking
    success: bool
    error_message: Optional[str]
    
    # Cost tracking
    tokens_input: int
    tokens_output: int
    start_time: float
