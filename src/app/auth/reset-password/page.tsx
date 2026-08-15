import { redirect } from "next/navigation";

import ResetPasswordForm from "@/components/auth/ResetPasswordForm";
import Footer from "@/components/footer/Footer";
import Header from "@/components/header/Header";
import { createClient } from "@/lib/supabase/server";

export default async function ResetPasswordPage() {
    const supabase = await createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    // No session means the recovery link was invalid, expired, or
    // this page was opened directly without going through email.
    if (!user) {
        redirect("/auth/forgot-password");
    }

    return (
        <>
            <Header user={user} />

            <main className="flex min-h-[calc(100vh-8rem)] items-center justify-center bg-[#f4f4f4] px-4 py-10 sm:px-6">

                <div className="w-full max-w-[400px]">

                    <div className="rounded-xl border border-black/10 bg-background p-6 shadow-xs sm:p-8">

                        {/* Header */}

                        <div className="text-center">

                            <h1 className="text-3xl font-bold tracking-tight">
                                নতুন পাসওয়ার্ড
                            </h1>

                            <p className="mt-2 text-sm text-muted-foreground">
                                আপনার অ্যাকাউন্টের জন্য নতুন
                                পাসওয়ার্ড দিন।
                            </p>

                        </div>

                        {/* Form */}

                        <div className="mt-8">

                            <ResetPasswordForm />

                        </div>

                    </div>

                </div>

            </main>

            <Footer />
        </>
    );
}