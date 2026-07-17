"use client";

import { createClient } from "@/lib/supabase/client";
import { useState } from "react";
import { createPortal } from "react-dom";

interface LogoutDialogProps {
    open: boolean;
    onClose: () => void;
}

export default function LogoutDialog({
    open,
    onClose,
}: LogoutDialogProps) {
    const [loading, setLoading] = useState(false);

    if (!open || typeof window === "undefined") {
        return null;
    }

    async function handleLogout() {
        try {
            setLoading(true);

            const supabase = createClient();

            await supabase.auth.signOut();

            window.location.reload();
        } catch (error) {
            console.error(error);
            setLoading(false);
        }
    }

    return createPortal(
        <div
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm"
            onClick={onClose}
        >
            <div
                onClick={(e) => e.stopPropagation()}
                className="w-full max-w-sm rounded-2xl border border-black/10 bg-white p-6 shadow-xl"
            >
                <h2 className="text-lg font-semibold">
                    লগ আউট করবেন?
                </h2>

                <p className="mt-2 text-sm text-muted-foreground">
                    আপনি কি নিশ্চিত যে আপনার অ্যাকাউন্ট থেকে লগ আউট করতে চান?
                </p>

                <div className="mt-6 flex justify-end gap-3">
                    <button
                        onClick={onClose}
                        disabled={loading}
                        className="rounded-lg border border-black/10 px-4 py-2 text-sm hover:bg-muted"
                    >
                        বাতিল
                    </button>

                    <button
                        onClick={handleLogout}
                        disabled={loading}
                        className="rounded-lg bg-black px-4 py-2 text-sm text-white hover:bg-neutral-800 disabled:opacity-50"
                    >
                        {loading ? "অপেক্ষা করুন..." : "লগ আউট"}
                    </button>
                </div>
            </div>
        </div>,
        document.body
    );
}