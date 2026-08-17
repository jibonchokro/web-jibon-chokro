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
        if (loading) return;

        try {
            setLoading(true);

            const supabase = createClient();

            const { error } = await supabase.auth.signOut();

            if (error) {
                throw error;
            }

            window.location.reload();
        } catch (error) {
            console.error("Logout failed:", error);
            setLoading(false);
        }
    }

    const modal =
        confirmOpen &&
            typeof window !== "undefined"
            ? createPortal(
                <div
                    className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40 p-4 backdrop-blur-[2px] dark:bg-black/65"
                    onPointerDown={(event) => {
                        event.stopPropagation();
                    }}
                    onClick={() => {
                        if (!loading) {
                            setConfirmOpen(false);
                        }
                    }}
                >
                    <div
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="logout-dialog-title"
                        aria-describedby="logout-dialog-description"
                        className="w-full max-w-[320px] overflow-hidden rounded-2xl border border-border bg-background shadow-2xl"
                        onPointerDown={(event) => {
                            event.stopPropagation();
                        }}
                        onClick={(event) => {
                            event.stopPropagation();
                        }}
                    >
                        {/* Content */}

                        <div className="p-6">
                            <div>
                                <h2
                                    id="logout-dialog-title"
                                    className="text-lg font-semibold tracking-tight text-foreground"
                                >
                                    লগ আউট করবেন?
                                </h2>

                                <p
                                    id="logout-dialog-description"
                                    className="mt-2 text-sm leading-6 text-muted-foreground"
                                >
                                    আপনি কি নিশ্চিত যে আপনার
                                    অ্যাকাউন্ট থেকে লগ আউট করতে
                                    চান?
                                </p>
                            </div>
                        </div>

                        {/* Footer */}

                        <div className="flex items-center justify-end gap-2 border-t border-border bg-muted/20 px-6 py-4">
                            <button
                                type="button"
                                onClick={() =>
                                    setConfirmOpen(false)
                                }
                                disabled={loading}
                                className="inline-flex h-9 items-center justify-center rounded-lg border border-border bg-background px-4 text-sm font-medium text-foreground transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                            >
                                বাতিল
                            </button>

                            <button
                                type="button"
                                onClick={handleLogout}
                                disabled={loading}
                                className="inline-flex h-9 items-center justify-center gap-2 rounded-lg border border-destructive/20 bg-destructive px-4 text-sm font-medium text-white transition-colors hover:bg-destructive/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-destructive/30 disabled:pointer-events-none disabled:opacity-50"
                            >
                                <LogOut
                                    size={15}
                                    className={
                                        loading
                                            ? "animate-pulse"
                                            : ""
                                    }
                                />

                                <span>
                                    {loading
                                        ? "লগ আউট হচ্ছে..."
                                        : "লগ আউট"}
                                </span>
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
                    {loading
                        ? "লগ আউট হচ্ছে..."
                        : "লগ আউট"}
                </span>
            </button>

            {modal}
        </>
    );
}