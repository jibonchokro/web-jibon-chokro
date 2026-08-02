import { NextRequest, NextResponse } from "next/server";

import { createClient } from "@/lib/supabase/server";

export async function GET(request: NextRequest) {
    try {
        const postId = request.nextUrl.searchParams.get("postId");

        if (!postId) {
            return NextResponse.json(
                {
                    error: "postId is required",
                },
                {
                    status: 400,
                }
            );
        }

        const supabase = await createClient();

        const { data, error } = await supabase
            .from("comments")
            .select(`
                *,
                profiles (
                    id,
                    name,
                    email,
                    avatar
                )
            `)
            .eq("post_id", postId)
            .eq("is_deleted", false)
            .order("created_at", {
                ascending: true,
            });

        if (error) {
            console.error(error);

            return NextResponse.json(
                {
                    error: error.message,
                },
                {
                    status: 500,
                }
            );
        }

        return NextResponse.json(data);
    } catch (error) {
        console.error(error);

        return NextResponse.json(
            {
                error: "Internal Server Error",
            },
            {
                status: 500,
            }
        );
    }
}

export async function POST(request: NextRequest) {
    try {
        const supabase = await createClient();

        const {
            data: { user },
        } = await supabase.auth.getUser();

        if (!user) {
            return NextResponse.json(
                {
                    error: "Unauthorized",
                },
                {
                    status: 401,
                }
            );
        }

        const body = await request.json();

        const {
            postId,
            content,
            parentId,
        }: {
            postId: string;
            content: string;
            parentId?: string | null;
        } = body;

        if (!postId) {
            return NextResponse.json(
                {
                    error: "postId is required",
                },
                {
                    status: 400,
                }
            );
        }

        if (!content || !content.trim()) {
            return NextResponse.json(
                {
                    error: "Comment cannot be empty",
                },
                {
                    status: 400,
                }
            );
        }

        if (content.length > 5000) {
            return NextResponse.json(
                {
                    error: "Comment is too long",
                },
                {
                    status: 400,
                }
            );
        }

        const { data, error } = await supabase
            .from("comments")
            .insert({
                post_id: postId,
                user_id: user.id,
                parent_id: parentId ?? null,
                content: content.trim(),
            })
            .select(`
                *,
                profiles (
                    id,
                    name,
                    email,
                    avatar
                )
            `)
            .single();

        if (error) {
            console.error(error);

            return NextResponse.json(
                {
                    error: error.message,
                },
                {
                    status: 500,
                }
            );
        }

        return NextResponse.json(data, {
            status: 201,
        });
    } catch (error) {
        console.error(error);

        return NextResponse.json(
            {
                error: "Internal Server Error",
            },
            {
                status: 500,
            }
        );
    }
}