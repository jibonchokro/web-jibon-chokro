import {
    Clock3,
    Mail,
    MapPin,
    MessageCircle,
    Phone,
} from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

import PageLayout from "@/components/page/PageLayout";

export const metadata: Metadata = {
    title: "যোগাযোগ",
    description:
        "জীবন চক্রের সঙ্গে যোগাযোগ করুন। আপনার মতামত, প্রশ্ন, পরামর্শ অথবা সহযোগিতার প্রস্তাব আমাদের জানাতে পারেন।",
};

const contactItems = [
    {
        icon: Mail,
        title: "ইমেইল",
        value: "support@jibonchokro.com",
        description:
            "সাধারণ প্রশ্ন, মতামত এবং সহযোগিতার জন্য যোগাযোগ করুন।",
    },
    {
        icon: Phone,
        title: "ফোন",
        value: "+880 1XXX-XXXXXX",
        description: "অফিস সময়ের মধ্যে যোগাযোগ করুন।",
    },
    {
        icon: MapPin,
        title: "ঠিকানা",
        value: "ঢাকা,\nবাংলাদেশ",
        description: "",
    },
    {
        icon: Clock3,
        title: "উত্তরের সময়",
        value: "সাধারণত ২৪–৪৮ ঘণ্টার মধ্যে",
        description: "",
    },
];

const contactReasons = [
    "লেখা সংক্রান্ত মতামত",
    "তথ্য সংশোধনের অনুরোধ",
    "ব্যবসায়িক সহযোগিতা",
    "বিজ্ঞাপন সংক্রান্ত যোগাযোগ",
    "প্রযুক্তিগত সমস্যা",
    "নতুন ফিচারের পরামর্শ",
    "কপিরাইট অভিযোগ",
    "অন্যান্য যেকোনো প্রশ্ন",
];

