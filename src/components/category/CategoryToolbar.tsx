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
    | "title";

export default function CategoryToolbar({
    posts,
}: Props) {
    const [query, setQuery] =
        useState("");

    const [sort, setSort] =
        useState<SortOption>("latest");

    const filteredPosts =
        useMemo(() => {
            const keyword =
                query
                    .trim()
                    .toLowerCase();

            let result = [...posts];

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
        }, [posts, query, sort]);

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

                    <option value="oldest">
                        পুরোনো
                    </option>

                    <option value="title">
                        A-Z
                    </option>

                </select>

            </div>

            {/* Result Count */}

            <p className="mb-6 text-sm text-muted-foreground">
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
                    কোনো লেখা পাওয়া যায়নি।
                </div>

            )}
        </>
    );
}