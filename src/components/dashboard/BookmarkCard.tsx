"use client";

import Image from "next/image";
import Link from "next/link";

import { CalendarDays, Clock } from "lucide-react";

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
                overflow-hidden
                rounded-xl
                border
                border-black/10
                bg-background
                transition-all
                duration-300
                hover:-translate-y-1
                hover:shadow-lg
            "
        >
            <Link href={`/posts/${post.slug.current}`}>
                <div className="relative aspect-[16/9] overflow-hidden bg-muted">
                    {post.imageUrl ? (
                        <Image
                            src={post.imageUrl}
                            alt={post.title}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                    ) : (
                        <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
                            No Image
                        </div>
                    )}
                </div>
            </Link>

            <div className="space-y-4 p-5">
                {post.category && (
                    <Link
                        href={`/category/${post.category.slug.current}`}
                        className="
                            inline-flex
                            rounded-full
                            bg-muted
                            px-3
                            py-1
                            text-xs
                            font-medium
                            transition-colors
                            hover:bg-accent
                        "
                    >
                        {post.category.title}
                    </Link>
                )}

                <Link href={`/posts/${post.slug.current}`}>
                    <h2 className="line-clamp-2 text-lg font-semibold transition-colors group-hover:text-primary">
                        {post.title}
                    </h2>
                </Link>

                {post.excerpt && (
                    <p className="line-clamp-3 text-sm leading-6 text-muted-foreground">
                        {post.excerpt}
                    </p>
                )}

                <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                        <CalendarDays size={14} />
                        <span>{publishedDate}</span>
                    </div>

                    {post.readingTime && (
                        <div className="flex items-center gap-1">
                            <Clock size={14} />
                            <span>{post.readingTime} min read</span>
                        </div>
                    )}
                </div>

                <div className="flex items-center justify-between border-t border-black/10 pt-4">
                    <Link
                        href={`/posts/${post.slug.current}`}
                        className="
                            text-sm
                            font-medium
                            text-primary
                            hover:underline
                        "
                    >
                        Read article
                    </Link>

                    <RemoveBookmarkButton
                        postId={post._id}
                    />
                </div>
            </div>
        </article>
    );
}