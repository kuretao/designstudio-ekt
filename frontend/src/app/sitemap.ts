import type { MetadataRoute } from "next";
import {
  contentPages,
  newsArticles,
  projects,
  seoLandingPageItems,
  servicePageItems,
} from "@/src/data";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ??
  "https://3dsmartdesign.ru";

const dedicatedContentPageIds = new Set(["novosti", "akcii-i-skidki", "otzyvy-o-nas"]);

const staticRoutes = [
  "",
  "/o-nas",
  "/portfolio",
  "/services",
  "/blog",
  "/kontakty",
  "/akcii-i-skidki",
  "/otzyvy-o-nas",
  "/nagrady-i-diplomy",
  "/karera",
  "/virtualnyj-3d-tur-demo",
  "/politika-konfidencialnosti",
  "/user/agreement",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const routes = [
    ...staticRoutes,
    ...projects.map((project) => `/portfolio/${project.slug}`),
    ...newsArticles.map((article) => `/novosti/${article.slug}`),
    ...servicePageItems.map((item) => `/${item.id}`),
    ...seoLandingPageItems.map((item) => `/${item.id}`),
    ...contentPages
      .filter((page) => !dedicatedContentPageIds.has(page.id))
      .map((page) => `/${page.id}`),
  ];

  return Array.from(new Set(routes)).map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: now,
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.7,
  }));
}
