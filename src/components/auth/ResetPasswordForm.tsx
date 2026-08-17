"use client";

import {
    Eye,
    EyeOff,
    Loader2,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

import { createClient } from "@/lib/supabase/client";

export default function ResetPasswordForm() {
    const router = useRouter();

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] =
        useState("");

    const [passwordFocused, setPasswordFocused] =
        useState(false);
    const [
        confirmPasswordFocused,
        setConfirmPasswordFocused,
    ] = useState(false);

    const [showPassword, setShowPassword] =
        useState(false);
    const [showConfirmPassword, setShowConfirmPassword] =
        useState(false);

    const [loading, setLoading] = useState(false);

    async function handleSubmit(e: React.FormEvent) {
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
            toast.error("পাসওয়ার্ড খুবই ছোট", {
                description:
                    "কমপক্ষে ৬ অক্ষরের পাসওয়ার্ড দিন।",
                position: "bottom-center",
            });

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

            toast.success("পাসওয়ার্ড পরিবর্তন হয়েছে", {
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

    const passwordFloating =
        passwordFocused || password.length > 0;

    const confirmPasswordFloating =
        confirmPasswordFocused ||
        confirmPassword.length > 0;

    return (
        <form
            onSubmit={handleSubmit}
            className="space-y-4"
        >
            {/* New Password */}

            <div className="relative">
                <input
                    id="password"
                    type={
                        showPassword
                            ? "text"
                            : "password"
                    }
                    required
                    autoComplete="new-password"
                    value={password}
                    onChange={(e) =>
                        setPassword(e.target.value)
                    }
                    onFocus={() =>
                        setPasswordFocused(true)
                    }
                    onBlur={() =>
                        setPasswordFocused(false)
                    }
                    disabled={loading}
                    placeholder={
                        passwordFloating
                            ? "কমপক্ষে ৬ অক্ষর"
                            : ""
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
                    নতুন পাসওয়ার্ড
                </label>

                <button
                    type="button"
                    tabIndex={-1}
                    onClick={() =>
                        setShowPassword(
                            (prev) => !prev
                        )
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

            {/* Confirm Password */}

            <div className="relative">
                <input
                    id="confirmPassword"
                    type={
                        showConfirmPassword
                            ? "text"
                            : "password"
                    }
                    required
                    autoComplete="new-password"
                    value={confirmPassword}
                    onChange={(e) =>
                        setConfirmPassword(
                            e.target.value
                        )
                    }
                    onFocus={() =>
                        setConfirmPasswordFocused(true)
                    }
                    onBlur={() =>
                        setConfirmPasswordFocused(false)
                    }
                    disabled={loading}
                    placeholder={
                        confirmPasswordFloating
                            ? "আবার লিখুন"
                            : ""
                    }
                    className="peer h-12 w-full rounded-lg border border-border bg-background px-4 pr-12 text-sm text-foreground outline-none transition-all placeholder:text-muted-foreground focus:border-foreground disabled:cursor-not-allowed disabled:opacity-60"
                />

                <label
                    htmlFor="confirmPassword"
                    className={`pointer-events-none absolute left-3 bg-background px-1 text-sm transition-all duration-200 ${confirmPasswordFloating
                            ? "-top-2.5 text-xs font-medium text-foreground"
                            : "top-1/2 -translate-y-1/2 text-muted-foreground"
                        }`}
                >
                    পাসওয়ার্ড নিশ্চিত করুন
                </label>

                <button
                    type="button"
                    tabIndex={-1}
                    onClick={() =>
                        setShowConfirmPassword(
                            (prev) => !prev
                        )
                    }
                    disabled={loading}
                    aria-label={
                        showConfirmPassword
                            ? "পাসওয়ার্ড লুকান"
                            : "পাসওয়ার্ড দেখুন"
                    }
                    className="absolute right-3 top-1/2 flex size-8 -translate-y-1/2 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground disabled:pointer-events-none disabled:opacity-50"
                >
                    {showConfirmPassword ? (
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
                    ? "পরিবর্তন হচ্ছে..."
                    : "পাসওয়ার্ড পরিবর্তন করুন"}
            </button>
        </form>
    );
}