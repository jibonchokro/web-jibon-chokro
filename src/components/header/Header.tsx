"use client";

import Container from "@/components/ui/Container";
import type { User } from "@supabase/supabase-js";
import { useEffect, useRef, useState } from "react";

import DesktopNavigation from "./DesktopNavigation";
import HeaderLogo from "./HeaderLogo";
import HeaderSearch from "./HeaderSearch";
import MobileMenu from "./MobileMenu";
import MobileMenuButton from "./MobileMenuButton";
import UserMenu from "./UserMenu";

interface HeaderProps {
    user: User | null;
}

export default function Header({
    user,
}: HeaderProps) {
    const [mobileOpen, setMobileOpen] = useState(false);
    const [desktopMenuOpen, setDesktopMenuOpen] = useState(false);
    const [userMenuOpen, setUserMenuOpen] = useState(false);

    const desktopMenuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (
                desktopMenuRef.current &&
                !desktopMenuRef.current.contains(event.target as Node)
            ) {
                setDesktopMenuOpen(false);
            }
        }

        function handleEscape(event: KeyboardEvent) {
            if (event.key === "Escape") {
                setDesktopMenuOpen(false);
                setMobileOpen(false);
                setUserMenuOpen(false);
            }
        }

        document.addEventListener(
            "mousedown",
            handleClickOutside
        );

        document.addEventListener(
            "keydown",
            handleEscape
        );

        return () => {
            document.removeEventListener(
                "mousedown",
                handleClickOutside
            );

            document.removeEventListener(
                "keydown",
                handleEscape
            );
        };
    }, []);

    return (
        <header className="sticky top-0 z-50 border-b border-black/10 bg-white/70 backdrop-blur-md">
            <Container>
                <div className="flex h-16 items-center">

                    {/* Mobile: Menu + Logo */}
                    <div className="flex items-center gap-3">
                        <MobileMenuButton
                            mobileOpen={mobileOpen}
                            setMobileOpen={(open) => {
                                setUserMenuOpen(false);
                                setMobileOpen(open);
                            }}
                        />

                        <HeaderLogo />
                    </div>

                    {/* Desktop Search */}
                    <div className="hidden flex-1 px-6 lg:block">
                        <HeaderSearch />
                    </div>

                    {/* Desktop Navigation */}
                    <DesktopNavigation
                        desktopMenuOpen={desktopMenuOpen}
                        setDesktopMenuOpen={setDesktopMenuOpen}
                        desktopMenuRef={desktopMenuRef}
                    />

                    {/* User Menu */}
                    <div className="ml-auto">
                        <UserMenu
                            user={user}
                            open={userMenuOpen}
                            setOpen={(open) => {
                                setMobileOpen(false);
                                setUserMenuOpen(open);
                            }}
                        />
                    </div>

                </div>

                <MobileMenu
                    mobileOpen={mobileOpen}
                    setMobileOpen={setMobileOpen}
                />
            </Container>
        </header>
    );
}