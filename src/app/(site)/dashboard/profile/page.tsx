import { createClient } from "@/lib/supabase/server";
import {
    Calendar,
    CheckCircle2,
    Mail,
    ShieldCheck,
    User as UserIcon,
} from "lucide-react";
import Image from "next/image";
import { redirect } from "next/navigation";

export default async function Page() {
    const supabase = await createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        redirect("/auth/login");
    }

    const fullName =
        user.user_metadata.full_name ??
        user.user_metadata.name ??
        "User";

    const avatar =
        user.user_metadata.avatar_url ?? null;

    const joinedDate = new Date(
        user.created_at
    ).toLocaleDateString("en-GB", {
        day: "numeric",
        month: "long",
        year: "numeric",
    });

    return (
        <div className="space-y-8">
            {/* Header */}

            <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tight">
                    প্রোফাইল
                </h1>

                <p className="max-w-2xl text-muted-foreground">
                    আপনার অ্যাকাউন্টের তথ্য, পরিচয় এবং কার্যক্রমের
                    সারসংক্ষেপ।
                </p>
            </div>

            {/* Profile Card */}

            <div className="rounded-xl border border-black/10 bg-card p-8">
                <div className="flex flex-col gap-6 md:flex-row md:items-center">
                    {avatar ? (
                        <Image
                            src={avatar}
                            alt={fullName}
                            width={112}
                            height={112}
                            className="h-28 w-28 rounded-2xl border object-cover"
                        />
                    ) : (
                        <div className="flex h-28 w-28 items-center justify-center rounded-2xl bg-muted text-4xl font-bold">
                            {fullName.charAt(0).toUpperCase()}
                        </div>
                    )}

                    <div className="min-w-0 flex-1">
                        <h2 className="truncate text-2xl font-semibold tracking-tight">
                            {fullName}
                        </h2>

                        <p className="mt-1 break-all text-muted-foreground">
                            {user.email}
                        </p>

                        <div className="mt-5 flex flex-wrap gap-3">
                            <span className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-muted px-3 py-1.5 text-sm">
                                <ShieldCheck size={15} />
                                Google Account
                            </span>

                            <span className="inline-flex items-center gap-2 rounded-full border border-green-200 bg-green-50 px-3 py-1.5 text-sm font-medium text-green-700">
                                <CheckCircle2 size={15} />
                                Active
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content */}

            <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
                {/* Account */}

                <section className="rounded-xl border border-black/10 bg-card">
                    <div className="border-b border-black/10 px-6 py-4">
                        <h3 className="font-semibold tracking-tight">
                            Account Information
                        </h3>
                    </div>

                    <div className="divide-y divide-black/10">
                        <div className="flex items-start gap-4 p-6">
                            <div className="rounded-lg border border-black/10 bg-muted p-2.5">
                                <UserIcon size={18} />
                            </div>

                            <div>
                                <p className="text-sm text-muted-foreground">
                                    Full Name
                                </p>

                                <p className="mt-1 font-medium">
                                    {fullName}
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4 p-6">
                            <div className="rounded-lg border border-black/10 bg-muted p-2.5">
                                <Mail size={18} />
                            </div>

                            <div className="min-w-0">
                                <p className="text-sm text-muted-foreground">
                                    Email Address
                                </p>

                                <p className="mt-1 break-all font-medium">
                                    {user.email}
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4 p-6">
                            <div className="rounded-lg border border-black/10 bg-muted p-2.5">
                                <Calendar size={18} />
                            </div>

                            <div>
                                <p className="text-sm text-muted-foreground">
                                    Member Since
                                </p>

                                <p className="mt-1 font-medium">
                                    {joinedDate}
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4 p-6">
                            <div className="rounded-lg border border-black/10 bg-muted p-2.5">
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

                <section className="rounded-xl border border-black/10 bg-card">
                    <div className="border-b border-black/10 px-6 py-4">
                        <h3 className="font-semibold tracking-tight">
                            Statistics
                        </h3>
                    </div>

                    <div className="grid grid-cols-2 gap-4 p-6">
                        {[
                            {
                                label: "Bookmarks",
                                value: 0,
                            },
                            {
                                label: "Likes",
                                value: 0,
                            },
                            {
                                label: "Comments",
                                value: 0,
                            },
                            {
                                label: "Followers",
                                value: 0,
                            },
                        ].map((item) => (
                            <div
                                key={item.label}
                                className="rounded-xl border border-black/10 bg-muted/40 p-5 text-center"
                            >
                                <p className="text-3xl font-bold tracking-tight">
                                    {item.value}
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