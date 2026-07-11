import type { Metadata } from "next";
import Link from "next/link";

import PageLayout from "@/components/page/PageLayout";

export const metadata: Metadata = {
    title: "আমাদের সম্পর্কে",
    description:
        "জীবন চক্র সম্পর্কে জানুন। আমাদের লক্ষ্য, উদ্দেশ্য এবং কেন আমরা বাংলা ভাষায় মানসম্পন্ন কনটেন্ট প্রকাশ করি।",
};

const values = [
    {
        title: "বিশ্বস্ততা",
        description:
            "প্রকাশিত প্রতিটি লেখা যথাসম্ভব যাচাই-বাছাই করে পাঠকদের সামনে উপস্থাপন করা হয়।",
    },
    {
        title: "মানসম্পন্ন কনটেন্ট",
        description:
            "তথ্যবহুল, সহজবোধ্য এবং পাঠকের জন্য কার্যকর কনটেন্ট প্রকাশ করাই আমাদের লক্ষ্য।",
    },
    {
        title: "নিয়মিত প্রকাশনা",
        description:
            "বিভিন্ন বিষয়ে ধারাবাহিকভাবে নতুন নতুন নিবন্ধ প্রকাশ করা হয়।",
    },
    {
        title: "পাঠককেন্দ্রিক",
        description:
            "পাঠকের প্রয়োজন, আগ্রহ ও উপকারিতাকে সর্বোচ্চ গুরুত্ব দেওয়া হয়।",
    },
];

export default function AboutPage() {
    return (
        <PageLayout
            title="আমাদের সম্পর্কে"
            description="জীবন চক্র একটি আধুনিক বাংলা ব্লগ যেখানে জ্ঞান, অনুপ্রেরণা এবং বাস্তব জীবনের অভিজ্ঞতা একসাথে তুলে ধরা হয়।"
        >
            <section className="space-y-8">

                <div className="rounded-3xl border border-green-100 bg-gradient-to-br from-green-50 via-white to-emerald-50 p-8 shadow-sm md:p-12">
                    <h2 className="text-3xl font-bold text-gray-900">
                        জীবন চক্র কী?
                    </h2>

                    <p className="mt-6 text-lg leading-9 text-gray-700">
                        জীবন চক্র একটি বাংলা জ্ঞানভিত্তিক ব্লগ, যেখানে শিক্ষা,
                        আত্মউন্নয়ন, অনুপ্রেরণা, জীবনযাপন, সম্পর্ক, ক্যারিয়ার,
                        স্বাস্থ্য, সমাজ এবং সমসাময়িক বিভিন্ন বিষয় নিয়ে সহজ
                        ভাষায় মানসম্পন্ন লেখা প্রকাশ করা হয়।
                    </p>

                    <p className="mt-5 text-lg leading-9 text-gray-700">
                        আমরা বিশ্বাস করি, একটি ভালো লেখা একজন মানুষের চিন্তা,
                        সিদ্ধান্ত এবং জীবনকে ইতিবাচকভাবে প্রভাবিত করতে পারে।
                        তাই প্রতিটি নিবন্ধ এমনভাবে তৈরি করার চেষ্টা করা হয় যাতে
                        পাঠক শুধু তথ্যই না পান, বরং বাস্তব জীবনেও তার উপকার
                        করতে পারেন।
                    </p>
                </div>

                <div className="grid gap-6 lg:grid-cols-2">

                    <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
                        <h2 className="text-2xl font-bold">
                            আমাদের লক্ষ্য
                        </h2>

                        <p className="mt-5 leading-8 text-gray-700">
                            বাংলা ভাষাভাষী মানুষের জন্য একটি নির্ভরযোগ্য,
                            আধুনিক এবং সমৃদ্ধ জ্ঞানভাণ্ডার তৈরি করা যেখানে
                            পাঠক বিভিন্ন বিষয়ে সহজেই মানসম্পন্ন তথ্য খুঁজে
                            পাবেন।
                        </p>
                    </div>

                    <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
                        <h2 className="text-2xl font-bold">
                            আমাদের উদ্দেশ্য
                        </h2>

                        <p className="mt-5 leading-8 text-gray-700">
                            তথ্যভিত্তিক, বাস্তবধর্মী এবং অনুপ্রেরণামূলক কনটেন্ট
                            প্রকাশের মাধ্যমে পাঠকদের জ্ঞান বৃদ্ধি এবং
                            আত্মউন্নয়নে সহায়তা করা।
                        </p>
                    </div>

                </div>

                <section>
                    <h2 className="text-3xl font-bold">
                        আমরা কী ধরনের লেখা প্রকাশ করি?
                    </h2>

                    <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">

                        {[
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
                        ].map((item) => (
                            <div
                                key={item}
                                className="rounded-xl border border-gray-200 bg-gray-50 px-5 py-4 font-medium transition hover:border-green-600 hover:bg-green-50"
                            >
                                {item}
                            </div>
                        ))}

                    </div>
                </section>

                <section>
                    <h2 className="text-3xl font-bold">
                        আমাদের মূল্যবোধ
                    </h2>

                    <div className="mt-8 grid gap-6 md:grid-cols-2">

                        {values.map((value) => (
                            <div
                                key={value.title}
                                className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
                            >
                                <h3 className="text-xl font-bold text-green-700">
                                    {value.title}
                                </h3>

                                <p className="mt-4 leading-8 text-gray-700">
                                    {value.description}
                                </p>
                            </div>
                        ))}

                    </div>
                </section>

                <section className="rounded-3xl bg-gray-900 p-10 text-white">

                    <h2 className="text-3xl font-bold">
                        কেন জীবন চক্র?
                    </h2>

                    <div className="mt-8 grid gap-8 md:grid-cols-3">

                        <div>
                            <h3 className="text-4xl font-bold text-green-400">
                                100+
                            </h3>

                            <p className="mt-2 text-gray-300">
                                মানসম্পন্ন নিবন্ধ
                            </p>
                        </div>

                        <div>
                            <h3 className="text-4xl font-bold text-green-400">
                                20+
                            </h3>

                            <p className="mt-2 text-gray-300">
                                বিভিন্ন বিভাগ
                            </p>
                        </div>

                        <div>
                            <h3 className="text-4xl font-bold text-green-400">
                                প্রতিদিন
                            </h3>

                            <p className="mt-2 text-gray-300">
                                নতুন কনটেন্ট প্রকাশের লক্ষ্য
                            </p>
                        </div>

                    </div>
                </section>

                <section className="rounded-3xl border border-green-200 bg-green-50 p-10 text-center">

                    <h2 className="text-3xl font-bold">
                        আপনার মতামত আমাদের কাছে গুরুত্বপূর্ণ
                    </h2>

                    <p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-gray-700">
                        কোনো পরামর্শ, মতামত বা সহযোগিতার বিষয়ে আমাদের সঙ্গে
                        যোগাযোগ করতে পারেন। আমরা সবসময় পাঠকদের মূল্যবান
                        মতামতকে স্বাগত জানাই।
                    </p>

                    <Link
                        href="/contact"
                        className="mt-8 inline-flex rounded-xl bg-green-700 px-8 py-4 font-semibold text-white transition hover:bg-green-800"
                    >
                        যোগাযোগ করুন
                    </Link>

                </section>

            </section>
        </PageLayout>
    );
}