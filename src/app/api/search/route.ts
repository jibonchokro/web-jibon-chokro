import { NextResponse } from "next/server";

import {
    searchPosts,
    type SearchSort,
} from "@/services/search.service";

const POSTS_PER_LOAD = 16;

const VALID_SORTS: SearchSort[] = [
    "latest",
    "oldest",
    "title",
    "popular",
];

function parseSort(value: string | null): SearchSort {
    if (
        value &&
        (VALID_SORTS as string[]).includes(value)
    ) {
        return value as SearchSort;
    }

    return "latest";
}

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


        const sort = parseSort(
            searchParams.get("sort")
        );


        const categorySlug =
            searchParams.get("category")?.trim() ||
            undefined;


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
                    sort,
                    categorySlug,
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