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

    return (
        <>
            <Header user={user} />

            <main className="flex min-h-[calc(100vh-8rem)] items-center justify-center bg-[#f4f4f4] px-4 py-10 sm:px-6">

                <div className="w-full max-w-[400px]">

                    <div className="rounded-xl border border-black/10 bg-background p-6 shadow-xs sm:p-8">

                        {/* Header */}

                        <div className="text-center">

                            <h1 className="text-3xl font-bold tracking-tight">
                                পাসওয়ার্ড রিসেট
                            </h1>

                            <p className="mt-2 text-sm text-muted-foreground">
                                আপনার ইমেইল দিন, আমরা একটি
                                রিসেট লিংক পাঠাবো।
                            </p>

                        </div>

                        {/* Form */}

                        <div className="mt-8">

                            <ForgotPasswordForm />

                        </div>

                        {/* Links */}

                        <div className="mt-6 text-center text-sm">

                            <Link
                                href="/auth/login"
                                className="font-medium transition hover:underline"
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