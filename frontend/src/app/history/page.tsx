"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, ChevronDown, Filter, Calendar } from "lucide-react";

export default function HistoryPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const historyData = [
    { id: "1", date: "Feb 21", query: "Why is earbuds SKU failing?", mode: "Deep", cost: "$0.006" },
    { id: "2", date: "Feb 21", query: "Price comparison SKU vs amzn", mode: "Quick", cost: "$0.002" },
    { id: "3", date: "Feb 20", query: "Top complaints fitness tracker", mode: "Quick", cost: "$0.003" },
    { id: "4", date: "Feb 19", query: "Competitive gap analysis smart TVs", mode: "Deep", cost: "$0.008" },
    { id: "5", date: "Feb 15", query: "Should we run a BOGO on protein powder?", mode: "Quick", cost: "$0.002" },
    { id: "6", date: "Feb 12", returnRate: true, query: "Why are return rates up on running shoes?", mode: "Deep", cost: "$0.012" },
  ];

  return (
    <div className="container" style={{ padding: "2rem", display: "flex", flexDirection: "column", gap: "2rem" }}>

      {/* Header Area */}
      <div className="flex justify-between items-center w-full mb-2">
        <div>
          <h1 style={{ fontSize: "1.75rem", marginBottom: "0.25rem", color: "var(--text-dark)" }}>Research History</h1>
          <p className="text-muted" style={{ fontSize: "0.95rem" }}>View past reports and export insights.</p>
        </div>

        <div className="flex items-center gap-3">
          <div style={{ position: "relative" }}>
            <Search size={16} color="var(--text-muted)" style={{ position: "absolute", left: "1rem", top: "50%", transform: "translateY(-50%)" }} />
            <input
              type="text"
              placeholder="Search reports..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              style={{ padding: "0.5rem 1rem 0.5rem 2.5rem", borderRadius: "8px", border: "1px solid var(--border)", backgroundColor: "var(--surface)", fontSize: "0.9rem", width: "250px" }}
            />
          </div>
          <button className="btn-outline flex items-center gap-2" style={{ padding: "0.5rem 1rem", fontSize: "0.9rem", backgroundColor: "var(--surface)" }}>
            <Filter size={16} /> Filter <ChevronDown size={14} />
          </button>
        </div>
      </div>

      {/* Filter Row */}
      <div className="flex items-center gap-3 text-muted" style={{ fontSize: "0.9rem", fontWeight: 500 }}>
        <span>Filter by:</span>
        <button className="flex items-center gap-1" style={{ backgroundColor: "var(--surface)", border: "1px solid var(--border)", padding: "0.25rem 0.75rem", borderRadius: "999px" }}>All <ChevronDown size={14} /></button>
        <button className="flex items-center gap-1" style={{ backgroundColor: "var(--surface)", border: "1px solid var(--border)", padding: "0.25rem 0.75rem", borderRadius: "999px" }}>Quick <ChevronDown size={14} /></button>
        <button className="flex items-center gap-1" style={{ backgroundColor: "var(--surface)", border: "1px solid var(--border)", padding: "0.25rem 0.75rem", borderRadius: "999px" }}>Deep <ChevronDown size={14} /></button>
        <button className="flex items-center gap-1" style={{ backgroundColor: "var(--surface)", border: "1px solid var(--border)", padding: "0.25rem 0.75rem", borderRadius: "999px" }}>
          <Calendar size={14} /> This month <ChevronDown size={14} />
        </button>
      </div>

      {/* History Table */}
      <div className="card" style={{ padding: 0, overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ backgroundColor: "var(--surface-hover)", borderBottom: "1px solid var(--border)", textAlign: "left" }}>
              <th style={{ padding: "1rem 1.5rem", fontWeight: 600, color: "var(--text-muted)", fontSize: "0.85rem" }}>Date</th>
              <th style={{ padding: "1rem 1.5rem", fontWeight: 600, color: "var(--text-muted)", fontSize: "0.85rem", width: "50%" }}>Query</th>
              <th style={{ padding: "1rem 1.5rem", fontWeight: 600, color: "var(--text-muted)", fontSize: "0.85rem" }}>Mode</th>
              <th style={{ padding: "1rem 1.5rem", fontWeight: 600, color: "var(--text-muted)", fontSize: "0.85rem" }}>Cost</th>
              <th style={{ padding: "1rem 1.5rem", fontWeight: 600, color: "var(--text-muted)", fontSize: "0.85rem", textAlign: "right" }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {historyData.filter(d => d.query.toLowerCase().includes(searchQuery.toLowerCase())).map((row, i) => (
              <tr key={i} style={{ borderBottom: i === historyData.length - 1 ? "none" : "1px solid var(--border)", transition: "background-color 0.2s" }} onMouseEnter={e => e.currentTarget.style.backgroundColor = "var(--surface-hover)"} onMouseLeave={e => e.currentTarget.style.backgroundColor = "transparent"}>
                <td style={{ padding: "1.25rem 1.5rem", fontSize: "0.95rem", color: "var(--text-muted)", whiteSpace: "nowrap" }}>{row.date}</td>
                <td style={{ padding: "1.25rem 1.5rem", fontSize: "1rem", fontWeight: 500 }}>{row.query}</td>
                <td style={{ padding: "1.25rem 1.5rem", whiteSpace: "nowrap" }}>
                  <span className={`badge ${row.mode === "Deep" ? "badge-deep" : "badge-quick"}`} style={{ fontSize: "0.75rem" }}>
                    {row.mode}
                  </span>
                </td>
                <td style={{ padding: "1.25rem 1.5rem", fontSize: "0.95rem", color: "var(--text-muted)", whiteSpace: "nowrap", fontFamily: "var(--font-mono)" }}>
                  {row.cost}
                </td>
                <td style={{ padding: "1.25rem 1.5rem", textAlign: "right", whiteSpace: "nowrap" }}>
                  <Link href={`/research/report/${row.id}?q=${encodeURIComponent(row.query)}&mode=${row.mode.toLowerCase()}`} className="btn-outline" style={{ padding: "0.4rem 1rem", fontSize: "0.85rem" }}>
                    View
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div >

    </div >
  );
}
