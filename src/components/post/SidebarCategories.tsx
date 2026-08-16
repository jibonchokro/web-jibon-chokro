"use client";

import {
    ArrowRight,
    ChevronDown,
    ChevronUp,
    FolderOpen,
} from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";

import type { Category } from "@/types/category";

interface SidebarCategoriesProps {
    categories: Category[];
}

const VISIBLE_COUNT = 5;

export default function SidebarCategories({
    categories,
}: SidebarCategoriesProps) {
    const [expanded, setExpanded] = useState(false);

    const sortedCategories = useMemo(
        () =>
            [...categories].sort(
                (a, b) =>
                    (b.postCount ?? 0) -
                    (a.postCount ?? 0)
            ),
        [categories]
    );

    if (!sortedCategories.length) {
        return null;
    }

    const hasMore =
        sortedCategories.length > VISIBLE_COUNT;

    const visibleCategories = expanded
        ? sortedCategories
        : sortedCategories.slice(0, VISIBLE_COUNT);

    return (
        <section className="rounded-none border border-border bg-card p-5 shadow-custom sm:rounded-xl lg:rounded-xl">
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
                {visibleCategories.map((category) => (
                    <Link
                        key={category._id}
                        href={`/category/${category.slug.current}`}
                        className="group flex items-center justify-between rounded-lg px-3 py-2.5 text-sm transition-colors hover:bg-muted"
                    >
                        {/* Category + Count */}

                        <div className="flex min-w-0 items-center gap-2">
                            <span className="truncate font-medium text-muted-foreground transition-colors group-hover:text-foreground">
                                {category.title}
                            </span>

                            <span className="inline-flex h-5 min-w-5 shrink-0 items-center justify-center rounded-full border border-border bg-muted px-1.5 text-[10px] font-medium leading-none text-muted-foreground transition-colors group-hover:bg-background group-hover:text-foreground">
                                {category.postCount ?? 0}
                            </span>
                        </div>

                        {/* Arrow */}

                        <ArrowRight
                            size={15}
                            className="ml-3 shrink-0 text-muted-foreground transition-transform duration-200 group-hover:translate-x-1 group-hover:text-foreground"
                        />
                    </Link>
                ))}
            </div>

            {/* Show more / show less */}

            {hasMore && (
                <button
                    type="button"
                    onClick={() =>
                        setExpanded((previous) => !previous)
                    }
                    aria-expanded={expanded}
                    className="mt-4 flex w-full items-center justify-center gap-1.5 rounded-lg border border-border bg-background px-4 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-muted"
                >
                    {expanded ? (
                        <>
                            কম দেখুন
                            <ChevronUp size={15} />
                        </>
                    ) : (
                        <>
                            সব বিভাগ দেখুন
                            <ChevronDown size={15} />
                        </>
                    )}
                </button>
            )}
        </section>
    );
}