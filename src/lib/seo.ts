// Shared JSON-LD helper for pages that don't already carry a more specific
// primary entity (a service page has its own Service node; an Insights
// article has BlogPosting; the Insights hub has Blog). Emits a WebPage node
// tied to the sitewide WebSite/business entities by @id — never a second,
// competing Organization/LocalBusiness node — plus the page's BreadcrumbList.
import { siteConfig } from "./site-config";

export interface BreadcrumbItem {
  /** Visible crumb label. */
  name: string;
  /** Path from the site root, e.g. "/" or "/about/". */
  path: string;
}

export function pageLd({
  path,
  name,
  description,
  trail,
}: {
  /** This page's path from the site root, e.g. "/about/". */
  path: string;
  /** The page's resolved <title> text. */
  name: string;
  description?: string;
  /** Breadcrumb trail, Home first, this page last. */
  trail: BreadcrumbItem[];
}) {
  const url = `${siteConfig.url}${path}`;
  return [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "@id": `${url}#webpage`,
      url,
      name,
      ...(description ? { description } : {}),
      isPartOf: { "@id": `${siteConfig.url}/#website` },
      about: { "@id": `${siteConfig.url}/#business` },
      inLanguage: "en",
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: trail.map((t, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: t.name,
        item: `${siteConfig.url}${t.path}`,
      })),
    },
  ];
}
