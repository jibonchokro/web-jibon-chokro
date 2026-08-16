import LoginButton from "@/components/auth/LoginButton";
import LoginForm from "@/components/auth/LoginForm";
import Footer from "@/components/footer/Footer";
import Header from "@/components/header/Header";
import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function LoginPage() {
    const supabase = await createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (user) {
        redirect("/");
    }

    return (
        <>
            <Header user={user} />

            <main className="flex min-h-[calc(100vh-8rem)] items-center justify-center bg-background px-4 py-10 text-foreground sm:px-6">
                <div className="w-full max-w-[400px]">
                    <div className="rounded-xl border border-border bg-card p-6 shadow-xs sm:p-8">
                        {/* Header */}

                        <div className="text-center">
                            <h1 className="text-3xl font-bold tracking-tight text-foreground">
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
                            <div className="h-px flex-1 bg-border" />

                            <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                                অথবা
                            </span>

                            <div className="h-px flex-1 bg-border" />
                        </div>

                        {/* Manual Login */}

                        <LoginForm />

                        {/* Links */}

                        <div className="mt-6 flex items-center justify-between text-sm">
                            <Link
                                href="/auth/forgot-password"
                                className="text-muted-foreground transition hover:text-foreground"
                            >
                                পাসওয়ার্ড ভুলে গেছেন?
                            </Link>

                            <Link
                                href="/auth/register"
                                className="font-medium text-foreground transition hover:underline"
                            >
                                নতুন অ্যাকাউন্ট
                            </Link>
                        </div>
                    </div>

                    <p className="mt-6 text-center text-xs leading-6 text-muted-foreground">
                        লগইন করার মাধ্যমে আপনি আমাদের{" "}
                        <Link
                            href="/terms"
                            className="text-foreground underline underline-offset-4"
                        >
                            Terms
                        </Link>{" "}
                        এবং{" "}
                        <Link
                            href="/privacy"
                            className="text-foreground underline underline-offset-4"
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