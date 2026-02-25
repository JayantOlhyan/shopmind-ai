import os
import logging
from typing import Dict, Any

from google import genai
from google.genai import types

logger = logging.getLogger(__name__)

class Researcher:
    def __init__(self):
        self.gemini_api_key = os.getenv("GEMINI_API_KEY")
        self.client = genai.Client(api_key=self.gemini_api_key) if self.gemini_api_key else None
        
        # We use Flash by default as it is fast and supports search grounding
        self.model_name = "gemini-2.5-flash"

    def run_research(self, query: str, mode: str, prefs_context: str, history_context: str) -> Dict[str, Any]:
        """
        Runs the research pipeline using Gemini's native Google Search Grounding.
        Returns raw text response and approximate token usage.
        """
        if not self.client:
            return {"text": "Gemini API key not configured. Cannot perform research.", "input_tokens": 0, "output_tokens": 0}
            
        deep_mode = (mode == "deep")
        
        # Build prompt
        system_instruction = (
            "You are an expert E-Commerce Intelligence Research Agent named ShopMind AI. "
            "You analyze product catalogs, customer reviews, pricing, and competitors to generate business insights. "
            "You will be given the user's current query, their historical preferences, past search context, and you MUST use your Google Search capability to find fresh data to answer the query.\n\n"
            f"Mode: {'DEEP (thorough synthesis)' if deep_mode else 'QUICK (fast focused insights)'}"
        )
        
        user_prompt = f"USER QUERY: {query}\n\n"
        
        if prefs_context:
            user_prompt += f"USER PREFERENCES:\n{prefs_context}\n\n"
            
        if history_context:
            user_prompt += f"PAST CONTEXT/HISTORY:\n{history_context}\n\n"
            
        user_prompt += "Please search the web to synthesize this information and provide a comprehensive research response."

        try:
            # Enable Google Search tool for Grounding
            google_search_tool = types.Tool(
                google_search=types.GoogleSearch()
            )
            
            response = self.client.models.generate_content(
                model=self.model_name,
                contents=user_prompt,
                config=types.GenerateContentConfig(
                    system_instruction=system_instruction,
                    tools=[google_search_tool],
                    temperature=0.2
                )
            )
            
            text_result = response.text
            
            # Approximate token counting for Google API (often available in usage_metadata)
            input_tokens = 0
            output_tokens = 0
            if hasattr(response, 'usage_metadata') and response.usage_metadata:
                input_tokens = getattr(response.usage_metadata, 'prompt_token_count', 0)
                output_tokens = getattr(response.usage_metadata, 'candidates_token_count', 0)
            
            return {
                "text": text_result,
                "input_tokens": input_tokens,
                "output_tokens": output_tokens
            }
        except Exception as e:
            logger.error(f"Gemini research failed: {e}")
            return {
                "text": f"Error during research generation: {str(e)}",
                "input_tokens": 0,
                "output_tokens": 0
            }

research_engine = Researcher()
