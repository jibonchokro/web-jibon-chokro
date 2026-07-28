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

                <Search
                    className="
                        pointer-events-none
                        absolute
                        left-3
                        top-1/2
                        size-4
                        -translate-y-1/2
                        text-muted-foreground
                        sm:left-4
                        sm:size-5
                    "
                />

                <input
                    type="text"
                    placeholder="Search bookmarked posts..."
                    value={search}
                    onChange={(e) =>
                        setSearch(e.target.value)
                    }
                    className="
                        h-10
                        w-full
                        rounded-xl
                        border
                        border-border
                        bg-background
                        pl-10
                        pr-10
                        text-sm
                        outline-none
                        transition
                        placeholder:text-muted-foreground
                        focus:border-primary
                        sm:h-11
                        sm:pl-11
                        sm:pr-11
                        md:h-12
                        md:text-[15px]
                        lg:pl-12
                        lg:pr-12
                    "
                />

                {search && (
                    <button
                        onClick={() =>
                            setSearch("")
                        }
                        className="
                            absolute
                            right-3
                            top-1/2
                            -translate-y-1/2
                            rounded-full
                            p-1
                            text-muted-foreground
                            transition
                            hover:bg-muted
                            hover:text-foreground
                            sm:right-4
                        "
                    >
                        <X className="size-4" />
                    </button>
                )}

            </div>

            {/* Categories */}

            <div
                className="
                    -mx-4
                    overflow-x-auto
                    px-4
                    [scrollbar-width:none]
                    [-ms-overflow-style:none]
                    [&::-webkit-scrollbar]:hidden
                "
            >
                <div className="flex w-max gap-2 pb-1">

                    {categories.map(
                        (category) => (
                            <button
                                key={category}
                                onClick={() =>
                                    setSelectedCategory(
                                        category
                                    )
                                }
                                className={`
                                    whitespace-nowrap
                                    rounded-full
                                    border
                                    transition-all
                                    duration-200
                                    px-3
                                    py-1
                                    text-xs

                                    ${selectedCategory ===
                                        category
                                        ? "border-primary bg-primary text-primary-foreground shadow-sm"
                                        : "border-border bg-background hover:bg-muted"
                                    }
                                `}
                            >
                                {category}
                            </button>
                        )
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
                <div
                    className="
                        flex
                        min-h-[260px]
                        flex-col
                        items-center
                        justify-center
                        rounded-2xl
                        border
                        border-dashed
                        border-border
                        bg-background
                        px-6
                        py-10
                        text-center
                        sm:min-h-[320px]
                        sm:px-8
                    "
                >

                    <Bookmark className="size-10 text-muted-foreground sm:size-12" />

                    <h3 className="mt-4 text-lg font-semibold sm:mt-5 sm:text-xl">
                        No matching bookmarks
                    </h3>

                    <p className="mt-2 max-w-md text-sm leading-6 text-muted-foreground">
                        Try searching with another keyword or choose a different category.
                    </p>

                </div>
            ) : (
                <div
                    className="
                        grid
                        gap-4
                        sm:grid-cols-2
                        sm:gap-5
                        xl:grid-cols-3
                    "
                >
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