"use client";

import {
    ArrowRight,
    Hash,
    Search,
    TrendingUp,
    X,
} from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";

import type { TagWithCount } from "@/services/post.service";

interface Props {
    tags: TagWithCount[];
}

type SortMode = "alphabetical" | "popular";

const SPOTLIGHT_COUNT = 8;

export default function TagsExplorer({
    tags,
}: Props) {
    const [query, setQuery] = useState("");
    const [sort, setSort] =
        useState<SortMode>("alphabetical");

    const spotlightTags = useMemo(() => {
        return [...tags]
            .sort((a, b) => b.count - a.count)
            .slice(0, SPOTLIGHT_COUNT);
    }, [tags]);

    // Only worth showing as a distinct "popular" section when some
    // tags actually stand out — if every tag has the same count
    // (e.g. all 1), a "popular" spotlight would be meaningless.
    const showSpotlight =
        !query &&
        sort !== "popular" &&
        spotlightTags.some(
            (item) => item.count > 1
        );

    const filteredTags = useMemo(() => {
        const keyword = query.trim().toLowerCase();

        let result = tags;

        if (keyword) {
            result = result.filter((item) =>
                item.tag
                    .toLowerCase()
                    .includes(keyword)
            );
        }

        const sorted = [...result];

        if (sort === "popular") {
            sorted.sort((a, b) => {
                if (b.count !== a.count) {
                    return b.count - a.count;
                }

                return a.tag.localeCompare(
                    b.tag,
                    "bn"
                );
            });
        } else {
            sorted.sort((a, b) =>
                a.tag.localeCompare(b.tag, "bn")
            );
        }

        return sorted;
    }, [tags, query, sort]);

    if (tags.length === 0) {
        return (
            <div className="rounded-xl border border-border bg-card p-8 text-center">
                <p className="text-sm text-muted-foreground">
                    এখনো কোনো ট্যাগ পাওয়া যায়নি।
                </p>
            </div>
        );
    }

    return (
        <div className="space-y-8">
            {/* Popular tags spotlight */}

            {showSpotlight && (
                <div>
                    <div className="mb-3 flex items-center gap-2">
                        <TrendingUp
                            size={16}
                            className="text-muted-foreground"
                        />

                        <h2 className="text-sm font-semibold text-foreground">
                            জনপ্রিয় ট্যাগ
                        </h2>
                    </div>

                    <div className="flex flex-wrap gap-2">
                        {spotlightTags.map((item) => (
                            <Link
                                key={item.tag}
                                href={`/search?q=${encodeURIComponent(
                                    item.tag
                                )}`}
                                className="group inline-flex items-center gap-1.5 rounded-full border border-border bg-muted px-3.5 py-1.5 text-sm font-medium text-foreground transition hover:border-primary hover:bg-primary hover:text-primary-foreground"
                            >
                                <Hash
                                    size={13}
                                    className="text-muted-foreground transition-colors group-hover:text-primary-foreground/70"
                                />

                                {item.tag}

                                <span className="text-xs text-muted-foreground transition-colors group-hover:text-primary-foreground/70">
                                    {item.count}
                                </span>
                            </Link>
                        ))}
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
                        placeholder="ট্যাগ খুঁজুন..."
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
                {filteredTags.length} / {tags.length}
                টি ট্যাগ দেখানো হচ্ছে
            </p>

            {/* Grid */}

            {filteredTags.length > 0 ? (
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                    {filteredTags.map((item) => (
                        <Link
                            key={item.tag}
                            href={`/search?q=${encodeURIComponent(
                                item.tag
                            )}`}
                            className="group flex items-center justify-between rounded-xl border border-border bg-card px-4 py-3.5 shadow-xs transition-all hover:-translate-y-0.5 hover:bg-muted hover:shadow-sm"
                        >
                            <div className="flex min-w-0 items-center gap-2.5">
                                <Hash
                                    size={16}
                                    className="shrink-0 text-muted-foreground transition-colors group-hover:text-foreground"
                                />

                                <span className="truncate text-sm font-medium text-foreground">
                                    {item.tag}
                                </span>
                            </div>

                            <div className="flex shrink-0 items-center gap-2">
                                <span className="rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground">
                                    {item.count}
                                </span>

                                <ArrowRight
                                    size={15}
                                    className="text-muted-foreground/60 transition-transform group-hover:translate-x-0.5 group-hover:text-foreground"
                                />
                            </div>
                        </Link>
                    ))}
                </div>
            ) : (
                <div className="rounded-xl border border-dashed border-border bg-card p-8 text-center">
                    <p className="text-sm text-muted-foreground">
                        &quot;{query}&quot; এর সাথে মিলে এমন কোনো
                        ট্যাগ পাওয়া যায়নি।
                    </p>
                </div>
            )}
        </div>
    );
}