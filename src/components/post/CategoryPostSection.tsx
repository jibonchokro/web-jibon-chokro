"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useRef } from "react";

import PostCard from "@/components/post/PostCard";

import type { Category } from "@/types/category";
import type { Post } from "@/types/post";

interface Props {
    category: Category;
    posts: Post[];
}

export default function CategoryPostsSection({
    category,
    posts,
}: Props) {
    const scrollRef =
        useRef<HTMLDivElement>(null);

    const scroll = (
        direction: "left" | "right"
    ) => {
        if (!scrollRef.current) {
            return;
        }

        const amount = 340;

        scrollRef.current.scrollBy({
            left:
                direction === "left"
                    ? -amount
                    : amount,
            behavior: "smooth",
        });
    };

    return (
        <section>

            {/* Header */}

            <div className="mb-5 flex items-center justify-between gap-4">

                <div>

                    <h2 className="text-2xl font-bold tracking-tight">
                        {category.title}
                    </h2>

                    <p className="mt-1 text-sm text-muted-foreground">
                        {posts.length} টি লেখা
                    </p>

                </div>

                <div className="flex items-center gap-2">

                    <button
                        type="button"
                        aria-label="Previous"
                        onClick={() =>
                            scroll("left")
                        }
                        className="flex h-10 w-10 items-center justify-center rounded-full border border-black/10 bg-white transition hover:bg-muted"
                    >
                        <ChevronLeft
                            size={18}
                        />
                    </button>

                    <button
                        type="button"
                        aria-label="Next"
                        onClick={() =>
                            scroll("right")
                        }
                        className="flex h-10 w-10 items-center justify-center rounded-full border border-black/10 bg-white transition hover:bg-muted"
                    >
                        <ChevronRight
                            size={18}
                        />
                    </button>

                    <Link
                        href={`/category/${category.slug.current}`}
                        className="ml-1 inline-flex items-center rounded-lg border border-black/10 bg-white px-4 py-2 text-sm font-medium transition hover:bg-muted"
                    >
                        সব দেখুন
                    </Link>

                </div>

            </div>

            {/* Posts */}

            <div
                ref={scrollRef}
                className="
                    flex
                    min-w-0
                    max-w-full
                    gap-4
                    overflow-x-auto
                    overflow-y-hidden
                    pb-2
                    snap-x
                    snap-mandatory
                    scroll-smooth
                    [-ms-overflow-style:none]
                    [scrollbar-width:none]
                    [&::-webkit-scrollbar]:hidden
                "
            >

                {posts
                    .slice(0, 16)
                    .map((post) => (

                        <div
                            key={post._id}
                            className="
                                w-[260px]
                                max-w-[260px]
                                shrink-0
                                snap-start
                            "
                        >

                            <PostCard
                                post={post}
                            />

                        </div>

                    ))}

            </div>

        </section>
    );
}