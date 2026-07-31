import type { Metadata } from "next";

import CategoryPostsSection from "@/components/posts/CategoryPostsSection";

import { getAllCategories } from "@/services/category.service";
import {
    getAllPosts,
    getFeaturedPosts,
    getLatestPosts,
    getPopularPosts,
} from "@/services/post.service";

import type { Category } from "@/types/category";
import type { Post } from "@/types/post";

export const metadata: Metadata = {
    title: "সব লেখা",
    description: "জীবন চক্রের সকল প্রকাশিত লেখা।",
};

export default async function PostsPage() {
    const [
        categories,
        allPosts,
        featuredPosts,
        latestPosts,
        popularPosts,
    ]: [
            Category[],
            Post[],
            Post[],
            Post[],
            Post[],
        ] = await Promise.all([
            getAllCategories(),
            getAllPosts(),
            getFeaturedPosts(),
            getLatestPosts(),
            getPopularPosts(),
        ]);

    const postsByCategory = categories.map(
        (category) => ({
            category,
            posts: allPosts.filter(
                (post) =>
                    post.category?._id ===
                    category._id
            ),
        })
    );

    return (
        <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">

            {/* Hero */}

            <header className="mx-auto mb-10 max-w-3xl text-center">

                <h1 className="text-3xl font-black tracking-tight sm:text-4xl lg:text-5xl">
                    সব লেখা
                </h1>

                <p className="mt-5 text-base leading-8 text-muted-foreground sm:text-lg">
                    সকল বিভাগ, সর্বশেষ প্রকাশিত লেখা এবং
                    জনপ্রিয় বিষয়গুলো এক জায়গায়।
                </p>

            </header>

            <div className="grid min-w-0">

                {/* Main */}

                <section className="min-w-0 space-y-12 overflow-hidden">
                    {postsByCategory.map(
                        ({
                            category,
                            posts,
                        }) => {

                            if (!posts.length) {
                                return null;
                            }

                            return (
                                <CategoryPostsSection
                                    key={
                                        category._id
                                    }
                                    category={
                                        category
                                    }
                                    posts={posts}
                                />
                            );
                        }
                    )}

                </section>

            </div>

        </main>
    );
}