"use client";

import Link from "next/link";
import { useState } from "react";
import { BrainCircuit, Check, Eye, EyeOff } from "lucide-react";

export default function Login() {
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({ email: "", password: "" });

    return (
        <div className="flex w-full" style={{ minHeight: "100vh" }}>

            {/* Left Side - Visual */}
            <div className="dark-bg flex-col justify-between" style={{ flex: 1, padding: "3rem", display: "none" }}>
                {/* Visible on larger screens, handled via global CSS media queries usually, but inline here for simplicity */}
                <div className="flex items-center gap-2" style={{ fontWeight: 800, fontSize: "1.25rem" }}>
                    <BrainCircuit size={24} color="var(--accent-orange)" />
                    ShopMind AI
                </div>

                <div style={{ maxWidth: "500px", margin: "auto 0" }}>
                    <h2 style={{ fontSize: "2.5rem", lineHeight: 1.3, fontWeight: 700, marginBottom: "2rem" }}>
                        "We reduced our research time from 4 hours to 8 minutes."
                    </h2>
                    <p style={{ color: "var(--text-muted)", fontSize: "1.1rem" }}>— Priya S., Category Manager at Myntra</p>
                </div>

                <div className="flex gap-4 flex-wrap" style={{ marginTop: "auto" }}>
                    <div className="flex items-center gap-2" style={{ backgroundColor: "rgba(255,255,255,0.05)", padding: "0.5rem 1rem", borderRadius: "9999px", fontSize: "0.85rem" }}>
                        <Check size={16} color="var(--success)" /> 10,000+ reports generated
                    </div>
                    <div className="flex items-center gap-2" style={{ backgroundColor: "rgba(255,255,255,0.05)", padding: "0.5rem 1rem", borderRadius: "9999px", fontSize: "0.85rem" }}>
                        <Check size={16} color="var(--success)" /> 500+ e-commerce teams
                    </div>
                    <div className="flex items-center gap-2" style={{ backgroundColor: "rgba(255,255,255,0.05)", padding: "0.5rem 1rem", borderRadius: "9999px", fontSize: "0.85rem" }}>
                        <Check size={16} color="var(--success)" /> 94% accuracy score
                    </div>
                </div>
            </div>

            {/* Right Side - Form */}
            <div className="flex-col justify-center items-center" style={{ flex: 1, backgroundColor: "var(--surface)", padding: "2rem" }}>

                <div className="w-full flex-col gap-6" style={{ maxWidth: "400px" }}>

                    {/* Mobile Logo */}
                    <div className="flex items-center gap-2" style={{ fontWeight: 800, fontSize: "1.25rem", marginBottom: "1rem" }}>
                        <BrainCircuit size={24} color="var(--accent-orange)" />
                        ShopMind AI
                    </div>

                    <div>
                        <h1 style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>Welcome back</h1>
                        <p className="text-muted">Sign in to your ShopMind workspace</p>
                    </div>

                    <button className="btn-outline flex items-center justify-center gap-3 w-full" style={{ padding: "0.875rem" }}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                        </svg>
                        Continue with Google
                    </button>

                    <div className="flex items-center gap-3" style={{ color: "var(--text-muted)", fontSize: "0.85rem" }}>
                        <div style={{ flex: 1, height: "1px", backgroundColor: "var(--border)" }}></div>
                        or
                        <div style={{ flex: 1, height: "1px", backgroundColor: "var(--border)" }}></div>
                    </div>

                    <form className="flex-col gap-4">

                        <div className="flex-col gap-2">
                            <label style={{ fontSize: "0.9rem", fontWeight: 600 }}>Email</label>
                            <input
                                type="email"
                                value={formData.email}
                                onChange={e => setFormData({ ...formData, email: e.target.value })}
                            />
                        </div>

                        <div className="flex-col gap-2">
                            <div className="flex justify-between items-center">
                                <label style={{ fontSize: "0.9rem", fontWeight: 600 }}>Password</label>
                            </div>
                            <div style={{ position: "relative" }}>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    value={formData.password}
                                    onChange={e => setFormData({ ...formData, password: e.target.value })}
                                />
                                <button type="button" onClick={() => setShowPassword(!showPassword)} style={{ position: "absolute", right: "1rem", top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)" }}>
                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                            <div style={{ textAlign: "right" }}>
                                <Link href="#" style={{ fontSize: "0.85rem", color: "var(--accent-orange)", fontWeight: 600 }}>Forgot password?</Link>
                            </div>
                        </div>

                        <Link href="/dashboard" style={{ width: "100%", marginTop: "1rem" }}>
                            <button type="button" className="btn-primary w-full" disabled={!formData.email || !formData.password} style={{ opacity: (!formData.email || !formData.password) ? 0.5 : 1 }}>
                                Sign In →
                            </button>
                        </Link>

                    </form>

                    <p style={{ textAlign: "center", fontSize: "0.9rem", marginTop: "1rem" }}>
                        Don't have an account? <Link href="/signup" style={{ color: "var(--accent-orange)", fontWeight: 600 }}>Sign up free</Link>
                    </p>

                </div>
            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
        @media (max-width: 768px) {
          .dark-bg { display: none !important; }
        }
      `}} />

        </div>
    );
}
