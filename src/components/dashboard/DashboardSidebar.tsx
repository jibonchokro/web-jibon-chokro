"use client";

import LogoutButton from "@/components/header/LogoutButton";
import UserAvatar from "@/components/header/UserAvatar";
import type { User } from "@supabase/supabase-js";
import {
    BarChart3,
    Bookmark,
    ChevronRight,
    EllipsisVertical,
    LayoutDashboard,
    MessageCircle,
    Settings,
    User as UserIcon,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

interface DashboardSidebarProps {
    user: User;
    role: string;
}

export default function DashboardSidebar({
    user,
    role,
}: DashboardSidebarProps) {
    const pathname = usePathname();

    const [menuOpen, setMenuOpen] = useState(false);

    const menuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClick(event: PointerEvent) {
            if (
                menuRef.current &&
                !menuRef.current.contains(event.target as Node)
            ) {
                setMenuOpen(false);
            }
        }

        document.addEventListener("pointerdown", handleClick);

        return () => {
            document.removeEventListener(
                "pointerdown",
                handleClick
            );
        };
    }, []);

    const fullName =
        user.user_metadata.full_name ??
        user.user_metadata.name ??
        "User";

    const avatar =
        user.user_metadata.avatar_url ?? null;

    const menu = [
        {
            label: "ড্যাশবোর্ড",
            href: "/dashboard",
            icon: LayoutDashboard,
        },
        {
            label: "প্রোফাইল",
            href: "/dashboard/profile",
            icon: UserIcon,
        },
        {
            label: "বুকমার্ক",
            href: "/dashboard/bookmarks",
            icon: Bookmark,
        },
        {
            label: "মন্তব্য",
            href: "/dashboard/comments",
            icon: MessageCircle,
        },

        // Admin-only menu item
        ...(role === "admin"
            ? [
                {
                    label: "পরিসংখ্যান",
                    href: "/dashboard/statistics",
                    icon: BarChart3,
                },
            ]
            : []),

        {
            label: "সেটিংস",
            href: "/dashboard/settings",
            icon: Settings,
        },
    ];

    const isActive = (href: string) => {
        if (href === "/dashboard") {
            return pathname === "/dashboard";
        }

        return (
            pathname === href ||
            pathname.startsWith(`${href}/`)
        );
    };

    return (
        <>
            {/* Desktop Sidebar */}

            <aside className="sticky top-24 hidden h-fit w-72 shrink-0 rounded-xl border border-border/70 bg-card/95 p-5 shadow-sm backdrop-blur-sm lg:block">
                {/* User */}

                <div className="mb-6 flex items-center gap-3 border-b border-border/70 pb-5">
                    <UserAvatar
                        name={fullName}
                        avatar={avatar}
                    />

                    <div className="min-w-0">
                        <h2 className="truncate text-sm font-semibold text-foreground">
                            {fullName}
                        </h2>

                        <p className="truncate text-xs text-muted-foreground">
                            {user.email}
                        </p>
                    </div>
                </div>

                {/* Navigation */}

                <nav
                    aria-label="Dashboard navigation"
                    className="space-y-1.5"
                >
                    {menu.map((item) => {
                        const Icon = item.icon;
                        const active = isActive(item.href);

                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                aria-current={
                                    active
                                        ? "page"
                                        : undefined
                                }
                                className={`group flex min-h-10 items-center justify-between rounded-lg border px-3 py-2 text-sm font-medium transition-all duration-200 ${active
                                        ? "border-border/70 bg-muted text-primary dark:border-primary/10 dark:bg-primary/5"
                                        : "border-transparent text-muted-foreground hover:border-border/70 hover:bg-muted hover:text-foreground dark:hover:border-primary/10 dark:hover:bg-primary/5"
                                    }`}
                            >
                                <span className="flex items-center gap-3">
                                    <Icon
                                        size={18}
                                        strokeWidth={
                                            active
                                                ? 2.2
                                                : 1.9
                                        }
                                        className="shrink-0"
                                    />

                                    <span>{item.label}</span>
                                </span>

                                <ChevronRight
                                    size={15}
                                    className={`shrink-0 transition-transform duration-200 ${active
                                            ? "text-primary"
                                            : "text-muted-foreground/60 group-hover:translate-x-0.5 group-hover:text-foreground"
                                        }`}
                                />
                            </Link>
                        );
                    })}
                </nav>

                {/* Logout */}

                <div className="mt-6 border-t border-border/70 pt-5">
                    <LogoutButton
                        className="w-full justify-start rounded-lg px-3 py-2 text-sm text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
                    />
                </div>
            </aside>

            {/* Mobile */}

            <div className="lg:hidden">
                {/* User Card */}

                <div className="relative mb-4 rounded-xl border border-border/70 bg-card/95 p-4 shadow-sm">
                    <div className="flex items-center justify-between gap-3">
                        <div className="flex min-w-0 items-center gap-3">
                            <UserAvatar
                                name={fullName}
                                avatar={avatar}
                            />

                            <div className="min-w-0">
                                <h2 className="truncate text-sm font-semibold text-foreground">
                                    {fullName}
                                </h2>

                                <p className="truncate text-xs text-muted-foreground">
                                    {user.email}
                                </p>
                            </div>
                        </div>

                        <div
                            ref={menuRef}
                            className="relative shrink-0"
                        >
                            <button
                                type="button"
                                onClick={() =>
                                    setMenuOpen(
                                        (prev) => !prev
                                    )
                                }
                                aria-label="More options"
                                aria-expanded={menuOpen}
                                className="flex h-9 w-9 items-center justify-center rounded-lg border border-transparent text-muted-foreground transition-colors hover:border-border hover:bg-muted hover:text-foreground"
                            >
                                <EllipsisVertical
                                    size={18}
                                />
                            </button>

                            {menuOpen && (
                                <div className="absolute right-0 top-11 z-20">
                                    {/* Arrow */}

                                    <div className="absolute -top-1.5 right-3 h-3 w-3 rotate-45 border-l border-t border-border bg-popover" />

                                    {/* Menu */}

                                    <div className="relative w-44 overflow-hidden rounded-xl border border-border bg-popover p-1.5 text-popover-foreground shadow-lg">
                                        <LogoutButton
                                            className="w-full justify-start rounded-lg px-3 py-2 text-sm text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
                                        />
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Mobile Navigation */}

                <div className="mb-6 overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                    <nav
                        aria-label="Dashboard navigation"
                        className="flex w-max gap-1.5 pb-1"
                    >
                        {menu.map((item) => {
                            const Icon = item.icon;
                            const active =
                                isActive(item.href);

                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    aria-current={
                                        active
                                            ? "page"
                                            : undefined
                                    }
                                    className={`flex min-h-9 items-center gap-2 rounded-lg border px-3 py-2 text-sm font-medium whitespace-nowrap transition-all duration-200 ${active
                                            ? "border-primary/15 bg-primary text-primary-foreground shadow-sm dark:border-primary/30 dark:bg-primary dark:text-primary-foreground"
                                            : "border-border/70 bg-card text-muted-foreground hover:bg-muted hover:text-foreground"
                                        }`}
                                >
                                    <Icon
                                        size={16}
                                        strokeWidth={
                                            active
                                                ? 2.2
                                                : 1.9
                                        }
                                    />

                                    <span>
                                        {item.label}
                                    </span>
                                </Link>
                            );
                        })}
                    </nav>
                </div>
            </div>
        </>
    );
}