"use client";

import type { User } from "@supabase/supabase-js";
import DashboardSidebar from "./DashboardSidebar";

interface DashboardLayoutProps {
    children: React.ReactNode;
    user: User;
    role: string;
}

export default function DashboardLayout({
    children,
    user,
    role,
}: DashboardLayoutProps) {
    return (
        <div className="min-h-screen bg-muted/40">
            <div className="mx-auto max-w-7xl px-4 py-6 sm:py-8">
                {/* Mobile */}

                <div className="lg:hidden">
                    <DashboardSidebar
                        user={user}
                        role={role}
                    />

                    <main className="mt-5 rounded-2xl border border-border bg-card p-5 shadow-sm md:p-8">
                        {children}
                    </main>
                </div>

                {/* Desktop */}

                <div className="hidden items-start gap-6 lg:flex">
                    <DashboardSidebar
                        user={user}
                        role={role}
                    />

                    <main className="min-w-0 flex-1 rounded-2xl border border-border bg-card p-8 shadow-sm">
                        {children}
                    </main>
                </div>
            </div>
        </div>
    );
}