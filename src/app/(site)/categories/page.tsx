import {
    ArrowRight,
    ChevronRight,
} from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

import Container from "@/components/ui/Container";
import { getAllCategories } from "@/services/category.service";

export const metadata: Metadata = {
    title: "বিভাগসমূহ",
    description:
        "জীবনচক্রের সকল বিভাগ এক জায়গায়। আপনার পছন্দের বিভাগ নির্বাচন করে সংশ্লিষ্ট লেখাগুলো পড়ুন।",
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
                        আপনার আগ্রহের বিষয় নির্বাচন করুন এবং সেই বিভাগের
                        সকল লেখা এক জায়গায় পড়ুন।
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
                    {categories.length === 0 ? (
                        <div className="rounded-2xl border border-dashed border-border bg-card py-16 text-center shadow-sm">
                            <h2 className="text-lg font-semibold text-foreground">
                                কোনো বিভাগ পাওয়া যায়নি
                            </h2>

                            <p className="mt-2 text-sm text-muted-foreground">
                                পরে আবার চেষ্টা করুন।
                            </p>
                        </div>
                    ) : (
                        <div className="flex flex-wrap gap-3">
                            {categories.map((category) => (
                                <Link
                                    key={category._id}
                                    href={`/category/${category.slug.current}`}
                                    aria-label={`${category.title} বিভাগ`}
                                    className="group inline-flex items-center gap-4 rounded-xl border border-border bg-card px-5 py-3 text-foreground shadow-sm transition-all hover:border-foreground/20 hover:bg-muted hover:shadow-md"
                                >
                                    <div className="min-w-0">
                                        <h2 className="text-sm font-semibold text-foreground sm:text-base">
                                            {category.title}
                                        </h2>

                                        <p className="mt-1 text-xs text-muted-foreground">
                                            {category.postCount} টি লেখা
                                        </p>
                                    </div>

                                    <ArrowRight
                                        size={16}
                                        className="shrink-0 text-muted-foreground transition-transform duration-200 group-hover:translate-x-1 group-hover:text-foreground"
                                    />
                                </Link>
                            ))}
                        </div>
                    )}
                </section>

            </Container>
        </main>
    );
}