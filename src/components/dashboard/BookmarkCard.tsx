"use client";

import Image from "next/image";
import Link from "next/link";

import {
    CalendarDays,
    Clock,
    Eye,
} from "lucide-react";

import RemoveBookmarkButton from "./RemoveBookmarkButton";

export interface BookmarkPost {
    _id: string;
    title: string;
    slug: {
        current: string;
    };
    excerpt?: string;
    imageUrl?: string | null;
    publishedAt: string;
    readingTime?: number;
    views?: number;
    category?: {
        title: string;
        slug: {
            current: string;
        };
    };
}

interface BookmarkCardProps {
    post: BookmarkPost;
}

export default function BookmarkCard({
    post,
}: BookmarkCardProps) {
    const publishedDate = new Date(
        post.publishedAt
    ).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
    });

    return (
        <article
            className="
                group
                flex
                h-full
                flex-col
                overflow-hidden
                rounded-lg
                border
                border-border
                bg-background
                transition-all
                duration-300
                hover:border-foreground/15
                hover:shadow-sm
            "
        >
            {/* Cover */}

            <div className="relative">

                <Link
                    href={`/posts/${post.slug.current}`}
                    className="block"
                >
                    <div className="relative aspect-[16/10] overflow-hidden bg-muted">

                        {post.imageUrl ? (
                            <Image
                                src={post.imageUrl}
                                alt={post.title}
                                fill
                                priority={false}
                                sizes="
                                    (max-width:640px)100vw,
                                    (max-width:1024px)50vw,
                                    33vw
                                "
                                className="
                                    object-cover
                                    transition-transform
                                    duration-500
                                    group-hover:scale-105
                                "
                            />
                        ) : (
                            <div className="flex h-full items-center justify-center text-xs text-muted-foreground sm:text-sm">
                                No image
                            </div>
                        )}

                    </div>
                </Link>

                {/* Top overlay */}

                <div className="absolute inset-x-0 top-0 flex items-start justify-between p-2 sm:p-3">

                    {post.category ? (
                        <Link
                            href={`/category/${post.category.slug.current}`}
                            className="
                                max-w-[70%]
                                truncate
                                rounded-full
                                border
                                border-white/20
                                bg-black/60
                                px-3
                                py-1
                                text-[10px]
                                font-medium
                                text-white
                                shadow-sm
                                backdrop-blur-md
                                transition
                                hover:bg-black/40
                                sm:px-3.5
                                sm:text-[11px]
                            "
                        >
                            {post.category.title}
                        </Link>
                    ) : (
                        <span />
                    )}

                    <RemoveBookmarkButton
                        postId={post._id}
                    />

                </div>

            </div>

            {/* Body */}

            <div className="flex flex-1 flex-col p-4">

                <Link
                    href={`/posts/${post.slug.current}`}
                    className="block"
                >
                    <h2
                        className="
                            line-clamp-2
                            text-base
                            font-semibold
                            leading-snug
                            tracking-tight
                            transition-colors
                            group-hover:text-primary
                            sm:text-lg
                            lg:text-xl
                        "
                    >
                        {post.title}
                    </h2>
                </Link>

                {post.excerpt && (
                    <p
                        className="
                            mt-2
                            line-clamp-2
                            text-xs
                            leading-6
                            text-muted-foreground
                            sm:text-sm
                        "
                    >
                        {post.excerpt}
                    </p>
                )}

                {/* Footer */}

                <div className="mt-auto pt-4">

                    <div
                        className="
                            -mx-4
                            flex
                            flex-wrap
                            items-center
                            gap-x-4
                            gap-y-2
                            border-t
                            border-border
                            px-4
                            pt-3
                            text-[11px]
                            text-muted-foreground
                            sm:text-xs
                        "
                    >
                        <div className="flex items-center gap-1.5">
                            <CalendarDays className="size-3.5" />
                            <span>{publishedDate}</span>
                        </div>

                        {post.readingTime && (
                            <div className="flex items-center gap-1.5">
                                <Clock className="size-3.5" />
                                <span>
                                    {post.readingTime} min
                                </span>
                            </div>
                        )}

                        <div className="ml-auto flex items-center gap-1.5">
                            <Eye className="size-3.5" />
                            <span>
                                {(post.views ?? 0).toLocaleString()}
                            </span>
                        </div>

                    </div>

                </div>

            </div>
        </article>
    );
}