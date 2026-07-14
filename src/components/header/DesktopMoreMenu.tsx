"use client";

import {
    navigationGroups,
} from "@/constants/navigation";

import { ChevronDown } from "lucide-react";
import Link from "next/link";

interface Props {
    desktopMenuOpen: boolean;
    setDesktopMenuOpen: React.Dispatch<
        React.SetStateAction<boolean>
    >;
    desktopMenuRef: React.RefObject<HTMLDivElement | null>;
    isActive: (href: string) => boolean;
}

export default function DesktopMoreMenu({
    desktopMenuOpen,
    setDesktopMenuOpen,
    desktopMenuRef,
    isActive,
}: Props) {
    return (
        <div
            ref={desktopMenuRef}
            className="relative"
        >
            <button
                type="button"
                onClick={() =>
                    setDesktopMenuOpen((prev) => !prev)
                }
                className="flex items-center gap-1 text-gray-700 transition hover:text-green-700"
            >
                আরও

                <ChevronDown
                    size={18}
                    className={`transition ${desktopMenuOpen
                            ? "rotate-180"
                            : ""
                        }`}
                />
            </button>

            {desktopMenuOpen && (
                <div className="absolute right-0 mt-4 w-[520px] rounded-2xl border border-gray-200 bg-white p-6 shadow-xl">

                    <div className="grid grid-cols-2 gap-8">

                        {navigationGroups.map((group) => (
                            <div key={group.title}>

                                <h3 className="mb-4 font-semibold text-green-700">
                                    {group.title}
                                </h3>

                                <div className="space-y-3">

                                    {group.items.map((item) => (
                                        <Link
                                            key={item.href}
                                            href={item.href}
                                            onClick={() =>
                                                setDesktopMenuOpen(false)
                                            }
                                            className={`block transition ${isActive(item.href)
                                                    ? "font-semibold text-green-700"
                                                    : "text-gray-700 hover:text-green-700"
                                                }`}
                                        >
                                            {item.label}
                                        </Link>
                                    ))}

                                </div>

                            </div>
                        ))}

                    </div>

                </div>
            )}

        </div>
    );
}