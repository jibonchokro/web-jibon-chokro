import { NextResponse } from "next/server";

import { createClient } from "@/lib/supabase/server";

export async function GET(request: Request) {
    const { searchParams, origin } = new URL(request.url);

    const code = searchParams.get("code");

    if (!code) {
        return NextResponse.redirect(origin);
    }

    const supabase = await createClient();

    const { error: exchangeError } =
        await supabase.auth.exchangeCodeForSession(code);

    if (exchangeError) {
        console.error("Exchange error:", exchangeError);

        return NextResponse.redirect(origin);
    }

    const {
        data: { user },
        error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
        console.error("User error:", userError);

        return NextResponse.redirect(origin);
    }

    const { error: profileError } = await supabase
        .from("profiles")
        .upsert(
            {
                id: user.id,
                name:
                    user.user_metadata?.full_name ??
                    user.user_metadata?.name ??
                    "Anonymous",
                email: user.email,
                avatar:
                    user.user_metadata?.avatar_url ??
                    null,
            },
            {
                onConflict: "id",
            }
        );

    if (profileError) {
        console.error(
            "Profile error:",
            profileError
        );
    }

    return NextResponse.redirect(origin);
}