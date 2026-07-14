"use client";

import {
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
    desktopMenuRef: React.RefObject<HTMLDivElement | null>;
}

export default function DesktopNavigation({
    desktopMenuOpen,
    setDesktopMenuOpen,
    desktopMenuRef,
}: Props) {
    const pathname = usePathname();

    const isActive = (href: string) => {
        if (href === "/") {
            return pathname === "/";
        }

        return pathname.startsWith(href);
    };

    return (
        <nav className="hidden items-center gap-6 lg:flex">

            {mainNavigation.map((item) => (
                <Link
                    key={item.href}
                    href={item.href}
                    className={`transition ${isActive(item.href)
                            ? "font-semibold text-green-700"
                            : "text-gray-700 hover:text-green-700"
                        }`}
                >
                    {item.label}
                </Link>
            ))}

            <DesktopMoreMenu
                desktopMenuOpen={desktopMenuOpen}
                setDesktopMenuOpen={setDesktopMenuOpen}
                desktopMenuRef={desktopMenuRef}
                isActive={isActive}
            />

        </nav>
    );
}