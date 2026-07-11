import type { Metadata } from "next";

import PostCard from "@/components/post/PostCard";
import CategoriesWidget from "@/components/posts/CategoriesWidget";
import FeaturedCarousel from "@/components/posts/FeaturedCarousel";
import LatestPostsWidget from "@/components/posts/LatestPostsWidget";
import PopularPostsWidget from "@/components/posts/PopularPostsWidget";
import type { Category } from "@/types/category";
import type { Post } from "@/types/post";
import Link from "next/link";

import { getAllCategories } from "@/services/category.service";
import {
    getAllPosts,
    getFeaturedPosts,
    getLatestPosts,
    getPopularPosts,
} from "@/services/post.service";

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
            Post[]
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
        <main className="mx-auto max-w-7xl px-4 py-12">
            <div className="mb-12">
                <h1 className="text-4xl font-bold">
                    সব লেখা
                </h1>

                <p className="mt-3 max-w-3xl text-lg text-gray-600">
                    জীবন চক্রের সকল বিভাগ, সর্বশেষ প্রকাশিত লেখা,
                    জনপ্রিয় লেখা এবং নির্বাচিত লেখাগুলো এক জায়গায়।
                </p>
            </div>


            <div className="grid gap-10 lg:grid-cols-[320px_1fr]">

                {/* Sidebar */}

                <aside className="space-y-8">

                    <FeaturedCarousel posts={featuredPosts} />

                    <LatestPostsWidget posts={latestPosts} />

                    <PopularPostsWidget posts={popularPosts} />

                    <CategoriesWidget categories={categories} />

                </aside>


                {/* Main Content */}

                <section className="space-y-16">

                    <h2 className="mb-8 text-3xl font-bold">
                        সকল লেখা
                    </h2>


                    {postsByCategory.map(({ category, posts }) => {

                        if (!posts.length) {
                            return null;
                        }


                        return (
                            <div key={category._id}>

                                <div className="mb-6 flex items-center justify-between">

                                    <div>
                                        <h3 className="text-2xl font-bold">
                                            {category.title}
                                        </h3>

                                        {category.description && (
                                            <p className="mt-2 text-gray-600">
                                                {category.description}
                                            </p>
                                        )}
                                    </div>


                                    <Link
                                        href={`/category/${category.slug.current}`}
                                        className="rounded-lg border border-green-700 px-4 py-2 text-sm font-medium text-green-700 hover:bg-green-700 hover:text-white"
                                    >
                                        সব দেখুন →
                                    </Link>

                                </div>


                                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">

                                    {posts.slice(0, 3).map((post) => (
                                        <PostCard
                                            key={post._id}
                                            post={post}
                                        />
                                    ))}

                                </div>

                            </div>
                        );
                    })}

                </section>

            </div>

        </main>
    );
}