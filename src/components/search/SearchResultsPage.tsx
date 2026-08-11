"use client";

import { Loader2 } from "lucide-react";
import {
    useEffect,
    useMemo,
    useState,
} from "react";

import PostCard from "@/components/post/PostCard";
import type { Post } from "@/types/post";

interface Props {
    initialPosts: Post[];
    query: string;
}

type SortOption =
    | "latest"
    | "oldest"
    | "title"
    | "popular";

const ALL_CATEGORIES = "all";
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

    const [sort, setSort] =
        useState<SortOption>("latest");

    const [categorySlug, setCategorySlug] =
        useState<string>(ALL_CATEGORIES);

    /*
     * Categories available to filter by. Built from whatever posts
     * have been loaded so far — same trade-off as CategoryToolbar:
     * a category won't appear in the dropdown until a post from it
     * has been loaded. Good enough here since this only decides
     * what options are OFFERED; the actual filtering always goes
     * through the API, so results themselves are never limited to
     * "only what's currently loaded".
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

    // Reset state whenever the search query itself changes
    // (server already re-ran the query with default sort/category).
    useEffect(() => {
        setPosts(initialPosts);
        setPage(1);
        setHasMore(
            initialPosts.length === POSTS_PER_LOAD
        );
        setLoading(false);
        setSort("latest");
        setCategorySlug(ALL_CATEGORIES);
    }, [initialPosts, query]);

    // Whenever sort or category changes, re-fetch page 1 from the
    // API with those params. This can't be done client-side like
    // CategoryToolbar does, because search results are paginated
    // server-side — filtering/sorting only the posts already
    // loaded would hide matches that haven't been fetched yet.
    useEffect(() => {
        let cancelled = false;

        async function fetchFiltered() {
            setLoading(true);

            try {
                const params = new URLSearchParams({
                    q: query,
                    page: "1",
                    sort,
                });

                if (categorySlug !== ALL_CATEGORIES) {
                    params.set("category", categorySlug);
                }

                const response = await fetch(
                    `/api/search?${params.toString()}`
                );

                if (!response.ok) {
                    throw new Error(
                        "Failed to load posts"
                    );
                }

                const data = await response.json();

                if (cancelled) {
                    return;
                }

                const newPosts = data.posts ?? [];

                setPosts(newPosts);
                setPage(1);
                setHasMore(
                    newPosts.length === POSTS_PER_LOAD
                );
            } catch (error) {
                console.error(error);
            } finally {
                if (!cancelled) {
                    setLoading(false);
                }
            }
        }

        fetchFiltered();

        return () => {
            cancelled = true;
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [sort, categorySlug]);

    async function loadMore() {
        if (loading || !hasMore) {
            return;
        }

        setLoading(true);

        try {
            const nextPage = page + 1;

            const params = new URLSearchParams({
                q: query,
                page: String(nextPage),
                sort,
            });

            if (categorySlug !== ALL_CATEGORIES) {
                params.set("category", categorySlug);
            }

            const response = await fetch(
                `/api/search?${params.toString()}`
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
            <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <h2 className="text-lg font-semibold">
                    পাওয়া লেখা
                </h2>

                <div className="flex items-center gap-3">

                    <span className="text-sm text-muted-foreground">
                        {posts.length} ফলাফল
                    </span>

                    {categories.length > 1 && (
                        <select
                            value={categorySlug}
                            onChange={(e) =>
                                setCategorySlug(
                                    e.target.value
                                )
                            }
                            className="h-10 rounded-xl border border-border bg-white px-3 text-sm outline-none"
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

                    <select
                        value={sort}
                        onChange={(e) =>
                            setSort(
                                e.target
                                    .value as SortOption
                            )
                        }
                        className="h-10 rounded-xl border border-border bg-white px-3 text-sm outline-none"
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