import type { Metadata } from "next";
import Link from "next/link";

import PageLayout from "@/components/page/PageLayout";

export const metadata: Metadata = {
    title: "ব্যবহারের শর্তাবলী",
    description:
        "জীবন চক্র ওয়েবসাইট ব্যবহারের শর্তাবলী, অধিকার, দায়বদ্ধতা এবং নীতিমালা সম্পর্কে জানুন।",
};

const websiteRules = [
    "আইনবিরোধী কার্যক্রম পরিচালনা করা যাবে না।",
    "ক্ষতিকর কোড, ভাইরাস বা ম্যালওয়্যার ছড়ানো যাবে না।",
    "ওয়েবসাইটের নিরাপত্তা ভাঙার চেষ্টা করা যাবে না।",
    "অন্য ব্যবহারকারীর তথ্য অপব্যবহার করা যাবে না।",
];

const userBehaviors = [
    "অশালীন বা আপত্তিকর ভাষা ব্যবহার করা যাবে না।",
    "ঘৃণামূলক বক্তব্য বা বৈষম্যমূলক মন্তব্য করা যাবে না।",
    "ভুয়া তথ্য বা বিভ্রান্তিকর তথ্য ছড়ানো যাবে না।",
    "স্প্যাম বা অবাঞ্ছিত প্রচারণা করা যাবে না।",
];

