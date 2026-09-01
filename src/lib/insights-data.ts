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
  {
    slug: "commercial-cleaning-cost-guyana",
    title: "How Much Does Commercial Cleaning Cost in Guyana? What Affects the Price",
    metaTitle: "What Affects the Cost of Commercial Cleaning in Guyana",
    metaDescription:
      "A plain-language guide to what drives a commercial cleaning quote in Guyana — facility size, cleaning frequency, scope of work, hours, consumables, and periodic tasks — and how to get an accurate figure for your office or facility.",
    excerpt:
      "There is no single price for commercial cleaning — a quote is built from your facility size, how often it is cleaned, the scope of work, the hours involved, and how consumables are handled. This guide explains each cost driver and how to get an accurate quote for a business in Guyana.",
    datePublished: "2026-09-01",
    dateModified: "2026-09-01",
    readingTimeMinutes: 10,
    topic: "Budgeting",
    primaryKeyword: "commercial cleaning cost in Guyana",
    heroImageFile: "janitorial-restroom-cleaning",
    relatedServiceSlugs: [
      "commercial-janitorial-cleaning",
      "commercial-facility-cleaning",
      "deep-cleaning",
    ],
    keywords: [
      "commercial cleaning cost Guyana",
      "commercial cleaning prices Guyana",
      "janitorial services cost Guyana",
      "office cleaning cost Guyana",
      "commercial cleaning quote Guyana",
      "commercial cleaning Guyana",
      "janitorial services Guyana",
    ],
    relatedServicesIntro:
      "These are the CDCS Inc. programmes a commercial cleaning quote would typically cover.",
    cta: {
      title: "Want an Accurate Commercial Cleaning Quote?",
      description:
        "Tell us your facility size, the areas to be cleaned, and how often you need service, and CDCS Inc. will assess the site and send a written proposal with a clear figure for the recurring scope.",
    },
  },
  {
    slug: "post-construction-cleaning-guyana",
    title: "What Does Professional Post-Construction Cleaning Involve in Guyana?",
    metaTitle: "Post-Construction Cleaning in Guyana: What It Involves",
    metaDescription:
      "What post-construction cleaning involves in Guyana — the rough, builders', and final detail clean stages, what each covers, and how it is scoped for handover.",
    excerpt:
      "Post-construction cleaning is the stage that turns a finished build into a space ready to hand over. This guide explains the rough, builders', and final detail clean stages, the residues each removes, how the work is scoped on an active site, and how contractors and developers in Guyana can plan for it.",
    datePublished: "2026-09-01",
    dateModified: "2026-09-01",
    readingTimeMinutes: 10,
    topic: "Construction Handover",
    primaryKeyword: "post-construction cleaning in Guyana",
    heroImageFile: "commercial-window-cleaning-glass-facade",
    relatedServiceSlugs: [
      "post-construction-cleaning",
      "deep-cleaning",
      "commercial-janitorial-cleaning",
    ],
    keywords: [
      "post construction cleaning Guyana",
      "post-construction cleaning services Guyana",
      "builders clean Guyana",
      "construction cleanup Guyana",
      "post renovation cleaning Guyana",
      "commercial cleaning Guyana",
    ],
    relatedServicesIntro:
      "These are the CDCS Inc. services a project handover typically draws on.",
    cta: {
      title: "Handing Over a Project Soon?",
      description:
        "Tell us the project type, size, and stage, and CDCS Inc. will scope a post-construction clean around your handover date and site conditions.",
    },
  },
  {
    slug: "commercial-deep-cleaning-guyana",
    title: "Commercial Deep Cleaning in Guyana: What It Is and When Your Business Needs It",
    metaTitle: "Commercial Deep Cleaning in Guyana: What It Is & When You Need It",
    metaDescription:
      "How commercial deep cleaning differs from routine cleaning, what a deep clean covers, and when a business or facility in Guyana should book one.",
    excerpt:
      "Deep cleaning reaches what routine cleaning does not have time for — behind and under fittings, tops of partitions, vents, grout, and the parts of kitchens and washrooms that need scrubbing. This guide explains the difference, what a deep clean covers, and when a commercial space in Guyana genuinely needs one.",
    datePublished: "2026-09-01",
    dateModified: "2026-09-01",
    readingTimeMinutes: 10,
    topic: "Facility Care",
    primaryKeyword: "commercial deep cleaning in Guyana",
    heroImageFile: "janitorial-restroom-cleaning",
    relatedServiceSlugs: [
      "deep-cleaning",
      "commercial-janitorial-cleaning",
      "upholstery-fabric-extraction",
    ],
    keywords: [
      "deep cleaning Guyana",
      "commercial deep cleaning Guyana",
      "office deep cleaning Guyana",
      "deep cleaning services Guyana",
      "move out cleaning Guyana",
      "move in cleaning Guyana",
    ],
    relatedServicesIntro:
      "These are the CDCS Inc. programmes a deep clean is usually planned alongside.",
    cta: {
      title: "Need a Deep Clean Scheduled?",
      description:
        "Tell us the space, its condition, and your deadline — an inspection, a move, an event — and CDCS Inc. will scope a deep clean and a schedule that works around your operation.",
    },
  },
  {
    slug: "commercial-fleet-washing-guyana",
    title: "How Often Should a Commercial Vehicle Fleet Be Washed in Guyana?",
    metaTitle: "Commercial Fleet Washing in Guyana: How Often & What's Involved",
    metaDescription:
      "How often trucks, vans, and commercial fleets should be washed in Guyana, what an on-site depot wash covers, and how to set up a scheduled washing programme.",
    excerpt:
      "How often a fleet needs washing depends on what the vehicles do, where they run, and whether they carry branding. This guide covers fleet washing frequency by vehicle type, what an on-site wash at your depot involves, and how to set up a scheduled programme in Guyana.",
    datePublished: "2026-09-01",
    dateModified: "2026-09-01",
    readingTimeMinutes: 9,
    topic: "Fleet Operations",
    primaryKeyword: "commercial fleet washing in Guyana",
    heroImageFile: "fleet-washing-truck-covered-in-foam",
    relatedServiceSlugs: [
      "fleet-washing",
      "mobile-detailing",
      "pressure-washing",
    ],
    keywords: [
      "fleet washing Guyana",
      "truck washing Guyana",
      "commercial vehicle washing Guyana",
      "fleet wash service Guyana",
      "depot vehicle cleaning Guyana",
      "bus washing Guyana",
    ],
    relatedServicesIntro:
      "These are the CDCS Inc. services a fleet operator most often uses.",
    cta: {
      title: "Setting Up a Fleet Washing Programme?",
      description:
        "Tell us your fleet size, vehicle types, depot location, and dispatch pattern, and CDCS Inc. will propose an on-site washing schedule and a clear quote.",
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
 * Articles that support a given service page, capped so a service page's "From
 * CDCS Insights" block stays a short, secondary resource list as the library
 * grows. Articles whose primary service (relatedServiceSlugs[0]) is this page
 * come first — so a page always leads with the content written specifically for
 * it — then articles that reference it secondarily, each group newest first.
 */
export function insightsForService(serviceSlug: string): InsightArticle[] {
  const matches = insightArticles.filter((a) =>
    a.relatedServiceSlugs.includes(serviceSlug),
  );
  const primary = matches
    .filter((a) => a.relatedServiceSlugs[0] === serviceSlug)
    .sort(byNewest);
  const secondary = matches
    .filter((a) => a.relatedServiceSlugs[0] !== serviceSlug)
    .sort(byNewest);
  return [...primary, ...secondary].slice(0, 3);
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
