import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CTABanner } from "@/components/CTABanner";
import { Faq } from "@/components/Faq";
import { ProjectImage } from "@/components/ProjectImage";
import { ProjectCard } from "@/components/ProjectCard";
import { LocalContentCredential } from "@/components/LocalContentCredential";
import {
  iconMap,
  IconArrowRight,
  IconCheck,
  IconMail,
  IconPhone,
  IconWhatsapp,
} from "@/components/icons";
import { getServiceBySlug } from "@/lib/services-data";
import { publishedProjects } from "@/lib/projects-data";
import { projectImageByFile } from "@/lib/project-images";
import { localContentCertificate as cert, formatCredentialDate, gcciMembership } from "@/lib/credentials";
import { siteConfig } from "@/lib/site-config";
import { pageLd, socialMetadata, type BreadcrumbItem } from "@/lib/seo";

// Oil & gas support industry page.
//
// Content rules — every statement must be supportable:
// - No oil and gas contracts, operator/supplier approvals, ISO certifications,
//   awards, endorsements, partnerships, or statistics are claimed.
// - Local Content registration is described exactly as on the register:
//   "Industrial Cleaning services (Onshore)" — never offshore work, and never
//   as prequalification or a route to contract award.
// - HSE and quality statements summarise CDCS's own adopted policies
//   (HSE and Quality policy statements, Rev. 0, effective 24 Sept 2026). Do
//   NOT publish internal document numbers (management instruction, Stage 4).
//   They are internal policies, not third-party certifications.
// - Project photos and case studies are from CDCS jobs in other sectors and
//   are presented as such, not as oil and gas work.

const PATH = "/industries/oil-and-gas/";
const TITLE = "Oil & Gas Cleaning Contractor in Guyana | CDCS Inc.";
const DESCRIPTION =
  "Guyanese, Local Content-registered cleaning contractor for oil and gas support companies: janitorial, facility, pressure washing and heavy-equipment washing.";

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: { canonical: PATH },
  ...socialMetadata({ title: TITLE, description: DESCRIPTION, path: PATH }),
};

const trail: BreadcrumbItem[] = [
  { name: "Home", path: "/" },
  { name: "Industries", path: "/industries/" },
  { name: "Oil & Gas", path: PATH },
];

const heroImage = projectImageByFile("fleet-washing-truck-covered-in-foam");

/** Services shown on this page, each linked to its existing service page. */
const capabilities: { slug: string; title: string; description: string }[] = [
  {
    slug: "commercial-janitorial-cleaning",
    title: "Commercial Janitorial & Office Cleaning",
    description:
      "Recurring cleaning programmes for offices, administrative buildings, washrooms, kitchens, and common areas, scheduled around working hours.",
  },
  {
    slug: "commercial-facility-cleaning",
    title: "Industrial & Facility Cleaning Support",
    description:
      "Structured cleaning programmes for larger facilities, with recurring teams, supervision, and schedules agreed with the site.",
  },
  {
    slug: "fleet-washing",
    title: "Fleet & Heavy Equipment Exterior Washing",
    description:
      "On-site washing of trucks, prime movers, trailers, and heavy equipment at the client's yard or site, as one-time washes or scheduled programmes.",
  },
  {
    slug: "pressure-washing",
    title: "Pressure Washing",
    description:
      "Exterior washing of buildings, walls, walkways, yards, and concrete areas, with pressure matched to each surface.",
  },
  {
    slug: "carpet-cleaning",
    title: "Commercial Carpet Cleaning",
    description: "Scheduled and one-time carpet cleaning for offices and other commercial interiors.",
  },
  {
    slug: "upholstery-fabric-extraction",
    title: "Upholstery & Office Chair Cleaning",
    description: "Cleaning of office chairs, boardroom and reception seating, and other fabric furnishings.",
  },
  {
    slug: "post-construction-cleaning",
    title: "Post-Construction Cleaning",
    description:
      "Final-stage cleaning that removes construction dust, debris, and residue so new or refurbished space can be occupied.",
  },
];

