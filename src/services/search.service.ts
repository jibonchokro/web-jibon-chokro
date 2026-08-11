import { client } from "@/sanity/lib/client";

import {
    searchPostsAllQuery,
    searchPostsLatestQuery,
    searchPostsOldestQuery,
    searchPostsTitleQuery,
} from "@/sanity/queries/search";

import { attachPostStats } from "@/services/post.service";

import type { Post } from "@/types/post";

export type SearchSort =
    | "latest"
    | "oldest"
    | "title"
    | "popular";

interface SearchOptions {
    page?: number;
    limit?: number;
    sort?: SearchSort;
    categorySlug?: string;
}

/*
 * Same popularity rule as sortByPopularity in lib/posts.ts:
 * 1 comment = 5 views. Kept in sync manually since this runs
 * against a differently-fetched post list (search matches only).
 */
function popularityScore(post: Post): number {
    return (
        Number(post.views ?? 0) +
        Number(post.comments ?? 0) * 5
    );
}

function sortByPopularity(posts: Post[]): Post[] {
    return [...posts].sort((a, b) => {
        const scoreDifference =
            popularityScore(b) -
            popularityScore(a);

        if (scoreDifference !== 0) {
            return scoreDifference;
        }

        return (
            new Date(b.publishedAt).getTime() -
            new Date(a.publishedAt).getTime()
        );
    });
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
        sort = "latest",
        categorySlug,
    } = options;

    const baseParams = {
        search: `*${search}*`,
        // GROQ's defined() is false for null, so "no filter" is
        // expressed as null rather than omitting the param.
        categorySlug: categorySlug ?? null,
    };

    if (sort === "popular") {
        /*
         * Can't paginate inside the Sanity query here: popularity
         * depends on Supabase views/comments, which Sanity doesn't
         * know about. So fetch every match, attach real stats,
         * sort, then slice the requested page ourselves — same
         * approach as getPopularPosts() in lib/posts.ts.
         */
        const allMatches = await client.fetch<Post[]>(
            searchPostsAllQuery,
            baseParams
        );

        if (!allMatches.length) {
            return [];
        }

        const withStats =
            await attachPostStats(allMatches);

        const sorted =
            sortByPopularity(withStats);

        const start = (page - 1) * limit;

        return sorted.slice(start, start + limit);
    }

    const start = (page - 1) * limit;
    const end = start + limit;

    const queryParams = {
        ...baseParams,
        start,
        end,
    };

    let posts: Post[];

    switch (sort) {
        case "oldest":
            posts = await client.fetch<Post[]>(
                searchPostsOldestQuery,
                queryParams
            );
            break;

        case "title":
            posts = await client.fetch<Post[]>(
                searchPostsTitleQuery,
                queryParams
            );
            break;

        default:
            posts = await client.fetch<Post[]>(
                searchPostsLatestQuery,
                queryParams
            );
    }

    // attachPostStats (not just attachViews) so `comments` is
    // populated too — previously always 0 on search results, which
    // would have made "popular" silently wrong even server-side.
    return attachPostStats(posts);
}