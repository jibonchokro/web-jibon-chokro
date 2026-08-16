"use client";

import SearchBox from "@/components/search/SearchBox";
import {
    Home,
    RefreshCcw,
} from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";

export default function Error({
    error,
    reset,
}: {
    error: Error;
    reset: () => void;
}) {
    useEffect(() => {
        console.error(error);
    }, [error]);

    return (
        <main className="mx-auto flex min-h-[calc(100vh-8rem)] max-w-7xl items-center px-6 py-16">
            <div className="mx-auto w-full max-w-3xl text-center">

                {/* Badge */}

                <div className="inline-flex rounded-full border border-border bg-muted px-4 py-1 text-sm font-medium text-muted-foreground">
                    Error
                </div>

                {/* Title */}

                <h1 className="mt-6 text-6xl font-black tracking-tight text-destructive sm:text-7xl">
                    Oops!
                </h1>

                <h2 className="mt-6 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                    কিছু একটা ভুল হয়েছে
                </h2>

                {/* Description */}

                <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
                    অনাকাঙ্ক্ষিত একটি সমস্যা হয়েছে। এটি সাময়িক হতে পারে।
                    অনুগ্রহ করে আবার চেষ্টা করুন অথবা অন্য কোনো পৃষ্ঠায় যান।
                </p>

                {/* Search */}

                <div className="mx-auto mt-10 w-full max-w-2xl">
                    <SearchBox className="w-full" />
                </div>

                {/* Actions */}

                <div className="mt-8 flex flex-wrap items-center justify-center gap-3">

                    <button
                        type="button"
                        onClick={reset}
                        className="inline-flex items-center gap-2 rounded-lg bg-foreground px-5 py-3 text-sm font-medium text-background shadow-sm transition-colors hover:bg-foreground/90"
                    >
                        <RefreshCcw size={18} />
                        আবার চেষ্টা করুন
                    </button>

                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 rounded-lg border border-border bg-background px-5 py-3 text-sm font-medium text-foreground shadow-sm transition-colors hover:bg-muted"
                    >
                        <Home size={18} />
                        হোমপেজ
                    </Link>

                </div>

                {/* Helpful Links */}

                <div className="mt-14 border-t border-border pt-8">

                    <p className="mb-5 text-sm font-medium uppercase tracking-wide text-muted-foreground">
                        আপনি হয়তো খুঁজছেন
                    </p>

                    <div className="flex flex-wrap justify-center gap-3">

                        {[
                            ["সকল লেখা", "/posts"],
                            ["বিভাগসমূহ", "/categories"],
                            ["আমাদের সম্পর্কে", "/about"],
                            ["যোগাযোগ", "/contact"],
                            ["গোপনীয়তা নীতি", "/privacy"],
                            ["ব্যবহারের শর্তাবলী", "/terms"],
                        ].map(([label, href]) => (
                            <Link
                                key={href}
                                href={href}
                                className="rounded-full border border-border bg-background px-4 py-2 text-sm text-muted-foreground shadow-sm transition-colors hover:bg-muted hover:text-foreground"
                            >
                                {label}
                            </Link>
                        ))}

                    </div>

                </div>

                {/* Footer */}

                <p className="mt-12 text-sm text-muted-foreground">
                    সমস্যাটি বারবার হলে{" "}
                    <Link
                        href="/contact"
                        className="font-medium text-foreground underline underline-offset-4 transition-colors hover:text-foreground/80"
                    >
                        আমাদের জানান
                    </Link>
                    ।
                </p>

            </div>
        </main>
    );
}