import {
    Calendar,
    CheckCircle2,
    Mail,
    ShieldCheck,
    User as UserIcon,
} from "lucide-react";
import Image from "next/image";
import { redirect } from "next/navigation";

import EditProfileForm from "@/components/dashboard/EditProfileForm";
import { createClient } from "@/lib/supabase/server";

export default async function Page() {
    const supabase = await createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        redirect("/auth/login");
    }

    const [
        { data: profile },
        { count: bookmarksCount },
        { count: commentsCount },
    ] = await Promise.all([
        supabase
            .from("profiles")
            .select("name, avatar")
            .eq("id", user.id)
            .maybeSingle(),

        supabase
            .from("bookmarks")
            .select("*", {
                count: "exact",
                head: true,
            })
            .eq("user_id", user.id),

        supabase
            .from("comments")
            .select("*", {
                count: "exact",
                head: true,
            })
            .eq("user_id", user.id)
            .eq("is_deleted", false),
    ]);

    const fullName =
        profile?.name ??
        user.user_metadata.full_name ??
        user.user_metadata.name ??
        "User";

    const avatar =
        profile?.avatar ??
        user.user_metadata.avatar_url ??
        null;

    const provider =
        user.app_metadata?.provider ?? "email";

    const joinedDate = new Date(
        user.created_at
    ).toLocaleDateString("en-GB", {
        day: "numeric",
        month: "long",
        year: "numeric",
    });

    const stats = [
        {
            label: "Bookmarks",
            value: bookmarksCount ?? 0,
        },
        {
            label: "Comments",
            value: commentsCount ?? 0,
        },
    ];

    return (
        <div className="space-y-8">
            {/* Header */}

            <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tight text-foreground">
                    প্রোফাইল
                </h1>

                <p className="max-w-2xl text-muted-foreground">
                    আপনার অ্যাকাউন্টের তথ্য, পরিচয় এবং কার্যক্রমের
                    সারসংক্ষেপ।
                </p>
            </div>

            {/* Profile Card */}

            <section className="overflow-hidden rounded-xl border border-border bg-card">
                <div className="bg-muted/30 p-6 sm:p-8">
                    <div className="flex flex-col gap-6 md:flex-row md:items-center">
                        {/* Avatar */}

                        {avatar ? (
                            <Image
                                src={avatar}
                                alt={fullName}
                                width={112}
                                height={112}
                                className="size-28 shrink-0 rounded-2xl border border-border bg-muted object-cover shadow-sm"
                            />
                        ) : (
                            <div className="flex size-28 shrink-0 items-center justify-center rounded-2xl border border-border bg-muted text-4xl font-bold text-foreground shadow-sm">
                                {fullName
                                    .charAt(0)
                                    .toUpperCase()}
                            </div>
                        )}

                        {/* Profile Info */}

                        <div className="min-w-0 flex-1 space-y-4">
                            <div>
                                <h2 className="truncate text-2xl font-semibold tracking-tight text-foreground">
                                    {fullName}
                                </h2>

                                <p className="mt-1 break-all text-muted-foreground">
                                    {user.email}
                                </p>
                            </div>

                            {/* Account Badges */}

                            <div className="flex flex-wrap gap-2">
                                <span className="inline-flex items-center gap-2 rounded-full border border-border bg-background/60 px-3 py-1.5 text-sm text-muted-foreground backdrop-blur-sm">
                                    <ShieldCheck
                                        size={15}
                                    />

                                    {provider === "google"
                                        ? "Google Account"
                                        : "Email Account"}
                                </span>

                                <span className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1.5 text-sm font-medium text-emerald-600 dark:text-emerald-400">
                                    <CheckCircle2
                                        size={15}
                                    />

                                    Active
                                </span>
                            </div>

                            <EditProfileForm
                                initialName={fullName}
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Content */}

            <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
                {/* Account Information */}

                <section className="overflow-hidden rounded-xl border border-border bg-card">
                    <div className="border-b border-border bg-muted/30 px-6 py-4">
                        <h3 className="font-semibold tracking-tight text-foreground">
                            Account Information
                        </h3>
                    </div>

                    <div className="divide-y divide-border">
                        {/* Full Name */}

                        <div className="flex items-start gap-4 p-6">
                            <div className="flex size-10 shrink-0 items-center justify-center rounded-lg border border-border bg-muted text-muted-foreground">
                                <UserIcon size={18} />
                            </div>

                            <div className="min-w-0">
                                <p className="text-sm text-muted-foreground">
                                    Full Name
                                </p>

                                <p className="mt-1 font-medium text-foreground">
                                    {fullName}
                                </p>
                            </div>
                        </div>

                        {/* Email */}

                        <div className="flex items-start gap-4 p-6">
                            <div className="flex size-10 shrink-0 items-center justify-center rounded-lg border border-border bg-muted text-muted-foreground">
                                <Mail size={18} />
                            </div>

                            <div className="min-w-0">
                                <p className="text-sm text-muted-foreground">
                                    Email Address
                                </p>

                                <p className="mt-1 break-all font-medium text-foreground">
                                    {user.email}
                                </p>
                            </div>
                        </div>

                        {/* Member Since */}

                        <div className="flex items-start gap-4 p-6">
                            <div className="flex size-10 shrink-0 items-center justify-center rounded-lg border border-border bg-muted text-muted-foreground">
                                <Calendar size={18} />
                            </div>

                            <div className="min-w-0">
                                <p className="text-sm text-muted-foreground">
                                    Member Since
                                </p>

                                <p className="mt-1 font-medium text-foreground">
                                    {joinedDate}
                                </p>
                            </div>
                        </div>

                        {/* User ID */}

                        <div className="flex items-start gap-4 p-6">
                            <div className="flex size-10 shrink-0 items-center justify-center rounded-lg border border-border bg-muted text-muted-foreground">
                                <ShieldCheck size={18} />
                            </div>

                            <div className="min-w-0">
                                <p className="text-sm text-muted-foreground">
                                    User ID
                                </p>

                                <p className="mt-1 break-all font-mono text-xs text-muted-foreground">
                                    {user.id}
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Statistics */}

                <section className="overflow-hidden rounded-xl border border-border bg-card">
                    <div className="border-b border-border bg-muted/30 px-6 py-4">
                        <h3 className="font-semibold tracking-tight text-foreground">
                            Statistics
                        </h3>
                    </div>

                    <div className="grid grid-cols-2 gap-4 p-6">
                        {stats.map((item) => (
                            <div
                                key={item.label}
                                className="rounded-xl border border-border bg-muted/40 p-5 text-center transition-colors hover:bg-muted/60"
                            >
                                <p className="text-3xl font-bold tracking-tight text-foreground">
                                    {item.value.toLocaleString()}
                                </p>

                                <p className="mt-2 text-sm text-muted-foreground">
                                    {item.label}
                                </p>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
}