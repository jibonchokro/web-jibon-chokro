import Link from "next/link";
import { FaFacebookF } from "react-icons/fa6";

import Container from "@/components/ui/Container";

export default function FacebookSection() {
    return (
        <section className="py-12 sm:py-16 lg:py-20">
            <Container>

                <div className="relative overflow-hidden rounded-3xl border border-black/50">

                    {/* Background Image */}

                    <div
                        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                        style={{
                            backgroundImage: "url('/FB-IMAGE-PAGE.jpg')",
                        }}
                    />

                    {/* Dark Overlay */}

                    <div className="absolute inset-0 bg-black/85" />

                    {/* Blur Layer */}

                    <div className="absolute inset-0 backdrop-blur-[10px]" />

                    {/* Extra Gradient */}

                    <div className="absolute inset-0 bg-gradient-to-br from-black/10 via-black/5 to-black/30" />

                    {/* Content */}

                    <div className="relative px-4 py-8 text-center text-white sm:px-6 sm:py-10">

                        <div className="mx-auto max-w-3xl">

                            {/* Icon */}

                            <div className="mb-6 flex justify-center">

                                <div className="rounded-full border border-white/20 bg-white/10 p-4 backdrop-blur-lg">

                                    <FaFacebookF className="h-8 w-8 sm:h-10 sm:w-10" />

                                </div>

                            </div>

                            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl">
                                আমাদের সাথে যুক্ত থাকুন
                            </h2>

                            <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-white/80 sm:text-base sm:leading-8 lg:text-lg">
                                প্রতিদিন নতুন উপদেশ, উক্তি, শিক্ষণীয় গল্প এবং
                                বাস্তব জীবনের অনুপ্রেরণামূলক লেখা পেতে আমাদের
                                Facebook Page অনুসরণ করুন।
                            </p>

                            <div className="mt-8 sm:mt-10">

                                <Link
                                    href="https://www.facebook.com/profile.php?id=61553329931242"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-3 rounded-xl bg-white px-6 py-3 text-sm font-semibold text-black transition hover:bg-gray-100 sm:px-8 sm:py-4 sm:text-base"
                                >
                                    <FaFacebookF className="h-4 w-4 sm:h-5 sm:w-5" />

                                    Page ভিজিট করুন
                                </Link>

                            </div>

                        </div>

                    </div>

                </div>

            </Container>
        </section>
    );
}