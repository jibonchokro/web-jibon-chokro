import type { Metadata } from "next";

import PageLayout from "@/components/page/PageLayout";

export const metadata: Metadata = {
    title: "গোপনীয়তা নীতি",
    description:
        "জীবন চক্র কীভাবে আপনার তথ্য সংগ্রহ, ব্যবহার এবং সুরক্ষা করে তা জানুন।",
};

export default function PrivacyPage() {
    return (
        <PageLayout
            title="গোপনীয়তা নীতি"
            description="আপনার ব্যক্তিগত তথ্যের নিরাপত্তা এবং গোপনীয়তা আমাদের কাছে অত্যন্ত গুরুত্বপূর্ণ। এই নীতিমালায় ব্যাখ্যা করা হয়েছে আমরা কী ধরনের তথ্য সংগ্রহ করি, কেন সংগ্রহ করি এবং কীভাবে তা ব্যবহার ও সংরক্ষণ করি।"
        >
            <section className="space-y-8">

                <div className="rounded-3xl border border-blue-100 bg-gradient-to-br from-blue-50 via-white to-slate-50 p-8 shadow-sm md:p-12">
                    <h2 className="text-3xl font-bold text-gray-900">
                        আমাদের প্রতিশ্রুতি
                    </h2>

                    <p className="mt-6 text-lg leading-9 text-gray-700">
                        জীবন চক্র ব্যবহার করার সময় আপনার গোপনীয়তা রক্ষা করা
                        আমাদের অন্যতম প্রধান দায়িত্ব। আমরা শুধুমাত্র সেই
                        তথ্য সংগ্রহ করি যা আমাদের সেবা উন্নত করতে, ওয়েবসাইট
                        পরিচালনা করতে এবং ব্যবহারকারীর অভিজ্ঞতা আরও ভালো করতে
                        প্রয়োজন।
                    </p>

                    <p className="mt-5 text-lg leading-9 text-gray-700">
                        এই নীতিমালা সময়ে সময়ে পরিবর্তিত হতে পারে। গুরুত্বপূর্ণ
                        কোনো পরিবর্তন হলে এই পৃষ্ঠায় তা প্রকাশ করা হবে।
                    </p>
                </div>

                <section className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
                    <h2 className="text-2xl font-bold">
                        আমরা কী ধরনের তথ্য সংগ্রহ করি?
                    </h2>

                    <ul className="mt-6 list-disc space-y-3 pl-6 leading-8 text-gray-700">
                        <li>আপনার স্বেচ্ছায় প্রদান করা তথ্য (যেমন: নাম, ইমেইল)।</li>
                        <li>যোগাযোগ ফর্মের মাধ্যমে পাঠানো বার্তা।</li>
                        <li>ব্রাউজার, ডিভাইস ও অপারেটিং সিস্টেম সম্পর্কিত প্রযুক্তিগত তথ্য।</li>
                        <li>IP Address, Browser Type এবং Usage Data।</li>
                        <li>Cookies এবং অনুরূপ প্রযুক্তির মাধ্যমে সংগৃহীত তথ্য।</li>
                    </ul>
                </section>

                <section className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
                    <h2 className="text-2xl font-bold">
                        সংগৃহীত তথ্য কীভাবে ব্যবহার করা হয়?
                    </h2>

                    <div className="mt-6 grid gap-5 md:grid-cols-2">

                        {[
                            "ওয়েবসাইট পরিচালনা ও উন্নয়ন",
                            "ব্যবহারকারীর অভিজ্ঞতা উন্নত করা",
                            "প্রশ্ন ও যোগাযোগের উত্তর প্রদান",
                            "নিরাপত্তা নিশ্চিত করা",
                            "অপব্যবহার ও স্প্যাম প্রতিরোধ",
                            "পরিসংখ্যান ও বিশ্লেষণ পরিচালনা",
                        ].map((item) => (
                            <div
                                key={item}
                                className="rounded-xl border border-gray-200 bg-gray-50 p-5"
                            >
                                <p className="font-medium text-gray-800">
                                    {item}
                                </p>
                            </div>
                        ))}

                    </div>
                </section>

                <section className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
                    <h2 className="text-2xl font-bold">
                        Cookies
                    </h2>

                    <p className="mt-5 leading-8 text-gray-700">
                        আমাদের ওয়েবসাইট Cookies ব্যবহার করতে পারে যাতে
                        ব্যবহারকারীর অভিজ্ঞতা উন্নত করা যায়। Cookies-এর মাধ্যমে
                        আপনার ব্যক্তিগত পরিচয় সরাসরি সংগ্রহ করা হয় না।
                    </p>

                    <p className="mt-4 leading-8 text-gray-700">
                        আপনি চাইলে আপনার ব্রাউজারের সেটিংস থেকে Cookies
                        নিষ্ক্রিয় করতে পারেন। তবে এতে ওয়েবসাইটের কিছু
                        সুবিধা সঠিকভাবে কাজ নাও করতে পারে।
                    </p>
                </section>

                <section className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
                    <h2 className="text-2xl font-bold">
                        তৃতীয় পক্ষের সেবা
                    </h2>

                    <p className="mt-5 leading-8 text-gray-700">
                        আমাদের ওয়েবসাইটে Google Analytics, বিজ্ঞাপন সেবা,
                        Social Media Embed অথবা অন্যান্য তৃতীয় পক্ষের সেবা
                        ব্যবহৃত হতে পারে। এসব সেবার নিজস্ব Privacy Policy
                        রয়েছে এবং সেগুলো তাদের নিজস্ব নিয়ম অনুযায়ী তথ্য
                        সংগ্রহ করতে পারে।
                    </p>
                </section>

                <section className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
                    <h2 className="text-2xl font-bold">
                        তথ্যের নিরাপত্তা
                    </h2>

                    <p className="mt-5 leading-8 text-gray-700">
                        আমরা আপনার তথ্য সুরক্ষিত রাখতে যুক্তিসঙ্গত প্রযুক্তিগত
                        ও প্রশাসনিক ব্যবস্থা গ্রহণ করি। তবে ইন্টারনেটের মাধ্যমে
                        তথ্য আদান-প্রদান শতভাগ নিরাপদ—এমন নিশ্চয়তা দেওয়া সম্ভব
                        নয়।
                    </p>
                </section>

                <section className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
                    <h2 className="text-2xl font-bold">
                        শিশুদের গোপনীয়তা
                    </h2>

                    <p className="mt-5 leading-8 text-gray-700">
                        আমাদের ওয়েবসাইট ১৩ বছরের কম বয়সী শিশুদের কাছ থেকে
                        ইচ্ছাকৃতভাবে কোনো ব্যক্তিগত তথ্য সংগ্রহ করে না। যদি
                        এমন কোনো তথ্য অনিচ্ছাকৃতভাবে সংগ্রহ হয়ে থাকে, তবে
                        আমাদের জানালে তা দ্রুত মুছে ফেলা হবে।
                    </p>
                </section>

                <section className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
                    <h2 className="text-2xl font-bold">
                        আপনার অধিকার
                    </h2>

                    <ul className="mt-6 list-disc space-y-3 pl-6 leading-8 text-gray-700">
                        <li>আপনার তথ্য সম্পর্কে জানতে চাওয়ার অধিকার।</li>
                        <li>ভুল তথ্য সংশোধনের অনুরোধ করার অধিকার।</li>
                        <li>প্রয়োজন হলে তথ্য মুছে ফেলার অনুরোধ করার অধিকার।</li>
                        <li>আমাদের সঙ্গে যোগাযোগ করে আপনার উদ্বেগ জানানো।</li>
                    </ul>
                </section>

                <section className="rounded-3xl border border-green-200 bg-green-50 p-10">
                    <h2 className="text-3xl font-bold">
                        নীতিমালার পরিবর্তন
                    </h2>

                    <p className="mt-5 text-lg leading-8 text-gray-700">
                        সময়ের প্রয়োজন অনুযায়ী এই Privacy Policy পরিবর্তন
                        করা হতে পারে। সর্বশেষ সংস্করণ সবসময় এই পৃষ্ঠায়
                        প্রকাশিত থাকবে। নিয়মিত এই পৃষ্ঠাটি পর্যালোচনা করার
                        জন্য আপনাকে উৎসাহিত করা হচ্ছে।
                    </p>
                </section>

                <section className="rounded-3xl bg-gray-900 p-10 text-white">
                    <h2 className="text-3xl font-bold">
                        যোগাযোগ
                    </h2>

                    <p className="mt-5 max-w-3xl text-lg leading-8 text-gray-300">
                        এই গোপনীয়তা নীতি সম্পর্কে আপনার কোনো প্রশ্ন, মতামত
                        অথবা উদ্বেগ থাকলে আমাদের Contact পৃষ্ঠার মাধ্যমে
                        যোগাযোগ করতে পারেন। আমরা যথাসম্ভব দ্রুত উত্তর দেওয়ার
                        চেষ্টা করব।
                    </p>
                </section>

            </section>
        </PageLayout>
    );
}