"use client";

import Container from "@/components/ui/Container";
import type { User } from "@supabase/supabase-js";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import DesktopNavigation from "./DesktopNavigation";
import HeaderLogo from "./HeaderLogo";
import HeaderSearch from "./HeaderSearch";
import HeaderThemeToggle from "./HeaderThemeToggle";
import MobileMenu from "./MobileMenu";
import MobileMenuButton from "./MobileMenuButton";
import MobileSearch from "./MobileSearch";
import UserMenu from "./UserMenu";

interface HeaderProps {
    user: User | null;
    role: string;
}

export default function Header({
    user,
    role,
}: HeaderProps) {
    const pathname = usePathname();

    const [mobileOpen, setMobileOpen] =
        useState(false);

    const [desktopMenuOpen, setDesktopMenuOpen] =
        useState(false);

    const [userMenuOpen, setUserMenuOpen] =
        useState(false);

    const desktopMenuRef =
        useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClickOutside(
            event: MouseEvent
        ) {
            if (
                desktopMenuRef.current &&
                !desktopMenuRef.current.contains(
                    event.target as Node
                )
            ) {
                setDesktopMenuOpen(false);
            }
        }

        function handleEscape(
            event: KeyboardEvent
        ) {
            if (event.key !== "Escape") {
                return;
            }

            setDesktopMenuOpen(false);
            setMobileOpen(false);
            setUserMenuOpen(false);
        }

        document.addEventListener(
            "click",
            handleClickOutside
        );

        document.addEventListener(
            "keydown",
            handleEscape
        );

        return () => {
            document.removeEventListener(
                "click",
                handleClickOutside
            );

            document.removeEventListener(
                "keydown",
                handleEscape
            );
        };
    }, []);

    useEffect(() => {
        setMobileOpen(false);
        setDesktopMenuOpen(false);
        setUserMenuOpen(false);
    }, [pathname]);

    const handleMobileOpenChange: React.Dispatch<
        React.SetStateAction<boolean>
    > = (value) => {
        setMobileOpen((prev) => {
            const next =
                typeof value === "function"
                    ? value(prev)
                    : value;

            if (next) {
                setDesktopMenuOpen(false);
                setUserMenuOpen(false);
            }

            return next;
        });
    };

    const handleDesktopMenuOpenChange: React.Dispatch<
        React.SetStateAction<boolean>
    > = (value) => {
        setDesktopMenuOpen((prev) => {
            const next =
                typeof value === "function"
                    ? value(prev)
                    : value;

            if (next) {
                setMobileOpen(false);
                setUserMenuOpen(false);
            }

            return next;
        });
    };

    const handleUserMenuOpenChange: React.Dispatch<
        React.SetStateAction<boolean>
    > = (value) => {
        setUserMenuOpen((prev) => {
            const next =
                typeof value === "function"
                    ? value(prev)
                    : value;

            if (next) {
                setMobileOpen(false);
                setDesktopMenuOpen(false);
            }

            return next;
        });
    };

    return (
        <header className="sticky top-0 z-50 border-b border-border bg-background/70 shadow-sm backdrop-blur-md">
            <Container>
                <div className="flex h-16 items-center">
                    {/* Mobile: Menu + Logo */}

                    <div className="flex items-center gap-3">
                        <MobileMenuButton
                            mobileOpen={mobileOpen}
                            setMobileOpen={
                                handleMobileOpenChange
                            }
                        />

                        <HeaderLogo />
                    </div>

                    {/* Desktop Search */}

                    <div className="hidden flex-1 px-4 lg:block">
                        <HeaderSearch />
                    </div>

                    {/* Desktop Navigation */}

                    <DesktopNavigation
                        desktopMenuOpen={
                            desktopMenuOpen
                        }
                        setDesktopMenuOpen={
                            handleDesktopMenuOpenChange
                        }
                        setUserMenuOpen={
                            setUserMenuOpen
                        }
                        desktopMenuRef={
                            desktopMenuRef
                        }
                    />

                    {/* Right Side */}

                    <div className="ml-auto flex items-center justify-center gap-2 sm:ml-3 sm:gap-3">
                        <MobileSearch />

                        <HeaderThemeToggle />

                        {user ? (
                            <UserMenu
                                user={user}
                                role={role}
                                open={userMenuOpen}
                                setOpen={
                                    handleUserMenuOpenChange
                                }
                            />
                        ) : (
                            <Link
                                href="/auth/login"
                                className="inline-flex h-9 items-center justify-center rounded-lg border-[1.5px] border-border bg-background px-4 text-sm font-medium text-foreground transition-colors duration-200 hover:border-primary/40 hover:bg-muted"
                            >
                                Login
                            </Link>
                        )}
                    </div>
                </div>

                {/* Mobile Menu */}

                <MobileMenu
                    mobileOpen={mobileOpen}
                    setMobileOpen={
                        handleMobileOpenChange
                    }
                />
            </Container>
        </header>
    );
}