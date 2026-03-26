import type { Metadata, Viewport } from "next";

import { BottomNav } from "@/components/BottomNav";

import "./globals.css";

const fallbackSiteUrl = "https://stadium-date.vercel.app";
const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL && process.env.NEXT_PUBLIC_SITE_URL.length > 0
    ? process.env.NEXT_PUBLIC_SITE_URL
    : fallbackSiteUrl;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Stadium Date",
  description: "Event-first dating in New York, starting with live sports.",
  applicationName: "Stadium Date",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: "/",
    siteName: "Stadium Date",
    title: "Stadium Date",
    description: "Event-first dating in New York, starting with live sports.",
  },
  twitter: {
    card: "summary",
    title: "Stadium Date",
    description: "Event-first dating in New York, starting with live sports.",
  },
  robots: {
    index: true,
    follow: true,
  },
  manifest: "/manifest.webmanifest",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Stadium Date",
  },
  formatDetection: {
    telephone: false,
  },
};

export const viewport: Viewport = {
  themeColor: "#18181b",
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
