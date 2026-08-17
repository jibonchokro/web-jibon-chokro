import { createClient } from "@/lib/supabase/server";

export async function getUserRole() {
    const supabase = await createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        return {
            user: null,
            role: null,
        };
    }

    const { data: profile, error } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", user.id)
        .maybeSingle();

    if (error) {
        console.error("Get user role error:", error);

        return {
            user,
            role: "user",
        };
    }

    return {
        user,
        role: profile?.role ?? "user",
    };
}

export async function isAdmin() {
    const { role } = await getUserRole();

    return role === "admin";
}