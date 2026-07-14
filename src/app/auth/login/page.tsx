import LoginButton from "@/components/auth/LoginButton";
import Footer from "@/components/footer/Footer";
import Header from "@/components/header/Header";
import { createClient } from "@/lib/supabase/server";

export default async function LoginPage() {
    const supabase = await createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    return (
        <>
            <Header user={user} />

            <main className="mx-auto flex min-h-screen max-w-md items-center justify-center">
                <LoginButton />
            </main>

            <Footer />
        </>
    );
}