// Shared JSON-LD helper for pages that don't already carry a more specific
// primary entity (a service page has its own Service node; an Insights
// article has BlogPosting; the Insights hub has Blog). Emits a WebPage node
// tied to the sitewide WebSite/business entities by @id — never a second,
// competing Organization/LocalBusiness node — plus the page's BreadcrumbList.
import type { Metadata } from "next";
import { siteConfig, ogImage } from "./site-config";

/**
 * Open Graph + Twitter metadata for a page, so shared links show the page's
 * own title and description rather than the sitewide defaults. Spread into a
 * page's `metadata` export alongside its title/description/canonical.
 */
export function socialMetadata({
  title,
  description,
  path,
}: {
  /** The full title as it should appear when shared. */
  title: string;
  description: string;
  /** Page path from the site root, e.g. "/about/". */
  path: string;
}): Pick<Metadata, "openGraph" | "twitter"> {
  return {
    openGraph: {
      type: "website",
      locale: "en_GY",
      url: `${siteConfig.url}${path}`,
      siteName: siteConfig.brandName,
      title,
      description,
      images: [ogImage],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

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
  type = "WebPage",
  image,
  extra,
}: {
  /** This page's path from the site root, e.g. "/about/". */
  path: string;
  /** The page's resolved <title> text. */
  name: string;
  description?: string;
  /** Breadcrumb trail, Home first, this page last. */
  trail: BreadcrumbItem[];
  /** WebPage subtype, e.g. "CollectionPage" for a listing page. */
  type?: "WebPage" | "CollectionPage";
  /** Absolute URL of the page's main image (must be visible on the page). */
  image?: string;
  /** Extra properties merged into the page node (e.g. mainEntity). */
  extra?: Record<string, unknown>;
}) {
  const url = `${siteConfig.url}${path}`;
  return [
    {
      "@context": "https://schema.org",
      "@type": type,
      "@id": `${url}#webpage`,
      url,
      name,
      ...(description ? { description } : {}),
      ...(image ? { primaryImageOfPage: { "@type": "ImageObject", url: image } } : {}),
      isPartOf: { "@id": `${siteConfig.url}/#website` },
      about: { "@id": `${siteConfig.url}/#business` },
      inLanguage: "en",
      ...extra,
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
