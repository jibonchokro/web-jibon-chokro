import { ChevronRight } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

import CategoriesExplorer from "@/components/category/CategoriesExplorer";
import Container from "@/components/ui/Container";
import { getAllCategories } from "@/services/category.service";

export const metadata: Metadata = {
    title: "বিভাগসমূহ",
    description:
        "জীবনচক্রের সকল বিভাগ এক জায়গায়। আপনার পছন্দের বিভাগ নির্বাচন করে সংশ্লিষ্ট লেখাগুলো পড়ুন।",
};

export default async function CategoriesPage() {
    const categories =
        await getAllCategories();

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

                    <span className="font-medium text-foreground">
                        বিভাগসমূহ
                    </span>
                </nav>

                {/* Hero */}

                <section className="rounded-3xl border border-border bg-card p-5 text-center shadow-sm sm:p-6 lg:p-8">
                    <span className="inline-flex rounded-full border border-border bg-muted px-4 py-2 text-sm font-medium text-foreground shadow-xs">
                        বিভাগসমূহ
                    </span>

                    <h1 className="mt-5 text-3xl font-black tracking-tight text-foreground sm:text-4xl lg:text-5xl">
                        সকল বিভাগ
                    </h1>

                    <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-muted-foreground sm:text-lg">
                        আপনার আগ্রহের বিষয় নির্বাচন করুন এবং সেই বিভাগের
                        সকল লেখা এক জায়গায় পড়ুন।
                    </p>

                    <p className="mt-6 text-sm font-medium text-muted-foreground">
                        মোট{" "}
                        <span className="font-bold text-foreground">
                            {categories.length}
                        </span>{" "}
                        টি বিভাগ
                    </p>
                </section>

                {/* Categories */}

                <section className="mt-10">
                    <CategoriesExplorer
                        categories={categories}
                    />
                </section>

            </Container>
        </main>
    );
}