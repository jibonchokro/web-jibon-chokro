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

                <nav className="mb-5 flex items-center gap-2 text-sm text-muted-foreground">

                    <Link
                        href="/"
                        className="transition hover:text-foreground"
                    >
                        হোম
                    </Link>

                    <ChevronRight size={15} />

                    <Link
                        href="/categories"
                        className="transition hover:text-foreground"
                    >
                        বিভাগসমূহ
                    </Link>

                    <ChevronRight size={15} />

                    <span className="font-medium text-foreground">
                        {category.title}
                    </span>

                </nav>

                {/* Header */}

                <section className="rounded-3xl border border-black/10 bg-white p-5 sm:p-6 lg:p-8">

                    <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-black/10 bg-muted px-4 py-2 text-sm font-medium">

                        <FolderOpen size={16} />

                        বিভাগ

                    </div>

                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                        <h1 className="text-3xl font-black tracking-tight text-foreground sm:text-4xl lg:text-5xl">

                            {category.title}

                        </h1>

                        <div className="inline-flex items-center rounded-full border border-black/10 bg-background px-4 py-2 text-sm font-medium whitespace-nowrap">

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