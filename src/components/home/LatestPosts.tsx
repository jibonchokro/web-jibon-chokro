import Link from "next/link";

import PostCard from "@/components/post/PostCard";
import Container from "@/components/ui/Container";

import type { Post } from "@/types/post";

interface LatestPostsProps {
    posts: Post[];
}

export default function LatestPosts({
    posts,
}: LatestPostsProps) {
    const latestPosts = posts.slice(0, 6);

    return (
        <section className="py-20">
            <Container>
                <div className="mb-10 flex items-end justify-between">
                    <div>
                        <h2 className="text-3xl font-bold text-gray-900">
                            সর্বশেষ লেখা
                        </h2>

                        <p className="mt-2 text-gray-600">
                            সম্প্রতি প্রকাশিত লেখাগুলো পড়ুন।
                        </p>
                    </div>

                    <Link
                        href="/posts"
                        className="hidden font-medium text-green-700 transition hover:text-green-800 sm:inline-block"
                    >
                        সব লেখা দেখুন →
                    </Link>
                </div>

                {latestPosts.length === 0 ? (
                    <div className="rounded-2xl border border-dashed border-gray-300 py-12 text-center text-gray-500">
                        এখনো কোনো লেখা প্রকাশ করা হয়নি।
                    </div>
                ) : (
                    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                        {latestPosts.map((post) => (
                            <PostCard
                                key={post._id}
                                post={post}
                            />
                        ))}
                    </div>
                )}

                {latestPosts.length > 0 && (
                    <div className="mt-10 text-center sm:hidden">
                        <Link
                            href="/posts"
                            className="inline-flex rounded-lg bg-green-700 px-5 py-3 font-medium text-white transition hover:bg-green-800"
                        >
                            সব লেখা দেখুন
                        </Link>
                    </div>
                )}
            </Container>
        </section>
    );
}