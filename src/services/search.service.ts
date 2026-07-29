import { client } from "@/sanity/lib/client";
import { searchPostsQuery } from "@/sanity/queries/search";
import { attachViews } from "@/services/post.service";
import type { Post } from "@/types/post";

interface SearchOptions {
    page?: number;
    limit?: number;
}

export async function searchPosts(
    search: string,
    options: SearchOptions = {}
): Promise<Post[]> {

    if (!search.trim()) {
        return [];
    }

    const {
        page = 1,
        limit = 16,
    } = options;


    const start =
        (page - 1) * limit;

    const end =
        start + limit;


    const posts = await client.fetch<Post[]>(
        searchPostsQuery,
        {
            search: `*${search}*`,
            start,
            end,
        }
    );


    return attachViews(posts);
}