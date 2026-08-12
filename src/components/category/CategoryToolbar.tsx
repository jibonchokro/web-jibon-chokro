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

export default function CategoryToolbar({
    posts,
}: Props) {
    const [query, setQuery] =
        useState("");

    const [sort, setSort] =
        useState<SortOption>("latest");

    const [categorySlug, setCategorySlug] =
        useState<string>(ALL_CATEGORIES);

    /*
     * Derive the list of categories present in `posts`.
     *
     * This makes the component work both on a single category's
     * page (where every post shares one category, so the dropdown
     * effectively has nothing to filter and can be hidden) and on
     * an all-posts page (where several categories are present).
     */
    const categories = useMemo(() => {
        const map = new Map<
            string,
            { slug: string; title: string }
        >();

        for (const post of posts) {
            const category = post.category;

            if (!category?.slug?.current) {
                continue;
            }

            if (!map.has(category.slug.current)) {
                map.set(category.slug.current, {
                    slug: category.slug.current,
                    title: category.title,
                });
            }
        }

        return Array.from(map.values()).sort(
            (a, b) =>
                a.title.localeCompare(b.title)
        );
    }, [posts]);

    const filteredPosts =
        useMemo(() => {
            const keyword =
                query
                    .trim()
                    .toLowerCase();

            let result = [...posts];

            if (
                categorySlug !==
                ALL_CATEGORIES
            ) {
                result = result.filter(
                    (post) =>
                        post.category?.slug
                            ?.current ===
                        categorySlug
                );
            }

            if (keyword) {
                result = result.filter(
                    (post) =>
                        post.title
                            .toLowerCase()
                            .includes(keyword) ||
                        post.excerpt
                            ?.toLowerCase()
                            .includes(keyword)
                );
            }

            switch (sort) {
                case "popular":
                    /*
                     * Same scoring rule used server-side in
                     * sortByPopularity (lib/posts.ts):
                     * 1 comment = 5 views. Ties broken by newest.
                     */
                    result.sort((a, b) => {
                        const scoreA =
                            Number(a.views ?? 0) +
                            Number(a.comments ?? 0) * 5;

                        const scoreB =
                            Number(b.views ?? 0) +
                            Number(b.comments ?? 0) * 5;

                        if (scoreB !== scoreA) {
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
        }, [posts, query, sort, categorySlug]);

    return (
        <>
            {/* Toolbar */}

            <div className="mb-6 flex flex-col gap-4 rounded-2xl border border-black/10 bg-white p-4 sm:flex-row sm:items-center sm:justify-between">

                {/* Search */}

                <div className="relative w-full sm:max-w-sm">

                    <Search
                        size={18}
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                    />

                    <input
                        value={query}
                        onChange={(e) =>
                            setQuery(
                                e.target.value
                            )
                        }
                        placeholder="লেখা খুঁজুন..."
                        className="h-11 w-full rounded-xl border border-black/10 bg-background pl-10 pr-4 text-sm outline-none transition focus:border-black"
                    />

                </div>

                <div className="flex flex-col gap-4 sm:flex-row sm:items-center">

                    {/* Category filter — only shown when there's
                        more than one category to choose from, so a
                        single-category page doesn't show a useless
                        one-option dropdown. */}

                    {categories.length > 1 && (
                        <select
                            value={categorySlug}
                            onChange={(e) =>
                                setCategorySlug(
                                    e.target.value
                                )
                            }
                            className="h-11 rounded-xl border border-black/10 bg-background px-4 text-sm outline-none"
                        >
                            <option value={ALL_CATEGORIES}>
                                সব বিভাগ
                            </option>

                            {categories.map(
                                (category) => (
                                    <option
                                        key={category.slug}
                                        value={category.slug}
                                    >
                                        {category.title}
                                    </option>
                                )
                            )}
                        </select>
                    )}

                    {/* Sort */}

                    <select
                        value={sort}
                        onChange={(e) =>
                            setSort(
                                e.target
                                    .value as SortOption
                            )
                        }
                        className="h-11 rounded-xl border border-black/10 bg-background px-4 text-sm outline-none"
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

            <p className="mb-6 inline-flex gap-1 items-center rounded-full border border-black/10 bg-background px-4 py-2 text-sm font-medium whitespace-nowrap">
                মোট{" "}
                <span className="font-semibold text-foreground">
                    {filteredPosts.length}
                </span>{" "}
                টি লেখা
            </p>

            {/* Posts */}

            {filteredPosts.length ? (

                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

                    {filteredPosts.map(
                        (post) => (

                            <PostCard
                                key={post._id}
                                post={post}
                            />

                        )
                    )}

                </div>

            ) : (

                <div className="rounded-2xl border border-dashed border-black/10 bg-white py-16 text-center text-muted-foreground">
                    কোনো লেখা পাওয়া যায়নি।
                </div>

            )}
        </>
    );
}