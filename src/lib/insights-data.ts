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
];

export function getArticleBySlug(slug: string): InsightArticle | undefined {
  return insightArticles.find((a) => a.slug === slug);
}

/** Articles that are written to support a given service page, newest first. */
export function insightsForService(serviceSlug: string): InsightArticle[] {
  return insightArticles
    .filter((a) => a.relatedServiceSlugs.includes(serviceSlug))
    .sort((a, b) => b.datePublished.localeCompare(a.datePublished));
}

/** All articles, newest first — used by the hub index. */
export function allInsightsNewestFirst(): InsightArticle[] {
  return [...insightArticles].sort((a, b) =>
    b.datePublished.localeCompare(a.datePublished),
  );
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
