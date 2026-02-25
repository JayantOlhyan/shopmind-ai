"use client";

import { useState } from "react";
import Link from "next/link";
import { CheckCircle2, Copy, RefreshCw } from "lucide-react";

export default function SettingsPage() {
    const [profile, setProfile] = useState({
        name: "Jayant Olhyan",
        email: "jay@company.com",
        company: "My Company",
        role: "Product Manager"
    });

    const [prefs, setPrefs] = useState({
        mode: "quick",
        marketplaces: ["Amazon", "Flipkart"],
        categories: ["Electronics", "Fitness"],
        kpis: ["GMV", "CAC", "Margin"],
        goal: "growth"
    });

    const toggleArray = (item: string, array: string[], setter: any) => {
        if (array.includes(item)) {
            setter({ ...prefs, [setter]: array.filter(i => i !== item) });
        } else {
            setter({ ...prefs, [setter]: [...array, item] });
        }
    };

    return (
        <div className="container" style={{ padding: "2rem", display: "flex", flexDirection: "column", gap: "2rem", maxWidth: "900px" }}>

            <div>
                <h1 style={{ fontSize: "2.25rem", marginBottom: "0.25rem" }}>Settings</h1>
                <p className="text-muted">Manage your profile, preferences, and billing.</p>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "2rem" }}>

                {/* Profile Section */}
                <div className="card flex-col gap-6">
                    <h2 style={{ fontSize: "1.25rem", borderBottom: "1px solid var(--border)", paddingBottom: "1rem" }}>Profile</h2>

                    <div className="flex-col gap-4" style={{ maxWidth: "500px" }}>
                        <div className="flex-col gap-2">
                            <label style={{ fontSize: "0.9rem", fontWeight: 600 }}>Name</label>
                            <input type="text" value={profile.name} onChange={e => setProfile({ ...profile, name: e.target.value })} />
                        </div>

                        <div className="flex-col gap-2">
                            <label style={{ fontSize: "0.9rem", fontWeight: 600 }}>Email (verified <span style={{ color: "var(--success)" }}>✅</span>)</label>
                            <input type="email" value={profile.email} disabled style={{ backgroundColor: "var(--surface-hover)", color: "var(--text-muted)", cursor: "not-allowed" }} />
                        </div>

                        <div className="flex gap-4 flex-wrap">
                            <div className="flex-col gap-2 flex-1 min-w-[200px]">
                                <label style={{ fontSize: "0.9rem", fontWeight: 600 }}>Company</label>
                                <input type="text" value={profile.company} onChange={e => setProfile({ ...profile, company: e.target.value })} />
                            </div>
                            <div className="flex-col gap-2 flex-1 min-w-[200px]">
                                <label style={{ fontSize: "0.9rem", fontWeight: 600 }}>Role</label>
                                <select
                                    value={profile.role}
                                    onChange={e => setProfile({ ...profile, role: e.target.value })}
                                    style={{ width: "100%", padding: "0.875rem 1rem", borderRadius: "8px", border: "1px solid var(--border)", backgroundColor: "white", fontSize: "1rem" }}
                                >
                                    <option>Product Manager</option>
                                    <option>Growth / Marketing</option>
                                    <option>Category Owner</option>
                                </select>
                            </div>
                        </div>

                        <button className="btn-primary mt-2" style={{ alignSelf: "flex-start" }}>Save Changes</button>
                    </div>
                </div>

                {/* Research Preferences */}
                <div className="card flex-col gap-6">
                    <div style={{ borderBottom: "1px solid var(--border)", paddingBottom: "1rem" }}>
                        <h2 style={{ fontSize: "1.25rem", marginBottom: "0.25rem" }}>Research Preferences</h2>
                        <p className="text-muted" style={{ fontSize: "0.85rem" }}>Updates your ShopMind memory so AI gets smarter.</p>
                    </div>

                    <div className="flex-col gap-6" style={{ maxWidth: "600px" }}>

                        <div className="flex-col gap-2">
                            <label style={{ fontSize: "0.95rem", fontWeight: 600 }}>Default Mode</label>
                            <div className="flex gap-4">
                                <label className="flex items-center gap-2" style={{ cursor: "pointer" }}>
                                    <input type="radio" name="mode" checked={prefs.mode === "quick"} onChange={() => setPrefs({ ...prefs, mode: "quick" })} /> Quick
                                </label>
                                <label className="flex items-center gap-2" style={{ cursor: "pointer" }}>
                                    <input type="radio" name="mode" checked={prefs.mode === "deep"} onChange={() => setPrefs({ ...prefs, mode: "deep" })} /> Deep
                                </label>
                            </div>
                        </div>

                        <div className="flex-col gap-2">
                            <label style={{ fontSize: "0.95rem", fontWeight: 600 }}>Marketplaces</label>
                            <div className="flex flex-wrap gap-3">
                                {["Amazon", "Flipkart", "Shopify", "Meesho"].map(item => {
                                    const sel = prefs.marketplaces.includes(item);
                                    return (
                                        <button key={item} className="btn-outline flex items-center gap-2" onClick={() => toggleArray(item, prefs.marketplaces, "marketplaces")} style={{ padding: "0.4rem 0.8rem", fontSize: "0.85rem", borderColor: sel ? "var(--accent-teal)" : "var(--border)", backgroundColor: sel ? "rgba(0,180,216,0.1)" : "transparent" }}>
                                            {sel && <CheckCircle2 size={14} color="var(--accent-teal)" />} {item}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        <div className="flex-col gap-2">
                            <label style={{ fontSize: "0.95rem", fontWeight: 600 }}>Categories</label>
                            <div className="flex flex-wrap gap-3">
                                {["Electronics", "Fashion", "Fitness", "Home & Kitchen", "Beauty"].map(item => {
                                    const sel = prefs.categories.includes(item);
                                    return (
                                        <button key={item} className="btn-outline flex items-center gap-2" onClick={() => toggleArray(item, prefs.categories, "categories")} style={{ padding: "0.4rem 0.8rem", fontSize: "0.85rem", borderColor: sel ? "var(--accent-teal)" : "var(--border)", backgroundColor: sel ? "rgba(0,180,216,0.1)" : "transparent" }}>
                                            {sel && <CheckCircle2 size={14} color="var(--accent-teal)" />} {item}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        <div className="flex-col gap-2">
                            <label style={{ fontSize: "0.95rem", fontWeight: 600 }}>Preferred KPIs</label>
                            <div className="flex flex-wrap gap-3">
                                {["GMV", "CAC", "LTV", "Margin", "Return Rate"].map(item => {
                                    const sel = prefs.kpis.includes(item);
                                    return (
                                        <button key={item} className="btn-outline flex items-center gap-2" onClick={() => toggleArray(item, prefs.kpis, "kpis")} style={{ padding: "0.4rem 0.8rem", fontSize: "0.85rem", borderColor: sel ? "var(--accent-teal)" : "var(--border)", backgroundColor: sel ? "rgba(0,180,216,0.1)" : "transparent" }}>
                                            {sel && <CheckCircle2 size={14} color="var(--accent-teal)" />} {item}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        <button className="btn-primary mt-2" style={{ alignSelf: "flex-start" }}>Save Preferences</button>

                    </div>
                </div>

                {/* Usage & Billing */}
                <div className="card flex-col gap-6">
                    <h2 style={{ fontSize: "1.25rem", borderBottom: "1px solid var(--border)", paddingBottom: "1rem" }}>Usage & Billing</h2>

                    <div className="flex-col gap-4" style={{ maxWidth: "500px" }}>
                        <div className="flex justify-between items-end">
                            <div>
                                <p style={{ fontWeight: 600, fontSize: "1.1rem" }}>Plan: Free</p>
                                <p className="text-muted" style={{ fontSize: "0.9rem" }}>8/10 queries used this month</p>
                            </div>
                            <span className="mono text-muted" style={{ fontSize: "0.9rem" }}>80% used</span>
                        </div>

                        <div style={{ width: "100%", height: "8px", backgroundColor: "var(--border)", borderRadius: "999px", overflow: "hidden" }}>
                            <div style={{ width: "80%", height: "100%", backgroundColor: "var(--highlight-gold)", borderRadius: "999px" }}></div>
                        </div>

                        <p className="text-muted" style={{ fontSize: "0.85rem" }}>Resets: March 1, 2026</p>

                        <button className="btn-primary mt-2 flex items-center gap-2" style={{ alignSelf: "flex-start", backgroundColor: "var(--bg-navy)" }}>
                            <span style={{ color: "var(--highlight-gold)" }}>★</span> Upgrade to Pro →
                        </button>
                    </div>
                </div>

                {/* API Access */}
                <div className="card flex-col gap-6" style={{ opacity: 0.7 }}>
                    <div style={{ borderBottom: "1px solid var(--border)", paddingBottom: "1rem", display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                        <div>
                            <h2 style={{ fontSize: "1.25rem", marginBottom: "0.25rem" }}>API Access</h2>
                            <p className="text-muted" style={{ fontSize: "0.85rem" }}>Requires Pro or Enterprise plan.</p>
                        </div>
                        <span className="badge badge-deep" style={{ fontSize: "0.75rem", padding: "0.15rem 0.5rem" }}>Pro Feature</span>
                    </div>

                    <div className="flex-col gap-4" style={{ maxWidth: "500px", pointerEvents: "none" }}>
                        <div className="flex-col gap-2">
                            <label style={{ fontSize: "0.9rem", fontWeight: 600 }}>API Key</label>
                            <div className="flex gap-2 w-full">
                                <input type="text" value="sk-sm-••••••••••••••••" readOnly style={{ flex: 1, backgroundColor: "var(--surface-hover)", color: "var(--text-muted)", fontFamily: "monospace" }} />
                                <button className="btn-outline flex items-center justify-center p-2"><Copy size={18} /></button>
                                <button className="btn-outline flex items-center justify-center p-2"><RefreshCw size={18} /></button>
                            </div>
                        </div>
                        <Link href="#" className="text-muted" style={{ fontSize: "0.85rem", textDecoration: "underline" }}>View API Documentation →</Link>
                    </div>
                </div>

            </div>

        </div>
    );
}
