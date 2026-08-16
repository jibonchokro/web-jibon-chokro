"use server";

import { revalidatePath } from "next/cache";

import { supabaseAdmin } from "@/lib/supabase/admin";
import { createClient } from "@/lib/supabase/server";

export async function updateProfileName(name: string) {
    const trimmed = name.trim();

    if (!trimmed) {
        return {
            success: false as const,
            error: "নাম খালি রাখা যাবে না।",
        };
    }

    const supabase = await createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        return {
            success: false as const,
            error: "Unauthorized",
        };
    }

    // Keep both the `profiles` table (the source of truth used
    // elsewhere in the app, e.g. comment/post authorship) and the
    // auth user_metadata (used as a display fallback) in sync.
    const { error: profileError } = await supabase
        .from("profiles")
        .update({ name: trimmed })
        .eq("id", user.id);

    if (profileError) {
        console.error(
            "Update profile name error:",
            profileError
        );

        return {
            success: false as const,
            error: "প্রোফাইল আপডেট ব্যর্থ হয়েছে।",
        };
    }

    const { error: metadataError } =
        await supabase.auth.updateUser({
            data: { full_name: trimmed },
        });

    if (metadataError) {
        console.error(
            "Update user metadata error:",
            metadataError
        );
    }

    revalidatePath("/dashboard/profile");
    revalidatePath("/dashboard/settings");

    return { success: true as const };
}

export async function exportUserData(): Promise<
    | { success: true; data: string }
    | { success: false; error: string }
> {
    const supabase = await createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        return {
            success: false,
            error: "Unauthorized",
        };
    }

    const [
        { data: profile },
        { data: bookmarks },
        { data: comments },
    ] = await Promise.all([
        supabase
            .from("profiles")
            .select("id, name, email, avatar")
            .eq("id", user.id)
            .maybeSingle(),
        supabase
            .from("bookmarks")
            .select("post_id, created_at")
            .eq("user_id", user.id),
        // NOTE: assumes a `user_id` column on `comments`, matching
        // the `bookmarks` table. Adjust if your actual column is
        // named differently (e.g. `author_id`).
        supabase
            .from("comments")
            .select("post_id, content, created_at, is_deleted")
            .eq("user_id", user.id),
    ]);

    const exportPayload = {
        exportedAt: new Date().toISOString(),
        account: {
            id: user.id,
            email: user.email,
            createdAt: user.created_at,
        },
        profile: profile ?? null,
        bookmarks: bookmarks ?? [],
        comments: comments ?? [],
    };

    return {
        success: true,
        data: JSON.stringify(exportPayload, null, 2),
    };
}

export async function deleteAccount(): Promise<
    { success: true } | { success: false; error: string }
> {
    const supabase = await createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        return {
            success: false,
            error: "Unauthorized",
        };
    }

    // Explicit cleanup in case foreign keys aren't set to CASCADE.
    // Safe even if a table already cascades — the delete then
    // simply matches zero rows.
    await supabase
        .from("bookmarks")
        .delete()
        .eq("user_id", user.id);

    // NOTE: same `user_id` assumption as exportUserData above.
    await supabase
        .from("comments")
        .delete()
        .eq("user_id", user.id);

    await supabase
        .from("profiles")
        .delete()
        .eq("id", user.id);

    const { error: deleteUserError } =
        await supabaseAdmin.auth.admin.deleteUser(
            user.id
        );

    if (deleteUserError) {
        console.error(
            "Delete user error:",
            deleteUserError
        );

        return {
            success: false,
            error:
                "অ্যাকাউন্ট মুছে ফেলা যায়নি। আবার চেষ্টা করুন।",
        };
    }

    await supabase.auth.signOut();

    return { success: true };
}