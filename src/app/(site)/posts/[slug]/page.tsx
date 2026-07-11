import { portableTextComponents } from "@/components/post/PortableTextComponents";
import ShareButtons from "@/components/post/ShareButtons";
import SinglePostSidebar from "@/components/post/SinglePostSidebar";
import { urlFor } from "@/sanity/lib/image";
import { getAllCategories } from "@/services/category.service";
import { PortableText } from "@portabletext/react";
import { CalendarDays, ChevronRight, Clock, FolderOpen } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import {
    getLatestPosts,
    getPopularPosts,
    getPostBySlug,
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

    const [
        post,
        latestPosts,
        popularPosts,
        categories,
    ] = await Promise.all([
        getPostBySlug(slug),
        getLatestPosts(),
        getPopularPosts(),
        getAllCategories(),
    ]);

    if (!post) {
        notFound();
    }

    const imageUrl = post.coverImage
        ? urlFor(post.coverImage)
            .width(1400)
            .height(800)
            .url()
        : null;

    const publishedDate = new Date(
        post.publishedAt
    ).toLocaleDateString("bn-BD", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });

    const siteUrl =
        process.env.NEXT_PUBLIC_SITE_URL ?? "https://jibonchokro.com";

    const postUrl = `${siteUrl}/posts/${post.slug.current}`;

    return (
        <main className="mx-auto max-w-[1158px] px-4 py-10">

            <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_320px]">

                <article className="h-fit min-w-0 rounded-md border border-[#e7e7e7] bg-white p-10">

                    {/* Breadcrumb */}

                    <nav
                        aria-label="Breadcrumb"
                        className="mb-8 overflow-hidden"
                    >
                        <ol className="flex items-center gap-2 overflow-hidden whitespace-nowrap text-sm text-gray-500">

                            <li className="shrink-0">
                                <Link
                                    href="/"
                                    className="transition hover:text-green-700"
                                >
                                    হোম
                                </Link>
                            </li>

                            <ChevronRight
                                size={16}
                                className="shrink-0 text-gray-400"
                            />

                            <li className="shrink-0">
                                <Link
                                    href="/posts"
                                    className="transition hover:text-green-700"
                                >
                                    সকল লেখা
                                </Link>
                            </li>

                            {post.category && (
                                <>
                                    <ChevronRight
                                        size={16}
                                        className="shrink-0 text-gray-400"
                                    />

                                    <li className="shrink-0">
                                        <Link
                                            href={`/category/${post.category.slug.current}`}
                                            className="transition hover:text-green-700"
                                        >
                                            {post.category.title}
                                        </Link>
                                    </li>
                                </>
                            )}

                            <ChevronRight
                                size={16}
                                className="shrink-0 text-gray-400"
                            />

                            <li className="min-w-0 flex-1 truncate font-medium text-gray-900">
                                {post.title}
                            </li>

                        </ol>
                    </nav>

                    <header>

                        {post.category && (
                            <Link
                                href={`/category/${post.category.slug.current}`}
                                className="inline-flex items-center gap-2 rounded-full bg-green-50 px-4 py-2 text-sm font-semibold text-green-700 transition hover:bg-green-100"
                            >
                                <FolderOpen size={16} />

                                {post.category.title}
                            </Link>
                        )}

                        <h1 className="mt-6 text-[32px] font-bold leading-tight tracking-tight text-gray-900 md:text-[36px]">
                            {post.title}
                        </h1>

                        <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-3 border-y border-gray-200 py-5 text-sm text-gray-600">

                            <div className="flex items-center gap-2">
                                <CalendarDays
                                    size={18}
                                    className="text-green-700"
                                />

                                <span>{publishedDate}</span>
                            </div>

                            <div className="flex items-center gap-2">
                                <Clock
                                    size={18}
                                    className="text-green-700"
                                />

                                <span>
                                    {post.readingTime} মিনিট
                                </span>
                            </div>

                        </div>

                    </header>

                    <div
                        className="
                            prose
                            prose-lg
                            prose-gray
                            max-w-none

                            prose-headings:mt-12
                            prose-headings:mb-5
                            prose-headings:font-bold
                            prose-headings:text-gray-900

                            prose-p:my-7
                            prose-p:leading-9
                            prose-p:text-gray-700

                            prose-a:text-green-700
                            hover:prose-a:text-green-800

                            prose-strong:text-gray-900

                            prose-ul:my-7
                            prose-ol:my-7

                            prose-li:my-2

                            prose-img:rounded-2xl

                            prose-blockquote:border-l-green-600
                            prose-blockquote:bg-green-50
                            prose-blockquote:px-6
                            prose-blockquote:py-3
                            prose-blockquote:italic
                        "
                    >
                        <PortableText
                            value={post.content}
                            components={portableTextComponents}
                        />
                        <ShareButtons
                            url={postUrl}
                            title={post.title}
                        />
                    </div>

                    {post.tags?.length > 0 && (
                        <footer className="mt-8 border-t border-gray-200 pt-8">

                            <h2 className="mb-5 text-lg font-semibold text-gray-900">
                                ট্যাগ
                            </h2>

                            <div className="flex flex-wrap gap-3">

                                {post.tags.map((tag: string) => (
                                    <Link
                                        key={tag}
                                        href={`/search?q=${encodeURIComponent(tag)}`}
                                        className="rounded-full border border-gray-300 bg-white px-4 py-2 text-sm transition hover:border-green-700 hover:bg-green-50 hover:text-green-700"
                                    >
                                        #{tag}
                                    </Link>
                                ))}

                            </div>

                        </footer>
                    )}

                </article>

                <aside>

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