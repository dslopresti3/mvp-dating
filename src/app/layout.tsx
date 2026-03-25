import type { Metadata } from "next";

import { BottomNav } from "@/components/BottomNav";

import "./globals.css";

export const metadata: Metadata = {
  title: "Stadium Date",
  description: "Event-first dating in New York, starting with live sports.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full bg-zinc-50 font-sans text-zinc-900">
        <main className="mx-auto flex min-h-screen w-full max-w-md flex-col gap-6 px-4 pb-28 pt-6">
          {children}
        </main>
        <BottomNav />
      </body>
    </html>
  );
}
