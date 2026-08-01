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
        <section className="rounded-xl border border-[#f0f0f0] shadow-custom bg-white p-5">

            {/* Header */}

            <div className="mb-5 flex items-center gap-2">

                <FolderOpen
                    size={18}
                    className="text-muted-foreground"
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

                        <span
                            className="
                                font-medium
                                text-muted-foreground
                                transition-colors
                                group-hover:text-foreground
                            "
                        >
                            {category.title}
                        </span>


                        <ArrowRight
                            size={15}
                            className="
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