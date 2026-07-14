"use client";

import { Menu, X } from "lucide-react";

interface Props {
    mobileOpen: boolean;
    setMobileOpen: React.Dispatch<
        React.SetStateAction<boolean>
    >;
}

export default function MobileMenuButton({
    mobileOpen,
    setMobileOpen,
}: Props) {
    return (
        <button
            type="button"
            aria-label="Open Menu"
            className="rounded-lg p-2 transition hover:bg-gray-100 lg:hidden"
            onClick={() =>
                setMobileOpen((prev) => !prev)
            }
        >
            {mobileOpen ? (
                <X size={24} />
            ) : (
                <Menu size={24} />
            )}
        </button>
    );
}