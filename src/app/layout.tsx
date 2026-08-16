import type { Metadata } from "next";
import { Anek_Bangla, Geist } from "next/font/google";
import NextTopLoader from "nextjs-toploader";

import ScrollToTop from "@/components/common/ScrollToTop";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { Toaster } from "@/components/ui/sonner";

import "./globals.css";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
});

const anekBangla = Anek_Bangla({
  subsets: ["bengali"],
  weight: [
    "100",
    "200",
    "300",
    "400",
    "500",
    "600",
    "700",
    "800",
  ],
  display: "swap",
  variable: "--font-anek-bangla",
});

export const metadata: Metadata = {
  title: {
    default: "জীবন চক্র",
    template: "%s | জীবন চক্র",
  },
  description:
    "উপদেশ, উক্তি, শিক্ষণীয় গল্প, বাস্তব ঘটনা ও অনুপ্রেরণামূলক বাংলা ব্লগ।",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="bn"
      suppressHydrationWarning
      className={`${geist.variable} ${anekBangla.variable}`}
    >
      <body className="min-h-screen bg-background font-sans text-foreground antialiased">

        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >

          <NextTopLoader
            color="#333"
            initialPosition={0.08}
            crawlSpeed={200}
            height={2}
            crawl
            showSpinner={false}
            easing="ease"
            speed={200}
            shadow="0 0 5px #555,0 0 3px #555"
          />

          <div className="flex min-h-screen flex-col">
            <main className="flex-1">
              {children}
            </main>
          </div>

          <Toaster
            position="top-right"
            richColors
            closeButton
            duration={2500}
          />

          <ScrollToTop />

        </ThemeProvider>

      </body>
    </html>
  );
}