import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { PlaceholderMedia } from "@/components/ui/PlaceholderMedia";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CTABanner } from "@/components/CTABanner";
import { ServiceCard } from "@/components/ServiceCard";
import { Faq } from "@/components/Faq";
import { ProjectImage } from "@/components/ProjectImage";
import { services, getServiceBySlug } from "@/lib/services-data";
import { insightsForService } from "@/lib/insights-data";
import {
  serviceHeroImage,
  serviceGalleryImages,
  categoryForService,
  categoryLabel,
  projectImageByFile,
} from "@/lib/project-images";
import { serviceIconMap, IconCheck, IconArrowRight } from "@/components/icons";
import { siteConfig, ogImage } from "@/lib/site-config";

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return {};
  return {
    title: service.seoTitleAbsolute ? { absolute: service.metaTitle } : service.metaTitle,
    description: service.metaDescription,
    alternates: { canonical: `/services/${service.slug}/` },
    openGraph: {
      type: "website",
      url: `${siteConfig.url}/services/${service.slug}/`,
      siteName: siteConfig.brandName,
      title: service.metaTitle,
      description: service.metaDescription,
      images: [ogImage],
    },
    twitter: {
      card: "summary_large_image",
      title: service.metaTitle,
      description: service.metaDescription,
      images: [ogImage],
    },
  };
}

