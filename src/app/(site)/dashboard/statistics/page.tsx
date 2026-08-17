import {
    BarChart3,
    Bookmark,
    Eye,
    FileText,
    MessageCircle,
    ShieldAlert,
    TrendingUp,
    Users,
} from "lucide-react";
import type { Metadata } from "next";
import { redirect } from "next/navigation";

import { supabaseAdmin } from "@/lib/supabase/admin";
import { createClient } from "@/lib/supabase/server";
import { getAllPosts } from "@/services/post.service";

export const metadata: Metadata = {
    title: "পরিসংখ্যান",
    description:
        "জীবন চক্রের ওয়েবসাইটের বিভিন্ন পরিসংখ্যান দেখুন।",
};

export default async function StatisticsPage() {
    /*
     * ---------------------------------------------------------
     * Authentication
     * ---------------------------------------------------------
     */

    const supabase = await createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        redirect("/auth/login");
    }

    /*
     * ---------------------------------------------------------
     * Admin authorization
     * ---------------------------------------------------------
     *
     * The role is stored in the profiles table.
     */

    const { data: profile } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", user.id)
        .maybeSingle();

    const role = profile?.role ?? "user";

    if (role !== "admin") {
        redirect("/dashboard");
    }

    /*
     * ---------------------------------------------------------
     * Fetch posts
     * ---------------------------------------------------------
     *
     * getAllPosts() already attaches:
     *
     * - views
     * - comments
     */

    const posts = await getAllPosts();

    /*
     * ---------------------------------------------------------
     * Supabase statistics
     * ---------------------------------------------------------
     */

    const [
        { count: userCount },
        { count: bookmarkCount },
        { count: commentCount },
        { data: postViews },
    ] = await Promise.all([
        /*
         * Total registered users
         */
        supabaseAdmin
            .from("profiles")
            .select("id", {
                count: "exact",
                head: true,
            }),

        /*
         * Total bookmarks
         */
        supabaseAdmin
            .from("bookmarks")
            .select("id", {
                count: "exact",
                head: true,
            }),

        /*
         * Total live comments
         */
        supabaseAdmin
            .from("comments")
            .select("id", {
                count: "exact",
                head: true,
            })
            .eq("is_deleted", false),

        /*
         * All post view counters
         */
        supabaseAdmin
            .from("post_views")
            .select("post_id, views"),
    ]);

    /*
     * ---------------------------------------------------------
     * Total views
     * ---------------------------------------------------------
     */

    const totalViews = (postViews ?? []).reduce(
        (total, item) =>
            total + Number(item.views ?? 0),
        0
    );

    /*
     * ---------------------------------------------------------
     * Post statistics
     * ---------------------------------------------------------
     */

    const totalPosts = posts.length;

    const totalPostComments = posts.reduce(
        (total, post) =>
            total + Number(post.comments ?? 0),
        0
    );

    /*
     * Use the actual comments table count when available.
     * The post-based count is kept as a fallback.
     */

    const totalComments =
        commentCount ?? totalPostComments;

    /*
     * ---------------------------------------------------------
     * Top posts by views
     * ---------------------------------------------------------
     */

    const topViewedPosts = [...posts]
        .sort(
            (a, b) =>
                Number(b.views ?? 0) -
                Number(a.views ?? 0)
        )
        .slice(0, 5);

    /*
     * ---------------------------------------------------------
     * Top posts by comments
     * ---------------------------------------------------------
     */

    const topCommentedPosts = [...posts]
        .sort(
            (a, b) =>
                Number(b.comments ?? 0) -
                Number(a.comments ?? 0)
        )
        .slice(0, 5);

    /*
     * ---------------------------------------------------------
     * Category statistics
     * ---------------------------------------------------------
     */

    const categoryMap = new Map<
        string,
        number
    >();

    for (const post of posts) {
        const categoryTitle =
            post.category?.title?.trim();

        if (!categoryTitle) {
            continue;
        }

        categoryMap.set(
            categoryTitle,
            (categoryMap.get(categoryTitle) ?? 0) + 1
        );
    }

    const categories = Array.from(
        categoryMap.entries()
    )
        .map(([name, count]) => ({
            name,
            count,
        }))
        .sort((a, b) => b.count - a.count);

    /*
     * ---------------------------------------------------------
     * Tag statistics
     * ---------------------------------------------------------
     */

    const tagMap = new Map<
        string,
        {
            label: string;
            count: number;
        }
    >();

    for (const post of posts) {
        for (const rawTag of post.tags ?? []) {
            if (
                !rawTag ||
                typeof rawTag !== "string"
            ) {
                continue;
            }

            const label = rawTag.trim();

            if (!label) {
                continue;
            }

            const key =
                label.toLocaleLowerCase();

            const existing = tagMap.get(key);

            if (existing) {
                existing.count += 1;
            } else {
                tagMap.set(key, {
                    label,
                    count: 1,
                });
            }
        }
    }

    const tags = Array.from(
        tagMap.values()
    )
        .sort((a, b) => b.count - a.count)
        .slice(0, 10);

    /*
     * ---------------------------------------------------------
     * Recent posts
     * ---------------------------------------------------------
     */

    const recentPosts = [...posts]
        .sort(
            (a, b) =>
                new Date(
                    b.publishedAt
                ).getTime() -
                new Date(
                    a.publishedAt
                ).getTime()
        )
        .slice(0, 5);

    /*
     * ---------------------------------------------------------
     * Statistics cards
     * ---------------------------------------------------------
     */

    const statistics = [
        {
            title: "মোট লেখা",
            value: totalPosts,
            description:
                "সাইটে প্রকাশিত মোট লেখা",
            icon: FileText,
        },
        {
            title: "মোট ভিউ",
            value: totalViews,
            description:
                "সকল লেখার মোট ভিউ",
            icon: Eye,
        },
        {
            title: "মোট মন্তব্য",
            value: totalComments,
            description:
                "সকল সক্রিয় মন্তব্য",
            icon: MessageCircle,
        },
        {
            title: "মোট ব্যবহারকারী",
            value: userCount ?? 0,
            description:
                "নিবন্ধিত ব্যবহারকারীর সংখ্যা",
            icon: Users,
        },
        {
            title: "মোট বুকমার্ক",
            value: bookmarkCount ?? 0,
            description:
                "ব্যবহারকারীদের সংরক্ষিত লেখা",
            icon: Bookmark,
        },
    ];

    return (
        <div className="space-y-8">
            {/* Header */}

            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div className="space-y-2">
                    <div className="flex items-center gap-3">
                        <div className="flex size-11 shrink-0 items-center justify-center rounded-xl border border-border bg-muted text-muted-foreground">
                            <BarChart3 size={21} />
                        </div>

                        <div>
                            <h1 className="text-3xl font-bold tracking-tight text-foreground">
                                পরিসংখ্যান
                            </h1>

                            <p className="mt-1 text-sm text-muted-foreground sm:text-base">
                                জীবন চক্রের ওয়েবসাইটের
                                গুরুত্বপূর্ণ পরিসংখ্যান
                                দেখুন।
                            </p>
                        </div>
                    </div>
                </div>

                {/* Admin Badge */}

                <div className="inline-flex w-fit items-center gap-2 rounded-full border border-border bg-muted px-3.5 py-2 text-xs font-medium text-muted-foreground">
                    <ShieldAlert size={14} />

                    Admin
                </div>
            </div>

            {/* Main Statistics */}

            <section>
                <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
                    {statistics.map((stat) => {
                        const Icon = stat.icon;

                        return (
                            <div
                                key={stat.title}
                                className="rounded-xl border border-border bg-card p-5 transition-shadow duration-200 hover:shadow-sm"
                            >
                                <div className="flex items-start justify-between gap-3">
                                    <div className="flex size-10 items-center justify-center rounded-lg border border-border bg-muted text-muted-foreground">
                                        <Icon size={19} />
                                    </div>
                                </div>

                                <div className="mt-5">
                                    <p className="text-sm text-muted-foreground">
                                        {stat.title}
                                    </p>

                                    <p className="mt-1 text-2xl font-bold tracking-tight text-foreground">
                                        {stat.value.toLocaleString(
                                            "bn-BD"
                                        )}
                                    </p>

                                    <p className="mt-1 text-xs leading-5 text-muted-foreground">
                                        {stat.description}
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </section>

            {/* Top Posts */}

            <section className="grid gap-6 xl:grid-cols-2">
                {/* Most Viewed */}

                <div className="overflow-hidden rounded-xl border border-border bg-card">
                    <div className="flex items-center justify-between border-b border-border px-5 py-4">
                        <div>
                            <h2 className="font-semibold tracking-tight text-foreground">
                                সর্বাধিক দেখা লেখা
                            </h2>

                            <p className="mt-1 text-xs text-muted-foreground">
                                ভিউয়ের ভিত্তিতে শীর্ষ ৫টি
                                লেখা
                            </p>
                        </div>

                        <div className="flex size-9 items-center justify-center rounded-lg bg-muted text-muted-foreground">
                            <TrendingUp size={17} />
                        </div>
                    </div>

                    <div className="divide-y divide-border">
                        {topViewedPosts.length > 0 ? (
                            topViewedPosts.map(
                                (post, index) => (
                                    <div
                                        key={post._id}
                                        className="flex items-center gap-4 px-5 py-4"
                                    >
                                        <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-muted text-sm font-semibold text-muted-foreground">
                                            {index + 1}
                                        </div>

                                        <div className="min-w-0 flex-1">
                                            <p className="line-clamp-2 text-sm font-medium leading-5 text-foreground">
                                                {
                                                    post.title
                                                }
                                            </p>

                                            <p className="mt-1 text-xs text-muted-foreground">
                                                {Number(
                                                    post.comments ??
                                                    0
                                                ).toLocaleString(
                                                    "bn-BD"
                                                )}{" "}
                                                মন্তব্য
                                            </p>
                                        </div>

                                        <div className="flex shrink-0 items-center gap-1.5 text-sm font-semibold text-foreground">
                                            <Eye
                                                size={15}
                                                className="text-muted-foreground"
                                            />

                                            {Number(
                                                post.views ??
                                                0
                                            ).toLocaleString(
                                                "bn-BD"
                                            )}
                                        </div>
                                    </div>
                                )
                            )
                        ) : (
                            <div className="px-5 py-10 text-center text-sm text-muted-foreground">
                                কোনো লেখা পাওয়া
                                যায়নি।
                            </div>
                        )}
                    </div>
                </div>

                {/* Most Commented */}

                <div className="overflow-hidden rounded-xl border border-border bg-card">
                    <div className="flex items-center justify-between border-b border-border px-5 py-4">
                        <div>
                            <h2 className="font-semibold tracking-tight text-foreground">
                                সর্বাধিক মন্তব্য পাওয়া
                                লেখা
                            </h2>

                            <p className="mt-1 text-xs text-muted-foreground">
                                মন্তব্যের ভিত্তিতে শীর্ষ
                                ৫টি লেখা
                            </p>
                        </div>

                        <div className="flex size-9 items-center justify-center rounded-lg bg-muted text-muted-foreground">
                            <MessageCircle size={17} />
                        </div>
                    </div>

                    <div className="divide-y divide-border">
                        {topCommentedPosts.length > 0 ? (
                            topCommentedPosts.map(
                                (post, index) => (
                                    <div
                                        key={post._id}
                                        className="flex items-center gap-4 px-5 py-4"
                                    >
                                        <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-muted text-sm font-semibold text-muted-foreground">
                                            {index + 1}
                                        </div>

                                        <div className="min-w-0 flex-1">
                                            <p className="line-clamp-2 text-sm font-medium leading-5 text-foreground">
                                                {
                                                    post.title
                                                }
                                            </p>

                                            <p className="mt-1 text-xs text-muted-foreground">
                                                {Number(
                                                    post.views ??
                                                    0
                                                ).toLocaleString(
                                                    "bn-BD"
                                                )}{" "}
                                                ভিউ
                                            </p>
                                        </div>

                                        <div className="flex shrink-0 items-center gap-1.5 text-sm font-semibold text-foreground">
                                            <MessageCircle
                                                size={15}
                                                className="text-muted-foreground"
                                            />

                                            {Number(
                                                post.comments ??
                                                0
                                            ).toLocaleString(
                                                "bn-BD"
                                            )}
                                        </div>
                                    </div>
                                )
                            )
                        ) : (
                            <div className="px-5 py-10 text-center text-sm text-muted-foreground">
                                কোনো মন্তব্য পাওয়া
                                যায়নি।
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* Categories and Tags */}

            <section className="grid gap-6 xl:grid-cols-2">
                {/* Categories */}

                <div className="overflow-hidden rounded-xl border border-border bg-card">
                    <div className="border-b border-border px-5 py-4">
                        <h2 className="font-semibold tracking-tight text-foreground">
                            বিভাগভিত্তিক লেখা
                        </h2>

                        <p className="mt-1 text-xs text-muted-foreground">
                            কোন বিভাগে কতটি লেখা রয়েছে
                        </p>
                    </div>

                    <div className="p-5">
                        {categories.length > 0 ? (
                            <div className="space-y-4">
                                {categories.map(
                                    (category) => {
                                        const percentage =
                                            totalPosts >
                                                0
                                                ? Math.round(
                                                    (category.count /
                                                        totalPosts) *
                                                    100
                                                )
                                                : 0;

                                        return (
                                            <div
                                                key={
                                                    category.name
                                                }
                                            >
                                                <div className="mb-2 flex items-center justify-between gap-4">
                                                    <span className="text-sm font-medium text-foreground">
                                                        {
                                                            category.name
                                                        }
                                                    </span>

                                                    <span className="text-xs text-muted-foreground">
                                                        {category.count.toLocaleString(
                                                            "bn-BD"
                                                        )}{" "}
                                                        লেখা
                                                    </span>
                                                </div>

                                                <div className="h-2 overflow-hidden rounded-full bg-muted">
                                                    <div
                                                        className="h-full rounded-full bg-primary transition-all"
                                                        style={{
                                                            width: `${percentage}%`,
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                        );
                                    }
                                )}
                            </div>
                        ) : (
                            <p className="py-6 text-center text-sm text-muted-foreground">
                                কোনো বিভাগ পাওয়া
                                যায়নি।
                            </p>
                        )}
                    </div>
                </div>

                {/* Tags */}

                <div className="overflow-hidden rounded-xl border border-border bg-card">
                    <div className="border-b border-border px-5 py-4">
                        <h2 className="font-semibold tracking-tight text-foreground">
                            জনপ্রিয় ট্যাগ
                        </h2>

                        <p className="mt-1 text-xs text-muted-foreground">
                            সবচেয়ে বেশি ব্যবহৃত ১০টি ট্যাগ
                        </p>
                    </div>

                    <div className="p-5">
                        {tags.length > 0 ? (
                            <div className="flex flex-wrap gap-2">
                                {tags.map(
                                    (tag) => (
                                        <div
                                            key={
                                                tag.label
                                            }
                                            className="inline-flex items-center gap-2 rounded-full border border-border bg-muted px-3 py-1.5 text-sm"
                                        >
                                            <span className="text-foreground">
                                                #
                                                {
                                                    tag.label
                                                }
                                            </span>

                                            <span className="rounded-full bg-background px-2 py-0.5 text-xs font-medium text-muted-foreground">
                                                {
                                                    tag.count
                                                }
                                            </span>
                                        </div>
                                    )
                                )}
                            </div>
                        ) : (
                            <p className="py-6 text-center text-sm text-muted-foreground">
                                কোনো ট্যাগ পাওয়া
                                যায়নি।
                            </p>
                        )}
                    </div>
                </div>
            </section>

            {/* Recent Posts */}

            <section className="overflow-hidden rounded-xl border border-border bg-card">
                <div className="border-b border-border px-5 py-4">
                    <h2 className="font-semibold tracking-tight text-foreground">
                        সর্বশেষ প্রকাশিত লেখা
                    </h2>

                    <p className="mt-1 text-xs text-muted-foreground">
                        সর্বশেষ প্রকাশিত ৫টি লেখা
                    </p>
                </div>

                <div className="divide-y divide-border">
                    {recentPosts.length > 0 ? (
                        recentPosts.map((post) => (
                            <div
                                key={post._id}
                                className="flex flex-col gap-3 px-5 py-4 sm:flex-row sm:items-center sm:justify-between"
                            >
                                <div className="min-w-0">
                                    <p className="line-clamp-2 text-sm font-medium text-foreground">
                                        {post.title}
                                    </p>

                                    <p className="mt-1 text-xs text-muted-foreground">
                                        {new Date(
                                            post.publishedAt
                                        ).toLocaleDateString(
                                            "bn-BD",
                                            {
                                                year: "numeric",
                                                month: "long",
                                                day: "numeric",
                                            }
                                        )}
                                    </p>
                                </div>

                                <div className="flex shrink-0 items-center gap-4 text-xs text-muted-foreground">
                                    <span className="inline-flex items-center gap-1.5">
                                        <Eye
                                            size={14}
                                        />

                                        {Number(
                                            post.views ??
                                            0
                                        ).toLocaleString(
                                            "bn-BD"
                                        )}
                                    </span>

                                    <span className="inline-flex items-center gap-1.5">
                                        <MessageCircle
                                            size={14}
                                        />

                                        {Number(
                                            post.comments ??
                                            0
                                        ).toLocaleString(
                                            "bn-BD"
                                        )}
                                    </span>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="px-5 py-10 text-center text-sm text-muted-foreground">
                            কোনো লেখা পাওয়া যায়নি।
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
}