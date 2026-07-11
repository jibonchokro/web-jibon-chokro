import Image from "next/image";
import Link from "next/link";

import { Clock } from "lucide-react";

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
        <section className="rounded-md border border-[#e7e7e7] bg-white p-6">

            <h2 className="mb-5 text-lg font-bold text-gray-900">
                সর্বশেষ লেখা
            </h2>

            <div className="space-y-5">

                {posts.map((post) => {

                    const image =
                        post.coverImage
                            ? urlFor(post.coverImage)
                                .width(120)
                                .height(80)
                                .url()
                            : null;

                    return (
                        <Link
                            key={post._id}
                            href={`/posts/${post.slug.current}`}
                            className="group flex gap-4"
                        >

                            <div className="relative h-20 w-28 shrink-0 overflow-hidden rounded-xl bg-gray-100">

                                {image && (
                                    <Image
                                        src={image}
                                        alt={post.title}
                                        fill
                                        className="object-cover transition duration-300 group-hover:scale-105"
                                    />
                                )}

                            </div>

                            <div className="min-w-0 flex-1">

                                {post.category && (
                                    <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-green-700">
                                        {post.category.title}
                                    </p>
                                )}

                                <h3 className="line-clamp-2 text-sm font-semibold leading-6 text-gray-900 transition group-hover:text-green-700">
                                    {post.title}
                                </h3>

                                <div className="mt-2 flex items-center gap-2 text-xs text-gray-500">

                                    <Clock size={14} />

                                    <span>
                                        {post.readingTime} মিনিট
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