"use client";

import { Loader2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { createClient } from "@/lib/supabase/client";

export default function ForgotPasswordForm() {
    const [email, setEmail] = useState("");
    const [emailFocused, setEmailFocused] =
        useState(false);

    const [loading, setLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        if (loading) return;

        setLoading(true);

        try {
            const supabase = createClient();

            const { error } =
                await supabase.auth.resetPasswordForEmail(
                    email,
                    {
                        redirectTo: `${window.location.origin}/auth/callback?next=/auth/reset-password`,
                    }
                );

            if (error) {
                toast.error("লিংক পাঠানো যায়নি", {
                    description: error.message,
                    position: "bottom-center",
                });

                return;
            }

            setSubmitted(true);
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

    if (submitted) {
        return (
            <div className="rounded-lg border border-border bg-muted/40 p-4 text-center text-sm leading-6 text-foreground">
                আপনার ইমেইলে একটি পাসওয়ার্ড রিসেট
                লিংক পাঠানো হয়েছে। লিংকে ক্লিক করে
                নতুন পাসওয়ার্ড সেট করুন।
            </div>
        );
    }

    const emailFloating =
        emailFocused || email.length > 0;

    return (
        <form
            onSubmit={handleSubmit}
            className="space-y-4"
        >
            {/* Email */}

            <div className="relative">
                <input
                    id="email"
                    type="email"
                    required
                    autoComplete="email"
                    value={email}
                    onChange={(e) =>
                        setEmail(e.target.value)
                    }
                    onFocus={() =>
                        setEmailFocused(true)
                    }
                    onBlur={() =>
                        setEmailFocused(false)
                    }
                    disabled={loading}
                    placeholder={
                        emailFloating
                            ? "you@example.com"
                            : ""
                    }
                    className="peer h-12 w-full rounded-lg border border-border bg-background px-4 text-sm text-foreground outline-none transition-all placeholder:text-muted-foreground focus:border-foreground disabled:cursor-not-allowed disabled:opacity-60"
                />

                <label
                    htmlFor="email"
                    className={`pointer-events-none absolute left-3 bg-background px-1 text-sm transition-all duration-200 ${emailFloating
                            ? "-top-2.5 text-xs font-medium text-foreground"
                            : "top-1/2 -translate-y-1/2 text-muted-foreground"
                        }`}
                >
                    ইমেইল
                </label>
            </div>

            {/* Submit */}

            <button
                type="submit"
                disabled={loading}
                className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-foreground py-3 text-sm font-semibold text-background transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
            >
                {loading && (
                    <Loader2 className="size-4 animate-spin" />
                )}

                {loading
                    ? "পাঠানো হচ্ছে..."
                    : "রিসেট লিংক পাঠান"}
            </button>
        </form>
    );
}