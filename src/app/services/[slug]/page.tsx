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
import {
  serviceHeroImage,
  serviceGalleryImages,
  categoryForService,
  categoryLabel,
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
    title: service.metaTitle,
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
  // For services without their own photo set yet, show related commercial
  // cleaning work rather than a bare card.
  const relatedWork =
    gallery.length === 0
      ? (categoryForService("commercial-janitorial-cleaning")?.images ?? [])
          .filter((img) => img.file !== heroImage?.file)
          .slice(0, 3)
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
              title="CDCS Work in Progress"
              description="We're adding dedicated photos for this service. In the meantime, here is related CDCS Inc. commercial cleaning work across Guyana."
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
        title={`Ready to Schedule ${service.title}?`}
        description="Request a quote and our team will confirm the details and provide a clear service proposal."
      />
    </>
  );
}
