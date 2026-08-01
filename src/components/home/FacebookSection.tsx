"use client";

import {
    BadgeCheck,
    BookOpen,
    HeartHandshake,
    Sparkles,
    Users
} from "lucide-react";
import Link from "next/link";
import { FaFacebookF } from "react-icons/fa6";

import Container from "@/components/ui/Container";

export default function FacebookSection() {
    return (
        <section className="py-8 sm:py-10 lg:py-12">

            <Container>

                <div className="relative overflow-hidden rounded-3xl border border-black/10 shadow-custom">

                    {/* Background */}

                    <div
                        className="absolute inset-0 bg-cover bg-center"
                        style={{
                            backgroundImage:
                                "url('/FB-IMAGE-PAGE.jpg')",
                        }}
                    />

                    <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40" />

                    <div className="absolute -left-20 top-0 h-64 w-64 rounded-full bg-blue-500/20 blur-3xl" />

                    <div className="absolute -right-20 bottom-0 h-72 w-72 rounded-full bg-sky-400/20 blur-3xl" />

                    {/* Content */}

                    <div className="relative px-6 py-10 sm:px-10 sm:py-14 lg:px-14">

                        <div className="grid items-center gap-6 sm:gap-10 lg:grid-cols-[1fr_280px]">

                            {/* Left */}

                            <div>

                                <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-medium text-white backdrop-blur-md">

                                    <FaFacebookF className="text-[#1877F2]" />

                                    Facebook Community

                                </div>

                                <h2 className="mt-6 max-w-2xl text-2xl font-black leading-tight text-white sm:text-3xl lg:text-4xl">

                                    প্রতিদিন নতুন কিছু শিখুন,
                                    অনুপ্রাণিত হোন

                                </h2>

                                <p className="mt-6 sm:mt-4 max-w-2xl text-base leading-8 text-white/80 sm:text-lg">

                                    জীবনচক্র Facebook Page-এ প্রতিদিন
                                    প্রকাশিত হয় অনুপ্রেরণামূলক লেখা,
                                    ইসলামিক জ্ঞান, সফলতার গল্প,
                                    ক্যারিয়ার, প্রযুক্তি, সম্পর্ক,
                                    স্বাস্থ্য এবং বাস্তব জীবনের
                                    মূল্যবান পরামর্শ।

                                </p>

                                {/* Features */}

                                <div className="mt-4 hidden gap-4 sm:grid sm:grid-cols-2">

                                    <div className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/10 p-3 backdrop-blur-md">

                                        <Sparkles className="mt-1 h-5 w-5 shrink-0 text-yellow-300" />

                                        <div>

                                            <h3 className="font-semibold text-white">
                                                প্রতিদিন নতুন পোস্ট
                                            </h3>

                                            <p className="mt-1 text-sm leading-6 text-white/70">
                                                নিয়মিত নতুন ও মানসম্মত
                                                বাংলা কনটেন্ট।
                                            </p>

                                        </div>

                                    </div>

                                    <div className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur-md">

                                        <BookOpen className="mt-1 h-5 w-5 shrink-0 text-green-300" />

                                        <div>

                                            <h3 className="font-semibold text-white">
                                                জ্ঞানভিত্তিক কনটেন্ট
                                            </h3>

                                            <p className="mt-1 text-sm leading-6 text-white/70">
                                                বাস্তব জীবন ও শিক্ষামূলক
                                                বিষয়সমূহ।
                                            </p>

                                        </div>

                                    </div>

                                    <div className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur-md">

                                        <HeartHandshake className="mt-1 h-5 w-5 shrink-0 text-pink-300" />

                                        <div>

                                            <h3 className="font-semibold text-white">
                                                অনুপ্রেরণামূলক লেখা
                                            </h3>

                                            <p className="mt-1 text-sm leading-6 text-white/70">
                                                ইতিবাচক চিন্তা ও আত্মউন্নয়ন।
                                            </p>

                                        </div>

                                    </div>

                                    <div className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur-md">

                                        <BadgeCheck className="mt-1 h-5 w-5 shrink-0 text-cyan-300" />

                                        <div>

                                            <h3 className="font-semibold text-white">
                                                বিশ্বস্ত তথ্য
                                            </h3>

                                            <p className="mt-1 text-sm leading-6 text-white/70">
                                                যাচাইকৃত ও মানসম্মত
                                                প্রকাশনা।
                                            </p>

                                        </div>

                                    </div>

                                </div>

                            </div>

                            {/* Right */}

                            <div className="rounded-3xl border border-white/10 bg-white/10 p-8 text-center backdrop-blur-sm">

                                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[#1877F2]">

                                    <FaFacebookF className="text-4xl text-white" />

                                </div>

                                <h3 className="mt-6 text-2xl font-bold text-white">
                                    জীবনচক্র
                                </h3>

                                <p className="mt-2 text-sm leading-7 text-white/70">
                                    জীবনকে সমৃদ্ধ করার বাংলা জ্ঞানভান্ডার
                                </p>

                                <Link
                                    href="https://www.facebook.com/profile.php?id=61553329931242"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="mt-6 inline-flex w-full items-center justify-center rounded-xl bg-white px-5 py-3 font-semibold text-black transition hover:bg-gray-100"
                                >
                                    এখনই ভিজিট করুন
                                </Link>

                                <div className="mt-4 sm:mt-6 flex items-center justify-center gap-2 text-sm text-white/80">

                                    <Users className="h-4 w-4" />

                                    লাখো পাঠকের সাথে যুক্ত হন

                                </div>
                            </div>

                        </div>

                    </div>

                </div>

            </Container>

        </section>
    );
}