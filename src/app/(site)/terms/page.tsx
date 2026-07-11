import type { Metadata } from "next";

import PageLayout from "@/components/page/PageLayout";

export const metadata: Metadata = {
    title: "ব্যবহারের শর্তাবলী",
    description:
        "জীবন চক্র ওয়েবসাইট ব্যবহারের শর্তাবলী, অধিকার, দায়বদ্ধতা এবং নীতিমালা সম্পর্কে জানুন।",
};

export default function TermsPage() {
    return (
        <PageLayout
            title="ব্যবহারের শর্তাবলী"
            description="এই ওয়েবসাইট ব্যবহার করার মাধ্যমে আপনি নিচে বর্ণিত শর্তাবলীর সাথে সম্মত হচ্ছেন। অনুগ্রহ করে ওয়েবসাইট ব্যবহার করার আগে এগুলো মনোযোগ সহকারে পড়ুন।"
        >
            <section className="space-y-8">

                <div className="rounded-3xl border border-green-100 bg-gradient-to-br from-green-50 via-white to-emerald-50 p-8 shadow-sm md:p-12">
                    <h2 className="text-3xl font-bold text-gray-900">
                        শর্তাবলীর উদ্দেশ্য
                    </h2>

                    <p className="mt-6 text-lg leading-9 text-gray-700">
                        এই ব্যবহারের শর্তাবলী ("Terms of Use") জীবন চক্র
                        ওয়েবসাইট ব্যবহারের নিয়ম, অধিকার এবং দায়িত্ব
                        নির্ধারণ করে। এই ওয়েবসাইটে প্রবেশ বা এর যেকোনো
                        সেবা ব্যবহার করার মাধ্যমে আপনি এই শর্তাবলী মেনে
                        চলতে সম্মত হচ্ছেন।
                    </p>
                </div>

                <section className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
                    <h2 className="text-2xl font-bold">
                        ১. ওয়েবসাইটের ব্যবহার
                    </h2>

                    <p className="mt-5 leading-8 text-gray-700">
                        আপনি শুধুমাত্র বৈধ ও ব্যক্তিগত উদ্দেশ্যে এই
                        ওয়েবসাইট ব্যবহার করতে পারবেন। এমন কোনো কার্যক্রম
                        গ্রহণ করা যাবে না যা ওয়েবসাইট, সার্ভার বা অন্যান্য
                        ব্যবহারকারীর অভিজ্ঞতার ক্ষতি করে।
                    </p>

                    <ul className="mt-6 list-disc space-y-3 pl-6 text-gray-700">
                        <li>আইনবিরোধী কার্যক্রম পরিচালনা করা যাবে না।</li>
                        <li>ক্ষতিকর কোড, ভাইরাস বা ম্যালওয়্যার ছড়ানো যাবে না।</li>
                        <li>ওয়েবসাইটের নিরাপত্তা ভাঙার চেষ্টা করা যাবে না।</li>
                        <li>অন্য ব্যবহারকারীর তথ্য অপব্যবহার করা যাবে না।</li>
                    </ul>
                </section>

                <section className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
                    <h2 className="text-2xl font-bold">
                        ২. কনটেন্টের মালিকানা
                    </h2>

                    <p className="mt-5 leading-8 text-gray-700">
                        জীবন চক্রে প্রকাশিত নিবন্ধ, ছবি, লোগো, ডিজাইন এবং
                        অন্যান্য কনটেন্ট সংশ্লিষ্ট লেখক বা জীবন চক্রের
                        মেধাস্বত্বের অন্তর্ভুক্ত, যদি না অন্যভাবে উল্লেখ
                        করা থাকে।
                    </p>

                    <p className="mt-4 leading-8 text-gray-700">
                        আমাদের পূর্বানুমতি ছাড়া কোনো কনটেন্ট সম্পূর্ণ বা
                        আংশিকভাবে কপি, পুনঃপ্রকাশ, বিক্রি বা বাণিজ্যিকভাবে
                        ব্যবহার করা যাবে না।
                    </p>
                </section>

                <section className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
                    <h2 className="text-2xl font-bold">
                        ৩. ব্যবহারকারীর আচরণ
                    </h2>

                    <p className="mt-5 leading-8 text-gray-700">
                        আপনি যদি মন্তব্য, যোগাযোগ ফর্ম বা ভবিষ্যতের
                        যেকোনো ইন্টারঅ্যাকটিভ ফিচার ব্যবহার করেন, তাহলে
                        আপনাকে সম্মানজনক এবং আইনসম্মত আচরণ বজায় রাখতে হবে।
                    </p>

                    <ul className="mt-6 list-disc space-y-3 pl-6 text-gray-700">
                        <li>অশালীন বা আপত্তিকর ভাষা ব্যবহার করা যাবে না।</li>
                        <li>ঘৃণামূলক বক্তব্য বা বৈষম্যমূলক মন্তব্য করা যাবে না।</li>
                        <li>ভুয়া তথ্য বা বিভ্রান্তিকর তথ্য ছড়ানো যাবে না।</li>
                        <li>স্প্যাম বা অবাঞ্ছিত প্রচারণা করা যাবে না।</li>
                    </ul>
                </section>

                <section className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
                    <h2 className="text-2xl font-bold">
                        ৪. তথ্যের নির্ভুলতা
                    </h2>

                    <p className="mt-5 leading-8 text-gray-700">
                        আমরা যথাসম্ভব নির্ভুল এবং হালনাগাদ তথ্য প্রকাশের
                        চেষ্টা করি। তবে কোনো তথ্য শতভাগ নির্ভুল, সম্পূর্ণ
                        বা সর্বদা হালনাগাদ থাকবে—এমন নিশ্চয়তা প্রদান করা
                        হয় না।
                    </p>

                    <p className="mt-4 leading-8 text-gray-700">
                        কোনো গুরুত্বপূর্ণ সিদ্ধান্ত নেওয়ার আগে প্রয়োজন হলে
                        সংশ্লিষ্ট বিশেষজ্ঞ বা নির্ভরযোগ্য উৎস থেকে তথ্য
                        যাচাই করার পরামর্শ দেওয়া হচ্ছে।
                    </p>
                </section>

                <section className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
                    <h2 className="text-2xl font-bold">
                        ৫. তৃতীয় পক্ষের লিংক
                    </h2>

                    <p className="mt-5 leading-8 text-gray-700">
                        আমাদের ওয়েবসাইটে অন্যান্য ওয়েবসাইটের লিংক থাকতে
                        পারে। এসব ওয়েবসাইটের কনটেন্ট, নিরাপত্তা বা
                        গোপনীয়তা নীতির জন্য জীবন চক্র দায়ী নয়।
                    </p>
                </section>

                <section className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
                    <h2 className="text-2xl font-bold">
                        ৬. দায় সীমাবদ্ধতা
                    </h2>

                    <p className="mt-5 leading-8 text-gray-700">
                        জীবন চক্র ব্যবহারের ফলে প্রত্যক্ষ বা পরোক্ষ কোনো
                        ক্ষতি, তথ্য হারানো বা আর্থিক ক্ষতির জন্য আমরা দায়ী
                        থাকব না, যদি না আইন অনুযায়ী অন্যথা প্রযোজ্য হয়।
                    </p>
                </section>

                <section className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
                    <h2 className="text-2xl font-bold">
                        ৭. শর্তাবলীর পরিবর্তন
                    </h2>

                    <p className="mt-5 leading-8 text-gray-700">
                        প্রয়োজনে যেকোনো সময় এই শর্তাবলী পরিবর্তন, সংশোধন
                        বা হালনাগাদ করার অধিকার জীবন চক্র সংরক্ষণ করে।
                        পরিবর্তিত শর্তাবলী এই পৃষ্ঠায় প্রকাশের সাথে সাথে
                        কার্যকর হবে।
                    </p>
                </section>

                <section className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
                    <h2 className="text-2xl font-bold">
                        ৮. যোগাযোগ
                    </h2>

                    <p className="mt-5 leading-8 text-gray-700">
                        এই শর্তাবলী সম্পর্কে আপনার কোনো প্রশ্ন, মতামত বা
                        অভিযোগ থাকলে আমাদের <strong>যোগাযোগ</strong> পৃষ্ঠার
                        মাধ্যমে যোগাযোগ করতে পারেন। আমরা যথাসম্ভব দ্রুত
                        আপনার প্রশ্নের উত্তর দেওয়ার চেষ্টা করব।
                    </p>
                </section>

            </section>
        </PageLayout>
    );
}