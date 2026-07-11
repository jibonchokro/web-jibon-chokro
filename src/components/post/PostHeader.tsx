import Link from "next/link";

import type { Post } from "@/types/post";

interface Props {
    post: Post;
}

export default function PostHeader({ post }: Props) {
    return (
        <header className="mb-10">
            <Link
                href={`/category/${post.category.slug.current}`}
                className="text-sm font-semibold text-green-700"
            >
                {post.category.title}
            </Link>

            <h1 className="mt-3 text-4xl font-bold leading-tight">
                {post.title}
            </h1>

            <div className="mt-5 flex flex-wrap gap-4 text-sm text-gray-500">
                <span>
                    {new Date(post.publishedAt).toLocaleDateString("bn-BD")}
                </span>

                <span>•</span>

                <span>{post.readingTime} মিনিট পড়া</span>
            </div>
        </header>
    );
}