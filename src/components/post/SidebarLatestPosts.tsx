import Image from "next/image";
import Link from "next/link";

import {
    Clock,
    Eye,
    List,
    MessageCircle,
} from "lucide-react";

import { urlFor } from "@/sanity/lib/image";

import type { Post } from "@/types/post";

interface SidebarLatestPostsProps {
    posts: Post[];
}

export default function SidebarLatestPosts({
    posts,
}: SidebarLatestPostsProps) {
    if (!posts.length) {
        return null;
    }

    return (
        <section className="rounded-none border border-border bg-card p-5 shadow-custom sm:rounded-xl lg:rounded-xl">
            {/* Header */}

            <div className="mb-5 flex items-center gap-2">
                <List
                    size={18}
                    className="text-foreground"
                />

                <h2 className="text-base font-semibold tracking-tight text-foreground">
                    সর্বশেষ লেখা
                </h2>
            </div>

            {/* Posts */}

            <div className="space-y-3">
                {posts.map((post) => {
                    const image = post.coverImage
                        ? urlFor(post.coverImage)
                            .width(120)
                            .height(90)
                            .url()
                        : null;

                    const publishedDate =
                        new Date(
                            post.publishedAt
                        ).toLocaleDateString(
                            "en-GB",
                            {
                                day: "2-digit",
                                month: "short",
                                year: "numeric",
                            }
                        );

                    const views =
                        Number(post.views ?? 0);

                    const comments =
                        Number(post.comments ?? 0);

                    return (
                        <Link
                            key={post._id}
                            href={`/posts/${post.slug.current}`}
                            className="group flex gap-3 rounded-lg border border-border bg-card p-3 transition-colors hover:bg-muted/50"
                        >
                            {/* Thumbnail */}

                            <div className="relative h-16 w-20 shrink-0 overflow-hidden rounded-lg bg-muted">
                                {image ? (
                                    <Image
                                        src={image}
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

                                <h3 className="line-clamp-2 text-sm font-semibold leading-5 text-foreground transition-colors group-hover:text-primary">
                                    {post.title}
                                </h3>

                                {/* Meta */}

                                <div className="mt-2 flex items-center gap-3 text-xs text-muted-foreground">
                                    {/* Reading time */}

                                    {post.readingTime && (
                                        <span className="flex items-center gap-1">
                                            <Clock
                                                size={13}
                                            />

                                            {post.readingTime} min
                                        </span>
                                    )}

                                    {/* Comments */}

                                    <span className="flex items-center gap-1">
                                        <MessageCircle
                                            size={13}
                                        />

                                        {comments.toLocaleString(
                                            "en-US"
                                        )}
                                    </span>

                                    {/* Views */}

                                    <span className="flex items-center gap-1">
                                        <Eye size={13} />

                                        {views.toLocaleString(
                                            "en-US"
                                        )}
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