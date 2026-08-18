"use client";

import {
    exploreNavigation,
    mainNavigation,
} from "@/constants/navigation";
import Link from "next/link";
import { usePathname } from "next/navigation";

import DesktopMoreMenu from "./DesktopMoreMenu";

interface Props {
    desktopMenuOpen: boolean;
    setDesktopMenuOpen: React.Dispatch<
        React.SetStateAction<boolean>
    >;
    setUserMenuOpen: React.Dispatch<
        React.SetStateAction<boolean>
    >;
    desktopMenuRef: React.RefObject<
        HTMLDivElement | null
    >;
}

export default function DesktopNavigation({
    desktopMenuOpen,
    setDesktopMenuOpen,
    setUserMenuOpen,
    desktopMenuRef,
}: Props) {
    const pathname = usePathname();

    const isActive = (href: string) => {
        if (href === "/") {
            return pathname === "/";
        }

        return (
            pathname === href ||
            pathname.startsWith(`${href}/`)
        );
    };

    const featured = exploreNavigation[0];

    const renderItem = (
        item: (typeof mainNavigation)[number]
    ) => {
        const active = isActive(item.href);
        const Icon = item.icon;

        return (
            <Link
                key={item.href}
                href={item.href}
                className={`inline-flex h-9 items-center gap-1.5 rounded-lg px-3 text-sm font-medium whitespace-nowrap transition-colors ${active
                    ? "bg-muted text-foreground"
                    : "text-muted-foreground hover:bg-muted/70 hover:text-foreground"
                    }`}
            >
                {Icon && (
                    <Icon
                        size={16}
                        strokeWidth={
                            active ? 2.2 : 1.9
                        }
                    />
                )}

                <span>{item.label}</span>
            </Link>
        );
    };

    const FeaturedIcon = featured.icon;

    return (
        <nav
            aria-label="প্রধান নেভিগেশন"
            className="hidden items-center gap-1 lg:flex"
        >
            {mainNavigation.map(renderItem)}

            <DesktopMoreMenu
                desktopMenuOpen={desktopMenuOpen}
                setDesktopMenuOpen={
                    setDesktopMenuOpen
                }
                setUserMenuOpen={setUserMenuOpen}
                desktopMenuRef={desktopMenuRef}
                isActive={isActive}
            />
        </nav>
    );
}