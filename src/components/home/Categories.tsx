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
        <section className="border-t border-gray-100 py-20">
            <Container>
                <div className="mb-10 text-center">
                    <h2 className="text-3xl font-bold text-gray-900">
                        বিভাগসমূহ
                    </h2>

                    <p className="mt-3 text-gray-600">
                        আপনার পছন্দের বিষয় নির্বাচন করে আরও লেখা পড়ুন।
                    </p>
                </div>

                {categories.length === 0 ? (
                    <div className="rounded-2xl border border-dashed border-gray-300 py-12 text-center text-gray-500">
                        এখনো কোনো বিভাগ তৈরি করা হয়নি।
                    </div>
                ) : (
                    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                        {categories.map((category) => (
                            <Link
                                key={category._id}
                                href={`/category/${category.slug.current}`}
                                className="group rounded-2xl border border-gray-200 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-green-600 hover:shadow-lg"
                            >
                                <h3 className="text-xl font-semibold transition-colors group-hover:text-green-700">
                                    {category.title}
                                </h3>

                                <p className="mt-3 text-sm leading-7 text-gray-600">
                                    {category.description ??
                                        "এই বিভাগের সব লেখা পড়ুন।"}
                                </p>

                                <span className="mt-6 inline-flex font-medium text-green-700">
                                    আরও দেখুন →
                                </span>
                            </Link>
                        ))}
                    </div>
                )}
            </Container>
        </section>
    );
}