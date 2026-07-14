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
            className="rounded-lg bg-green-700 px-4 py-2 text-white transition hover:bg-green-800"
        >
            Google দিয়ে Login
        </button>
    );
}