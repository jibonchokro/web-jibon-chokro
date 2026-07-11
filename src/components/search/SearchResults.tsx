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
        <div className="absolute left-0 right-0 top-full z-50 mt-2 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-2xl">

            {loading && (
                <div className="p-8 text-center text-gray-500">
                    খোঁজা হচ্ছে...
                </div>
            )}

            {!loading && query.trim().length > 0 && results.length === 0 && (
                <div className="p-8 text-center text-gray-500">
                    কোনো ফলাফল পাওয়া যায়নি।
                </div>
            )}

            {!loading && results.length > 0 && (
                <>
                    <div className="max-h-[420px] overflow-y-auto">

                        {results.map((post) => (
                            <SearchResultItem
                                key={post._id}
                                post={post}
                                onSelect={onSelect}
                            />
                        ))}

                    </div>

                    <div className="border-t border-gray-100 bg-gray-50 p-4 text-center">

                        <Link
                            href={`/search?q=${encodeURIComponent(query)}`}
                            onClick={onSelect}
                            className="font-medium text-green-700 transition hover:text-green-800"
                        >
                            "{query}" এর সকল ফলাফল দেখুন →
                        </Link>

                    </div>
                </>
            )}
        </div>
    );
}