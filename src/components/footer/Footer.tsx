import Image from "next/image";
import Link from "next/link";

import Container from "@/components/ui/Container";
import {
    footerNavigation,
    mainNavigation,
} from "@/constants/navigation";

export default function Footer() {
    return (
        <footer className="border-t border-gray-200 bg-gray-50">
            <Container>
                <div className="py-14">

                    {/* Top */}

                    <div className="grid gap-12 lg:grid-cols-[1.5fr_1fr_1fr]">

                        {/* Brand */}

                        <div>
                            <Link
                                href="/"
                                className="shrink-0"
                                aria-label="জীবন চক্র"
                            >
                                <Image
                                    src="/JibonChokroLogo.png"
                                    alt="জীবন চক্র"
                                    width={180}
                                    height={50}
                                    priority
                                    className="h-15 w-auto"
                                />
                            </Link>

                            <p className="mt-5 max-w-md leading-7 text-gray-600">
                                জীবনকে আরও সুন্দর, সচেতন এবং অর্থবহ করে তুলতে
                                উপদেশ, উক্তি, শিক্ষণীয় গল্প, বাস্তব ঘটনা ও
                                অনুপ্রেরণামূলক বিভিন্ন লেখা প্রকাশ করা হয়।
                            </p>
                        </div>

                        {/* Navigation */}

                        <div>
                            <h3 className="mb-5 text-lg font-semibold">
                                নেভিগেশন
                            </h3>

                            <ul className="space-y-3">
                                {mainNavigation.map((item) => (
                                    <li key={item.href}>
                                        <Link
                                            href={item.href}
                                            className="text-gray-600 transition hover:text-green-700"
                                        >
                                            {item.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Information */}

                        <div>
                            <h3 className="mb-5 text-lg font-semibold">
                                তথ্য
                            </h3>

                            <ul className="space-y-3">
                                {footerNavigation.map((item) => (
                                    <li key={item.href}>
                                        <Link
                                            href={item.href}
                                            className="text-gray-600 transition hover:text-green-700"
                                        >
                                            {item.label}
                                        </Link>
                                    </li>
                                ))}

                                <li>
                                    <a
                                        href="https://facebook.com"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-gray-600 transition hover:text-green-700"
                                    >
                                        Facebook
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Divider */}

                    <div className="my-10 border-t border-gray-200" />

                    {/* Bottom */}

                    <div className="flex flex-col items-center justify-between gap-4 text-sm text-gray-500 md:flex-row">

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