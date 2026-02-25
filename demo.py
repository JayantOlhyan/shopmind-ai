import os
from dotenv import load_dotenv

# Load env before importing our modules
load_dotenv()

from shopmind.agent import run_agent

def main():
    print("Welcome to the ShopMind AI Demo!")
    print("---------------------------------")
    
    query = "Why is our wireless earbuds SKU underperforming on Amazon?"
    print(f"Executing Deep Research for Query: '{query}'\n")
    
    print("Running LangGraph Pipeline...")
    state = run_agent(query, mode="deep", user_id="demo_user")
    
    print("\n\n--- RESULTS ---\n")
    
    if not state.get("success"):
        print(f"Error during execution: {state.get('error_message')}")
        return
        
    report = state.get("final_report", {})
    
    print(f"Summary: {report.get('summary')}")
    print("\nFindings:")
    for f in report.get("findings", []):
        if isinstance(f, dict):
            print(f"- {f.get('title')} ({f.get('confidence')}): {f.get('detail')} [Source: {f.get('source')}]")
        else:
            print(f"- {f.title} ({f.confidence}): {f.detail} [Source: {f.source}]")
            
    print("\nRecommendations:")
    for r in report.get("recommendations", []):
        print(f"-> {r}")
        
    print(f"\nCost tracking -> Input Tokens: {state.get('tokens_input')}, Output Tokens: {state.get('tokens_output')}")
    print("Complete!")

if __name__ == "__main__":
    main()
