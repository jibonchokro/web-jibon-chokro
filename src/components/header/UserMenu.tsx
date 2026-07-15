"use client";

import { createClient } from "@/lib/supabase/client";
import type { User } from "@supabase/supabase-js";
import {
    Bookmark,
    ChevronDown,
    Heart,
    LayoutDashboard,
    MessageCircle,
    Settings,
    User as UserIcon,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import LoginButton from "./LoginButton";
import LogoutButton from "./LogoutButton";
import UserAvatar from "./UserAvatar";

interface UserMenuProps {
    user: User | null;
}

export default function UserMenu({
    user: initialUser,
}: UserMenuProps) {
    const pathname = usePathname();

    const [user, setUser] = useState<User | null>(initialUser);
    const [open, setOpen] = useState(false);

    const menuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setUser(initialUser);
    }, [initialUser]);

    useEffect(() => {
        const supabase = createClient();

        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange((_event, session) => {
            setUser(session?.user ?? null);
        });

        return () => {
            subscription.unsubscribe();
        };
    }, []);

    useEffect(() => {
        function handleClick(event: MouseEvent) {
            if (
                menuRef.current &&
                !menuRef.current.contains(event.target as Node)
            ) {
                setOpen(false);
            }
        }

        document.addEventListener("mousedown", handleClick);

        return () => {
            document.removeEventListener("mousedown", handleClick);
        };
    }, []);

    if (!user) {
        return <LoginButton />;
    }

    const fullName =
        user.user_metadata.full_name ??
        user.user_metadata.name ??
        "User";

    const avatar =
        user.user_metadata.avatar_url ?? null;

    const menu = [
        {
            href: "/dashboard",
            label: "ড্যাশবোর্ড",
            icon: LayoutDashboard,
        },
        {
            href: "/dashboard/profile",
            label: "প্রোফাইল",
            icon: UserIcon,
        },
        {
            href: "/dashboard/bookmarks",
            label: "বুকমার্ক",
            icon: Bookmark,
        },
        {
            href: "/dashboard/likes",
            label: "লাইক",
            icon: Heart,
        },
        {
            href: "/dashboard/comments",
            label: "মন্তব্য",
            icon: MessageCircle,
        },
        {
            href: "/dashboard/settings",
            label: "সেটিংস",
            icon: Settings,
        },
    ];

    return (
        <div
            ref={menuRef}
            className="relative"
        >
            <button
                type="button"
                onClick={() => setOpen((prev) => !prev)}
                className="
                    flex items-center transition

                    lg:gap-3
                    lg:rounded-xl
                    lg:border lg:border-gray-200
                    lg:bg-white
                    lg:px-2 lg:py-1
                    lg:hover:bg-gray-50
                "
            >
                {/* Avatar */}
                <div className="relative">

                    <UserAvatar
                        name={fullName}
                        avatar={avatar}
                    />

                    {/* Mobile Chevron */}
                    <div
                        className="
                            absolute
                            -bottom-1
                            -right-1
                            z-10
                            flex
                            h-5
                            w-5
                            items-center
                            justify-center
                            rounded-full
                            border
                            border-white
                            bg-gray-100
                            lg:hidden
                        "
                    >
                        <ChevronDown
                            size={12}
                            className={`transition ${open ? "rotate-180" : ""
                                }`}
                        />
                    </div>

                </div>

                {/* Desktop Info */}
                <div className="hidden text-left lg:block">
                    <p className="text-sm font-semibold text-gray-900">
                        {fullName}
                    </p>

                    <p className="text-xs text-gray-500">
                        My Account
                    </p>
                </div>

                {/* Desktop Chevron */}
                <ChevronDown
                    size={18}
                    className={`hidden text-gray-500 transition lg:block ${open ? "rotate-180" : ""
                        }`}
                />
            </button>

            {open && (
                <div className="absolute right-0 mt-3 flex max-h-[80vh] w-72 flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-xl">

                    {/* User */}
                    <div className="shrink-0 border-b border-gray-200 p-4">
                        <div className="flex items-center gap-3">

                            <UserAvatar
                                name={fullName}
                                avatar={avatar}
                            />

                            <div className="min-w-0">
                                <p className="truncate font-semibold text-gray-900">
                                    {fullName}
                                </p>

                                <p className="truncate text-xs text-gray-500">
                                    {user.email}
                                </p>
                            </div>

                        </div>
                    </div>

                    {/* Menu */}
                    <nav className="flex-1 overflow-y-auto p-2">

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
                                    onClick={() => setOpen(false)}
                                    className={`mb-1 flex items-center gap-3 rounded-lg border px-3 py-2 transition ${active
                                            ? "border-green-200 bg-green-100 font-medium text-green-700"
                                            : "border-transparent text-gray-700 hover:border-gray-200 hover:bg-gray-100 hover:text-green-700"
                                        }`}
                                >
                                    <Icon size={18} />

                                    <span>{item.label}</span>
                                </Link>
                            );
                        })}

                    </nav>

                    {/* Logout */}
                    <div className="shrink-0 border-t border-gray-200 p-2">
                        <LogoutButton className="w-full justify-start text-left" />
                    </div>

                </div>
            )}
        </div>
    );
}