import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ServiceCard } from "@/components/ServiceCard";
import { CTABanner } from "@/components/CTABanner";
import { DeliveryModel } from "@/components/DeliveryModel";
import { ProjectImage } from "@/components/ProjectImage";
import { ProjectCard } from "@/components/ProjectCard";
import { CredentialsShowcase } from "@/components/CredentialsShowcase";
import { Faq } from "@/components/Faq";
import { services } from "@/lib/services-data";
import { publishedProjects, pendingHomepageProjectSlugs } from "@/lib/projects-data";
import { trustPoints, industries, processSteps } from "@/lib/content-data";
import {
  homepageHeroImage,
  homepageProjectImages,
  operatingStandardsImage,
  categoryLabel,
} from "@/lib/project-images";
import { localContentCertificate as cert, formatCredentialDate, gcciMembership } from "@/lib/credentials";
import {
  iconMap,
  serviceIconMap,
  IconArrowRight,
  IconChevronDown,
  IconWhatsapp,
  IconCheck,
  IconPhone,
  IconFlame,
} from "@/components/icons";
import { siteConfig } from "@/lib/site-config";
import { socialMetadata } from "@/lib/seo";

// Homepage content rules: every statement must be supportable — no rankings
// ("best", "#1"), statistics, client names, contracts, or certifications
// beyond the Local Content registration. HSE/quality statements summarise
// CDCS's own adopted policies; internal document numbers are NOT published.

// Title kept stable (it is the indexed homepage title); description refreshed.
const HOME_TITLE = "Commercial Cleaning Company in Guyana | CDCS Inc.";
const HOME_DESCRIPTION =
  "Local Content-registered cleaning company in Georgetown, Guyana — commercial, janitorial and office cleaning, carpet, pressure washing, and fleet washing.";

export const metadata: Metadata = {
  title: { absolute: HOME_TITLE },
  description: HOME_DESCRIPTION,
  alternates: { canonical: "/" },
  ...socialMetadata({ title: HOME_TITLE, description: HOME_DESCRIPTION, path: "/" }),
};

// Commercial case studies featured on the homepage, in this order. Any that
// aren't published in this build (e.g. pending client approval) drop out, so
// the first three published ones show — never an empty card.
const HOMEPAGE_PROJECT_SLUGS = [
  // Pending projects (local preview builds only) lead when present.
  ...pendingHomepageProjectSlugs,
  "fleet-heavy-equipment-washing-guyana",
  "commercial-building-cleaning-guyana",
  "commercial-pressure-washing-guyana",
];
const homepageProjects = HOMEPAGE_PROJECT_SLUGS.map((slug) =>
  publishedProjects.find((p) => p.slug === slug),
)
  .filter((p): p is NonNullable<typeof p> => Boolean(p))
  .slice(0, 3);

// Core commercial and industrial services, featured with photos in this
// order; every other service (including any added later) follows as a
// compact list.
const CORE_SERVICE_SLUGS = [
  "commercial-janitorial-cleaning",
  "pressure-washing",
  "fleet-washing",
  "carpet-cleaning",
  "commercial-facility-cleaning",
];
const OTHER_SERVICE_ORDER = [
  "post-construction-cleaning",
  "deep-cleaning",
  "upholstery-fabric-extraction",
  "mobile-detailing",
  "car-wash-mobile-vehicle-washing",
];
const coreServices = CORE_SERVICE_SLUGS.map((slug) => services.find((s) => s.slug === slug)).filter(
  (s): s is NonNullable<typeof s> => Boolean(s),
);
const otherServices = [
  ...OTHER_SERVICE_ORDER.map((slug) => services.find((s) => s.slug === slug)),
  ...services.filter((s) => !CORE_SERVICE_SLUGS.includes(s.slug) && !OTHER_SERVICE_ORDER.includes(s.slug)),
].filter((s): s is NonNullable<typeof s> => Boolean(s));

