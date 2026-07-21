import Image from "next/image";
import Link from "next/link";

import { urlFor } from "@/sanity/lib/image";
import type { Post } from "@/types/post";

interface PostCardProps {
    post: Post;
}

export default function PostCard({
    post,
}: PostCardProps) {
    const imageUrl = post.coverImage
        ? urlFor(post.coverImage)
            .width(800)
            .height(450)
            .url()
        : "/images/placeholder.jpg";

    return (
        <article className="group overflow-hidden rounded-2xl border border-black/10 bg-white shadow-xs transition-all hover:-translate-y-0.5 hover:shadow-sm">

            {/* Cover */}

            <Link href={`/posts/${post.slug.current}`}>

                <div className="relative aspect-[16/9] overflow-hidden bg-muted">

                    <Image
                        src={imageUrl}
                        alt={post.title}
                        fill
                        sizes="(max-width:768px) 100vw, (max-width:1200px) 50vw, 33vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />

                </div>

            </Link>

            {/* Content */}

            <div className="space-y-3 p-4">

                {/* Category */}

                <Link
                    href={`/category/${post.category.slug.current}`}
                    className="inline-flex rounded-full border border-black/10 bg-muted/50 px-2.5 py-1 text-[11px] font-medium text-muted-foreground transition hover:bg-muted hover:text-foreground"
                >
                    {post.category.title}
                </Link>

                {/* Title */}

                <Link href={`/posts/${post.slug.current}`}>

                    <h3 className="truncate text-base font-semibold text-foreground transition-colors group-hover:text-primary">
                        {post.title}
                    </h3>

                </Link>

                {/* Excerpt */}

                <p className="line-clamp-2 text-sm leading-6 text-muted-foreground">
                    {post.excerpt}
                </p>

                {/* Footer */}

                <div className="flex items-center justify-between border-t border-black/10 pt-3 text-xs text-muted-foreground">

                    <span className="truncate">
                        {post.readingTime
                            ? `${post.readingTime} মিনিট`
                            : "—"}
                    </span>

                    <span className="shrink-0">
                        {new Date(post.publishedAt).toLocaleDateString(
                            "bn-BD",
                            {
                                day: "numeric",
                                month: "short",
                                year: "numeric",
                            }
                        )}
                    </span>

                </div>

            </div>

        </article>
    );
}