import { supabaseAdmin } from "@/lib/supabase/admin";
import { randomUUID } from "crypto";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
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

        const cookieStore = await cookies();

        let visitorId = cookieStore.get("visitor_id")?.value;

        if (!visitorId) {
            visitorId = randomUUID();

            cookieStore.set("visitor_id", visitorId, {
                httpOnly: true,
                sameSite: "lax",
                secure: process.env.NODE_ENV === "production",
                maxAge: 60 * 60 * 24 * 365, // 1 year
                path: "/",
            });
        }

        const { data, error } = await supabaseAdmin.rpc(
            "increment_post_view",
            {
                post_id_input: postId,
                visitor_id_input: visitorId,
            }
        );

        if (error) {
            throw error;
        }

        return NextResponse.json({
            success: true,
            views: data ?? 0,
        });
    } catch (error) {
        console.error("View API Error:", error);

        return NextResponse.json(
            {
                success: false,
                error: "Internal Server Error",
            },
            { status: 500 }
        );
    }
}

export async function GET(request: NextRequest) {
    try {
        const postId = request.nextUrl.searchParams.get("postId");

        if (!postId) {
            return NextResponse.json(
                {
                    views: 0,
                    error: "postId is required",
                },
                { status: 400 }
            );
        }

        const { data, error } = await supabaseAdmin.rpc(
            "get_post_views",
            {
                post_id_input: postId,
            }
        );

        if (error) {
            throw error;
        }

        return NextResponse.json({
            views: data ?? 0,
        });
    } catch (error) {
        console.error("View API Error:", error);

        return NextResponse.json(
            {
                views: 0,
                error: "Internal Server Error",
            },
            { status: 500 }
        );
    }
}