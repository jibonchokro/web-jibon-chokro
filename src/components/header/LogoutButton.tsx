"use client";

import { createClient } from "@/lib/supabase/client";
import { cn } from "@/lib/utils";

interface LogoutButtonProps {
    className?: string;
}

export default function LogoutButton({
    className,
}: LogoutButtonProps) {
    async function handleLogout() {
        const supabase = createClient();

        await supabase.auth.signOut();

        location.reload();
    }

    return (
        <button
            onClick={handleLogout}
            className={cn(
                "rounded-lg bg-red-50 px-4 py-2 text-red-600 transition hover:bg-red-100",
                className
            )}
        >
            Logout
        </button>
    );
}