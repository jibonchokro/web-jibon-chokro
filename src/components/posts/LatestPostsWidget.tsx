import Image from "next/image";
import Link from "next/link";

import { urlFor } from "@/sanity/lib/image";
import type { Post } from "@/types/post";

interface LatestPostsWidgetProps {
    posts: Post[];
}

export default function LatestPostsWidget({
    posts,
}: LatestPostsWidgetProps) {
    if (!posts.length) {
        return null;
    }

    return (
        <section className="rounded-2xl border border-gray-200 bg-white shadow-sm">
            <div className="border-b border-gray-200 px-5 py-4">
                <h2 className="font-bold text-gray-900">
                    সর্বশেষ লেখা
                </h2>
            </div>

            <div className="divide-y divide-gray-200">
                {posts.map((post) => {
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

                            <div className="min-w-0">
                                <p className="text-xs font-medium text-green-700">
                                    {post.category?.title}
                                </p>

                                <h3 className="mt-1 line-clamp-2 font-semibold leading-6 text-gray-900">
                                    {post.title}
                                </h3>

                                <p className="mt-2 text-xs text-gray-500">
                                    {new Date(
                                        post.publishedAt
                                    ).toLocaleDateString("bn-BD")}
                                </p>
                            </div>
                        </Link>
                    );
                })}
            </div>

            <div className="border-t border-gray-200 p-4">
                <Link
                    href="/posts"
                    className="text-sm font-semibold text-green-700 transition hover:text-green-800"
                >
                    সব লেখা দেখুন →
                </Link>
            </div>
        </section>
    );
}