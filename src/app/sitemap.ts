import type { MetadataRoute } from "next";
import { services } from "@/lib/services-data";
import { insightArticles } from "@/lib/insights-data";
import { publishedProjects } from "@/lib/projects-data";
import { siteConfig } from "@/lib/site-config";

export const dynamic = "force-static";

// Every URL here must be the page's canonical URL exactly (https, www,
// trailing slash). `lastModified` is only given where the real date is known
// (Insights articles) — a build timestamp on every URL is inaccurate, and
// search engines learn to ignore lastmod values they can't trust.
export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "/",
    "/services/",
    "/washcare/",
    "/industries/",
    "/industries/oil-and-gas/",
    "/our-work/",
    "/projects/",
    "/about/",
    "/credentials/",
    "/insights/",
    "/estimate/",
    "/quote/",
    "/contact/",
  ];

  const serviceRoutes = services.map((s) => `/services/${s.slug}/`);
  // Drafts and projects awaiting client approval have no page, so only
  // published projects are listed.
  const projectRoutes = publishedProjects.map((p) => `/projects/${p.slug}/`);

  const priorityFor = (route: string) =>
    route === "/"
      ? 1
      : route === "/quote/" || route === "/estimate/"
        ? 0.9
        : route.startsWith("/projects/") && route !== "/projects/"
          ? 0.6
          : 0.8;

  const entries: MetadataRoute.Sitemap = [...staticRoutes, ...serviceRoutes, ...projectRoutes].map(
    (route) => ({
      url: `${siteConfig.url}${route}`,
      changeFrequency: route === "/" ? "weekly" : "monthly",
      priority: priorityFor(route),
    }),
  );

  const insightEntries: MetadataRoute.Sitemap = insightArticles.map((a) => ({
    url: `${siteConfig.url}/insights/${a.slug}/`,
    lastModified: a.dateModified ?? a.datePublished,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...entries, ...insightEntries];
}
