"use client";

import { Search } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import SearchResults from "./SearchResults";

interface SearchPost {
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
}

interface SearchBoxProps {
    className?: string;
}

export default function SearchBox({
    className = "",
}: SearchBoxProps) {
    const [query, setQuery] = useState("");

    const [results, setResults] = useState<SearchPost[]>([]);

    const [loading, setLoading] = useState(false);

    const [open, setOpen] = useState(false);

    const wrapperRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                wrapperRef.current &&
                !wrapperRef.current.contains(event.target as Node)
            ) {
                setOpen(false);
            }
        };

        const handleEscape = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                setOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        document.addEventListener("keydown", handleEscape);

        return () => {
            document.removeEventListener(
                "mousedown",
                handleClickOutside
            );

            document.removeEventListener(
                "keydown",
                handleEscape
            );
        };
    }, []);

    useEffect(() => {
        if (query.trim().length < 2) {
            setResults([]);
            setOpen(false);
            return;
        }

        const timeout = setTimeout(async () => {
            try {
                setLoading(true);

                const response = await fetch(
                    `/api/search?q=${encodeURIComponent(query)}`
                );

                const data = await response.json();

                setResults(data);
                setOpen(true);
            } catch (error) {
                console.error(error);
                setResults([]);
            } finally {
                setLoading(false);
            }
        }, 300);

        return () => clearTimeout(timeout);
    }, [query]);

    return (
        <div
            ref={wrapperRef}
            className={`relative ${className}`}
        >
            <div className="relative">
                <Search
                    size={18}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                    type="search"
                    value={query}
                    onChange={(e) =>
                        setQuery(e.target.value)
                    }
                    onFocus={() => {
                        if (results.length > 0) {
                            setOpen(true);
                        }
                    }}
                    placeholder="লেখা খুঁজুন..."
                    autoComplete="off"
                    className="w-full rounded-xl border border-gray-300 bg-transparent py-2 pl-10 pr-4 outline-none transition focus:border-gray-400"
                />
            </div>

            <SearchResults
                open={open}
                loading={loading}
                query={query}
                results={results}
                onSelect={() => setOpen(false)}
            />
        </div>
    );
}