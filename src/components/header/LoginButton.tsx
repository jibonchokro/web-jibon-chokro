"use client";

import { createClient } from "@/lib/supabase/client";
import { LogIn } from "lucide-react";
import { useState } from "react";

export default function LoginButton() {
    const [loading, setLoading] = useState(false);

    async function signInWithGoogle() {
        try {
            setLoading(true);

            const supabase = createClient();

            await supabase.auth.signInWithOAuth({
                provider: "google",
                options: {
                    redirectTo: `${location.origin}/auth/callback`,
                },
            });

        } catch (error) {
            console.error("Login failed:", error);
            setLoading(false);
        }
    }

    return (
        <button
            type="button"
            onClick={signInWithGoogle}
            disabled={loading}
            className="
                inline-flex
                items-center
                justify-center
                gap-2
                rounded-lg
                border
                border-border
                bg-foreground
                px-3
                py-1
                text-sm
                font-semibold
                text-background
                transition
                hover:opacity-90
                focus-visible:outline-none
                focus-visible:ring-2
                focus-visible:ring-ring
                disabled:pointer-events-none
                disabled:opacity-50
            "
        >
            <LogIn
                size={16}
                className="sm:size-[18px]"
            />

            <span>
                {loading ? "Login..." : "Login"}
            </span>
        </button>
    );
}