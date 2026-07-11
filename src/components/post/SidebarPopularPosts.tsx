import Link from "next/link";

import { TrendingUp } from "lucide-react";

import type { Post } from "@/types/post";

interface SidebarPopularPostsProps {
    posts: Post[];
}

export default function SidebarPopularPosts({
    posts,
}: SidebarPopularPostsProps) {
    if (!posts.length) {
        return null;
    }

    return (
        <section className="rounded-md border border-[#e7e7e7] bg-white p-6">

            <div className="mb-6 flex items-center gap-2">

                <TrendingUp
                    size={20}
                    className="text-green-700"
                />

                <h2 className="text-lg font-bold text-gray-900">
                    জনপ্রিয় লেখা
                </h2>

            </div>

            <div className="space-y-5">

                {posts.map((post, index) => (
                    <Link
                        key={post._id}
                        href={`/posts/${post.slug.current}`}
                        className="group flex gap-4 rounded-md border border-[#eeeeee] p-3 bg-[#fcfcfc]"
                    >

                        <div className="min-w-0 flex-1">

                            <div className="mb-2 flex items-center gap-2 text-xs">

                                {post.category && (
                                    <span className="uppercase tracking-wide text-green-700">
                                        {post.category.title}
                                    </span>
                                )}

                                <span className="text-gray-300">•</span>

                                <span className="text-gray-500">
                                    {new Date(post.publishedAt).toLocaleDateString(
                                        "bn-BD",
                                        {
                                            day: "numeric",
                                            month: "short",
                                            year: "numeric",
                                        }
                                    )}
                                </span>

                            </div>

                            <h3 className="line-clamp-2 text-sm leading-6 text-gray-900 transition group-hover:text-green-700">
                                {post.title}
                            </h3>

                        </div>

                    </Link>
                ))}

            </div>

        </section>
    );
}