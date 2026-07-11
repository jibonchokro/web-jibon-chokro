import Categories from "./Categories";
import FacebookSection from "./FacebookSection";
import FeaturedPosts from "./FeaturedPosts";
import Hero from "./Hero";
import LatestPosts from "./LatestPosts";
import PopularPosts from "./PopularPosts";

import { getAllCategories } from "@/services/category.service";
import {
    getAllPosts,
    getFeaturedPosts,
} from "@/services/post.service";

export default async function HomePage() {
    const [featuredPosts, latestPosts, categories] =
        await Promise.all([
            getFeaturedPosts(),
            getAllPosts(),
            getAllCategories(),
        ]);

    return (
        <>
            <Hero />

            <FeaturedPosts posts={featuredPosts} />

            <LatestPosts posts={latestPosts} />

            <Categories categories={categories} />

            <PopularPosts posts={latestPosts} />

            <FacebookSection />
        </>
    );
}