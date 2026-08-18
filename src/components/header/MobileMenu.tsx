"use client";

import {
    categoryNavigation,
    exploreNavigation,
    footerNavigation,
    mainNavigation,
    otherNavigation,
} from "@/constants/navigation";
import {
    ChevronRight,
    X,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

interface Props {
    mobileOpen: boolean;
    setMobileOpen: React.Dispatch<
        React.SetStateAction<boolean>
    >;
}

export default function MobileMenu({
    mobileOpen,
    setMobileOpen,
}: Props) {
    const pathname = usePathname();

    useEffect(() => {
        document.body.style.overflow = mobileOpen
            ? "hidden"
            : "";

        return () => {
            document.body.style.overflow = "";
        };
    }, [mobileOpen]);

    const isActive = (href: string) => {
        if (href === "/") {
            return pathname === "/";
        }

        return (
            pathname === href ||
            pathname.startsWith(`${href}/`)
        );
    };

    const closeMenu = () => {
        setMobileOpen(false);
    };

    const renderItem = (
        item: (typeof mainNavigation)[number]
    ) => {
        const active = isActive(item.href);
        const Icon = item.icon;

        return (
            <Link
                key={item.href}
                href={item.href}
                onClick={closeMenu}
                className={`group flex min-h-11 items-center justify-between rounded-xl border px-3.5 py-2.5 transition-colors ${active
                    ? "border-border bg-muted text-foreground"
                    : "border-transparent text-muted-foreground hover:border-border/70 hover:bg-muted/70 hover:text-foreground"
                    }`}
            >
                <span className="flex min-w-0 items-center gap-3">
                    {Icon && (
                        <Icon
                            size={18}
                            strokeWidth={
                                active ? 2.2 : 1.9
                            }
                            className="shrink-0"
                        />
                    )}

                    <span className="text-sm font-medium">
                        {item.label}
                    </span>
                </span>

                <ChevronRight
                    size={16}
                    className={`shrink-0 transition-transform ${active
                        ? "text-foreground"
                        : "text-muted-foreground/50 group-hover:translate-x-0.5"
                        }`}
                />
            </Link>
        );
    };

    return (
        <>
            {/* Backdrop */}

            <div
                onClick={closeMenu}
                aria-hidden="true"
                className={`fixed inset-0 z-[90] h-dvh bg-black/45 backdrop-blur-sm transition-opacity duration-300 lg:hidden ${mobileOpen
                    ? "pointer-events-auto opacity-100"
                    : "pointer-events-none opacity-0"
                    }`}
            />

            {/* Drawer */}

            <aside
                aria-label="মোবাইল নেভিগেশন"
                className={`fixed inset-y-0 left-0 z-[100] flex h-dvh w-full max-w-[360px] flex-col overflow-hidden border-r border-border bg-background text-foreground shadow-2xl transition-transform duration-300 ease-out lg:hidden ${mobileOpen
                    ? "translate-x-0"
                    : "-translate-x-full"
                    }`}
            >
                {/* Header */}

                <div className="flex bg-muted/40 h-16 shrink-0 items-center justify-between border-b border-border px-5">
                    <div>
                        <p className="text-base font-semibold">
                            Menu
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={closeMenu}
                        aria-label="মেনু বন্ধ করুন"
                        className="flex size-9 items-center justify-center rounded-lg border border-border text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                    >
                        <X size={19} />
                    </button>
                </div>

                {/* Content */}

                <div className="min-h-0 flex-1 overflow-y-auto">
                    <nav className="space-y-7 p-5">
                        {/* Main */}

                        <section>
                            <h2 className="mb-2 px-1 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                                প্রধান
                            </h2>

                            <div className="space-y-1">
                                {mainNavigation.map(
                                    renderItem
                                )}
                            </div>
                        </section>

                        {/* Explore */}

                        <section>
                            <h2 className="mb-2 px-1 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                                আবিষ্কার করুন
                            </h2>

                            <div className="space-y-1">
                                {exploreNavigation.map(
                                    renderItem
                                )}
                            </div>
                        </section>

                        {/* Categories */}

                        <section>
                            <div className="mb-2 flex items-center justify-between px-1">
                                <h2 className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                                    {categoryNavigation.title}
                                </h2>

                                <Link
                                    href="/categories"
                                    onClick={closeMenu}
                                    className="text-xs font-medium text-muted-foreground hover:text-foreground"
                                >
                                    সব দেখুন
                                </Link>
                            </div>

                            <div className="space-y-1">
                                {categoryNavigation.items.map(
                                    renderItem
                                )}
                            </div>
                        </section>

                        {/* Other */}

                        <section>
                            <h2 className="mb-2 px-1 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                                {otherNavigation.title}
                            </h2>

                            <div className="space-y-1">
                                {otherNavigation.items.map(
                                    renderItem
                                )}
                            </div>
                        </section>
                    </nav>
                </div>

                {/* Footer */}

                <div className="shrink-0 border-t border-border bg-muted/40">
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-2 px-5 py-3">
                        {footerNavigation.map(
                            (item) => (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    onClick={closeMenu}
                                    className="text-[10px] text-muted-foreground transition-colors hover:text-foreground"
                                >
                                    {item.label}
                                </Link>
                            )
                        )}
                    </div>

                    <div className="px-5 pb-3">
                        <p className="text-[10px] text-muted-foreground">
                            ©{" "}
                            {new Date().getFullYear()}{" "}
                            Jibonchokro. All rights
                            reserved.
                        </p>
                    </div>
                </div>
            </aside>
        </>
    );
}