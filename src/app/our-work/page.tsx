import type { Metadata } from "next";
import Link from "next/link";
import { CTABanner } from "@/components/CTABanner";
import { Button } from "@/components/ui/Button";
import { ProjectImage } from "@/components/ProjectImage";
import { IconArrowRight, IconCheck } from "@/components/icons";
import { projectCategories } from "@/lib/project-images";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: { absolute: "Our Work — CDCS Cleaning Projects in Guyana" },
  description:
    "Photos from real CDCS Inc. projects across Guyana — commercial and janitorial cleaning, pressure washing, fleet washing, mobile detailing, and upholstery extraction.",
  alternates: { canonical: "/our-work/" },
};

const breadcrumbLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: `${siteConfig.url}/` },
    { "@type": "ListItem", position: 2, name: "Our Work", item: `${siteConfig.url}/our-work/` },
  ],
};

export default function OurWorkPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />

      <section className="bg-navy-950 py-16 sm:py-20">
        <div className="container-page">
          <nav className="mb-5 text-xs font-semibold text-slate-400" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-accent-400">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-slate-300">Our Work</span>
          </nav>
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-accent-400">Our Work</p>
          <h1 className="max-w-2xl text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
            Real CDCS Projects Across Guyana
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-slate-300 sm:text-lg">
            Every photo below is from an actual CDCS Inc. job — commercial and janitorial cleaning,
            pressure washing, fleet washing, mobile detailing, and upholstery extraction for
            businesses and vehicle owners in Georgetown and across Guyana. New work is added as
            projects are completed.
          </p>
          <nav
            aria-label="Project categories"
            className="mt-8 flex flex-wrap gap-2.5 text-sm font-semibold"
          >
            {projectCategories.map((c) => (
              <a
                key={c.slug}
                href={`#${c.slug}`}
                className="rounded-full border border-white/15 px-4 py-2 text-slate-200 transition-colors hover:border-accent-500 hover:text-accent-400"
              >
                {c.title}
              </a>
            ))}
          </nav>
        </div>
      </section>

      {projectCategories.map((category, i) => (
        <section
          key={category.slug}
          id={category.slug}
          className={`scroll-mt-24 py-16 sm:py-20 ${i % 2 === 0 ? "bg-white" : "bg-slate-50"}`}
        >
          <div className="container-page">
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
              <div className="max-w-2xl">
                <h2 className="text-2xl font-bold tracking-tight text-navy-900 sm:text-3xl">
                  {category.title}
                </h2>
                <p className="mt-3 text-base leading-relaxed text-slate-600">{category.blurb}</p>
              </div>
              <Link
                href={`/services/${category.service}/`}
                className="inline-flex shrink-0 items-center gap-1.5 text-sm font-bold text-brand-600 hover:text-brand-700"
              >
                View the {category.title.toLowerCase()} service
                <IconArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="mt-10 gap-5 [column-fill:_balance] sm:columns-2 lg:columns-3">
              {category.images.map((image) => (
                <figure
                  key={image.file}
                  className="mb-5 break-inside-avoid overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm"
                >
                  <ProjectImage image={image} className="w-full" />
                  <figcaption className="px-4 py-3 text-sm leading-relaxed text-slate-600">
                    {image.beforeAfter && (
                      <span className="mr-2 inline-block rounded bg-brand-50 px-1.5 py-0.5 text-xs font-bold uppercase tracking-wide text-brand-700">
                        Before / After
                      </span>
                    )}
                    {image.caption}
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>
      ))}

      <section className="bg-white py-14">
        <div className="container-page">
          <div className="mx-auto flex max-w-3xl flex-col items-center gap-4 rounded-2xl border border-slate-200 bg-brand-50 p-8 text-center sm:flex-row sm:text-left">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white text-brand-600 shadow-sm">
              <IconCheck className="h-6 w-6" />
            </div>
            <p className="flex-1 text-sm leading-relaxed text-navy-800">
              Want results like these for your property, fleet, or vehicle? Tell us what needs to be
              cleaned and we&apos;ll put together a clear proposal.
            </p>
            <Button href="/quote/" size="md" className="shrink-0" icon={<IconArrowRight className="h-4 w-4" />}>
              Request a Quote
            </Button>
          </div>
        </div>
      </section>

      <CTABanner />
    </>
  );
}
