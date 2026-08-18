import Image from "next/image";
import Link from "next/link";

import Container from "@/components/ui/Container";

import {
    categoryNavigation,
    exploreNavigation,
    mainNavigation
} from "@/constants/navigation";

import {
    ArrowUpRight,
    BookOpen,
    Mail,
} from "lucide-react";

import { FaFacebook } from "react-icons/fa";

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="border-t border-border bg-background text-foreground">
            <Container>
                <div className="py-8 sm:py-10 lg:py-12">
                    {/* Main Footer */}

                    <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr_1.2fr] lg:gap-8 xl:gap-10">
                        {/* Brand */}

                        <div className="mt-0 sm:-mt-2 sm:col-span-2 lg:col-span-1">
                            <Link
                                href="/"
                                aria-label="জীবনচক্র"
                                className="relative inline-flex h-12 w-[180px] items-center"
                            >
                                {/* Light mode logo */}

                                <Image
                                    src="/logo.png"
                                    alt="জীবনচক্র"
                                    width={180}
                                    height={50}
                                    priority
                                    className="h-12 w-auto object-contain opacity-100 dark:opacity-0"
                                />

                                {/* Dark mode logo */}

                                <Image
                                    src="/logo-white.png"
                                    alt="জীবনচক্র"
                                    width={180}
                                    height={50}
                                    priority
                                    className="absolute inset-0 h-12 w-auto object-contain opacity-0 dark:opacity-100"
                                />
                            </Link>

                            <p className="mt-5 max-w-sm text-sm leading-7 text-muted-foreground">
                                জীবনকে আরও সুন্দর, সচেতন এবং
                                অর্থবহ করে তুলতে উপদেশ, উক্তি,
                                শিক্ষণীয় গল্প, বাস্তব ঘটনা ও
                                অনুপ্রেরণামূলক বিভিন্ন লেখা
                                প্রকাশ করা হয়।
                            </p>

                            {/* Social / Contact */}

                            <div className="mt-6 flex items-center gap-2.5">
                                <Link
                                    href="https://www.facebook.com/profile.php?id=61553329931242"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label="Facebook"
                                    className="flex size-9 items-center justify-center rounded-lg border border-border bg-muted text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                                >
                                    <FaFacebook size={17} />
                                </Link>

                                <a
                                    href="mailto:jibonchokro2000@gmail.com"
                                    aria-label="ইমেইল"
                                    className="flex size-9 items-center justify-center rounded-lg border border-border bg-muted text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                                >
                                    <Mail size={17} />
                                </a>
                            </div>
                        </div>

                        {/* Navigation */}

                        <div>
                            <h3 className="mb-4 text-xs font-semibold uppercase tracking-wider text-foreground">
                                নেভিগেশন
                            </h3>

                            <ul className="space-y-2.5">
                                {mainNavigation.map(
                                    (item) => {
                                        const Icon =
                                            item.icon;

                                        return (
                                            <li
                                                key={
                                                    item.href
                                                }
                                            >
                                                <Link
                                                    href={
                                                        item.href
                                                    }
                                                    className="group flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
                                                >
                                                    {Icon && (
                                                        <Icon
                                                            size={
                                                                15
                                                            }
                                                            strokeWidth={
                                                                1.9
                                                            }
                                                            className="shrink-0"
                                                        />
                                                    )}

                                                    <span>
                                                        {
                                                            item.label
                                                        }
                                                    </span>

                                                    <ArrowUpRight
                                                        size={
                                                            13
                                                        }
                                                        className="ml-auto opacity-0 transition-all duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100"
                                                    />
                                                </Link>
                                            </li>
                                        );
                                    }
                                )}

                                {/* Featured */}

                                {exploreNavigation
                                    .slice(0, 1)
                                    .map((item) => {
                                        const Icon =
                                            item.icon;

                                        return (
                                            <li
                                                key={
                                                    item.href
                                                }
                                            >
                                                <Link
                                                    href={
                                                        item.href
                                                    }
                                                    className="group flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
                                                >
                                                    {Icon && (
                                                        <Icon
                                                            size={
                                                                15
                                                            }
                                                            strokeWidth={
                                                                1.9
                                                            }
                                                            className="shrink-0"
                                                        />
                                                    )}

                                                    <span>
                                                        {
                                                            item.label
                                                        }
                                                    </span>

                                                    <ArrowUpRight
                                                        size={
                                                            13
                                                        }
                                                        className="ml-auto opacity-0 transition-all duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100"
                                                    />
                                                </Link>
                                            </li>
                                        );
                                    })}
                            </ul>
                        </div>

                        {/* Categories */}

                        <div>
                            <h3 className="mb-4 text-xs font-semibold uppercase tracking-wider text-foreground">
                                বিভাগসমূহ
                            </h3>

                            <ul className="space-y-2.5">
                                {categoryNavigation.items
                                    .slice(0, 3)
                                    .map((item) => {
                                        const Icon =
                                            item.icon;

                                        return (
                                            <li
                                                key={
                                                    item.href
                                                }
                                            >
                                                <Link
                                                    href={
                                                        item.href
                                                    }
                                                    className="group flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
                                                >
                                                    {Icon && (
                                                        <Icon
                                                            size={
                                                                15
                                                            }
                                                            strokeWidth={
                                                                1.9
                                                            }
                                                            className="shrink-0"
                                                        />
                                                    )}

                                                    <span>
                                                        {
                                                            item.label
                                                        }
                                                    </span>

                                                    <ArrowUpRight
                                                        size={
                                                            13
                                                        }
                                                        className="ml-auto opacity-0 transition-all duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100"
                                                    />
                                                </Link>
                                            </li>
                                        );
                                    })}

                                <li>
                                    <Link
                                        href="/categories"
                                        className="group flex items-center gap-2 text-sm font-medium text-foreground transition-colors hover:text-muted-foreground"
                                    >
                                        <BookOpen
                                            size={15}
                                            strokeWidth={1.9}
                                        />

                                        <span>
                                            সব বিভাগ দেখুন
                                        </span>

                                        <ArrowUpRight
                                            size={13}
                                            className="ml-auto transition-all duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                                        />
                                    </Link>
                                </li>
                            </ul>
                        </div>

                        {/* Explore */}

                        <div>
                            <h3 className="mb-4 text-xs font-semibold uppercase tracking-wider text-foreground">
                                আবিষ্কার করুন
                            </h3>

                            <ul className="space-y-2.5">
                                {exploreNavigation
                                    .slice(1)
                                    .map((item) => {
                                        const Icon =
                                            item.icon;

                                        return (
                                            <li
                                                key={
                                                    item.href
                                                }
                                            >
                                                <Link
                                                    href={
                                                        item.href
                                                    }
                                                    className="group flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
                                                >
                                                    {Icon && (
                                                        <Icon
                                                            size={
                                                                15
                                                            }
                                                            strokeWidth={
                                                                1.9
                                                            }
                                                            className="shrink-0"
                                                        />
                                                    )}

                                                    <span>
                                                        {
                                                            item.label
                                                        }
                                                    </span>

                                                    <ArrowUpRight
                                                        size={
                                                            13
                                                        }
                                                        className="ml-auto opacity-0 transition-all duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100"
                                                    />
                                                </Link>
                                            </li>
                                        );
                                    })}
                            </ul>
                        </div>

                        {/* Contact */}

                        <div className="rounded-xl border border-border bg-muted/40 p-5">
                            <div className="flex size-9 items-center justify-center rounded-lg border border-border bg-background">
                                <Mail
                                    size={17}
                                    className="text-muted-foreground"
                                />
                            </div>

                            <h3 className="mt-4 text-sm font-semibold">
                                আমাদের সাথে যোগাযোগ করুন
                            </h3>

                            <p className="mt-2 text-sm leading-6 text-muted-foreground">
                                কোনো প্রশ্ন, পরামর্শ বা
                                সহযোগিতার প্রয়োজন হলে
                                আমাদের সাথে যোগাযোগ করুন।
                            </p>

                            <a
                                href="mailto:jibonchokro2000@gmail.com"
                                className="mt-4 block break-all text-sm font-medium text-foreground transition-colors hover:text-muted-foreground"
                            >
                                jibonchokro2000@gmail.com
                            </a>

                            <Link
                                href="/contact"
                                className="mt-4 inline-flex h-9 items-center rounded-lg bg-foreground px-3.5 text-sm font-medium text-background transition-opacity hover:opacity-90"
                            >
                                যোগাযোগ করুন

                                <ArrowUpRight
                                    size={14}
                                    className="ml-1.5"
                                />
                            </Link>
                        </div>
                    </div>

                    {/* Divider */}

                    <div className="my-10 border-t border-border" />

                    {/* Bottom */}

                    <div className="flex flex-col gap-4 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
                        <p>
                            © {currentYear} জীবনচক্র।
                            সর্বস্বত্ব সংরক্ষিত।
                        </p>

                        <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                            <Link
                                href="/privacy"
                                className="transition-colors hover:text-foreground"
                            >
                                গোপনীয়তা
                            </Link>

                            <Link
                                href="/terms"
                                className="transition-colors hover:text-foreground"
                            >
                                ব্যবহারের শর্তাবলী
                            </Link>

                            <span
                                aria-hidden="true"
                                className="hidden h-3.5 w-px bg-border sm:block"
                            />

                            <p>
                                Designed &amp; Developed by
                                Nirdeshona Inc.
                            </p>
                        </div>
                    </div>
                </div>
            </Container>
        </footer>
    );
}