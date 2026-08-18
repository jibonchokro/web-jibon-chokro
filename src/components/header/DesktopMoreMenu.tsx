"use client";

import {
    exploreNavigation,
    footerNavigation,
    navigationGroups,
} from "@/constants/navigation";
import { ChevronDown, ChevronRight } from "lucide-react";
import Link from "next/link";

interface Props {
    desktopMenuOpen: boolean;
    setDesktopMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
    setUserMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
    desktopMenuRef: React.RefObject<HTMLDivElement | null>;
    isActive: (href: string) => boolean;
}

export default function DesktopMoreMenu({
    desktopMenuOpen,
    setDesktopMenuOpen,
    setUserMenuOpen,
    desktopMenuRef,
    isActive,
}: Props) {
    const categoriesGroup = navigationGroups[0];
    const otherGroup = navigationGroups[1];

    const hasActiveItem =
        exploreNavigation.some((item) => isActive(item.href)) ||
        navigationGroups.some((group) =>
            group.items.some((item) => isActive(item.href))
        );

    const closeMenu = () => {
        setDesktopMenuOpen(false);
    };

    const handleToggle = () => {
        setDesktopMenuOpen((prev) => !prev);
        setUserMenuOpen(false);
    };

    const handleKeyDown = (
        event: React.KeyboardEvent<HTMLButtonElement>
    ) => {
        if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            handleToggle();
        }

        if (event.key === "Escape") {
            closeMenu();
        }
    };

    return (
        <div ref={desktopMenuRef} className="relative">
            <button
                type="button"
                onClick={handleToggle}
                onKeyDown={handleKeyDown}
                aria-haspopup="menu"
                aria-expanded={desktopMenuOpen}
                aria-controls="desktop-more-menu"
                className={[
                    "inline-flex h-9 items-center gap-1 rounded-lg px-2",
                    "whitespace-nowrap text-sm font-medium",
                    "transition-colors",
                    desktopMenuOpen || hasActiveItem
                        ? "bg-muted text-foreground"
                        : "text-muted-foreground hover:bg-muted/70 hover:text-foreground",
                ].join(" ")}
            >
                <span className="text-sm font-medium">আরও</span>

                <ChevronDown
                    size={15}
                    strokeWidth={2}
                    aria-hidden="true"
                    className={[
                        "transition-transform duration-200",
                        desktopMenuOpen ? "rotate-180" : "",
                    ].join(" ")}
                />
            </button>

            {desktopMenuOpen && (
                <div
                    id="desktop-more-menu"
                    role="menu"
                    aria-label="আরও নেভিগেশন"
                    className="absolute right-0 top-[50px] z-50"
                >
                    <div className="w-[min(620px,calc(100vw-2rem))] overflow-hidden rounded-br-xl rounded-bl-xl border border-border bg-popover text-popover-foreground shadow-xl">
                        <div className="grid grid-cols-3 gap-5 p-4">
                            {/* Explore */}
                            <section className="min-w-0">
                                <h3 className="mb-2 px-2 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                                    আবিষ্কার করুন
                                </h3>

                                <div className="space-y-1">
                                    {exploreNavigation.map((item) => {
                                        const active = isActive(item.href);
                                        const Icon = item.icon;

                                        return (
                                            <Link
                                                key={item.href}
                                                href={item.href}
                                                role="menuitem"
                                                aria-current={
                                                    active ? "page" : undefined
                                                }
                                                onClick={closeMenu}
                                                className={[
                                                    "group flex min-h-10 items-center gap-3 rounded-lg px-3 py-2",
                                                    "transition-colors",
                                                    active
                                                        ? "bg-muted text-foreground"
                                                        : "text-muted-foreground hover:bg-muted/70 hover:text-foreground",
                                                ].join(" ")}
                                            >
                                                {Icon && (
                                                    <Icon
                                                        size={17}
                                                        strokeWidth={active ? 2.2 : 1.9}
                                                        aria-hidden="true"
                                                        className="shrink-0"
                                                    />
                                                )}

                                                <span className="min-w-0 flex-1">
                                                    <span className="block text-sm font-medium">
                                                        {item.label}
                                                    </span>

                                                    {item.description && (
                                                        <span className="mt-0.5 block truncate text-[11px] text-muted-foreground">
                                                            {item.description}
                                                        </span>
                                                    )}
                                                </span>

                                                <ChevronRight
                                                    size={15}
                                                    aria-hidden="true"
                                                    className={[
                                                        "shrink-0 transition-transform",
                                                        active
                                                            ? "text-foreground"
                                                            : "text-muted-foreground/50 group-hover:translate-x-0.5 group-hover:text-foreground",
                                                    ].join(" ")}
                                                />
                                            </Link>
                                        );
                                    })}
                                </div>
                            </section>

                            {/* Categories */}
                            {categoriesGroup && (
                                <section className="min-w-0">
                                    <div className="mb-2 flex items-center justify-between px-2">
                                        <h3 className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                                            {categoriesGroup.title}
                                        </h3>

                                        <Link
                                            href="/categories"
                                            onClick={closeMenu}
                                            className="text-[11px] font-medium text-muted-foreground transition-colors hover:text-foreground"
                                        >
                                            সব দেখুন
                                        </Link>
                                    </div>

                                    <div className="space-y-1">
                                        {categoriesGroup.items.map((item) => {
                                            const active = isActive(item.href);
                                            const Icon = item.icon;

                                            return (
                                                <Link
                                                    key={item.href}
                                                    href={item.href}
                                                    role="menuitem"
                                                    aria-current={
                                                        active
                                                            ? "page"
                                                            : undefined
                                                    }
                                                    onClick={closeMenu}
                                                    className={[
                                                        "group flex min-h-10 items-center gap-3 rounded-lg px-3 py-2 text-sm",
                                                        "transition-colors",
                                                        active
                                                            ? "bg-muted font-medium text-foreground"
                                                            : "text-muted-foreground hover:bg-muted/70 hover:text-foreground",
                                                    ].join(" ")}
                                                >
                                                    {Icon && (
                                                        <Icon
                                                            size={17}
                                                            strokeWidth={
                                                                active ? 2.2 : 1.9
                                                            }
                                                            aria-hidden="true"
                                                            className="shrink-0"
                                                        />
                                                    )}

                                                    <span className="min-w-0 flex-1 truncate">
                                                        {item.label}
                                                    </span>

                                                    <ChevronRight
                                                        size={15}
                                                        aria-hidden="true"
                                                        className={[
                                                            "shrink-0 transition-transform",
                                                            active
                                                                ? "text-foreground"
                                                                : "text-muted-foreground/50 group-hover:translate-x-0.5 group-hover:text-foreground",
                                                        ].join(" ")}
                                                    />
                                                </Link>
                                            );
                                        })}
                                    </div>
                                </section>
                            )}

                            {/* Other */}
                            {otherGroup && (
                                <section className="min-w-0">
                                    <h3 className="mb-2 px-2 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                                        {otherGroup.title}
                                    </h3>

                                    <div className="space-y-1">
                                        {otherGroup.items.map((item) => {
                                            const active = isActive(item.href);
                                            const Icon = item.icon;

                                            return (
                                                <Link
                                                    key={item.href}
                                                    href={item.href}
                                                    role="menuitem"
                                                    aria-current={
                                                        active
                                                            ? "page"
                                                            : undefined
                                                    }
                                                    onClick={closeMenu}
                                                    className={[
                                                        "group flex min-h-10 items-center gap-3 rounded-lg px-3 py-2 text-sm",
                                                        "transition-colors",
                                                        active
                                                            ? "bg-muted font-medium text-foreground"
                                                            : "text-muted-foreground hover:bg-muted/70 hover:text-foreground",
                                                    ].join(" ")}
                                                >
                                                    {Icon && (
                                                        <Icon
                                                            size={17}
                                                            strokeWidth={
                                                                active ? 2.2 : 1.9
                                                            }
                                                            aria-hidden="true"
                                                            className="shrink-0"
                                                        />
                                                    )}

                                                    <span className="min-w-0 flex-1 truncate">
                                                        {item.label}
                                                    </span>

                                                    <ChevronRight
                                                        size={15}
                                                        aria-hidden="true"
                                                        className={[
                                                            "shrink-0 transition-transform",
                                                            active
                                                                ? "text-foreground"
                                                                : "text-muted-foreground/50 group-hover:translate-x-0.5 group-hover:text-foreground",
                                                        ].join(" ")}
                                                    />
                                                </Link>
                                            );
                                        })}
                                    </div>
                                </section>
                            )}
                        </div>

                        {/* Footer */}
                        {footerNavigation.length > 0 && (
                            <div className="flex items-center justify-between border-t border-border bg-background px-7 pt-3 pb-5">
                                <div className="flex flex-wrap items-center justify-start gap-x-4 gap-y-2">
                                    {footerNavigation.map((item) => (
                                        <Link
                                            key={item.href}
                                            href={item.href}
                                            onClick={closeMenu}
                                            className="text-xs text-muted-foreground transition-colors hover:text-foreground"
                                        >
                                            {item.label}
                                        </Link>
                                    ))}
                                </div>

                                <div className="flex items-center justify-end">
                                    <p className="text-xs text-muted-foreground">
                                        © {new Date().getFullYear()}{" "}
                                        Jibonchokro. All rights reserved.
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}