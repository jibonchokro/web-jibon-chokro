import { PortableText } from "@portabletext/react";
import {
    CalendarDays,
    ChevronRight,
    Clock,
    FolderOpen,
} from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import BookmarkButton from "@/components/post/BookmarkButton";
import CommentCountButton from "@/components/post/CommentCountButton";
import { portableTextComponents } from "@/components/post/PortableTextComponents";
import PostViews from "@/components/post/PostViews";
import ReadingProgressBar from "@/components/post/ReadingProgressBar";
import RelatedPostsSlider from "@/components/post/RelatedPostsSlider";
import ReportPostDialog from "@/components/post/ReportPostDialog";
import ShareButtons from "@/components/post/ShareButtons";
import SinglePostSidebar from "@/components/post/SinglePostSidebar";

import type { Post } from "@/types/post";

import { urlFor } from "@/sanity/lib/image";

import CommentSection from "@/components/comments/CommentSection";
import { isBookmarked } from "@/services/bookmark.service";
import { getAllCategories } from "@/services/category.service";
import { getCommentCount } from "@/services/comment.service";
import {
    getLatestPosts,
    getPopularPosts,
    getPostBySlug,
    getPostViews,
    getRelatedPosts,
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

    // Related posts come from the same category, ranked by the same
    // popularity score as getPopularPosts (1 comment = 5 views).
    // Posts with no category (or an otherwise-empty category) fall
    // back to latest posts, so the slider is never empty.
    const relatedPostsPromise = post.category
        ? getRelatedPosts(
            post.category.slug.current,
            post._id
        )
        : Promise.resolve<Post[]>([]);

    const [
        latestPosts,
        popularPosts,
        categories,
        initialViews,
        initialBookmarked,
        initialCommentCount,
        relatedPostsByCategory,
    ] = await Promise.all([
        getLatestPosts(),
        getPopularPosts(),
        getAllCategories(),
        getPostViews(post._id),
        isBookmarked(post._id),
        getCommentCount(post._id),
        relatedPostsPromise,
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

    // NOTE: `coverImage` is read defensively in case your Sanity schema
    // doesn't (yet) type this field on `post`. If your `Post` type
    // already includes it, you can drop the `as any` cast and use
    // `post.coverImage` directly.
    const coverImage = (post as any).coverImage;

    const relatedPosts =
        relatedPostsByCategory.length > 0
            ? relatedPostsByCategory
            : (latestPosts ?? [])
                .filter(
                    (p) =>
                        p.slug?.current !==
                        post.slug.current
                )
                .slice(0, 6);

    // Basic Article structured data for SEO — safe to remove if you
    // already inject this elsewhere.
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: post.title,
        description: post.excerpt,
        datePublished: post.publishedAt,
        image: coverImage
            ? [urlFor(coverImage).width(1200).height(630).url()]
            : undefined,
        mainEntityOfPage: postUrl,
    };

    return (
        <main className="mx-auto max-w-[1158px] px-0 py-4 sm:px-4 sm:py-6 lg:px-4 lg:py-8">
            <ReadingProgressBar />

            <script
                type="application/ld+json"
                // eslint-disable-next-line react/no-danger
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

            <nav
                aria-label="Breadcrumb"
                className="overflow-hidden mb-4 sm:mb-6 lg:mb-6 px-3 sm:px-0 lg:px-0 py-1 sm:py-0 lg:py-0"
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

            <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_320px] lg:gap-8">
                <div className="min-w-0">
                    <article className="rounded-none sm:rounded-xl lg:rounded-xl border border-[#f0f0f0] shadow-custom bg-white p-5">

                        <header>
                            {/* Category + date badges */}
                            <div className="flex flex-wrap items-center gap-2">
                                {post.category && (
                                    <Link
                                        href={`/category/${post.category.slug.current}`}
                                        className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-muted px-3 py-1.5 text-xs font-medium transition hover:bg-accent sm:px-4 sm:py-2 sm:text-sm"
                                    >
                                        <FolderOpen size={15} />
                                        {post.category.title}
                                    </Link>
                                )}

                                <div className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-muted px-3 py-1.5 text-xs font-medium sm:px-4 sm:py-2 sm:text-sm">
                                    <CalendarDays size={16} />
                                    <span>{publishedDate}</span>
                                </div>

                                <div className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-muted px-3 py-1.5 text-xs font-medium sm:px-4 sm:py-2 sm:text-sm">
                                    <Clock size={16} />
                                    <span>{post.readingTime} মিনিট পড়া</span>
                                </div>
                            </div>

                            {/* Title */}
                            <h1 className="mt-4 text-2xl font-bold leading-tight tracking-tight text-foreground sm:mt-5 sm:text-3xl lg:text-4xl">
                                {post.title}
                            </h1>

                            {/* Excerpt / dek */}
                            {post.excerpt && (
                                <p className="mt-3 text-base leading-7 text-muted-foreground sm:text-lg">
                                    {post.excerpt}
                                </p>
                            )}

                            {/* Cover image */}
                            {coverImage && (
                                <div className="relative mt-6 aspect-[16/9] w-full overflow-hidden rounded-xl bg-muted sm:mt-8">
                                    <Image
                                        src={urlFor(coverImage)
                                            .width(1600)
                                            .height(900)
                                            .url()}
                                        alt={post.title}
                                        fill
                                        priority
                                        sizes="(max-width: 1024px) 100vw, 800px"
                                        className="object-cover"
                                    />
                                </div>
                            )}

                            {/* Action Bar */}
                            <div className="mt-4 border-b border-black/10 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8">
                                <div className="flex flex-wrap items-center justify-between gap-3 py-3">
                                    <div className="flex items-center gap-3">
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

                                        <CommentCountButton
                                            initialCount={initialCommentCount}
                                        />
                                    </div>

                                    <div className="flex items-center gap-3">
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

                                        <ReportPostDialog
                                            postId={post._id}
                                            postTitle={post.title}
                                            postUrl={postUrl}
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
                            <footer className="flex flex-wrap items-center gap-3 mt-4 -mx-5 px-5 pt-4 border-t border-black/10">
                                <h2 className="text-base font-semibold tracking-tight text-foreground">
                                    ট্যাগ:
                                </h2>

                                <div className="flex flex-wrap gap-2 sm:gap-3">
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

                    {/* Related posts — slider, card style matches SidebarPopularPosts */}
                    <RelatedPostsSlider posts={relatedPosts} />

                    <div
                        id="comments"
                        className="mt-5 sm:mt-8 scroll-mt-20 rounded-none sm:rounded-xl lg:rounded-xl border border-[#f0f0f0] shadow-custom bg-white p-5"
                    >
                        <CommentSection postId={post._id} />
                    </div>

                </div>

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