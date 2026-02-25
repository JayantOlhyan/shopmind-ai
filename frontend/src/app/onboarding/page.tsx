"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { BrainCircuit, CheckCircle2 } from "lucide-react";

export default function Onboarding() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [isFinishing, setIsFinishing] = useState(false);

  // Form State
  const [role, setRole] = useState("");
  const [marketplaces, setMarketplaces] = useState<string[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [kpis, setKpis] = useState<string[]>([]);
  const [goal, setGoal] = useState("");

  const name = "Jayant"; // Mock name from user context

  const handleNext = () => setStep(prev => prev + 1);
  const handleBack = () => setStep(prev => prev - 1);

  const handleFinish = () => {
    setIsFinishing(true);
    setTimeout(() => {
      router.push("/dashboard");
    }, 2000); // 2 second mock confetti/loading
  };

  const toggleArrayItem = (item: string, array: string[], setter: React.Dispatch<React.SetStateAction<string[]>>, max?: number) => {
    if (array.includes(item)) {
      setter(array.filter(i => i !== item));
    } else {
      if (max && array.length >= max) return; // Enforce limit
      setter([...array, item]);
    }
  };

  return (
    <div className="flex w-full items-center justify-center p-4 bg-light" style={{ minHeight: "100vh" }}>

      {isFinishing && (
        <div style={{ position: "fixed", inset: 0, zIndex: 100, display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "rgba(255,255,255,0.9)", flexDirection: "column", gap: "1rem" }}>
          <div style={{ fontSize: "4rem" }}>🎉</div>
          <h2 style={{ fontSize: "1.5rem", fontWeight: 700 }}>Setting up your workspace...</h2>
        </div>
      )}

      <div className="card w-full flex-col" style={{ maxWidth: "600px", padding: "3rem 2rem", position: "relative" }}>

        {/* Progress Bar */}
        <div className="flex gap-2" style={{ position: "absolute", top: 0, left: 0, right: 0, height: "6px", backgroundColor: "var(--border)", borderTopLeftRadius: "var(--radius-card)", borderTopRightRadius: "var(--radius-card)", overflow: "hidden" }}>
          <div style={{ height: "100%", backgroundColor: "var(--accent-teal)", width: `${(step / 3) * 100}%`, transition: "width 0.3s ease" }}></div>
        </div>

        {/* Step 1 */}
        {step === 1 && (
          <div className="flex-col gap-6 animate-fade-in">
            <div className="flex items-center gap-2" style={{ fontWeight: 800, fontSize: "1.1rem", marginBottom: "0.5rem" }}>
              <BrainCircuit size={20} color="var(--accent-teal)" />
              ShopMind AI
            </div>

            <div>
              <h1 style={{ fontSize: "1.75rem", marginBottom: "0.5rem" }}>Welcome to ShopMind AI, {name}! 🎉</h1>
              <p className="text-muted">Let's personalise your experience in 60 seconds.</p>
            </div>

            <div className="flex-col gap-3">
              <label style={{ fontWeight: 600, fontSize: "1.05rem" }}>What's your role?</label>
              {[
                "Product Manager",
                "Growth / Marketing",
                "Category Owner",
                "Founder / CEO",
                "Data Analyst",
                "Other"
              ].map(opt => (
                <label key={opt} className="card flex items-center gap-3" style={{ padding: "1rem", cursor: "pointer", border: role === opt ? "2px solid var(--accent-teal)" : "1px solid var(--border)", backgroundColor: role === opt ? "rgba(0,180,216,0.05)" : "var(--surface)", transition: "all 0.2s ease" }}>
                  <div style={{ width: "20px", height: "20px", borderRadius: "50%", border: role === opt ? "6px solid var(--accent-teal)" : "2px solid var(--border)" }}></div>
                  <span style={{ fontWeight: role === opt ? 600 : 400 }}>{opt}</span>
                </label>
              ))}
            </div>

            <div className="flex justify-end mt-4">
              <button className="btn-primary" onClick={handleNext} disabled={!role} style={{ opacity: !role ? 0.5 : 1 }}>Continue →</button>
            </div>
          </div>
        )}

        {/* Step 2 */}
        {step === 2 && (
          <div className="flex-col gap-6 animate-fade-in">
            <div>
              <p className="text-muted mb-1" style={{ fontSize: "0.9rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em" }}>Step 2 of 3</p>
              <h1 style={{ fontSize: "1.75rem", marginBottom: "0.5rem" }}>Your marketplace focus</h1>
            </div>

            <div className="flex-col gap-3">
              <label style={{ fontWeight: 600, fontSize: "1.05rem" }}>Which marketplaces do you work with?</label>
              <p className="text-muted" style={{ fontSize: "0.85rem", marginTop: "-0.5rem" }}>(select all that apply)</p>

              <div className="flex flex-wrap gap-3">
                {["Amazon", "Flipkart", "Shopify", "Meesho", "D2C Site", "Other"].map(market => {
                  const selected = marketplaces.includes(market);
                  return (
                    <button
                      key={market}
                      onClick={() => toggleArrayItem(market, marketplaces, setMarketplaces)}
                      className="btn-outline"
                      style={{
                        padding: "0.6rem 1rem",
                        backgroundColor: selected ? "rgba(0,180,216,0.1)" : "transparent",
                        borderColor: selected ? "var(--accent-teal)" : "var(--border)",
                        display: "flex", alignItems: "center", gap: "0.5rem"
                      }}
                    >
                      {selected && <CheckCircle2 size={16} color="var(--accent-teal)" />}
                      {market}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="flex-col gap-3 mt-4">
              <label style={{ fontWeight: 600, fontSize: "1.05rem" }}>What product categories interest you?</label>

              <div className="flex flex-wrap gap-3">
                {["Electronics", "Fashion", "FMCG", "Home & Kitchen", "Fitness", "Beauty"].map(cat => {
                  const selected = categories.includes(cat);
                  return (
                    <button
                      key={cat}
                      onClick={() => toggleArrayItem(cat, categories, setCategories)}
                      className="btn-outline"
                      style={{
                        padding: "0.6rem 1rem",
                        backgroundColor: selected ? "rgba(0,180,216,0.1)" : "transparent",
                        borderColor: selected ? "var(--accent-teal)" : "var(--border)",
                        display: "flex", alignItems: "center", gap: "0.5rem"
                      }}
                    >
                      {selected && <CheckCircle2 size={16} color="var(--accent-teal)" />}
                      {cat}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="flex justify-between items-center mt-4 pt-4" style={{ borderTop: "1px solid var(--border)" }}>
              <button className="btn-outline" onClick={handleBack} style={{ border: "none" }}>← Back</button>
              <button className="btn-primary" onClick={handleNext} disabled={marketplaces.length === 0 || categories.length === 0} style={{ opacity: (marketplaces.length === 0 || categories.length === 0) ? 0.5 : 1 }}>Continue →</button>
            </div>
          </div>
        )}

        {/* Step 3 */}
        {step === 3 && (
          <div className="flex-col gap-6 animate-fade-in">
            <div>
              <p className="text-muted mb-1" style={{ fontSize: "0.9rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em" }}>Step 3 of 3</p>
              <h1 style={{ fontSize: "1.75rem", marginBottom: "0.5rem" }}>Your KPIs</h1>
            </div>

            <div className="flex-col gap-3">
              <label style={{ fontWeight: 600, fontSize: "1.05rem" }}>What metrics matter most to you?</label>
              <p className="text-muted" style={{ fontSize: "0.85rem", marginTop: "-0.5rem" }}>(select up to 3)</p>

              <div className="flex flex-wrap gap-3">
                {["GMV", "CAC", "LTV", "Margin", "CTR", "Return Rate", "Review Score", "Market Share"].map(kpi => {
                  const selected = kpis.includes(kpi);
                  return (
                    <button
                      key={kpi}
                      onClick={() => toggleArrayItem(kpi, kpis, setKpis, 3)}
                      className="btn-outline"
                      style={{
                        padding: "0.6rem 1rem",
                        backgroundColor: selected ? "rgba(0,180,216,0.1)" : "transparent",
                        borderColor: selected ? "var(--accent-teal)" : "var(--border)",
                        display: "flex", alignItems: "center", gap: "0.5rem"
                      }}
                    >
                      {selected && <CheckCircle2 size={16} color="var(--accent-teal)" />}
                      {kpi}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="flex-col gap-3 mt-4">
              <label style={{ fontWeight: 600, fontSize: "1.05rem" }}>What's your primary business goal right now?</label>

              <div className="flex-col gap-3">
                {[
                  { id: "growth", label: "Growth — increase sales and market share" },
                  { id: "retention", label: "Retention — reduce churn and returns" },
                  { id: "profitability", label: "Profitability — improve margins" }
                ].map(opt => (
                  <label key={opt.id} className="card flex items-center gap-3" style={{ padding: "1rem", cursor: "pointer", border: goal === opt.id ? "2px solid var(--accent-teal)" : "1px solid var(--border)", backgroundColor: goal === opt.id ? "rgba(0,180,216,0.05)" : "var(--surface)", transition: "all 0.2s ease" }}>
                    <div style={{ width: "20px", height: "20px", borderRadius: "50%", border: goal === opt.id ? "6px solid var(--accent-teal)" : "2px solid var(--border)" }}></div>
                    <span style={{ fontWeight: goal === opt.id ? 600 : 400 }}>{opt.label}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="flex justify-between items-center mt-4 pt-4" style={{ borderTop: "1px solid var(--border)" }}>
              <button className="btn-outline" onClick={handleBack} style={{ border: "none" }}>← Back</button>
              <button className="btn-primary" onClick={handleFinish} disabled={kpis.length === 0 || !goal} style={{ opacity: (kpis.length === 0 || !goal) ? 0.5 : 1 }}>Finish Setup →</button>
            </div>
          </div>
        )}

      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fadeIn 0.4s ease forwards;
        }
      `}} />
    </div >
  );
}
