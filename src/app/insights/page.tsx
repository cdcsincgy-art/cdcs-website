import type { Metadata } from "next";
import Link from "next/link";
import { CTABanner } from "@/components/CTABanner";
import { ProjectImage } from "@/components/ProjectImage";
import { IconArrowRight } from "@/components/icons";
import { projectImageByFile } from "@/lib/project-images";
import {
  allInsightsNewestFirst,
  formatArticleDate,
} from "@/lib/insights-data";
import { siteConfig, ogImage } from "@/lib/site-config";

const HUB_TITLE = "Cleaning & Facility Insights";
const HUB_DESCRIPTION =
  "Practical cleaning and facility-management guidance from CDCS Inc. for businesses, offices, commercial facilities, and organizations in Georgetown and across Guyana.";

export const metadata: Metadata = {
  title: { absolute: `${HUB_TITLE} | ${siteConfig.brandName}` },
  description: HUB_DESCRIPTION,
  alternates: { canonical: "/insights/" },
  openGraph: {
    type: "website",
    url: `${siteConfig.url}/insights/`,
    siteName: siteConfig.brandName,
    title: `${HUB_TITLE} | ${siteConfig.brandName}`,
    description: HUB_DESCRIPTION,
    images: [ogImage],
  },
  twitter: {
    card: "summary_large_image",
    title: `${HUB_TITLE} | ${siteConfig.brandName}`,
    description: HUB_DESCRIPTION,
    images: [ogImage],
  },
};

const articles = allInsightsNewestFirst();

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "Blog",
    "@id": `${siteConfig.url}/insights/#blog`,
    name: HUB_TITLE,
    description: HUB_DESCRIPTION,
    url: `${siteConfig.url}/insights/`,
    inLanguage: "en-GY",
    publisher: {
      "@type": "Organization",
      "@id": `${siteConfig.url}/#business`,
      name: siteConfig.companyName,
    },
    blogPost: articles.map((a) => ({
      "@type": "BlogPosting",
      headline: a.title,
      description: a.metaDescription,
      url: `${siteConfig.url}/insights/${a.slug}/`,
      datePublished: a.datePublished,
      dateModified: a.dateModified ?? a.datePublished,
    })),
  },
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${siteConfig.url}/` },
      { "@type": "ListItem", position: 2, name: "Insights", item: `${siteConfig.url}/insights/` },
    ],
  },
];

export default function InsightsHubPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ================= HERO ================= */}
      <section className="relative overflow-hidden bg-navy-950 py-16 sm:py-20">
        <div className="pointer-events-none absolute inset-0 bg-grid-dark opacity-50" aria-hidden />
        <div className="pointer-events-none absolute inset-0 brand-glow opacity-80" aria-hidden />
        <div className="container-page relative">
          <nav className="mb-5 text-xs font-semibold text-slate-400" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-accent-400">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-slate-300">Insights</span>
          </nav>
          <p className="mb-4 flex items-center gap-2.5 text-xs font-bold uppercase tracking-[0.22em] text-accent-400">
            <span className="h-px w-6 bg-accent-400/60" aria-hidden />
            Cleaning &amp; Facility Insights
          </p>
          <h1 className="max-w-2xl text-pretty text-4xl font-extrabold leading-[1.1] tracking-tight text-white sm:text-5xl">
            Practical Cleaning &amp; Facility Guidance for Guyana&apos;s Businesses
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-slate-300 sm:text-lg">
            CDCS Inc. works with offices, commercial facilities, institutions, and organizations
            across Georgetown and Guyana every day. This is where we share what we&apos;ve learned —
            how to plan cleaning and exterior-maintenance schedules, keep interiors and building
            exteriors presentable, and decide when an outsourced programme is the right move.
          </p>
        </div>
      </section>

      {/* ================= ARTICLE LIST ================= */}
      <section className="bg-white py-16 sm:py-24">
        <div className="container-page">
          <div className="mx-auto grid max-w-4xl gap-8">
            {articles.map((article) => {
              const hero = projectImageByFile(article.heroImageFile);
              return (
                <article
                  key={article.slug}
                  className="group grid gap-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-colors hover:border-brand-400 sm:grid-cols-[minmax(0,16rem)_1fr] sm:p-6"
                >
                  <Link
                    href={`/insights/${article.slug}/`}
                    className="block overflow-hidden rounded-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600"
                    tabIndex={-1}
                    aria-hidden
                  >
                    <div className="aspect-[4/3] overflow-hidden">
                      <ProjectImage image={hero} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]" />
                    </div>
                  </Link>
                  <div className="flex flex-col">
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-semibold text-slate-500">
                      <span className="rounded-full bg-brand-50 px-2.5 py-0.5 text-brand-700">{article.topic}</span>
                      <time dateTime={article.datePublished}>{formatArticleDate(article.datePublished)}</time>
                      <span aria-hidden>·</span>
                      <span>{article.readingTimeMinutes} min read</span>
                    </div>
                    <h2 className="mt-3 text-xl font-bold leading-snug text-navy-900 sm:text-2xl">
                      <Link
                        href={`/insights/${article.slug}/`}
                        className="transition-colors hover:text-brand-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600"
                      >
                        {article.title}
                      </Link>
                    </h2>
                    <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-600 sm:text-base">
                      {article.excerpt}
                    </p>
                    <Link
                      href={`/insights/${article.slug}/`}
                      className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-brand-600 hover:text-brand-700"
                    >
                      Read the article
                      <IconArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>

          <p className="mx-auto mt-12 max-w-4xl text-sm leading-relaxed text-slate-500">
            More guidance is on the way. In the meantime, the{" "}
            <Link href="/services/" className="font-semibold text-brand-600 hover:underline">
              CDCS Inc. services overview
            </Link>{" "}
            covers every cleaning and facility program we run in Guyana, or you can{" "}
            <Link href="/quote/" className="font-semibold text-brand-600 hover:underline">
              request a quote
            </Link>{" "}
            for your own facility.
          </p>
        </div>
      </section>

      <CTABanner
        title="Have a Cleaning or Facility Question?"
        description="If there's something you'd like covered here, or you need a proposal for your office or facility, the CDCS Inc. team is a phone call or message away."
      />
    </>
  );
}
