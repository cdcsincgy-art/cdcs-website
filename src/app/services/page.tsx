import type { Metadata } from "next";
import Link from "next/link";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { CTABanner } from "@/components/CTABanner";
import { ProjectImage } from "@/components/ProjectImage";
import { services, getServiceBySlug } from "@/lib/services-data";
import { serviceHeroImage } from "@/lib/project-images";
import { serviceIconMap, IconCheck, IconArrowRight } from "@/components/icons";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Cleaning & Facility Services in Guyana",
  description:
    "CDCS Inc.'s full range of commercial cleaning, janitorial, pressure washing, fleet washing, and facility-support services in Georgetown and across Guyana.",
  alternates: { canonical: "/services/" },
};

const breadcrumbLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: `${siteConfig.url}/` },
    { "@type": "ListItem", position: 2, name: "Services", item: `${siteConfig.url}/services/` },
  ],
};

// Commercial & Janitorial Cleaning is the core commercial offering — given a
// spotlight panel above the full grid.
const featured = getServiceBySlug("commercial-janitorial-cleaning")!;
const featuredImage = serviceHeroImage(featured.slug);

// Full grid: every service, with the featured one moved to the end so the
// spotlight and the grid don't open on the same card.
const gridServices = [
  ...services.filter((s) => s.slug !== featured.slug),
  featured,
];

// Common ways clients combine services — an internal-linking aid, not a claim.
const combinations = [
  {
    title: "Office program + periodic deep clean",
    body: "A recurring janitorial schedule for day-to-day upkeep, with a deep clean booked each quarter or ahead of an event.",
    links: [
      { label: "Commercial & Janitorial Cleaning", href: "/services/commercial-janitorial-cleaning/" },
      { label: "Deep Cleaning", href: "/services/deep-cleaning/" },
    ],
  },
  {
    title: "Building exterior + facility program",
    body: "Pressure washing for entrances, walkways, and facades alongside a structured interior cleaning program for the whole site.",
    links: [
      { label: "Pressure Washing", href: "/services/pressure-washing/" },
      { label: "Commercial Facility Cleaning", href: "/services/commercial-facility-cleaning/" },
    ],
  },
  {
    title: "Fleet washing + vehicle detailing",
    body: "Scheduled fleet washing to keep vehicles presentable, with full mobile detailing for management or pool vehicles.",
    links: [
      { label: "Fleet Washing", href: "/services/fleet-washing/" },
      { label: "Mobile Detailing", href: "/services/mobile-detailing/" },
    ],
  },
];

