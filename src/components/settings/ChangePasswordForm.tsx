"use client";

import { Loader2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { createClient } from "@/lib/supabase/client";

export default function ChangePasswordForm() {
    const [open, setOpen] = useState(false);
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] =
        useState("");
    const [loading, setLoading] = useState(false);

    async function handleSubmit(
        e: React.FormEvent
    ) {
        e.preventDefault();

        if (loading) return;

        if (password !== confirmPassword) {
            toast.error("পাসওয়ার্ড মিলছে না", {
                description:
                    "দুটি পাসওয়ার্ড একই হতে হবে।",
                position: "bottom-center",
            });

            return;
        }

        if (password.length < 6) {
            toast.error(
                "পাসওয়ার্ড খুবই ছোট",
                {
                    description:
                        "কমপক্ষে ৬ অক্ষরের পাসওয়ার্ড দিন।",
                    position: "bottom-center",
                }
            );

            return;
        }

        setLoading(true);

        try {
            const supabase = createClient();

            const { error } =
                await supabase.auth.updateUser({
                    password,
                });

            if (error) {
                toast.error(
                    "পাসওয়ার্ড পরিবর্তন ব্যর্থ হয়েছে",
                    {
                        description: error.message,
                        position: "bottom-center",
                    }
                );

                return;
            }

            toast.success(
                "পাসওয়ার্ড পরিবর্তন হয়েছে",
                {
                    position: "bottom-center",
                }
            );

            setPassword("");
            setConfirmPassword("");
            setOpen(false);
        } catch (error) {
            console.error(error);

            toast.error("কিছু একটা ভুল হয়েছে", {
                description: "আবার চেষ্টা করুন।",
                position: "bottom-center",
            });
        } finally {
            setLoading(false);
        }
    }

    if (!open) {
        return (
            <button
                type="button"
                onClick={() => setOpen(true)}
                className="rounded-lg border border-black/10 bg-background px-4 py-2 text-sm font-medium transition hover:bg-muted"
            >
                পাসওয়ার্ড পরিবর্তন করুন
            </button>
        );
    }

    return (
        <form
            onSubmit={handleSubmit}
            className="w-full max-w-sm space-y-3"
        >
            <input
                type="password"
                required
                autoComplete="new-password"
                value={password}
                onChange={(e) =>
                    setPassword(e.target.value)
                }
                disabled={loading}
                placeholder="নতুন পাসওয়ার্ড"
                className="h-10 w-full rounded-lg border border-black/10 bg-background px-3 text-sm outline-none transition focus:border-black disabled:opacity-60"
            />

            <input
                type="password"
                required
                autoComplete="new-password"
                value={confirmPassword}
                onChange={(e) =>
                    setConfirmPassword(
                        e.target.value
                    )
                }
                disabled={loading}
                placeholder="পাসওয়ার্ড নিশ্চিত করুন"
                className="h-10 w-full rounded-lg border border-black/10 bg-background px-3 text-sm outline-none transition focus:border-black disabled:opacity-60"
            />

            <div className="flex gap-2">
                <button
                    type="submit"
                    disabled={loading}
                    className="inline-flex items-center gap-2 rounded-lg bg-black px-4 py-2 text-sm font-medium text-white transition hover:opacity-90 disabled:opacity-50"
                >
                    {loading && (
                        <Loader2 className="size-4 animate-spin" />
                    )}
                    সংরক্ষণ করুন
                </button>

                <button
                    type="button"
                    onClick={() => setOpen(false)}
                    disabled={loading}
                    className="rounded-lg border border-black/10 px-4 py-2 text-sm transition hover:bg-muted disabled:opacity-50"
                >
                    বাতিল
                </button>
            </div>
        </form>
    );
}