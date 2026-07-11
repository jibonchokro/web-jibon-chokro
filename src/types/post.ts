import type { Category } from "./category";

export interface Post {
    _id: string;

    title: string;

    slug: {
        current: string;
    };

    excerpt: string;

    content: any[];

    coverImage: any;

    category: Category;

    tags: string[];

    featured: boolean;

    readingTime: number;

    publishedAt: string;
}