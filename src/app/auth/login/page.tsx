import LoginButton from "@/components/auth/LoginButton";
import Footer from "@/components/footer/Footer";
import Header from "@/components/header/Header";
import { createClient } from "@/lib/supabase/server";
import Link from "next/link";

export default async function LoginPage() {
    const supabase = await createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    return (
        <>
            <Header user={user} />

            <main className="flex bg-[#f4f4f4]] min-h-[calc(100vh-8rem)] items-center justify-center px-4 py-10 sm:px-6">

                <div className="w-full max-w-[400px]">

                    <div className="rounded-xl border border-black/10 bg-background p-6 shadow-xs sm:p-8">

                        {/* Header */}

                        <div className="text-center">

                            <h1 className="text-3xl font-bold tracking-tight">
                                স্বাগতম
                            </h1>

                            <p className="mt-2 text-sm text-muted-foreground">
                                আপনার অ্যাকাউন্টে লগইন করুন।
                            </p>

                        </div>

                        {/* Google */}

                        <div className="mt-8">

                            <LoginButton />

                        </div>

                        {/* Divider */}

                        <div className="my-8 flex items-center gap-4">

                            <div className="h-px flex-1 bg-black/10" />

                            <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                                অথবা
                            </span>

                            <div className="h-px flex-1 bg-black/10" />

                        </div>

                        {/* Manual Login */}

                        <form className="space-y-4">

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
                                    disabled
                                    placeholder="Coming Soon"
                                    className="w-full rounded-lg border border-black/10 bg-muted/40 px-4 py-3 text-sm outline-none"
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
                                    disabled
                                    placeholder="Coming Soon"
                                    className="w-full rounded-lg border border-black/10 bg-muted/40 px-4 py-3 text-sm outline-none"
                                />

                            </div>

                            <button
                                type="button"
                                disabled
                                className="w-full rounded-lg bg-black py-3 text-sm font-semibold text-white opacity-50"
                            >
                                Login (Coming Soon)
                            </button>

                        </form>

                        {/* Links */}

                        <div className="mt-6 flex items-center justify-between text-sm">

                            <Link
                                href="/forgot-password"
                                className="text-muted-foreground transition hover:text-foreground"
                            >
                                পাসওয়ার্ড ভুলে গেছেন?
                            </Link>

                            <Link
                                href="/register"
                                className="font-medium transition hover:underline"
                            >
                                নতুন অ্যাকাউন্ট
                            </Link>

                        </div>

                    </div>

                    <p className="mt-6 text-center text-xs leading-6 text-muted-foreground">
                        লগইন করার মাধ্যমে আপনি আমাদের{" "}
                        <Link
                            href="/terms"
                            className="underline underline-offset-4"
                        >
                            Terms
                        </Link>{" "}
                        এবং{" "}
                        <Link
                            href="/privacy"
                            className="underline underline-offset-4"
                        >
                            Privacy Policy
                        </Link>{" "}
                        মেনে নিচ্ছেন।
                    </p>

                </div>

            </main>

            <Footer />
        </>
    );
}