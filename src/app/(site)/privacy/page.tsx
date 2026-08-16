import type { Metadata } from "next";
import Link from "next/link";

import PageLayout from "@/components/page/PageLayout";

export const metadata: Metadata = {
    title: "গোপনীয়তা নীতি",
    description:
        "জীবন চক্র কীভাবে আপনার তথ্য সংগ্রহ, ব্যবহার এবং সুরক্ষা করে তা জানুন।",
};

const informationTypes = [
    "আপনার স্বেচ্ছায় প্রদান করা তথ্য (যেমন: নাম, ইমেইল)।",
    "যোগাযোগ ফর্মের মাধ্যমে পাঠানো বার্তা।",
    "ব্রাউজার, ডিভাইস ও অপারেটিং সিস্টেম সম্পর্কিত প্রযুক্তিগত তথ্য।",
    "IP Address, Browser Type এবং Usage Data।",
    "Cookies এবং অনুরূপ প্রযুক্তির মাধ্যমে সংগৃহীত তথ্য।",
];

const usageItems = [
    "ওয়েবসাইট পরিচালনা ও উন্নয়ন",
    "ব্যবহারকারীর অভিজ্ঞতা উন্নত করা",
    "প্রশ্ন ও যোগাযোগের উত্তর প্রদান",
    "নিরাপত্তা নিশ্চিত করা",
    "অপব্যবহার ও স্প্যাম প্রতিরোধ",
    "পরিসংখ্যান ও বিশ্লেষণ পরিচালনা",
];

const userRights = [
    "আপনার তথ্য সম্পর্কে জানতে চাওয়ার অধিকার।",
    "ভুল তথ্য সংশোধনের অনুরোধ করার অধিকার।",
    "প্রয়োজন হলে তথ্য মুছে ফেলার অনুরোধ করার অধিকার।",
    "আমাদের সঙ্গে যোগাযোগ করে আপনার উদ্বেগ জানানো।",
];

