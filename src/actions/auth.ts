"use server";

import { createClient } from "@/lib/supabase/server";

export async function createUserProfile() {
    const supabase = await createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) return;

    await supabase
        .from("profiles")
        .upsert(
            {
                id: user.id,
                name: user.user_metadata.full_name,
                email: user.email,
                avatar: user.user_metadata.avatar_url,
            },
            {
                onConflict: "id",
            }
        );
}