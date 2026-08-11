import {
    ArrowRight,
    FileText,
    Search,
} from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

import SearchBox from "@/components/search/SearchBox";
import SearchResultsPage from "@/components/search/SearchResultsPage";
import Container from "@/components/ui/Container";

import { searchPosts } from "@/services/search.service";

interface Props {
    searchParams: Promise<{
        q?: string;
    }>;
}

export const metadata: Metadata = {
    title: "সার্চ",
    description:
        "জীবন চক্রে আপনার পছন্দের লেখা খুঁজুন।",
};

export default async function SearchPage({
    searchParams,
}: Props) {
    const { q } = await searchParams;

    const query = q?.trim() ?? "";

    const posts =
        query.length >= 2
            ? await searchPosts(query, {
                page: 1,
                limit: 16,
            })
            : [];

    return (
        <main className="py-5 sm:py-8 lg:py-10">

            <Container>

                {/* Search Header */}

                <section
                    className="
                        mb-6
                        rounded-xl
                        border
                        border-[#f0f0f0]
                        bg-white
                        shadow-custom
                        sm:mb-8
                    "
                >

                    <div className="px-4 py-6 sm:px-6 sm:py-8 lg:px-8">

                        {/* Heading */}

                        <div className="flex items-start gap-3">

                            <div
                                className="
                                    flex
                                    size-10
                                    shrink-0
                                    items-center
                                    justify-center
                                    rounded-lg
                                    bg-muted
                                    text-foreground
                                    sm:size-11
                                "
                            >
                                <Search className="size-5" />
                            </div>


                            <div className="min-w-0">

                                <h1
                                    className="
                                        text-xl
                                        font-bold
                                        tracking-tight
                                        text-foreground
                                        sm:text-2xl
                                    "
                                >
                                    সার্চ করুন
                                </h1>

                                <p
                                    className="
                                        mt-1
                                        text-sm
                                        leading-6
                                        text-muted-foreground
                                    "
                                >
                                    আপনার প্রয়োজনীয় লেখা খুঁজে নিন।
                                </p>

                            </div>

                        </div>


                        {/* Search Box */}

                        <div className="mt-5 sm:mt-6">

                            <SearchBox />

                        </div>


                        {/* Search Information */}

                        {query && (
                            <div
                                className="
                                    mt-4
                                    flex
                                    flex-wrap
                                    items-center
                                    gap-2
                                    text-sm
                                "
                            >

                                <span className="text-muted-foreground">
                                    অনুসন্ধান:
                                </span>

                                <span
                                    className="
                                        max-w-full
                                        truncate
                                        rounded-full
                                        border
                                        border-black/10
                                        bg-muted
                                        px-3
                                        py-1
                                        font-medium
                                        text-foreground
                                    "
                                >
                                    {query}
                                </span>

                                <span className="text-muted-foreground">
                                    •
                                </span>

                                <span className="text-muted-foreground">
                                    {posts.length} টি ফলাফল
                                </span>

                            </div>
                        )}

                    </div>

                </section>


                {/* Empty Search */}

                {query.length < 2 && (

                    <div
                        className="
                            flex
                            min-h-[300px]
                            flex-col
                            items-center
                            justify-center
                            rounded-xl
                            border
                            border-dashed
                            border-black/10
                            bg-white
                            px-6
                            text-center
                        "
                    >

                        <div
                            className="
                                flex
                                size-14
                                items-center
                                justify-center
                                rounded-full
                                bg-muted
                            "
                        >
                            <Search
                                className="
                                    size-6
                                    text-muted-foreground
                                "
                            />
                        </div>


                        <h2
                            className="
                                mt-5
                                text-lg
                                font-semibold
                                text-foreground
                                sm:text-xl
                            "
                        >
                            কিছু লিখে সার্চ করুন
                        </h2>


                        <p
                            className="
                                mt-2
                                max-w-md
                                text-sm
                                leading-6
                                text-muted-foreground
                            "
                        >
                            কমপক্ষে ২টি অক্ষর লিখে আপনার
                            প্রয়োজনীয় লেখা খুঁজে নিন।
                        </p>

                    </div>

                )}


                {/* No Results */}

                {query.length >= 2 &&
                    posts.length === 0 && (

                        <div
                            className="
                                flex
                                min-h-[300px]
                                flex-col
                                items-center
                                justify-center
                                rounded-xl
                                border
                                border-dashed
                                border-black/10
                                bg-white
                                px-6
                                text-center
                            "
                        >

                            <div
                                className="
                                    flex
                                    size-14
                                    items-center
                                    justify-center
                                    rounded-full
                                    bg-muted
                                "
                            >
                                <FileText
                                    className="
                                        size-6
                                        text-muted-foreground
                                    "
                                />
                            </div>


                            <h2
                                className="
                                    mt-5
                                    text-lg
                                    font-semibold
                                    text-foreground
                                    sm:text-xl
                                "
                            >
                                কোনো লেখা পাওয়া যায়নি
                            </h2>


                            <p
                                className="
                                    mt-2
                                    max-w-md
                                    text-sm
                                    leading-6
                                    text-muted-foreground
                                "
                            >
                                অন্য কোনো শব্দ দিয়ে আবার চেষ্টা
                                করুন অথবা সব লেখা দেখুন।
                            </p>


                            <Link
                                href="/posts"
                                className="
                                    mt-5
                                    inline-flex
                                    items-center
                                    gap-2
                                    rounded-lg
                                    bg-primary
                                    px-4
                                    py-2.5
                                    text-sm
                                    font-medium
                                    text-primary-foreground
                                    transition-opacity
                                    hover:opacity-90
                                "
                            >
                                সব লেখা দেখুন

                                <ArrowRight className="size-4" />

                            </Link>

                        </div>

                    )}


                {/* Results */}

                {posts.length > 0 && (

                    <SearchResultsPage
                        initialPosts={posts}
                        query={query}
                    />

                )}

            </Container>

        </main>
    );
}