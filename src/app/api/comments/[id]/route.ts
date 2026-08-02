import { NextRequest, NextResponse } from "next/server";

import { createClient } from "@/lib/supabase/server";

interface RouteContext {
    params: Promise<{
        id: string;
    }>;
}

/**
 * DELETE /api/comments/:id
 */
export async function DELETE(
    request: NextRequest,
    { params }: RouteContext
) {
    const { id } = await params;

    const supabase = await createClient();

    const {
        data: { user },
        error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
        return NextResponse.json(
            {
                error: "Unauthorized",
            },
            {
                status: 401,
            }
        );
    }

    const { data: comment, error: commentError } =
        await supabase
            .from("comments")
            .select("id,user_id")
            .eq("id", id)
            .single();

    if (commentError || !comment) {
        return NextResponse.json(
            {
                error: "Comment not found.",
            },
            {
                status: 404,
            }
        );
    }

    if (comment.user_id !== user.id) {
        return NextResponse.json(
            {
                error: "Forbidden",
            },
            {
                status: 403,
            }
        );
    }

    const { error } = await supabase
        .from("comments")
        .update({
            is_deleted: true,
            content: "[deleted]",
            updated_at: new Date().toISOString(),
        })
        .eq("id", id);

    if (error) {
        console.error(error);

        return NextResponse.json(
            {
                error: "Failed to delete comment.",
            },
            {
                status: 500,
            }
        );
    }

    return NextResponse.json({
        success: true,
    });
}

/**
 * PATCH /api/comments/:id
 */
export async function PATCH(
    request: NextRequest,
    { params }: RouteContext
) {
    const { id } = await params;

    const { content } = await request.json();

    if (
        typeof content !== "string" ||
        !content.trim()
    ) {
        return NextResponse.json(
            {
                error: "Content is required.",
            },
            {
                status: 400,
            }
        );
    }

    const supabase = await createClient();

    const {
        data: { user },
        error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
        return NextResponse.json(
            {
                error: "Unauthorized",
            },
            {
                status: 401,
            }
        );
    }

    const { data: comment, error: commentError } =
        await supabase
            .from("comments")
            .select("id,user_id")
            .eq("id", id)
            .single();

    if (commentError || !comment) {
        return NextResponse.json(
            {
                error: "Comment not found.",
            },
            {
                status: 404,
            }
        );
    }

    if (comment.user_id !== user.id) {
        return NextResponse.json(
            {
                error: "Forbidden",
            },
            {
                status: 403,
            }
        );
    }

    const { error } = await supabase
        .from("comments")
        .update({
            content: content.trim(),
            is_edited: true,
            updated_at: new Date().toISOString(),
        })
        .eq("id", id);

    if (error) {
        console.error(error);

        return NextResponse.json(
            {
                error: "Failed to update comment.",
            },
            {
                status: 500,
            }
        );
    }

    return NextResponse.json({
        success: true,
    });
}