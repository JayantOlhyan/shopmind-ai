"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BrainCircuit, Home, Search, Clock, Settings, HelpCircle, LogOut } from "lucide-react";

export default function Sidebar() {
    const pathname = usePathname();

    // Define public pages that should NOT have a sidebar.
    // We'll also use this logic in layout.tsx to swap themes.
    const isPublicOrAuthPage = ['/', '/login', '/signup', '/onboarding'].includes(pathname);

    if (isPublicOrAuthPage) {
        return null;
    }

    return (
        <aside style={{
            width: "280px",
            height: "100vh",
            backgroundColor: "var(--surface)",
            borderRight: "1px solid var(--border)",
            display: "flex",
            flexDirection: "column",
            padding: "2rem 1.5rem",
            position: "sticky",
            top: 0
        }}>
            {/* Brand Logo */}
            <Link href="/dashboard" className="flex items-center gap-3" style={{ marginBottom: "3rem", paddingLeft: "0.5rem" }}>
                <div style={{ backgroundColor: "var(--accent-teal)", borderRadius: "8px", padding: "0.4rem", color: "white" }}>
                    <BrainCircuit size={24} />
                </div>
                <span style={{ fontWeight: 800, fontSize: "1.25rem", letterSpacing: "-0.02em" }}>ShopMind</span>
            </Link>

            {/* Main Navigation */}
            <div style={{ marginBottom: "1rem" }}>
                <p className="text-muted" style={{ fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "0.75rem", paddingLeft: "1rem" }}>
                    Main
                </p>
                <nav className="flex-col">
                    <Link href="/dashboard" className={`sidebar-link ${pathname === '/dashboard' ? 'active' : ''}`}>
                        <Home size={18} /> Dashboard
                    </Link>
                    <Link href="/research" className={`sidebar-link ${pathname === '/research' ? 'active' : ''}`}>
                        <Search size={18} /> Research
                    </Link>
                    <Link href="/history" className={`sidebar-link ${pathname === '/history' ? 'active' : ''}`}>
                        <Clock size={18} /> History
                    </Link>
                </nav>
            </div>

            <div style={{ flex: 1 }}></div>

            {/* Bottom Actions */}
            <div>
                <p className="text-muted" style={{ fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "0.75rem", paddingLeft: "1rem" }}>
                    Others
                </p>
                <nav className="flex-col">
                    <Link href="/settings" className={`sidebar-link ${pathname === '/settings' ? 'active' : ''}`}>
                        <Settings size={18} /> Settings
                    </Link>
                    <button className="sidebar-link w-full text-left">
                        <HelpCircle size={18} /> Get Help
                    </button>
                    <button className="sidebar-link w-full text-left" style={{ marginTop: "1rem" }}>
                        <LogOut size={18} /> Logout
                    </button>
                </nav>
            </div>

        </aside>
    );
}
