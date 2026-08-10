import { NextRequest, NextResponse } from "next/server";

import { createClient } from "@/lib/supabase/server";

interface RouteContext {
    params: Promise<{
        id: string;
    }>;
}

/**
 * DELETE /api/comments/:id
 *
 * Allowed for:
 *  - the comment's own author, or
 *  - the author of the parent comment, when deleting a reply — a
 *    "parent owner" can moderate replies left on their own comment,
 *    the same way a post owner can moderate comments on their post.
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
            .select("id,user_id,parent_id")
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

    const isAuthor = comment.user_id === user.id;

    let isParentOwner = false;

    if (!isAuthor && comment.parent_id) {
        const { data: parentComment } = await supabase
            .from("comments")
            .select("user_id")
            .eq("id", comment.parent_id)
            .single();

        isParentOwner = parentComment?.user_id === user.id;
    }

    if (!isAuthor && !isParentOwner) {
        return NextResponse.json(
            {
                error: "Forbidden",
            },
            {
                status: 403,
            }
        );
    }

    // Comments can be replied to at any depth, and replies can have
    // their own replies. Deleting a comment needs to take its whole
    // subtree with it — otherwise a grandchild reply's parent_id would
    // point at a row that no longer exists. There's no DB-level cascade
    // set up, so we walk the tree ourselves, level by level, collecting
    // every descendant id, then delete the comment and all of them in
    // one go.
    const idsToDelete = [id];
    let frontier = [id];

    while (frontier.length > 0) {
        const { data: children, error: childrenError } =
            await supabase
                .from("comments")
                .select("id")
                .in("parent_id", frontier);

        if (childrenError) {
            console.error(childrenError);

            return NextResponse.json(
                {
                    error: "Failed to delete comment.",
                },
                {
                    status: 500,
                }
            );
        }

        if (!children || children.length === 0) {
            break;
        }

        frontier = children.map((child) => child.id);
        idsToDelete.push(...frontier);
    }

    const { error } = await supabase
        .from("comments")
        .delete()
        .in("id", idsToDelete);

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
 *
 * Only the comment's own author may edit its content — unlike delete,
 * this is never extended to a parent-comment owner.
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

    if (content.length > 5000) {
        return NextResponse.json(
            {
                error: "Comment is too long.",
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