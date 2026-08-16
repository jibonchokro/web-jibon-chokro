import {
    FolderOpen,
    Grid2X2,
} from "lucide-react";
import Link from "next/link";

import Container from "@/components/ui/Container";

import type { Category } from "@/types/category";

interface CategoriesProps {
    categories: Category[];
}

export default function Categories({
    categories,
}: CategoriesProps) {
    return (
        <section className="py-4 sm:py-6 lg:py-8">
            <Container>
                {/* Header */}

                <div className="mx-auto mb-8 max-w-3xl text-center">
                    <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm font-medium text-foreground shadow-custom">
                        <Grid2X2 className="size-4" />
                        বিভাগসমূহ
                    </div>

                    <h2 className="mt-5 text-3xl font-black tracking-tight text-foreground sm:text-4xl">
                        পছন্দের বিষয় খুঁজে নিন
                    </h2>

                    <p className="mx-auto mt-3 max-w-2xl text-base leading-8 text-muted-foreground">
                        বিষয়ভিত্তিক বিভাগ থেকে পছন্দের লেখা সহজেই খুঁজে পড়ুন।
                    </p>

                    <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm text-foreground shadow-custom">
                        <FolderOpen className="size-4" />
                        মোট {categories.length} টি বিভাগ
                    </div>
                </div>

                {categories.length === 0 ? (
                    <div className="rounded-2xl border border-dashed border-border bg-muted/30 py-12 text-center">
                        <FolderOpen className="mx-auto size-10 text-muted-foreground" />

                        <p className="mt-4 text-sm text-muted-foreground">
                            এখনো কোনো বিভাগ তৈরি করা হয়নি।
                        </p>
                    </div>
                ) : (
                    <div className="flex flex-wrap justify-center gap-3">
                        {categories.map((category) => (
                            <Link
                                key={category._id}
                                href={`/category/${category.slug.current}`}
                                className="group inline-flex items-center gap-2 rounded-full border border-border bg-card px-5 py-3 text-sm font-medium text-foreground shadow-custom transition-all duration-200 hover:-translate-y-0.5 hover:border-border hover:bg-muted hover:text-foreground"
                            >
                                <span>{category.title}</span>
                            </Link>
                        ))}
                    </div>
                )}
            </Container>
        </section>
    );
}