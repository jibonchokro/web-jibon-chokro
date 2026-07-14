"use client";

import { createClient } from "@/lib/supabase/client";
import type { User } from "@supabase/supabase-js";
import { ChevronDown } from "lucide-react";
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

    return (
        <div
            ref={menuRef}
            className="relative"
        >
            <button
                type="button"
                onClick={() => setOpen((prev) => !prev)}
                className="flex items-center gap-3 rounded-xl border border-gray-200 bg-white px-2 py-1 transition hover:bg-gray-50"
            >
                <UserAvatar
                    name={fullName}
                    avatar={avatar}
                />

                <div className="hidden text-left lg:block">
                    <p className="text-sm font-semibold text-gray-900">
                        {fullName}
                    </p>

                    <p className="text-xs text-gray-500">
                        My Account
                    </p>
                </div>

                <ChevronDown
                    size={18}
                    className={`transition ${open ? "rotate-180" : ""
                        }`}
                />
            </button>

            {open && (
                <div className="absolute right-0 mt-3 w-64 rounded-2xl border border-gray-200 bg-white p-4 shadow-xl">
                    <div className="mb-4 border-b border-gray-200 pb-4">
                        <div className="flex items-center gap-3">
                            <UserAvatar
                                name={fullName}
                                avatar={avatar}
                            />

                            <div>
                                <p className="font-semibold">
                                    {fullName}
                                </p>

                                <p className="text-xs text-gray-500">
                                    {user.email}
                                </p>
                            </div>
                        </div>
                    </div>

                    <LogoutButton />
                </div>
            )}
        </div>
    );
}