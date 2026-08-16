import {
    ChevronRight,
    FolderOpen,
} from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import CategoryToolbar from "@/components/category/CategoryToolbar";
import Container from "@/components/ui/Container";

import {
    getCategoryBySlug,
} from "@/services/category.service";

import {
    getPostsByCategory,
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

    const category =
        await getCategoryBySlug(slug);

    if (!category) {
        return {
            title: "Category Not Found",
        };
    }

    return {
        title: category.title,
        description: `${category.title} বিভাগের সকল লেখা`,
    };
}

export default async function CategoryPage({
    params,
}: Props) {
    const { slug } = await params;

    const category =
        await getCategoryBySlug(slug);

    if (!category) {
        notFound();
    }

    const posts =
        await getPostsByCategory(slug);

    return (
        <main className="py-8 sm:py-10 lg:py-12">

            <Container>

                {/* Breadcrumb */}

                <nav
                    aria-label="Breadcrumb"
                    className="mb-5 flex items-center gap-2 text-sm text-muted-foreground"
                >
                    <Link
                        href="/"
                        className="transition-colors hover:text-foreground"
                    >
                        হোম
                    </Link>

                    <ChevronRight
                        size={15}
                        className="shrink-0"
                    />

                    <Link
                        href="/categories"
                        className="transition-colors hover:text-foreground"
                    >
                        বিভাগসমূহ
                    </Link>

                    <ChevronRight
                        size={15}
                        className="shrink-0"
                    />

                    <span className="font-medium text-foreground">
                        {category.title}
                    </span>
                </nav>

                {/* Header */}

                <section className="rounded-3xl border border-border bg-card p-5 shadow-sm sm:p-6 lg:p-8">

                    <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-border bg-muted px-4 py-2 text-sm font-medium text-foreground">
                        <FolderOpen
                            size={16}
                            className="shrink-0 text-muted-foreground"
                        />

                        <span>
                            বিভাগ
                        </span>
                    </div>

                    <div className="flex flex-row justify-between gap-4 sm:items-center">

                        <h1 className="text-3xl font-black tracking-tight text-foreground sm:text-4xl lg:text-5xl">
                            {category.title}
                        </h1>

                        <div className="inline-flex shrink-0 items-center rounded-full border border-border bg-background px-4 py-2 text-sm font-medium text-foreground">
                            মোট&nbsp;

                            <span className="font-bold">
                                {posts.length}
                            </span>

                            &nbsp;টি লেখা
                        </div>

                    </div>

                </section>

                {/* Posts */}

                <section className="mt-8">
                    <CategoryToolbar
                        posts={posts}
                    />
                </section>

            </Container>

        </main>
    );
}