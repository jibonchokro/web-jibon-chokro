import SearchBox from "@/components/search/SearchBox";
import { createClient } from "@/lib/supabase/server";

import {
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
        <main
            className="
                mx-auto
                flex
                min-h-[calc(100vh-9rem)]
                max-w-7xl
                items-center
                px-6
                py-16
            "
        >
            <div className="mx-auto w-full max-w-3xl text-center">

                {/* Badge */}

                <div
                    className="
                        inline-flex
                        rounded-full
                        border
                        border-black/10
                        bg-black/5
                        px-4
                        py-1
                        text-sm
                        font-medium
                        text-muted-foreground

                        dark:border-white/10
                        dark:bg-white/5
                        dark:text-white/60
                    "
                >
                    Error 404
                </div>


                {/* Title */}

                <h1
                    className="
                        mt-6
                        text-7xl
                        font-black
                        tracking-tight
                        text-foreground

                        dark:text-white

                        sm:text-8xl
                    "
                >
                    404
                </h1>


                <h2
                    className="
                        mt-6
                        text-3xl
                        font-bold
                        tracking-tight
                        text-foreground

                        dark:text-white

                        sm:text-4xl
                    "
                >
                    পৃষ্ঠাটি খুঁজে পাওয়া যায়নি
                </h2>


                <p
                    className="
                        mx-auto
                        mt-5
                        max-w-2xl
                        text-base
                        leading-7
                        text-muted-foreground

                        dark:text-white/65

                        sm:text-lg
                    "
                >
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
                        className="
                            inline-flex
                            items-center
                            gap-2
                            rounded-lg
                            bg-foreground
                            px-5
                            py-3
                            text-sm
                            font-medium
                            text-background
                            transition
                            hover:opacity-90

                            dark:bg-white
                            dark:text-black
                        "
                    >
                        <Home size={18} />
                        হোমপেজ
                    </Link>


                    <Link
                        href="/posts"
                        className="
                            inline-flex
                            items-center
                            gap-2
                            rounded-lg
                            border
                            border-black/10
                            bg-background
                            px-5
                            py-3
                            text-sm
                            font-medium
                            text-foreground
                            transition
                            hover:bg-muted

                            dark:border-white/10
                            dark:bg-white/5
                            dark:text-white
                            dark:hover:bg-white/10
                        "
                    >
                        <Compass size={18} />
                        সব লেখা
                    </Link>

                </div>


                {/* Quick Links */}

                <div
                    className="
                        mt-14
                        border-t
                        border-black/10
                        pt-8

                        dark:border-white/10
                    "
                >

                    <p
                        className="
                            mb-5
                            text-sm
                            font-medium
                            uppercase
                            tracking-wider
                            text-muted-foreground

                            dark:text-white/50
                        "
                    >
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
                                className="
                                    rounded-full
                                    border
                                    border-black/10
                                    bg-background
                                    px-4
                                    py-2
                                    text-sm
                                    text-muted-foreground
                                    transition
                                    hover:bg-muted
                                    hover:text-foreground

                                    dark:border-white/10
                                    dark:bg-white/5
                                    dark:text-white/60
                                    dark:hover:bg-white/10
                                    dark:hover:text-white
                                "
                            >
                                {label}
                            </Link>
                        ))}

                    </div>

                </div>


                {/* Footer Note */}

                <p
                    className="
                        mt-12
                        text-sm
                        text-muted-foreground

                        dark:text-white/50
                    "
                >
                    যদি আপনি মনে করেন এটি একটি ত্রুটি,{" "}

                    <Link
                        href="/contact"
                        className="
                            font-medium
                            text-foreground
                            underline
                            underline-offset-4

                            dark:text-white
                        "
                    >
                        আমাদের জানান
                    </Link>

                    ।
                </p>

            </div>
        </main>
    );
}