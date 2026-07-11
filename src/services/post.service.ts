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


export async function getAllPosts(): Promise<Post[]> {
    return client.fetch(allPostsQuery);
}


export async function getFeaturedPosts(): Promise<Post[]> {
    return client.fetch(featuredPostsQuery);
}


export async function getPostBySlug(
    slug: string
): Promise<Post | null> {
    return client.fetch(postBySlugQuery, {
        slug,
    });
}


export async function getLatestPosts(): Promise<Post[]> {
    return client.fetch(latestPostsQuery);
}


export async function getPopularPosts(): Promise<Post[]> {
    return client.fetch(popularPostsQuery);
}


export async function getPostsByCategory(
    slug: string
): Promise<Post[]> {
    return client.fetch(postsByCategoryQuery, {
        slug,
    });
}