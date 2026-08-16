"use client";

import { navigationGroups } from "@/constants/navigation";
import { ChevronDown } from "lucide-react";
import Link from "next/link";

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
    isActive: (href: string) => boolean;
}

export default function DesktopMoreMenu({
    desktopMenuOpen,
    setDesktopMenuOpen,
    setUserMenuOpen,
    desktopMenuRef,
    isActive,
}: Props) {
    const hasActiveItem = navigationGroups.some(
        (group) =>
            group.items.some((item) =>
                isActive(item.href)
            )
    );

    function handleToggle() {
        setDesktopMenuOpen((prev) => !prev);
        setUserMenuOpen(false);
    }

    return (
        <div
            ref={desktopMenuRef}
            className="relative"
        >
            <button
                type="button"
                onClick={handleToggle}
                aria-haspopup="menu"
                aria-expanded={desktopMenuOpen}
                className={`inline-flex h-9 items-center gap-1.5 rounded-lg pl-3 pr-2 text-sm font-medium whitespace-nowrap transition-all duration-200 ${desktopMenuOpen || hasActiveItem
                    ? "bg-muted/80 text-foreground"
                    : "text-muted-foreground bg-muted/80 hover:bg-muted/70 hover:text-foreground"
                    }`}
            >
                <span>আরও</span>

                <ChevronDown
                    size={15}
                    strokeWidth={2}
                    className={`shrink-0 transition-transform duration-200 ${desktopMenuOpen
                        ? "rotate-180"
                        : ""
                        }`}
                />
            </button>

            {desktopMenuOpen && (
                <div
                    className="absolute right-0 top-[50px] z-50"
                    role="menu"
                >
                    <div className="w-[560px] overflow-hidden rounded-br-xl rounded-bl-xl border border-border bg-popover p-5 text-popover-foreground shadow-lg">
                        <div className="grid grid-cols-2 gap-x-8 gap-y-6">
                            {navigationGroups.map(
                                (group) => (
                                    <div
                                        key={group.title}
                                        className="min-w-0"
                                    >
                                        <p className="mb-2 px-2 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                                            {group.title}
                                        </p>

                                        <div className="space-y-0.5">
                                            {group.items.map(
                                                (item) => {
                                                    const active =
                                                        isActive(
                                                            item.href
                                                        );

                                                    return (
                                                        <Link
                                                            key={
                                                                item.href
                                                            }
                                                            href={
                                                                item.href
                                                            }
                                                            onClick={() =>
                                                                setDesktopMenuOpen(
                                                                    false
                                                                )
                                                            }
                                                            role="menuitem"
                                                            className={`flex min-h-9 items-center rounded-lg border px-3 py-2 text-sm transition-all duration-150 ${active
                                                                ? "border-border bg-muted font-medium text-foreground"
                                                                : "border-transparent text-muted-foreground hover:border-border/60 hover:bg-muted/60 hover:text-foreground"
                                                                }`}
                                                        >
                                                            {
                                                                item.label
                                                            }
                                                        </Link>
                                                    );
                                                }
                                            )}
                                        </div>
                                    </div>
                                )
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}