const companyFacts = [
  { label: "Registered company name", value: siteConfig.companyName },
  { label: "Trading as", value: siteConfig.brandName },
  { label: "Country", value: "Guyana" },
  { label: "Operating since", value: siteConfig.foundingDate.slice(0, 4) },
  { label: "Chamber membership", value: `${gcciMembership.shortName} member since ${gcciMembership.memberSince}` },
  { label: "Based in", value: siteConfig.location.display },
  { label: "Service area", value: `Georgetown, ${siteConfig.location.region}, and across Guyana` },
];

const operations = [
  {
    icon: "clipboard",
    title: "Defined scope before mobilisation",
    text: "Requirements, areas, frequencies, and acceptance standards are clarified and agreed before work begins.",
  },
  {
    icon: "truck",
    title: "On-site, mobile service",
    text: "Teams and equipment come to the client's office, facility, yard, or work site — fleets are washed where they are parked.",
  },
  {
    icon: "calendar",
    title: "Scheduling around operations",
    text: "One-time projects or recurring programmes, scheduled around operating hours, including off-hours service where needed.",
  },
  {
    icon: "users",
    title: "Supervised, uniformed teams",
    text: "Personnel receive induction and job instruction, work under supervision, and are issued PPE suited to the task and site.",
  },
  {
    icon: "tools",
    title: "Professional equipment",
    text: "Commercial pressure washers, rotary surface cleaners, foam application for fleet washing, and commercial carpet and upholstery cleaning equipment.",
  },
  {
    icon: "shield",
    title: "Site rules confirmed in scoping",
    text: "Site inductions, permits, access rules, and client HSE requirements are confirmed during scoping and built in before work starts.",
  },
];

const hsePoints = [
  "Task hazards identified and controls set before work begins",
  "Induction, job instruction, supervision, and PPE for assigned work",
  "Any worker may stop and report work presenting immediate, uncontrolled danger",
  "Cleaning chemicals selected, labelled, stored, and used per manufacturer instructions and Safety Data Sheets",
  "Client permits, job safety analyses, toolbox talks, and restricted-area controls incorporated where required",
  "Incidents, injuries, near misses, and environmental events reported and reviewed",
  "Reasonable measures to prevent uncontrolled releases of chemicals, wastewater, and waste",
];

const qualityPoints = [
  "Client requirements clarified and communicated before work begins",
  "Completed work inspected against defined acceptance requirements",
  "Deficient work identified, corrected, and investigated where significant or recurring",
  "Records kept to show service completion, inspection, and corrective action",
  "Changes to scope, methods, personnel, or equipment managed before implementation where practicable",
  "Client feedback and complaints used to improve service delivery",
];

const environments = [
  "Corporate and administrative offices",
  "Commercial and industrial facilities",
  "Yards, compounds, and concrete areas",
  "Vehicle fleets and heavy equipment",
  "New or refurbished premises before occupancy",
];

const faqs = [
  {
    q: "Is CDCS registered on Guyana's Local Content Register?",
    a: `Yes. ${siteConfig.companyName} holds Local Content Certificate of Registration ${cert.number}, valid from ${formatCredentialDate(cert.validFrom)} to ${formatCredentialDate(cert.validTo)}. The register lists its approved sectors as ${cert.approvedSectors.join(" and ")}. The certificate can be checked on the Local Content Secretariat's public register.`,
  },
  {
    q: "Does Local Content registration mean CDCS is prequalified with an operator?",
    a: "No. Registration confirms CDCS's status on the Local Content Register. It is not prequalification, vendor approval, or the award of any contract — each company carries out its own supplier qualification.",
  },
  {
    q: "Can CDCS work to our site's HSE requirements?",
    a: "Yes. CDCS's HSE policy requires client and site requirements — such as permits, job safety analyses, toolbox talks, inductions, and restricted-area controls — to be incorporated before the affected work proceeds. These are confirmed during scoping.",
  },
  {
    q: "Does CDCS hold ISO certification?",
    a: "No. CDCS operates under its own adopted HSE and Quality policies and a QA/QC manual. These are internal company policies and do not represent certification to ISO 9001 or any other external standard.",
  },
  {
    q: "Where in Guyana does CDCS work?",
    a: "CDCS is based in Georgetown and serves clients in Georgetown, the Demerara-Mahaica region, and across Guyana. Work outside these areas is scoped case by case.",
  },
  {
    q: "Can CDCS provide documents for vendor registration?",
    a: "Yes. Contact CDCS with your vendor-registration or tender requirements and the team will respond with the information and documents it can provide, such as its Local Content certificate and HSE and Quality policy statements.",
  },
];

