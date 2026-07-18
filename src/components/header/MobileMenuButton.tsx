"use client";

import { Menu } from "lucide-react";

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
            aria-label={
                mobileOpen
                    ? "Close menu"
                    : "Open menu"
            }
            aria-expanded={mobileOpen}
            onClick={() =>
                setMobileOpen((prev) => !prev)
            }
            className="rounded-xl border border-black/10 bg-white p-2 transition hover:bg-gray-100 lg:hidden"
        >
            <Menu size={22} />
        </button>
    );
}