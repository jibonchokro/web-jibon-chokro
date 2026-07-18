import Link from "next/link";
import { FaFacebookF } from "react-icons/fa6";

import Container from "@/components/ui/Container";

export default function FacebookSection() {
    return (
        <section className="py-12 sm:py-16 lg:py-20">
            <Container>
                <div className="overflow-hidden rounded-3xl border border-black/10 bg-[#1b2132] px-5 py-12 text-center text-white shadow-sm sm:px-8 sm:py-16">

                    <div className="mx-auto max-w-3xl">

                        {/* Icon */}

                        <div className="mb-6 flex justify-center">

                            <div className="rounded-full border border-white/20 bg-white/10 p-4">

                                <FaFacebookF className="h-8 w-8 sm:h-10 sm:w-10" />

                            </div>

                        </div>


                        {/* Title */}

                        <h2 className="text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl">

                            আমাদের সাথে যুক্ত থাকুন

                        </h2>


                        {/* Description */}

                        <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-white/70 sm:mt-5 sm:text-base sm:leading-8 lg:text-lg">

                            প্রতিদিন নতুন উপদেশ, উক্তি, শিক্ষণীয় গল্প এবং
                            বাস্তব জীবনের অনুপ্রেরণামূলক লেখা পেতে আমাদের
                            Facebook Page অনুসরণ করুন।

                        </p>


                        {/* Button */}

                        <div className="mt-8 sm:mt-10">

                            <Link
                                href="https://facebook.com/YOUR_PAGE_USERNAME"
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
            </Container>
        </section>
    );
}