export default async function ServiceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) notFound();

  const Icon = serviceIconMap[service.icon];
  const heroImage = serviceHeroImage(service.slug);
  const gallery = serviceGalleryImages(service.slug);
  // For services without their own photo set yet, show related CDCS work rather
  // than a bare card. The vehicle-washing page draws on real detailing and
  // fleet-wash photos; everything else falls back to commercial cleaning work.
  const galleryFallback =
    service.slug === "car-wash-mobile-vehicle-washing"
      ? {
          images: [
            "mobile-detailing-vehicle-interior-seats-out",
            "fleet-washing-truck-covered-in-foam",
            "fleet-washing-truck-front-wash",
          ].map(projectImageByFile),
          title: "Related CDCS Vehicle Work",
          description:
            "Authentic CDCS Inc. vehicle work from jobs across Guyana — the interior and exterior cleaning a wash and a full detail both draw on.",
        }
      : {
          images: categoryForService("commercial-janitorial-cleaning")?.images ?? [],
          title: "Related CDCS Commercial Cleaning Work",
          description:
            "Authentic CDCS Inc. commercial cleaning work from projects across Guyana — floor, glass, and detailed surface cleaning of the kind involved in bringing a space to a presentation-ready standard.",
        };
  const relatedWork =
    gallery.length === 0
      ? galleryFallback.images.filter((img) => img.file !== heroImage?.file).slice(0, 3)
      : [];
  const related = (
    service.relatedSlugs
      ?.map((s) => getServiceBySlug(s))
      .filter((s): s is NonNullable<typeof s> => Boolean(s)) ??
    services.filter((s) => s.slug !== service.slug)
  ).slice(0, 3);

  // Contextual in-body internal links, drawn from the same related services and
  // anchored on the plain service name (no exact-match keyword anchors).
  const overviewLinks = (service.relatedSlugs ?? [])
    .map((s) => getServiceBySlug(s))
    .filter((s): s is NonNullable<typeof s> => Boolean(s));

  const relatedInsights = insightsForService(service.slug);

  const serviceUrl = `${siteConfig.url}/services/${service.slug}/`;
  const heroImageUrl = heroImage
    ? `${siteConfig.url}${heroImage.file}${heroImage.fallback ? ".jpg" : ".webp"}`
    : undefined;

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      serviceType: service.title,
      name: service.title,
      description: service.metaDescription,
      url: serviceUrl,
      ...(heroImageUrl ? { image: heroImageUrl } : {}),
      provider: {
        "@type": "ProfessionalService",
        "@id": `${siteConfig.url}/#business`,
        name: siteConfig.companyName,
        url: siteConfig.url,
      },
      areaServed: [
        { "@type": "Country", name: "Guyana" },
        { "@type": "City", name: "Georgetown" },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: `${siteConfig.url}/` },
        { "@type": "ListItem", position: 2, name: "Services", item: `${siteConfig.url}/services/` },
        { "@type": "ListItem", position: 3, name: service.title, item: serviceUrl },
      ],
    },
    ...(service.faq
      ? [
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: service.faq.map((f) => ({
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
        <div className="container-page relative grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <nav className="mb-5 text-xs font-semibold text-slate-400" aria-label="Breadcrumb">
              <Link href="/" className="hover:text-accent-400">Home</Link>
              <span className="mx-2">/</span>
              <Link href="/services/" className="hover:text-accent-400">Services</Link>
              <span className="mx-2">/</span>
              <span className="text-slate-300">{service.title}</span>
            </nav>
            <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-lg bg-accent-500/15 text-accent-400 ring-1 ring-inset ring-accent-500/25">
              {Icon && <Icon className="h-7 w-7" />}
            </div>
            <h1 className="text-pretty text-4xl font-extrabold leading-[1.1] tracking-tight text-white sm:text-5xl">
              {service.h1}
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-slate-300 sm:text-lg">{service.intro}</p>
            <div className="mt-6 flex flex-wrap gap-2">
              <span className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-semibold text-slate-200">
                {service.category}
              </span>
              <span className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-semibold text-slate-200">
                Georgetown &amp; across Guyana
              </span>
            </div>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button href="/quote/" variant="accent" size="lg" icon={<IconArrowRight className="h-5 w-5" />}>
                Request a Quote
              </Button>
              <Button href={siteConfig.contact.phoneHref} variant="outline" size="lg">
                Call {siteConfig.contact.phoneDisplay}
              </Button>
            </div>
          </div>
          {heroImage ? (
            <div className="relative rounded-2xl border border-white/10 bg-white/[0.04] p-2 shadow-2xl shadow-black/40">
              <span
                aria-hidden
                className="absolute -right-3 -top-3 hidden h-16 w-16 rounded-tr-2xl border-r-2 border-t-2 border-accent-500/70 sm:block"
              />
              <div className="aspect-[4/3] overflow-hidden rounded-xl sm:aspect-[4/5] lg:aspect-[4/3]">
                <ProjectImage image={heroImage} priority className="h-full w-full object-cover" />
              </div>
            </div>
          ) : (
            <PlaceholderMedia label={service.heroPlaceholderLabel} ratio="square" className="lg:aspect-[4/5]" />
          )}
        </div>
      </section>

      {/* ================= OVERVIEW ================= */}
      {service.overview && service.overview.length > 0 && (
        <section className="bg-white pt-16 sm:pt-24">
          <div className="container-page">
            <div className="max-w-3xl">
              <SectionHeading
                eyebrow="Overview"
                title={`About ${service.title} in Guyana`}
              />
              <div className="mt-6 space-y-4 text-base leading-relaxed text-slate-700">
                {service.overview.map((para) => (
                  <p key={para.slice(0, 40)}>{para}</p>
                ))}
              </div>
              {overviewLinks.length > 0 && (
                <p className="mt-6 text-sm leading-relaxed text-slate-600">
                  Often arranged alongside{" "}
                  {overviewLinks.map((s, i) => (
                    <span key={s.slug}>
                      <Link
                        href={`/services/${s.slug}/`}
                        className="font-semibold text-brand-600 hover:underline"
                      >
                        {s.title.toLowerCase()}
                      </Link>
                      {i === overviewLinks.length - 1
                        ? ". "
                        : i === overviewLinks.length - 2
                          ? " and "
                          : ", "}
                    </span>
                  ))}
                  <Link href="/quote/" className="font-semibold text-brand-600 hover:underline">
                    Request a quote
                  </Link>{" "}
                  to get started.
                </p>
              )}

              {/* Page-specific: businesses-in-Guyana context for the core
                  commercial/janitorial page. Kept in-flow within the overview
                  section so the design is unchanged. */}
              {service.slug === "commercial-janitorial-cleaning" && (
                <div className="mt-12 border-t border-slate-200 pt-10">
                  <SectionHeading
                    eyebrow="For Organizations"
                    title="Professional Cleaning Services for Businesses in Guyana"
                  />
                  <div className="mt-6 space-y-4 text-base leading-relaxed text-slate-700">
                    <p>
                      CDCS Inc. delivers structured commercial cleaning services for businesses,
                      offices, and organizations across Guyana — corporate offices, government
                      buildings, banks and financial institutions, schools, medical and
                      professional practices, and multi-tenant commercial properties. Every
                      programme is built on a defined scope of work, run by a supervised team, and
                      checked against an agreed standard rather than left to an informal
                      arrangement.
                    </p>
                    <p>
                      Both one-time and recurring cleaning contracts are available. A space is
                      often brought up to standard first with a{" "}
                      <Link href="/services/deep-cleaning/" className="font-semibold text-brand-600 hover:underline">
                        deep clean
                      </Link>{" "}
                      or, for a newly fitted-out office,{" "}
                      <Link href="/services/post-construction-cleaning/" className="font-semibold text-brand-600 hover:underline">
                        post-construction cleaning
                      </Link>
                      , and then kept there on a recurring janitorial schedule. Larger and
                      multi-site organizations are served through a{" "}
                      <Link href="/services/commercial-facility-cleaning/" className="font-semibold text-brand-600 hover:underline">
                        structured facility cleaning programme
                      </Link>
                      . To get started,{" "}
                      <Link href="/quote/" className="font-semibold text-brand-600 hover:underline">
                        request a quote
                      </Link>{" "}
                      with your facility size, operating hours, and priorities — our guide to{" "}
                      <Link
                        href="/insights/commercial-janitorial-contract-guyana/"
                        className="font-semibold text-brand-600 hover:underline"
                      >
                        what a commercial janitorial service agreement should include
                      </Link>{" "}
                      covers what to expect.
                    </p>
                  </div>
                </div>
              )}

              {/* Page-specific: surface/property context for the pressure
                  washing page. Kept in-flow within the overview section. */}
              {service.slug === "pressure-washing" && (
                <div className="mt-12 border-t border-slate-200 pt-10">
                  <SectionHeading
                    eyebrow="What We Clean"
                    title="Professional Pressure Washing Services in Guyana"
                  />
                  <div className="mt-6 space-y-4 text-base leading-relaxed text-slate-700">
                    <p>
                      CDCS Inc. provides pressure washing for commercial, residential, and
                      institutional properties in Georgetown and, where operationally feasible,
                      elsewhere in Guyana. Typical work includes:
                    </p>
                    <ul className="grid gap-x-8 gap-y-2 sm:grid-cols-2">
                      {[
                        "Concrete slabs, walkways, and steps",
                        "Yards, compounds, and forecourts",
                        "Driveways and parking areas",
                        "Boundary walls and fences",
                        "Building exteriors and painted walls",
                        "Shopfronts and office entrances",
                        "Warehouse aprons and loading / service areas",
                        "Retail and restaurant frontages",
                      ].map((item) => (
                        <li key={item} className="flex items-start gap-2.5 text-sm">
                          <IconCheck className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" />
                          {item}
                        </li>
                      ))}
                    </ul>
                    <p>
                      Water pressure and nozzle are matched to each surface, delicate or painted
                      finishes are tested first, and oil and grease staining is pre-treated as part
                      of the job. Commercial pressure washing pairs naturally with an interior{" "}
                      <Link href="/services/commercial-janitorial-cleaning/" className="font-semibold text-brand-600 hover:underline">
                        commercial and janitorial cleaning
                      </Link>{" "}
                      programme, the final clean-down after{" "}
                      <Link href="/services/post-construction-cleaning/" className="font-semibold text-brand-600 hover:underline">
                        post-construction
                      </Link>{" "}
                      work, and on-site{" "}
                      <Link href="/services/fleet-washing/" className="font-semibold text-brand-600 hover:underline">
                        fleet washing
                      </Link>{" "}
                      for depots and yards. See recent jobs on{" "}
                      <Link href="/our-work/" className="font-semibold text-brand-600 hover:underline">
                        Our Work
                      </Link>
                      , read our guide to{" "}
                      <Link href="/insights/commercial-pressure-washing-guyana/" className="font-semibold text-brand-600 hover:underline">
                        how often commercial properties should be pressure washed
                      </Link>
                      , or{" "}
                      <Link href="/quote/" className="font-semibold text-brand-600 hover:underline">
                        request a pressure washing quote
                      </Link>
                      .
                    </p>
                  </div>
                </div>
              )}

              {/* Page-specific: come-to-you context and detail scope for the
                  mobile detailing page. Kept in-flow within the overview
                  section. */}
              {service.slug === "mobile-detailing" && (
                <div className="mt-12 border-t border-slate-200 pt-10">
                  <SectionHeading
                    eyebrow="We Come to You"
                    title="Professional Mobile Car Detailing in Guyana"
                  />
                  <div className="mt-6 space-y-4 text-base leading-relaxed text-slate-700">
                    <p>
                      CDCS Inc. brings the equipment to the vehicle. Our team arrives at your home,
                      office, or business premises with the water, power, and tools to detail the
                      car on site — so you don&apos;t have to drop it at a detailing shop, wait
                      around, or plan your day around it. Service is based in Georgetown, and jobs
                      in other areas of Guyana can be arranged depending on the location and what
                      the detail involves.
                    </p>
                    <p>
                      A detail typically covers exterior washing, wheels and tyres, glass inside
                      and out, interior vacuuming, and cleaning of the dashboard, console, and door
                      panels. Seat, carpet, and mat cleaning is part of the interior work, and
                      heavily soiled or stained fabric can be treated with{" "}
                      <Link href="/services/upholstery-fabric-extraction/" className="font-semibold text-brand-600 hover:underline">
                        hot-water extraction
                      </Link>{" "}
                      — the same method used in our carpet and upholstery cleaning service.
                      Additional work such as engine bay cleaning and headlight restoration is
                      available depending on the selected service.
                    </p>
                    <p>
                      Mobile detailing suits private owners, executives and professionals,
                      dealerships, and businesses keeping management, pool, or sales vehicles
                      presentable. Where a business runs a larger number of vehicles on a routine
                      schedule,{" "}
                      <Link href="/services/fleet-washing/" className="font-semibold text-brand-600 hover:underline">
                        fleet washing
                      </Link>{" "}
                      is usually the better fit. For routine upkeep rather than a full detail,{" "}
                      <Link href="/services/car-wash-mobile-vehicle-washing/" className="font-semibold text-brand-600 hover:underline">
                        car wash &amp; mobile vehicle washing
                      </Link>{" "}
                      is the lighter, more frequent option. Want it on a set schedule instead of
                      booking each time? See{" "}
                      <Link href="/washcare/" className="font-semibold text-brand-600 hover:underline">
                        WashCare recurring plans
                      </Link>
                      . To book,{" "}
                      <Link href="/quote/" className="font-semibold text-brand-600 hover:underline">
                        request a mobile detailing quote
                      </Link>{" "}
                      — or see recent details on{" "}
                      <Link href="/our-work/" className="font-semibold text-brand-600 hover:underline">
                        Our Work
                      </Link>{" "}
                      or{" "}
                      <Link href="/contact/" className="font-semibold text-brand-600 hover:underline">
                        contact the CDCS Inc. team
                      </Link>
                      .
                    </p>
                  </div>
                </div>
              )}

              {/* Page-specific: rough-to-handover stages for the
                  post-construction cleaning page. Kept in-flow within the
                  overview section. */}
              {service.slug === "post-construction-cleaning" && (
                <div className="mt-12 border-t border-slate-200 pt-10">
                  <SectionHeading
                    eyebrow="How It Runs"
                    title="Post-Construction Cleaning from Rough Clean to Final Handover"
                  />
                  <div className="mt-6 space-y-4 text-base leading-relaxed text-slate-700">
                    <p>
                      On most projects the work runs in stages that track the build programme rather
                      than as a single visit. Not every project needs all three stages of final
                      cleaning — the scope depends on the condition of the site and what the client
                      requires for project handover.
                    </p>
                    <div className="space-y-5">
                      <div>
                        <h3 className="font-bold text-navy-900">A. Rough / initial clean</h3>
                        <p className="mt-1 text-sm leading-relaxed text-slate-700">
                          Carried out during or straight after the trades: clearing loose
                          construction debris and offcuts, removing the bulk of the heavy dust, and
                          an initial surface clean so the space can be worked in and inspected.
                        </p>
                      </div>
                      <div>
                        <h3 className="font-bold text-navy-900">B. Detailed construction clean</h3>
                        <p className="mt-1 text-sm leading-relaxed text-slate-700">
                          The main pass once construction and installation work is finished: fine
                          dust off every surface, floors cleaned to the installed finish, fixtures,
                          windows and frames, tracks, ledges, doors, and detailed surfaces — with
                          adhesive, sticker, grout-haze, and paint residue removed where it lifts
                          without marking the finish.
                        </p>
                      </div>
                      <div>
                        <h3 className="font-bold text-navy-900">C. Final / handover clean</h3>
                        <p className="mt-1 text-sm leading-relaxed text-slate-700">
                          After snagging and any remedial work: final detailing and touch-ups,
                          glass, fixtures and floors brought to a presentation-ready standard for
                          occupancy or handover.
                        </p>
                      </div>
                    </div>
                    <p>
                      Post-construction cleaning pairs with{" "}
                      <Link href="/services/pressure-washing/" className="font-semibold text-brand-600 hover:underline">
                        exterior pressure washing
                      </Link>{" "}
                      for frontages and compounds, a full{" "}
                      <Link href="/services/deep-cleaning/" className="font-semibold text-brand-600 hover:underline">
                        deep clean
                      </Link>{" "}
                      where a fitted-out space has sat unused, a{" "}
                      <Link href="/services/commercial-facility-cleaning/" className="font-semibold text-brand-600 hover:underline">
                        structured facility cleaning programme
                      </Link>{" "}
                      on larger sites, and an incoming occupier&apos;s{" "}
                      <Link href="/services/commercial-janitorial-cleaning/" className="font-semibold text-brand-600 hover:underline">
                        commercial and janitorial cleaning
                      </Link>{" "}
                      from handover. Our guide to{" "}
                      <Link href="/insights/post-construction-cleaning-guyana/" className="font-semibold text-brand-600 hover:underline">
                        what professional post-construction cleaning involves
                      </Link>{" "}
                      covers scoping and site coordination in more detail. See related work on{" "}
                      <Link href="/our-work/" className="font-semibold text-brand-600 hover:underline">
                        Our Work
                      </Link>
                      , or{" "}
                      <Link href="/quote/" className="font-semibold text-brand-600 hover:underline">
                        request a post-construction cleaning quote
                      </Link>
                      .
                    </p>
                  </div>
                </div>
              )}

              {/* Page-specific: on-site washing + recurring programs for the
                  fleet washing page. Kept in-flow within the overview section. */}
              {service.slug === "fleet-washing" && (
                <div className="mt-12 border-t border-slate-200 pt-10">
                  <SectionHeading
                    eyebrow="On-Site & Scheduled"
                    title="Professional Fleet & Truck Washing Services in Guyana"
                  />
                  <div className="mt-6 space-y-4 text-base leading-relaxed text-slate-700">
                    <p>
                      CDCS Inc. brings the wash to the fleet — mobile fleet washing in Guyana at
                      your depot, yard, business location, or fleet operating point. Our team works
                      through the vehicles where they already park, so drivers and vehicles are not
                      tied up travelling to a wash one at a time. Service is based in Georgetown,
                      with fleet work elsewhere in Guyana arranged around fleet size, location, and
                      operating requirements.
                    </p>
                    <p>Vehicle types CDCS can service on site include:</p>
                    <ul className="grid gap-x-8 gap-y-2 sm:grid-cols-2">
                      {[
                        "Trucks and prime movers",
                        "Canters and delivery vehicles",
                        "Trailers and flatbeds",
                        "Commercial vans and company vehicles",
                        "Buses and crew transport where applicable",
                        "Construction vehicles and equipment where the site allows",
                      ].map((item) => (
                        <li key={item} className="flex items-start gap-2.5 text-sm">
                          <IconCheck className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" />
                          {item}
                        </li>
                      ))}
                    </ul>

                    <h3 className="pt-2 font-bold text-navy-900">Recurring fleet-washing programs</h3>
                    <p>
                      CDCS can prepare a recurring fleet-washing program based on fleet size,
                      vehicle type, location, and required frequency. A program is structured around
                      the number of vehicles, the vehicle types, the washing frequency (weekly,
                      bi-weekly, monthly, or a custom schedule), your operational schedule, the
                      depot or yard location, and the wash scope required — from a straight exterior
                      wash to cab, wheels, trailer, and an undercarriage rinse. One-time washes are
                      available for a specific job, an audit, or a lease return. For a small number
                      of company or pool vehicles on a set monthly schedule,{" "}
                      <Link href="/washcare/#fleet" className="font-semibold text-brand-600 hover:underline">
                        WashCare Fleet
                      </Link>{" "}
                      may be the simpler arrangement.
                    </p>
                    <p>
                      Fleet washing pairs with{" "}
                      <Link href="/services/pressure-washing/" className="font-semibold text-brand-600 hover:underline">
                        pressure washing
                      </Link>{" "}
                      for the yard or apron itself, and{" "}
                      <Link href="/services/mobile-detailing/" className="font-semibold text-brand-600 hover:underline">
                        mobile detailing
                      </Link>{" "}
                      for management or pool vehicles that need an interior and finish detail rather
                      than a wash. Interior premises are covered by{" "}
                      <Link href="/services/commercial-janitorial-cleaning/" className="font-semibold text-brand-600 hover:underline">
                        commercial and janitorial cleaning
                      </Link>{" "}
                      and larger sites by a{" "}
                      <Link href="/services/commercial-facility-cleaning/" className="font-semibold text-brand-600 hover:underline">
                        facility cleaning programme
                      </Link>
                      . Our guide to{" "}
                      <Link href="/insights/commercial-fleet-washing-guyana/" className="font-semibold text-brand-600 hover:underline">
                        how often a commercial vehicle fleet should be washed
                      </Link>{" "}
                      covers frequency by vehicle type. See real fleet work on{" "}
                      <Link href="/our-work/" className="font-semibold text-brand-600 hover:underline">
                        Our Work
                      </Link>
                      ,{" "}
                      <Link href="/quote/" className="font-semibold text-brand-600 hover:underline">
                        request a fleet washing quote
                      </Link>
                      , or ask about a recurring fleet washing program.
                    </p>
                  </div>
                </div>
              )}

              {/* Page-specific: residential + commercial deep cleaning scope.
                  Kept in-flow within the overview section. */}
              {service.slug === "deep-cleaning" && (
                <div className="mt-12 border-t border-slate-200 pt-10">
                  <SectionHeading
                    eyebrow="Homes & Businesses"
                    title="Professional Deep Cleaning Services in Guyana"
                  />
                  <div className="mt-6 space-y-4 text-base leading-relaxed text-slate-700">
                    <p>
                      A deep clean is an intensive one-time clean for a residential or commercial
                      property that needs more detailed attention than a routine visit. Clients
                      usually book one when a property has not been professionally cleaned in a
                      while, for a move-in or move-out, before an inspection, ahead of guests or an
                      event, when a rental is being turned around, to restore things after heavy
                      use, or as the first visit before a recurring commercial cleaning programme
                      begins.
                    </p>

                    <h3 className="pt-2 font-bold text-navy-900">What a deep clean covers</h3>
                    <div className="grid gap-x-8 gap-y-4 sm:grid-cols-3">
                      <div>
                        <p className="text-sm font-bold text-navy-900">Kitchens</p>
                        <p className="mt-1 text-sm leading-relaxed text-slate-700">
                          Counters and surfaces, cabinet and appliance exteriors, sinks and
                          fixtures, degreasing where required, floors, and hard-to-reach areas.
                        </p>
                      </div>
                      <div>
                        <p className="text-sm font-bold text-navy-900">Bathrooms &amp; washrooms</p>
                        <p className="mt-1 text-sm leading-relaxed text-slate-700">
                          Toilets, sinks, and fixtures, tiled surfaces and shower areas where
                          applicable, grout detailing, floors, and detailed sanitation.
                        </p>
                      </div>
                      <div>
                        <p className="text-sm font-bold text-navy-900">General areas</p>
                        <p className="mt-1 text-sm leading-relaxed text-slate-700">
                          Floors, baseboards and skirting, doors and frames, vents, fittings, and
                          ledges, detailed dust removal, and wall spot-cleaning where the finish
                          allows.
                        </p>
                      </div>
                    </div>
                    <p className="text-sm text-slate-600">
                      A deep clean does not restore damaged surfaces or guarantee removal of set-in
                      stains — where a mark or finish cannot be safely recovered, we say so before
                      starting.
                    </p>

                    <h3 className="pt-2 font-bold text-navy-900">Commercial deep cleaning</h3>
                    <p>
                      For offices, commercial buildings, institutions, and rental properties, a deep
                      clean establishes a clean baseline — before an inspection, before occupancy,
                      or right before a{" "}
                      <Link href="/services/commercial-janitorial-cleaning/" className="font-semibold text-brand-600 hover:underline">
                        recurring janitorial programme
                      </Link>{" "}
                      begins, so the routine schedule starts from a genuinely clean starting point
                      rather than catching up over several visits. For a newly built or fitted-out
                      space, the right first step is{" "}
                      <Link href="/services/post-construction-cleaning/" className="font-semibold text-brand-600 hover:underline">
                        post-construction cleaning
                      </Link>
                      , and larger multi-site properties are served by a{" "}
                      <Link href="/services/commercial-facility-cleaning/" className="font-semibold text-brand-600 hover:underline">
                        facility cleaning programme
                      </Link>
                      .
                    </p>

                    <h3 className="pt-2 font-bold text-navy-900">Residential deep cleaning</h3>
                    <p>
                      CDCS Inc. deep cleans houses, apartments, and rental properties — including
                      move-in and move-out cleans where the home needs to be handed over or taken on
                      in good condition.
                    </p>

                    <p>
                      Some specialist work is quoted separately or combined with a deep clean where
                      it is needed:{" "}
                      <Link href="/services/upholstery-fabric-extraction/" className="font-semibold text-brand-600 hover:underline">
                        carpet and upholstery extraction
                      </Link>{" "}
                      for soiled fabric, and{" "}
                      <Link href="/services/pressure-washing/" className="font-semibold text-brand-600 hover:underline">
                        pressure washing
                      </Link>{" "}
                      for exterior areas. Our guide to{" "}
                      <Link href="/insights/commercial-deep-cleaning-guyana/" className="font-semibold text-brand-600 hover:underline">
                        what a commercial deep clean involves and when to book one
                      </Link>{" "}
                      goes into more detail. See related work on{" "}
                      <Link href="/our-work/" className="font-semibold text-brand-600 hover:underline">
                        Our Work
                      </Link>
                      , or{" "}
                      <Link href="/quote/" className="font-semibold text-brand-600 hover:underline">
                        request a deep cleaning quote
                      </Link>
                      .
                    </p>
                  </div>
                </div>
              )}

              {/* Page-specific: surface types + commercial/residential/vehicle
                  positioning for the carpet & upholstery page. Kept in-flow
                  within the overview section. */}
              {service.slug === "upholstery-fabric-extraction" && (
                <div className="mt-12 border-t border-slate-200 pt-10">
                  <SectionHeading
                    eyebrow="What We Clean"
                    title="Professional Carpet & Upholstery Cleaning in Guyana"
                  />
                  <div className="mt-6 space-y-4 text-base leading-relaxed text-slate-700">
                    <p>
                      CDCS Inc. provides hot-water extraction cleaning — the process most people
                      call steam cleaning — for fabric surfaces in offices, homes, and vehicles:
                    </p>
                    <ul className="grid gap-x-8 gap-y-2 sm:grid-cols-2">
                      {[
                        "Office and commercial carpets",
                        "Task, executive, and reception chairs",
                        "Sofas and lounge furniture",
                        "Waiting-area and event seating",
                        "Fabric seats and upholstered furniture",
                        "Vehicle seats and interior carpet",
                      ].map((item) => (
                        <li key={item} className="flex items-start gap-2.5 text-sm">
                          <IconCheck className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" />
                          {item}
                        </li>
                      ))}
                    </ul>

                    <h3 className="pt-2 font-bold text-navy-900">Commercial carpet &amp; upholstery cleaning</h3>
                    <p>
                      For offices, corporate facilities, conference and reception areas, hospitality
                      venues, and institutions, multiple chairs, carpeted areas, and upholstered
                      furniture can be quoted together as a single commercial cleaning project,
                      scheduled around your operating hours. It fits alongside a{" "}
                      <Link href="/services/commercial-janitorial-cleaning/" className="font-semibold text-brand-600 hover:underline">
                        recurring janitorial programme
                      </Link>{" "}
                      or a{" "}
                      <Link href="/services/deep-cleaning/" className="font-semibold text-brand-600 hover:underline">
                        deep clean
                      </Link>
                      .
                    </p>

                    <h3 className="pt-2 font-bold text-navy-900">Residential carpet &amp; upholstery cleaning</h3>
                    <p>
                      For homes, CDCS Inc. cleans sofas, upholstered chairs, carpets, and fabric
                      furniture. Fabric is inspected first, high-traffic lanes and visible marks are
                      pre-treated, and how much lifts depends on the fabric type, the type and age
                      of the staining, any previous treatments, and the condition of the fibre — we
                      give an honest read before starting and do not guarantee full stain removal.
                    </p>

                    <h3 className="pt-2 font-bold text-navy-900">Vehicle seats and interior carpet</h3>
                    <p>
                      Extraction cleaning of car and vehicle seats and interior carpet is part of
                      this service. If you want a full interior and exterior vehicle service rather
                      than fabric cleaning alone,{" "}
                      <Link href="/services/mobile-detailing/" className="font-semibold text-brand-600 hover:underline">
                        mobile detailing
                      </Link>{" "}
                      is the better fit and can include the same fabric extraction.
                    </p>

                    <p>
                      Our guide to{" "}
                      <Link href="/insights/carpet-upholstery-cleaning-guyana/" className="font-semibold text-brand-600 hover:underline">
                        how often commercial carpets and upholstery should be cleaned
                      </Link>{" "}
                      covers frequency by area and furniture type. See before-and-after work on{" "}
                      <Link href="/our-work/" className="font-semibold text-brand-600 hover:underline">
                        Our Work
                      </Link>
                      ,{" "}
                      <Link href="/quote/" className="font-semibold text-brand-600 hover:underline">
                        request a carpet &amp; upholstery cleaning quote
                      </Link>
                      , or{" "}
                      <Link href="/contact/" className="font-semibold text-brand-600 hover:underline">
                        contact the CDCS Inc. team
                      </Link>
                      .
                    </p>
                  </div>
                </div>
              )}

              {/* Page-specific: vehicle-service distinctions, wash options, and
                  the WashCare recurring programme for the car-wash page. Kept
                  in-flow within the overview section. */}
              {service.slug === "car-wash-mobile-vehicle-washing" && (
                <div className="mt-12 border-t border-slate-200 pt-10">
                  <SectionHeading
                    eyebrow="Which Service"
                    title="Car Wash, Detailing or Fleet Washing — Which Do You Need?"
                  />
                  <div className="mt-6 space-y-4 text-base leading-relaxed text-slate-700">
                    <p>
                      CDCS Inc. runs four related vehicle services. This page covers routine
                      washing; the others handle heavier or higher-volume work.
                    </p>
                    <dl className="grid gap-x-8 gap-y-5 sm:grid-cols-2">
                      <div>
                        <dt className="font-bold text-navy-900">Car / vehicle washing</dt>
                        <dd className="mt-1 text-sm leading-relaxed text-slate-700">
                          Routine exterior, or interior and exterior, washing to keep a vehicle
                          presentable — the regular service on this page.
                        </dd>
                      </div>
                      <div>
                        <dt className="font-bold text-navy-900">Mobile vehicle washing</dt>
                        <dd className="mt-1 text-sm leading-relaxed text-slate-700">
                          The same wash, brought to your home or workplace in Georgetown where
                          scheduling and logistics permit, instead of a drop-off.
                        </dd>
                      </div>
                      <div>
                        <dt className="font-bold text-navy-900">
                          <Link
                            href="/services/mobile-detailing/"
                            className="text-brand-600 hover:underline"
                          >
                            Mobile detailing
                          </Link>
                        </dt>
                        <dd className="mt-1 text-sm leading-relaxed text-slate-700">
                          More intensive vehicle care — machine polishing, paint correction,
                          headlight restoration, engine-bay cleaning, and deep interior fabric
                          extraction.
                        </dd>
                      </div>
                      <div>
                        <dt className="font-bold text-navy-900">
                          <Link
                            href="/services/fleet-washing/"
                            className="text-brand-600 hover:underline"
                          >
                            Fleet washing
                          </Link>
                        </dt>
                        <dd className="mt-1 text-sm leading-relaxed text-slate-700">
                          Recurring, on-site washing for several company vehicles, trucks, or a
                          whole fleet at your depot or yard.
                        </dd>
                      </div>
                    </dl>
                    <p className="text-sm text-slate-600">
                      Not sure which fits? Get a{" "}
                      <Link href="/estimate/" className="font-semibold text-brand-600 hover:underline">
                        preliminary estimate
                      </Link>{" "}
                      or{" "}
                      <Link href="/quote/" className="font-semibold text-brand-600 hover:underline">
                        request a quote
                      </Link>{" "}
                      with the vehicle details and we&apos;ll confirm the right service.
                    </p>

                    <h3 className="pt-2 font-bold text-navy-900">Ways CDCS washes vehicles</h3>
                    <ul className="grid gap-x-8 gap-y-2 sm:grid-cols-2">
                      {[
                        "Exterior vehicle washing — body, glass, wheels, tyres, and trim",
                        "Interior & exterior washing — adds vacuuming, seats, mats, and surfaces",
                        "Mobile vehicle washing — we come to your home or workplace",
                        "Washbay vehicle washing — drop the vehicle at CDCS",
                        "SUV & pickup washing — priced to the larger body and ride height",
                        "Truck & commercial-vehicle washing — single vehicles here, fleets via fleet washing",
                        "WashCare recurring washing — the same wash on a set monthly schedule",
                      ].map((item) => (
                        <li key={item} className="flex items-start gap-2.5 text-sm">
                          <IconCheck className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" />
                          {item}
                        </li>
                      ))}
                    </ul>
                    <p className="text-sm text-slate-600">
                      Each option is part of this one service — there is no separate booking path
                      for each. Tell us the vehicle and the wash you want and CDCS Inc. matches the
                      package to it.
                    </p>

                    <h3 className="pt-4 font-bold text-navy-900">WashCare Recurring Vehicle Washing</h3>
                    <p>
                      WashCare is CDCS Inc.&apos;s recurring vehicle-washing programme. Instead of
                      booking each wash, an eligible vehicle is washed on a set monthly schedule —
                      at the CDCS washbay or by mobile service where available — so it stays
                      consistently clean and recurring vehicle care is easier to plan.
                    </p>
                    <ul className="grid gap-x-8 gap-y-2 sm:grid-cols-2">
                      {[
                        "Scheduled recurring service — a fixed number of washes each month",
                        "A consistent vehicle appearance week to week",
                        "Washbay or mobile options where applicable",
                        "Suitable for eligible private vehicles",
                        "Commercial and fleet arrangements handled separately",
                        "Simpler recurring vehicle-care planning and one monthly figure",
                      ].map((item) => (
                        <li key={item} className="flex items-start gap-2.5 text-sm">
                          <IconCheck className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" />
                          {item}
                        </li>
                      ))}
                    </ul>
                    <p>
                      The CDCS estimator carries the approved WashCare plans and returns a
                      preliminary monthly figure for your vehicle and wash frequency. Fleet and
                      large-volume WashCare programmes are scoped separately with{" "}
                      <Link href="/services/fleet-washing/" className="font-semibold text-brand-600 hover:underline">
                        fleet washing
                      </Link>
                      . See the full{" "}
                      <Link href="/washcare/" className="font-semibold text-brand-600 hover:underline">
                        WashCare plans and pricing
                      </Link>{" "}
                      for Bay, Mobile, and Fleet.
                    </p>
                    <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                      <Button
                        href="/estimate/?service=mobile-detailing&washcare=1"
                        variant="primary"
                        size="lg"
                        icon={<IconArrowRight className="h-5 w-5" />}
                      >
                        Estimate Your WashCare Plan
                      </Button>
                      <Button href="/quote/" variant="ghost" size="lg">
                        Request a Custom WashCare Plan
                      </Button>
                    </div>

                    <p className="pt-2 text-sm text-slate-600">
                      Based in Georgetown and serving customers across Guyana where scheduling and
                      logistics permit. See recent vehicle work on{" "}
                      <Link href="/our-work/" className="font-semibold text-brand-600 hover:underline">
                        Our Work
                      </Link>
                      , read{" "}
                      <Link
                        href="/insights/mobile-car-wash-vs-detailing-guyana/"
                        className="font-semibold text-brand-600 hover:underline"
                      >
                        mobile car wash vs mobile detailing
                      </Link>
                      , or{" "}
                      <Link href="/estimate/" className="font-semibold text-brand-600 hover:underline">
                        estimate a vehicle wash
                      </Link>
                      .
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* ================= IDEAL FOR / WHAT'S INCLUDED ================= */}
      <section className="bg-white py-16 sm:py-24">
        <div className="container-page grid gap-8 lg:grid-cols-[minmax(0,22rem)_1fr] lg:gap-12">
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 sm:p-8">
            <SectionHeading eyebrow="Who It's For" title="Ideal For" />
            <ul className="mt-6 flex flex-wrap gap-2">
              {service.idealFor.map((item) => (
                <li
                  key={item}
                  className="rounded-full border border-slate-300 bg-white px-3.5 py-1.5 text-sm font-medium text-navy-800"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-slate-200 p-6 sm:p-8">
            <SectionHeading eyebrow="Scope of Service" title="What's Included" />
            <ul className="mt-6 grid gap-x-8 gap-y-3 sm:grid-cols-2">
              {service.whatsIncluded.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm leading-relaxed text-slate-700">
                  <IconCheck className="mt-0.5 h-5 w-5 shrink-0 text-brand-600" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ================= PROCESS (optional per-service) ================= */}
      {service.process && (
        <section className="bg-slate-50 py-16 sm:py-24">
          <div className="container-page">
            <SectionHeading eyebrow="Our Approach" title={`How We Deliver ${service.title}`} align="center" />
            <ol className="mx-auto mt-12 max-w-3xl space-y-4">
              {service.process.map((step, i) => (
                <li
                  key={i}
                  className="flex gap-4 rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-navy-900 text-sm font-bold text-white">
                    {i + 1}
                  </span>
                  <p className="self-center text-sm leading-relaxed text-slate-700">{step}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>
      )}

      {/* ================= RECENT WORK ================= */}
      {gallery.length > 0 ? (
        <section className="relative overflow-hidden bg-navy-950 py-16 sm:py-24">
          <div className="pointer-events-none absolute inset-0 bg-grid-dark opacity-40" aria-hidden />
          <div className="container-page relative">
            <SectionHeading
              eyebrow="Our Work"
              title={`${service.title} — Recent Projects`}
              description="Photos from real CDCS Inc. jobs. More on the Our Work page."
              light
            />
            <div className="mt-10 gap-4 sm:columns-2 lg:columns-3">
              {gallery.map((image) => (
                <figure
                  key={image.file}
                  className="group relative mb-4 break-inside-avoid overflow-hidden rounded-xl border border-white/10 [&_img]:block [&_img]:w-full"
                >
                  <ProjectImage image={image} className="w-full" />
                  <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-navy-950 via-navy-950/65 to-transparent p-4 pt-12">
                    {image.beforeAfter && (
                      <span className="mr-2 inline-block rounded bg-accent-500 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-navy-950">
                        Before / After
                      </span>
                    )}
                    <span className="text-sm font-medium leading-snug text-white">{image.caption}</span>
                  </figcaption>
                </figure>
              ))}
            </div>
            <div className="mt-8">
              <Button
                href={`/our-work/#${service.slug}`}
                variant="outline"
                size="md"
                icon={<IconArrowRight className="h-4 w-4" />}
              >
                See more of our work
              </Button>
            </div>
          </div>
        </section>
      ) : (
        <section className="relative overflow-hidden bg-navy-950 py-16 sm:py-24">
          <div className="pointer-events-none absolute inset-0 bg-grid-dark opacity-40" aria-hidden />
          <div className="container-page relative">
            <SectionHeading
              eyebrow="Our Work"
              title={galleryFallback.title}
              description={galleryFallback.description}
              light
            />
            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              {relatedWork.map((image) => (
                <figure
                  key={image.file}
                  className="group relative overflow-hidden rounded-xl border border-white/10 bg-navy-900"
                >
                  <div className="aspect-[4/5] overflow-hidden">
                    <ProjectImage image={image} className="h-full w-full object-cover" />
                  </div>
                  <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-navy-950 via-navy-950/65 to-transparent p-4 pt-12">
                    <span className="inline-block rounded bg-accent-500 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-navy-950">
                      {categoryLabel(image)}
                    </span>
                    <p className="mt-2 text-sm font-medium leading-snug text-white">{image.caption}</p>
                  </figcaption>
                </figure>
              ))}
            </div>
            <div className="mt-8">
              <Button href="/our-work/" variant="outline" size="md" icon={<IconArrowRight className="h-4 w-4" />}>
                View Our Work
              </Button>
            </div>
          </div>
        </section>
      )}

      {/* FAQ (optional per-service) */}
      {service.faq && <Faq items={service.faq} />}

      {/* Insights / resources — helpful context, kept subordinate to the CTA */}
      {relatedInsights.length > 0 && (
        <section className="bg-white pb-4 pt-16 sm:pt-24">
          <div className="container-page">
            <div className="mx-auto max-w-3xl rounded-2xl border border-slate-200 bg-slate-50 p-6 sm:p-8">
              <p className="flex items-center gap-2.5 text-xs font-bold uppercase tracking-[0.22em] text-brand-600">
                <span className="h-px w-6 bg-brand-600/50" aria-hidden />
                From CDCS Insights
              </p>
              <ul className="mt-5 space-y-5">
                {relatedInsights.map((a) => (
                  <li key={a.slug}>
                    <Link
                      href={`/insights/${a.slug}/`}
                      className="group block"
                    >
                      <h3 className="text-base font-bold leading-snug text-navy-900 group-hover:text-brand-700">
                        {a.title}
                      </h3>
                      <p className="mt-1.5 text-sm leading-relaxed text-slate-600">{a.excerpt}</p>
                      <span className="mt-2 inline-flex items-center gap-1.5 text-sm font-bold text-brand-600 group-hover:text-brand-700">
                        Read the guide
                        <IconArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      )}

      {/* Related services */}
      <section className="bg-slate-50 py-16 sm:py-24">
        <div className="container-page">
          <SectionHeading
            eyebrow="Explore More"
            title="Related Cleaning Services"
            description="Other CDCS Inc. services businesses in Guyana often combine with this one."
          />
          <div className="mt-10 grid gap-6 sm:grid-cols-3">
            {related.map((s) => (
              <ServiceCard key={s.slug} service={s} />
            ))}
          </div>
        </div>
      </section>

      <CTABanner
        title={service.ctaTitle ?? `Ready to Schedule ${service.title}?`}
        description="Request a quote and our team will confirm the details and provide a clear service proposal."
      />
    </>
  );
}
