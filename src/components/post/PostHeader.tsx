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
                className="text-sm font-semibold text-primary transition-colors hover:text-primary/80"
            >
                {post.category.title}
            </Link>

            <h1 className="mt-3 text-4xl font-bold leading-tight tracking-tight text-foreground">
                {post.title}
            </h1>

            <div className="mt-5 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                <span>
                    {new Date(
                        post.publishedAt
                    ).toLocaleDateString("bn-BD")}
                </span>

                <span aria-hidden="true">•</span>

                <span>
                    {post.readingTime} মিনিট পড়া
                </span>
            </div>
        </header>
    );
}