import Link from "next/link";
import { FaFacebookF } from "react-icons/fa6";

import Container from "@/components/ui/Container";

export default function FacebookSection() {
    return (
        <section className="py-20">
            <Container>
                <div className="overflow-hidden rounded-3xl bg-gradient-to-r from-green-700 to-green-600 px-8 py-16 text-center text-white shadow-lg">
                    <div className="mx-auto max-w-3xl">
                        <div className="mb-6 flex justify-center">
                            <div className="rounded-full bg-white/15 p-4">
                                <FaFacebookF className="h-10 w-10" />
                            </div>
                        </div>

                        <h2 className="text-3xl font-bold md:text-4xl">
                            আমাদের Facebook Page-এ যুক্ত থাকুন
                        </h2>

                        <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-green-50">
                            প্রতিদিন নতুন উপদেশ, উক্তি, শিক্ষণীয় গল্প এবং বাস্তব জীবনের
                            অনুপ্রেরণামূলক লেখা পেতে আমাদের Facebook Page অনুসরণ করুন।
                        </p>

                        <div className="mt-10">
                            <Link
                                href="https://facebook.com/YOUR_PAGE_USERNAME"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-3 rounded-xl bg-white px-8 py-4 text-lg font-semibold text-green-700 transition hover:scale-105 hover:bg-green-50"
                            >
                                <FaFacebookF className="h-5 w-5" />
                                Facebook Page ভিজিট করুন
                            </Link>
                        </div>
                    </div>
                </div>
            </Container>
        </section>
    );
}