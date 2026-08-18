import Link from "next/link";

import ForgotPasswordForm from "@/components/auth/ForgotPasswordForm";
import Footer from "@/components/footer/Footer";
import Header from "@/components/header/Header";
import { createClient } from "@/lib/supabase/server";

export default async function ForgotPasswordPage() {
    const supabase = await createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    let role = "user";

    if (user) {
        const { data: profile } = await supabase
            .from("profiles")
            .select("role")
            .eq("id", user.id)
            .single();

        role = profile?.role ?? "user";
    }

    return (
        <>
            <Header user={user} role={role} />

            <main className="flex min-h-[calc(100vh-8rem)] items-center justify-center bg-background px-4 py-10 text-foreground sm:px-6">
                <div className="w-full max-w-[400px]">
                    <div className="rounded-xl border border-border bg-card p-6 shadow-xs sm:p-8">
                        <div className="text-center">
                            <h1 className="text-3xl font-bold tracking-tight text-foreground">
                                পাসওয়ার্ড রিসেট
                            </h1>

                            <p className="mt-2 text-sm text-muted-foreground">
                                আপনার ইমেইল দিন, আমরা একটি
                                রিসেট লিংক পাঠাবো।
                            </p>
                        </div>

                        <div className="mt-8">
                            <ForgotPasswordForm />
                        </div>

                        <div className="mt-6 text-center text-sm">
                            <Link
                                href="/auth/login"
                                className="font-medium text-foreground transition hover:underline"
                            >
                                লগইনে ফিরে যান
                            </Link>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </>
    );
}