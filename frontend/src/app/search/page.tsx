"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Search, Loader2, Sparkles, SlidersHorizontal, ArrowRight } from "lucide-react";

type Finding = {
    title: string;
    detail: string;
    source: string;
    confidence: number;
};

type ResearchResponse = {
    summary: string;
    findings: Finding[];
    tokens_used: number;
    cost_usd: number;
    latency_seconds: number;
};

export default function SearchResults() {
    const searchParams = useSearchParams();
    const query = searchParams.get("q") || "";
    const router = useRouter();

    const [searchInput, setSearchInput] = useState(query);
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState<ResearchResponse | null>(null);
    const [error, setError] = useState("");

    const stores = ["Amazon", "Best Buy", "Walmart", "Target", "eBay"];
    const [selectedStores, setSelectedStores] = useState(["Amazon", "Best Buy"]);

    useEffect(() => {
        if (!query) {
            setLoading(false);
            return;
        }

        const fetchData = async () => {
            setLoading(true);
            setError("");
            try {
                const res = await fetch("http://localhost:8000/research", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ query, mode: "quick", user_id: "demo_user" })
                });

                if (!res.ok) throw new Error("Failed to fetch research from ShopMind AI");
                const json = await res.json();
                setData(json);
            } catch (err: any) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [query]);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchInput.trim()) {
            router.push(`/search?q=${encodeURIComponent(searchInput)}`);
        }
    };

    const toggleStore = (store: string) => {
        if (selectedStores.includes(store)) {
            setSelectedStores(selectedStores.filter(s => s !== store));
        } else {
            setSelectedStores([...selectedStores, store]);
        }
    };

    return (
        <div className="container" style={{ padding: "2rem", display: "flex", flexDirection: "column", gap: "2rem" }}>
            {/* Top Search Bar (Mini version) */}
            <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                <form
                    onSubmit={handleSearch}
                    style={{
                        display: "flex",
                        alignItems: "center",
                        width: "100%",
                        maxWidth: "600px",
                        backgroundColor: "var(--surface)",
                        borderRadius: "9999px",
                        border: "1px solid var(--border)",
                        padding: "0.5rem 1rem",
                        boxShadow: "var(--shadow-sm)"
                    }}
                >
                    <Search size={18} style={{ color: "var(--muted)", marginRight: "0.5rem" }} />
                    <input
                        type="text"
                        value={searchInput}
                        onChange={(e) => setSearchInput(e.target.value)}
                        style={{
                            flex: 1,
                            border: "none",
                            outline: "none",
                            background: "transparent",
                            fontSize: "0.95rem"
                        }}
                    />
                </form>
                <div style={{ flex: 1 }} />
            </div>

            <div style={{ display: "flex", gap: "3rem", alignItems: "flex-start" }}>
                {/* Sidebar Filters */}
                <aside style={{ width: "200px", flexShrink: 0 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "1.5rem", fontWeight: 600 }}>
                        <SlidersHorizontal size={18} />
                        Filters
                    </div>

                    <div style={{ marginBottom: "2rem" }}>
                        <h3 style={{ fontSize: "0.85rem", textTransform: "uppercase", color: "var(--muted)", marginBottom: "1rem", fontWeight: 700, letterSpacing: "0.05em" }}>
                            Stores
                        </h3>
                        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                            {stores.map(store => (
                                <label key={store} style={{ display: "flex", alignItems: "center", gap: "0.75rem", cursor: "pointer", fontSize: "0.95rem" }}>
                                    <input
                                        type="checkbox"
                                        checked={selectedStores.includes(store)}
                                        onChange={() => toggleStore(store)}
                                        style={{
                                            width: "18px",
                                            height: "18px",
                                            accentColor: "var(--primary)",
                                            cursor: "pointer"
                                        }}
                                    />
                                    {store}
                                </label>
                            ))}
                        </div>
                    </div>
                </aside>

                {/* Main Content */}
                <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "1.5rem" }}>

                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid var(--border)", paddingBottom: "1rem" }}>
                        <h2 style={{ fontSize: "1.25rem", fontWeight: 700, display: "flex", alignItems: "center", gap: "0.5rem" }}>
                            <Sparkles size={20} />
                            AI deal results {query && <span style={{ color: "var(--muted)", fontWeight: 400 }}>for "{query}"</span>}
                        </h2>
                        {data && (
                            <div style={{ fontSize: "0.85rem", color: "var(--muted)", backgroundColor: "var(--surface-hover)", padding: "0.25rem 0.75rem", borderRadius: "9999px" }}>
                                Latency: {data.latency_seconds?.toFixed(2)}s | Tokens: {data.tokens_used}
                            </div>
                        )}
                    </div>

                    {loading ? (
                        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "4rem 0", color: "var(--muted)" }}>
                            <Loader2 size={32} className="animate-spin" style={{ animation: "spin 2s linear infinite", marginBottom: "1rem" }} />
                            <p>Analyzing web catalogs and extracting insights...</p>
                        </div>
                    ) : error ? (
                        <div className="card" style={{ borderColor: "#ffcccb", backgroundColor: "#fff5f5", color: "#d32f2f" }}>
                            <strong>Research Error:</strong> {error}
                        </div>
                    ) : !data || data.findings.length === 0 ? (
                        <div className="card" style={{ textAlign: "center", padding: "4rem 2rem", color: "var(--muted)" }}>
                            No deep insights found. Try a broader search term.
                        </div>
                    ) : (
                        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>

                            <div className="card" style={{ backgroundColor: "var(--surface-hover)", borderLeft: "4px solid var(--primary)" }}>
                                <p style={{ fontWeight: 500, lineHeight: 1.6 }}>{data.summary}</p>
                            </div>

                            <div style={{ display: "flex", flexDirection: "column", gap: "1rem", marginTop: "1rem" }}>
                                {data.findings.filter(f => selectedStores.some(s => f.source.includes(s) || true)).map((finding, idx) => (
                                    <div key={idx} className="card" style={{ display: "flex", alignItems: "center", padding: "1.25rem", gap: "1.5rem" }}>

                                        {/* Placeholder image box */}
                                        <div style={{ width: "80px", height: "80px", backgroundColor: "var(--border)", borderRadius: "8px", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", color: "var(--muted)" }}>
                                            img
                                        </div>

                                        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "0.25rem" }}>
                                            <h3 style={{ fontSize: "1.05rem", fontWeight: 600 }}>{finding.title}</h3>
                                            <p style={{ fontSize: "0.9rem", color: "var(--muted)" }}>{finding.source}</p>
                                            <p style={{ fontSize: "0.95rem", lineHeight: 1.5, marginTop: "0.25rem" }}>{finding.detail}</p>
                                        </div>

                                        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "0.75rem" }}>
                                            <div style={{ fontSize: "0.85rem", color: "var(--muted)", display: "flex", alignItems: "center", gap: "0.25rem" }}>
                                                Confidence: {(finding.confidence * 100).toFixed(0)}%
                                            </div>
                                            <button
                                                onClick={() => router.push(`/products/${encodeURIComponent(finding.title)}?source=${encodeURIComponent(finding.source)}`)}
                                                className="btn-outline"
                                                style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.85rem", padding: "0.5rem 1rem" }}
                                            >
                                                <Sparkles size={14} /> AI insight
                                            </button>
                                        </div>

                                    </div>
                                ))}
                            </div>

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
      `}} />
        </div>
    );
}
