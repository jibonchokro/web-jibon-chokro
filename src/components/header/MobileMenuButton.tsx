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
            className="rounded-lg border border-border bg-background p-1.5 text-foreground transition hover:bg-muted lg:hidden"
        >
            <Menu size={22} />
        </button>
    );
}