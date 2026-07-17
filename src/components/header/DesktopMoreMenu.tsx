"use client";

import { navigationGroups } from "@/constants/navigation";
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
                className="inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
                আরও

                <ChevronDown
                    size={16}
                    className={`transition-transform duration-200 ${desktopMenuOpen ? "rotate-180" : ""
                        }`}
                />
            </button>

            {desktopMenuOpen && (
                <div className="absolute right-0 top-[52.5px] z-50">

                    {/* Menu */}
                    <div className="relative w-[560px] rounded-b-xl border border-black/10 bg-white/98 p-6 shadow-xl">

                        <div className="grid grid-cols-2 gap-8">

                            {navigationGroups.map((group) => (
                                <div key={group.title}>

                                    <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                                        {group.title}
                                    </p>

                                    <div className="space-y-1">

                                        {group.items.map((item) => {
                                            const active = isActive(item.href);

                                            return (
                                                <Link
                                                    key={item.href}
                                                    href={item.href}
                                                    onClick={() =>
                                                        setDesktopMenuOpen(false)
                                                    }
                                                    className={`block rounded-lg px-3 py-2 text-sm transition-colors ${active
                                                        ? "border border-black/5 font-medium text-foreground"
                                                        : "text-muted-foreground border border-white/95 hover:border-black/5 hover:text-foreground"
                                                        }`}
                                                >
                                                    {item.label}
                                                </Link>
                                            );
                                        })}

                                    </div>

                                </div>
                            ))}

                        </div>

                    </div>

                </div>
            )}
        </div>
    );
}