export default function TermsPage() {
    return (
        <PageLayout
            title="ব্যবহারের শর্তাবলী"
            description="এই ওয়েবসাইট ব্যবহার করার মাধ্যমে আপনি নিচে বর্ণিত শর্তাবলীর সাথে সম্মত হচ্ছেন। অনুগ্রহ করে ওয়েবসাইট ব্যবহার করার আগে এগুলো মনোযোগ সহকারে পড়ুন।"
        >
            <div className="space-y-8 md:space-y-10 lg:space-y-12">

                {/* Hero */}

                <section className="rounded-2xl border border-black/10 bg-[#fcfcfc] p-5 sm:p-6 md:rounded-3xl md:p-8 lg:p-10">

                    <div className="inline-flex rounded-full border border-black/10 bg-muted px-2.5 py-1 text-xs font-medium text-muted-foreground sm:px-3 sm:text-sm">
                        Terms of Use
                    </div>

                    <h2 className="mt-4 text-2xl font-bold tracking-tight sm:mt-5 sm:text-3xl lg:mt-6 lg:text-4xl">
                        শর্তাবলীর উদ্দেশ্য
                    </h2>

                    <p className="mt-5 max-w-4xl text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8 lg:leading-9">
                        এই ব্যবহারের শর্তাবলী ("Terms of Use") জীবন চক্র
                        ওয়েবসাইট ব্যবহারের নিয়ম, অধিকার এবং দায়িত্ব
                        নির্ধারণ করে। এই ওয়েবসাইটে প্রবেশ বা এর যেকোনো
                        সেবা ব্যবহার করার মাধ্যমে আপনি এই শর্তাবলী মেনে
                        চলতে সম্মত হচ্ছেন।
                    </p>

                </section>

                {/* Website Usage */}

                <section className="rounded-2xl border border-black/10 bg-[#fcfcfc] p-5 sm:p-6 md:p-8">

                    <h2 className="text-xl font-semibold sm:text-2xl">
                        ১. ওয়েবসাইটের ব্যবহার
                    </h2>

                    <p className="mt-5 text-sm leading-7 text-muted-foreground sm:text-base sm:leading-8">
                        আপনি শুধুমাত্র বৈধ ও ব্যক্তিগত উদ্দেশ্যে এই
                        ওয়েবসাইট ব্যবহার করতে পারবেন। এমন কোনো কার্যক্রম
                        গ্রহণ করা যাবে না যা ওয়েবসাইট, সার্ভার বা অন্যান্য
                        ব্যবহারকারীর অভিজ্ঞতার ক্ষতি করে।
                    </p>

                    <ul className="mt-6 list-disc space-y-3 pl-5 text-sm leading-7 text-muted-foreground sm:pl-6 sm:text-base sm:leading-8">

                        {websiteRules.map((rule) => (
                            <li key={rule}>{rule}</li>
                        ))}

                    </ul>

                </section>

                {/* Ownership */}

                <section className="rounded-2xl border border-black/10 bg-[#fcfcfc] p-5 sm:p-6 md:p-8">

                    <h2 className="text-xl font-semibold sm:text-2xl">
                        ২. কনটেন্টের মালিকানা
                    </h2>

                    <div className="mt-5 space-y-4">

                        <p className="text-sm leading-7 text-muted-foreground sm:text-base sm:leading-8">
                            জীবন চক্রে প্রকাশিত নিবন্ধ, ছবি, লোগো,
                            ডিজাইন এবং অন্যান্য কনটেন্ট সংশ্লিষ্ট
                            লেখক বা জীবন চক্রের মেধাস্বত্বের অন্তর্ভুক্ত,
                            যদি না অন্যভাবে উল্লেখ করা থাকে।
                        </p>

                        <p className="text-sm leading-7 text-muted-foreground sm:text-base sm:leading-8">
                            আমাদের পূর্বানুমতি ছাড়া কোনো কনটেন্ট
                            সম্পূর্ণ বা আংশিকভাবে কপি, পুনঃপ্রকাশ,
                            বিক্রি বা বাণিজ্যিকভাবে ব্যবহার করা যাবে না।
                        </p>

                    </div>

                </section>

                {/* User Behaviour */}

                <section className="rounded-2xl border border-black/10 bg-[#fcfcfc] p-5 sm:p-6 md:p-8">

                    <h2 className="text-xl font-semibold sm:text-2xl">
                        ৩. ব্যবহারকারীর আচরণ
                    </h2>

                    <p className="mt-5 text-sm leading-7 text-muted-foreground sm:text-base sm:leading-8">
                        আপনি যদি মন্তব্য, যোগাযোগ ফর্ম বা ভবিষ্যতের
                        যেকোনো ইন্টারঅ্যাকটিভ ফিচার ব্যবহার করেন,
                        তাহলে আপনাকে সম্মানজনক এবং আইনসম্মত আচরণ
                        বজায় রাখতে হবে।
                    </p>

                    <ul className="mt-6 list-disc space-y-3 pl-5 text-sm leading-7 text-muted-foreground sm:pl-6 sm:text-base sm:leading-8">

                        {userBehaviors.map((item) => (
                            <li key={item}>{item}</li>
                        ))}

                    </ul>

                </section>

                {/* Accuracy */}

                <section className="rounded-2xl border border-black/10 bg-[#fcfcfc] p-5 sm:p-6 md:p-8">

                    <h2 className="text-xl font-semibold sm:text-2xl">
                        ৪. তথ্যের নির্ভুলতা
                    </h2>

                    <div className="mt-5 space-y-4">

                        <p className="text-sm leading-7 text-muted-foreground sm:text-base sm:leading-8">
                            আমরা যথাসম্ভব নির্ভুল এবং হালনাগাদ তথ্য
                            প্রকাশের চেষ্টা করি। তবে কোনো তথ্য শতভাগ
                            নির্ভুল, সম্পূর্ণ বা সর্বদা হালনাগাদ থাকবে—
                            এমন নিশ্চয়তা প্রদান করা হয় না।
                        </p>

                        <p className="text-sm leading-7 text-muted-foreground sm:text-base sm:leading-8">
                            কোনো গুরুত্বপূর্ণ সিদ্ধান্ত নেওয়ার আগে
                            প্রয়োজন হলে সংশ্লিষ্ট বিশেষজ্ঞ বা
                            নির্ভরযোগ্য উৎস থেকে তথ্য যাচাই করার
                            পরামর্শ দেওয়া হচ্ছে।
                        </p>

                    </div>

                </section>

                {/* Third-party Links */}

                <section className="rounded-2xl border border-black/10 bg-[#fcfcfc] p-5 sm:p-6 md:p-8">

                    <h2 className="text-xl font-semibold sm:text-2xl">
                        ৫. তৃতীয় পক্ষের লিংক
                    </h2>

                    <p className="mt-5 text-sm leading-7 text-muted-foreground sm:text-base sm:leading-8">
                        আমাদের ওয়েবসাইটে অন্যান্য ওয়েবসাইটের লিংক থাকতে
                        পারে। এসব ওয়েবসাইটের কনটেন্ট, নিরাপত্তা বা
                        গোপনীয়তা নীতির জন্য জীবন চক্র দায়ী নয়। কোনো
                        তৃতীয় পক্ষের ওয়েবসাইট ব্যবহারের আগে তাদের নিজস্ব
                        নীতিমালা পর্যালোচনা করার পরামর্শ দেওয়া হচ্ছে।
                    </p>

                </section>

                {/* Limitation of Liability */}

                <section className="rounded-2xl border border-black/10 bg-[#fcfcfc] p-5 sm:p-6 md:p-8">

                    <h2 className="text-xl font-semibold sm:text-2xl">
                        ৬. দায় সীমাবদ্ধতা
                    </h2>

                    <p className="mt-5 text-sm leading-7 text-muted-foreground sm:text-base sm:leading-8">
                        জীবন চক্র ব্যবহারের ফলে প্রত্যক্ষ বা পরোক্ষ কোনো
                        ক্ষতি, তথ্য হারানো, ব্যবসায়িক ক্ষতি অথবা আর্থিক
                        ক্ষতির জন্য আমরা দায়ী থাকব না, যদি না প্রচলিত
                        আইন অনুযায়ী অন্যথা প্রযোজ্য হয়।
                    </p>

                </section>

                {/* Updates */}

                <section className="rounded-2xl border border-black/10 bg-[#fcfcfc] p-5 sm:rounded-3xl sm:p-6 md:p-8 lg:p-10">

                    <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
                        ৭. শর্তাবলীর পরিবর্তন
                    </h2>

                    <p className="mt-5 max-w-4xl text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
                        প্রয়োজনে যেকোনো সময় এই ব্যবহারের শর্তাবলী
                        পরিবর্তন, সংশোধন অথবা হালনাগাদ করার অধিকার
                        জীবন চক্র সংরক্ষণ করে। পরিবর্তিত শর্তাবলী
                        এই পৃষ্ঠায় প্রকাশের সঙ্গে সঙ্গে কার্যকর হবে।
                        সর্বশেষ সংস্করণ সম্পর্কে জানার জন্য নিয়মিত
                        এই পৃষ্ঠাটি পর্যালোচনা করার অনুরোধ করা হচ্ছে।
                    </p>

                </section>

                {/* Contact */}

                <section className="rounded-2xl border border-black/10 bg-[#fcfcfc] p-5 sm:p-6 md:p-8">

                    <h2 className="text-xl font-semibold sm:text-2xl">
                        ৮. যোগাযোগ
                    </h2>

                    <p className="mt-5 text-sm leading-7 text-muted-foreground sm:text-base sm:leading-8">
                        এই শর্তাবলী সম্পর্কে আপনার কোনো প্রশ্ন,
                        মতামত বা অভিযোগ থাকলে আমাদের{" "}
                        <strong className="font-semibold text-foreground">
                            যোগাযোগ
                        </strong>{" "}
                        পৃষ্ঠার মাধ্যমে যোগাযোগ করতে পারেন। আমরা
                        যথাসম্ভব দ্রুত আপনার প্রশ্নের উত্তর দেওয়ার
                        চেষ্টা করব।
                    </p>

                </section>

                {/* CTA */}

                <section className="rounded-2xl border border-black/10 bg-[#fcfcfc] p-6 text-center sm:rounded-3xl sm:p-8 md:p-10">

                    <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
                        আরও কিছু জানতে চান?
                    </h2>

                    <p className="mx-auto mt-5 max-w-3xl text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
                        এই ব্যবহারের শর্তাবলী সম্পর্কে যদি আপনার কোনো
                        প্রশ্ন, মতামত বা উদ্বেগ থাকে, তাহলে আমাদের
                        সঙ্গে যোগাযোগ করুন। আমরা আপনার বার্তার উত্তর
                        যত দ্রুত সম্ভব দেওয়ার চেষ্টা করব।
                    </p>

                    <Link
                        href="/contact"
                        className="mt-8 inline-flex w-full items-center justify-center rounded-xl bg-black px-6 py-3.5 text-sm font-medium text-white transition-all duration-200 hover:bg-zinc-800 sm:w-auto sm:px-8 sm:py-4 sm:text-base"
                    >
                        যোগাযোগ করুন
                    </Link>

                </section>

            </div>
        </PageLayout>
    );
}