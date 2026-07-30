import { PortableText } from "@portabletext/react";
import { CalendarDays, ChevronRight, Clock, FolderOpen } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import BookmarkButton from "@/components/post/BookmarkButton";
import { portableTextComponents } from "@/components/post/PortableTextComponents";
import PostViews from "@/components/post/PostViews";
import ShareButtons from "@/components/post/ShareButtons";
import SinglePostSidebar from "@/components/post/SinglePostSidebar";

import { urlFor } from "@/sanity/lib/image";

import { isBookmarked } from "@/services/bookmark.service";
import { getAllCategories } from "@/services/category.service";
import {
    getLatestPosts,
    getPopularPosts,
    getPostBySlug,
    getPostViews,
} from "@/services/post.service";

interface Props {
    params: Promise<{
        slug: string;
    }>;
}

export async function generateMetadata({
    params,
}: Props): Promise<Metadata> {
    const { slug } = await params;

    const post = await getPostBySlug(slug);

    if (!post) {
        return {
            title: "Post Not Found",
        };
    }

    return {
        title: post.title,
        description: post.excerpt,
        openGraph: {
            title: post.title,
            description: post.excerpt,
            images: post.coverImage
                ? [
                    urlFor(post.coverImage)
                        .width(1200)
                        .height(630)
                        .url(),
                ]
                : [],
        },
    };
}

