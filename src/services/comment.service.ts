import { createClient } from "@/lib/supabase/server";

import { client } from "@/sanity/lib/client";

import type { Comment } from "@/types/comment";

export async function getComments(
    postId: string
): Promise<Comment[]> {
    const supabase = await createClient();

    // Deletion cascades through a comment's whole reply subtree (see
    // DELETE /api/comments/[id]), so nothing here needs an is_deleted
    // filter — every row returned is live.
    const { data, error } = await supabase
        .from("comments")
        .select("*")
        .eq("post_id", postId)
        .order("created_at", {
            ascending: true,
        });

    if (error) {
        console.error(
            "Error fetching comments:",
            error
        );

        return [];
    }

    return data;
}

export async function getCommentCount(
    postId: string
): Promise<number> {
    const supabase = await createClient();

    const { count, error } = await supabase
        .from("comments")
        .select("*", {
            count: "exact",
            head: true,
        })
        .eq("post_id", postId)
        .eq("is_deleted", false);

    if (error) {
        console.error(
            "Error counting comments:",
            error
        );

        return 0;
    }

    return count ?? 0;
}

export async function getCurrentUser() {
    const supabase = await createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    return user;
}

export interface MyComment extends Comment {
    post: {
        title: string;
        slug: string;
    } | null;
}

interface GetMyCommentsOptions {
    page?: number;
    pageSize?: number;
    search?: string;
}

interface GetMyCommentsResult {
    comments: MyComment[];
    total: number;
}

/**
 * Get the current user's own comments (and replies), newest first,
 * paginated and optionally filtered by a text search on the content.
 *
 * Comments live in Supabase but posts live in Sanity, so this fetches
 * the comment rows first, then looks up the referenced posts'
 * title/slug in a single follow-up Sanity query — same "attach"
 * pattern post.service.ts uses for views/comments on posts, just
 * mirrored the other direction (attaching post info to comments).
 */
export async function getMyComments(
    userId: string,
    {
        page = 1,
        pageSize = 10,
        search = "",
    }: GetMyCommentsOptions = {}
): Promise<GetMyCommentsResult> {
    const supabase = await createClient();

    const from = (page - 1) * pageSize;
    const to = from + pageSize - 1;

    let query = supabase
        .from("comments")
        .select("*", {
            count: "exact",
        })
        .eq("user_id", userId)
        .order("created_at", {
            ascending: false,
        })
        .range(from, to);

    const trimmedSearch = search.trim();

    if (trimmedSearch) {
        query = query.ilike(
            "content",
            `%${trimmedSearch}%`
        );
    }

    const { data, error, count } = await query;

    if (error) {
        console.error(
            "Error fetching my comments:",
            error
        );

        return {
            comments: [],
            total: 0,
        };
    }

    const comments = (data ?? []).map(
        (row): Comment => ({
            ...row,
            profiles: row.profiles ?? null,
        })
    );

    if (!comments.length) {
        return {
            comments: [],
            total: count ?? 0,
        };
    }

    const postIds = Array.from(
        new Set(
            comments.map((comment) => comment.post_id)
        )
    );

    const posts = await client.fetch<
        {
            _id: string;
            title: string;
            slug: {
                current: string;
            };
        }[]
    >(
        `*[_type == "post" && _id in $ids]{ _id, title, slug }`,
        {
            ids: postIds,
        }
    );

    const postMap = new Map(
        posts.map((post) => [
            post._id,
            {
                title: post.title,
                slug: post.slug.current,
            },
        ])
    );

    const commentsWithPost: MyComment[] = comments.map(
        (comment) => ({
            ...comment,
            post: postMap.get(comment.post_id) ?? null,
        })
    );

    return {
        comments: commentsWithPost,
        total: count ?? 0,
    };
}