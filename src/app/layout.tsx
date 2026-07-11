import type { Metadata } from "next";
import { Anek_Bangla } from "next/font/google";

import "./globals.css";

const anekBangla = Anek_Bangla({
  subsets: ["bengali"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800"],
  display: "swap",
  variable: "--font-anek-bangla",
});

export const metadata: Metadata = {
  title: {
    default: "জীবন চক্র",
    template: "%s | জীবন চক্র",
  },
  description:
    "উপদেশ, উক্তি, শিক্ষণীয় গল্প, বাস্তব ঘটনা ও অনুপ্রেরণামূলক বাংলা ব্লগ।",
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
    >
      <body
        className={`${anekBangla.className} min-h-screen bg-white text-gray-900 antialiased`}
      >
        <div className="flex min-h-screen flex-col">
          <main className="flex-1">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}