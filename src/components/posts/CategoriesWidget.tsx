import Link from "next/link";

import type { Category } from "@/types/category";

interface CategoriesWidgetProps {
    categories: Category[];
}

export default function CategoriesWidget({
    categories,
}: CategoriesWidgetProps) {
    return (
        <div className="rounded-2xl border border-gray-200 bg-white p-6">
            <h3 className="mb-5 text-xl font-bold">
                বিভাগসমূহ
            </h3>

            <div className="space-y-2">
                {categories.map((category) => (
                    <Link
                        key={category._id}
                        href={`/category/${category.slug.current}`}
                        className="block rounded-lg px-3 py-2 transition hover:bg-green-50 hover:text-green-700"
                    >
                        {category.title}
                    </Link>
                ))}
            </div>
        </div>
    );
}