export default function PrivacyPage() {
    return (
        <PageLayout
            title="গোপনীয়তা নীতি"
            description="আপনার ব্যক্তিগত তথ্যের নিরাপত্তা এবং গোপনীয়তা আমাদের কাছে অত্যন্ত গুরুত্বপূর্ণ। এই নীতিমালায় ব্যাখ্যা করা হয়েছে আমরা কী ধরনের তথ্য সংগ্রহ করি, কেন সংগ্রহ করি এবং কীভাবে তা ব্যবহার ও সংরক্ষণ করি।"
        >
            <div className="space-y-8 md:space-y-10 lg:space-y-12">

                {/* Hero */}

                <section className="rounded-2xl border border-border bg-card p-5 shadow-custom sm:p-6 md:rounded-3xl md:p-8 lg:p-10">
                    <div className="inline-flex rounded-full border border-border bg-muted px-2.5 py-1 text-xs font-medium text-muted-foreground shadow-sm sm:px-3 sm:text-sm">
                        Privacy Policy
                    </div>

                    <h2 className="mt-4 text-2xl font-bold tracking-tight text-foreground sm:mt-5 sm:text-3xl lg:mt-6 lg:text-4xl">
                        আপনার গোপনীয়তা আমাদের অঙ্গীকার
                    </h2>

                    <div className="mt-5 max-w-4xl space-y-4 sm:mt-6 sm:space-y-5">
                        <p className="text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8 lg:leading-9">
                            জীবন চক্র ব্যবহার করার সময় আপনার গোপনীয়তা রক্ষা করা
                            আমাদের অন্যতম প্রধান দায়িত্ব। আমরা শুধুমাত্র সেই
                            তথ্য সংগ্রহ করি যা আমাদের সেবা উন্নত করতে,
                            ওয়েবসাইট পরিচালনা করতে এবং ব্যবহারকারীর অভিজ্ঞতা
                            আরও ভালো করতে প্রয়োজন।
                        </p>

                        <p className="text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8 lg:leading-9">
                            এই নীতিমালা সময়ে সময়ে পরিবর্তিত হতে পারে।
                            গুরুত্বপূর্ণ কোনো পরিবর্তন হলে এই পৃষ্ঠায় তা
                            প্রকাশ করা হবে।
                        </p>
                    </div>
                </section>

                {/* Information Collection */}

                <section className="rounded-2xl border border-border bg-card p-5 shadow-custom sm:p-6 md:p-8">
                    <h2 className="text-xl font-semibold text-foreground sm:text-2xl">
                        আমরা কী ধরনের তথ্য সংগ্রহ করি?
                    </h2>

                    <ul className="mt-5 list-disc space-y-3 pl-5 text-sm leading-7 text-muted-foreground sm:mt-6 sm:pl-6 sm:text-base sm:leading-8">
                        {informationTypes.map((item) => (
                            <li key={item}>
                                {item}
                            </li>
                        ))}
                    </ul>
                </section>

                {/* Information Usage */}

                <section>
                    <div className="mb-6 sm:mb-8">
                        <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                            সংগৃহীত তথ্য কীভাবে ব্যবহার করা হয়?
                        </h2>

                        <p className="mt-3 max-w-3xl text-sm leading-7 text-muted-foreground sm:text-base sm:leading-8">
                            আপনার তথ্য শুধুমাত্র বৈধ ও প্রয়োজনীয় উদ্দেশ্যে
                            ব্যবহার করা হয়।
                        </p>
                    </div>

                    <div className="grid gap-4 sm:gap-5 md:grid-cols-2 md:gap-6">
                        {usageItems.map((item) => (
                            <div
                                key={item}
                                className="rounded-xl border border-border bg-card p-5 shadow-custom transition-all duration-200 hover:-translate-y-1 hover:bg-muted/30 hover:shadow-md sm:rounded-2xl sm:p-6 md:p-8"
                            >
                                <p className="text-base font-medium leading-7 text-foreground">
                                    {item}
                                </p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Cookies */}

                <section className="rounded-2xl border border-border bg-card p-5 shadow-custom sm:p-6 md:p-8">
                    <h2 className="text-xl font-semibold text-foreground sm:text-2xl">
                        Cookies
                    </h2>

                    <div className="mt-5 space-y-4">
                        <p className="text-sm leading-7 text-muted-foreground sm:text-base sm:leading-8">
                            আমাদের ওয়েবসাইট Cookies ব্যবহার করতে পারে যাতে
                            ব্যবহারকারীর অভিজ্ঞতা উন্নত করা যায়। Cookies-এর
                            মাধ্যমে আপনার ব্যক্তিগত পরিচয় সরাসরি সংগ্রহ করা
                            হয় না।
                        </p>

                        <p className="text-sm leading-7 text-muted-foreground sm:text-base sm:leading-8">
                            আপনি চাইলে আপনার ব্রাউজারের সেটিংস থেকে Cookies
                            নিষ্ক্রিয় করতে পারেন। তবে এতে ওয়েবসাইটের কিছু
                            সুবিধা সঠিকভাবে কাজ নাও করতে পারে।
                        </p>
                    </div>
                </section>

                {/* Third Party */}

                <section className="rounded-2xl border border-border bg-card p-5 shadow-custom sm:p-6 md:p-8">
                    <h2 className="text-xl font-semibold text-foreground sm:text-2xl">
                        তৃতীয় পক্ষের সেবা
                    </h2>

                    <p className="mt-5 text-sm leading-7 text-muted-foreground sm:text-base sm:leading-8">
                        আমাদের ওয়েবসাইটে Google Analytics, বিজ্ঞাপন সেবা,
                        Social Media Embed অথবা অন্যান্য তৃতীয় পক্ষের সেবা
                        ব্যবহৃত হতে পারে। এসব সেবার নিজস্ব Privacy Policy
                        রয়েছে এবং সেগুলো তাদের নিজস্ব নিয়ম অনুযায়ী তথ্য
                        সংগ্রহ করতে পারে।
                    </p>
                </section>

                {/* Security */}

                <section className="rounded-2xl border border-border bg-card p-5 shadow-custom sm:p-6 md:p-8">
                    <h2 className="text-xl font-semibold text-foreground sm:text-2xl">
                        তথ্যের নিরাপত্তা
                    </h2>

                    <p className="mt-5 text-sm leading-7 text-muted-foreground sm:text-base sm:leading-8">
                        আমরা আপনার তথ্য সুরক্ষিত রাখতে যুক্তিসঙ্গত প্রযুক্তিগত
                        ও প্রশাসনিক ব্যবস্থা গ্রহণ করি। তবে ইন্টারনেটের মাধ্যমে
                        তথ্য আদান-প্রদান শতভাগ নিরাপদ—এমন নিশ্চয়তা দেওয়া সম্ভব
                        নয়।
                    </p>
                </section>

                {/* Children's Privacy */}

                <section className="rounded-2xl border border-border bg-card p-5 shadow-custom sm:p-6 md:p-8">
                    <h2 className="text-xl font-semibold text-foreground sm:text-2xl">
                        শিশুদের গোপনীয়তা
                    </h2>

                    <p className="mt-5 text-sm leading-7 text-muted-foreground sm:text-base sm:leading-8">
                        আমাদের ওয়েবসাইট ১৩ বছরের কম বয়সী শিশুদের কাছ থেকে
                        ইচ্ছাকৃতভাবে কোনো ব্যক্তিগত তথ্য সংগ্রহ করে না। যদি
                        এমন কোনো তথ্য অনিচ্ছাকৃতভাবে সংগ্রহ হয়ে থাকে, তবে
                        আমাদের জানালে তা দ্রুত মুছে ফেলা হবে।
                    </p>
                </section>

                {/* User Rights */}

                <section>
                    <div className="mb-6 sm:mb-8">
                        <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                            আপনার অধিকার
                        </h2>

                        <p className="mt-3 max-w-3xl text-sm leading-7 text-muted-foreground sm:text-base sm:leading-8">
                            আপনার ব্যক্তিগত তথ্যের ওপর আপনার কিছু গুরুত্বপূর্ণ
                            অধিকার রয়েছে।
                        </p>
                    </div>

                    <div className="grid gap-4 sm:gap-5 md:grid-cols-2 md:gap-6">
                        {userRights.map((item) => (
                            <div
                                key={item}
                                className="rounded-xl border border-border bg-card p-5 shadow-custom transition-all duration-200 hover:-translate-y-1 hover:bg-muted/30 hover:shadow-md sm:rounded-2xl sm:p-6 md:p-8"
                            >
                                <p className="text-base font-medium leading-7 text-foreground">
                                    {item}
                                </p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Policy Updates */}

                <section className="rounded-2xl border border-border bg-card p-5 shadow-custom sm:rounded-3xl sm:p-6 md:p-8 lg:p-10">
                    <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                        নীতিমালার পরিবর্তন
                    </h2>

                    <p className="mt-5 max-w-4xl text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
                        সময়ের প্রয়োজন অনুযায়ী এই Privacy Policy পরিবর্তন
                        করা হতে পারে। সর্বশেষ সংস্করণ সবসময় এই পৃষ্ঠায়
                        প্রকাশিত থাকবে। তাই নিয়মিত এই নীতিমালাটি পর্যালোচনা
                        করার জন্য আপনাকে উৎসাহিত করা হচ্ছে।
                    </p>
                </section>

                {/* Contact CTA */}

                <section className="rounded-2xl border border-border bg-card p-6 text-center shadow-custom sm:rounded-3xl sm:p-8 md:p-10">
                    <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                        কোনো প্রশ্ন আছে?
                    </h2>

                    <p className="mx-auto mt-5 max-w-3xl text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
                        এই গোপনীয়তা নীতি সম্পর্কে আপনার কোনো প্রশ্ন,
                        মতামত অথবা উদ্বেগ থাকলে আমাদের সঙ্গে যোগাযোগ করতে
                        পারেন। আমরা যথাসম্ভব দ্রুত উত্তর দেওয়ার চেষ্টা করব।
                    </p>

                    <Link
                        href="/contact"
                        className="mt-8 inline-flex w-full items-center justify-center rounded-xl bg-primary px-6 py-3.5 text-sm font-medium text-primary-foreground transition-all duration-200 hover:bg-primary/90 sm:w-auto sm:px-8 sm:py-4 sm:text-base"
                    >
                        যোগাযোগ করুন
                    </Link>
                </section>

            </div>
        </PageLayout>
    );
}