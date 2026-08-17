"use client";

import {
    ArrowRight,
    Search,
    TrendingUp,
    X,
} from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";

import type { Category } from "@/types/category";

interface Props {
    categories: Category[];
}

type SortMode = "alphabetical" | "popular";

const SPOTLIGHT_COUNT = 6;

export default function CategoriesExplorer({
    categories,
}: Props) {
    const [query, setQuery] = useState("");
    const [sort, setSort] =
        useState<SortMode>("alphabetical");

    const spotlightCategories = useMemo(() => {
        return [...categories]
            .filter((item) => item.postCount > 0)
            .sort(
                (a, b) => b.postCount - a.postCount
            )
            .slice(0, SPOTLIGHT_COUNT);
    }, [categories]);

    // Only worth a distinct "popular" section when categories
    // actually differ in size — if every category has the same
    // (or zero) post count, spotlighting a subset is meaningless.
    const showSpotlight =
        !query &&
        sort !== "popular" &&
        spotlightCategories.some(
            (item) => item.postCount > 1
        );

    const filteredCategories = useMemo(() => {
        const keyword = query.trim().toLowerCase();

        let result = categories;

        if (keyword) {
            result = result.filter((item) =>
                item.title
                    .toLowerCase()
                    .includes(keyword)
            );
        }

        const sorted = [...result];

        if (sort === "popular") {
            sorted.sort((a, b) => {
                if (
                    b.postCount !== a.postCount
                ) {
                    return (
                        b.postCount - a.postCount
                    );
                }

                return a.title.localeCompare(
                    b.title,
                    "bn"
                );
            });
        } else {
            sorted.sort((a, b) =>
                a.title.localeCompare(
                    b.title,
                    "bn"
                )
            );
        }

        return sorted;
    }, [categories, query, sort]);

    if (categories.length === 0) {
        return (
            <div className="rounded-2xl border border-dashed border-border bg-card py-16 text-center shadow-sm">
                <h2 className="text-lg font-semibold text-foreground">
                    কোনো বিভাগ পাওয়া যায়নি
                </h2>

                <p className="mt-2 text-sm text-muted-foreground">
                    পরে আবার চেষ্টা করুন।
                </p>
            </div>
        );
    }

    return (
        <div className="space-y-8">
            {/* Popular categories spotlight */}

            {showSpotlight && (
                <div>
                    <div className="mb-3 flex items-center gap-2">
                        <TrendingUp
                            size={16}
                            className="text-muted-foreground"
                        />

                        <h2 className="text-sm font-semibold text-foreground">
                            জনপ্রিয় বিভাগ
                        </h2>
                    </div>

                    <div className="flex flex-wrap gap-2">
                        {spotlightCategories.map(
                            (category) => (
                                <Link
                                    key={category._id}
                                    href={`/category/${category.slug.current}`}
                                    className="group inline-flex items-center gap-1.5 rounded-full border border-border bg-muted px-3.5 py-1.5 text-sm font-medium text-foreground transition hover:border-primary hover:bg-primary hover:text-primary-foreground"
                                >
                                    {category.title}

                                    <span className="text-xs text-muted-foreground transition-colors group-hover:text-primary-foreground/70">
                                        {category.postCount}
                                    </span>
                                </Link>
                            )
                        )}
                    </div>
                </div>
            )}

            {/* Controls */}

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="relative w-full sm:max-w-xs">
                    <Search
                        size={16}
                        className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                    />

                    <input
                        value={query}
                        onChange={(e) =>
                            setQuery(e.target.value)
                        }
                        placeholder="বিভাগ খুঁজুন..."
                        className="h-10 w-full rounded-lg border border-border bg-background pl-9 pr-9 text-sm outline-none transition focus:border-primary"
                    />

                    {query && (
                        <button
                            type="button"
                            onClick={() =>
                                setQuery("")
                            }
                            className="absolute right-2.5 top-1/2 -translate-y-1/2 rounded-full p-0.5 text-muted-foreground transition hover:bg-muted hover:text-foreground"
                        >
                            <X size={14} />
                        </button>
                    )}
                </div>

                <div className="flex items-center gap-2 text-sm">
                    <button
                        type="button"
                        onClick={() =>
                            setSort("alphabetical")
                        }
                        className={`rounded-lg border px-3 py-1.5 font-medium transition ${sort === "alphabetical"
                                ? "border-primary bg-primary text-primary-foreground"
                                : "border-border text-muted-foreground hover:bg-muted"
                            }`}
                    >
                        A-Z
                    </button>

                    <button
                        type="button"
                        onClick={() =>
                            setSort("popular")
                        }
                        className={`rounded-lg border px-3 py-1.5 font-medium transition ${sort === "popular"
                                ? "border-primary bg-primary text-primary-foreground"
                                : "border-border text-muted-foreground hover:bg-muted"
                            }`}
                    >
                        জনপ্রিয়
                    </button>
                </div>
            </div>

            {/* Result count */}

            <p className="-mt-4 text-xs text-muted-foreground">
                {filteredCategories.length} /{" "}
                {categories.length}টি বিভাগ দেখানো হচ্ছে
            </p>

            {/* Categories */}

            {filteredCategories.length > 0 ? (
                <div className="flex flex-wrap gap-3">
                    {filteredCategories.map(
                        (category) => (
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
                                        {category.postCount}{" "}
                                        টি লেখা
                                    </p>
                                </div>

                                <ArrowRight
                                    size={16}
                                    className="shrink-0 text-muted-foreground transition-transform duration-200 group-hover:translate-x-1 group-hover:text-foreground"
                                />
                            </Link>
                        )
                    )}
                </div>
            ) : (
                <div className="rounded-2xl border border-dashed border-border bg-card py-16 text-center shadow-sm">
                    <p className="text-sm text-muted-foreground">
                        &quot;{query}&quot; এর সাথে মিলে এমন কোনো
                        বিভাগ পাওয়া যায়নি।
                    </p>
                </div>
            )}
        </div>
    );
}