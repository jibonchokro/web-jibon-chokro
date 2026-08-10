import { supabaseAdmin } from "@/lib/supabase/admin";
import { client } from "@/sanity/lib/client";

import {
    allPostsQuery,
    featuredPostsQuery,
    latestPostsQuery,
    postBySlugQuery,
    postsByCategoryQuery,
} from "@/sanity/queries/post";

import type { Post } from "@/types/post";

/**
 * Attach view counts to posts.
 */
export async function attachViews(
    posts: Post[]
): Promise<Post[]> {
    if (!posts.length) {
        return [];
    }

    const postIds = posts.map(
        (post) => post._id
    );

    const { data, error } =
        await supabaseAdmin
            .from("post_views")
            .select("post_id, views")
            .in("post_id", postIds);

    if (error) {
        console.error(
            "Failed to fetch post views:",
            {
                message: error.message,
                details: error.details,
                hint: error.hint,
                code: error.code,
            }
        );

        return posts.map((post) => ({
            ...post,
            views: 0,
        }));
    }

    const viewsMap = new Map<
        string,
        number
    >(
        (data ?? []).map((item) => [
            item.post_id,
            Number(item.views ?? 0),
        ])
    );

    return posts.map((post) => ({
        ...post,
        views:
            viewsMap.get(post._id) ?? 0,
    }));
}

/**
 * Attach comment counts to posts.
 *
 * Only non-deleted comments are counted.
 */
export async function attachComments(
    posts: Post[]
): Promise<Post[]> {
    if (!posts.length) {
        return [];
    }

    const postIds = posts.map(
        (post) => post._id
    );

    const {
        data: comments,
        error,
    } = await supabaseAdmin
        .from("comments")
        .select("post_id")
        .in("post_id", postIds)
        .eq("is_deleted", false);

    if (error) {
        console.error(
            "Failed to fetch comment counts:",
            {
                message: error.message,
                details: error.details,
                hint: error.hint,
                code: error.code,
            }
        );

        return posts.map((post) => ({
            ...post,
            comments: 0,
        }));
    }

    const commentMap = new Map<
        string,
        number
    >();

    for (const comment of comments ?? []) {
        commentMap.set(
            comment.post_id,
            (commentMap.get(
                comment.post_id
            ) ?? 0) + 1
        );
    }

    return posts.map((post) => ({
        ...post,
        comments:
            commentMap.get(post._id) ?? 0,
    }));
}

/**
 * Attach both views and comments.
 */
export async function attachPostStats(
    posts: Post[]
): Promise<Post[]> {
    if (!posts.length) {
        return [];
    }

    const postsWithViews =
        await attachViews(posts);

    return attachComments(
        postsWithViews
    );
}

/**
 * Get all posts.
 */
export async function getAllPosts(): Promise<
    Post[]
> {
    const posts = await client.fetch(
        allPostsQuery
    );

    return attachPostStats(posts);
}

/**
 * Get featured posts.
 */
export async function getFeaturedPosts(): Promise<
    Post[]
> {
    const posts = await client.fetch(
        featuredPostsQuery
    );

    return attachPostStats(posts);
}

/**
 * Get a single post by slug.
 */
export async function getPostBySlug(
    slug: string
): Promise<Post | null> {
    const post = await client.fetch(
        postBySlugQuery,
        {
            slug,
        }
    );

    if (!post) {
        return null;
    }

    const [views, comments] =
        await Promise.all([
            getPostViews(post._id),
            getPostCommentCount(
                post._id
            ),
        ]);

    return {
        ...post,
        views,
        comments,
    };
}

/**
 * Get latest posts.
 */
export async function getLatestPosts(): Promise<
    Post[]
> {
    const posts = await client.fetch(
        latestPostsQuery
    );

    return attachPostStats(posts);
}

/**
 * Get the most popular posts.
 *
 * Popularity rules:
 *
 * 1 comment = 5 views
 *
 * Therefore:
 *
 * popularity score =
 * comments * 5 + views
 *
 * If two posts have the same score:
 * newer post comes first.
 *
 * Ranking is calculated across ALL posts.
 *
 * Only the top 20 are returned.
 */
export async function getPopularPosts(): Promise<
    Post[]
> {
    /*
     * IMPORTANT:
     *
     * Fetch ALL posts first.
     *
     * We do NOT use latestPostsQuery here,
     * because that would only give us 5 posts.
     */
    const posts = await client.fetch(
        allPostsQuery
    );

    if (!posts.length) {
        return [];
    }

    /*
     * Fetch views and comments for
     * EVERY post.
     */
    const postsWithStats =
        await attachPostStats(posts);

    /*
     * Calculate popularity score.
     *
     * 1 comment = 5 views.
     */
    const scoredPosts =
        postsWithStats.map((post) => {
            const views =
                Number(
                    post.views ?? 0
                );

            const comments =
                Number(
                    post.comments ?? 0
                );

            const popularityScore =
                views +
                comments * 5;

            return {
                ...post,
                popularityScore,
            };
        });

    /*
     * Sort by:
     *
     * 1. Highest popularity score
     * 2. Newest post if scores are equal
     */
    scoredPosts.sort(
        (a, b) => {
            const scoreDifference =
                b.popularityScore -
                a.popularityScore;

            if (
                scoreDifference !== 0
            ) {
                return scoreDifference;
            }

            return (
                new Date(
                    b.publishedAt
                ).getTime() -
                new Date(
                    a.publishedAt
                ).getTime()
            );
        }
    );

    /*
     * Return top 20.
     *
     * Keep comments and views because
     * PostCard needs them.
     */
    return scoredPosts
        .slice(0, 20)
        .map(
            ({
                popularityScore,
                ...post
            }) => post
        );
}

/**
 * Get posts by category.
 */
export async function getPostsByCategory(
    slug: string
): Promise<Post[]> {
    const posts = await client.fetch(
        postsByCategoryQuery,
        {
            slug,
        }
    );

    return attachPostStats(posts);
}

/**
 * Get total views for a post.
 */
export async function getPostViews(
    postId: string
): Promise<number> {
    const {
        data,
        error,
    } = await supabaseAdmin.rpc(
        "get_post_views",
        {
            post_id_input: postId,
        }
    );

    if (error) {
        console.error(
            "Get views error:",
            error
        );

        return 0;
    }

    return Number(data ?? 0);
}

/**
 * Get total live comments for a post.
 */
export async function getPostCommentCount(
    postId: string
): Promise<number> {
    const {
        count,
        error,
    } = await supabaseAdmin
        .from("comments")
        .select("*", {
            count: "exact",
            head: true,
        })
        .eq("post_id", postId)
        .eq("is_deleted", false);

    if (error) {
        console.error(
            "Get comment count error:",
            {
                message: error.message,
                details: error.details,
                hint: error.hint,
                code: error.code,
            }
        );

        return 0;
    }

    return count ?? 0;
}