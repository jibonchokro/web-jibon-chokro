import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    try {
        const supabase = await createClient();

        const {
            data: { user },
        } = await supabase.auth.getUser();

        if (!user) {
            return NextResponse.json(
                {
                    authenticated: false,
                    bookmarks: [],
                },
                { status: 200 }
            );
        }

        const postId = new URL(request.url).searchParams.get("postId");

        // Check bookmark status for a single post
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

        // Get all bookmarked post ids
        const { data, error } = await supabase
            .from("bookmarks")
            .select("post_id")
            .eq("user_id", user.id)
            .order("created_at", { ascending: false });

        if (error) {
            throw error;
        }

        return NextResponse.json({
            authenticated: true,
            bookmarks: data.map((item) => item.post_id),
        });
    } catch (error) {
        console.error("Bookmarks API Error:", error);

        return NextResponse.json(
            {
                authenticated: false,
                bookmarks: [],
            },
            { status: 500 }
        );
    }
}

export async function POST(request: Request) {
    try {
        const supabase = await createClient();

        const {
            data: { user },
        } = await supabase.auth.getUser();

        if (!user) {
            return NextResponse.json(
                {
                    success: false,
                    error: "Unauthorized",
                },
                { status: 401 }
            );
        }

        const { postId } = await request.json();

        if (!postId) {
            return NextResponse.json(
                {
                    success: false,
                    error: "postId is required",
                },
                { status: 400 }
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
        console.error("Bookmarks API Error:", error);

        return NextResponse.json(
            {
                success: false,
                error: "Internal Server Error",
            },
            { status: 500 }
        );
    }
}

export async function DELETE(request: Request) {
    try {
        const supabase = await createClient();

        const {
            data: { user },
        } = await supabase.auth.getUser();

        if (!user) {
            return NextResponse.json(
                {
                    success: false,
                    error: "Unauthorized",
                },
                { status: 401 }
            );
        }

        const { postId } = await request.json();

        if (!postId) {
            return NextResponse.json(
                {
                    success: false,
                    error: "postId is required",
                },
                { status: 400 }
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
        console.error("Bookmarks API Error:", error);

        return NextResponse.json(
            {
                success: false,
                error: "Internal Server Error",
            },
            { status: 500 }
        );
    }
}