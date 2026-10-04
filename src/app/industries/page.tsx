import type { Metadata } from "next";
import Link from "next/link";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CTABanner } from "@/components/CTABanner";
import { ProjectImage } from "@/components/ProjectImage";
import { ProjectCard } from "@/components/ProjectCard";
import { iconMap, IconArrowRight, IconCheck } from "@/components/icons";
import { serviceHeroImage, projectImagesForService } from "@/lib/project-images";
import { industries, type Industry } from "@/lib/content-data";
import { getServiceBySlug } from "@/lib/services-data";
import { publishedProjects } from "@/lib/projects-data";
import { siteConfig, ogImage } from "@/lib/site-config";
import { pageLd } from "@/lib/seo";

const INDUSTRIES_TITLE = "Industries We Serve in Guyana";
const INDUSTRIES_DESCRIPTION =
  "CDCS Inc. serves corporate offices, government agencies, hotels, logistics and oil and gas support companies, construction firms, commercial properties, and industrial facilities across Guyana.";

export const metadata: Metadata = {
  title: INDUSTRIES_TITLE,
  description: INDUSTRIES_DESCRIPTION,
  alternates: { canonical: "/industries/" },
  openGraph: {
    type: "website",
    url: `${siteConfig.url}/industries/`,
    siteName: siteConfig.brandName,
    title: `${INDUSTRIES_TITLE} | ${siteConfig.brandName}`,
    description: INDUSTRIES_DESCRIPTION,
    images: [ogImage],
  },
};

const pageJsonLd = pageLd({
  path: "/industries/",
  name: `Industries We Serve in Guyana | ${siteConfig.brandName}`,
  description: INDUSTRIES_DESCRIPTION,
  trail: [
    { name: "Home", path: "/" },
    { name: "Industries We Serve", path: "/industries/" },
  ],
});

const officeSectors = industries.filter((i) => i.group === "institutions");
const operationalSectors = industries.filter((i) => i.group === "operations");

const operatingPoints = [
  "A defined scope of work agreed before the first visit",
  "Trained teams briefed on each site's access, hours, and priorities",
  "On-site supervision and regular quality checks",
  "Schedules built around your operating hours, including off-hours service",
];

const environments = [
  {
    image: serviceHeroImage("commercial-facility-cleaning"),
    label: "Commercial & office interiors",
  },
  {
    image: projectImagesForService("fleet-washing").find((i) =>
      i.file.endsWith("fleet-washing-equipment-yard"),
    ),
    label: "Industrial yards & equipment",
  },
  {
    image: projectImagesForService("pressure-washing").find((i) =>
      i.file.endsWith("pressure-washing-building-exterior"),
    ),
    label: "Building exteriors & compounds",
  },
].flatMap((e) => (e.image ? [{ image: e.image, label: e.label }] : []));

