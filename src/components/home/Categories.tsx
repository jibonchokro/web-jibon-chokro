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
        <section className="border-t border-black/10 py-12 sm:py-16">
            <Container>

                {/* Header */}

                <div className="mb-8 text-center">

                    <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                        বিভাগসমূহ
                    </h2>

                    <p className="mt-2 text-sm text-muted-foreground sm:text-base">
                        আপনার পছন্দের বিভাগ নির্বাচন করুন।
                    </p>

                </div>

                {categories.length === 0 ? (

                    <div className="rounded-xl border border-dashed border-black/10 bg-muted/30 py-10 text-center text-sm text-muted-foreground">
                        এখনো কোনো বিভাগ তৈরি করা হয়নি।
                    </div>

                ) : (

                    <div className="flex flex-wrap justify-center gap-2 sm:gap-3">

                        {categories.map((category) => (

                            <Link
                                key={category._id}
                                href={`/category/${category.slug.current}`}
                                className="rounded-full border border-black/10 bg-white px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted hover:border-black/20"
                            >
                                {category.title}
                            </Link>

                        ))}

                    </div>

                )}

            </Container>
        </section>
    );
}