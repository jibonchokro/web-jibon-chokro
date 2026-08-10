import { createClient } from "@/lib/supabase/server";

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