import type { Metadata } from "next";
import Link from "next/link";

import PostCard from "@/components/post/PostCard";
import CategoriesWidget from "@/components/posts/CategoriesWidget";
import FeaturedCarousel from "@/components/posts/FeaturedCarousel";
import LatestPostsWidget from "@/components/posts/LatestPostsWidget";
import PopularPostsWidget from "@/components/posts/PopularPostsWidget";

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

    const postsByCategory = categories.map((category) => ({
        category,
        posts: allPosts.filter(
            (post) => post.category?._id === category._id
        ),
    }));

    return (
        <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">

            {/* Hero */}
            <header className="mx-auto mb-10 max-w-3xl text-center sm:mb-14">
                <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl lg:text-5xl">
                    সব লেখা
                </h1>

                <p className="mt-4 text-base leading-7 text-gray-600 sm:text-lg">
                    জীবন চক্রের সকল বিভাগ, সর্বশেষ প্রকাশিত লেখা,
                    জনপ্রিয় লেখা এবং নির্বাচিত বিষয়গুলো এক জায়গায়।
                </p>
            </header>

            <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1fr)_320px] lg:gap-12">

                {/* Main */}
                <section className="space-y-14">

                    {postsByCategory.map(({ category, posts }) => {

                        if (!posts.length) {
                            return null;
                        }

                        return (
                            <section
                                key={category._id}
                                className="border-b border-gray-100 pb-12 last:border-b-0 last:pb-0"
                            >

                                <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">

                                    <div>

                                        <h2 className="text-2xl font-bold text-gray-900">
                                            {category.title}
                                        </h2>

                                        {category.description && (
                                            <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-600 sm:text-base">
                                                {category.description}
                                            </p>
                                        )}

                                    </div>

                                    <Link
                                        href={`/category/${category.slug.current}`}
                                        className="inline-flex w-fit items-center text-sm font-medium text-green-700 transition hover:text-green-800"
                                    >
                                        সব দেখুন →
                                    </Link>

                                </div>

                                <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">

                                    {posts.slice(0, 3).map((post) => (
                                        <PostCard
                                            key={post._id}
                                            post={post}
                                        />
                                    ))}

                                </div>

                            </section>
                        );
                    })}

                </section>

                {/* Sidebar */}
                <aside className="space-y-8 lg:sticky lg:top-24 lg:self-start">

                    <FeaturedCarousel
                        posts={featuredPosts}
                    />

                    <LatestPostsWidget
                        posts={latestPosts}
                    />

                    <PopularPostsWidget
                        posts={popularPosts}
                    />

                    <CategoriesWidget
                        categories={categories}
                    />

                </aside>

            </div>

        </main>
    );
}