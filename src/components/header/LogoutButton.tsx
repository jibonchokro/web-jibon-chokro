"use client";

import { createClient } from "@/lib/supabase/client";
import { cn } from "@/lib/utils";
import { LogOut } from "lucide-react";
import { useState } from "react";
import { createPortal } from "react-dom";

interface LogoutButtonProps {
    className?: string;
}

export default function LogoutButton({
    className,
}: LogoutButtonProps) {
    const [confirmOpen, setConfirmOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    async function handleLogout() {
        try {
            setLoading(true);

            const supabase = createClient();

            await supabase.auth.signOut();

            window.location.reload();

        } catch (error) {
            console.error("Logout failed:", error);
        }
    }

    const modal = confirmOpen && typeof window !== "undefined"
        ? createPortal(
            <div
                className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40 p-4 dark:bg-black/60"
                onClick={() => setConfirmOpen(false)}
            >
                <div
                    className="w-full max-w-[300px] rounded-xl border border-border bg-background p-6 shadow-xl"
                    onClick={(e) => e.stopPropagation()}
                >
                    <h2 className="text-lg font-semibold text-foreground">
                        লগ আউট করবেন?
                    </h2>

                    <p className="mt-2 text-sm text-muted-foreground">
                        আপনি কি নিশ্চিত যে আপনার অ্যাকাউন্ট থেকে লগ আউট করতে চান?
                    </p>

                    <div className="mt-6 flex justify-between gap-3">
                        <button
                            type="button"
                            onClick={() => setConfirmOpen(false)}
                            className="rounded-lg border border-border px-4 py-2 text-sm font-medium text-foreground hover:bg-muted"
                        >
                            বাতিল
                        </button>

                        <button
                            type="button"
                            onClick={handleLogout}
                            disabled={loading}
                            className="rounded-lg border border-border bg-destructive px-4 py-2 text-sm font-medium text-destructive-foreground hover:opacity-90 disabled:opacity-50"
                        >
                            {loading ? "অপেক্ষা করুন..." : "লগ আউট"}
                        </button>
                    </div>
                </div>
            </div>,
            document.body
        )
        : null;


    return (
        <>
            <button
                type="button"
                onClick={() => setConfirmOpen(true)}
                disabled={loading}
                className={cn(
                    "inline-flex items-center gap-2 rounded-lg border border-border text-sm font-medium text-muted-foreground transition-colors hover:border-destructive/30 hover:bg-destructive/10 hover:text-destructive focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
                    className
                )}
            >
                <LogOut size={16} />

                <span>
                    {loading ? "লগ আউট হচ্ছে..." : "লগ আউট"}
                </span>
            </button>

            {modal}
        </>
    );
}