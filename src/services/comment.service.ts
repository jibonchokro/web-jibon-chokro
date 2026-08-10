import { createClient } from "@/lib/supabase/server";

import type { Comment } from "@/types/comment";

export async function getComments(
    postId: string
): Promise<Comment[]> {
    const supabase = await createClient();

    // Soft-deleted comments are intentionally included — see the note
    // in app/api/comments/route.ts. Excluding them here would orphan
    // any live replies still attached to a deleted parent.
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