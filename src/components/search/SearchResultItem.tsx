"use client";

import Image from "next/image";
import Link from "next/link";

import { urlFor } from "@/sanity/lib/image";

interface SearchResultItemProps {
    post: {
        _id: string;

        title: string;

        slug: {
            current: string;
        };

        excerpt?: string;

        coverImage?: any;

        readingTime?: number;

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
            className="flex gap-4 border-b border-gray-100 p-4 transition hover:bg-gray-50 last:border-none"
        >

            <div className="relative h-16 w-24 flex-shrink-0 overflow-hidden rounded-lg bg-gray-100">

                {imageUrl ? (
                    <Image
                        src={imageUrl}
                        alt={post.title}
                        fill
                        className="object-cover"
                    />
                ) : (
                    <div className="flex h-full items-center justify-center text-xs text-gray-400">
                        No Image
                    </div>
                )}

            </div>

            <div className="min-w-0 flex-1 text-left">

                {post.category && (
                    <p className="mb-1 text-xs font-medium text-green-700">
                        {post.category.title}
                    </p>
                )}

                <h4 className="line-clamp-2 font-semibold text-gray-900">
                    {post.title}
                </h4>

                {post.excerpt && (
                    <p className="mt-1 line-clamp-2 text-sm text-gray-500">
                        {post.excerpt}
                    </p>
                )}

                <div className="mt-2 flex items-center gap-3 text-xs text-gray-400">

                    {post.readingTime && (
                        <span>
                            {post.readingTime} মিনিট
                        </span>
                    )}

                </div>

            </div>

        </Link>
    );
}