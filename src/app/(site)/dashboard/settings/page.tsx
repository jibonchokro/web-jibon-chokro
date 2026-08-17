import {
    Bell,
    Eye,
    Mail,
    Shield,
} from "lucide-react";
import { redirect } from "next/navigation";

import ChangeEmailForm from "@/components/settings/ChangeEmailForm";
import ChangePasswordForm from "@/components/settings/ChangePasswordForm";
import DeleteAccountDialog from "@/components/settings/DeleteAccountDialog";
import DownloadDataButton from "@/components/settings/DownloadDataButton";
import { createClient } from "@/lib/supabase/server";

export default async function SettingsPage() {
    const supabase = await createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        redirect("/auth/login");
    }

    const provider =
        user.app_metadata?.provider ?? "email";

    const isEmailAccount = provider === "email";

    return (
        <div className="space-y-8">
            {/* Header */}

            <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tight text-foreground">
                    সেটিংস
                </h1>

                <p className="max-w-2xl text-muted-foreground">
                    আপনার অ্যাকাউন্ট, ব্যক্তিগত পছন্দ এবং নিরাপত্তা
                    সংক্রান্ত সেটিংস পরিচালনা করুন।
                </p>
            </div>

            {/* Account */}

            <section className="overflow-hidden rounded-xl border border-border bg-card">
                <div className="border-b border-border bg-muted/30 px-6 py-4">
                    <h2 className="font-semibold tracking-tight text-foreground">
                        অ্যাকাউন্ট
                    </h2>

                    <p className="mt-1 text-sm text-muted-foreground">
                        আপনার লগইন ও পরিচয় সম্পর্কিত তথ্য।
                    </p>
                </div>

                <div className="divide-y divide-border">
                    {/* Email */}

                    <div className="flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between">
                        <div className="flex items-start gap-3">
                            <div className="flex size-9 shrink-0 items-center justify-center rounded-lg border border-border bg-muted text-muted-foreground">
                                <Mail size={18} />
                            </div>

                            <div className="min-w-0">
                                <p className="font-medium text-foreground">
                                    ইমেইল
                                </p>

                                <p className="break-all text-sm text-muted-foreground">
                                    {user.email}
                                </p>
                            </div>
                        </div>

                        {isEmailAccount ? (
                            <ChangeEmailForm
                                currentEmail={
                                    user.email ?? ""
                                }
                            />
                        ) : (
                            <span className="inline-flex w-fit items-center rounded-lg border border-border bg-muted px-3 py-2 text-sm text-muted-foreground">
                                Google দিয়ে পরিচালিত
                            </span>
                        )}
                    </div>

                    {/* Login Method */}

                    <div className="flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between">
                        <div className="flex items-start gap-3">
                            <div className="flex size-9 shrink-0 items-center justify-center rounded-lg border border-border bg-muted text-muted-foreground">
                                <Shield size={18} />
                            </div>

                            <div>
                                <p className="font-medium text-foreground">
                                    লগইন পদ্ধতি
                                </p>

                                <p className="text-sm text-muted-foreground">
                                    {isEmailAccount
                                        ? "ইমেইল ও পাসওয়ার্ড"
                                        : "Google OAuth"}
                                </p>
                            </div>
                        </div>

                        {isEmailAccount ? (
                            <ChangePasswordForm />
                        ) : (
                            <span className="inline-flex w-fit items-center rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-600 dark:text-emerald-400">
                                Connected
                            </span>
                        )}
                    </div>
                </div>
            </section>

            {/* Notifications */}

            <section className="overflow-hidden rounded-xl border border-border bg-card">
                <div className="border-b border-border bg-muted/30 px-6 py-4">
                    <h2 className="font-semibold tracking-tight text-foreground">
                        Notifications
                    </h2>

                    <p className="mt-1 text-sm text-muted-foreground">
                        কোন নোটিফিকেশনগুলো পেতে চান। (শীঘ্রই আসছে)
                    </p>
                </div>

                <div className="divide-y divide-border">
                    {[
                        "নতুন পোস্টের নোটিফিকেশন",
                        "মন্তব্যের রিপ্লাই",
                        "গুরুত্বপূর্ণ ঘোষণা",
                    ].map((item) => (
                        <label
                            key={item}
                            className="flex cursor-not-allowed items-center justify-between p-6 opacity-60"
                        >
                            <div className="flex items-center gap-3">
                                <div className="flex size-9 shrink-0 items-center justify-center rounded-lg border border-border bg-muted text-muted-foreground">
                                    <Bell size={16} />
                                </div>

                                <span className="text-sm font-medium text-foreground">
                                    {item}
                                </span>
                            </div>

                            <input
                                type="checkbox"
                                disabled
                                className="size-4 accent-primary"
                            />
                        </label>
                    ))}
                </div>
            </section>

            {/* Privacy */}

            <section className="overflow-hidden rounded-xl border border-border bg-card">
                <div className="border-b border-border bg-muted/30 px-6 py-4">
                    <h2 className="font-semibold tracking-tight text-foreground">
                        Privacy
                    </h2>

                    <p className="mt-1 text-sm text-muted-foreground">
                        আপনার ব্যক্তিগত তথ্য ও দৃশ্যমানতা নিয়ন্ত্রণ করুন।
                        (শীঘ্রই আসছে)
                    </p>
                </div>

                <div className="divide-y divide-border">
                    {[
                        "পাবলিক প্রোফাইল",
                        "আমার কার্যক্রম দেখানো হবে",
                    ].map((item) => (
                        <label
                            key={item}
                            className="flex cursor-not-allowed items-center justify-between p-6 opacity-60"
                        >
                            <div className="flex items-center gap-3">
                                <div className="flex size-9 shrink-0 items-center justify-center rounded-lg border border-border bg-muted text-muted-foreground">
                                    <Eye size={16} />
                                </div>

                                <span className="text-sm font-medium text-foreground">
                                    {item}
                                </span>
                            </div>

                            <input
                                type="checkbox"
                                disabled
                                className="size-4 accent-primary"
                            />
                        </label>
                    ))}
                </div>
            </section>

            {/* Connected Account */}

            <section className="overflow-hidden rounded-xl border border-border bg-card">
                <div className="border-b border-border bg-muted/30 px-6 py-4">
                    <h2 className="font-semibold tracking-tight text-foreground">
                        Connected Account
                    </h2>

                    <p className="mt-1 text-sm text-muted-foreground">
                        বর্তমানে সংযুক্ত পরিষেবাসমূহ।
                    </p>
                </div>

                <div className="flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <p className="font-medium text-foreground">
                            Google
                        </p>

                        <p className="text-sm text-muted-foreground">
                            {provider === "google"
                                ? "আপনার Google Account সংযুক্ত আছে।"
                                : "সংযুক্ত নয়।"}
                        </p>
                    </div>

                    <span
                        className={`inline-flex w-fit items-center rounded-full border px-3 py-1 text-xs font-medium ${provider === "google"
                                ? "border-emerald-500/20 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                                : "border-border bg-muted text-muted-foreground"
                            }`}
                    >
                        {provider === "google"
                            ? "Connected"
                            : "Not connected"}
                    </span>
                </div>
            </section>

            {/* Danger Zone */}

            <section className="overflow-hidden rounded-xl border border-destructive/20 bg-destructive/5">
                <div className="border-b border-destructive/20 bg-destructive/5 px-6 py-4">
                    <h2 className="font-semibold tracking-tight text-destructive">
                        Danger Zone
                    </h2>

                    <p className="mt-1 text-sm text-destructive/80">
                        এই কাজগুলো স্থায়ী এবং ফিরিয়ে আনা যাবে না।
                        সতর্কতার সাথে ব্যবহার করুন।
                    </p>
                </div>

                <div className="flex flex-wrap gap-3 p-6">
                    <DeleteAccountDialog />
                    <DownloadDataButton />
                </div>
            </section>
        </div>
    );
}