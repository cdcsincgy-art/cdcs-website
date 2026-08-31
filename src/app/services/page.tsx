import type { Metadata } from "next";
import Link from "next/link";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ServiceCard } from "@/components/ServiceCard";
import { CTABanner } from "@/components/CTABanner";
import { services } from "@/lib/services-data";
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

export default function ServicesPage() {
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
            <span className="text-slate-300">Services</span>
          </nav>
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-accent-400">Our Services</p>
          <h1 className="max-w-2xl text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
            Commercial Cleaning &amp; Facility Services, Built for Guyana&apos;s Businesses
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-slate-300 sm:text-lg">
            Every service below can be delivered as a one-time project or a recurring contract,
            scaled to your property, fleet, or facility in Georgetown or anywhere in Guyana.
          </p>
        </div>
      </section>

      <section className="bg-white py-14 sm:py-16">
        <div className="container-page">
          <div className="mx-auto max-w-3xl text-base leading-relaxed text-slate-700 sm:text-lg">
            <p>
              CDCS Inc. is a Georgetown-based cleaning company. Most clients start with{" "}
              <Link href="/services/commercial-janitorial-cleaning/" className="font-semibold text-brand-600 hover:underline">
                commercial &amp; janitorial cleaning
              </Link>{" "}
              for offices and institutions, then add services such as{" "}
              <Link href="/services/deep-cleaning/" className="font-semibold text-brand-600 hover:underline">
                deep cleaning
              </Link>
              ,{" "}
              <Link href="/services/pressure-washing/" className="font-semibold text-brand-600 hover:underline">
                pressure washing
              </Link>
              , or{" "}
              <Link href="/services/post-construction-cleaning/" className="font-semibold text-brand-600 hover:underline">
                post-construction cleaning
              </Link>{" "}
              as their needs change.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-16 sm:py-24">
        <div className="container-page">
          <SectionHeading eyebrow="What We Offer" title="Our Full Range of Services" />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((service) => (
              <ServiceCard key={service.slug} service={service} />
            ))}
          </div>
        </div>
      </section>

      <CTABanner />
    </>
  );
}
