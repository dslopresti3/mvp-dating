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
      <body className="min-h-[100dvh] overflow-x-hidden bg-zinc-50 font-sans text-zinc-900">
        <main className="mx-auto flex min-h-[100dvh] w-full max-w-md flex-col gap-6 px-4 pb-[calc(var(--bottom-nav-height)+env(safe-area-inset-bottom)+1rem)] pt-[calc(env(safe-area-inset-top)+0.875rem)]">
          {children}
        </main>
        <BottomNav />
      </body>
    </html>
  );
}