const companyFacts = [
  { label: "Registered company", value: siteConfig.companyName },
  { label: "Trading as", value: siteConfig.brandName },
  { label: "Operating since", value: siteConfig.foundingDate.slice(0, 4) },
  { label: "Based in", value: siteConfig.location.display },
  { label: "Service area", value: `Georgetown, ${siteConfig.location.region} & across Guyana` },
  { label: "Local Content Certificate", value: cert.number, mono: true },
];

/** Verified credentials and operating standards — see the content rules above. */
const credibility = [
  {
    icon: "building",
    title: "Registered Guyanese company",
    text: `${siteConfig.companyName}, based in Georgetown, operating since 2022, and a ${gcciMembership.shortName} member since ${gcciMembership.memberSince}.`,
    href: "/about/",
    linkLabel: "About CDCS",
  },
  {
    icon: "shield",
    title: "Local Content registered",
    text: `Certificate ${cert.number}, valid to ${formatCredentialDate(cert.validTo)}, verifiable on the government register.`,
    href: "/credentials/",
    linkLabel: "View credentials",
  },
  {
    icon: "clipboard",
    title: "Documented commercial work",
    text: "Case studies of fleet and heavy-equipment washing, commercial building cleaning, and pressure washing in Guyana.",
    href: "/projects/",
    linkLabel: "View case studies",
  },
  {
    icon: "tools",
    title: "Professional equipment",
    text: "Commercial pressure washers, rotary surface cleaners, foam application for fleet washing, and carpet and upholstery cleaning equipment.",
  },
  {
    icon: "target",
    title: "Supervision & quality checks",
    text: "A defined scope agreed in advance, supervised teams, and completed work inspected against it under CDCS's documented quality policy.",
  },
  {
    icon: "users",
    title: "Workplace safety",
    text: "Under CDCS's documented HSE policy: hazards identified before work, induction and PPE for every task, and client site rules built in.",
  },
];

// Visible on the page AND emitted as FAQPage structured data — keep them identical.
const homeFaqs = [
  {
    q: "What is CDCS Inc.?",
    a: `CDCS Inc. is the trading name of ${siteConfig.companyName}, a Guyanese cleaning company based in Georgetown and operating since 2022. It provides commercial and janitorial cleaning, carpet and upholstery cleaning, pressure washing, fleet washing, and vehicle detailing for businesses, organizations, and individuals, and is a member of the ${gcciMembership.organization} (${gcciMembership.shortName}).`,
  },
  {
    q: "Where does CDCS operate?",
    a: `CDCS is based in Georgetown and serves clients in Georgetown, the ${siteConfig.location.region} region, and across Guyana.`,
  },
  {
    q: "Does CDCS provide commercial cleaning and janitorial services?",
    a: "Yes. CDCS provides recurring janitorial and office cleaning programmes for offices, commercial facilities, and institutions, as well as one-time commercial, deep, and post-construction cleaning.",
  },
  {
    q: "Does CDCS clean commercial carpets and upholstery?",
    a: "Yes. CDCS provides commercial carpet cleaning for offices, hotels, and public buildings, and upholstery and office chair cleaning by hot-water extraction, often called steam cleaning.",
  },
  {
    q: "Does CDCS provide pressure washing and fleet washing?",
    a: "Yes. CDCS pressure washes building exteriors, walls, walkways, and concrete areas, and washes trucks, prime movers, trailers, and heavy equipment on site at the client's yard or work site.",
  },
  {
    q: "Does CDCS serve industrial facilities?",
    a: "Yes. CDCS provides facility cleaning, yard pressure washing, and fleet and heavy-equipment washing for industrial and commercial operations, and offers these services to companies supporting Guyana's oil and gas sector.",
  },
  {
    q: "Is CDCS registered under Guyana's Local Content framework?",
    a: `Yes. ${siteConfig.companyName} holds Local Content Certificate of Registration ${cert.number}, valid from ${formatCredentialDate(cert.validFrom)} to ${formatCredentialDate(cert.validTo)}. Registration is not prequalification or the award of any contract.`,
  },
  {
    q: "What project experience can CDCS show?",
    a: "CDCS publishes case studies with photographs of its work in Guyana, including fleet and heavy-equipment washing, commercial building cleaning, commercial pressure washing, and vehicle interior extraction and detailing.",
  },
];

const homeJsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${siteConfig.url}/#webpage`,
    url: `${siteConfig.url}/`,
    name: HOME_TITLE,
    description: HOME_DESCRIPTION,
    isPartOf: { "@id": `${siteConfig.url}/#website` },
    about: { "@id": `${siteConfig.url}/#business` },
    primaryImageOfPage: {
      "@type": "ImageObject",
      url: `${siteConfig.url}${homepageHeroImage.file}.jpg`,
    },
    inLanguage: "en",
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: homeFaqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  },
];

export default function HomePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(homeJsonLd) }} />

      {/* ================= HERO ================= */}
      <section className="relative overflow-hidden bg-navy-950">
        <div className="pointer-events-none absolute inset-0 bg-grid-dark opacity-[0.6]" aria-hidden />
        <div className="pointer-events-none absolute inset-0 brand-glow opacity-90" aria-hidden />
        <div className="container-page relative grid gap-12 py-16 sm:py-20 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:py-28">
          <div>
            <p className="hero-fade-rise mb-5 inline-flex items-center rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-accent-400">
              Commercial Cleaning &amp; Facility Services · Georgetown, Guyana
            </p>
            <h1 className="hero-text-rise text-pretty text-[2.15rem] font-semibold leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-[3.2rem]">
              Professional Commercial Cleaning Services in Guyana
            </h1>
            <p className="hero-fade-rise mt-4 font-heading text-lg font-medium text-accent-400 [--hero-delay:80ms] sm:text-xl">
              Professional Cleaning. Powerful Results.
            </p>
            <p className="hero-text-rise mt-5 max-w-xl text-base leading-relaxed text-slate-300 [--hero-delay:120ms] sm:text-lg">
              Janitorial and facility cleaning, industrial pressure washing, fleet washing, and
              commercial carpet cleaning for businesses, institutions, and industrial sites across
              Guyana — delivered by supervised CDCS teams with professional equipment.
            </p>
            <div className="hero-fade-rise mt-9 flex flex-col gap-3 [--hero-delay:180ms] sm:flex-row">
              <Button href="/quote/" variant="accent" size="lg" icon={<IconArrowRight className="h-5 w-5" />}>
                Request a Quote
              </Button>
              <Button href="/services/" variant="outline" size="lg">
                Explore Our Services
              </Button>
            </div>
            <div className="hero-fade-rise mt-6 hidden flex-wrap gap-x-6 gap-y-3 text-sm font-semibold text-slate-300 [--hero-delay:240ms] lg:flex">
              <a
                href={siteConfig.contact.whatsappHrefWithMessage("Hello CDCS, I'd like to request a quote.")}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center gap-2 hover:text-accent-400"
              >
                <IconWhatsapp className="h-5 w-5 text-[#25D366]" />
                WhatsApp {siteConfig.contact.phoneDisplay}
              </a>
              <a href={siteConfig.contact.phoneHref} className="inline-flex min-h-11 items-center gap-2 hover:text-accent-400">
                <IconPhone className="h-5 w-5 text-accent-400" />
                Call {siteConfig.contact.phoneDisplay}
              </a>
            </div>
          </div>

          <div className="hero-media">
            <div className="relative rounded-2xl border border-white/10 bg-white/[0.04] p-2 shadow-2xl shadow-black/40">
              <span
                aria-hidden
                className="absolute -left-3 -top-3 hidden h-16 w-16 rounded-tl-2xl border-l-2 border-t-2 border-accent-500/70 sm:block"
              />
              <div className="overflow-hidden rounded-xl">
                <ProjectImage
                  image={homepageHeroImage}
                  priority
                  sizes="(min-width: 1280px) 560px, (min-width: 1024px) 45vw, calc(100vw - 48px)"
                  className="w-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
        <a
          href="#what-we-do"
          className="hero-fade-rise absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-1 rounded-md px-3 py-1 text-[11px] font-bold uppercase tracking-[0.2em] text-slate-400 [--hero-delay:600ms] hover:text-accent-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent-400 lg:flex"
        >
          See what we do
          <IconChevronDown aria-hidden className="scroll-cue-icon h-4 w-4" />
        </a>
      </section>

      {/* ============ CAPABILITY RIBBON (dark continuation of the masthead) ============ */}
      <section className="border-y border-white/10 bg-navy-900">
        <div className="container-page py-6 sm:py-7">
          <ul data-reveal="stagger" className="grid grid-cols-2 gap-x-6 gap-y-4 sm:grid-cols-3 lg:grid-cols-6 lg:divide-x lg:divide-white/10">
            {trustPoints.map((point) => {
              const Icon = iconMap[point.icon];
              return (
                <li
                  key={point.label}
                  className="flex items-center gap-2.5 lg:justify-center lg:px-3 lg:text-center"
                >
                  <span className="text-accent-400">{Icon && <Icon className="h-5 w-5 shrink-0" />}</span>
                  <span className="text-xs font-semibold leading-tight text-slate-200">{point.label}</span>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* ================= CREDENTIALS (GCCI · Local Content · since 2022) ================= */}
      <section aria-labelledby="home-credentials" className="border-b border-slate-200 bg-slate-50 py-12 sm:py-16">
        <div className="container-page">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="flex items-center gap-2.5 text-xs font-bold uppercase tracking-[0.22em] text-brand-600">
                <span className="h-px w-6 bg-brand-600/50" aria-hidden />
                Corporate Credentials
              </p>
              <h2 id="home-credentials" className="mt-3 text-2xl font-semibold tracking-tight text-navy-900 sm:text-[1.75rem]">
                Credentials Procurement Teams Can Verify
              </h2>
            </div>
            <Link
              href="/credentials/"
              className="inline-flex min-h-11 shrink-0 items-center gap-1.5 text-sm font-bold text-brand-600 hover:text-brand-700"
            >
              View company credentials
              <IconArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <CredentialsShowcase className="mt-8" headingLevel="h3" />
        </div>
      </section>

      {/* ================= WHAT WE DO / SERVICES ================= */}
      <section id="what-we-do" className="bg-white py-20 sm:py-28">
        <div className="container-page">
          <div className="grid gap-6 lg:grid-cols-[minmax(0,34rem)_1fr] lg:items-end lg:gap-16">
            <SectionHeading
              eyebrow="What We Do"
              title="Commercial Cleaning Services in Guyana"
            />
            <p className="max-w-2xl text-base leading-relaxed text-slate-600 lg:pb-1">
              Core programmes for offices, facilities, fleets, and industrial sites — as one-time
              projects or recurring contracts, each with a scope agreed in advance and a supervised
              team on site.
            </p>
          </div>

          {/* Core services: the commercial and industrial lines, given the most room. */}
          <div data-reveal="stagger" className="mt-10 grid gap-3 sm:mt-14 sm:grid-cols-2 sm:gap-6 lg:grid-cols-6">
            {coreServices.map((service, i) => (
              <div
                key={service.slug}
                className={`${i < 2 ? "lg:col-span-3" : "lg:col-span-2"} ${
                  i === coreServices.length - 1 && coreServices.length % 2 === 1 ? "sm:col-span-2 lg:col-span-2" : ""
                }`}
              >
                <ServiceCard service={service} feature wide={i < 2} />
              </div>
            ))}
          </div>

          {/* Everything else, as a compact list of links. */}
          <div className="mt-12 rounded-2xl border border-slate-200 bg-slate-50 p-5 sm:p-7">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between">
              <h3 className="text-lg font-semibold text-navy-900">Also from CDCS</h3>
              <Link
                href="/services/"
                className="inline-flex min-h-11 items-center gap-1.5 text-sm font-bold text-brand-600 hover:text-brand-700"
              >
                View all services
                <IconArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <ul className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
              {otherServices.map((service) => {
                const Icon = serviceIconMap[service.icon];
                return (
                  <li key={service.slug}>
                    <Link
                      href={`/services/${service.slug}/`}
                      className="group flex min-h-14 items-center gap-3 rounded-lg border border-transparent bg-white px-4 py-3 shadow-sm transition-[border-color,box-shadow,transform] duration-200 hover:-translate-y-0.5 hover:border-slate-200 hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600"
                    >
                      <span aria-hidden className="text-brand-600">{Icon && <Icon className="h-5 w-5" />}</span>
                      <span className="flex-1 text-sm font-semibold text-navy-900">{service.title}</span>
                      <IconArrowRight aria-hidden className="h-4 w-4 text-slate-400 transition-[transform,color] group-hover:translate-x-0.5 group-hover:text-brand-600" />
                    </Link>
                  </li>
                );
              })}
              <li>
                <Link
                  href="/washcare/"
                  className="group flex min-h-14 items-center gap-3 rounded-lg border border-transparent bg-white px-4 py-3 shadow-sm transition-[border-color,box-shadow,transform] duration-200 hover:-translate-y-0.5 hover:border-slate-200 hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600"
                >
                  <span aria-hidden className="text-brand-600"><IconCheck className="h-5 w-5" /></span>
                  <span className="flex-1 text-sm">
                    <span className="block font-semibold text-navy-900">WashCare recurring plans</span>
                    <span className="block text-xs text-slate-500">Monthly vehicle and fleet washing on a set schedule</span>
                  </span>
                  <IconArrowRight aria-hidden className="h-4 w-4 text-slate-400 transition-[transform,color] group-hover:translate-x-0.5 group-hover:text-brand-600" />
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* ================= COMPANY PROFILE & CREDIBILITY ================= */}
      <section className="bg-slate-50 py-20 sm:py-28">
        <div className="container-page">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
            <div>
              <SectionHeading eyebrow="About CDCS" title="A Registered Guyanese Cleaning Company" />
              <div className="mt-5 max-w-xl space-y-4 text-base leading-relaxed text-slate-600">
                <p>
                  {siteConfig.companyName}, trading as {siteConfig.brandName}, has provided
                  professional cleaning, pressure washing, fleet washing, and facility-support
                  services in Guyana since 2022. Its services are offered to corporate offices,
                  commercial properties, hotels, public-sector facilities, fleet operators, and
                  industrial sites.
                </p>
                <p>
                  Every job is organized the same way: a scope agreed in advance, a trained and
                  supervised team, and work checked against that scope before it is signed off.
                </p>
              </div>
              <dl className="mt-8 grid gap-x-6 border-t border-slate-200 sm:grid-cols-2">
                {companyFacts.map((f) => (
                  <div key={f.label} className="border-b border-slate-200 py-3">
                    <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500">{f.label}</dt>
                    <dd className={`mt-0.5 text-sm font-semibold text-navy-900 ${f.mono ? "font-mono" : ""}`}>
                      {f.value}
                    </dd>
                  </div>
                ))}
              </dl>
              <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm">
                <Link href="/about/" className="inline-flex min-h-11 items-center gap-1.5 font-bold text-brand-600 hover:text-brand-700">
                  About CDCS <IconArrowRight className="h-4 w-4" />
                </Link>
                <Link href="/credentials/" className="inline-flex min-h-11 items-center gap-1.5 font-bold text-brand-600 hover:text-brand-700">
                  Company credentials <IconArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>

            <div data-reveal className="relative isolate">
              <div
                aria-hidden
                className="absolute -inset-4 -z-10 hidden rounded-2xl bg-navy-950 sm:block"
              />
              <div className="relative rounded-xl border border-navy-900/10 bg-white p-2 shadow-xl shadow-navy-900/15">
                <div className="aspect-[4/5] overflow-hidden rounded-lg">
                  <ProjectImage
                    image={operatingStandardsImage}
                    sizes="(min-width: 1280px) 560px, (min-width: 1024px) 45vw, calc(100vw - 64px)"
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>
              <p className="mt-3 text-center text-xs text-slate-600 sm:absolute sm:-bottom-9 sm:left-0 sm:right-0">
                {operatingStandardsImage.caption}
              </p>
            </div>
          </div>

          <div className="mt-16 sm:mt-24">
            <h3 className="text-xl font-bold tracking-tight text-navy-900 sm:text-2xl">
              Verified Credentials &amp; Operating Standards
            </h3>
            <ul data-reveal="stagger" className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {credibility.map((c) => {
                const Icon = iconMap[c.icon];
                return (
                  <li key={c.title} className="flex flex-col rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                    <span className="text-brand-600">{Icon && <Icon className="h-6 w-6" />}</span>
                    <p className="mt-3 font-bold text-navy-900">{c.title}</p>
                    <p className="mt-1.5 flex-1 text-sm leading-relaxed text-slate-600">{c.text}</p>
                    {c.href && (
                      <Link
                        href={c.href}
                        className="mt-3 inline-flex min-h-11 items-center gap-1.5 text-sm font-bold text-brand-600 hover:text-brand-700"
                      >
                        {c.linkLabel}
                        <IconArrowRight className="h-4 w-4" />
                      </Link>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="mt-10 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <DeliveryModel />
          </div>
        </div>
      </section>

      {/* ================= INDUSTRIES (dark, textured) ================= */}
      <section className="relative overflow-hidden bg-navy-950 py-20 sm:py-28">
        <div className="pointer-events-none absolute inset-0 bg-grid-dark opacity-50" aria-hidden />
        <div className="container-page relative">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <SectionHeading
              eyebrow="Who We Serve"
              title="Industries We Serve"
              description="CDCS Inc. is built to support the operational demands of commercial, institutional, and industrial clients."
              light
            />
            <Link
              href="/industries/"
              className="inline-flex shrink-0 items-center gap-1.5 text-sm font-bold text-accent-400 hover:text-accent-300"
            >
              All industries
              <IconArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div data-reveal="stagger" className="mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-white/10 bg-white/10 lg:grid-cols-5">
            {industries.map((industry) => {
              const Icon = iconMap[industry.icon];
              return (
                <Link
                  key={industry.id}
                  href={industry.page ?? `/industries/#${industry.id}`}
                  className="group flex flex-col gap-4 bg-navy-950 p-6 transition-colors duration-300 hover:bg-navy-900 focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-accent-500"
                >
                  <span className="text-accent-400">{Icon && <Icon className="h-6 w-6" />}</span>
                  <p className="text-sm font-bold leading-snug text-white">{industry.name}</p>
                  <span
                    aria-hidden
                    className="mt-auto h-0.5 w-6 bg-accent-500/40 transition-all duration-300 group-hover:w-10 group-hover:bg-accent-500"
                  />
                </Link>
              );
            })}
          </div>

          {/* Featured: oil & gas support (Stage 3 page). No contracts or approvals claimed. */}
          <div className="mt-8 grid gap-6 rounded-xl border border-accent-500/30 bg-white/[0.04] p-6 sm:p-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <div className="flex gap-4">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-accent-500/10 text-accent-400">
                <IconFlame className="h-6 w-6" />
              </span>
              <div>
                <h3 className="text-lg font-bold text-white">Oil &amp; Gas Support Operations</h3>
                <p className="mt-1.5 max-w-2xl text-sm leading-relaxed text-slate-300">
                  Janitorial, facility cleaning, pressure washing, and fleet and heavy-equipment
                  washing for companies working in and supporting Guyana&apos;s oil and gas sector —
                  from a Local Content-registered Guyanese contractor with documented HSE and
                  quality policies.
                </p>
              </div>
            </div>
            <Button
              href="/industries/oil-and-gas/"
              variant="accent"
              size="md"
              className="min-h-11"
              icon={<IconArrowRight className="h-4 w-4" />}
            >
              Oil &amp; Gas Services
            </Button>
          </div>
        </div>
      </section>

      {/* ================= OUR WORK (editorial) ================= */}
      <section className="bg-white py-20 sm:py-28">
        <div className="container-page">
          <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
            <SectionHeading
              eyebrow="Our Work"
              title="Real CDCS Projects Across Guyana"
              description="Photos from recent CDCS Inc. jobs — cleaning, pressure washing, fleet washing, and detailing for businesses and vehicle owners."
            />
            <Button
              href="/our-work/"
              variant="ghost"
              size="md"
              className="shrink-0"
              icon={<IconArrowRight className="h-4 w-4" />}
            >
              View Full Gallery
            </Button>
          </div>

          <div data-reveal="stagger" className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {homepageProjectImages.map((image) => (
              <figure
                key={image.file}
                className="group relative overflow-hidden rounded-xl border border-slate-200 bg-navy-950"
              >
                <div className="aspect-[4/5] overflow-hidden">
                  <ProjectImage
                    image={image}
                    sizes="(min-width: 1024px) 400px, (min-width: 640px) 50vw, calc(100vw - 32px)"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                </div>
                <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-navy-950 via-navy-950/70 to-transparent p-4 pt-12">
                  <span className="inline-block rounded bg-accent-500 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-navy-950">
                    {categoryLabel(image)}
                  </span>
                  <p className="mt-2 text-sm font-medium leading-snug text-white">{image.caption}</p>
                </figcaption>
              </figure>
            ))}
          </div>

          <div className="mt-16 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div className="max-w-2xl">
              <h3 className="text-xl font-bold tracking-tight text-navy-900 sm:text-2xl">Commercial Project Case Studies</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                Scope, method, and equipment from selected commercial jobs, documented with
                photographs from site.
              </p>
            </div>
            <Link
              href="/projects/"
              className="inline-flex shrink-0 items-center gap-1.5 text-sm font-bold text-brand-600 hover:text-brand-700"
            >
              All projects
              <IconArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div
            data-reveal="stagger"
            className={`mt-8 grid gap-6 sm:grid-cols-2 ${homepageProjects.length >= 3 ? "lg:grid-cols-3" : ""}`}
          >
            {homepageProjects.map((p) => (
              <ProjectCard key={p.slug} project={p} />
            ))}
          </div>
        </div>
      </section>

      {/* ================= HOW IT WORKS (timeline) ================= */}
      <section className="border-t-2 border-accent-500/70 bg-slate-50 py-20 sm:py-28">
        <div className="container-page">
          <SectionHeading
            eyebrow="How It Works"
            title="A Simple, Professional Process"
            description="From first contact to a maintained contract, the steps are the same for a one-time project or an ongoing program."
            align="center"
          />
          <ol data-reveal="stagger" className="mx-auto mt-14 grid max-w-6xl gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-5">
            {processSteps.map((step, i) => (
              <li key={step.step} className="relative flex flex-col">
                <div className="flex items-center gap-3">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-navy-900 text-sm font-black text-white">
                    {step.step}
                  </span>
                  {i < processSteps.length - 1 && (
                    <span className="hidden h-px flex-1 bg-slate-300 lg:block" aria-hidden />
                  )}
                </div>
                <h3 className="mt-4 text-sm font-bold text-navy-900">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{step.description}</p>
              </li>
            ))}
          </ol>

          <div className="mx-auto mt-16 flex max-w-3xl flex-col items-center gap-4 rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm sm:flex-row sm:text-left">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-brand-50 text-brand-600">
              <IconCheck className="h-6 w-6" />
            </span>
            <p className="text-sm leading-relaxed text-navy-800">
              CDCS Inc. is structured to support recurring commercial contracts and large-scale
              projects — with trained teams, professional equipment, and service plans built around
              your operation.{" "}
              <Link href="/about/" className="font-bold text-brand-600 hover:underline">
                Learn more about how we work →
              </Link>
            </p>
          </div>
        </div>
      </section>

      {/* Plain-language answers about the company (also FAQPage JSON-LD above). */}
      <Faq items={homeFaqs} title="About CDCS: Common Questions" />

      <CTABanner />
    </>
  );
}
