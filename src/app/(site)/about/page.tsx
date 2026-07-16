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
            <div className="space-y-12">

                {/* Hero */}

                <section className="rounded-3xl border bg-[#fcfcfc] p-8 md:p-12">

                    <div className="inline-flex rounded-full border bg-muted px-3 py-1 text-sm font-medium text-muted-foreground">
                        বাংলা জ্ঞানভিত্তিক প্ল্যাটফর্ম
                    </div>

                    <h2 className="mt-6 text-3xl font-bold tracking-tight text-foreground md:text-4xl">
                        জীবন চক্র কী?
                    </h2>

                    <p className="mt-6 text-lg leading-9 text-muted-foreground">
                        জীবন চক্র একটি আধুনিক বাংলা ব্লগ যেখানে শিক্ষা,
                        আত্মউন্নয়ন, ক্যারিয়ার, স্বাস্থ্য, সম্পর্ক, সমাজ,
                        জীবনযাপন এবং অনুপ্রেরণামূলক বিভিন্ন বিষয়ে
                        সহজ ভাষায় মানসম্পন্ন লেখা প্রকাশ করা হয়।
                    </p>

                    <p className="mt-5 text-lg leading-9 text-muted-foreground">
                        আমরা বিশ্বাস করি, একটি ভালো লেখা একজন মানুষের
                        চিন্তা, সিদ্ধান্ত এবং জীবনকে ইতিবাচকভাবে পরিবর্তন
                        করতে পারে। তাই প্রতিটি লেখা এমনভাবে তৈরি করা হয়
                        যাতে পাঠক শুধু তথ্যই না পান, বরং বাস্তব জীবনেও
                        সেটি কাজে লাগাতে পারেন।
                    </p>

                </section>

                {/* Mission */}

                <section className="grid gap-6 lg:grid-cols-2">

                    <div className="rounded-2xl border bg-[#fcfcfc] p-8">

                        <h3 className="text-2xl font-semibold">
                            আমাদের লক্ষ্য
                        </h3>

                        <p className="mt-5 leading-8 text-muted-foreground">
                            বাংলা ভাষাভাষী মানুষের জন্য একটি নির্ভরযোগ্য,
                            আধুনিক এবং সমৃদ্ধ জ্ঞানভাণ্ডার তৈরি করা,
                            যেখানে সহজ ভাষায় মানসম্পন্ন তথ্য পাওয়া যাবে।
                        </p>

                    </div>

                    <div className="rounded-2xl border bg-[#fcfcfc] p-8">

                        <h3 className="text-2xl font-semibold">
                            আমাদের উদ্দেশ্য
                        </h3>

                        <p className="mt-5 leading-8 text-muted-foreground">
                            তথ্যভিত্তিক, বাস্তবধর্মী এবং অনুপ্রেরণামূলক
                            কনটেন্ট প্রকাশের মাধ্যমে মানুষের জ্ঞান বৃদ্ধি,
                            সচেতনতা এবং আত্মউন্নয়নে সহায়তা করা।
                        </p>

                    </div>

                </section>

                {/* Topics */}

                <section>

                    <div className="mb-8">

                        <h2 className="text-3xl font-bold tracking-tight">
                            আমরা কী প্রকাশ করি?
                        </h2>

                        <p className="mt-3 text-muted-foreground">
                            বিভিন্ন বিষয়ে নিয়মিত নতুন নতুন লেখা প্রকাশ করা হয়।
                        </p>

                    </div>

                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">

                        {topics.map((topic) => (
                            <div
                                key={topic}
                                className="rounded-xl border bg-[#fcfcfc] px-5 py-4 font-medium transition-colors hover:bg-muted"
                            >
                                {topic}
                            </div>
                        ))}

                    </div>

                </section>

                {/* Values */}

                <section>

                    <div className="mb-8">

                        <h2 className="text-3xl font-bold tracking-tight">
                            আমাদের মূল্যবোধ
                        </h2>

                        <p className="mt-3 text-muted-foreground">
                            প্রতিটি সিদ্ধান্ত এবং প্রতিটি প্রকাশনার পেছনে
                            আমাদের মূল নীতিগুলো কাজ করে।
                        </p>

                    </div>

                    <div className="grid gap-6 md:grid-cols-2">

                        {values.map((value) => (
                            <div
                                key={value.title}
                                className="rounded-2xl border bg-[#fcfcfc] p-8 transition-all hover:-translate-y-1 hover:shadow-md"
                            >

                                <h3 className="text-xl font-semibold">
                                    {value.title}
                                </h3>

                                <p className="mt-4 leading-8 text-muted-foreground">
                                    {value.description}
                                </p>

                            </div>
                        ))}

                    </div>

                </section>

                {/* Stats */}

                <section className="rounded-3xl border bg-[#fcfcfc] p-10">

                    <h2 className="text-3xl font-bold">
                        কেন জীবন চক্র?
                    </h2>

                    <div className="mt-10 grid gap-8 md:grid-cols-3">

                        <div>

                            <h3 className="text-4xl font-bold">
                                100+
                            </h3>

                            <p className="mt-2 text-muted-foreground">
                                মানসম্পন্ন নিবন্ধ
                            </p>

                        </div>

                        <div>

                            <h3 className="text-4xl font-bold">
                                20+
                            </h3>

                            <p className="mt-2 text-muted-foreground">
                                বিভিন্ন বিভাগ
                            </p>

                        </div>

                        <div>

                            <h3 className="text-4xl font-bold">
                                প্রতিদিন
                            </h3>

                            <p className="mt-2 text-muted-foreground">
                                নতুন কনটেন্ট প্রকাশের লক্ষ্য
                            </p>

                        </div>

                    </div>

                </section>

                {/* CTA */}

                <section className="rounded-3xl border bg-[#fcfcfc] p-10 text-center">

                    <h2 className="text-3xl font-bold">
                        আপনার মতামত আমাদের কাছে গুরুত্বপূর্ণ
                    </h2>

                    <p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-muted-foreground">
                        কোনো পরামর্শ, মতামত অথবা সহযোগিতার বিষয়ে আমাদের
                        সঙ্গে যোগাযোগ করতে পারেন। আমরা সবসময় পাঠকদের
                        মূল্যবান মতামতকে স্বাগত জানাই।
                    </p>

                    <Link
                        href="/contact"
                        className="mt-8 inline-flex items-center rounded-xl bg-black px-8 py-4 font-medium text-white transition hover:bg-zinc-800"
                    >
                        যোগাযোগ করুন
                    </Link>

                </section>

            </div>
        </PageLayout>
    );
}