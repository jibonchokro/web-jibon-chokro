"use client";

import { createClient } from "@/lib/supabase/client";

export default function LogoutButton() {
    async function handleLogout() {
        const supabase = createClient();

        await supabase.auth.signOut();

        location.reload();
    }

    return (
        <button
            onClick={handleLogout}
            className="w-full rounded-lg bg-red-50 px-4 py-2 text-left text-red-600 transition hover:bg-red-100"
        >
            Logout
        </button>
    );
}