import Footer from "@/components/footer/Footer";
import Header from "@/components/header/Header";
import SearchBox from "@/components/search/SearchBox";
import { createClient } from "@/lib/supabase/server";

import {
    ArrowLeft,
    Compass,
    Home,
} from "lucide-react";
import Link from "next/link";

export default async function NotFound() {
    const supabase = await createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    return (
        <>
            <Header user={user} />

            <main className="mx-auto flex min-h-[calc(100vh-9rem)] max-w-7xl items-center px-6 py-16">

                <div className="mx-auto w-full max-w-3xl text-center">

                    {/* Badge */}

                    <div className="inline-flex rounded-full border border-gray-200 bg-gray-50 px-4 py-1 text-sm font-medium text-gray-600">
                        Error 404
                    </div>

                    {/* Title */}

                    <h1 className="mt-6 text-7xl font-black tracking-tight text-gray-900 sm:text-8xl">
                        404
                    </h1>

                    <h2 className="mt-6 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                        পৃষ্ঠাটি খুঁজে পাওয়া যায়নি
                    </h2>

                    <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-gray-600 sm:text-lg">
                        আপনি যে পৃষ্ঠাটি খুঁজছেন সেটি হয় সরিয়ে ফেলা হয়েছে,
                        এর ঠিকানা পরিবর্তন হয়েছে অথবা এটি আর বিদ্যমান নেই।
                        নিচের সার্চ ব্যবহার করুন অথবা অন্য কোনো পৃষ্ঠা ভিজিট করুন।
                    </p>

                    {/* Search */}

                    <div className="mx-auto mt-10 w-full max-w-2xl">
                        <SearchBox className="w-full" />
                    </div>

                    {/* Actions */}

                    <div className="mt-8 flex flex-wrap items-center justify-center gap-3">

                        <Link
                            href="/"
                            className="inline-flex items-center gap-2 rounded-lg bg-black px-5 py-3 text-sm font-medium text-white transition hover:bg-gray-900"
                        >
                            <Home size={18} />
                            হোমপেজ
                        </Link>

                        <Link
                            href="/posts"
                            className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-5 py-3 text-sm font-medium text-gray-700 transition hover:bg-gray-100"
                        >
                            <Compass size={18} />
                            সব লেখা
                        </Link>

                        <Link
                            href="/"
                            className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-5 py-3 text-sm font-medium text-gray-700 transition hover:bg-gray-100"
                        >
                            <ArrowLeft size={18} />
                            হোমে ফিরে যান
                        </Link>

                    </div>

                    {/* Quick Links */}

                    <div className="mt-14 border-t border-gray-200 pt-8">

                        <p className="mb-5 text-sm font-medium uppercase tracking-wider text-gray-500">
                            জনপ্রিয় পেজ
                        </p>

                        <div className="flex flex-wrap justify-center gap-3">

                            {[
                                ["সকল লেখা", "/posts"],
                                ["আমাদের সম্পর্কে", "/about"],
                                ["যোগাযোগ", "/contact"],
                                ["গোপনীয়তা নীতি", "/privacy"],
                                ["ব্যবহারের শর্তাবলী", "/terms"],
                            ].map(([label, href]) => (
                                <Link
                                    key={href}
                                    href={href}
                                    className="rounded-full border border-gray-200 bg-white px-4 py-2 text-sm text-gray-700 transition hover:bg-gray-100"
                                >
                                    {label}
                                </Link>
                            ))}

                        </div>

                    </div>

                    {/* Footer Note */}

                    <p className="mt-12 text-sm text-gray-500">
                        যদি আপনি মনে করেন এটি একটি ত্রুটি,{" "}
                        <Link
                            href="/contact"
                            className="font-medium text-gray-900 underline underline-offset-4"
                        >
                            আমাদের জানান
                        </Link>
                        ।
                    </p>

                </div>

            </main>

            <Footer />
        </>
    );
}