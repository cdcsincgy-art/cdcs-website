// Registry for the CDCS Inc. "Cleaning & Facility Insights" content hub at
// /insights/. Each article is a hand-authored page under
// src/app/insights/<slug>/page.tsx; this file holds the shared metadata that
// the hub index, the sitemap, the per-article <head>, and the "related
// insights" blocks on service pages all read from.
//
// Add an article by:
//   1. adding an entry to `insightArticles` below, and
//   2. creating src/app/insights/<slug>/page.tsx that renders <ArticleLayout>.
// The hub, sitemap, and internal-linking sections pick it up automatically.

export interface InsightArticle {
  slug: string;
  /** Editorial H1 / card heading. */
  title: string;
  /** <title> tag — kept distinct from `title` to avoid duplicate-title issues. */
  metaTitle: string;
  metaDescription: string;
  /** One- or two-sentence summary used on the hub card and as the lede. */
  excerpt: string;
  /** ISO date (YYYY-MM-DD). */
  datePublished: string;
  /** ISO date (YYYY-MM-DD); defaults to datePublished when omitted. */
  dateModified?: string;
  /** Rounded reading time in minutes, for the article byline. */
  readingTimeMinutes: number;
  /** Short topic label shown as an eyebrow / category chip. */
  topic: string;
  /** Plain-language primary topic this article is written to support. */
  primaryKeyword: string;
  /** Tail of a project-image file path (see project-images.ts) for the hero. */
  heroImageFile: string;
  /** Service slugs this article supports — powers contextual internal links. */
  relatedServiceSlugs: string[];
  keywords: string[];
  /**
   * Closing CTA-banner copy for this article. A generic fallback is used when
   * omitted (see ArticleLayout), so every article can tune its own call to
   * action without the shell hard-coding one topic.
   */
  cta?: { title: string; description: string };
  /** Lead line above the "services referenced" block; generic fallback if omitted. */
  relatedServicesIntro?: string;
}

