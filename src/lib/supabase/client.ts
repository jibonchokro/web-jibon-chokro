import { createBrowserClient } from "@supabase/ssr";

export function createClient() {
    return createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            auth: {
                // All auth code exchanges (OAuth, password
                // recovery, email confirmation) go through the
                // dedicated /auth/callback route, which controls
                // where the user lands afterward. Without this,
                // if a ?code= ever ends up on the wrong page (e.g.
                // a redirect URL that isn't in the Supabase allow
                // list falls back to the Site URL), the browser
                // client would silently exchange it there instead
                // — logging the user in on an arbitrary page with
                // no explicit flow ever having run.
                detectSessionInUrl: false,
            },
        }
    );
}