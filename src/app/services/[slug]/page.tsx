import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { PlaceholderMedia } from "@/components/ui/PlaceholderMedia";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CTABanner } from "@/components/CTABanner";
import { ServiceCard } from "@/components/ServiceCard";
import { services, getServiceBySlug } from "@/lib/services-data";
import { serviceIconMap, IconCheck, IconArrowRight } from "@/components/icons";
import { siteConfig } from "@/lib/site-config";

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
      title: service.metaTitle,
      description: service.metaDescription,
    },
  };
}

export default async function ServiceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) notFound();

  const Icon = serviceIconMap[service.icon];
  const related = services.filter((s) => s.slug !== service.slug).slice(0, 3);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: service.title,
    name: service.title,
    description: service.metaDescription,
    provider: {
      "@type": "ProfessionalService",
      name: siteConfig.companyName,
      telephone: siteConfig.contact.phoneDisplay,
      email: siteConfig.contact.email,
    },
    areaServed: {
      "@type": "Country",
      name: "Guyana",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
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
          <PlaceholderMedia label={service.heroPlaceholderLabel} ratio="square" className="lg:aspect-[4/5]" />
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

      {/* Gallery placeholder */}
      <section className="bg-white py-16 sm:py-24">
        <div className="container-page">
          <SectionHeading eyebrow="Recent Work" title={`${service.title} — Before & After`} />
          <div className="mt-10 grid gap-5 sm:grid-cols-3">
            <PlaceholderMedia label={`${service.title} — before/after photo 1`} ratio="square" />
            <PlaceholderMedia label={`${service.title} — before/after photo 2`} ratio="square" />
            <PlaceholderMedia label={`${service.title} — before/after photo 3`} ratio="square" />
          </div>
        </div>
      </section>

      {/* Related services */}
      <section className="bg-slate-50 py-16 sm:py-24">
        <div className="container-page">
          <SectionHeading eyebrow="Explore More" title="Related Services" />
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
