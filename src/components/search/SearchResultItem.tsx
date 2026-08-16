"use client";

import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import Link from "next/link";

interface SearchResultItemProps {
    post: {
        _id: string;
        title: string;
        slug: {
            current: string;
        };
        excerpt?: string;
        coverImage?: any;
        category?: {
            title: string;
        };
    };
    onSelect?: () => void;
}

export default function SearchResultItem({
    post,
    onSelect,
}: SearchResultItemProps) {
    const imageUrl = post.coverImage
        ? urlFor(post.coverImage)
            .width(160)
            .height(90)
            .url()
        : null;

    return (
        <Link
            href={`/posts/${post.slug.current}`}
            onClick={onSelect}
            className="flex gap-4 border-b border-border p-4 transition-colors hover:bg-muted/50 last:border-b-0"
        >
            <div className="relative h-16 w-24 shrink-0 overflow-hidden rounded-lg border border-border bg-muted">
                {imageUrl ? (
                    <Image
                        src={imageUrl}
                        alt={post.title}
                        fill
                        className="object-cover"
                    />
                ) : (
                    <div className="flex h-full items-center justify-center text-xs text-muted-foreground">
                        No Image
                    </div>
                )}
            </div>

            <div className="min-w-0 flex-1 text-left">

                {post.category && (
                    <p className="mb-1 text-[10px] font-medium uppercase tracking-wide text-muted-foreground">
                        {post.category.title}
                    </p>
                )}

                <h4 className="truncate line-clamp-2 text-sm font-medium leading-5 text-foreground">
                    {post.title}
                </h4>

                {post.excerpt && (
                    <p className="mt-1 line-clamp-2 text-xs leading-5 text-muted-foreground">
                        {post.excerpt}
                    </p>
                )}

            </div>
        </Link>
    );
}