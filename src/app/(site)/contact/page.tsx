import {
    Clock3,
    Mail,
    MapPin,
    MessageCircle,
    Phone,
} from "lucide-react";
import type { Metadata } from "next";

import PageLayout from "@/components/page/PageLayout";

export const metadata: Metadata = {
    title: "যোগাযোগ",
    description:
        "জীবন চক্রের সঙ্গে যোগাযোগ করুন। আপনার মতামত, প্রশ্ন, পরামর্শ অথবা সহযোগিতার প্রস্তাব আমাদের জানাতে পারেন।",
};

export default function ContactPage() {
    return (
        <PageLayout
            title="যোগাযোগ করুন"
            description="আপনার যেকোনো প্রশ্ন, মতামত, পরামর্শ অথবা সহযোগিতার বিষয়ে আমাদের সঙ্গে যোগাযোগ করতে পারেন। আমরা যত দ্রুত সম্ভব উত্তর দেওয়ার চেষ্টা করি।"
        >
            <div className="space-y-14">

                {/* Intro */}

                <section className="rounded-3xl border border-green-100 bg-gradient-to-br from-green-50 via-white to-emerald-50 p-8 shadow-sm md:p-12">

                    <h2 className="text-3xl font-bold text-gray-900">
                        আমরা আপনার কথা শুনতে আগ্রহী
                    </h2>

                    <p className="mt-6 text-lg leading-9 text-gray-700">
                        জীবন চক্রের প্রতিটি পাঠকের মতামত আমাদের জন্য গুরুত্বপূর্ণ।
                        কোনো ভুল তথ্য, নতুন লেখার প্রস্তাব, ব্যবসায়িক সহযোগিতা,
                        বিজ্ঞাপন, প্রযুক্তিগত সমস্যা অথবা সাধারণ মতামত—যেকোনো
                        বিষয়ে নির্দ্বিধায় আমাদের সঙ্গে যোগাযোগ করতে পারেন।
                    </p>

                </section>

                {/* Contact Info + Form */}

                <section className="grid gap-10 lg:grid-cols-[380px_1fr]">

                    {/* Left */}

                    <div className="space-y-6">

                        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">

                            <div className="flex items-start gap-4">

                                <div className="rounded-xl bg-green-100 p-3">
                                    <Mail
                                        size={22}
                                        className="text-green-700"
                                    />
                                </div>

                                <div>
                                    <h3 className="font-bold text-lg">
                                        ইমেইল
                                    </h3>

                                    <p className="mt-2 text-gray-600">
                                        support@jibonchokro.com
                                    </p>

                                    <p className="text-gray-500 text-sm mt-2">
                                        সাধারণ প্রশ্ন, মতামত এবং সহযোগিতার জন্য।
                                    </p>
                                </div>

                            </div>

                        </div>

                        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">

                            <div className="flex items-start gap-4">

                                <div className="rounded-xl bg-green-100 p-3">
                                    <Phone
                                        size={22}
                                        className="text-green-700"
                                    />
                                </div>

                                <div>
                                    <h3 className="font-bold text-lg">
                                        ফোন
                                    </h3>

                                    <p className="mt-2 text-gray-600">
                                        +880 1XXX-XXXXXX
                                    </p>

                                    <p className="text-gray-500 text-sm mt-2">
                                        অফিস সময়ের মধ্যে যোগাযোগ করুন।
                                    </p>
                                </div>

                            </div>

                        </div>

                        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">

                            <div className="flex items-start gap-4">

                                <div className="rounded-xl bg-green-100 p-3">
                                    <MapPin
                                        size={22}
                                        className="text-green-700"
                                    />
                                </div>

                                <div>
                                    <h3 className="font-bold text-lg">
                                        ঠিকানা
                                    </h3>

                                    <p className="mt-2 text-gray-600 leading-7">
                                        ঢাকা,
                                        <br />
                                        বাংলাদেশ
                                    </p>
                                </div>

                            </div>

                        </div>

                        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">

                            <div className="flex items-start gap-4">

                                <div className="rounded-xl bg-green-100 p-3">
                                    <Clock3
                                        size={22}
                                        className="text-green-700"
                                    />
                                </div>

                                <div>
                                    <h3 className="font-bold text-lg">
                                        উত্তর দেওয়ার সময়
                                    </h3>

                                    <p className="mt-2 text-gray-600">
                                        সাধারণত ২৪–৪৮ ঘণ্টার মধ্যে।
                                    </p>
                                </div>

                            </div>

                        </div>

                    </div>

                    {/* Contact Form */}

                    <div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm">

                        <div className="flex items-center gap-3">

                            <MessageCircle className="text-green-700" />

                            <h2 className="text-2xl font-bold">
                                আমাদের বার্তা পাঠান
                            </h2>

                        </div>

                        <form className="mt-8 space-y-6">

                            <div className="grid gap-6 md:grid-cols-2">

                                <div>
                                    <label className="mb-2 block font-medium">
                                        আপনার নাম
                                    </label>

                                    <input
                                        type="text"
                                        placeholder="আপনার নাম লিখুন"
                                        className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-green-700"
                                    />
                                </div>

                                <div>
                                    <label className="mb-2 block font-medium">
                                        ইমেইল
                                    </label>

                                    <input
                                        type="email"
                                        placeholder="name@example.com"
                                        className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-green-700"
                                    />
                                </div>

                            </div>

                            <div>

                                <label className="mb-2 block font-medium">
                                    বিষয়
                                </label>

                                <input
                                    type="text"
                                    placeholder="বার্তার বিষয়"
                                    className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-green-700"
                                />

                            </div>

                            <div>

                                <label className="mb-2 block font-medium">
                                    আপনার বার্তা
                                </label>

                                <textarea
                                    rows={8}
                                    placeholder="আপনার বার্তা লিখুন..."
                                    className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-green-700"
                                />

                            </div>

                            <button
                                type="submit"
                                className="rounded-xl bg-green-700 px-8 py-4 font-semibold text-white transition hover:bg-green-800"
                            >
                                বার্তা পাঠান
                            </button>

                        </form>

                    </div>

                </section>

                {/* FAQ */}

                <section className="rounded-3xl border border-gray-200 bg-gray-50 p-8">

                    <h2 className="text-3xl font-bold">
                        কী বিষয়ে যোগাযোগ করতে পারেন?
                    </h2>

                    <div className="mt-8 grid gap-5 md:grid-cols-2">

                        {[
                            "লেখা সংক্রান্ত মতামত",
                            "তথ্য সংশোধনের অনুরোধ",
                            "ব্যবসায়িক সহযোগিতা",
                            "বিজ্ঞাপন সংক্রান্ত যোগাযোগ",
                            "প্রযুক্তিগত সমস্যা",
                            "নতুন ফিচারের পরামর্শ",
                            "কপিরাইট অভিযোগ",
                            "অন্যান্য যেকোনো প্রশ্ন",
                        ].map((item) => (
                            <div
                                key={item}
                                className="rounded-xl border border-gray-200 bg-white px-5 py-4"
                            >
                                {item}
                            </div>
                        ))}

                    </div>

                </section>

            </div>
        </PageLayout>
    );
}