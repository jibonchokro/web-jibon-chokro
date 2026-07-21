import { ArrowRight } from "lucide-react";
import Link from "next/link";

import PostCard from "@/components/post/PostCard";
import Container from "@/components/ui/Container";

import type { Post } from "@/types/post";

interface FeaturedPostsProps {
    posts: Post[];
}

export default function FeaturedPosts({
    posts,
}: FeaturedPostsProps) {
    const featuredPosts = posts.slice(0, 20);

    return (
        <section className="py-8 sm:py-10 lg:py-12">

            <Container>

                {/* Header */}

                <div className="mb-6 flex items-end justify-between gap-4">

                    <div>

                        <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                            নির্বাচিত লেখা
                        </h2>

                    </div>

                    <Link
                        href="/posts"
                        className="inline-flex items-center gap-2 rounded-lg border border-black/10 bg-white px-4 py-2 text-sm font-medium transition-colors hover:bg-muted"
                    >
                        সব লেখা

                        <ArrowRight size={16} />
                    </Link>

                </div>

                {featuredPosts.length === 0 ? (

                    <div className="rounded-xl border border-dashed border-black/10 bg-muted/30 py-12 text-center text-muted-foreground">
                        এখনো কোনো নির্বাচিত লেখা প্রকাশ করা হয়নি।
                    </div>

                ) : (

                    <div className="-mx-4 overflow-x-auto px-4 scrollbar-hide">

                        <div className="flex snap-x snap-mandatory gap-4 pb-2">

                            {featuredPosts.map((post) => (

                                <div
                                    key={post._id}
                                    className="
                                        w-[250px]
                                        shrink-0
                                        snap-start
                                        sm:w-[275px]
                                        lg:w-[300px]
                                    "
                                >
                                    <PostCard post={post} />
                                </div>

                            ))}

                        </div>

                    </div>

                )}

            </Container>

        </section>
    );
}