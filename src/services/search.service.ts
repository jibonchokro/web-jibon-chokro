import type { Post } from "@/types/post";

import { client } from "@/sanity/lib/client";
import { searchPostsQuery } from "@/sanity/queries/search";

export async function searchPosts(
    search: string
): Promise<Post[]> {
    if (!search.trim()) {
        return [];
    }

    return client.fetch<Post[]>(
        searchPostsQuery,
        {
            search: `*${search}*`,
        }
    );
}