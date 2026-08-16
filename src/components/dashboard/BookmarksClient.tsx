"use client";

import { Bookmark, Search, X } from "lucide-react";
import { useMemo, useState } from "react";

import BookmarkCard from "./BookmarkCard";

interface Post {
    _id: string;
    title: string;
    slug: {
        current: string;
    };
    excerpt?: string;
    imageUrl?: string | null;
    publishedAt: string;
    readingTime?: number;
    category?: {
        title: string;
        slug: {
            current: string;
        };
    };
}

interface Props {
    posts: Post[];
}

export default function BookmarksClient({
    posts,
}: Props) {
    const [search, setSearch] = useState("");
    const [selectedCategory, setSelectedCategory] =
        useState("All");

    const categories = useMemo(() => {
        const list = Array.from(
            new Set(
                posts
                    .map(
                        (post) =>
                            post.category?.title
                    )
                    .filter(Boolean)
            )
        ) as string[];

        return ["All", ...list];
    }, [posts]);

    const filteredPosts = useMemo(() => {
        const keyword = search
            .trim()
            .toLowerCase();

        return posts.filter((post) => {
            const matchesCategory =
                selectedCategory === "All" ||
                post.category?.title ===
                selectedCategory;

            const matchesSearch =
                keyword === "" ||
                post.title
                    .toLowerCase()
                    .includes(keyword) ||
                post.excerpt
                    ?.toLowerCase()
                    .includes(keyword);

            return (
                matchesCategory &&
                matchesSearch
            );
        });
    }, [
        posts,
        search,
        selectedCategory,
    ]);

    return (
        <div className="space-y-5 sm:space-y-6">

            {/* Search */}

            <div className="relative">

                <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground sm:left-4 sm:size-5" />

                <input
                    type="text"
                    placeholder="Search bookmarked posts..."
                    value={search}
                    onChange={(e) =>
                        setSearch(e.target.value)
                    }
                    className="h-10 w-full rounded-xl border border-border bg-background pl-10 pr-10 text-sm text-foreground outline-none transition placeholder:text-muted-foreground hover:border-foreground/20 focus:border-muted-foreground focus:ring-1 focus:ring-foreground sm:h-11 sm:pl-11 sm:pr-11 md:h-12 md:text-[15px] lg:pl-12 lg:pr-12"
                />

                {search && (
                    <button
                        type="button"
                        onClick={() =>
                            setSearch("")
                        }
                        aria-label="Clear search"
                        className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus:outline-none focus:ring-2 focus:ring-ring sm:right-4"
                    >
                        <X className="size-4" />
                    </button>
                )}

            </div>

            {/* Categories */}

            <div className="-mx-4 overflow-x-auto px-4 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">

                <div className="flex w-max gap-2 pb-1">

                    {categories.map(
                        (category) => {
                            const active =
                                selectedCategory ===
                                category;

                            return (
                                <button
                                    key={category}
                                    type="button"
                                    onClick={() =>
                                        setSelectedCategory(
                                            category
                                        )
                                    }
                                    aria-pressed={active}
                                    className={`whitespace-nowrap rounded-full border px-3 py-1.5 text-xs font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-ring ${active
                                        ? "border-primary bg-primary text-primary-foreground shadow-sm"
                                        : "border-border bg-background text-muted-foreground hover:border-foreground/20 hover:bg-muted hover:text-foreground"
                                        }`}
                                >
                                    {category}
                                </button>
                            );
                        }
                    )}

                </div>

            </div>

            {/* Results */}

            <div className="flex flex-wrap items-center justify-between gap-2">

                <p className="text-xs text-muted-foreground sm:text-sm">

                    Showing{" "}

                    <span className="font-semibold text-foreground">
                        {filteredPosts.length}
                    </span>

                    {" "}of{" "}

                    <span className="font-semibold text-foreground">
                        {posts.length}
                    </span>

                    {" "}bookmarks

                </p>

            </div>

            {/* Grid */}

            {filteredPosts.length === 0 ? (

                <div className="flex min-h-[260px] flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-card px-6 py-10 text-center shadow-sm sm:min-h-[320px] sm:px-8">

                    <div className="flex size-12 items-center justify-center rounded-full border border-border bg-muted text-muted-foreground sm:size-14">

                        <Bookmark className="size-5 sm:size-6" />

                    </div>

                    <h3 className="mt-4 text-lg font-semibold text-foreground sm:mt-5 sm:text-xl">
                        No matching bookmarks
                    </h3>

                    <p className="mt-2 max-w-md text-sm leading-6 text-muted-foreground">
                        Try searching with another
                        keyword or choose a different
                        category.
                    </p>

                    {(search ||
                        selectedCategory !==
                        "All") && (
                            <button
                                type="button"
                                onClick={() => {
                                    setSearch("");
                                    setSelectedCategory(
                                        "All"
                                    );
                                }}
                                className="mt-4 rounded-lg border border-border bg-background px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted focus:outline-none focus:ring-2 focus:ring-ring"
                            >
                                Clear filters
                            </button>
                        )}

                </div>

            ) : (

                <div className="grid gap-4 sm:grid-cols-2 sm:gap-5 xl:grid-cols-3">

                    {filteredPosts.map(
                        (post) => (
                            <BookmarkCard
                                key={post._id}
                                post={post}
                            />
                        )
                    )}

                </div>

            )}

        </div>
    );
}