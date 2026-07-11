import type { Category } from "@/types/category";
import type { Post } from "@/types/post";

import CategoriesWidget from "./CategoriesWidget";
import FeaturedCarousel from "./FeaturedCarousel";
import LatestPostsWidget from "./LatestPostsWidget";
import PopularPostsWidget from "./PopularPostsWidget";

interface PostsSidebarProps {
    featuredPosts: Post[];
    latestPosts: Post[];
    popularPosts: Post[];
    categories: Category[];
}

export default function PostsSidebar({
    featuredPosts,
    latestPosts,
    popularPosts,
    categories,
}: PostsSidebarProps) {
    return (
        <div className="space-y-8 lg:sticky lg:top-24">
            <FeaturedCarousel posts={featuredPosts} />

            <LatestPostsWidget posts={latestPosts} />

            <PopularPostsWidget posts={popularPosts} />

            <CategoriesWidget categories={categories} />
        </div>
    );
}