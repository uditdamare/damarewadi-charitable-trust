import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { initiatives } from "@/content/initiatives";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://damarewadicharitabletrust.org";

const STATIC_PATHS = [
  "",
  "/about",
  "/committee",
  "/initiatives",
  "/events",
  "/gallery",
  "/documents",
  "/news",
  "/contact",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of routing.locales) {
    for (const path of STATIC_PATHS) {
      entries.push({ url: `${SITE_URL}/${locale}${path}` });
    }
    for (const initiative of initiatives) {
      entries.push({ url: `${SITE_URL}/${locale}/initiatives/${initiative.slug}` });
    }
  }

  return entries;
}
