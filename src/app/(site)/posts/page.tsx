import type { Metadata } from "next";

import CategoryPostsSection from "@/components/post/CategoryPostSection";
import { getAllCategories } from "@/services/category.service";
import { getAllPosts, getFeaturedPosts, getLatestPosts, getPopularPosts } from "@/services/post.service";
import type { Category } from "@/types/category";
import type { Post } from "@/types/post";

export const metadata: Metadata = {
    title: "সব লেখা",
    description: "জীবন চক্রের সকল প্রকাশিত লেখা।",
};

export default async function PostsPage() {
    const [categories, allPosts, featuredPosts, latestPosts, popularPosts]: [Category[], Post[], Post[], Post[], Post[]] = await Promise.all([
        getAllCategories(),
        getAllPosts(),
        getFeaturedPosts(),
        getLatestPosts(),
        getPopularPosts(),
    ]);

    const postsByCategory = categories.map((category) => ({
        category,
        posts: allPosts.filter((post) => post.category?._id === category._id),
    }));

    return (
        <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
            <header className="mb-10 rounded-xl border border-border bg-card p-6 text-foreground shadow-custom sm:p-8">
                <div className="mx-auto max-w-3xl text-center">
                    <span className="inline-flex rounded-full border border-border bg-muted px-4 py-1.5 text-sm font-medium text-foreground">
                        জীবনচক্র আর্কাইভ
                    </span>

                    <h1 className="mt-5 text-3xl font-black tracking-tight text-foreground sm:text-4xl lg:text-5xl">
                        সব লেখা
                    </h1>

                    <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-muted-foreground sm:text-lg">
                        সকল বিভাগ, সর্বশেষ প্রকাশিত লেখা এবং জনপ্রিয় বিষয়গুলো
                        এক জায়গায় সাজানো হয়েছে। আপনার পছন্দের বিভাগ নির্বাচন
                        করে সহজেই পড়া শুরু করুন।
                    </p>
                </div>

                <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
                    <div className="rounded-lg border border-border bg-background p-4 text-center">
                        <div className="text-2xl font-bold text-foreground">
                            {allPosts.length}
                        </div>

                        <p className="mt-1 text-sm text-muted-foreground">
                            মোট লেখা
                        </p>
                    </div>

                    <div className="rounded-lg border border-border bg-background p-4 text-center">
                        <div className="text-2xl font-bold text-foreground">
                            {categories.length}
                        </div>

                        <p className="mt-1 text-sm text-muted-foreground">
                            বিভাগ
                        </p>
                    </div>

                    <div className="rounded-lg border border-border bg-background p-4 text-center">
                        <div className="text-2xl font-bold text-foreground">
                            {featuredPosts.length}
                        </div>

                        <p className="mt-1 text-sm text-muted-foreground">
                            নির্বাচিত
                        </p>
                    </div>

                    <div className="rounded-lg border border-border bg-background p-4 text-center">
                        <div className="text-2xl font-bold text-foreground">
                            {latestPosts.length}
                        </div>

                        <p className="mt-1 text-sm text-muted-foreground">
                            সর্বশেষ
                        </p>
                    </div>
                </div>
            </header>

            <div className="grid min-w-0">
                <section className="min-w-0 space-y-12 overflow-hidden">
                    {postsByCategory.map(({ category, posts }) => {
                        if (!posts.length) {
                            return null;
                        }

                        return (
                            <CategoryPostsSection
                                key={category._id}
                                category={category}
                                posts={posts}
                            />
                        );
                    })}
                </section>
            </div>
        </main>
    );
}