import Footer from "@/components/footer/Footer";
import Header from "@/components/header/Header";
import { createClient } from "@/lib/supabase/server";

export default async function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  let role = "user";

  if (user) {
    const { data: profile } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", user.id)
      .single();

    role = profile?.role ?? "user";
  }

  return (
    <>
      <Header
        user={user}
        role={role}
      />

      <main
        className="
                    flex-1
                    bg-[#b0bcff14]
                    bg-[linear-gradient(to_right,#00000005_1px,transparent_1px),linear-gradient(to_bottom,#00000005_1px,transparent_1px)]
                    bg-[size:15px_15px]
                "
      >
        {children}
      </main>

      <Footer />
    </>
  );
}