export default function ContactPage() {
    return (
        <PageLayout
            title="যোগাযোগ করুন"
            description="আপনার যেকোনো প্রশ্ন, মতামত, পরামর্শ অথবা সহযোগিতার বিষয়ে আমাদের সঙ্গে যোগাযোগ করতে পারেন। আমরা যত দ্রুত সম্ভব উত্তর দেওয়ার চেষ্টা করি।"
        >
            <div className="space-y-8 md:space-y-10 lg:space-y-12">
                {/* Hero */}
                <section className="rounded-2xl border border-border bg-card p-5 shadow-custom transition-colors sm:p-6 md:rounded-3xl md:p-8 lg:p-10">
                    <div className="inline-flex rounded-full border border-border bg-muted px-2.5 py-1 text-xs font-medium text-muted-foreground shadow-sm sm:px-3 sm:text-sm">
                        আমরা আপনার কথা শুনতে আগ্রহী
                    </div>

                    <h2 className="mt-4 text-2xl font-bold tracking-tight text-foreground sm:mt-5 sm:text-3xl lg:mt-6 lg:text-4xl">
                        যোগাযোগ করুন
                    </h2>

                    <p className="mt-5 max-w-4xl text-base leading-7 text-muted-foreground sm:mt-6 sm:text-lg sm:leading-8 lg:leading-9">
                        জীবন চক্রের প্রতিটি পাঠকের মতামত আমাদের কাছে
                        গুরুত্বপূর্ণ। কোনো ভুল তথ্য, নতুন লেখার প্রস্তাব,
                        ব্যবসায়িক সহযোগিতা, বিজ্ঞাপন, প্রযুক্তিগত সমস্যা
                        অথবা সাধারণ মতামত—যেকোনো বিষয়ে নির্দ্বিধায়
                        আমাদের সঙ্গে যোগাযোগ করতে পারেন।
                    </p>
                </section>

                {/* Contact */}
                <section className="grid gap-6 lg:grid-cols-[340px_1fr] lg:gap-8 xl:grid-cols-[360px_1fr]">
                    {/* Contact Cards */}
                    <div className="space-y-4 sm:space-y-5">
                        {contactItems.map((item) => {
                            const Icon = item.icon;

                            return (
                                <div
                                    key={item.title}
                                    className="rounded-xl border border-border bg-card p-5 shadow-custom transition-all duration-200 hover:-translate-y-1 hover:bg-muted/40 hover:shadow-sm sm:rounded-2xl sm:p-6"
                                >
                                    <div className="flex items-start gap-3 sm:gap-4">
                                        <div className="rounded-lg border border-border bg-muted p-2.5 shadow-sm sm:rounded-xl sm:p-3">
                                            <Icon
                                                size={20}
                                                className="text-foreground sm:h-[22px] sm:w-[22px]"
                                            />
                                        </div>

                                        <div className="min-w-0 flex-1">
                                            <h3 className="text-base font-semibold text-foreground sm:text-lg">
                                                {item.title}
                                            </h3>

                                            <p className="mt-2 whitespace-pre-line text-sm leading-7 text-muted-foreground sm:text-base">
                                                {item.value}
                                            </p>

                                            {item.description && (
                                                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                                                    {item.description}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Form */}
                    <div className="rounded-2xl border border-border bg-card p-5 shadow-custom sm:p-6 md:rounded-3xl md:p-8">
                        <div className="flex items-center gap-3">
                            <div className="rounded-lg border border-border bg-muted p-2 shadow-sm sm:rounded-xl">
                                <MessageCircle
                                    size={20}
                                    className="text-foreground sm:h-[22px] sm:w-[22px]"
                                />
                            </div>

                            <h2 className="text-xl font-bold text-foreground sm:text-2xl">
                                আমাদের বার্তা পাঠান
                            </h2>
                        </div>

                        <form className="mt-6 space-y-5 sm:mt-8 sm:space-y-6">
                            <div className="grid gap-5 md:grid-cols-2">
                                <div>
                                    <label className="mb-2 block text-sm font-medium text-foreground sm:text-base">
                                        আপনার নাম
                                    </label>

                                    <input
                                        type="text"
                                        placeholder="আপনার নাম লিখুন"
                                        className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none transition-all placeholder:text-muted-foreground focus:border-ring focus:ring-2 focus:ring-ring/20 sm:text-base"
                                    />
                                </div>

                                <div>
                                    <label className="mb-2 block text-sm font-medium text-foreground sm:text-base">
                                        ইমেইল
                                    </label>

                                    <input
                                        type="email"
                                        placeholder="name@example.com"
                                        className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none transition-all placeholder:text-muted-foreground focus:border-ring focus:ring-2 focus:ring-ring/20 sm:text-base"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="mb-2 block text-sm font-medium text-foreground sm:text-base">
                                    বিষয়
                                </label>

                                <input
                                    type="text"
                                    placeholder="বার্তার বিষয়"
                                    className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none transition-all placeholder:text-muted-foreground focus:border-ring focus:ring-2 focus:ring-ring/20 sm:text-base"
                                />
                            </div>

                            <div>
                                <label className="mb-2 block text-sm font-medium text-foreground sm:text-base">
                                    আপনার বার্তা
                                </label>

                                <textarea
                                    rows={8}
                                    placeholder="আপনার বার্তা লিখুন..."
                                    className="min-h-[180px] w-full resize-y rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none transition-all placeholder:text-muted-foreground focus:border-ring focus:ring-2 focus:ring-ring/20 sm:min-h-[220px] sm:text-base"
                                />

                                <button
                                    type="submit"
                                    className="mt-6 inline-flex w-full items-center justify-center rounded-xl bg-foreground px-6 py-3.5 text-sm font-medium text-background transition-all duration-200 hover:bg-foreground/90 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background sm:mt-8 sm:w-auto sm:px-8 sm:py-4 sm:text-base"
                                >
                                    বার্তা পাঠান
                                </button>
                            </div>
                        </form>
                    </div>
                </section>

                {/* FAQ */}
                <section>
                    <div className="mb-6 sm:mb-8">
                        <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                            কী বিষয়ে যোগাযোগ করতে পারেন?
                        </h2>

                        <p className="mt-3 max-w-3xl text-sm leading-7 text-muted-foreground sm:text-base sm:leading-8">
                            নিচের যেকোনো বিষয়ে আমাদের সঙ্গে যোগাযোগ করতে
                            পারেন। আমরা যথাসম্ভব দ্রুত উত্তর দেওয়ার চেষ্টা করি।
                        </p>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4 lg:gap-6">
                        {contactReasons.map((item) => (
                            <div
                                key={item}
                                className="rounded-xl border border-border bg-card px-5 py-4 text-sm font-medium leading-7 text-foreground shadow-custom transition-all duration-200 hover:-translate-y-1 hover:bg-muted/40 hover:shadow-sm sm:text-base"
                            >
                                {item}
                            </div>
                        ))}
                    </div>
                </section>

                {/* CTA */}
                <section className="rounded-2xl border border-border bg-card p-6 text-center shadow-custom sm:rounded-3xl sm:p-8 md:p-10">
                    <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                        আপনার মতামত আমাদের জন্য মূল্যবান
                    </h2>

                    <p className="mx-auto mt-5 max-w-3xl text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
                        জীবন চক্রকে আরও সমৃদ্ধ ও কার্যকর করে তুলতে আপনার
                        মতামত, পরামর্শ এবং গঠনমূলক সমালোচনা আমাদের অনুপ্রাণিত
                        করে। কোনো প্রশ্ন, তথ্য সংশোধনের অনুরোধ অথবা
                        সহযোগিতার বিষয়ে যেকোনো সময় আমাদের সঙ্গে যোগাযোগ
                        করতে পারেন।
                    </p>

                    <Link
                        href="/contact"
                        className="mt-8 inline-flex w-full items-center justify-center rounded-xl bg-foreground px-6 py-3.5 text-sm font-medium text-background transition-all duration-200 hover:bg-foreground/90 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background sm:w-auto sm:px-8 sm:py-4 sm:text-base"
                    >
                        যোগাযোগ করুন
                    </Link>
                </section>
            </div>
        </PageLayout>
    );
}