"use client";

import Link from "next/link";

import SearchResultItem from "./SearchResultItem";

interface SearchResultsProps {
    open: boolean;
    loading: boolean;
    query: string;
    results: {
        _id: string;
        title: string;
        slug: {
            current: string;
        };
        excerpt?: string;
        coverImage?: any;
        readingTime?: number;
        category?: {
            title: string;
        };
    }[];
    onSelect?: () => void;
}

export default function SearchResults({
    open,
    loading,
    query,
    results,
    onSelect,
}: SearchResultsProps) {
    if (!open) {
        return null;
    }

    return (
        <div
            className="
                absolute
                left-0
                right-0
                top-full
                z-[999]
                mt-3
                flex
                max-h-[70vh]
                flex-col
                overflow-hidden
                rounded-xl
                border
                border-black/10
                bg-white
                shadow-xl
            "
        >
            {loading && (
                <div className="p-8 text-center text-sm text-muted-foreground">
                    খোঁজা হচ্ছে...
                </div>
            )}

            {!loading &&
                query.trim().length > 0 &&
                results.length === 0 && (
                    <div className="p-8 text-center text-sm text-muted-foreground">
                        কোনো ফলাফল পাওয়া যায়নি।
                    </div>
                )}

            {!loading && results.length > 0 && (
                <>
                    {/* Results */}

                    <div
                        className="
                            flex-1
                            overflow-y-auto
                            overscroll-contain
                        "
                    >
                        {results.map((post) => (
                            <SearchResultItem
                                key={post._id}
                                post={post}
                                onSelect={onSelect}
                            />
                        ))}
                    </div>

                    {/* Footer */}

                    <div className="border-t border-black/10 bg-muted/40 p-2">

                        <Link
                            href={`/search?q=${encodeURIComponent(query)}`}
                            onClick={onSelect}
                            className="
                                flex
                                items-center
                                justify-center
                                gap-1
                                rounded-lg
                                px-3
                                py-2
                                text-sm
                                font-medium
                                text-foreground
                                transition-colors
                                hover:bg-muted
                            "
                        >
                            <span className="max-w-[40vw] truncate sm:max-w-xs">
                                "{query}"
                            </span>

                            <span className="shrink-0">
                                এর সকল ফলাফল দেখুন
                            </span>

                        </Link>

                    </div>
                </>
            )}
        </div>
    );
}