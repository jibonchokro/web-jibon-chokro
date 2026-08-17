"use client";

import { Eye, EyeOff, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

import { createUserProfile } from "@/actions/auth";
import { createClient } from "@/lib/supabase/client";

export default function LoginForm() {
    const router = useRouter();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [emailFocused, setEmailFocused] = useState(false);
    const [passwordFocused, setPasswordFocused] = useState(false);

    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    async function handleSubmit(e: React.FormEvent) {
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

    const emailFloating =
        emailFocused || email.length > 0;

    const passwordFloating =
        passwordFocused || password.length > 0;

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
                    onChange={(e) => setEmail(e.target.value)}
                    onFocus={() => setEmailFocused(true)}
                    onBlur={() => setEmailFocused(false)}
                    disabled={loading}
                    placeholder={
                        emailFloating ? "you@example.com" : ""
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

            {/* Password */}

            <div className="relative">
                <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    required
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onFocus={() => setPasswordFocused(true)}
                    onBlur={() => setPasswordFocused(false)}
                    disabled={loading}
                    placeholder={
                        passwordFloating ? "আপনার পাসওয়ার্ড" : ""
                    }
                    className="peer h-12 w-full rounded-lg border border-border bg-background px-4 pr-12 text-sm text-foreground outline-none transition-all placeholder:text-muted-foreground focus:border-foreground disabled:cursor-not-allowed disabled:opacity-60"
                />

                <label
                    htmlFor="password"
                    className={`pointer-events-none absolute left-3 bg-background px-1 text-sm transition-all duration-200 ${passwordFloating
                        ? "-top-2.5 text-xs font-medium text-foreground"
                        : "top-1/2 -translate-y-1/2 text-muted-foreground"
                        }`}
                >
                    পাসওয়ার্ড
                </label>

                <button
                    type="button"
                    tabIndex={-1}
                    onClick={() =>
                        setShowPassword((prev) => !prev)
                    }
                    disabled={loading}
                    aria-label={
                        showPassword
                            ? "পাসওয়ার্ড লুকান"
                            : "পাসওয়ার্ড দেখুন"
                    }
                    className="absolute right-3 top-1/2 flex size-8 -translate-y-1/2 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground disabled:pointer-events-none disabled:opacity-50"
                >
                    {showPassword ? (
                        <EyeOff size={17} />
                    ) : (
                        <Eye size={17} />
                    )}
                </button>
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
                    ? "লগইন হচ্ছে..."
                    : "লগইন করুন"}
            </button>
        </form>
    );
}