export const insightArticles: InsightArticle[] = [
  {
    slug: "commercial-office-cleaning-guyana",
    title: "How Often Should a Commercial Office Be Professionally Cleaned in Guyana?",
    metaTitle: "How Often Should a Commercial Office Be Cleaned in Guyana?",
    metaDescription:
      "A practical guide to commercial office cleaning frequency in Guyana — how often to clean reception, workstations, washrooms, kitchens, floors, and carpets, with a sample schedule for offices in Georgetown.",
    excerpt:
      "How often an office needs professional cleaning depends on how many people use it, how the public sees it, and how it is run. This guide breaks the question down area by area and gives a sample cleaning-frequency schedule you can adapt for your own facility in Guyana.",
    datePublished: "2026-09-01",
    dateModified: "2026-09-01",
    readingTimeMinutes: 9,
    topic: "Facility Management",
    primaryKeyword: "commercial office cleaning frequency in Guyana",
    heroImageFile: "commercial-cleaning-facility-interior",
    relatedServiceSlugs: [
      "commercial-janitorial-cleaning",
      "deep-cleaning",
      "upholstery-fabric-extraction",
      "commercial-facility-cleaning",
    ],
    keywords: [
      "commercial cleaning Guyana",
      "office cleaning Guyana",
      "janitorial services Guyana",
      "commercial cleaning Georgetown Guyana",
      "professional office cleaning",
      "commercial cleaning schedule",
    ],
    relatedServicesIntro:
      "If you'd rather hand the schedule to a supervised team, these are the CDCS Inc. programs that cover the areas above.",
    cta: {
      title: "Need a Cleaning Schedule Built for Your Office?",
      description:
        "Tell us your facility size, headcount, and operating hours and CDCS Inc. will propose a commercial cleaning schedule and a clear service plan.",
    },
  },
  {
    slug: "commercial-pressure-washing-guyana",
    title: "How Often Should Commercial Properties Be Pressure Washed in Guyana?",
    metaTitle: "How Often to Pressure Wash Commercial Properties in Guyana",
    metaDescription:
      "A practical guide to commercial pressure washing frequency in Guyana — how often to clean building exteriors, walkways, concrete, parking areas, walls, and loading zones, with a sample schedule.",
    excerpt:
      "How often a commercial property needs pressure washing depends on its surfaces, exposure, surroundings, and traffic. This Guyana-specific guide works through it area by area and includes a practical exterior-cleaning frequency table.",
    datePublished: "2026-09-01",
    dateModified: "2026-09-01",
    readingTimeMinutes: 10,
    topic: "Property Maintenance",
    primaryKeyword: "commercial pressure washing frequency in Guyana",
    heroImageFile: "pressure-washing-commercial-building",
    relatedServiceSlugs: [
      "pressure-washing",
      "commercial-janitorial-cleaning",
      "commercial-facility-cleaning",
      "post-construction-cleaning",
    ],
    keywords: [
      "pressure washing Guyana",
      "commercial pressure washing Guyana",
      "pressure washing Georgetown Guyana",
      "commercial property cleaning Guyana",
      "exterior cleaning Guyana",
      "commercial pressure cleaning",
    ],
    relatedServicesIntro:
      "If you'd rather hand the exterior programme to a supervised team, these are the CDCS Inc. services that cover the work above.",
    cta: {
      title: "Planning Pressure Washing for Your Property?",
      description:
        "Tell us about your building, walkways, and parking areas and CDCS Inc. will assess the surfaces, match the method to each one, and propose a scope, schedule, and clear quote.",
    },
  },
  {
    slug: "carpet-upholstery-cleaning-guyana",
    title:
      "How Often Should Commercial Carpets and Upholstery Be Professionally Cleaned in Guyana?",
    metaTitle: "Commercial Carpet & Upholstery Cleaning Frequency in Guyana",
    metaDescription:
      "How often should commercial carpets, office chairs, and upholstered furniture be professionally cleaned in Guyana? A practical guide to extraction and steam-cleaning frequency, with a sample schedule.",
    excerpt:
      "How often commercial carpet and upholstered furniture need professional cleaning depends on traffic, fabric, spills, and how well routine vacuuming keeps up. This guide covers extraction and steam-cleaning frequency area by area, with a practical schedule for offices and facilities in Guyana.",
    datePublished: "2026-09-01",
    dateModified: "2026-09-01",
    readingTimeMinutes: 11,
    topic: "Facility Care",
    primaryKeyword: "commercial carpet and upholstery cleaning frequency in Guyana",
    heroImageFile: "upholstery-extraction-cleaning-wand",
    relatedServiceSlugs: [
      "upholstery-fabric-extraction",
      "deep-cleaning",
      "commercial-janitorial-cleaning",
    ],
    keywords: [
      "carpet cleaning Guyana",
      "steam cleaning Guyana",
      "upholstery cleaning Guyana",
      "commercial carpet cleaning Guyana",
      "office carpet cleaning Guyana",
      "fabric chair cleaning Guyana",
      "carpet extraction Guyana",
      "upholstery extraction Guyana",
    ],
    relatedServicesIntro:
      "If you'd rather hand this to a team that assesses the fabric first, these are the CDCS Inc. services that cover the work above.",
    cta: {
      title: "Planning Carpet or Upholstery Cleaning for Your Office?",
      description:
        "Tell us your carpet area, the number and type of fabric chairs or sofas, and any problem spots, and CDCS Inc. will assess the fabrics, match the method, and propose a scope, schedule, and clear quote.",
    },
  },
  {
    slug: "commercial-janitorial-contract-guyana",
    title: "What Should a Commercial Janitorial Service Agreement Include in Guyana?",
    metaTitle: "What a Commercial Janitorial Contract Should Cover in Guyana",
    metaDescription:
      "A practical checklist for organizations evaluating a commercial janitorial service agreement in Guyana — scope of work, frequencies, staffing, supervision, quality control, pricing, and how to compare quotes fairly.",
    excerpt:
      "Before signing a commercial cleaning contract, it helps to know what a well-written janitorial service agreement covers. This guide walks through scope, frequencies, staffing, supervision, quality control, pricing, and how to compare quotations fairly — practical guidance for organizations in Guyana.",
    datePublished: "2026-09-01",
    dateModified: "2026-09-01",
    readingTimeMinutes: 12,
    topic: "Procurement",
    primaryKeyword: "commercial janitorial service agreements in Guyana",
    heroImageFile: "commercial-cleaning-staircase",
    relatedServiceSlugs: [
      "commercial-janitorial-cleaning",
      "commercial-facility-cleaning",
      "deep-cleaning",
    ],
    keywords: [
      "janitorial services Guyana",
      "commercial cleaning Guyana",
      "commercial cleaning contract Guyana",
      "janitorial contract Guyana",
      "office cleaning services Guyana",
      "commercial cleaning company Guyana",
      "facility cleaning Guyana",
      "janitorial services Georgetown Guyana",
    ],
    relatedServicesIntro:
      "If you're ready to put an agreement in place, these are the CDCS Inc. programmes it would cover.",
    cta: {
      title: "Building a Janitorial Agreement for Your Organization?",
      description:
        "Send us your scope document — or tell us your facility, hours, and priorities — and CDCS Inc. will quote against it and provide a sample service agreement and inspection checklist.",
    },
  },
];

export function getArticleBySlug(slug: string): InsightArticle | undefined {
  return insightArticles.find((a) => a.slug === slug);
}

// The registry is kept in chronological order (oldest first). This orders
// newest first, using registry position to break ties between articles that
// share a publish date.
function byNewest(a: InsightArticle, b: InsightArticle): number {
  const byDate = b.datePublished.localeCompare(a.datePublished);
  if (byDate !== 0) return byDate;
  return insightArticles.indexOf(b) - insightArticles.indexOf(a);
}

/**
 * Articles that support a given service page, newest first. Capped so a service
 * page's "From CDCS Insights" block stays a short, secondary resource list as
 * the library grows.
 */
export function insightsForService(serviceSlug: string): InsightArticle[] {
  return insightArticles
    .filter((a) => a.relatedServiceSlugs.includes(serviceSlug))
    .sort(byNewest)
    .slice(0, 3);
}

/** All articles, newest first — used by the hub index. */
export function allInsightsNewestFirst(): InsightArticle[] {
  return [...insightArticles].sort(byNewest);
}

/** Long, human-readable date for article bylines (e.g. "1 September 2026"). */
export function formatArticleDate(iso: string): string {
  const d = new Date(`${iso}T00:00:00Z`);
  return d.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}
