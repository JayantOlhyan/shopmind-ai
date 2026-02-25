"use client";

import { usePathname } from "next/navigation";
import Sidebar from "./Sidebar";
import { useEffect } from "react";

export default function AppLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();

    const isPublicOrAuthPage = ['/', '/login', '/signup', '/onboarding'].includes(pathname);

    const themeClass = isPublicOrAuthPage ? "dark-theme" : "light-theme";

    // Option to attach theme class directly to body for root-level styling
    useEffect(() => {
        document.body.className = themeClass;
    }, [themeClass]);

    return (
        <div className={`flex w-full ${themeClass}`} style={{ minHeight: "100vh" }}>
            {!isPublicOrAuthPage && <Sidebar />}

            <main style={{ flex: 1, display: "flex", flexDirection: "column", height: "100vh", overflowY: "auto" }}>
                {/* If we are in the app, add a top padding/header area if needed, or just let pages handle it */}
                {children}
            </main>
        </div>
    );
}
