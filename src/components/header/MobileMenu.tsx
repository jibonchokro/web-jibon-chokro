"use client";

import SearchBox from "@/components/search/SearchBox";
import { mobileNavigation } from "@/constants/navigation";
import {
    X
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
        if (mobileOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }

        return () => {
            document.body.style.overflow = "";
        };
    }, [mobileOpen]);

    const isActive = (href: string) => {
        if (href === "/") {
            return pathname === "/";
        }

        return pathname.startsWith(href);
    };

    if (!mobileOpen) {
        return null;
    }

    return (
        <>
            {/* Backdrop */}

            <div
                className="fixed inset-0 z-[90] bg-black/45 backdrop-blur-sm lg:hidden"
                onClick={() => setMobileOpen(false)}
            />

            {/* Full Screen Menu */}

            <aside className="fixed inset-0 z-[100] flex h-dvh flex-col overflow-hidden bg-white lg:hidden">

                {/* Header */}

                <div className="sticky top-0 z-20 border-b border-black/10 bg-white">

                    <div className="flex h-16 items-center justify-between px-5">

                        <div>

                            <p className="text-lg font-bold">
                                Menu
                            </p>

                        </div>

                        <button
                            type="button"
                            aria-label="Close Menu"
                            onClick={() => setMobileOpen(false)}
                            className="rounded-xl border border-black/10 p-2 transition hover:bg-gray-100"
                        >
                            <X size={22} />
                        </button>

                    </div>

                </div>

                {/* Search */}

                <div className="shrink-0 border-b border-black/10 bg-white p-3">

                    <SearchBox className="w-full" />

                </div>

                {/* Scrollable Content */}

                <div className="flex-1 overflow-y-auto">
                    <nav className="p-5">

                        <div className="space-y-2">
                            {mobileNavigation.map((item) => (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    onClick={() => setMobileOpen(false)}
                                    className={`flex items-center justify-between rounded-lg border px-3 py-2 text-[15px] font-medium transition ${isActive(item.href)
                                        ? "border-black bg-black text-white"
                                        : "border-black/10 bg-white hover:bg-gray-50"
                                        }`}
                                >
                                    <span>{item.label}</span>
                                </Link>
                            ))}

                        </div>

                    </nav>
                </div>

                {/* Footer */}

                <div className="sticky bottom-0 z-20 shrink-0 border-t border-black/10 bg-white/95 backdrop-blur-md shadow-[0_0_10px_0_rgba(0,0,0,0.05)]">

                    <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 border-b border-black/3 px-3 pt-3 pb-2 text-[12px] text-gray-500">

                        <Link
                            href="/about"
                            onClick={() => setMobileOpen(false)}
                            className="transition hover:text-black"
                        >
                            About
                        </Link>

                        <Link
                            href="/contact"
                            onClick={() => setMobileOpen(false)}
                            className="transition hover:text-black"
                        >
                            Contact
                        </Link>

                        <Link
                            href="/privacy"
                            onClick={() => setMobileOpen(false)}
                            className="transition hover:text-black"
                        >
                            Privacy
                        </Link>

                        <Link
                            href="/terms"
                            onClick={() => setMobileOpen(false)}
                            className="transition hover:text-black"
                        >
                            Terms
                        </Link>

                    </div>

                    <p className="px-3 pb-3 pt-2 text-center text-xs text-gray-500">
                        © {new Date().getFullYear()} Jibonchokro. All rights reserved.
                    </p>

                </div>

            </aside>

        </>
    );
}