const relatedProjects = publishedProjects.filter((p) =>
  [
    "fleet-heavy-equipment-washing-guyana",
    "commercial-building-cleaning-guyana",
    "commercial-pressure-washing-guyana",
  ].includes(p.slug),
);

const jsonLd = [
  ...pageLd({
    path: PATH,
    name: TITLE,
    description: DESCRIPTION,
    trail,
    image: `${siteConfig.url}${heroImage.file}.jpg`,
    extra: {
      audience: { "@type": "BusinessAudience", name: "Oil and gas support companies in Guyana" },
      mentions: [
        { "@id": `${siteConfig.url}/credentials/#local-content-certificate` },
        ...capabilities.map((c) => ({
          "@type": "Service",
          name: c.title,
          url: `${siteConfig.url}/services/${c.slug}/`,
          provider: { "@id": `${siteConfig.url}/#business` },
        })),
      ],
    },
  }),
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  },
];

const proposalHref = "/quote/?service=commercial-facility-cleaning";

export default function OilAndGasPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* ================= HERO ================= */}
      <section className="relative overflow-hidden bg-navy-950 py-14 sm:py-20">
        <div className="pointer-events-none absolute inset-0 bg-grid-dark opacity-50" aria-hidden />
        <div className="pointer-events-none absolute inset-0 brand-glow opacity-80" aria-hidden />
        <div className="container-page relative grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <Breadcrumbs trail={trail} />
            <p className="mb-4 flex items-center gap-2.5 text-xs font-bold uppercase tracking-[0.22em] text-accent-400">
              <span className="h-px w-6 bg-accent-400/60" aria-hidden />
              Industries · Oil &amp; Gas Support
            </p>
            <h1 className="text-pretty text-4xl font-extrabold leading-[1.1] tracking-tight text-white sm:text-5xl">
              Cleaning &amp; Facility Support for Guyana&apos;s Oil and Gas Sector
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-slate-300 sm:text-lg">
              {siteConfig.brandName} is a Guyanese cleaning contractor, registered on the
              Government of Guyana&apos;s Local Content Register, providing janitorial, facility
              cleaning, pressure washing, and fleet and heavy-equipment washing for companies
              working in and supporting the oil and gas industry.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button href={proposalHref} variant="accent" size="lg" icon={<IconArrowRight className="h-5 w-5" />}>
                Request a Commercial Cleaning Proposal
              </Button>
              <Button href="/credentials/" variant="outline" size="lg">
                View Company Credentials
              </Button>
            </div>
            <p className="mt-6 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-slate-300">
              <IconCheck className="h-4 w-4 text-accent-400" />
              Local Content Certificate <span className="font-mono text-slate-200">{cert.number}</span>
            </p>
          </div>
          <figure>
            <div className="relative rounded-2xl border border-white/10 bg-white/[0.04] p-2 shadow-2xl shadow-black/40">
              <div className="aspect-[4/3] overflow-hidden rounded-xl">
                <ProjectImage image={heroImage} priority className="h-full w-full object-cover" />
              </div>
            </div>
            <figcaption className="mt-3 text-xs leading-relaxed text-slate-400">
              On-site fleet washing by CDCS in Guyana. Photos on this page are from CDCS jobs across
              sectors.
            </figcaption>
          </figure>
        </div>
      </section>

      {/* ================= ABOUT CDCS ================= */}
      <section className="bg-white py-16 sm:py-24">
        <div className="container-page grid gap-12 lg:grid-cols-[1fr_minmax(0,24rem)] lg:gap-16">
          <div>
            <SectionHeading eyebrow="About CDCS" title="A Guyanese Commercial Cleaning Contractor" />
            <div className="mt-6 space-y-4 text-base leading-relaxed text-slate-700">
              <p>
                {siteConfig.companyName}, trading as {siteConfig.brandName}, is a Georgetown-based
                company that has provided commercial cleaning, pressure washing, fleet washing, and
                facility-support services in Guyana since 2022, offered to businesses, government
                agencies, commercial properties, and fleet operators across the country.
              </p>
              <p>
                For companies working in and around the oil and gas sector, CDCS supports the
                facilities and fleets behind operations: offices and administrative buildings,
                commercial and industrial premises, yards, and vehicle and equipment fleets. Work is
                delivered as one-time projects or recurring programmes under a defined scope, with
                supervised teams and professional equipment.
              </p>
              <p>
                CDCS&apos;s Local Content registration lists{" "}
                <strong className="font-semibold text-navy-900">{cert.approvedSectors[0]}</strong>{" "}
                and <strong className="font-semibold text-navy-900">{cert.approvedSectors[1]}</strong>{" "}
                as approved sectors.
              </p>
            </div>
          </div>
          <dl className="h-fit divide-y divide-slate-200 rounded-2xl border border-slate-200 bg-slate-50 px-6 py-2 text-sm">
            {companyFacts.map((f) => (
              <div key={f.label} className="py-3">
                <dt className="font-semibold text-slate-500">{f.label}</dt>
                <dd className="mt-0.5 font-semibold text-navy-900">{f.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* ================= CAPABILITIES ================= */}
      <section className="bg-slate-50 py-16 sm:py-24">
        <div className="container-page">
          <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
            <SectionHeading
              eyebrow="Capabilities"
              title="Cleaning & Facility Support Services"
              description="Services CDCS provides to commercial and industrial clients, each with its own service page."
            />
            <Link
              href="/services/"
              className="inline-flex shrink-0 items-center gap-1.5 text-sm font-bold text-brand-600 hover:text-brand-700"
            >
              Explore all cleaning services
              <IconArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {capabilities.map((c) => {
              const service = getServiceBySlug(c.slug);
              const Icon = service ? iconMap[service.icon] : undefined;
              return (
                <li key={c.slug}>
                  <Link
                    href={`/services/${c.slug}/`}
                    className="group flex h-full flex-col rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-navy-900/20 hover:shadow-lg hover:shadow-navy-900/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600"
                  >
                    <span className="flex h-11 w-11 items-center justify-center rounded-lg text-navy-800 ring-1 ring-inset ring-navy-900/12 transition-colors group-hover:bg-navy-900 group-hover:text-white">
                      {Icon && <Icon className="h-[22px] w-[22px]" />}
                    </span>
                    <h3 className="mt-4 font-bold text-navy-900">{c.title}</h3>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600">{c.description}</p>
                    <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-brand-600">
                      Service details
                      <IconArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* ================= LOCAL CONTENT ================= */}
      <section aria-labelledby="local-content" className="relative overflow-hidden bg-navy-950 py-16 sm:py-24">
        <div className="pointer-events-none absolute inset-0 bg-grid-dark opacity-40" aria-hidden />
        <div className="container-page relative grid gap-10 lg:grid-cols-[minmax(0,26rem)_1fr] lg:gap-16">
          <div>
            <p className="mb-4 flex items-center gap-2.5 text-xs font-bold uppercase tracking-[0.22em] text-accent-400">
              <span className="h-px w-6 bg-accent-400/60" aria-hidden />
              Local Content
            </p>
            <h2
              id="local-content"
              className="text-pretty text-[1.9rem] font-bold leading-[1.15] tracking-tight text-white sm:text-4xl"
            >
              Registered on Guyana&apos;s Local Content Register
            </h2>
            <div className="mt-5 space-y-4 text-base leading-relaxed text-slate-300">
              <p>
                CDCS holds a Government of Guyana {cert.name}, issued under {cert.legalBasis}. Its
                registration status, validity dates, and approved sectors can be checked on the{" "}
                {cert.issuer}&apos;s public register.
              </p>
              <p>
                The registration covers the sectors listed on the register — including{" "}
                {cert.approvedSectors[0]}. It is not prequalification, vendor approval, or the award
                of any contract; companies carry out their own supplier qualification.
              </p>
            </div>
          </div>
          {/* The card carries the certificate PDF, register verification, and /credentials/ links. */}
          <LocalContentCredential headingLevel="h3" />
        </div>
      </section>

      {/* ================= OPERATIONS ================= */}
      <section className="bg-white py-16 sm:py-24">
        <div className="container-page">
          <SectionHeading
            eyebrow="Operations"
            title="How CDCS Delivers Work"
            description="The operating approach CDCS applies to commercial and industrial clients."
          />
          <div className="mt-12 grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
            {operations.map((o) => {
              const Icon = iconMap[o.icon];
              return (
                <div key={o.title} className="flex gap-4">
                  <span className="mt-0.5 shrink-0 text-brand-600">{Icon && <Icon className="h-6 w-6" />}</span>
                  <div>
                    <h3 className="font-bold text-navy-900">{o.title}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-slate-600">{o.text}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ================= HSE & QUALITY ================= */}
      <section className="bg-slate-50 py-16 sm:py-24">
        <div className="container-page">
          <SectionHeading
            eyebrow="Quality & Safety"
            title="Documented HSE and Quality Commitments"
            description="CDCS operates under its own adopted Health, Safety & Environment policy and Quality policy. The points below summarise those policies."
          />
          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
              <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-brand-600">
                Company policy
              </p>
              <h3 className="mt-1 text-xl font-bold text-navy-900">Health, Safety &amp; Environment</h3>
              <ul className="mt-5 space-y-3 text-sm leading-relaxed text-slate-700">
                {hsePoints.map((p) => (
                  <li key={p} className="flex gap-3">
                    <IconCheck className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" />
                    {p}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
              <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-brand-600">
                Company policy
              </p>
              <h3 className="mt-1 text-xl font-bold text-navy-900">Quality Assurance</h3>
              <ul className="mt-5 space-y-3 text-sm leading-relaxed text-slate-700">
                {qualityPoints.map((p) => (
                  <li key={p} className="flex gap-3">
                    <IconCheck className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" />
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <p className="mx-auto mt-8 max-w-3xl text-center text-xs leading-relaxed text-slate-500">
            Both policies are internally adopted CDCS corporate policies (Revision 0, effective
            September 2026), approved by the Managing Director and reviewed at least annually. They
            do not represent certification to ISO 9001 or any other external standard. Policy
            statements are available to prospective clients on request.
          </p>
        </div>
      </section>

      {/* ================= ENVIRONMENTS & SERVICE AREA ================= */}
      <section className="bg-white py-16 sm:py-24">
        <div className="container-page grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <SectionHeading eyebrow="Where We Work" title="Environments & Service Area" />
            <ul className="mt-8 space-y-3 text-base text-slate-700">
              {environments.map((e) => (
                <li key={e} className="flex gap-3">
                  <IconCheck className="mt-1 h-4 w-4 shrink-0 text-brand-600" />
                  {e}
                </li>
              ))}
            </ul>
            <p className="mt-6 text-sm leading-relaxed text-slate-600">
              Based in Georgetown, CDCS serves clients in Georgetown, the {siteConfig.location.region}{" "}
              region, and across Guyana. Work in remote or restricted locations is scoped case by case,
              including access, travel, and site requirements.
            </p>
          </div>
          <div>
            <SectionHeading eyebrow="Credentials" title="Company Credentials at a Glance" />
            <ul className="mt-8 divide-y divide-slate-200 border-y border-slate-200 text-sm">
              <li className="py-3.5">
                <span className="font-semibold text-navy-900">Registered Guyanese company</span>
                <span className="block text-slate-600">{siteConfig.companyName}, operating since 2022</span>
              </li>
              <li className="py-3.5">
                <span className="font-semibold text-navy-900">Local Content Certificate of Registration</span>
                <span className="block text-slate-600">
                  {cert.number} · valid {formatCredentialDate(cert.validFrom)} – {formatCredentialDate(cert.validTo)}
                </span>
              </li>
              <li className="py-3.5">
                <span className="font-semibold text-navy-900">HSE policy</span>
                <span className="block text-slate-600">Documented company policy · internally adopted</span>
              </li>
              <li className="py-3.5">
                <span className="font-semibold text-navy-900">Quality policy and QA/QC manual</span>
                <span className="block text-slate-600">Documented company policy · internally adopted, not ISO-certified</span>
              </li>
              <li className="py-3.5">
                <span className="font-semibold text-navy-900">{gcciMembership.label}</span>
                <span className="block text-slate-600">
                  Member since {gcciMembership.memberSince} ·{" "}
                  <a
                    href={gcciMembership.listingUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-brand-600 hover:underline"
                  >
                    View Official GCCI Listing<span className="sr-only"> (opens in a new tab)</span>
                  </a>
                </span>
              </li>
            </ul>
            <Link
              href="/credentials/"
              className="mt-5 inline-flex items-center gap-1.5 text-sm font-bold text-brand-600 hover:text-brand-700"
            >
              View company credentials
              <IconArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ================= RELATED PROJECT EXPERIENCE ================= */}
      {relatedProjects.length > 0 && (
        <section className="bg-slate-50 py-16 sm:py-24">
          <div className="container-page">
            <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
              <SectionHeading
                eyebrow="Project Experience"
                title="Related CDCS Projects"
                description="Selected commercial and industrial work by CDCS in Guyana — fleet and heavy-equipment washing, building cleaning, and pressure washing. These projects are from a range of sectors."
              />
              <Link
                href="/projects/"
                className="inline-flex shrink-0 items-center gap-1.5 text-sm font-bold text-brand-600 hover:text-brand-700"
              >
                All projects
                <IconArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {relatedProjects.map((p) => (
                <ProjectCard key={p.slug} project={p} />
              ))}
            </div>
          </div>
        </section>
      )}

      <Faq items={faqs} title="Questions from Procurement Teams" />

      {/* ================= CONTACT ================= */}
      <section className="border-t border-slate-200 bg-white pb-16 sm:pb-24">
        <div className="container-page">
          <div className="grid gap-8 rounded-2xl border border-slate-200 bg-slate-50 p-6 sm:p-10 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-navy-900">Contact Our Team</h2>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-600">
                For proposals, tenders, vendor registration, or a site assessment, contact CDCS
                directly. Tell us the location, the areas or equipment involved, and any site
                requirements.
              </p>
              <ul className="mt-5 flex flex-col gap-3 text-sm sm:flex-row sm:flex-wrap sm:gap-6">
                <li>
                  <a href={siteConfig.contact.emailHref} className="inline-flex items-center gap-2 font-semibold text-navy-900 hover:text-brand-600">
                    <IconMail className="h-4 w-4 text-brand-600" />
                    {siteConfig.contact.email}
                  </a>
                </li>
                <li>
                  <a href={siteConfig.contact.phoneHref} className="inline-flex items-center gap-2 font-semibold text-navy-900 hover:text-brand-600">
                    <IconPhone className="h-4 w-4 text-brand-600" />
                    {siteConfig.contact.phoneDisplay}
                  </a>
                </li>
                <li>
                  <a
                    href={siteConfig.contact.whatsappHrefWithMessage(
                      "Hello CDCS, I'd like to discuss cleaning services for an oil and gas support operation.",
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 font-semibold text-navy-900 hover:text-brand-600"
                  >
                    <IconWhatsapp className="h-4 w-4 text-[#25D366]" />
                    WhatsApp
                  </a>
                </li>
              </ul>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
              <Button href="/contact/" variant="ghost" size="md">
                Contact Our Team
              </Button>
              <Button href="/services/" variant="ghost" size="md">
                Explore Cleaning Services
              </Button>
            </div>
          </div>
        </div>
      </section>

      <CTABanner
        title="Request a Commercial Cleaning Proposal"
        description="Share your facility, fleet, or site requirements and CDCS will prepare a scope and quotation for your review."
        primaryLabel="Request a Proposal"
        primaryHref={proposalHref}
        whatsappMessage="Hello CDCS, I'd like to request a commercial cleaning proposal for an oil and gas support operation."
      />
    </>
  );
}
