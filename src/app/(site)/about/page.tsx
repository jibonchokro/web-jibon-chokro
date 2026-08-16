import type { Metadata } from "next";
import Link from "next/link";

import PageLayout from "@/components/page/PageLayout";

export const metadata: Metadata = {
    title: "আমাদের সম্পর্কে",
    description:
        "জীবন চক্র সম্পর্কে জানুন। আমাদের লক্ষ্য, মূল্যবোধ এবং কেন আমরা বাংলা ভাষায় মানসম্পন্ন কনটেন্ট প্রকাশ করি।",
};

const values = [
    {
        title: "বিশ্বস্ততা",
        description:
            "প্রকাশিত প্রতিটি লেখা প্রকাশের আগে যথাসম্ভব যাচাই-বাছাই করা হয়।",
    },
    {
        title: "মানসম্পন্ন কনটেন্ট",
        description:
            "সহজ ভাষায় নির্ভুল, তথ্যবহুল এবং দীর্ঘমেয়াদে উপকারী লেখা প্রকাশ করা আমাদের অঙ্গীকার।",
    },
    {
        title: "নিয়মিত প্রকাশনা",
        description:
            "নতুন নতুন বিষয়ে ধারাবাহিকভাবে মানসম্পন্ন লেখা প্রকাশের চেষ্টা করি।",
    },
    {
        title: "পাঠককেন্দ্রিক",
        description:
            "পাঠকের প্রয়োজন, অভিজ্ঞতা এবং উপকারিতাকেই সর্বোচ্চ গুরুত্ব দেওয়া হয়।",
    },
];

const topics = [
    "আত্মউন্নয়ন",
    "শিক্ষা",
    "ক্যারিয়ার",
    "বাস্তব জীবনের গল্প",
    "অনুপ্রেরণামূলক লেখা",
    "সম্পর্ক",
    "স্বাস্থ্য",
    "জীবনযাপন",
    "সমাজ ও সমসাময়িক বিষয়",
    "উক্তি",
    "ইসলামিক লেখা",
    "সফলতার গল্প",
];

