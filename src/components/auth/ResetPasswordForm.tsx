"use client";

import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

import { createClient } from "@/lib/supabase/client";

export default function ResetPasswordForm() {
    const router = useRouter();

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

            router.push("/");
            router.refresh();
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

    return (
        <form
            onSubmit={handleSubmit}
            className="space-y-4"
        >
            <div>
                <label
                    htmlFor="password"
                    className="mb-2 block text-sm font-medium"
                >
                    নতুন পাসওয়ার্ড
                </label>

                <input
                    id="password"
                    type="password"
                    required
                    autoComplete="new-password"
                    value={password}
                    onChange={(e) =>
                        setPassword(e.target.value)
                    }
                    disabled={loading}
                    placeholder="কমপক্ষে ৬ অক্ষর"
                    className="w-full rounded-lg border border-black/10 bg-background px-4 py-3 text-sm outline-none transition focus:border-black disabled:opacity-60"
                />
            </div>

            <div>
                <label
                    htmlFor="confirmPassword"
                    className="mb-2 block text-sm font-medium"
                >
                    পাসওয়ার্ড নিশ্চিত করুন
                </label>

                <input
                    id="confirmPassword"
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
                    placeholder="আবার লিখুন"
                    className="w-full rounded-lg border border-black/10 bg-background px-4 py-3 text-sm outline-none transition focus:border-black disabled:opacity-60"
                />
            </div>

            <button
                type="submit"
                disabled={loading}
                className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-black py-3 text-sm font-semibold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
            >
                {loading && (
                    <Loader2 className="size-4 animate-spin" />
                )}

                {loading
                    ? "পরিবর্তন হচ্ছে..."
                    : "পাসওয়ার্ড পরিবর্তন করুন"}
            </button>
        </form>
    );
}