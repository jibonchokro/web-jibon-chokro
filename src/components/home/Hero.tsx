import SearchBox from "@/components/search/SearchBox";
import Container from "@/components/ui/Container";
import {
    ArrowRight,
    BookOpen,
    Sparkles,
    Users
} from "lucide-react";
import Link from "next/link";

export default function Hero() {
    return (
        <section className="relative overflow-hidden border-b border-[#e7e7e7] bg-gradient-to-b from-green-50 via-white to-white">

            {/* Background */}

            <div className="absolute left-1/2 top-0 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-green-200/30 blur-3xl" />

            <Container>

                <div className="relative mx-auto flex max-w-5xl flex-col items-center py-15 text-center lg:py-15">

                    {/* Badge */}

                    <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-green-200 bg-green-100 px-5 py-2 text-sm font-semibold text-green-700">

                        <Sparkles size={16} />

                        প্রতিদিন নতুন কিছু শিখুন

                    </div>

                    {/* Title */}

                    <h1 className="max-w-4xl text-[40px] font-black leading-tight tracking-tight text-gray-900 md:text-[45px]">
                        জীবনকে সমৃদ্ধ করার
                        <span className="block text-green-700">
                            বাংলা জ্ঞানভান্ডার
                        </span>
                    </h1>

                    {/* Description */}

                    <p className="mt-8 max-w-3xl text-lg leading-9 text-gray-600 md:text-xl">
                        জীবন চক্রে পাবেন অনুপ্রেরণামূলক লেখা, বাস্তব জীবনের শিক্ষা,
                        সফলতার গল্প, ইসলামিক জ্ঞান, ক্যারিয়ার, প্রযুক্তি,
                        স্বাস্থ্য, সম্পর্ক, উক্তি এবং আরও অনেক মূল্যবান বাংলা
                        কনটেন্ট।
                    </p>

                    {/* Search */}

                    <div className="mt-12 flex w-full max-w-2xl">
                        <SearchBox />
                    </div>

                    {/* Popular Search */}

                    <div className="mt-6 flex flex-wrap items-center justify-center gap-3">

                        <span className="text-sm text-gray-500">
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
                                className="rounded-full border border-[#e7e7e7] bg-white px-4 py-2 text-sm transition hover:border-green-600 hover:bg-green-50 hover:text-green-700"
                            >
                                {item}
                            </Link>
                        ))}

                    </div>

                    {/* CTA */}

                    <div className="mt-12 flex flex-wrap justify-center gap-4">

                        <Link
                            href="/posts"
                            className="inline-flex items-center gap-2 rounded-xl bg-green-700 px-7 py-3.5 font-semibold text-white transition hover:bg-green-800"
                        >
                            সব লেখা পড়ুন

                            <ArrowRight size={18} />
                        </Link>

                        <Link
                            href="/categories"
                            className="rounded-xl border border-[#e7e7e7] bg-white px-7 py-3.5 font-semibold text-gray-700 transition hover:border-green-600 hover:bg-green-50 hover:text-green-700"
                        >
                            বিভাগসমূহ
                        </Link>

                    </div>

                    {/* Stats */}

                    <div className="mt-16 grid w-full max-w-3xl grid-cols-3 gap-5">

                        <div className="rounded-2xl border border-[#e7e7e7] bg-white p-6">

                            <BookOpen
                                size={24}
                                className="mx-auto text-green-700"
                            />

                            <h3 className="mt-3 text-3xl font-bold text-gray-900">
                                ৫০০+
                            </h3>

                            <p className="mt-1 text-sm text-gray-500">
                                প্রকাশিত লেখা
                            </p>

                        </div>

                        <div className="rounded-2xl border border-[#e7e7e7] bg-white p-6">

                            <Users
                                size={24}
                                className="mx-auto text-green-700"
                            />

                            <h3 className="mt-3 text-3xl font-bold text-gray-900">
                                ১০K+
                            </h3>

                            <p className="mt-1 text-sm text-gray-500">
                                মাসিক পাঠক
                            </p>

                        </div>

                        <div className="rounded-2xl border border-[#e7e7e7] bg-white p-6">

                            <Sparkles
                                size={24}
                                className="mx-auto text-green-700"
                            />

                            <h3 className="mt-3 text-3xl font-bold text-gray-900">
                                ২৫+
                            </h3>

                            <p className="mt-1 text-sm text-gray-500">
                                বিষয়ভিত্তিক বিভাগ
                            </p>

                        </div>

                    </div>

                </div>

            </Container>

        </section>
    );
}