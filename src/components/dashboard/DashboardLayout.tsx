"use client";

import type { User } from "@supabase/supabase-js";
import DashboardSidebar from "./DashboardSidebar";

interface DashboardLayoutProps {
    children: React.ReactNode;
    user: User;
}

export default function DashboardLayout({
    children,
    user,
}: DashboardLayoutProps) {
    return (
        <div className="min-h-screen bg-muted/40">
            <div className="mx-auto max-w-7xl px-4 py-8">

                {/* Mobile */}
                <div className="lg:hidden">
                    <DashboardSidebar user={user} />

                    <main className="mt-6 rounded-2xl border border-border bg-card p-5 md:p-8">
                        {children}
                    </main>
                </div>

                {/* Desktop */}
                <div className="hidden items-start gap-8 lg:flex">

                    <DashboardSidebar user={user} />

                    <main className="min-w-0 flex-1 rounded-2xl border border-border bg-card p-8">
                        {children}
                    </main>

                </div>

            </div>
        </div>
    );
}