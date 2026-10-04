import type { Metadata } from "next";
import Link from "next/link";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { CTABanner } from "@/components/CTABanner";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ProjectCard } from "@/components/ProjectCard";
import { IconArrowRight } from "@/components/icons";
import { publishedProjects } from "@/lib/projects-data";
import { getServiceBySlug } from "@/lib/services-data";
import { siteConfig, ogImage } from "@/lib/site-config";
import { pageLd } from "@/lib/seo";

const PROJECTS_TITLE = "Cleaning Projects & Case Studies in Guyana | CDCS";
const PROJECTS_DESCRIPTION =
  "Documented CDCS Inc. projects in Guyana — fleet and heavy equipment washing, commercial pressure washing, commercial building cleaning, and vehicle interior extraction, with photos and method.";

export const metadata: Metadata = {
  title: { absolute: PROJECTS_TITLE },
  description: PROJECTS_DESCRIPTION,
  alternates: { canonical: "/projects/" },
  openGraph: {
    type: "website",
    url: `${siteConfig.url}/projects/`,
    siteName: siteConfig.brandName,
    title: PROJECTS_TITLE,
    description: PROJECTS_DESCRIPTION,
    images: [ogImage],
  },
  twitter: {
    card: "summary_large_image",
    title: PROJECTS_TITLE,
    description: PROJECTS_DESCRIPTION,
    images: [ogImage],
  },
};

const trail = [
  { name: "Home", path: "/" },
  { name: "Projects", path: "/projects/" },
];

const pageJsonLd = pageLd({
  path: "/projects/",
  name: PROJECTS_TITLE,
  description: PROJECTS_DESCRIPTION,
  trail,
  type: "CollectionPage",
  extra: {
    mainEntity: {
      "@type": "ItemList",
      itemListElement: publishedProjects.map((p, i) => ({
        "@type": "ListItem",
        position: i + 1,
        url: `${siteConfig.url}/projects/${p.slug}/`,
        name: p.title,
      })),
    },
  },
});

// Services covered by at least one published project, for the "by service" links.
const coveredServices = Array.from(
  new Set(publishedProjects.flatMap((p) => p.serviceSlugs.slice(0, 1))),
)
  .map((slug) => getServiceBySlug(slug))
  .filter((s): s is NonNullable<typeof s> => Boolean(s));

export default function ProjectsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pageJsonLd) }}
      />

      <section className="relative overflow-hidden bg-navy-950 py-16 sm:py-20">
        <div className="pointer-events-none absolute inset-0 bg-grid-dark opacity-50" aria-hidden />
        <div className="pointer-events-none absolute inset-0 brand-glow opacity-80" aria-hidden />
        <div className="container-page relative">
          <Breadcrumbs trail={trail} />
          <p className="mb-4 flex items-center gap-2.5 text-xs font-bold uppercase tracking-[0.22em] text-accent-400">
            <span className="h-px w-6 bg-accent-400/60" aria-hidden />
            Projects &amp; Case Studies
          </p>
          <h1 className="max-w-3xl text-pretty text-4xl font-extrabold leading-[1.1] tracking-tight text-white sm:text-5xl">
            CDCS Cleaning Projects in Guyana
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-slate-300 sm:text-lg">
            A closer look at real CDCS Inc. work — what was cleaned, the conditions on site, and the
            method and equipment used. Client names and commercial details are kept confidential;
            each project is described from the job photographs and confirmed details only.
          </p>
        </div>
      </section>

      <section className="bg-white py-16 sm:py-24">
        <div className="container-page">
          <div className="grid gap-6 sm:grid-cols-2">
            {publishedProjects.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-16 sm:py-20">
        <div className="container-page grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <SectionHeading
              eyebrow="By Service"
              title="Explore the Services Behind This Work"
              description="Each project links to the service page that explains scope, method, and how to request an assessment."
            />
            <ul className="mt-6 flex flex-wrap gap-2">
              {coveredServices.map((s) => (
                <li key={s.slug}>
                  <Link
                    href={`/services/${s.slug}/`}
                    className="inline-flex items-center rounded-full border border-slate-300 bg-white px-3.5 py-1.5 text-sm font-semibold text-navy-800 transition-colors hover:border-brand-400 hover:text-brand-700"
                  >
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <SectionHeading
              eyebrow="Photo Gallery"
              title="More CDCS Work"
              description="The full photo gallery covers every service line, including detailing before-and-afters and janitorial work."
            />
            <div className="mt-6">
              <Button href="/our-work/" variant="ghost" size="md" icon={<IconArrowRight className="h-4 w-4" />}>
                View Our Work Gallery
              </Button>
            </div>
          </div>
        </div>
      </section>

      <CTABanner
        title="Have a Facility, Fleet, or Site That Needs Attention?"
        description="Tell us what needs to be cleaned and where. CDCS Inc. will assess the site and send a clear proposal."
        primaryLabel="Request a Site Assessment"
      />
    </>
  );
}
