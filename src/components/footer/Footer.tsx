import Image from "next/image";
import Link from "next/link";

import Container from "@/components/ui/Container";
import {
    footerNavigation,
    mainNavigation,
} from "@/constants/navigation";
import {
    ArrowUpRight,
    Mail,
} from "lucide-react";

import {
    FaFacebook,
} from "react-icons/fa";

export default function Footer() {
    return (
        <footer className="border-t border-white/10 bg-[#1b2132] text-white">

            <Container>

                <div className="py-14 lg:py-16">


                    {/* Top */}

                    <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr_1fr]">


                        {/* Brand */}

                        <div>

                            <Link
                                href="/"
                                aria-label="জীবন চক্র"
                                className="inline-block"
                            >

                                <Image
                                    src="/logo-white.png"
                                    alt="জীবন চক্র"
                                    width={180}
                                    height={50}
                                    priority
                                    className="h-12 w-auto"
                                />

                            </Link>


                            <p className="mt-5 max-w-md text-sm leading-7 text-white/60">

                                জীবনকে আরও সুন্দর, সচেতন এবং অর্থবহ করে তুলতে
                                উপদেশ, উক্তি, শিক্ষণীয় গল্প, বাস্তব ঘটনা ও
                                অনুপ্রেরণামূলক বিভিন্ন লেখা প্রকাশ করা হয়।

                            </p>


                            {/* Social */}

                            <div className="mt-6 flex items-center gap-3">

                                <Link
                                    href="https://facebook.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-white/70 transition hover:bg-white/10 hover:text-white"
                                >
                                    <FaFacebook size={18} />
                                </Link>


                                <Link
                                    href="/contact"
                                    className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-white/70 transition hover:bg-white/10 hover:text-white"
                                >
                                    <Mail size={17} />
                                </Link>

                            </div>

                        </div>



                        {/* Navigation */}

                        <div>

                            <h3 className="mb-5 text-sm font-semibold uppercase tracking-wide text-white">
                                নেভিগেশন
                            </h3>


                            <ul className="space-y-3">

                                {mainNavigation.map((item) => (

                                    <li key={item.href}>

                                        <Link
                                            href={item.href}
                                            className="group flex items-center gap-1 text-sm text-white/60 transition hover:text-white"
                                        >

                                            {item.label}

                                            <ArrowUpRight
                                                size={13}
                                                className="opacity-0 transition group-hover:opacity-100"
                                            />

                                        </Link>

                                    </li>

                                ))}

                            </ul>

                        </div>



                        {/* Information */}

                        <div>

                            <h3 className="mb-5 text-sm font-semibold uppercase tracking-wide text-white">
                                তথ্য
                            </h3>


                            <ul className="space-y-3">

                                {footerNavigation.map((item) => (

                                    <li key={item.href}>

                                        <Link
                                            href={item.href}
                                            className="group flex items-center gap-1 text-sm text-white/60 transition hover:text-white"
                                        >

                                            {item.label}

                                            <ArrowUpRight
                                                size={13}
                                                className="opacity-0 transition group-hover:opacity-100"
                                            />

                                        </Link>

                                    </li>

                                ))}

                            </ul>

                        </div>



                        {/* Newsletter / About */}

                        <div>

                            <h3 className="mb-5 text-sm font-semibold uppercase tracking-wide text-white">
                                আমাদের সাথে
                            </h3>


                            <p className="text-sm leading-6 text-white/60">

                                নতুন লেখা, শিক্ষা ও অনুপ্রেরণামূলক
                                কনটেন্ট পেতে আমাদের সাথে থাকুন।

                            </p>


                            <Link
                                href="/contact"
                                className="mt-5 inline-flex items-center rounded-lg bg-white px-4 py-2 text-sm font-medium text-black transition hover:bg-white/90"
                            >

                                যোগাযোগ করুন

                                <ArrowUpRight
                                    size={15}
                                    className="ml-1"
                                />

                            </Link>

                        </div>


                    </div>



                    {/* Divider */}

                    <div className="my-10 border-t border-white/10" />



                    {/* Bottom */}

                    <div className="flex flex-col items-center justify-between gap-3 text-sm text-white/50 md:flex-row">

                        <p>
                            © {new Date().getFullYear()} জীবন চক্র।
                            সর্বস্বত্ব সংরক্ষিত।
                        </p>


                        <p>
                            Designed & Developed by Nirdeshona Inc.
                        </p>

                    </div>


                </div>

            </Container>

        </footer>
    );
}