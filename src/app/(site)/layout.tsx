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

  return (
    <>
      <Header user={user} />

      <main className="flex-1 bg-[#f4f4f4]">
        {children}
      </main>

      <Footer />
    </>
  );
}