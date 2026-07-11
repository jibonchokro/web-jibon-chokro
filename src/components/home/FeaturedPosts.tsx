import PostCard from "@/components/post/PostCard";
import Container from "@/components/ui/Container";

import type { Post } from "@/types/post";

interface FeaturedPostsProps {
    posts: Post[];
}

export default function FeaturedPosts({
    posts,
}: FeaturedPostsProps) {
    return (
        <section className="py-20">
            <Container>
                <div className="mb-10">
                    <h2 className="text-3xl font-bold">
                        নির্বাচিত লেখা
                    </h2>

                    <p className="mt-2 text-gray-600">
                        আমাদের নির্বাচিত কিছু অনুপ্রেরণামূলক লেখা।
                    </p>
                </div>

                {posts.length === 0 ? (
                    <div className="rounded-2xl border border-dashed border-gray-300 py-12 text-center text-gray-500">
                        এখনো কোনো নির্বাচিত লেখা প্রকাশ করা হয়নি।
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
            </Container>
        </section>
    );
}