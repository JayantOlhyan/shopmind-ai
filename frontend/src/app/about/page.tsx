"use client";

import { Box, Database, Server, Settings2, Globe, Cpu, ArrowRight } from "lucide-react";

export default function About() {
    return (
        <div className="container" style={{ padding: "4rem 2rem", display: "flex", flexDirection: "column", gap: "3rem", alignItems: "center" }}>

            <div style={{ textAlign: "center", maxWidth: "600px" }}>
                <h1 style={{ fontSize: "2rem", fontWeight: 800, marginBottom: "1rem" }}>Rust Scraping engine</h1>
                <p style={{ color: "var(--muted)", fontSize: "1.1rem", lineHeight: 1.6 }}>
                    Rust scraping engine & multiapple API channels via RabbitMQ
                </p>
            </div>

            {/* Diagram Container */}
            <div style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "2rem",
                backgroundColor: "var(--surface)",
                padding: "4rem",
                borderRadius: "24px",
                border: "1px solid var(--border)",
                boxShadow: "var(--shadow-sm)",
                width: "100%",
                maxWidth: "900px",
                flexWrap: "wrap"
            }}>

                {/* Source Nodes */}
                <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>

                    <div className="card" style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.5rem", width: "140px", textAlign: "center", zIndex: 10 }}>
                        <Box size={32} strokeWidth={1.5} color="var(--primary)" />
                        <span style={{ fontSize: "0.85rem", fontWeight: 600 }}>Decentralized nodes</span>
                    </div>

                    <div className="card" style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.5rem", width: "140px", textAlign: "center", zIndex: 10 }}>
                        <Globe size={32} strokeWidth={1.5} color="var(--primary)" />
                        <span style={{ fontSize: "0.85rem", fontWeight: 600 }}>Web Crawlers</span>
                    </div>

                    <div className="card" style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.5rem", width: "140px", textAlign: "center", zIndex: 10 }}>
                        <Database size={32} strokeWidth={1.5} color="var(--primary)" />
                        <span style={{ fontSize: "0.85rem", fontWeight: 600 }}>Scraping APIs</span>
                    </div>

                </div>

                {/* Arrow & Rust Engine */}
                <ArrowRight size={32} color="var(--muted)" />

                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "1rem" }}>
                    <div style={{
                        width: "120px", height: "120px",
                        borderRadius: "50%",
                        border: "4px dashed var(--muted)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        position: "relative"
                    }}>
                        <Cpu size={48} strokeWidth={1} color="var(--primary)" />
                        <div style={{ position: "absolute", bottom: -30, fontSize: "0.85rem", fontWeight: 700, width: "max-content" }}>
                            Rust Scraping Engine
                        </div>
                    </div>
                </div>

                <ArrowRight size={32} color="var(--muted)" />

                {/* Data Pipeline & DB */}
                <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>

                    <div className="card" style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyItems: "center", gap: "0.5rem", width: "180px", textAlign: "center", zIndex: 10, borderColor: "#2563eb", backgroundColor: "#eff6ff" }}>
                        <Server size={32} strokeWidth={1.5} color="#2563eb" />
                        <span style={{ fontSize: "0.85rem", fontWeight: 600, color: "#1e40af" }}>Data pipeline channel</span>
                    </div>

                    <div className="card" style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.5rem", width: "180px", textAlign: "center", zIndex: 10, borderColor: "#16a34a", backgroundColor: "#dcfce7" }}>
                        <Database size={32} strokeWidth={1.5} color="#16a34a" />
                        <span style={{ fontSize: "0.85rem", fontWeight: 600, color: "#14532d" }}>Semantic Vector Database</span>
                    </div>

                </div>

            </div>

        </div>
    );
}
