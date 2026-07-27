import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    try {
        const supabase = await createClient();

        const {
            data: { user },
            error: authError,
        } = await supabase.auth.getUser();

        if (authError) {
            throw authError;
        }

        if (!user) {
            return NextResponse.json({
                authenticated: false,
                bookmarks: [],
            });
        }

        const postId = new URL(request.url).searchParams.get("postId");

        // Check a single bookmark
        if (postId) {
            const { data, error } = await supabase
                .from("bookmarks")
                .select("id")
                .eq("user_id", user.id)
                .eq("post_id", postId)
                .maybeSingle();

            if (error) {
                throw error;
            }

            return NextResponse.json({
                authenticated: true,
                bookmarked: !!data,
            });
        }

        // Get all bookmarks
        const { data, error } = await supabase
            .from("bookmarks")
            .select("post_id")
            .eq("user_id", user.id)
            .order("created_at", {
                ascending: false,
            });

        if (error) {
            throw error;
        }

        return NextResponse.json({
            authenticated: true,
            bookmarks: data?.map((item) => item.post_id) ?? [],
        });
    } catch (error) {
        console.error("GET /api/bookmarks", error);

        return NextResponse.json(
            {
                authenticated: false,
                bookmarks: [],
                error:
                    error instanceof Error
                        ? error.message
                        : String(error),
            },
            {
                status: 500,
            }
        );
    }
}

export async function POST(request: Request) {
    try {
        const supabase = await createClient();

        const {
            data: { user },
            error: authError,
        } = await supabase.auth.getUser();

        if (authError) {
            throw authError;
        }

        if (!user) {
            return NextResponse.json(
                {
                    success: false,
                    error: "Unauthorized",
                },
                {
                    status: 401,
                }
            );
        }

        const { postId } = await request.json();

        if (!postId) {
            return NextResponse.json(
                {
                    success: false,
                    error: "postId is required",
                },
                {
                    status: 400,
                }
            );
        }

        const { error } = await supabase
            .from("bookmarks")
            .insert({
                user_id: user.id,
                post_id: postId,
            });

        if (error) {
            // Already bookmarked
            if (error.code === "23505") {
                return NextResponse.json({
                    success: true,
                    bookmarked: true,
                });
            }

            throw error;
        }

        return NextResponse.json({
            success: true,
            bookmarked: true,
        });
    } catch (error) {
        console.error("POST /api/bookmarks", error);

        return NextResponse.json(
            {
                success: false,
                error:
                    error instanceof Error
                        ? error.message
                        : String(error),
            },
            {
                status: 500,
            }
        );
    }
}

export async function DELETE(request: Request) {
    try {
        const supabase = await createClient();

        const {
            data: { user },
            error: authError,
        } = await supabase.auth.getUser();

        if (authError) {
            throw authError;
        }

        if (!user) {
            return NextResponse.json(
                {
                    success: false,
                    error: "Unauthorized",
                },
                {
                    status: 401,
                }
            );
        }

        const { postId } = await request.json();

        if (!postId) {
            return NextResponse.json(
                {
                    success: false,
                    error: "postId is required",
                },
                {
                    status: 400,
                }
            );
        }

        const { error } = await supabase
            .from("bookmarks")
            .delete()
            .eq("user_id", user.id)
            .eq("post_id", postId);

        if (error) {
            throw error;
        }

        return NextResponse.json({
            success: true,
            bookmarked: false,
        });
    } catch (error) {
        console.error("DELETE /api/bookmarks", error);

        return NextResponse.json(
            {
                success: false,
                error:
                    error instanceof Error
                        ? error.message
                        : String(error),
            },
            {
                status: 500,
            }
        );
    }
}