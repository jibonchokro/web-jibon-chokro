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
        <footer className="border-t border-border bg-background text-foreground">

            <Container>

                <div className="py-14 lg:py-16">

                    {/* Top */}

                    <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr_1fr]">

                        {/* Brand */}

                        <div>

                            <Link
                                href="/"
                                aria-label="জীবন চক্র"
                                className="relative inline-flex h-12 w-[180px] items-center"
                            >
                                {/* Light mode logo */}
                                <Image
                                    src="/logo.png"
                                    alt="জীবন চক্র"
                                    width={180}
                                    height={50}
                                    priority
                                    className="
                                        h-12
                                        w-auto
                                        object-contain
                                        opacity-100
                                        dark:opacity-0
                                    "
                                />

                                {/* Dark mode logo */}
                                <Image
                                    src="/logo-white.png"
                                    alt="জীবন চক্র"
                                    width={180}
                                    height={50}
                                    priority
                                    className="
                                        absolute
                                        inset-0
                                        h-12
                                        w-auto
                                        object-contain
                                        opacity-0
                                        dark:opacity-100
                                    "
                                />
                            </Link>

                            <p className="mt-5 max-w-md text-sm leading-7 text-muted-foreground">
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
                                    aria-label="Facebook"
                                    className="flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-muted text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                                >
                                    <FaFacebook size={18} />
                                </Link>

                                <Link
                                    href="/contact"
                                    aria-label="যোগাযোগ"
                                    className="flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-muted text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                                >
                                    <Mail size={17} />
                                </Link>

                            </div>

                        </div>


                        {/* Navigation */}

                        <div>

                            <h3 className="mb-5 text-sm font-semibold uppercase tracking-wide text-foreground">
                                নেভিগেশন
                            </h3>

                            <ul className="space-y-3">

                                {mainNavigation.map((item) => (

                                    <li key={item.href}>

                                        <Link
                                            href={item.href}
                                            className="group flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
                                        >

                                            {item.label}

                                            <ArrowUpRight size={13} className="opacity-0 transition group-hover:opacity-100" />

                                        </Link>

                                    </li>

                                ))}

                            </ul>

                        </div>


                        {/* Information */}

                        <div>

                            <h3 className="mb-5 text-sm font-semibold uppercase tracking-wide text-foreground">
                                তথ্য
                            </h3>

                            <ul className="space-y-3">

                                {footerNavigation.map((item) => (

                                    <li key={item.href}>

                                        <Link
                                            href={item.href}
                                            className="group flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
                                        >

                                            {item.label}

                                            <ArrowUpRight size={13} className="opacity-0 transition group-hover:opacity-100" />

                                        </Link>

                                    </li>

                                ))}

                            </ul>

                        </div>


                        {/* Contact */}

                        <div>

                            <h3 className="mb-5 text-sm font-semibold uppercase tracking-wide text-foreground">
                                আমাদের সাথে
                            </h3>

                            <p className="text-sm leading-6 text-muted-foreground">
                                নতুন লেখা, শিক্ষা ও অনুপ্রেরণামূলক
                                কনটেন্ট পেতে আমাদের সাথে থাকুন।
                            </p>

                            <Link
                                href="/contact"
                                className="mt-5 inline-flex items-center rounded-lg bg-foreground px-4 py-2 text-sm font-medium text-background transition-colors hover:opacity-90"
                            >

                                যোগাযোগ করুন

                                <ArrowUpRight size={15} className="ml-1" />

                            </Link>

                        </div>

                    </div>


                    {/* Divider */}

                    <div className="my-10 border-t border-border" />


                    {/* Bottom */}

                    <div className="flex flex-col items-center justify-between gap-3 text-sm text-muted-foreground md:flex-row">

                        <p>
                            © {new Date().getFullYear()} জীবন চক্র।
                            সর্বস্বত্ব সংরক্ষিত।
                        </p>

                        <p>
                            Designed &amp; Developed by Nirdeshona Inc.
                        </p>

                    </div>

                </div>

            </Container>

        </footer>
    );
}