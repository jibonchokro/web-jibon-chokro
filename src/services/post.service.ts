import { supabaseAdmin } from "@/lib/supabase/admin";
import { client } from "@/sanity/lib/client";

import {
    allPostsQuery,
    featuredPostsQuery,
    latestPostsQuery,
    popularPostsQuery,
    postBySlugQuery,
    postsByCategoryQuery,
} from "@/sanity/queries/post";

import type { Post } from "@/types/post";


async function attachViews(
    posts: Post[]
): Promise<Post[]> {

    if (!posts.length) {
        return [];
    }


    const postIds = posts.map(
        (post) => post._id
    );


    const { data, error } = await supabaseAdmin
        .from("post_views")
        .select("post_id, views")
        .in("post_id", postIds);


    if (error) {
        console.error(
            "Failed to fetch post views:",
            error
        );

        return posts.map((post) => ({
            ...post,
            views: 0,
        }));
    }


    const viewsMap = new Map(
        data.map((item) => [
            item.post_id,
            item.views,
        ])
    );


    return posts.map((post) => ({
        ...post,
        views:
            viewsMap.get(post._id) ?? 0,
    }));
}



export async function getAllPosts(): Promise<Post[]> {

    const posts = await client.fetch(
        allPostsQuery
    );

    return attachViews(posts);
}



export async function getFeaturedPosts(): Promise<Post[]> {

    const posts = await client.fetch(
        featuredPostsQuery
    );

    return attachViews(posts);
}



export async function getPostBySlug(
    slug: string
): Promise<Post | null> {

    const post = await client.fetch(
        postBySlugQuery,
        {
            slug,
        }
    );


    if (!post) {
        return null;
    }


    const views = await getPostViews(
        post._id
    );


    return {
        ...post,
        views,
    };
}



export async function getLatestPosts(): Promise<Post[]> {

    const posts = await client.fetch(
        latestPostsQuery
    );


    return attachViews(posts);
}



export async function getPopularPosts(): Promise<Post[]> {

    const posts = await client.fetch(
        popularPostsQuery
    );


    return attachViews(posts);
}



export async function getPostsByCategory(
    slug: string
): Promise<Post[]> {

    const posts = await client.fetch(
        postsByCategoryQuery,
        {
            slug,
        }
    );


    return attachViews(posts);
}



export async function getPostViews(
    postId: string
): Promise<number> {

    const { data, error } =
        await supabaseAdmin.rpc(
            "get_post_views",
            {
                post_id_input: postId,
            }
        );


    if (error) {
        console.error(
            "Get views error:",
            error
        );

        return 0;
    }


    return data ?? 0;
}