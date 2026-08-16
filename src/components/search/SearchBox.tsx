"use client";

import { Search } from "lucide-react";
import {
    forwardRef,
    useEffect,
    useRef,
    useState,
} from "react";

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

interface SearchResponse {
    posts: SearchPost[];
}

interface SearchBoxProps {
    className?: string;
}

const SearchBox = forwardRef<
    HTMLInputElement,
    SearchBoxProps
>(function SearchBox(
    {
        className = "",
    }: SearchBoxProps,
    ref
) {
    const [query, setQuery] = useState("");

    const [results, setResults] = useState<
        SearchPost[]
    >([]);

    const [loading, setLoading] =
        useState(false);

    const [open, setOpen] =
        useState(false);

    const wrapperRef =
        useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (
            event: MouseEvent
        ) => {
            if (
                wrapperRef.current &&
                !wrapperRef.current.contains(
                    event.target as Node
                )
            ) {
                setOpen(false);
            }
        };

        const handleEscape = (
            event: KeyboardEvent
        ) => {
            if (event.key === "Escape") {
                setOpen(false);
            }
        };

        document.addEventListener(
            "mousedown",
            handleClickOutside
        );

        document.addEventListener(
            "keydown",
            handleEscape
        );

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

        const timeout = setTimeout(
            async () => {
                try {
                    setLoading(true);

                    const response =
                        await fetch(
                            `/api/search?q=${encodeURIComponent(
                                query
                            )}`
                        );

                    if (!response.ok) {
                        throw new Error(
                            "Search request failed"
                        );
                    }

                    const data: SearchResponse =
                        await response.json();

                    const posts =
                        data.posts ?? [];

                    setResults(posts);

                    setOpen(
                        posts.length > 0
                    );
                } catch (error) {
                    console.error(error);

                    setResults([]);

                    setOpen(true);
                } finally {
                    setLoading(false);
                }
            },
            300
        );

        return () =>
            clearTimeout(timeout);
    }, [query]);

    return (
        <div
            ref={wrapperRef}
            className={`relative ${className}`}
        >
            <div className="relative">

                <Search
                    size={18}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                />

                <input
                    ref={ref}
                    type="search"
                    value={query}
                    onChange={(e) =>
                        setQuery(
                            e.target.value
                        )
                    }
                    onFocus={() => {
                        if (
                            query
                                .trim()
                                .length >= 2
                        ) {
                            setOpen(true);
                        }
                    }}
                    placeholder="লেখা খুঁজুন..."
                    autoComplete="off"
                    className="w-full rounded-xl border border-border bg-transparent py-2 pl-10 pr-4 text-foreground outline-none transition focus:border-foreground"
                />

            </div>

            <SearchResults
                open={open}
                loading={loading}
                query={query}
                results={results}
                onSelect={() =>
                    setOpen(false)
                }
            />
        </div>
    );
});

SearchBox.displayName = "SearchBox";

export default SearchBox;