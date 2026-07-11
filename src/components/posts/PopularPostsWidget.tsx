import Image from "next/image";
import Link from "next/link";

import { urlFor } from "@/sanity/lib/image";
import type { Post } from "@/types/post";

interface PopularPostsWidgetProps {
    posts: Post[];
}

export default function PopularPostsWidget({
    posts,
}: PopularPostsWidgetProps) {
    if (!posts.length) {
        return null;
    }

    return (
        <section className="rounded-2xl border border-gray-200 bg-white shadow-sm">
            <div className="border-b border-gray-200 px-5 py-4">
                <h2 className="font-bold text-gray-900">
                    জনপ্রিয় লেখা
                </h2>
            </div>

            <div className="divide-y divide-gray-200">
                {posts.map((post, index) => {
                    const image = post.coverImage
                        ? urlFor(post.coverImage)
                            .width(120)
                            .height(80)
                            .url()
                        : null;

                    return (
                        <Link
                            key={post._id}
                            href={`/posts/${post.slug.current}`}
                            className="flex gap-4 p-4 transition hover:bg-gray-50"
                        >
                            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-green-700 text-sm font-bold text-white">
                                {index + 1}
                            </div>

                            {image && (
                                <div className="relative h-20 w-28 shrink-0 overflow-hidden rounded-lg bg-gray-100">
                                    <Image
                                        src={image}
                                        alt={post.title}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                            )}

                            <div className="min-w-0 flex-1">
                                <p className="text-xs font-medium text-green-700">
                                    {post.category?.title}
                                </p>

                                <h3 className="mt-1 line-clamp-2 font-semibold leading-6 text-gray-900">
                                    {post.title}
                                </h3>

                                <div className="mt-2 flex items-center justify-between text-xs text-gray-500">
                                    <span>
                                        {post.readingTime} মিনিট
                                    </span>

                                    <span>
                                        {new Date(
                                            post.publishedAt
                                        ).toLocaleDateString("bn-BD")}
                                    </span>
                                </div>
                            </div>
                        </Link>
                    );
                })}
            </div>

            <div className="border-t border-gray-200 p-4">
                <Link
                    href="/posts?sort=popular"
                    className="text-sm font-semibold text-green-700 transition hover:text-green-800"
                >
                    সব জনপ্রিয় লেখা →
                </Link>
            </div>
        </section>
    );
}