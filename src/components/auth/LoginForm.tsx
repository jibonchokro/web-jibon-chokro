"use client";

import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

import { createUserProfile } from "@/actions/auth";
import { createClient } from "@/lib/supabase/client";

export default function LoginForm() {
    const router = useRouter();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    async function handleSubmit(
        e: React.FormEvent
    ) {
        e.preventDefault();

        if (loading) return;

        setLoading(true);

        try {
            const supabase = createClient();

            const { error } =
                await supabase.auth.signInWithPassword({
                    email,
                    password,
                });

            if (error) {
                toast.error("লগইন ব্যর্থ হয়েছে", {
                    description:
                        error.message ===
                            "Invalid login credentials"
                            ? "ইমেইল অথবা পাসওয়ার্ড সঠিক নয়।"
                            : error.message,
                    position: "bottom-center",
                });

                return;
            }

            // Ensures a profiles row exists even for accounts
            // created before this table/flow existed.
            await createUserProfile();

            toast.success("লগইন সফল হয়েছে", {
                position: "bottom-center",
            });

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
                    htmlFor="email"
                    className="mb-2 block text-sm font-medium"
                >
                    ইমেইল
                </label>

                <input
                    id="email"
                    type="email"
                    required
                    autoComplete="email"
                    value={email}
                    onChange={(e) =>
                        setEmail(e.target.value)
                    }
                    disabled={loading}
                    placeholder="you@example.com"
                    className="w-full rounded-lg border border-black/10 bg-background px-4 py-3 text-sm outline-none transition focus:border-black disabled:opacity-60"
                />
            </div>

            <div>
                <label
                    htmlFor="password"
                    className="mb-2 block text-sm font-medium"
                >
                    পাসওয়ার্ড
                </label>

                <input
                    id="password"
                    type="password"
                    required
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) =>
                        setPassword(e.target.value)
                    }
                    disabled={loading}
                    placeholder="••••••••"
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
                    ? "লগইন হচ্ছে..."
                    : "লগইন করুন"}
            </button>
        </form>
    );
}