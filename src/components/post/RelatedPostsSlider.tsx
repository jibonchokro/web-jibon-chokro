"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";

import {
    ChevronLeft,
    ChevronRight,
    Clock,
    Eye,
    MessageCircle,
} from "lucide-react";

import { urlFor } from "@/sanity/lib/image";

import type { Post } from "@/types/post";

interface RelatedPostsSliderProps {
    posts: Post[];
}

/**
 * Horizontally-scrolling "আরও পড়ুন" strip. Card layout matches
 * SidebarPopularPosts (thumbnail + category/date + title + meta row)
 * so the two stay visually consistent across the site.
 */
export default function RelatedPostsSlider({
    posts,
}: RelatedPostsSliderProps) {
    const trackRef = useRef<HTMLDivElement>(null);

    if (!posts.length) {
        return null;
    }

    const scrollByCard = (direction: 1 | -1) => {
        const el = trackRef.current;
        if (!el) return;
        const card = el.querySelector<HTMLElement>("[data-related-card]");
        const amount = card ? card.offsetWidth + 16 : 300;
        el.scrollBy({ left: direction * amount, behavior: "smooth" });
    };

    return (
        <section className="mt-5 sm:mt-8 scroll-mt-20 rounded-none sm:rounded-xl lg:rounded-xl border border-[#f0f0f0] shadow-custom bg-white px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
            <div className="mb-4 flex items-center justify-between">
                <h2 className="text-lg font-bold text-foreground sm:text-xl">
                    আরও পড়ুন
                </h2>

                <div className="flex items-center gap-2">
                    <button
                        type="button"
                        onClick={() => scrollByCard(-1)}
                        aria-label="পূর্ববর্তী"
                        className="flex h-8 w-8 items-center justify-center rounded-full border border-black/10 bg-white text-foreground transition hover:bg-muted"
                    >
                        <ChevronLeft size={16} />
                    </button>
                    <button
                        type="button"
                        onClick={() => scrollByCard(1)}
                        aria-label="পরবর্তী"
                        className="flex h-8 w-8 items-center justify-center rounded-full border border-black/10 bg-white text-foreground transition hover:bg-muted"
                    >
                        <ChevronRight size={16} />
                    </button>
                </div>
            </div>

            <div
                ref={trackRef}
                className="flex gap-4 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            >
                {posts.map((post) => {
                    const publishedDate = new Date(
                        post.publishedAt
                    ).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                    });

                    const comments = Number(post.comments ?? 0);
                    const views = Number(post.views ?? 0);

                    return (
                        <Link
                            key={post._id}
                            href={`/posts/${post.slug.current}`}
                            data-related-card
                            className="
                                group
                                flex
                                w-[280px]
                                shrink-0
                                snap-start
                                gap-3
                                rounded-lg
                                border
                                border-black/10
                                bg-white
                                p-3
                                transition-colors
                                hover:bg-muted/50
                                sm:w-[320px]
                            "
                        >
                            {/* Image */}
                            <div className="relative h-16 w-20 shrink-0 overflow-hidden rounded-lg bg-muted">
                                {post.coverImage ? (
                                    <Image
                                        src={urlFor(post.coverImage)
                                            .width(120)
                                            .height(90)
                                            .url()}
                                        alt={post.title}
                                        fill
                                        sizes="80px"
                                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                                    />
                                ) : (
                                    <div className="flex h-full items-center justify-center text-[10px] text-muted-foreground">
                                        No Image
                                    </div>
                                )}
                            </div>

                            {/* Content */}
                            <div className="min-w-0 flex-1">
                                {/* Category + Date */}
                                <div className="mb-1 flex items-center gap-2 overflow-hidden text-xs text-muted-foreground">
                                    {post.category && (
                                        <span className="truncate font-medium text-foreground">
                                            {post.category.title}
                                        </span>
                                    )}
                                    <span>•</span>
                                    <span className="shrink-0">
                                        {publishedDate}
                                    </span>
                                </div>

                                {/* Title */}
                                <h3 className="line-clamp-2 text-sm font-semibold leading-5 text-foreground transition-colors group-hover:text-black">
                                    {post.title}
                                </h3>

                                {/* Meta */}
                                <div className="mt-2 flex items-center gap-3 text-xs text-muted-foreground">
                                    {post.readingTime && (
                                        <span className="flex items-center gap-1">
                                            <Clock size={13} />
                                            {post.readingTime} min
                                        </span>
                                    )}

                                    <span className="flex items-center gap-1">
                                        <MessageCircle size={13} />
                                        {comments.toLocaleString("en-US")}
                                    </span>

                                    <span className="flex items-center gap-1">
                                        <Eye size={13} />
                                        {views.toLocaleString("en-US")}
                                    </span>
                                </div>
                            </div>
                        </Link>
                    );
                })}
            </div>
        </section>
    );
}