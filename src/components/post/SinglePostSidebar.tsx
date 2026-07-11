import SidebarCategories from "./SidebarCategories";
import SidebarFollowUs from "./SidebarFollowUs";
import SidebarLatestPosts from "./SidebarLatestPosts";
import SidebarPopularPosts from "./SidebarPopularPosts";

import type { Category } from "@/types/category";
import type { Post } from "@/types/post";

interface SinglePostSidebarProps {
    latestPosts: Post[];
    popularPosts: Post[];
    categories: Category[];
}

export default function SinglePostSidebar({
    latestPosts,
    popularPosts,
    categories,
}: SinglePostSidebarProps) {
    return (
        <aside className="space-y-8 lg:sticky lg:top-24">

            <SidebarFollowUs />

            <SidebarLatestPosts
                posts={latestPosts}
            />

            <SidebarPopularPosts
                posts={popularPosts}
            />

            <SidebarCategories
                categories={categories}
            />

        </aside>
    );
}