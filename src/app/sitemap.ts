import type { MetadataRoute } from "next";
import { services } from "@/lib/services-data";
import { siteConfig } from "@/lib/site-config";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/services/",
    "/industries/",
    "/our-work/",
    "/about/",
    "/quote/",
    "/contact/",
  ];

  const serviceRoutes = services.map((s) => `/services/${s.slug}/`);

  const routes = [...staticRoutes, ...serviceRoutes];

  return routes.map((route) => ({
    url: `${siteConfig.url}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : route === "/quote/" ? 0.9 : 0.8,
  }));
}