export default async function SinglePostPage({
    params,
}: Props) {
    const { slug } = await params;

    const post = await getPostBySlug(slug);

    if (!post) {
        notFound();
    }

    const [
        latestPosts,
        popularPosts,
        categories,
        initialViews,
        initialBookmarked,
    ] = await Promise.all([
        getLatestPosts(),
        getPopularPosts(),
        getAllCategories(),
        getPostViews(post._id),
        isBookmarked(post._id),
    ]);

    const publishedDate = new Date(post.publishedAt).toLocaleDateString(
        "en-GB",
        {
            year: "numeric",
            month: "long",
            day: "numeric",
        }
    );

    const siteUrl =
        process.env.NEXT_PUBLIC_SITE_URL ??
        "https://jibonchokro.com";

    const postUrl = `${siteUrl}/posts/${post.slug.current}`;

    return (
        <main className="mx-auto max-w-[1158px] px-3 py-4 sm:px-4 sm:py-6 lg:px-4 lg:py-8">
            <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_320px] lg:gap-8">
                <article className="min-w-0 h-fit rounded-xl border border-black/10 bg-white px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
                    <nav
                        aria-label="Breadcrumb"
                        className="mb-5 overflow-hidden sm:mb-6"
                    >
                        <ol className="flex items-center gap-1.5 overflow-hidden whitespace-nowrap text-xs text-muted-foreground sm:gap-2 sm:text-sm">
                            <li className="shrink-0">
                                <Link
                                    href="/"
                                    className="transition-colors hover:text-foreground"
                                >
                                    হোম
                                </Link>
                            </li>

                            <ChevronRight size={14} className="shrink-0" />

                            <li className="shrink-0">
                                <Link
                                    href="/posts"
                                    className="transition-colors hover:text-foreground"
                                >
                                    সকল লেখা
                                </Link>
                            </li>

                            {post.category && (
                                <>
                                    <ChevronRight size={14} className="shrink-0" />

                                    <li className="shrink-0">
                                        <Link
                                            href={`/category/${post.category.slug.current}`}
                                            className="transition-colors hover:text-foreground"
                                        >
                                            {post.category.title}
                                        </Link>
                                    </li>
                                </>
                            )}

                            <ChevronRight size={14} className="shrink-0" />

                            <li className="min-w-0 flex-1 truncate font-medium text-foreground">
                                {post.title}
                            </li>
                        </ol>
                    </nav>

                    <header>
                        {/* Category */}

                        {post.category && (
                            <Link
                                href={`/category/${post.category.slug.current}`}
                                className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-muted px-3 py-1.5 text-xs font-medium transition hover:bg-accent sm:px-4 sm:py-2 sm:text-sm"
                            >
                                <FolderOpen size={15} />

                                {post.category.title}
                            </Link>
                        )}

                        <div className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-muted ml-3 px-3 py-1.5 text-xs font-medium transition hover:bg-accent sm:px-4 sm:py-2 sm:text-sm">
                            <CalendarDays size={16} />
                            <span>{publishedDate}</span>
                        </div>

                        {/* Title */}

                        <h1 className="mt-4 text-2xl font-bold leading-tight tracking-tight text-foreground sm:mt-5 sm:text-3xl lg:text-4xl">
                            {post.title}
                        </h1>

                        {/* Action Bar */}

                        <div className="mt-6 border-y border-black/10 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8">

                            <div className="flex items-center justify-between py-3">

                                {/* Left */}

                                <div className="flex items-center">

                                    <div
                                        className="
                                            inline-flex
                                            h-[35px]
                                            items-center
                                            gap-2
                                            rounded-lg
                                            bg-muted
                                            px-2.5
                                            text-[16px]
                                            sm:text-[18px]
                                            font-base
                                            text-muted-foreground
                                        "
                                    >
                                        <Clock
                                            size={18}
                                            className="shrink-0"
                                        />

                                        <span>{post.readingTime} min</span>
                                    </div>

                                </div>

                                {/* Right */}

                                <div className="flex items-center justify-center gap-3">

                                    <div
                                        className="
                                        inline-flex
                                        h-[35px]
                                        items-center
                                        gap-2
                                        rounded-lg
                                        bg-muted
                                        px-2.5
                                        text-muted-foreground
                                    "
                                    >
                                        <PostViews
                                            postId={post._id}
                                            initialViews={initialViews}
                                        />
                                    </div>

                                    <div
                                        className="
                                            flex
                                            h-[35px]
                                            w-[35px]
                                            items-center
                                            justify-center
                                            rounded-lg
                                            bg-muted
                                            px-1
                                        "
                                    >
                                        <BookmarkButton
                                            postId={post._id}
                                            initialBookmarked={initialBookmarked}
                                        />
                                    </div>

                                    <ShareButtons
                                        url={postUrl}
                                        title={post.title}
                                    />

                                </div>

                            </div>

                        </div>

                    </header>

                    <div className="prose prose-neutral mt-6 max-w-none prose-headings:mt-8 prose-headings:mb-4 prose-headings:font-bold prose-headings:text-foreground prose-p:my-5 prose-p:leading-8 prose-p:text-foreground/90 prose-a:text-foreground hover:prose-a:text-foreground prose-strong:text-foreground prose-ul:my-5 prose-ol:my-5 prose-li:my-1.5 prose-img:rounded-xl prose-blockquote:border-l-4 prose-blockquote:border-black/20 prose-blockquote:bg-muted prose-blockquote:px-5 prose-blockquote:py-3 prose-blockquote:italic sm:prose-lg sm:mt-8 sm:prose-headings:mt-10 sm:prose-p:my-6 sm:prose-p:leading-9">
                        <PortableText
                            value={post.content}
                            components={portableTextComponents}
                        />
                    </div>

                    {post.tags?.length > 0 && (
                        <footer className="flex justify-start items-center mt-6 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 border-t border-black/10 pt-6 sm:mt-8 sm:pt-8">
                            <h2 className="text-base font-semibold text-foreground sm:text-lg">
                                ট্যাগ:
                            </h2>

                            <div className="flex ml-3 flex-wrap gap-2 sm:gap-3">
                                {post.tags.map((tag: string) => (
                                    <Link
                                        key={tag}
                                        href={`/search?q=${encodeURIComponent(tag)}`}
                                        className="rounded-full border border-black/10 bg-background px-3 py-1.5 text-xs transition-colors hover:bg-muted sm:px-4 sm:py-2 sm:text-sm"
                                    >
                                        #{tag}
                                    </Link>
                                ))}
                            </div>
                        </footer>
                    )}
                </article>

                <aside className="min-w-0">
                    <SinglePostSidebar
                        latestPosts={latestPosts}
                        popularPosts={popularPosts}
                        categories={categories}
                    />
                </aside>
            </div>
        </main>
    );
}