export default function AboutPage() {
    return (
        <PageLayout
            title="আমাদের সম্পর্কে"
            description="জীবন চক্র একটি আধুনিক বাংলা জ্ঞানভিত্তিক প্ল্যাটফর্ম যেখানে নির্ভরযোগ্য তথ্য, অনুপ্রেরণা এবং বাস্তব জীবনের অভিজ্ঞতা একসাথে তুলে ধরা হয়।"
        >
            <div className="space-y-8 md:space-y-10 lg:space-y-12">
                {/* Hero */}
                <section className="rounded-2xl border border-border bg-card p-5 shadow-custom sm:p-6 md:rounded-3xl md:p-8 lg:p-10">
                    <div className="inline-flex rounded-full border border-border bg-muted px-2.5 py-1 text-xs font-medium text-muted-foreground sm:px-3 sm:text-sm">
                        বাংলা জ্ঞানভিত্তিক প্ল্যাটফর্ম
                    </div>

                    <h2 className="mt-4 text-2xl font-bold tracking-tight text-foreground sm:mt-5 sm:text-3xl lg:mt-6 lg:text-4xl">
                        জীবন চক্র কী?
                    </h2>

                    <div className="mt-5 max-w-4xl space-y-4 sm:mt-6 sm:space-y-5">
                        <p className="text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8 lg:leading-9">
                            জীবন চক্র একটি আধুনিক বাংলা ব্লগ যেখানে শিক্ষা,
                            আত্মউন্নয়ন, ক্যারিয়ার, স্বাস্থ্য, সম্পর্ক, সমাজ,
                            জীবনযাপন এবং অনুপ্রেরণামূলক বিভিন্ন বিষয়ে
                            সহজ ভাষায় মানসম্পন্ন লেখা প্রকাশ করা হয়।
                        </p>

                        <p className="text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8 lg:leading-9">
                            আমরা বিশ্বাস করি, একটি ভালো লেখা একজন মানুষের
                            চিন্তা, সিদ্ধান্ত এবং জীবনকে ইতিবাচকভাবে পরিবর্তন
                            করতে পারে। তাই প্রতিটি লেখা এমনভাবে তৈরি করা হয়
                            যাতে পাঠক শুধু তথ্যই না পান, বরং বাস্তব জীবনেও
                            সেটি কাজে লাগাতে পারেন।
                        </p>
                    </div>
                </section>

                {/* Mission */}
                <section className="grid gap-4 sm:gap-5 lg:grid-cols-2 lg:gap-6">
                    <div className="rounded-2xl border border-border bg-card p-5 shadow-custom sm:p-6 md:p-8">
                        <h3 className="text-xl font-semibold text-foreground sm:text-2xl">
                            আমাদের লক্ষ্য
                        </h3>

                        <p className="mt-4 text-sm leading-7 text-muted-foreground sm:mt-5 sm:text-base sm:leading-8">
                            বাংলা ভাষাভাষী মানুষের জন্য একটি নির্ভরযোগ্য,
                            আধুনিক এবং সমৃদ্ধ জ্ঞানভাণ্ডার তৈরি করা,
                            যেখানে সহজ ভাষায় মানসম্পন্ন তথ্য পাওয়া যাবে।
                        </p>
                    </div>

                    <div className="rounded-2xl border border-border bg-card p-5 shadow-custom sm:p-6 md:p-8">
                        <h3 className="text-xl font-semibold text-foreground sm:text-2xl">
                            আমাদের উদ্দেশ্য
                        </h3>

                        <p className="mt-4 text-sm leading-7 text-muted-foreground sm:mt-5 sm:text-base sm:leading-8">
                            তথ্যভিত্তিক, বাস্তবধর্মী এবং অনুপ্রেরণামূলক
                            কনটেন্ট প্রকাশের মাধ্যমে মানুষের জ্ঞান বৃদ্ধি,
                            সচেতনতা এবং আত্মউন্নয়নে সহায়তা করা।
                        </p>
                    </div>
                </section>

                {/* Topics */}
                <section>
                    <div className="mb-6 sm:mb-8">
                        <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                            আমরা কী প্রকাশ করি?
                        </h2>

                        <p className="mt-3 max-w-3xl text-sm leading-7 text-muted-foreground sm:text-base sm:leading-8">
                            বিভিন্ন বিষয়ে নিয়মিত নতুন নতুন লেখা প্রকাশ করা হয়।
                        </p>
                    </div>

                    <div className="grid gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
                        {topics.map((topic) => (
                            <div
                                key={topic}
                                className="rounded-xl border border-border bg-card px-4 py-3 text-sm font-medium text-foreground shadow-custom transition-colors hover:bg-muted sm:px-5 sm:py-4 sm:text-base"
                            >
                                {topic}
                            </div>
                        ))}
                    </div>
                </section>

                {/* Values */}
                <section>
                    <div className="mb-6 sm:mb-8">
                        <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                            আমাদের মূল্যবোধ
                        </h2>

                        <p className="mt-3 max-w-3xl text-sm leading-7 text-muted-foreground sm:text-base sm:leading-8">
                            প্রতিটি সিদ্ধান্ত এবং প্রতিটি প্রকাশনার পেছনে
                            আমাদের মূল নীতিগুলো কাজ করে।
                        </p>
                    </div>

                    <div className="grid gap-4 sm:gap-5 md:grid-cols-2 md:gap-6">
                        {values.map((value) => (
                            <div
                                key={value.title}
                                className="rounded-xl border border-border bg-card p-5 shadow-custom sm:rounded-2xl sm:p-6 md:p-8"
                            >
                                <h3 className="text-lg font-semibold text-foreground sm:text-xl">
                                    {value.title}
                                </h3>

                                <p className="mt-3 text-sm leading-7 text-muted-foreground sm:mt-4 sm:text-base sm:leading-8">
                                    {value.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Stats */}
                <section className="rounded-2xl border border-border bg-card p-5 shadow-custom sm:p-6 md:rounded-3xl md:p-8 lg:p-10">
                    <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                        কেন জীবন চক্র?
                    </h2>

                    <div className="mt-6 grid gap-5 sm:mt-8 sm:grid-cols-2 lg:mt-10 lg:grid-cols-3 lg:gap-8">
                        <div className="rounded-xl border border-border bg-background p-5 text-center sm:text-left">
                            <h3 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                                100+
                            </h3>

                            <p className="mt-2 text-sm leading-7 text-muted-foreground sm:text-base">
                                মানসম্পন্ন নিবন্ধ
                            </p>
                        </div>

                        <div className="rounded-xl border border-border bg-background p-5 text-center sm:text-left">
                            <h3 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                                20+
                            </h3>

                            <p className="mt-2 text-sm leading-7 text-muted-foreground sm:text-base">
                                বিভিন্ন বিভাগ
                            </p>
                        </div>

                        <div className="rounded-xl border border-border bg-background p-5 text-center sm:col-span-2 sm:text-left lg:col-span-1">
                            <h3 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                                প্রতিদিন
                            </h3>

                            <p className="mt-2 text-sm leading-7 text-muted-foreground sm:text-base">
                                নতুন কনটেন্ট প্রকাশের লক্ষ্য
                            </p>
                        </div>
                    </div>
                </section>

                {/* CTA */}
                <section className="rounded-2xl border border-border bg-card p-6 text-center shadow-custom sm:rounded-3xl sm:p-8 md:p-10">
                    <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                        আপনার মতামত আমাদের কাছে গুরুত্বপূর্ণ
                    </h2>

                    <p className="mx-auto mt-5 max-w-3xl text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
                        কোনো পরামর্শ, মতামত অথবা সহযোগিতার বিষয়ে আমাদের
                        সঙ্গে যোগাযোগ করতে পারেন। আমরা সবসময় পাঠকদের
                        মূল্যবান মতামতকে স্বাগত জানাই।
                    </p>

                    <Link
                        href="/contact"
                        className="mt-8 inline-flex w-full items-center justify-center rounded-xl bg-foreground px-6 py-3.5 text-sm font-medium text-background transition-all duration-200 hover:bg-foreground/90 sm:w-auto sm:px-8 sm:py-4 sm:text-base"
                    >
                        যোগাযোগ করুন
                    </Link>
                </section>
            </div>
        </PageLayout>
    );
}