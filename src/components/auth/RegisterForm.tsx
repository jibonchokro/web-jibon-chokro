"use client";

import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

import { createUserProfile } from "@/actions/auth";
import { createClient } from "@/lib/supabase/client";

export default function RegisterForm() {
    const router = useRouter();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [awaitingConfirmation, setAwaitingConfirmation] = useState(false);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        if (loading) return;

        if (password !== confirmPassword) {
            toast.error("পাসওয়ার্ড মিলছে না", {
                description: "দুটি পাসওয়ার্ড একই হতে হবে।",
                position: "bottom-center",
            });

            return;
        }

        if (password.length < 6) {
            toast.error("পাসওয়ার্ড খুবই ছোট", {
                description: "কমপক্ষে ৬ অক্ষরের পাসওয়ার্ড দিন।",
                position: "bottom-center",
            });

            return;
        }

        setLoading(true);

        try {
            const supabase = createClient();

            const { data, error } = await supabase.auth.signUp({
                email,
                password,
                options: {
                    data: {
                        full_name: name,
                    },
                },
            });

            if (error) {
                toast.error("অ্যাকাউন্ট তৈরি ব্যর্থ হয়েছে", {
                    description: error.message === "User already registered" ? "এই ইমেইল দিয়ে ইতিমধ্যে অ্যাকাউন্ট আছে।" : error.message,
                    position: "bottom-center",
                });

                return;
            }

            if (!data.session) {
                setAwaitingConfirmation(true);
                return;
            }

            await createUserProfile();

            toast.success("অ্যাকাউন্ট তৈরি হয়েছে", {
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

    if (awaitingConfirmation) {
        return (
            <div className="rounded-lg border border-border bg-muted/40 p-4 text-center text-sm leading-6 text-foreground">
                আপনার ইমেইলে একটি নিশ্চিতকরণ লিংক পাঠানো হয়েছে। লিংকে ক্লিক করে আপনার অ্যাকাউন্ট সক্রিয় করুন।
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label htmlFor="name" className="mb-2 block text-sm font-medium text-foreground">
                    নাম
                </label>

                <input
                    id="name"
                    type="text"
                    required
                    autoComplete="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    disabled={loading}
                    placeholder="আপনার নাম"
                    className="w-full rounded-lg border border-border bg-background px-4 py-3 text-sm text-foreground outline-none transition placeholder:text-muted-foreground focus:border-foreground disabled:opacity-60"
                />
            </div>

            <div>
                <label htmlFor="email" className="mb-2 block text-sm font-medium text-foreground">
                    ইমেইল
                </label>

                <input
                    id="email"
                    type="email"
                    required
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={loading}
                    placeholder="you@example.com"
                    className="w-full rounded-lg border border-border bg-background px-4 py-3 text-sm text-foreground outline-none transition placeholder:text-muted-foreground focus:border-foreground disabled:opacity-60"
                />
            </div>

            <div>
                <label htmlFor="password" className="mb-2 block text-sm font-medium text-foreground">
                    পাসওয়ার্ড
                </label>

                <input
                    id="password"
                    type="password"
                    required
                    autoComplete="new-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={loading}
                    placeholder="কমপক্ষে ৬ অক্ষর"
                    className="w-full rounded-lg border border-border bg-background px-4 py-3 text-sm text-foreground outline-none transition placeholder:text-muted-foreground focus:border-foreground disabled:opacity-60"
                />
            </div>

            <div>
                <label htmlFor="confirmPassword" className="mb-2 block text-sm font-medium text-foreground">
                    পাসওয়ার্ড নিশ্চিত করুন
                </label>

                <input
                    id="confirmPassword"
                    type="password"
                    required
                    autoComplete="new-password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    disabled={loading}
                    placeholder="আবার লিখুন"
                    className="w-full rounded-lg border border-border bg-background px-4 py-3 text-sm text-foreground outline-none transition placeholder:text-muted-foreground focus:border-foreground disabled:opacity-60"
                />
            </div>

            <button
                type="submit"
                disabled={loading}
                className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-foreground py-3 text-sm font-semibold text-background transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
            >
                {loading && <Loader2 className="size-4 animate-spin" />}

                {loading ? "তৈরি হচ্ছে..." : "অ্যাকাউন্ট তৈরি করুন"}
            </button>
        </form>
    );
}