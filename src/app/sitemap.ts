import type { MetadataRoute } from "next";

const routes = ["/", "/discover", "/matches", "/profile"];
const fallbackSiteUrl = "https://stadium-date.vercel.app";
const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL && process.env.NEXT_PUBLIC_SITE_URL.length > 0
    ? process.env.NEXT_PUBLIC_SITE_URL
    : fallbackSiteUrl;

export default function sitemap(): MetadataRoute.Sitemap {
  const updatedAt = new Date();

  return routes.map((route) => ({
    url: new URL(route, siteUrl).toString(),
    lastModified: updatedAt,
    changeFrequency: "weekly",
    priority: route === "/" ? 1 : 0.8,
  }));
}
