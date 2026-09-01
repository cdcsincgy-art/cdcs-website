import type { ReactNode } from "react";
import Link from "next/link";
import { CTABanner } from "@/components/CTABanner";
import { ProjectImage } from "@/components/ProjectImage";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Faq } from "@/components/Faq";
import { IconArrowRight } from "@/components/icons";
import { projectImageByFile } from "@/lib/project-images";
import { getServiceBySlug } from "@/lib/services-data";
import {
  type InsightArticle,
  formatArticleDate,
} from "@/lib/insights-data";
import { siteConfig } from "@/lib/site-config";

/**
 * Shared editorial shell for every /insights/ article: dark breadcrumb hero,
 * authentic hero photo, a comfortable reading measure for the body, a
 * related-services block, and the site CTA. It also emits the article's
 * BlogPosting + BreadcrumbList JSON-LD from the registry entry so individual
 * article pages only supply prose.
 */
export function ArticleLayout({
  article,
  children,
  faq,
}: {
  article: InsightArticle;
  children: ReactNode;
  /**
   * Optional FAQ block. When provided, the questions are rendered visibly on
   * the page (via <Faq>) AND emitted as FAQPage structured data — never one
   * without the other.
   */
  faq?: { q: string; a: string }[];
}) {
  const hero = projectImageByFile(article.heroImageFile);
  const articleUrl = `${siteConfig.url}/insights/${article.slug}/`;
  const heroImageUrl = `${siteConfig.url}${hero.file}${hero.fallback ? ".jpg" : ".webp"}`;
  const modified = article.dateModified ?? article.datePublished;

  const relatedServices = article.relatedServiceSlugs
    .map((slug) => getServiceBySlug(slug))
    .filter((s): s is NonNullable<typeof s> => Boolean(s));

  const relatedServicesIntro =
    article.relatedServicesIntro ??
    "These are the CDCS Inc. programmes that cover the work described above.";
  const cta = article.cta ?? {
    title: "Ready to Put This Into Practice?",
    description:
      "Tell us about your property, fleet, or facility and CDCS Inc. will put together a clear service plan and quote.",
  };

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      "@id": `${articleUrl}#article`,
      headline: article.title,
      description: article.metaDescription,
      image: [heroImageUrl],
      datePublished: article.datePublished,
      dateModified: modified,
      inLanguage: "en-GY",
      author: {
        "@type": "Organization",
        name: siteConfig.companyName,
        url: siteConfig.url,
      },
      publisher: {
        "@type": "Organization",
        "@id": `${siteConfig.url}/#business`,
        name: siteConfig.companyName,
        logo: {
          "@type": "ImageObject",
          url: `${siteConfig.url}/images/cdcs-logo.png`,
        },
      },
      mainEntityOfPage: articleUrl,
      isPartOf: {
        "@type": "Blog",
        "@id": `${siteConfig.url}/insights/#blog`,
        name: "Cleaning & Facility Insights",
      },
      about: article.relatedServiceSlugs
        .map((slug) => getServiceBySlug(slug)?.title)
        .filter(Boolean)
        .map((name) => ({ "@type": "Thing", name })),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: `${siteConfig.url}/` },
        { "@type": "ListItem", position: 2, name: "Insights", item: `${siteConfig.url}/insights/` },
        { "@type": "ListItem", position: 3, name: article.title, item: articleUrl },
      ],
    },
    ...(faq && faq.length > 0
      ? [
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faq.map((f) => ({
              "@type": "Question",
              name: f.q,
              acceptedAnswer: { "@type": "Answer", text: f.a },
            })),
          },
        ]
      : []),
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ================= HERO ================= */}
      <section className="relative overflow-hidden bg-navy-950 py-14 sm:py-20">
        <div className="pointer-events-none absolute inset-0 bg-grid-dark opacity-50" aria-hidden />
        <div className="pointer-events-none absolute inset-0 brand-glow opacity-80" aria-hidden />
        <div className="container-page relative">
          <nav className="mb-5 text-xs font-semibold text-slate-400" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-accent-400">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/insights/" className="hover:text-accent-400">Insights</Link>
            <span className="mx-2">/</span>
            <span className="text-slate-300">Article</span>
          </nav>
          <p className="mb-4 flex items-center gap-2.5 text-xs font-bold uppercase tracking-[0.22em] text-accent-400">
            <span className="h-px w-6 bg-accent-400/60" aria-hidden />
            {article.topic}
          </p>
          <h1 className="max-w-3xl text-pretty text-3xl font-extrabold leading-[1.15] tracking-tight text-white sm:text-4xl lg:text-[2.7rem]">
            {article.title}
          </h1>
          <div className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-slate-400">
            <span className="font-semibold text-slate-300">{siteConfig.brandName}</span>
            <span aria-hidden>·</span>
            <time dateTime={article.datePublished}>{formatArticleDate(article.datePublished)}</time>
            <span aria-hidden>·</span>
            <span>{article.readingTimeMinutes} min read</span>
          </div>
        </div>
      </section>

      {/* ================= HERO IMAGE ================= */}
      <section className="bg-white">
        <div className="container-page">
          <div className="relative -mt-10 overflow-hidden rounded-2xl border border-navy-900/10 bg-white shadow-xl shadow-navy-900/10 sm:-mt-14">
            <div className="aspect-[16/9] overflow-hidden">
              <ProjectImage image={hero} priority className="h-full w-full object-cover" />
            </div>
          </div>
          <p className="mx-auto mt-3 max-w-2xl text-xs leading-relaxed text-slate-500">{hero.caption}</p>
        </div>
      </section>

      {/* ================= BODY ================= */}
      <section className="bg-white py-12 sm:py-16">
        <div className="container-page">
          <article className="article-prose mx-auto max-w-2xl">{children}</article>
        </div>
      </section>

      {/* ================= FAQ (visible + FAQPage schema above) ================= */}
      {faq && faq.length > 0 && (
        <div className="border-t border-slate-200">
          <Faq items={faq} />
        </div>
      )}

      {/* ================= RELATED SERVICES ================= */}
      {relatedServices.length > 0 && (
        <section className="bg-slate-50 py-16 sm:py-24">
          <div className="container-page">
            <SectionHeading
              eyebrow="Put It Into Practice"
              title="CDCS Services Referenced in This Article"
              description={relatedServicesIntro}
            />
            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {relatedServices.map((s) => (
                <Link
                  key={s.slug}
                  href={`/services/${s.slug}/`}
                  className="group flex flex-col rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-colors hover:border-brand-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600"
                >
                  <h3 className="text-base font-bold leading-snug text-navy-900">{s.title}</h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600">
                    {s.shortDescription}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-brand-600 group-hover:text-brand-700">
                    View service
                    <IconArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <CTABanner title={cta.title} description={cta.description} />
    </>
  );
}
