"use client";

import { Loader2 } from "lucide-react";
import {
    useEffect,
    useState,
} from "react";

import PostCard from "@/components/post/PostCard";
import type { Post } from "@/types/post";

interface Props {
    initialPosts: Post[];
    query: string;
}

const POSTS_PER_LOAD = 16;

export default function SearchResults({
    initialPosts,
    query,
}: Props) {
    const [posts, setPosts] =
        useState<Post[]>(initialPosts);

    const [page, setPage] =
        useState(1);

    const [loading, setLoading] =
        useState(false);

    const [hasMore, setHasMore] =
        useState(
            initialPosts.length === POSTS_PER_LOAD
        );

    // Reset state whenever search query changes
    useEffect(() => {
        setPosts(initialPosts);
        setPage(1);
        setHasMore(
            initialPosts.length === POSTS_PER_LOAD
        );
        setLoading(false);
    }, [initialPosts, query]);

    async function loadMore() {
        if (loading || !hasMore) {
            return;
        }

        setLoading(true);

        try {
            const nextPage = page + 1;

            const response = await fetch(
                `/api/search?q=${encodeURIComponent(
                    query
                )}&page=${nextPage}`
            );

            if (!response.ok) {
                throw new Error(
                    "Failed to load posts"
                );
            }

            const data =
                await response.json();

            const newPosts =
                data.posts ?? [];

            setPosts((previous) => [
                ...previous,
                ...newPosts,
            ]);

            setPage(nextPage);

            setHasMore(
                newPosts.length ===
                POSTS_PER_LOAD
            );
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <section>
            <div className="mb-5 flex items-center justify-between">
                <h2 className="text-lg font-semibold">
                    পাওয়া লেখা
                </h2>

                <span className="text-sm text-muted-foreground">
                    {posts.length} ফলাফল
                </span>
            </div>

            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                {posts.map((post) => (
                    <PostCard
                        key={post._id}
                        post={post}
                    />
                ))}
            </div>

            {hasMore && (
                <div className="mt-8 flex justify-center">
                    <button
                        type="button"
                        onClick={loadMore}
                        disabled={loading}
                        className="inline-flex items-center gap-2 rounded-xl border border-border bg-white px-6 py-3 text-sm font-medium transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        {loading && (
                            <Loader2 className="size-4 animate-spin" />
                        )}

                        {loading
                            ? "লোড হচ্ছে..."
                            : "আরও লেখা দেখুন"}
                    </button>
                </div>
            )}
        </section>
    );
}