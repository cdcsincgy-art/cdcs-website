import type { MetadataRoute } from "next";
import { services } from "@/lib/services-data";
import { insightArticles } from "@/lib/insights-data";
import { siteConfig } from "@/lib/site-config";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/services/",
    "/industries/",
    "/our-work/",
    "/about/",
    "/insights/",
    "/quote/",
    "/contact/",
  ];

  const serviceRoutes = services.map((s) => `/services/${s.slug}/`);
  const insightRoutes = insightArticles.map((a) => `/insights/${a.slug}/`);

  const routes = [...staticRoutes, ...serviceRoutes, ...insightRoutes];

  return routes.map((route) => ({
    url: `${siteConfig.url}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority:
      route === ""
        ? 1
        : route === "/quote/"
          ? 0.9
          : route.startsWith("/insights/") && route !== "/insights/"
            ? 0.6
            : 0.8,
  }));
}
