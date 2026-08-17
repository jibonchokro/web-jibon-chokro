import {
    ChevronRight,
    Hash,
} from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

import TagsExplorer from "@/components/tags/TagsExplorer";
import Container from "@/components/ui/Container";
import { getAllTagsWithCounts } from "@/services/post.service";

export const metadata: Metadata = {
    title: "সকল ট্যাগ",
    description:
        "জীবন চক্রের সকল ট্যাগ ব্রাউজ করুন এবং আপনার পছন্দের বিষয়ের লেখা খুঁজে নিন।",
};

export default async function TagsPage() {
    const tags = await getAllTagsWithCounts();

    return (
        <main className="py-8 sm:py-10 lg:py-12">
            <Container>

                {/* Breadcrumb */}

                <nav
                    aria-label="Breadcrumb"
                    className="mb-5 flex items-center gap-2 text-sm text-muted-foreground"
                >
                    <Link
                        href="/"
                        className="transition-colors hover:text-foreground"
                    >
                        হোম
                    </Link>

                    <ChevronRight
                        size={15}
                        className="shrink-0"
                    />

                    <span className="font-medium text-foreground">
                        সকল ট্যাগ
                    </span>
                </nav>

                {/* Header */}

                <section className="rounded-3xl border border-border bg-card p-5 shadow-sm sm:p-6 lg:p-8">

                    <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-border bg-muted px-4 py-2 text-sm font-medium text-foreground">
                        <Hash
                            size={16}
                            className="shrink-0 text-muted-foreground"
                        />

                        <span>
                            ট্যাগ
                        </span>
                    </div>

                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                        <div>
                            <h1 className="text-3xl font-black tracking-tight text-foreground sm:text-4xl lg:text-5xl">
                                সকল ট্যাগ
                            </h1>

                            <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground sm:text-base">
                                বিষয় অনুযায়ী লেখা খুঁজে নিতে জীবন চক্রের সকল ট্যাগ ব্রাউজ করুন।
                            </p>
                        </div>

                        {tags.length > 0 && (
                            <div className="inline-flex w-fit shrink-0 items-center rounded-full border border-border bg-background px-4 py-2 text-sm font-medium text-foreground">
                                মোট&nbsp;

                                <span className="font-bold">
                                    {tags.length}
                                </span>

                                &nbsp;টি ট্যাগ
                            </div>
                        )}

                    </div>

                </section>

                {/* Tags */}

                <section className="mt-8 rounded-3xl border border-border bg-card p-5 shadow-sm sm:p-6 lg:p-8">
                    <TagsExplorer tags={tags} />
                </section>

            </Container>
        </main>
    );
}