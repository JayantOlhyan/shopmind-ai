import time

class CostTracker:
    # Gemini 1.5/2.5 Flash pricing (approx) per 1000 tokens
    INPUT_COST_PER_1K = 0.000075
    OUTPUT_COST_PER_1K = 0.0003

    def __init__(self):
        self.reset()
        
    def reset(self):
        self.input_tokens = 0
        self.output_tokens = 0
        self.start_time = time.time()
        
    def add_tokens(self, input_toks: int, output_toks: int):
        self.input_tokens += input_toks
        self.output_tokens += output_toks
        
    def get_total_cost(self) -> float:
        input_cost = (self.input_tokens / 1000.0) * self.INPUT_COST_PER_1K
        output_cost = (self.output_tokens / 1000.0) * self.OUTPUT_COST_PER_1K
        return input_cost + output_cost
        
    def get_latency(self) -> float:
        return time.time() - self.start_time
        
    def get_total_tokens(self) -> int:
        return self.input_tokens + self.output_tokens

# Global instance for simplicity in single-request contexts, 
# but in a web app, we track per-request state ideally in the LangGraph State.
