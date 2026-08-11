import {
    ArrowRight,
    FolderOpen,
} from "lucide-react";
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
        <section className="rounded-none border border-[#f0f0f0] bg-white p-5 shadow-custom sm:rounded-xl lg:rounded-xl">

            {/* Header */}

            <div className="mb-5 flex items-center gap-2">

                <FolderOpen
                    size={18}
                    className="text-foreground"
                />

                <h2 className="text-base font-semibold tracking-tight text-foreground">
                    বিভাগসমূহ
                </h2>

            </div>


            {/* Categories */}

            <div className="space-y-1.5">

                {categories.map((category) => (

                    <Link
                        key={category._id}
                        href={`/category/${category.slug.current}`}
                        className="
                            group
                            flex
                            items-center
                            justify-between
                            rounded-lg
                            px-3
                            py-2.5
                            text-sm
                            transition-colors
                            hover:bg-muted
                        "
                    >

                        {/* Category + Count */}

                        <div className="flex min-w-0 items-center gap-2">

                            <span
                                className="
                                    truncate
                                    font-medium
                                    text-muted-foreground
                                    transition-colors
                                    group-hover:text-foreground
                                "
                            >
                                {category.title}
                            </span>

                            <span
                                className="
                                    inline-flex
                                    min-w-5
                                    h-5
                                    shrink-0
                                    items-center
                                    justify-center
                                    rounded-full
                                    border
                                    border-black/10
                                    bg-muted
                                    px-1.5
                                    text-[10px]
                                    font-medium
                                    leading-none
                                    text-muted-foreground
                                    transition-colors
                                    group-hover:bg-background
                                    group-hover:text-foreground
                                "
                            >
                                {category.postCount ?? 0}
                            </span>

                        </div>


                        {/* Arrow */}

                        <ArrowRight
                            size={15}
                            className="
                                ml-3
                                shrink-0
                                text-muted-foreground
                                transition-transform
                                duration-200
                                group-hover:translate-x-1
                                group-hover:text-foreground
                            "
                        />

                    </Link>

                ))}

            </div>


            {/* View All */}

            <Link
                href="/categories"
                className="
                    mt-4
                    flex
                    items-center
                    justify-center
                    rounded-lg
                    border
                    border-black/10
                    bg-background
                    px-4
                    py-2.5
                    text-sm
                    font-medium
                    text-foreground
                    transition-colors
                    hover:bg-muted
                "
            >
                সব বিভাগ দেখুন
            </Link>

        </section>
    );
}