function IndustryPanel({ industry }: { industry: Industry }) {
  const Icon = iconMap[industry.icon];
  const services = industry.services
    .map((slug) => getServiceBySlug(slug))
    .filter((s): s is NonNullable<typeof s> => Boolean(s));
  return (
    <div
      id={industry.id}
      className="flex scroll-mt-28 gap-4 rounded-xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6"
    >
      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg text-navy-800 ring-1 ring-inset ring-navy-900/12">
        {Icon && <Icon className="h-6 w-6" />}
      </span>
      <div>
        <h3 className="font-bold text-navy-900">{industry.name}</h3>
        <p className="mt-1.5 text-sm leading-relaxed text-slate-600">{industry.description}</p>
        <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-1.5">
          {services.map((s) => (
            <li key={s.slug}>
              <Link
                href={`/services/${s.slug}/`}
                className="group inline-flex items-center gap-1 text-sm font-bold text-brand-600 hover:text-brand-700"
              >
                {s.title}
                <IconArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default function IndustriesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pageJsonLd) }}
      />

      {/* ================= HERO ================= */}
      <section className="relative overflow-hidden bg-navy-950 py-16 sm:py-20">
        <div className="pointer-events-none absolute inset-0 bg-grid-dark opacity-50" aria-hidden />
        <div className="pointer-events-none absolute inset-0 brand-glow opacity-80" aria-hidden />
        <div className="container-page relative">
          <nav className="mb-5 text-xs font-semibold text-slate-400" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-accent-400">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-slate-300">Industries We Serve</span>
          </nav>
          <p className="mb-4 flex items-center gap-2.5 text-xs font-bold uppercase tracking-[0.22em] text-accent-400">
            <span className="h-px w-6 bg-accent-400/60" aria-hidden />
            Who We Serve
          </p>
          <h1 className="max-w-2xl text-pretty text-4xl font-extrabold leading-[1.1] tracking-tight text-white sm:text-5xl">
            Industries We Serve in Guyana
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-slate-300 sm:text-lg">
            CDCS Inc. is structured to support the operational demands of commercial,
            institutional, and industrial clients in Georgetown and across Guyana.
          </p>
        </div>
      </section>

      {/* ================= WHY IT MATTERS ================= */}
      <section className="bg-white py-16 sm:py-24">
        <div className="container-page">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,32rem)_1fr] lg:items-start lg:gap-16">
            <SectionHeading
              eyebrow="Every Environment Is Different"
              title="A Cleaning Program Shaped Around How You Operate"
            />
            <div>
              <p className="text-base leading-relaxed text-slate-600">
                An office, a government building, a warehouse, and a transport depot each place
                different demands on a cleaning provider — access windows, foot traffic, security
                requirements, and the standard the space is held to. CDCS Inc. builds each program
                around those specifics rather than applying one routine everywhere.
              </p>
              <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                {operatingPoints.map((point) => (
                  <li key={point} className="flex items-start gap-2.5 text-sm leading-relaxed text-slate-700">
                    <IconCheck className="mt-0.5 h-5 w-5 shrink-0 text-brand-600" />
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ================= SECTOR PANELS ================= */}
      <section className="bg-slate-50 py-16 sm:py-24">
        <div className="container-page">
          <div>
            <p className="flex items-center gap-2.5 text-xs font-bold uppercase tracking-[0.22em] text-brand-600">
              <span className="h-px w-6 bg-brand-600/50" aria-hidden />
              Offices &amp; Institutions
            </p>
            <div className="mt-6 grid gap-5 sm:grid-cols-2">
              {officeSectors.map((industry) => (
                <IndustryPanel key={industry.name} industry={industry} />
              ))}
            </div>
          </div>

          <div className="mt-14">
            <p className="flex items-center gap-2.5 text-xs font-bold uppercase tracking-[0.22em] text-brand-600">
              <span className="h-px w-6 bg-brand-600/50" aria-hidden />
              Property, Logistics, Industry &amp; Residential
            </p>
            <div className="mt-6 grid gap-5 sm:grid-cols-2">
              {operationalSectors.map((industry) => (
                <IndustryPanel key={industry.name} industry={industry} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ================= ENVIRONMENTS (authentic photography) ================= */}
      {environments.length > 0 && (
        <section className="bg-white py-16 sm:py-24">
          <div className="container-page">
            <SectionHeading
              eyebrow="On Site"
              title="CDCS Across Different Environments"
              description="Recent work — from finished commercial interiors to industrial yards and building exteriors."
            />
            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              {environments.map(({ image, label }) => (
                <figure
                  key={image.file}
                  className="group relative overflow-hidden rounded-xl border border-slate-200 bg-navy-950"
                >
                  <div className="aspect-[4/3] overflow-hidden">
                    <ProjectImage
                      image={image}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                    />
                  </div>
                  <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-navy-950 via-navy-950/60 to-transparent p-4 pt-12">
                    <span className="text-sm font-semibold text-white">{label}</span>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ================= CASE STUDIES ================= */}
      {publishedProjects.length > 0 && (
        <section className="bg-slate-50 py-16 sm:py-24">
          <div className="container-page">
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
              <SectionHeading
                eyebrow="Case Studies"
                title="Recent Projects Across Sectors"
                description="Selected CDCS Inc. work for commercial, logistics, and industrial clients."
              />
              <Link
                href="/projects/"
                className="inline-flex shrink-0 items-center gap-1.5 text-sm font-bold text-brand-600 hover:text-brand-700"
              >
                All projects
                <IconArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="mt-10 grid gap-6 sm:grid-cols-2">
              {publishedProjects.slice(0, 2).map((p) => (
                <ProjectCard key={p.slug} project={p} />
              ))}
            </div>
          </div>
        </section>
      )}

      <CTABanner
        primaryLabel="Discuss Your Facility Requirements"
        title="Don't See Your Industry Listed?"
        description="CDCS Inc. works with a wide range of organizations. Reach out and tell us about your facility or fleet — we'll help determine the right service."
      />
    </>
  );
}
