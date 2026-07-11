import { NextResponse } from "next/server";

import { searchPosts } from "@/services/search.service";

export async function GET(req: Request) {

    const { searchParams } = new URL(req.url);

    const q = searchParams.get("q") ?? "";

    const posts = await searchPosts(q);

    return NextResponse.json(posts);

}