"use client";

import { Search } from "lucide-react";
import { useMemo, useState } from "react";

import PostCard from "@/components/post/PostCard";

import type { Post } from "@/types/post";

interface Props {
    posts: Post[];
}

type SortOption =
    | "latest"
    | "oldest"
    | "title"
    | "popular";

const ALL_CATEGORIES = "all";

export default function PostToolbar({
    posts,
}: Props) {
    const [query, setQuery] = useState("");
    const [sort, setSort] =
        useState<SortOption>("latest");
    const [categorySlug, setCategorySlug] =
        useState(ALL_CATEGORIES);

    const categories = useMemo(() => {
        const map = new Map<
            string,
            {
                slug: string;
                title: string;
            }
        >();

        for (const post of posts) {
            const slug = post.category?.slug?.current;

            if (!slug) {
                continue;
            }

            if (!map.has(slug)) {
                map.set(slug, {
                    slug,
                    title: post.category?.title ?? "",
                });
            }
        }

        return Array.from(map.values()).sort(
            (a, b) =>
                a.title.localeCompare(b.title)
        );
    }, [posts]);

    const filteredPosts = useMemo(() => {
        const keyword = query
            .trim()
            .toLowerCase();

        let result = [...posts];

        // Category filter
        if (categorySlug !== ALL_CATEGORIES) {
            result = result.filter(
                (post) =>
                    post.category?.slug?.current ===
                    categorySlug
            );
        }

        // Search
        if (keyword) {
            result = result.filter((post) => {
                const title =
                    post.title?.toLowerCase() ?? "";

                const excerpt =
                    post.excerpt?.toLowerCase() ?? "";

                return (
                    title.includes(keyword) ||
                    excerpt.includes(keyword)
                );
            });
        }

        // Sort
        switch (sort) {
            case "popular":
                result.sort((a, b) => {
                    const scoreA =
                        Number(a.views ?? 0) +
                        Number(a.comments ?? 0) * 5;

                    const scoreB =
                        Number(b.views ?? 0) +
                        Number(b.comments ?? 0) * 5;

                    if (scoreA !== scoreB) {
                        return scoreB - scoreA;
                    }

                    return (
                        new Date(
                            b.publishedAt
                        ).getTime() -
                        new Date(
                            a.publishedAt
                        ).getTime()
                    );
                });

                break;

            case "oldest":
                result.sort(
                    (a, b) =>
                        new Date(
                            a.publishedAt
                        ).getTime() -
                        new Date(
                            b.publishedAt
                        ).getTime()
                );

                break;

            case "title":
                result.sort((a, b) =>
                    a.title.localeCompare(
                        b.title
                    )
                );

                break;

            case "latest":
            default:
                result.sort(
                    (a, b) =>
                        new Date(
                            b.publishedAt
                        ).getTime() -
                        new Date(
                            a.publishedAt
                        ).getTime()
                );
        }

        return result;
    }, [
        posts,
        query,
        sort,
        categorySlug,
    ]);

    return (
        <>
            {/* Toolbar */}

            <div className="mb-6 flex flex-col gap-4 rounded-2xl border border-border bg-background p-4 sm:flex-row sm:items-center sm:justify-between">
                {/* Search */}

                <div className="relative w-full sm:max-w-sm">
                    <Search
                        size={18}
                        aria-hidden="true"
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                    />

                    <input
                        type="search"
                        value={query}
                        onChange={(event) =>
                            setQuery(
                                event.target.value
                            )
                        }
                        placeholder="লেখা খুঁজুন..."
                        aria-label="লেখা খুঁজুন"
                        className="h-11 w-full rounded-xl border border-border bg-background pl-10 pr-4 text-sm text-foreground outline-none transition focus:border-foreground"
                    />
                </div>

                {/* Filters */}

                <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                    {categories.length > 1 && (
                        <select
                            value={categorySlug}
                            onChange={(event) =>
                                setCategorySlug(
                                    event.target.value
                                )
                            }
                            aria-label="বিভাগ নির্বাচন করুন"
                            className="h-11 rounded-xl border border-border bg-background px-4 text-sm text-foreground outline-none transition focus:border-foreground"
                        >
                            <option value={ALL_CATEGORIES}>
                                সব বিভাগ
                            </option>

                            {categories.map(
                                (category) => (
                                    <option
                                        key={
                                            category.slug
                                        }
                                        value={
                                            category.slug
                                        }
                                    >
                                        {
                                            category.title
                                        }
                                    </option>
                                )
                            )}
                        </select>
                    )}

                    <select
                        value={sort}
                        onChange={(event) =>
                            setSort(
                                event.target
                                    .value as SortOption
                            )
                        }
                        aria-label="লেখা সাজান"
                        className="h-11 rounded-xl border border-border bg-background px-4 text-sm text-foreground outline-none transition focus:border-foreground"
                    >
                        <option value="latest">
                            সর্বশেষ
                        </option>

                        <option value="popular">
                            জনপ্রিয়
                        </option>

                        <option value="oldest">
                            পুরোনো
                        </option>

                        <option value="title">
                            A-Z
                        </option>
                    </select>
                </div>
            </div>

            {/* Result Count */}

            <p className="mb-6 inline-flex items-center gap-1 whitespace-nowrap rounded-full border border-border bg-background px-4 py-2 text-sm font-medium">
                মোট{" "}
                <span className="font-semibold text-foreground">
                    {filteredPosts.length}
                </span>{" "}
                টি লেখা
            </p>

            {/* Posts */}

            {filteredPosts.length > 0 ? (
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {filteredPosts.map((post) => (
                        <PostCard
                            key={post._id}
                            post={post}
                        />
                    ))}
                </div>
            ) : (
                <div className="rounded-2xl border border-dashed border-border bg-background py-16 text-center text-muted-foreground">
                    কোনো লেখা পাওয়া যায়নি।
                </div>
            )}
        </>
    );
}