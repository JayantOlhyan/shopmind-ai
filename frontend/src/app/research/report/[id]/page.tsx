"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { ArrowLeft, Copy, Download, Share2, ChevronDown, CheckCircle2, AlertTriangle, ArrowRight, Zap, Sparkles } from "lucide-react";

export default function ReportPage({ params }: { params: { id: string } }) {
    const searchParams = useSearchParams();
    const query = searchParams.get("q") || "Why is our wireless earbuds SKU underperforming on Amazon India?";
    const mode = searchParams.get("mode") || "deep";

    const [expandedCards, setExpandedCards] = useState<Record<number, boolean>>({ 0: true, 1: true, 2: true });

    const toggleCard = (index: number) => {
        setExpandedCards(prev => ({ ...prev, [index]: !prev[index] }));
    };

    return (
        <div className="container" style={{ padding: "2rem", display: "flex", flexDirection: "column", gap: "2rem", maxWidth: "900px" }}>

            {/* Top Bar */}
            <div className="flex justify-between items-center w-full mb-2">
                <Link href="/dashboard" className="flex items-center gap-2 text-muted" style={{ fontWeight: 600, fontSize: "0.95rem" }}>
                    <ArrowLeft size={18} /> Back to Dashboard
                </Link>
                <div className="flex items-center gap-3">
                    <button className="btn-outline" style={{ padding: "0.5rem 1rem", fontSize: "0.85rem", display: "flex", alignItems: "center", gap: "0.5rem", backgroundColor: "var(--surface)" }}>
                        <Copy size={16} /> Copy
                    </button>
                    <button className="btn-outline" style={{ padding: "0.5rem 1rem", fontSize: "0.85rem", display: "flex", alignItems: "center", gap: "0.5rem", backgroundColor: "var(--surface)" }}>
                        <Download size={16} /> Export PDF
                    </button>
                    <button className="btn-primary" style={{ padding: "0.5rem 1rem", fontSize: "0.85rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                        <Share2 size={16} /> Share
                    </button>
                </div>
            </div>

            {/* Report Header */}
            <div className="flex-col gap-4">
                <h1 style={{ fontSize: "2rem", lineHeight: 1.3 }}>{query}</h1>
                <div className="flex flex-wrap items-center gap-4 text-muted mono" style={{ fontSize: "0.85rem" }}>
                    <span className={`badge ${mode === "deep" ? "badge-deep" : "badge-quick"}`} style={{ display: "flex", alignItems: "center", gap: "0.25rem" }}>
                        {mode === "deep" ? <Sparkles size={14} /> : <Zap size={14} />} {mode.charAt(0).toUpperCase() + mode.slice(1)} Mode
                    </span>
                    <span style={{ color: "var(--success)" }}>Confidence: 87%</span>
                    <span>Time: 2m 14s</span>
                    <span>Cost: $0.006</span>
                    <span>Sources: 12</span>
                </div>
            </div>

            {/* Executive Summary Card */}
            <div className="card" style={{ backgroundColor: "var(--surface-hover)", borderColor: "var(--border)" }}>
                <h2 style={{ fontSize: "1.25rem", color: "var(--text-dark)", marginBottom: "1rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                    📋 Executive Summary
                </h2>
                <p style={{ fontSize: "1.05rem", lineHeight: 1.6, color: "var(--text-muted)" }}>
                    The SKU is priced ₹800 above the top 3 competitors with a declining review velocity.
                    Primary drivers are a pricing gap and 3 unresolved complaints about battery life that appear in 34% of 1-star reviews.
                    Competitor A launched a similar product at ₹1,299 last month, directly cannibalising traffic.
                </p>
            </div>

            {/* Key Findings */}
            <div className="flex-col gap-4">
                <h2 style={{ fontSize: "1.25rem", marginBottom: "0.5rem" }}>Key Findings</h2>

                {[
                    {
                        title: "💰 Pricing Gap",
                        conf: 91,
                        summary: "Competitors average ₹1,299. Our SKU is at ₹2,099.",
                        source: "amazon.in • flipkart.com",
                        details: "Detailed analysis shows that top competitors (Boat, Noise) have aggressively discounted their similar TWS earbuds over the last 45 days, creating an ₹800 average delta that is severely impacting conversion rate on our listing."
                    },
                    {
                        title: "🔋 Battery Complaint Pattern",
                        conf: 88,
                        summary: '"Battery drains in 3 hours" appears in 34% of 1-star reviews.',
                        source: "amazon.in reviews",
                        details: "Sentiment analysis of 412 recent reviews identified a strong cluster of complaints related to right-earbud battery drain after 3 hours of continuous playback, contradicting the 30-hour claim on the A+ content."
                    },
                    {
                        title: "📉 Review Velocity Drop",
                        conf: 85,
                        summary: "Review rate fell 40% in last 6 weeks. Competitor B gaining.",
                        source: "marketplace data",
                        details: "Daily new reviews dropped from an average of ~15 to ~9 since January. Concurrently, Competitor B's review velocity increased by 60%, indicating a shift in organic rank and category share of voice."
                    }
                ].map((finding, i) => {
                    const isExpanded = expandedCards[i];

                    return (
                        <div key={i} className="card flex-col" style={{ padding: 0, overflow: "hidden" }}>

                            <button
                                onClick={() => toggleCard(i)}
                                className="flex justify-between items-start text-left w-full"
                                style={{ padding: "1.25rem 1.5rem", backgroundColor: isExpanded ? "var(--surface-hover)" : "var(--surface)" }}
                            >
                                <div className="flex-col gap-2 flex-1">
                                    <div className="flex items-center gap-3">
                                        <span style={{ fontWeight: 700, fontSize: "1.1rem" }}>{finding.title}</span>
                                    </div>
                                    <p style={{ color: "var(--text-dark)", lineHeight: 1.5 }}>{finding.summary}</p>
                                </div>

                                <div className="flex-col items-end gap-2 ml-4">
                                    <span className="mono" style={{ color: "var(--success)", fontSize: "0.8rem", backgroundColor: "rgba(16,185,129,0.1)", padding: "0.2rem 0.6rem", borderRadius: "999px" }}>
                                        {finding.conf}% Conf.
                                    </span>
                                    <div className="flex items-center gap-1 text-muted" style={{ fontSize: "0.85rem" }}>
                                        {isExpanded ? "Collapse" : "Expand"} <ChevronDown size={16} style={{ transform: isExpanded ? "rotate(180deg)" : "rotate(0)", transition: "transform 0.2s" }} />
                                    </div>
                                </div>
                            </button>

                            {isExpanded && (
                                <div className="flex-col gap-3 animate-fade-in" style={{ padding: "1.25rem 1.5rem", borderTop: "1px solid var(--border)" }}>
                                    <p style={{ color: "var(--text-muted)", lineHeight: 1.6 }}>{finding.details}</p>
                                    <p className="mono text-muted" style={{ fontSize: "0.8rem", display: "flex", gap: "0.5rem" }}>
                                        Source: <span style={{ textDecoration: "underline", color: "var(--text-dark)" }}>{finding.source}</span>
                                    </p>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>

            {/* Recommendations */}
            <div className="card flex-col gap-4" style={{ borderLeft: "4px solid var(--success)" }}>
                <h2 style={{ fontSize: "1.25rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                    ✅ Recommendations
                </h2>
                <div className="flex-col gap-3">
                    <div className="flex gap-3 items-start">
                        <span style={{ fontWeight: 800, color: "var(--success)" }}>1.</span>
                        <span style={{ lineHeight: 1.5 }}>Reduce price to ₹1,499 — closes 80% of the gap</span>
                    </div>
                    <div className="flex gap-3 items-start">
                        <span style={{ fontWeight: 800, color: "var(--success)" }}>2.</span>
                        <span style={{ lineHeight: 1.5 }}>Issue firmware update addressing battery drain</span>
                    </div>
                    <div className="flex gap-3 items-start">
                        <span style={{ fontWeight: 800, color: "var(--success)" }}>3.</span>
                        <span style={{ lineHeight: 1.5 }}>Run a targeted review campaign with verified buyers</span>
                    </div>
                    <div className="flex gap-3 items-start">
                        <span style={{ fontWeight: 800, color: "var(--success)" }}>4.</span>
                        <span style={{ lineHeight: 1.5 }}>A/B test new listing title including "30hr battery"</span>
                    </div>
                </div>
            </div>

            {/* Sources Used */}
            <div className="flex-col gap-2">
                <h3 style={{ fontSize: "1.1rem", color: "var(--text-muted)" }}>Sources (12)</h3>
                <p className="mono text-muted" style={{ fontSize: "0.85rem", lineHeight: 1.6 }}>
                    amazon.in/reviews • flipkart.com • 91mobiles.com • techradar.com • competitor-a.com • +7 industry blogs/forums...
                </p>
            </div>

            {/* Follow Up Actions */}
            <div className="flex-col gap-4 mt-6">
                <h2 style={{ fontSize: "1.25rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                    🔄 Dig Deeper
                </h2>
                <div className="flex flex-wrap gap-3">
                    {[
                        "Go deeper on battery complaints",
                        "Compare vs Competitor A specifically",
                        "Stress test at ₹1,499 price point",
                        "Check similar SKUs in same category"
                    ].map((action, i) => (
                        <Link key={i} href={`/research?q=${encodeURIComponent(action)}&mode=quick`} className="card flex items-center justify-between gap-4" style={{ flex: "1 1 calc(50% - 1.5rem)", minWidth: "250px", cursor: "pointer", transition: "all 0.2s", padding: "1rem" }}>
                            <span style={{ fontWeight: 500, fontSize: "0.95rem" }}>{action}</span>
                            <ArrowRight size={18} color="var(--accent-teal)" />
                        </Link>
                    ))}
                </div>
            </div >

            <style dangerouslySetInnerHTML={{
                __html: `
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-5px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fadeIn 0.3s ease forwards;
        }
      `}} />
        </div >
    );
}
