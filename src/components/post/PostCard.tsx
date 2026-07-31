import Image from "next/image";
import Link from "next/link";

import {
    CalendarDays,
    Clock,
    Eye,
} from "lucide-react";

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


    const publishedDate = new Date(
        post.publishedAt
    ).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
    });


    const views = Number(post.views ?? 0);


    return (
        <article
            className="
                group
                flex
                h-full
                min-w-0
                flex-col
                overflow-hidden
                rounded-xl
                border
                border-black/10
                bg-white
                transition-all
                duration-300
                hover:-translate-y-0.5
                hover:shadow-sm
            "
        >

            {/* Cover */}

            <div className="relative">

                <Link
                    href={`/posts/${post.slug.current}`}
                    className="block"
                >
                    <div
                        className="
                            relative
                            aspect-[16/10]
                            overflow-hidden
                            bg-muted
                        "
                    >
                        <Image
                            src={imageUrl}
                            alt={post.title}
                            fill
                            sizes="
                                (max-width:640px)100vw,
                                (max-width:1024px)50vw,
                                33vw
                            "
                            className="
                                object-cover
                                transition-transform
                                duration-500
                                group-hover:scale-105
                            "
                        />
                    </div>
                </Link>


                {post.category && (
                    <div
                        className="
                            absolute
                            inset-x-0
                            top-0
                            p-2
                            sm:p-3
                        "
                    >

                        <Link
                            href={`/category/${post.category.slug.current}`}
                            className="
                                inline-flex
                                max-w-[70%]
                                truncate
                                rounded-full
                                border
                                border-white/20
                                bg-black/60
                                px-3
                                py-1
                                text-[10px]
                                font-medium
                                text-white
                                backdrop-blur-md
                                transition
                                hover:bg-black/40
                                sm:text-xs
                            "
                        >
                            {post.category.title}
                        </Link>

                    </div>
                )}

            </div>



            {/* Content */}

            <div
                className="
                    flex
                    flex-1
                    flex-col
                    p-3
                    sm:p-4
                "
            >

                <Link
                    href={`/posts/${post.slug.current}`}
                >

                    <h3
                        className="
                            line-clamp-2
                            text-lg
                            font-semibold
                            leading-snug
                            tracking-tight
                            text-foreground
                            transition-colors
                            group-hover:text-primary
                        "
                    >
                        {post.title}
                    </h3>

                </Link>


                {post.excerpt && (
                    <p
                        className="
                            mt-2
                            line-clamp-2
                            text-sm
                            leading-6
                            text-muted-foreground
                        "
                    >
                        {post.excerpt}
                    </p>
                )}



                {/* Footer */}

                <div className="mt-auto pt-3 -mx-3 sm:-mx-4">

                    <div
                        className="
                            flex
                            flex-wrap
                            items-center
                            gap-3
                            border-t
                            border-black/10
                            pt-3
                            pb-1
                            text-sm
                            text-muted-foreground
                        "
                    >

                        <div className="flex items-center gap-1.5 pl-3 sm:pl-4">
                            <CalendarDays className="size-3.5" />

                            <span>
                                {publishedDate}
                            </span>
                        </div>


                        {post.readingTime && (
                            <div className="flex items-center gap-1.5">

                                <Clock className="size-3.5" />

                                <span>
                                    {post.readingTime} min
                                </span>

                            </div>
                        )}



                        <div
                            className="
                                ml-auto
                                flex
                                items-center
                                gap-1.5
                                pr-3
                                sm:pr-4
                            "
                        >

                            <Eye className="size-3.5" />

                            <span>
                                {views.toLocaleString()}
                            </span>

                        </div>


                    </div>

                </div>

            </div>

        </article>
    );
}