export default function ServicesPage() {
  const FeaturedIcon = serviceIconMap[featured.icon];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />

      {/* ================= HERO ================= */}
      <section className="relative overflow-hidden bg-navy-950 py-16 sm:py-20">
        <div className="pointer-events-none absolute inset-0 bg-grid-dark opacity-50" aria-hidden />
        <div className="pointer-events-none absolute inset-0 brand-glow opacity-80" aria-hidden />
        <div className="container-page relative">
          <nav className="mb-5 text-xs font-semibold text-slate-400" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-accent-400">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-slate-300">Services</span>
          </nav>
          <p className="mb-4 flex items-center gap-2.5 text-xs font-bold uppercase tracking-[0.22em] text-accent-400">
            <span className="h-px w-6 bg-accent-400/60" aria-hidden />
            Our Services
          </p>
          <h1 className="max-w-2xl text-pretty text-4xl font-extrabold leading-[1.1] tracking-tight text-white sm:text-5xl">
            Commercial Cleaning &amp; Facility Services, Built for Guyana&apos;s Businesses
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-slate-300 sm:text-lg">
            Every service below can be delivered as a one-time project or a recurring contract,
            scaled to your property, fleet, or facility in Georgetown or anywhere in Guyana.
          </p>
        </div>
      </section>

      {/* ================= FEATURED: COMMERCIAL & JANITORIAL ================= */}
      <section className="bg-white py-20 sm:py-28">
        <div className="container-page">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            {featuredImage && (
              <div className="relative order-1 rounded-2xl border border-navy-900/10 bg-white p-2 shadow-xl shadow-navy-900/15 lg:order-2">
                <span
                  aria-hidden
                  className="absolute -right-3 -top-3 hidden h-16 w-16 rounded-tr-2xl border-r-2 border-t-2 border-accent-500/70 sm:block"
                />
                <div className="aspect-[4/3] overflow-hidden rounded-xl">
                  <ProjectImage image={featuredImage} priority className="h-full w-full object-cover" />
                </div>
              </div>
            )}
            <div className="order-2 lg:order-1">
              <span className="mb-5 flex h-12 w-12 items-center justify-center rounded-lg bg-navy-900 text-white">
                {FeaturedIcon && <FeaturedIcon className="h-6 w-6" />}
              </span>
              <p className="mb-4 flex items-center gap-2.5 text-xs font-bold uppercase tracking-[0.22em] text-brand-600">
                <span className="h-px w-6 bg-brand-600/50" aria-hidden />
                Core Commercial Service
              </p>
              <h2 className="text-pretty text-[1.9rem] font-bold leading-[1.15] tracking-tight text-navy-900 sm:text-4xl">
                {featured.title}
              </h2>
              <p className="mt-4 max-w-xl text-base leading-relaxed text-slate-600">
                {featured.shortDescription} We build the program around your operating hours, foot
                traffic, and facility layout, and keep it consistent with supervised teams and
                regular quality checks.
              </p>
              <ul className="mt-6 grid gap-2.5 sm:grid-cols-2">
                {featured.whatsIncluded.slice(0, 4).map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm leading-relaxed text-slate-700">
                    <IconCheck className="mt-0.5 h-5 w-5 shrink-0 text-brand-600" />
                    {item}
                  </li>
                ))}
              </ul>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button
                  href={`/services/${featured.slug}/`}
                  variant="primary"
                  size="lg"
                  icon={<IconArrowRight className="h-5 w-5" />}
                >
                  View the Service
                </Button>
                <Button href="/quote/" variant="ghost" size="lg">
                  Request a Quote
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= FULL RANGE (editorial photo grid, dark) ================= */}
      <section className="relative overflow-hidden bg-navy-950 py-20 sm:py-28">
        <div className="pointer-events-none absolute inset-0 bg-grid-dark opacity-50" aria-hidden />
        <div className="container-page relative">
          <SectionHeading
            eyebrow="What We Offer"
            title="Every CDCS Service"
            description="Commercial cleaning is where most clients start. These are the other programs we run across Guyana — book any of them on its own or alongside a cleaning contract."
            light
          />
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {gridServices.map((service) => {
              const img = serviceHeroImage(service.slug);
              return (
                <Link
                  key={service.slug}
                  href={`/services/${service.slug}/`}
                  className="group flex flex-col overflow-hidden rounded-xl border border-white/10 bg-navy-900 transition-colors duration-300 hover:border-white/25 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-500"
                >
                  {img && (
                    <div className="relative aspect-[16/10] overflow-hidden">
                      <ProjectImage
                        image={img}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                      />
                      <div
                        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy-950/70 via-transparent to-navy-950/50"
                        aria-hidden
                      />
                      <span className="absolute left-3 top-3 rounded bg-accent-500 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-navy-950">
                        {service.category}
                      </span>
                    </div>
                  )}
                  <div className="flex flex-1 flex-col p-5">
                    <h3 className="text-lg font-bold leading-snug text-white">{service.title}</h3>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-300">
                      {service.shortDescription}
                    </p>
                    <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-accent-400 transition-colors group-hover:text-accent-300">
                      Explore
                      <IconArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ================= COMMON COMBINATIONS (internal linking aid) ================= */}
      <section className="bg-slate-50 py-16 sm:py-24">
        <div className="container-page">
          <SectionHeading
            eyebrow="Getting Started"
            title="Not Sure Which Service You Need?"
            description="Most clients combine two or three of our services. A few common pairings — tell us your situation and we'll confirm the right scope."
          />
          <div className="mt-12 grid gap-5 lg:grid-cols-3">
            {combinations.map((combo) => (
              <div
                key={combo.title}
                className="flex flex-col rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
              >
                <h3 className="text-base font-bold text-navy-900">{combo.title}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600">{combo.body}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {combo.links.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="inline-flex items-center gap-1 rounded-full border border-slate-300 px-3 py-1 text-xs font-semibold text-navy-800 transition-colors hover:border-brand-400 hover:text-brand-700"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-10">
            <Button href="/quote/" variant="ghost" size="md" icon={<IconArrowRight className="h-4 w-4" />}>
              Request a Quote
            </Button>
          </div>
        </div>
      </section>

      <CTABanner />
    </>
  );
}
