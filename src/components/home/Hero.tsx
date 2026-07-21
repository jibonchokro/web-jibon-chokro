import SearchBox from "@/components/search/SearchBox";
import Container from "@/components/ui/Container";
import {
    ArrowRight,
    BookOpen,
    Sparkles,
    Users,
} from "lucide-react";
import Link from "next/link";

export default function Hero() {
    return (
        <section className="relative overflow-hidden border-b border-black/10 bg-gradient-to-b from-red-50/50 via-background to-background">

            {/* Background Blur */}

            <div className="absolute left-1/2 top-[-80px] h-[450px] w-[450px] -translate-x-1/2 rounded-full bg-red-300/20 blur-3xl" />
            <Container>

                <div className="relative mx-auto flex max-w-5xl flex-col items-center py-8 text-center sm:py-10 lg:py-14">

                    {/* Badge */}

                    <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-black/25 bg-black/20 px-4 py-2 text-sm font-medium text-muted-foreground">

                        <Sparkles size={15} />

                        প্রতিদিন নতুন কিছু শিখুন

                    </div>


                    {/* Title */}

                    <h1 className="max-w-4xl text-4xl font-black leading-tight tracking-tight text-foreground sm:text-5xl lg:text-6xl">

                        <span className="block text-red-500">
                            জীবনকে সমৃদ্ধ করার
                        </span>

                        <span className="text-3xl sm:text-4xl lg:text-5xl block font-black">
                            বাংলা জ্ঞানভান্ডার
                        </span>

                    </h1>


                    {/* Description */}

                    <p className="mt-6 max-w-3xl text-base leading-8 text-muted-foreground sm:mt-8 sm:text-md lg:text-xl">

                        জীবন চক্রে পাবেন অনুপ্রেরণামূলক লেখা,
                        বাস্তব জীবনের শিক্ষা, সফলতার গল্প,
                        ইসলামিক জ্ঞান, ক্যারিয়ার, প্রযুক্তি,
                        স্বাস্থ্য, সম্পর্ক, উক্তি এবং আরও অনেক
                        মূল্যবান বাংলা কনটেন্ট।

                    </p>


                    {/* Search */}

                    <div className="mt-8 flex w-full justify-center sm:mt-10">

                        <SearchBox className="w-full max-w-[520px]" />

                    </div>


                    {/* Popular Search */}

                    <div className="mt-6 flex flex-wrap items-center justify-center gap-2 sm:gap-3">

                        <span className="text-sm text-muted-foreground">
                            জনপ্রিয়:
                        </span>


                        {[
                            "উক্তি",
                            "ইসলাম",
                            "সফলতা",
                            "ক্যারিয়ার",
                            "প্রযুক্তি",
                            "স্বাস্থ্য",
                        ].map((item) => (

                            <Link
                                key={item}
                                href={`/search?q=${encodeURIComponent(item)}`}
                                className="rounded-full border border-black/10 bg-white px-3 py-1.5 text-sm text-muted-foreground transition hover:bg-muted hover:text-foreground"
                            >
                                {item}
                            </Link>

                        ))}

                    </div>


                    {/* CTA */}

                    <div className="mt-6 flex w-full justify-center gap-3 sm:mt-8 flex-row">

                        <Link
                            href="/posts"
                            className="inline-flex items-center justify-center gap-2 rounded-xl bg-black px-5 py-2 text-sm font-semibold text-white transition hover:opacity-90"
                        >

                            সব লেখা পড়ুন

                            <ArrowRight size={18} />

                        </Link>


                        <Link
                            href="/categories"
                            className="inline-flex items-center justify-center rounded-xl border border-black/10 bg-white px-7 py-2 text-sm font-semibold text-foreground transition hover:bg-muted"
                        >

                            বিভাগসমূহ

                        </Link>

                    </div>


                    {/* Stats */}

                    <div className="mt-8 grid w-full max-w-3xl grid-cols-3 gap-2 sm:mt-10 sm:gap-5">

                        <div className="rounded-2xl border border-black/7 bg-white px-2 py-3 shadow-xs transition hover:shadow-sm sm:px-6 sm:py-6">

                            <BookOpen
                                size={20}
                                className="mx-auto text-foreground sm:size-6"
                            />

                            <h3 className="mt-2 text-xl font-bold text-foreground sm:mt-3 sm:text-3xl">
                                ৫০০+
                            </h3>

                            <p className="mt-1 text-xs text-muted-foreground sm:text-sm">
                                প্রকাশিত লেখা
                            </p>

                        </div>


                        <div className="rounded-2xl border border-black/7 bg-white px-2 py-3 shadow-xs transition hover:shadow-sm sm:px-6 sm:py-6">

                            <Users
                                size={20}
                                className="mx-auto text-foreground sm:size-6"
                            />

                            <h3 className="mt-2 text-xl font-bold text-foreground sm:mt-3 sm:text-3xl">
                                ১০K+
                            </h3>

                            <p className="mt-1 text-xs text-muted-foreground sm:text-sm">
                                মাসিক পাঠক
                            </p>

                        </div>


                        <div className="rounded-2xl border border-black/7 bg-white px-2 py-3 shadow-xs transition hover:shadow-sm sm:px-6 sm:py-6">

                            <Sparkles
                                size={20}
                                className="mx-auto text-foreground sm:size-6"
                            />

                            <h3 className="mt-2 text-xl font-bold text-foreground sm:mt-3 sm:text-3xl">
                                ২৫+
                            </h3>

                            <p className="mt-1 text-xs text-muted-foreground sm:text-sm">
                                বিষয়ভিত্তিক বিভাগ
                            </p>

                        </div>

                    </div>

                </div>

            </Container>

        </section>
    );
}