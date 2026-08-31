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
import { serviceHeroImage, serviceGalleryImages } from "@/lib/project-images";
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
  const related = (
    service.relatedSlugs
      ?.map((s) => getServiceBySlug(s))
      .filter((s): s is NonNullable<typeof s> => Boolean(s)) ??
    services.filter((s) => s.slug !== service.slug)
  ).slice(0, 3);

  const serviceUrl = `${siteConfig.url}/services/${service.slug}/`;

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      serviceType: service.title,
      name: service.title,
      description: service.metaDescription,
      url: serviceUrl,
      provider: {
        "@type": "ProfessionalService",
        "@id": `${siteConfig.url}/#business`,
        name: siteConfig.companyName,
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

      {/* Hero */}
      <section className="bg-navy-950 py-14 sm:py-20">
        <div className="container-page grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <nav className="mb-5 text-xs font-semibold text-slate-400" aria-label="Breadcrumb">
              <Link href="/" className="hover:text-accent-400">Home</Link>
              <span className="mx-2">/</span>
              <Link href="/services/" className="hover:text-accent-400">Services</Link>
              <span className="mx-2">/</span>
              <span className="text-slate-300">{service.title}</span>
            </nav>
            <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-lg bg-accent-500/15 text-accent-400">
              {Icon && <Icon className="h-7 w-7" />}
            </div>
            <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl">{service.h1}</h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-slate-300 sm:text-lg">{service.intro}</p>
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
            <ProjectImage
              image={heroImage}
              priority
              className="w-full rounded-2xl object-cover shadow-lg shadow-black/30"
            />
          ) : (
            <PlaceholderMedia label={service.heroPlaceholderLabel} ratio="square" className="lg:aspect-[4/5]" />
          )}
        </div>
      </section>

      {/* Ideal for / What's included */}
      <section className="bg-white py-16 sm:py-24">
        <div className="container-page grid gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading eyebrow="Who It's For" title="Ideal For" />
            <ul className="mt-6 space-y-3">
              {service.idealFor.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm leading-relaxed text-slate-700 sm:text-base">
                  <IconCheck className="mt-0.5 h-5 w-5 shrink-0 text-brand-600" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <SectionHeading eyebrow="Scope of Service" title="What's Included" />
            <ul className="mt-6 space-y-3">
              {service.whatsIncluded.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm leading-relaxed text-slate-700 sm:text-base">
                  <IconCheck className="mt-0.5 h-5 w-5 shrink-0 text-accent-600" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Process (optional per-service) */}
      {service.process && (
        <section className="bg-slate-50 py-16 sm:py-24">
          <div className="container-page">
            <SectionHeading eyebrow="Our Approach" title={`How We Deliver ${service.title}`} align="center" />
            <div className="mx-auto mt-12 grid max-w-4xl gap-6 sm:grid-cols-2">
              {service.process.map((step, i) => (
                <div key={i} className="flex gap-4 rounded-xl border border-slate-200 bg-white p-5">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-navy-900 text-sm font-bold text-white">
                    {i + 1}
                  </span>
                  <p className="text-sm leading-relaxed text-slate-700">{step}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Recent work */}
      {gallery.length > 0 ? (
        <section className="bg-white py-16 sm:py-24">
          <div className="container-page">
            <SectionHeading
              eyebrow="Our Work"
              title={`${service.title} — Recent Projects`}
              description="Photos from real CDCS Inc. jobs. More on the Our Work page."
            />
            <div className="mt-10 gap-5 sm:columns-2">
              {gallery.map((image) => (
                <figure
                  key={image.file}
                  className="mb-5 break-inside-avoid overflow-hidden rounded-xl border border-slate-200 shadow-sm"
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
            <div className="mt-8 text-center">
              <Button
                href={`/our-work/#${service.slug}`}
                variant="ghost"
                size="md"
                icon={<IconArrowRight className="h-4 w-4" />}
              >
                See more of our work
              </Button>
            </div>
          </div>
        </section>
      ) : (
        <section className="bg-white py-14 sm:py-16">
          <div className="container-page">
            <div className="mx-auto max-w-3xl rounded-2xl border border-slate-200 bg-brand-50 p-8 text-center sm:p-10">
              <h2 className="text-xl font-bold text-navy-900 sm:text-2xl">See CDCS Work in Progress</h2>
              <p className="mt-3 text-sm leading-relaxed text-slate-600 sm:text-base">
                Photos from completed CDCS Inc. cleaning, pressure washing, fleet washing, and
                detailing projects across Guyana.
              </p>
              <div className="mt-6">
                <Button href="/our-work/" size="md" icon={<IconArrowRight className="h-4 w-4" />}>
                  View Our Work
                </Button>
              </div>
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
