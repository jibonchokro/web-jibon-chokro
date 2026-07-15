"use client";

import LogoutButton from "@/components/header/LogoutButton";
import UserAvatar from "@/components/header/UserAvatar";
import type { User } from "@supabase/supabase-js";
import {
    Bookmark,
    Heart,
    LayoutDashboard,
    MessageCircle,
    Settings,
    User as UserIcon,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface DashboardSidebarProps {
    user: User;
}

export default function DashboardSidebar({
    user,
}: DashboardSidebarProps) {
    const pathname = usePathname();

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
            {/* ---------------- Desktop Sidebar ---------------- */}

            <aside className="sticky top-24 hidden h-fit w-72 shrink-0 rounded-2xl border border-[#e7e7e7] bg-white p-6 lg:block">

                <div className="mb-8 flex items-center gap-4">

                    <UserAvatar
                        name={fullName}
                        avatar={avatar}
                    />

                    <div className="min-w-0">
                        <h2 className="truncate font-semibold text-gray-900">
                            {fullName}
                        </h2>

                        <p className="truncate text-sm text-gray-500">
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
                                className={`flex items-center gap-3 rounded-xl px-4 py-3 transition ${active
                                    ? "bg-green-100 border border-green-200 font-semibold text-green-700"
                                    : "border border-gray-100 text-gray-700 hover:bg-gray-100 hover:text-green-700"
                                    }`}
                            >
                                <Icon size={20} />

                                {item.label}
                            </Link>
                        );
                    })}

                </nav>

                <div className="mt-8 border-t border-gray-200 pt-6">
                    <LogoutButton className="w-full text-left" />
                </div>

            </aside>

            {/* ---------------- Mobile Navigation ---------------- */}

            <div className="lg:hidden">

                <div className="mb-5 rounded-2xl border border-[#e7e7e7] bg-white p-4">

                    <div className="flex items-center gap-3">

                        <UserAvatar
                            name={fullName}
                            avatar={avatar}
                        />

                        <div className="min-w-0">
                            <h2 className="truncate font-semibold">
                                {fullName}
                            </h2>

                            <p className="truncate text-sm text-gray-500">
                                {user.email}
                            </p>
                        </div>

                        <LogoutButton />

                    </div>

                </div>

                <div className="mb-6 overflow-x-auto">

                    <nav className="flex w-max gap-3 pb-2">

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
                                    className={`flex items-center gap-2 rounded-full border px-4 py-2 text-sm whitespace-nowrap transition ${active
                                        ? "border-green-200 bg-green-100 text-white"
                                        : "border-gray-300 bg-white text-gray-700"
                                        }`}
                                >
                                    <Icon size={18} />

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