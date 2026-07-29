import { NextResponse } from "next/server";

import { searchPosts } from "@/services/search.service";


const POSTS_PER_LOAD = 16;


export async function GET(
    req: Request
) {

    try {

        const {
            searchParams,
        } = new URL(req.url);


        const q =
            searchParams.get("q")?.trim() ?? "";


        const page =
            Number(
                searchParams.get("page") ?? "1"
            );


        if (!q) {

            return NextResponse.json({
                posts: [],
            });

        }


        const posts =
            await searchPosts(
                q,
                {
                    page,
                    limit: POSTS_PER_LOAD,
                }
            );


        return NextResponse.json({
            posts,
        });


    } catch (error) {

        console.error(
            "Search API error:",
            error
        );


        return NextResponse.json(
            {
                posts: [],
                error: "Failed to search posts",
            },
            {
                status: 500,
            }
        );

    }

}