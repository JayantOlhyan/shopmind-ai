"use client";

import Link from "next/link";
import { Search, Zap, CheckCircle2, FileText, Database, TrendingUp, DollarSign, BrainCircuit, PlayCircle } from "lucide-react";

export default function Home() {
  return (
    <div className="flex-col w-full" style={{ minHeight: "100vh" }}>

      {/* Hero Section */}
      <section className="dark-bg" style={{ padding: "6rem 2rem 4rem 2rem", textAlign: "center" }}>
        <div className="container flex-col items-center gap-6" style={{ maxWidth: "800px" }}>

          <h1 style={{ fontSize: "4.5rem", lineHeight: 1.1, letterSpacing: "-0.04em", marginBottom: "0.5rem", fontWeight: 800 }}>
            Step Into the Future<br />with <span style={{ color: "var(--accent-orange)" }}>BEST</span> Tech Tools.
          </h1>

          <p style={{ fontSize: "1.25rem", color: "var(--text-muted)", marginBottom: "2rem", maxWidth: "600px", lineHeight: 1.6 }}>
            Ask any business question. Get a structured insight report powered by AI in under 2 minutes.
          </p>

          <div className="flex items-center justify-center gap-4 flex-wrap">
            <Link href="/signup" className="btn-primary" style={{ fontSize: "1.1rem", padding: "1rem 2rem" }}>
              Start Researching Free
            </Link>
            <button className="btn-outline" style={{ border: "none", display: "flex", gap: "0.5rem", alignItems: "center", color: "var(--text-muted)" }}>
              <PlayCircle size={20} /> Watch 60-second demo
            </button>
          </div>

        </div>
      </section>

      {/* Social Proof */}
      <section style={{ backgroundColor: "var(--surface)", padding: "2rem", borderBottom: "1px solid var(--border)" }}>
        <div className="container flex-col items-center gap-4">
          <p style={{ fontSize: "0.85rem", fontWeight: 600, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.05em" }}>
            Trusted by teams at
          </p>
          <div className="flex justify-center items-center gap-8 flex-wrap opacity-60">
            <div style={{ fontSize: "1.25rem", fontWeight: 800 }}>Amazon</div>
            <div style={{ fontSize: "1.25rem", fontWeight: 800 }}>Flipkart</div>
            <div style={{ fontSize: "1.25rem", fontWeight: 800 }}>Shopify</div>
            <div style={{ fontSize: "1.25rem", fontWeight: 800 }}>D2C Brands</div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section style={{ padding: "6rem 2rem" }}>
        <div className="container flex-col items-center gap-12">

          <div style={{ textAlign: "center" }}>
            <h2 style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>How It Works</h2>
            <p className="text-muted" style={{ fontSize: "1.1rem" }}>From question to actionable insight in three simple steps.</p>
          </div>

          <div className="flex gap-8 w-full" style={{ flexWrap: "wrap", justifyContent: "center" }}>

            <div className="card flex-col items-center gap-4" style={{ flex: 1, minWidth: "280px", textAlign: "center", borderTop: "4px solid var(--accent-orange)" }}>
              <div style={{ backgroundColor: "rgba(255,90,31,0.1)", color: "var(--accent-orange)", padding: "1rem", borderRadius: "50%" }}>
                <Search size={32} />
              </div>
              <h3 style={{ fontSize: "1.25rem" }}>Step 1: Ask</h3>
              <p className="text-muted" style={{ lineHeight: 1.6 }}>Type your business question in plain English. No complex query languages needed.</p>
            </div>

            <div className="card flex-col items-center gap-4" style={{ flex: 1, minWidth: "280px", textAlign: "center", borderTop: "4px solid var(--accent-orange)" }}>
              <div style={{ backgroundColor: "rgba(255,195,0,0.1)", color: "#B28800", padding: "1rem", borderRadius: "50%" }}>
                <Zap size={32} />
              </div>
              <h3 style={{ fontSize: "1.25rem" }}>Step 2: AI Researches</h3>
              <p className="text-muted" style={{ lineHeight: 1.6 }}>ShopMind searches reviews, pricing, and competitors in real-time across the web.</p>
            </div>

            <div className="card flex-col items-center gap-4" style={{ flex: 1, minWidth: "280px", textAlign: "center", borderTop: "4px solid var(--accent-orange)" }}>
              <div style={{ backgroundColor: "rgba(255,90,31,0.1)", color: "var(--accent-orange)", padding: "1rem", borderRadius: "50%" }}>
                <FileText size={32} />
              </div>
              <h3 style={{ fontSize: "1.25rem" }}>Step 3: Get Report</h3>
              <p className="text-muted" style={{ lineHeight: 1.6 }}>Receive a structured insight report with findings, confidence scores, and recommendations.</p>
            </div>

          </div>
        </div>
      </section>

      {/* Feature Cards Section */}
      <section className="dark-bg" style={{ padding: "6rem 2rem" }}>
        <div className="container flex-col gap-12">

          <div style={{ textAlign: "center" }}>
            <h2 style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>Everything you need to win</h2>
            <p style={{ color: "var(--text-muted)", fontSize: "1.1rem" }}>Built specifically for e-commerce operators.</p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "2rem" }}>

            <div className="card" style={{ backgroundColor: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.1)" }}>
              <div className="flex items-center gap-3" style={{ marginBottom: "1rem" }}>
                <Zap color="var(--accent-orange)" />
                <h3 style={{ color: "white", fontSize: "1.2rem" }}>Quick Mode</h3>
              </div>
              <p style={{ color: "rgba(255,255,255,0.7)", lineHeight: 1.6 }}>Get answers in under 2 minutes for fast daily calls and standups.</p>
            </div>

            <div className="card" style={{ backgroundColor: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.1)" }}>
              <div className="flex items-center gap-3" style={{ marginBottom: "1rem" }}>
                <Search color="var(--highlight-gold)" />
                <h3 style={{ color: "white", fontSize: "1.2rem" }}>Deep Mode</h3>
              </div>
              <p style={{ color: "rgba(255,255,255,0.7)", lineHeight: 1.6 }}>Full competitive analysis comparing multiple SKUs in under 10 minutes.</p>
            </div>

            <div className="card" style={{ backgroundColor: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.1)" }}>
              <div className="flex items-center gap-3" style={{ marginBottom: "1rem" }}>
                <Database color="var(--success)" />
                <h3 style={{ color: "white", fontSize: "1.2rem" }}>Memory</h3>
              </div>
              <p style={{ color: "rgba(255,255,255,0.7)", lineHeight: 1.6 }}>Remembers your KPIs, markets, and preferences so every answer gets smarter.</p>
            </div>

            <div className="card" style={{ backgroundColor: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.1)" }}>
              <div className="flex items-center gap-3" style={{ marginBottom: "1rem" }}>
                <TrendingUp color="#8B5CF6" />
                <h3 style={{ color: "white", fontSize: "1.2rem" }}>Live Data</h3>
              </div>
              <p style={{ color: "rgba(255,255,255,0.7)", lineHeight: 1.6 }}>Real-time web search across Amazon, Flipkart, D2C sites, and industry blogs.</p>
            </div>

            <div className="card" style={{ backgroundColor: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.1)" }}>
              <div className="flex items-center gap-3" style={{ marginBottom: "1rem" }}>
                <DollarSign color="var(--success)" />
                <h3 style={{ color: "white", fontSize: "1.2rem" }}>Cost Tracking</h3>
              </div>
              <p style={{ color: "rgba(255,255,255,0.7)", lineHeight: 1.6 }}>Know exactly what each query costs you. Full transparency, no surprise bills.</p>
            </div>

            <div className="card" style={{ backgroundColor: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.1)" }}>
              <div className="flex items-center gap-3" style={{ marginBottom: "1rem" }}>
                <FileText color="var(--accent-orange)" />
                <h3 style={{ color: "white", fontSize: "1.2rem" }}>Reports</h3>
              </div>
              <p style={{ color: "rgba(255,255,255,0.7)", lineHeight: 1.6 }}>Export findings to PDF, share with your team instantly.</p>
            </div>

          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section style={{ padding: "6rem 2rem", backgroundColor: "var(--surface)" }}>
        <div className="container flex-col items-center gap-12">

          <div style={{ textAlign: "center" }}>
            <h2 style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>Simple Pricing</h2>
            <p className="text-muted" style={{ fontSize: "1.1rem" }}>Start free, upgrade when you need more power.</p>
          </div>

          <div className="flex gap-6 w-full" style={{ flexWrap: "wrap", justifyContent: "center" }}>

            <div className="card flex-col gap-6" style={{ flex: 1, minWidth: "280px", maxWidth: "350px" }}>
              <div>
                <h3 style={{ fontSize: "1.5rem", marginBottom: "0.5rem" }}>Free</h3>
                <div style={{ fontSize: "2.5rem", fontWeight: 800 }}>$0<span style={{ fontSize: "1rem", color: "var(--text-muted)", fontWeight: 500 }}>/mo</span></div>
              </div>
              <ul className="flex-col gap-3">
                <li className="flex items-center gap-2"><CheckCircle2 size={18} color="var(--success)" /> 10 queries/month</li>
                <li className="flex items-center gap-2"><CheckCircle2 size={18} color="var(--success)" /> Quick Mode only</li>
                <li className="flex items-center gap-2"><CheckCircle2 size={18} color="var(--border)" /> No memory</li>
              </ul>
              <Link href="/signup" className="btn-outline" style={{ textAlign: "center", marginTop: "auto" }}>Sign Up Free</Link>
            </div>

            <div className="card flex-col gap-6" style={{ flex: 1, minWidth: "280px", maxWidth: "350px", border: "2px solid var(--accent-orange)", position: "relative" }}>
              <div style={{ position: "absolute", top: -12, left: "50%", transform: "translateX(-50%)", backgroundColor: "var(--accent-orange)", color: "white", padding: "0.25rem 1rem", borderRadius: "9999px", fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em" }}>
                Most Popular
              </div>
              <div>
                <h3 style={{ fontSize: "1.5rem", marginBottom: "0.5rem" }}>Pro</h3>
                <div style={{ fontSize: "2.5rem", fontWeight: 800 }}>$49<span style={{ fontSize: "1rem", color: "var(--text-muted)", fontWeight: 500 }}>/mo</span></div>
              </div>
              <ul className="flex-col gap-3">
                <li className="flex items-center gap-2"><CheckCircle2 size={18} color="var(--success)" /> Unlimited Quick Mode</li>
                <li className="flex items-center gap-2"><CheckCircle2 size={18} color="var(--success)" /> 50 Deep reports/mo</li>
                <li className="flex items-center gap-2"><CheckCircle2 size={18} color="var(--success)" /> Full memory</li>
                <li className="flex items-center gap-2"><CheckCircle2 size={18} color="var(--success)" /> Export reports</li>
              </ul>
              <button className="btn-primary" style={{ marginTop: "auto", width: "100%" }}>Start Pro Trial</button>
            </div>

            <div className="card flex-col gap-6" style={{ flex: 1, minWidth: "280px", maxWidth: "350px" }}>
              <div>
                <h3 style={{ fontSize: "1.5rem", marginBottom: "0.5rem" }}>Enterprise</h3>
                <div style={{ fontSize: "2.5rem", fontWeight: 800 }}>Custom</div>
              </div>
              <ul className="flex-col gap-3">
                <li className="flex items-center gap-2"><CheckCircle2 size={18} color="var(--success)" /> Custom limits</li>
                <li className="flex items-center gap-2"><CheckCircle2 size={18} color="var(--success)" /> Team accounts</li>
                <li className="flex items-center gap-2"><CheckCircle2 size={18} color="var(--success)" /> API access</li>
                <li className="flex items-center gap-2"><CheckCircle2 size={18} color="var(--success)" /> SLA support</li>
              </ul>
              <button className="btn-outline" style={{ marginTop: "auto", width: "100%" }}>Contact Sales</button>
            </div>

          </div>

        </div>
      </section>

      {/* Footer */}
      <footer style={{ backgroundColor: "var(--surface)", borderTop: "1px solid var(--border)", padding: "3rem 2rem" }}>
        <div className="container flex-col gap-6">
          <div className="flex justify-between items-center flex-wrap gap-4">
            <div className="flex items-center gap-2" style={{ fontWeight: 800, fontSize: "1.25rem" }}>
              <BrainCircuit size={24} color="var(--accent-orange)" />
              ShopMind AI
            </div>
            <div className="flex items-center gap-6 text-muted" style={{ fontSize: "0.9rem" }}>
              <Link href="#">About</Link>
              <Link href="#">Pricing</Link>
              <Link href="#">Docs</Link>
              <Link href="#">Privacy</Link>
              <Link href="#">Terms</Link>
            </div>
          </div>
          <div style={{ borderTop: "1px solid var(--border)", paddingTop: "1.5rem", fontSize: "0.85rem", color: "var(--text-muted)" }}>
            © 2026 ShopMind AI. Built for e-commerce teams.
          </div>
        </div>
      </footer>

    </div>
  );
}
