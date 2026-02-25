"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Search, Zap, Sparkles, ChevronDown, CheckCircle2, Loader2, BrainCircuit } from "lucide-react";

export default function ResearchPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const initialQuery = searchParams.get("q") || "";
  const initialMode = searchParams.get("mode") || "quick";

  const [query, setQuery] = useState(initialQuery);
  const [mode, setMode] = useState(initialMode);
  const [advancedOpen, setAdvancedOpen] = useState(false);

  // Research state
  const [isResearching, setIsResearching] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    "Query clarified",
    "Memory retrieved (3 past reports)",
    "Searching Amazon reviews...",
    "Checking competitor pricing...",
    "Synthesising findings...",
    "Generating report..."
  ];

  const handleStartResearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setIsResearching(true);
    setProgress(0);
    setCurrentStep(0);

    // Simulate backend process and progress bar
    let p = 0;
    const interval = setInterval(() => {
      p += 2;
      setProgress(p);

      if (p > 15) setCurrentStep(1);
      if (p > 30) setCurrentStep(2);
      if (p > 50) setCurrentStep(3);
      if (p > 75) setCurrentStep(4);
      if (p > 90) setCurrentStep(5);

      if (p >= 100) {
        clearInterval(interval);
        // Navigate to mock report page
        setTimeout(() => {
          router.push(`/research/report/dummy-123?q=${encodeURIComponent(query)}&mode=${mode}`);
        }, 500);
      }
    }, 100);
  };

  return (
    <div className="container" style={{ padding: "2rem", display: "flex", gap: "3rem", flexDirection: "row", flexWrap: "wrap" }}>

      {/* Header Area */}
      <div className="flex justify-between items-center w-full mb-2">
        <div>
          <h1 style={{ fontSize: "1.75rem", marginBottom: "0.25rem", color: "var(--text-dark)" }}>Research Engine</h1>
          <p className="text-muted" style={{ fontSize: "0.95rem" }}>Generate custom insight reports using real-time web data.</p>
        </div>
      </div>

      <div className="flex gap-8 w-full flex-wrap" style={{ alignItems: "flex-start" }}>

        {/* LEFT PANEL — Query Input */}
        <div className="flex-col gap-6" style={{ flex: 1.2, minWidth: "350px", backgroundColor: "var(--surface)", padding: "2rem", borderRadius: "16px", border: "1px solid var(--border)", boxShadow: "var(--shadow-sm)" }}>

          <form onSubmit={handleStartResearch} className="flex-col gap-6">

            <textarea
              rows={4}
              placeholder="e.g., Why is our wireless earbuds SKU underperforming on Amazon India?"
              value={query}
              onChange={e => setQuery(e.target.value)}
              style={{
                resize: "none",
                fontSize: "1.1rem",
                boxShadow: "var(--shadow-sm)",
                padding: "1.5rem"
              }}
              disabled={isResearching}
            />
            <div style={{ textAlign: "right", marginTop: "-1rem", fontSize: "0.85rem", color: "var(--text-muted)" }}>
              Character count: {query.length}
            </div>

            <div>
              <label style={{ fontWeight: 600, fontSize: "1.05rem", display: "block", marginBottom: "1rem" }}>Research Mode:</label>
              <div className="flex flex-col gap-3">
                <label
                  className="card flex items-center gap-4"
                  style={{ padding: "1rem 1.5rem", cursor: "pointer", border: mode === "quick" ? "2px solid var(--accent-teal)" : "1px solid var(--border)", backgroundColor: mode === "quick" ? "rgba(0,180,216,0.05)" : "var(--surface)", opacity: isResearching ? 0.6 : 1 }}
                >
                  <div style={{ width: "20px", height: "20px", borderRadius: "50%", border: mode === "quick" ? "6px solid var(--accent-teal)" : "2px solid var(--border)" }}></div>
                  <div style={{ backgroundColor: "rgba(0,180,216,0.1)", color: "var(--accent-teal)", padding: "0.5rem", borderRadius: "8px" }}><Zap size={20} /></div>
                  <div>
                    <div style={{ fontWeight: 600 }}>Quick</div>
                    <div className="text-muted" style={{ fontSize: "0.85rem" }}>Fast answers, &lt; 2 min</div>
                  </div>
                </label>

                <label
                  className="card flex items-center gap-4"
                  style={{ padding: "1rem 1.5rem", cursor: "pointer", border: mode === "deep" ? "2px solid var(--highlight-gold)" : "1px solid var(--border)", backgroundColor: mode === "deep" ? "rgba(255,195,0,0.05)" : "var(--surface)", opacity: isResearching ? 0.6 : 1 }}
                >
                  <div style={{ width: "20px", height: "20px", borderRadius: "50%", border: mode === "deep" ? "6px solid var(--highlight-gold)" : "2px solid var(--border)" }}></div>
                  <div style={{ backgroundColor: "rgba(255,195,0,0.1)", color: "#B28800", padding: "0.5rem", borderRadius: "8px" }}><Sparkles size={20} /></div>
                  <div>
                    <div style={{ fontWeight: 600 }}>Deep</div>
                    <div className="text-muted" style={{ fontSize: "0.85rem" }}>Full competitive analysis, &lt; 10 min</div>
                  </div>
                </label>
              </div>
            </div>

            <div style={{ borderTop: "1px solid var(--border)", paddingTop: "1rem" }}>
              <button
                type="button"
                onClick={() => setAdvancedOpen(!advancedOpen)}
                className="flex items-center gap-2"
                style={{ fontWeight: 600, color: "var(--text-muted)" }}
                disabled={isResearching}
              >
                Advanced Options <ChevronDown size={18} style={{ transform: advancedOpen ? "rotate(180deg)" : "rotate(0)", transition: "transform 0.2s" }} />
              </button>

              {advancedOpen && (
                <div className="flex-col gap-4 mt-4 animate-fade-in" style={{ padding: "1rem", backgroundColor: "var(--surface-hover)", borderRadius: "var(--radius-card)", border: "1px solid var(--border)" }}>
                  <div className="flex items-center justify-between">
                    <label className="text-muted" style={{ fontSize: "0.9rem" }}>Focus marketplace:</label>
                    <select style={{ padding: "0.5rem", borderRadius: "6px", border: "1px solid var(--border)" }}><option>Amazon</option><option>Flipkart</option></select>
                  </div>
                  <div className="flex items-center justify-between">
                    <label className="text-muted" style={{ fontSize: "0.9rem" }}>Product category:</label>
                    <select style={{ padding: "0.5rem", borderRadius: "6px", border: "1px solid var(--border)" }}><option>Electronics</option><option>Fashion</option></select>
                  </div>
                  <div className="flex items-center justify-between">
                    <label className="text-muted" style={{ fontSize: "0.9rem" }}>Time period:</label>
                    <select style={{ padding: "0.5rem", borderRadius: "6px", border: "1px solid var(--border)" }}><option>Last 3 months</option><option>Last 30 days</option></select>
                  </div>
                </div>
              )}
            </div>

            <div className="card flex-col gap-2" style={{ backgroundColor: "rgba(16,185,129,0.05)", borderColor: "rgba(16,185,129,0.2)" }}>
              <div className="flex items-center gap-2" style={{ fontWeight: 600, color: "var(--success)" }}>
                <CheckCircle2 size={18} /> Using your preferences
              </div>
              <div className="text-muted" style={{ fontSize: "0.85rem", display: "grid", gridTemplateColumns: "1fr 2fr", gap: "0.5rem" }}>
                <span>KPIs:</span> <span style={{ fontWeight: 500, color: "var(--text-dark)" }}>GMV, CAC</span>
                <span>Category:</span> <span style={{ fontWeight: 500, color: "var(--text-dark)" }}>Electronics</span>
                <span>Goal:</span> <span style={{ fontWeight: 500, color: "var(--text-dark)" }}>Growth</span>
              </div>
            </div>

            <button
              type="submit"
              className="btn-primary w-full"
              style={{ padding: "1.25rem", fontSize: "1.1rem", display: "flex", justifyContent: "center" }}
              disabled={!query.trim() || isResearching}
            >
              {isResearching ? (
                <><Loader2 size={24} className="animate-spin" /> Starting Research...</>
              ) : (
                <><Search size={20} /> Start Research</>
              )}
            </button>

          </form>
        </div>

        {/* RIGHT PANEL — Live Research Feed */}
        <div style={{ flex: 1, minWidth: "350px" }}>
          {isResearching ? (
            <div className="card flex-col gap-6" style={{ position: "sticky", top: "2rem", minHeight: "500px", backgroundColor: "var(--bg-navy)", color: "white", borderColor: "var(--border-dark)", boxShadow: "var(--shadow-lg)" }}>

              <div className="flex items-center gap-3">
                <BrainCircuit size={28} color="var(--accent-teal)" className="animate-pulse" />
                <h2 style={{ fontSize: "1.25rem", color: "white" }}>ShopMind AI is researching...</h2>
              </div>

              <div className="flex-col gap-4 mt-4" style={{ flex: 1 }}>
                {steps.map((stepMsg, i) => {
                  const isActive = currentStep === i;
                  const isDone = currentStep > i;

                  return (
                    <div key={i} className="flex items-center gap-3" style={{ opacity: isActive || isDone ? 1 : 0.3, transition: "opacity 0.3s ease" }}>
                      {isDone ? (
                        <CheckCircle2 size={20} color="var(--success)" />
                      ) : isActive ? (
                        <Loader2 size={20} color="var(--accent-teal)" className="animate-spin" />
                      ) : (
                        <div style={{ width: "20px", height: "20px", border: "2px solid rgba(255,255,255,0.3)", borderRadius: "4px" }}></div>
                      )}
                      <span style={{ fontWeight: isActive ? 600 : 400, color: isDone ? "var(--success)" : isActive ? "white" : "rgba(255,255,255,0.7)" }}>
                        {stepMsg}
                      </span>
                    </div>
                  );
                })}
              </div>

              <div className="flex-col gap-3 mt-auto pt-6" style={{ borderTop: "1px solid var(--border-dark)" }}>
                <div className="flex justify-between items-center" style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.7)" }}>
                  <span>Progress</span>
                  <span className="mono">{progress}%</span>
                </div>
                <div style={{ width: "100%", height: "8px", backgroundColor: "var(--border-dark)", borderRadius: "9999px", overflow: "hidden" }}>
                  <div style={{ height: "100%", width: `${progress}%`, backgroundColor: "var(--accent-teal)", transition: "width 0.1s linear" }}></div>
                </div>
                <div style={{ fontSize: "0.85rem", color: "var(--accent-teal)", textAlign: "center", marginTop: "0.5rem" }}>
                  Estimated: {Math.max(1, Math.floor((100 - progress) / 2))} seconds remaining
                </div>
              </div>

            </div>
          ) : (
            <div className="card flex-col items-center justify-center gap-4" style={{ height: "100%", minHeight: "500px", backgroundColor: "var(--surface-hover)", borderStyle: "dashed", textAlign: "center" }}>
              <BrainCircuit size={48} color="var(--border)" />
              <p className="text-muted" style={{ maxWidth: "250px" }}>Enter a query and hit Start Research to see the live reasoning engine in action.</p>
            </div>
          )}
        </div>
      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.7; transform: scale(1.05); }
        }
        .animate-spin {
          animation: spin 2s linear infinite;
        }
        .animate-pulse {
          animation: pulse 2s ease-in-out infinite;
        }
      `}} />
    </div>
  );
}
