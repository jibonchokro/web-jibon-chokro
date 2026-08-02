import { ArrowLeft, Sparkles } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

import PostCard from "@/components/post/PostCard";
import Container from "@/components/ui/Container";

import { getFeaturedPosts } from "@/services/post.service";

import type { Post } from "@/types/post";

export const metadata: Metadata = {
    title: "নির্বাচিত লেখা",
    description:
        "জীবন চক্রের সম্পাদকদের বাছাইকৃত গুরুত্বপূর্ণ ও জনপ্রিয় লেখাগুলো পড়ুন।",
};

export default async function FeaturedPostsPage() {
    const posts: Post[] =
        await getFeaturedPosts();

    return (
        <main className="py-8 sm:py-10 lg:py-12">

            <Container>

                {/* Hero */}

                <header className="mb-10 overflow-hidden rounded-2xl border border-[#f0f0f0] bg-white p-6 shadow-custom sm:p-8 lg:p-10">

                    <div className="flex flex-wrap items-center gap-3">

                        <div className="inline-flex items-center gap-2 rounded-full border border-yellow-200 bg-yellow-50 px-3 py-1.5 text-sm font-medium text-yellow-700">

                            <Sparkles size={15} />

                            নির্বাচিত

                        </div>

                    </div>

                    <h1 className="mt-5 text-3xl font-black tracking-tight text-foreground sm:text-4xl lg:text-5xl">
                        নির্বাচিত লেখা
                    </h1>

                    <p className="mt-5 max-w-3xl text-base leading-8 text-muted-foreground sm:text-lg">
                        আমাদের সম্পাদকদের বাছাইকৃত গুরুত্বপূর্ণ,
                        মানসম্মত এবং জনপ্রিয় লেখাগুলো এখানে
                        একসাথে সাজানো হয়েছে, যাতে আপনি সহজেই
                        সেরা কনটেন্টগুলো পড়তে পারেন।
                    </p>

                    <div className="mt-8 flex flex-wrap items-center gap-3">

                        <div className="h-[40px] flex items-center justify-center rounded-xl border border-black/10 bg-muted/40 px-5 py-2">

                            <p className="text-sm font-medium text-black">
                                {posts.length} টি নির্বাচিত লেখা
                            </p>

                        </div>

                        <Link
                            href="/"
                            className="h-[40px] inline-flex items-center gap-2 rounded-xl border border-black/10 bg-black px-5 py-3 text-sm text-white font-medium transition hover:bg-black/80"
                        >
                            <ArrowLeft size={18} />

                            ফিরে যান
                        </Link>

                    </div>

                </header>

                {/* Posts */}

                {posts.length === 0 ? (

                    <div className="rounded-2xl border border-dashed border-black/10 bg-muted/30 py-20 text-center">

                        <h2 className="text-xl font-semibold">
                            কোনো নির্বাচিত লেখা নেই
                        </h2>

                        <p className="mt-2 text-muted-foreground">
                            এখনো কোনো নির্বাচিত লেখা প্রকাশ করা
                            হয়নি।
                        </p>

                    </div>

                ) : (

                    <section className="grid grid-cols-1 gap-6 sm:grid-cols-3 xl:grid-cols-4">

                        {posts.map((post) => (

                            <PostCard
                                key={post._id}
                                post={post}
                            />

                        ))}

                    </section>

                )}

            </Container>

        </main>
    );
}