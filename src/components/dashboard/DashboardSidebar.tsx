"use client";

import LogoutButton from "@/components/header/LogoutButton";
import UserAvatar from "@/components/header/UserAvatar";
import type { User } from "@supabase/supabase-js";
import {
    Bookmark,
    ChevronRight,
    EllipsisVertical,
    Heart,
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
}

export default function DashboardSidebar({
    user,
}: DashboardSidebarProps) {
    const pathname = usePathname();

    const [menuOpen, setMenuOpen] = useState(false);

    const menuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClick(event: MouseEvent) {
            if (
                menuRef.current &&
                !menuRef.current.contains(event.target as Node)
            ) {
                setMenuOpen(false);
            }
        }

        document.addEventListener("mousedown", handleClick);

        return () =>
            document.removeEventListener(
                "mousedown",
                handleClick
            );
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
            label: "লাইক",
            href: "/dashboard/likes",
            icon: Heart,
        },
        {
            label: "মন্তব্য",
            href: "/dashboard/comments",
            icon: MessageCircle,
        },
        {
            label: "সেটিংস",
            href: "/dashboard/settings",
            icon: Settings,
        },
    ];

    return (
        <>
            {/* Desktop Sidebar */}

            <aside className="sticky top-24 hidden h-fit w-72 shrink-0 rounded-xl border border-black/10 bg-white p-6 lg:block">

                <div className="mb-8 flex items-center gap-4">

                    <UserAvatar
                        name={fullName}
                        avatar={avatar}
                    />

                    <div className="min-w-0">
                        <h2 className="truncate font-semibold">
                            {fullName}
                        </h2>

                        <p className="truncate text-sm text-muted-foreground">
                            {user.email}
                        </p>
                    </div>

                </div>

                <nav className="space-y-2">

                    {menu.map((item) => {
                        const Icon = item.icon;

                        const active =
                            item.href === "/dashboard"
                                ? pathname === "/dashboard"
                                : pathname.startsWith(item.href);

                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`group flex items-center justify-between rounded-lg border border-black/10 px-3 py-2 transition ${active
                                    ? "bg-gray-100 text-black"
                                    : "hover:bg-gray-100"
                                    }`}
                            >
                                <div className="flex items-center gap-3">
                                    <Icon size={19} />
                                    {item.label}
                                </div>

                                <ChevronRight size={16} />
                            </Link>
                        );
                    })}

                </nav>

                <div className="mt-8 border-t border-black/10 pt-6">
                    <LogoutButton className="w-full justify-start px-3 py-2" />
                </div>

            </aside>

            {/* Mobile */}

            <div className="lg:hidden">

                {/* User */}

                <div className="relative mb-5 rounded-xl border border-black/10 bg-white p-4">

                    <div className="flex items-center justify-between">

                        <div className="flex min-w-0 items-center gap-3">

                            <UserAvatar
                                name={fullName}
                                avatar={avatar}
                            />

                            <div className="min-w-0">

                                <h2 className="truncate font-medium">
                                    {fullName}
                                </h2>

                                <p className="truncate text-sm text-muted-foreground">
                                    {user.email}
                                </p>

                            </div>

                        </div>

                        <div
                            ref={menuRef}
                            className="relative"
                        >
                            <button
                                onClick={() =>
                                    setMenuOpen(!menuOpen)
                                }
                                className="rounded-md p-2 transition hover:bg-muted"
                            >
                                <EllipsisVertical size={18} />
                            </button>

                            {menuOpen && (
                                <div className="absolute -right-[5px] top-[65px] z-20">

                                    {/* Arrow */}
                                    <div className="absolute -top-1.5 right-4 h-3 w-3 rotate-45 border-l border-t border-gray-50 bg-white" />

                                    {/* Menu */}
                                    <div className="relative w-44 rounded-lg border border-gray-50 bg-white p-2 shadow-md">
                                        <LogoutButton className="w-full justify-start px-3 py-2" />
                                    </div>

                                </div>
                            )}

                        </div>

                    </div>

                </div>

                {/* Navigation */}

                <div className="mb-6 overflow-x-auto">

                    <nav className="flex w-max gap-2 pb-2">

                        {menu.map((item) => {
                            const Icon = item.icon;

                            const active =
                                item.href === "/dashboard"
                                    ? pathname === "/dashboard"
                                    : pathname.startsWith(item.href);

                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={`flex items-center gap-2 rounded-lg border border-black/10 px-4 py-2 text-sm whitespace-nowrap transition ${active
                                        ? "border-black bg-black text-white"
                                        : "bg-white hover:bg-gray-100"
                                        }`}
                                >
                                    <Icon size={16} />
                                    {item.label}
                                </Link>
                            );
                        })}

                    </nav>

                </div>

            </div>
        </>
    );
}