import Link from "next/link";

import PostCard from "@/components/post/PostCard";
import Container from "@/components/ui/Container";

import type { Post } from "@/types/post";

interface PopularPostsProps {
    posts: Post[];
}

export default function PopularPosts({
    posts,
}: PopularPostsProps) {
    return (
        <section className="bg-gray-50 py-20">
            <Container>
                <div className="mb-10 flex items-end justify-between">
                    <div>
                        <h2 className="text-3xl font-bold text-gray-900">
                            জনপ্রিয় লেখা
                        </h2>

                        <p className="mt-2 text-gray-600">
                            পাঠকদের সবচেয়ে বেশি পড়া লেখাগুলো।
                        </p>
                    </div>

                    <Link
                        href="/posts?sort=popular"
                        className="hidden font-medium text-green-700 transition hover:text-green-800 sm:inline-block"
                    >
                        সব জনপ্রিয় লেখা →
                    </Link>
                </div>

                {posts.length === 0 ? (
                    <div className="rounded-2xl border border-dashed border-gray-300 py-12 text-center text-gray-500">
                        এখনো কোনো জনপ্রিয় লেখা নেই।
                    </div>
                ) : (
                    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                        {posts.map((post) => (
                            <PostCard
                                key={post._id}
                                post={post}
                            />
                        ))}
                    </div>
                )}

                {posts.length > 0 && (
                    <div className="mt-10 text-center sm:hidden">
                        <Link
                            href="/posts?sort=popular"
                            className="inline-flex rounded-lg bg-green-700 px-5 py-3 font-medium text-white transition hover:bg-green-800"
                        >
                            সব জনপ্রিয় লেখা
                        </Link>
                    </div>
                )}
            </Container>
        </section>
    );
}