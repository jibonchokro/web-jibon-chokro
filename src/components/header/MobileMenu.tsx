"use client";

import SearchBox from "@/components/search/SearchBox";
import { mobileNavigation } from "@/constants/navigation";
import Link from "next/link";
import { usePathname } from "next/navigation";

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
        <div className="flex max-h-[calc(100vh-4rem)] flex-col border-t border-gray-200 py-5 lg:hidden">

            {/* Search */}
            <div className="mb-6 shrink-0">
                <SearchBox />
            </div>

            {/* Scrollable Navigation */}
            <nav className="flex-1 space-y-1 overflow-y-auto pr-1">

                {mobileNavigation.map((item) => (
                    <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setMobileOpen(false)}
                        className={`block rounded-lg px-3 py-3 transition ${isActive(item.href)
                                ? "bg-green-50 font-semibold text-green-700"
                                : "text-gray-700 hover:bg-gray-100"
                            }`}
                    >
                        {item.label}
                    </Link>
                ))}

            </nav>

        </div>
    );
}