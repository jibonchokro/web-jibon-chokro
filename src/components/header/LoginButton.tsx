"use client";

import { createClient } from "@/lib/supabase/client";

export default function LoginButton() {
    async function signInWithGoogle() {
        const supabase = createClient();

        await supabase.auth.signInWithOAuth({
            provider: "google",
            options: {
                redirectTo: `${location.origin}/auth/callback`,
            },
        });
    }

    return (
        <button
            onClick={signInWithGoogle}
            className="rounded-lg bg-green-700 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-green-800"
        >
            Login
        </button>
    );
}