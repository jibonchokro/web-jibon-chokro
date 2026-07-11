import { ArrowRight, FolderOpen } from "lucide-react";
import Link from "next/link";

import type { Category } from "@/types/category";

interface SidebarCategoriesProps {
    categories: Category[];
}

export default function SidebarCategories({
    categories,
}: SidebarCategoriesProps) {
    if (!categories.length) {
        return null;
    }

    return (
        <section className="rounded-md border border-[#e7e7e7] bg-white p-6">

            <div className="mb-3 flex items-center gap-2">

                <FolderOpen
                    size={20}
                    className="text-green-700"
                />

                <h2 className="text-lg font-bold text-gray-900">
                    বিভাগসমূহ
                </h2>

            </div>

            <div className="space-y-2">

                {categories.map((category) => (
                    <Link
                        key={category._id}
                        href={`/category/${category.slug.current}`}
                        className="group flex items-center justify-between rounded-md border border-transparent px-2 py-1 transition-all duration-200 hover:border-green-100 hover:bg-green-50"
                    >
                        <span className="font-medium text-gray-700 transition group-hover:text-green-700">
                            {category.title}
                        </span>

                        <ArrowRight
                            size={16}
                            className="text-gray-400 transition-transform duration-200 group-hover:translate-x-1 group-hover:text-green-700"
                        />
                    </Link>
                ))}

            </div>

            <Link
                href="/categories"
                className="mt-3 flex items-center justify-center rounded-xl border border-green-700 px-4 py-3 text-sm font-semibold text-green-700 transition hover:bg-green-700 hover:text-white"
            >
                সব বিভাগ দেখুন
            </Link>

        </section>
    );
}