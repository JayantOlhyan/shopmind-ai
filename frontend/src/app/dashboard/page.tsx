"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, Zap, X, BarChart2, Clock, DollarSign, Target, Sparkles } from "lucide-react";

export default function Dashboard() {
  const router = useRouter();
  const [showBanner, setShowBanner] = useState(true);
  const [query, setQuery] = useState("");
  const [mode, setMode] = useState("quick");

  const handleResearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/research?q=${encodeURIComponent(query)}&mode=${mode}`);
    } else {
      router.push("/research");
    }
  };

  return (
    <div className="container" style={{ padding: "2rem", display: "flex", flexDirection: "column", gap: "2rem" }}>

      {/* Header Area */}
      <div className="flex justify-between items-center w-full mt-4 mb-4">
        <div>
          <h1 style={{ fontSize: "1.75rem", marginBottom: "0.25rem", color: "var(--text-dark)" }}>Good morning, Vetrick Wilsen</h1>
          <p className="text-muted" style={{ fontSize: "0.95rem" }}>Here's what's happening with your store today.</p>
        </div>

        <div className="flex items-center gap-4">
          <div style={{ position: "relative" }}>
            <Search size={16} color="var(--text-muted)" style={{ position: "absolute", left: "1rem", top: "50%", transform: "translateY(-50%)" }} />
            <input
              type="text"
              placeholder="Search..."
              style={{ padding: "0.5rem 1rem 0.5rem 2.5rem", borderRadius: "8px", border: "1px solid var(--border)", backgroundColor: "var(--surface)", fontSize: "0.9rem", width: "250px" }}
            />
          </div>
          <div className="flex items-center gap-2" style={{ backgroundColor: "rgba(16, 185, 129, 0.1)", color: "var(--success)", padding: "0.4rem 0.8rem", borderRadius: "9999px", fontSize: "0.85rem", fontWeight: 600 }}>
            <span style={{ width: 8, height: 8, borderRadius: "50%", backgroundColor: "var(--success)" }}></span> Opened
          </div>
        </div>
      </div>

      <div className="flex gap-6">

        {/* Left Column (Main Data) */}
        <div className="flex-col gap-6" style={{ flex: 1 }}>

          {/* Top KPI Row */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1.5rem" }}>

            {/* KPI Card 1 */}
            <div className="card flex-col gap-3">
              <span className="text-muted" style={{ fontSize: "0.9rem", fontWeight: 600 }}>Market Accuracy</span>
              <div className="flex justify-between items-end">
                <span style={{ fontSize: "2rem", fontWeight: 800 }}>65%</span>
                <svg width="80" height="30" viewBox="0 0 100 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M0 25 C 20 25, 30 15, 50 20 C 70 25, 80 5, 100 10" stroke="var(--accent-teal)" strokeWidth="3" strokeLinecap="round" />
                </svg>
              </div>
            </div>

            {/* KPI Card 2 */}
            <div className="card flex-col gap-3">
              <span className="text-muted" style={{ fontSize: "0.9rem", fontWeight: 600 }}>Today Reports</span>
              <div className="flex justify-between items-end">
                <span style={{ fontSize: "2rem", fontWeight: 800 }}>14</span>
                <svg width="80" height="30" viewBox="0 0 100 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M0 20 L 20 25 L 40 10 L 60 15 L 80 5 L 100 15" stroke="var(--error)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </div>

            {/* KPI Card 3 */}
            <div className="card flex-col gap-3">
              <span className="text-muted" style={{ fontSize: "0.9rem", fontWeight: 600 }}>New Insights</span>
              <div className="flex justify-between items-end">
                <span style={{ fontSize: "2rem", fontWeight: 800 }}>242</span>
                <svg width="80" height="30" viewBox="0 0 100 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M0 20 C 20 25, 40 10, 60 15 S 80 5, 100 0" stroke="var(--highlight-gold)" strokeWidth="3" strokeLinecap="round" />
                </svg>
              </div>
            </div>

          </div>

          {/* Research Tool (Inline) */}
          <div className="card flex-col gap-4">
            <div className="flex justify-between items-center">
              <h3 style={{ fontSize: "1.1rem" }}>Generate Custom Report</h3>
              <span className="text-muted" style={{ fontSize: "0.85rem", cursor: "pointer" }}>See more →</span>
            </div>

            <form onSubmit={handleResearch} className="flex gap-4">
              <input
                type="text"
                placeholder="Ask anything about your products or market..."
                value={query}
                onChange={e => setQuery(e.target.value)}
                style={{ flex: 1, backgroundColor: "var(--bg-main)", border: "none" }}
              />
              <button type="submit" className="btn-primary" style={{ padding: "0.75rem 1.5rem", borderRadius: "8px" }}>
                Research
              </button>
            </form>
          </div>

          {/* Recent Reports / Activity Feed */}
          <div className="card flex-col gap-4">
            <h3 style={{ fontSize: "1.1rem" }}>Recent Activity</h3>

            <div className="flex-col gap-3">
              {[
                { name: "Emily Tan", role: "Category Manager", time: "08:32 AM", query: "Why is battery SKU failing?", status: "Ready" },
                { name: "Ravi Kumar", role: "Inventory Lead", time: "Yesterday", query: "Price gap vs Amazon", status: "Reviewing" },
                { name: "Daniel Chen", role: "Marketing Strategist", time: "Feb 21", query: "Keyword analysis Q2", status: "Archived" }
              ].map((activity, i) => (
                <div key={i} className="flex justify-between items-center" style={{ padding: "0.5rem 0" }}>
                  <div className="flex items-center gap-3">
                    <div style={{ width: 40, height: 40, borderRadius: "50%", backgroundColor: "var(--bg-main)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 600 }}>
                      {activity.name.charAt(0)}
                    </div>
                    <div className="flex-col">
                      <span style={{ fontWeight: 600, fontSize: "0.95rem" }}>{activity.name}</span>
                      <span className="text-muted" style={{ fontSize: "0.8rem" }}>{activity.role}</span>
                    </div>
                  </div>
                  <div className="flex-col items-end">
                    <span className="text-muted" style={{ fontSize: "0.85rem", marginBottom: "0.25rem" }}>{activity.time}</span>
                    <span style={{ padding: "0.2rem 0.6rem", borderRadius: "4px", fontSize: "0.75rem", backgroundColor: activity.status === "Ready" ? "rgba(16,185,129,0.1)" : activity.status === "Reviewing" ? "rgba(0,180,216,0.1)" : "var(--bg-main)", color: activity.status === "Ready" ? "var(--success)" : activity.status === "Reviewing" ? "var(--accent-teal)" : "var(--text-muted)", fontWeight: 600 }}>
                      {activity.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Right Column (Sidebar metrics) */}
        <div className="flex-col gap-6" style={{ width: "320px" }}>

          <div className="card flex-col gap-4">
            <h3 style={{ fontSize: "1.1rem" }}>Top Trending Categories</h3>
            <div className="flex items-end gap-2 mb-2">
              <span style={{ fontSize: "2rem", fontWeight: 800 }}>142</span>
              <span style={{ backgroundColor: "rgba(16,185,129,0.1)", color: "var(--success)", padding: "0.15rem 0.4rem", borderRadius: "4px", fontSize: "0.75rem", fontWeight: 700, marginBottom: "0.5rem" }}>+ 5 %</span>
            </div>

            <div className="flex gap-1" style={{ width: "100%", height: "6px", borderRadius: "3px", overflow: "hidden", marginBottom: "1rem" }}>
              <div style={{ width: "45%", backgroundColor: "var(--error)" }}></div>
              <div style={{ width: "35%", backgroundColor: "var(--highlight-gold)" }}></div>
              <div style={{ width: "20%", backgroundColor: "var(--accent-teal)" }}></div>
            </div>

            <div className="flex-col gap-3">
              <div className="flex items-center gap-3">
                <div style={{ width: 12, height: 12, borderRadius: "50%", backgroundColor: "var(--error)" }}></div>
                <span className="text-muted" style={{ fontSize: "0.9rem", flex: 1 }}>Electronics</span>
                <span style={{ fontWeight: 600, fontSize: "0.9rem" }}>45%</span>
              </div>
              <div className="flex items-center gap-3">
                <div style={{ width: 12, height: 12, borderRadius: "50%", backgroundColor: "var(--highlight-gold)" }}></div>
                <span className="text-muted" style={{ fontSize: "0.9rem", flex: 1 }}>Fashion</span>
                <span style={{ fontWeight: 600, fontSize: "0.9rem" }}>35%</span>
              </div>
              <div className="flex items-center gap-3">
                <div style={{ width: 12, height: 12, borderRadius: "50%", backgroundColor: "var(--accent-teal)" }}></div>
                <span className="text-muted" style={{ fontSize: "0.9rem", flex: 1 }}>Home</span>
                <span style={{ fontWeight: 600, fontSize: "0.9rem" }}>20%</span>
              </div>
            </div>

            <button className="btn-outline w-full mt-2" style={{ backgroundColor: "var(--bg-main)", border: "none", fontSize: "0.9rem" }}>
              View Full Report
            </button>
          </div>

        </div>

      </div>



    </div>
  );
}
