"use client";

import { mainNavigation } from "@/constants/navigation";
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

    return (
        <nav
            aria-label="Main navigation"
            className="hidden items-center gap-2 lg:flex"
        >
            {mainNavigation.map((item) => {
                const active = isActive(item.href);

                return (
                    <Link
                        key={item.href}
                        href={item.href}
                        aria-current={
                            active ? "page" : undefined
                        }
                        className={`inline-flex h-9 items-center rounded-lg px-3 text-sm font-medium whitespace-nowrap transition-all duration-200 ${active
                            ? "bg-muted/80 text-foreground"
                            : "bg-muted/80 text-muted-foreground hover:bg-muted/70 hover:text-foreground"
                            }`}
                    >
                        {item.label}
                    </Link>
                );
            })}

            <DesktopMoreMenu
                desktopMenuOpen={desktopMenuOpen}
                setDesktopMenuOpen={setDesktopMenuOpen}
                setUserMenuOpen={setUserMenuOpen}
                desktopMenuRef={desktopMenuRef}
                isActive={isActive}
            />
        </nav>
    );
}