"use client";

import {
    ArrowRight,
    ChevronLeft,
    ChevronRight,
} from "lucide-react";
import Link from "next/link";
import { useRef } from "react";

import PostCard from "@/components/post/PostCard";
import Container from "@/components/ui/Container";

import type { Post } from "@/types/post";

interface LatestPostsProps {
    posts: Post[];
}

export default function LatestPosts({
    posts,
}: LatestPostsProps) {
    const latestPosts = posts.slice(0, 20);

    const scrollRef = useRef<HTMLDivElement>(null);

    function scroll(
        direction: "left" | "right"
    ) {
        if (!scrollRef.current) {
            return;
        }

        scrollRef.current.scrollBy({
            left:
                direction === "left"
                    ? -340
                    : 340,
            behavior: "smooth",
        });
    }

    return (
        <section className="py-8 sm:py-10 lg:py-12">
            <Container>
                {/* Header */}

                <div className="mb-6 flex items-end justify-between gap-4">
                    <div>
                        <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                            সর্বশেষ লেখা
                        </h2>
                    </div>

                    <div className="flex shrink-0 items-center gap-2">
                        <button
                            type="button"
                            onClick={() =>
                                scroll("left")
                            }
                            aria-label="Scroll left"
                            className="flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-background/80 text-foreground shadow-sm backdrop-blur-sm transition-colors hover:bg-muted"
                        >
                            <ChevronLeft
                                size={18}
                            />
                        </button>

                        <button
                            type="button"
                            onClick={() =>
                                scroll("right")
                            }
                            aria-label="Scroll right"
                            className="flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-background/80 text-foreground shadow-sm backdrop-blur-sm transition-colors hover:bg-muted"
                        >
                            <ChevronRight
                                size={18}
                            />
                        </button>

                        <Link
                            href="/posts"
                            className="inline-flex h-10 items-center gap-2 rounded-lg border border-border bg-background/80 px-4 text-sm font-medium text-foreground shadow-sm backdrop-blur-sm transition-colors hover:bg-muted"
                        >
                            সব লেখা

                            <ArrowRight
                                size={16}
                            />
                        </Link>
                    </div>
                </div>

                {latestPosts.length === 0 ? (
                    <div className="rounded-xl border border-dashed border-border bg-muted/30 py-12 text-center text-muted-foreground">
                        এখনো কোনো লেখা প্রকাশ করা হয়নি।
                    </div>
                ) : (
                    <div
                        ref={scrollRef}
                        className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
                    >
                        {latestPosts.map(
                            (post) => (
                                <div
                                    key={
                                        post._id
                                    }
                                    className="w-[250px] shrink-0 snap-start sm:w-[275px] lg:w-[300px]"
                                >
                                    <PostCard
                                        post={
                                            post
                                        }
                                    />
                                </div>
                            )
                        )}
                    </div>
                )}
            </Container>
        </section>
    );
}