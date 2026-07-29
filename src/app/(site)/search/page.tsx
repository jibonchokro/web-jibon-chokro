import {
    ArrowRight,
    FileText,
    Search,
} from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

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
        <main className="py-6 sm:py-8 lg:py-10">

            <Container>

                {/* Header */}

                <section className="mb-8 rounded-2xl border border-border bg-white px-5 py-7 sm:px-8 sm:py-9">

                    <div className="flex items-center gap-3">

                        <div className="flex size-11 items-center justify-center rounded-xl bg-black/5 text-primary">
                            <Search className="size-5" />
                        </div>


                        <div>

                            <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
                                সার্চ ফলাফল
                            </h1>


                            <p className="mt-1 text-sm text-muted-foreground sm:text-base">
                                আপনার প্রয়োজনীয় লেখা সহজে খুঁজে নিন।
                            </p>

                        </div>

                    </div>


                    {query && (
                        <div className="mt-5 flex flex-wrap items-center gap-2 text-sm">

                            <span className="text-muted-foreground">
                                অনুসন্ধান:
                            </span>


                            <span className="rounded-full border border-border bg-black/5 px-3 py-1 font-medium">
                                {query}
                            </span>


                            <span className="text-muted-foreground">
                                —
                            </span>


                            <span className="font-medium">
                                {posts.length} টি ফলাফল
                            </span>

                        </div>
                    )}

                </section>



                {/* Empty search */}

                {query.length < 2 && (

                    <div className="flex min-h-[320px] flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-background px-6 text-center">

                        <div className="flex size-16 items-center justify-center rounded-full bg-muted">

                            <Search className="size-7 text-muted-foreground" />

                        </div>


                        <h2 className="mt-5 text-xl font-semibold">
                            কিছু লিখে সার্চ করুন
                        </h2>


                        <p className="mt-2 max-w-md text-sm leading-6 text-muted-foreground">
                            কমপক্ষে ২টি অক্ষর লিখলে আপনার পছন্দের লেখা খুঁজে পাওয়া যাবে।
                        </p>

                    </div>

                )}



                {/* No result */}

                {query.length >= 2 &&
                    posts.length === 0 && (

                        <div className="flex min-h-[320px] flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-background px-6 text-center">


                            <div className="flex size-16 items-center justify-center rounded-full bg-muted">

                                <FileText className="size-7 text-muted-foreground" />

                            </div>


                            <h2 className="mt-5 text-xl font-semibold">
                                কোনো লেখা পাওয়া যায়নি
                            </h2>


                            <p className="mt-2 max-w-md text-sm leading-6 text-muted-foreground">
                                অন্য কোনো শব্দ দিয়ে আবার চেষ্টা করুন অথবা সব লেখা দেখুন।
                            </p>


                            <Link
                                href="/posts"
                                className="mt-6 inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition hover:opacity-90"
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