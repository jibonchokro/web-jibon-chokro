import { client } from "@/sanity/lib/client";

import {
    categoriesQuery,
    categoryBySlugQuery,
} from "@/sanity/queries/category";

import type { Category } from "@/types/category";


export async function getAllCategories(): Promise<Category[]> {
    return client.fetch(categoriesQuery);
}


export async function getCategoryBySlug(
    slug: string
): Promise<Category | null> {
    return client.fetch(categoryBySlugQuery, {
        slug,
    });
}