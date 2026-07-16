import Image from "next/image";
import Link from "next/link";

import { urlFor } from "@/sanity/lib/image";
import type { Post } from "@/types/post";

interface PostCardProps {
    post: Post;
}

export default function PostCard({ post }: PostCardProps) {
    const imageUrl = post.coverImage
        ? urlFor(post.coverImage).width(800).height(450).url()
        : "/images/placeholder.jpg";

    return (
        <article className="overflow-hidden rounded-2xl border border-gray-200 bg-white transition-shadow duration-300 hover:shadow-md">
            <Link href={`/posts/${post.slug.current}`}>
                <div className="relative aspect-[16/9] overflow-hidden bg-gray-100">
                    <Image
                        src={imageUrl}
                        alt={post.title}
                        fill
                        className="object-cover transition duration-500 hover:scale-105"
                        sizes="(max-width:768px) 100vw, (max-width:1200px) 50vw, 33vw"
                    />
                </div>
            </Link>

            <div className="p-6">
                <Link
                    href={`/category/${post.category.slug.current}`}
                    className="text-sm font-medium text-green-700"
                >
                    {post.category.title}
                </Link>

                <Link href={`/posts/${post.slug.current}`}>
                    <h3 className="mt-3 text-[17px] font-semibold leading-snug transition hover:text-green-700">
                        {post.title}
                    </h3>
                </Link>

                <p className="mt-3 line-clamp-3 text-[14px] text-gray-600">
                    {post.excerpt}
                </p>

                <div className="mt-3 flex items-center justify-between text-[10px] font-semibold text-gray-400">
                    <span>
                        {post.readingTime
                            ? `${post.readingTime} মিনিট পড়া`
                            : "—"}
                    </span>

                    <span>
                        {new Date(post.publishedAt).toLocaleDateString(
                            "bn-BD",
                            {
                                day: "numeric",
                                month: "long",
                                year: "numeric",
                            }
                        )}
                    </span>
                </div>
            </div>
        </article>
    );
}