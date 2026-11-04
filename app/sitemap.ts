import type { MetadataRoute } from "next";
import { projects } from "@/lib/content/projects";
import { locales } from "@/lib/i18n/config";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ["", "/portfolio", "/services", "/about", "/contact", ...projects.map((p) => `/portfolio/${p.slug}`)];
  return paths.map((path) => ({
    url: `${site.url}/en${path}`,
    alternates: { languages: Object.fromEntries(locales.map((l) => [l, `${site.url}/${l}${path}`])) },
  }));
}
