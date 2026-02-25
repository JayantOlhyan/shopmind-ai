import os
import json
import logging
from typing import Dict, Any

from anthropic import Anthropic

from .models import ResearchResponse, Finding

logger = logging.getLogger(__name__)

class Formatter:
    def __init__(self):
        self.anthropic_api_key = os.getenv("ANTHROPIC_API_KEY")
        self.claude = Anthropic(api_key=self.anthropic_api_key) if self.anthropic_api_key else None
        self.model_name = "claude-3-5-sonnet-20241022"
        
    def format_to_json(self, raw_report: str, query: str, mode: str) -> Dict[str, Any]:
        """
        Takes raw text research and uses Claude to format it into the strict JSON schema.
        Returns a dict: {"report": Dict, "input_tokens": int, "output_tokens": int, "error": Optional[str]}
        """
        if not self.claude:
            return self._fallback_report(raw_report, query, mode, "Anthropic API key missing")
            
        system_prompt = (
            "You are a strict data formatter. Extract information from the provided research text "
            "and format it EXACTLY according to this JSON schema. DO NOT wrap the output in markdown code blocks. "
            "Return ONLY valid, parseable JSON.\n\n"
            "SCHEMA requirements:\n"
            "{\n"
            '  "summary": "2-3 sentence executive summary",\n'
            '  "findings": [\n'
            '    {\n'
            '      "title": "Finding name",\n'
            '      "detail": "Detailed explanation",\n'
            '      "source": "Where it came from",\n'
            '      "confidence": 0.85\n'
            "    }\n"
            "  ],\n"
            '  "recommendations": ["Action 1", "Action 2"],\n'
            '  "sources": ["source1", "source2"],\n'
            '  "confidence_score": 0.85\n'
            "}"
        )
        
        user_prompt = f"Format this raw research text:\n\n{raw_report}"

        try:
            response = self.claude.messages.create(
                model=self.model_name,
                max_tokens=2000,
                system=system_prompt,
                messages=[
                    {"role": "user", "content": user_prompt}
                ],
                temperature=0.0
            )
            
            result_text = response.content[0].text.strip()
            
            # Remove markdown blocks if Claude inserted them anyway
            if result_text.startswith("```json"):
                result_text = result_text[7:]
                if result_text.endswith("```"):
                    result_text = result_text[:-3]
            elif result_text.startswith("```"):
                result_text = result_text[3:]
                if result_text.endswith("```"):
                    result_text = result_text[:-3]
                    
            parsed_json = json.loads(result_text)
            
            # Map core fields that the API will build up
            report = {
                "summary": parsed_json.get("summary", "Summary missing"),
                "findings": parsed_json.get("findings", []),
                "recommendations": parsed_json.get("recommendations", []),
                "sources": parsed_json.get("sources", []),
                "confidence_score": float(parsed_json.get("confidence_score", 0.5))
            }
            
            return {
                "report": report,
                "input_tokens": response.usage.input_tokens,
                "output_tokens": response.usage.output_tokens,
                "error": None
            }
            
        except json.JSONDecodeError as e:
            logger.error(f"JSON parsing failed for report formatter: {e}\nRaw output: {result_text}")
            return self._fallback_report(raw_report, query, mode, f"JSON parse error: {str(e)}")
        except Exception as e:
            logger.error(f"Formatting research failed: {e}")
            return self._fallback_report(raw_report, query, mode, str(e))
            
    def _fallback_report(self, raw_report: str, query: str, mode: str, error_msg: str) -> Dict[str, Any]:
        """Fallback format if JSON formatting fails per requirements."""
        return {
            "report": {
                "summary": raw_report[:1000] + "..." if len(raw_report) > 1000 else raw_report,
                "findings": [],
                "recommendations": ["Formatting failed, manual review of raw output required."],
                "sources": ["Internal Agent Execution"],
                "confidence_score": 0.0
            },
            "input_tokens": 0,
            "output_tokens": 0,
            "error": error_msg
        }

report_formatter = Formatter()
