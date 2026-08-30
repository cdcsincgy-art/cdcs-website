import type { Metadata } from "next";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ServiceCard } from "@/components/ServiceCard";
import { CTABanner } from "@/components/CTABanner";
import { services } from "@/lib/services-data";

export const metadata: Metadata = {
  title: "Our Services | Commercial Cleaning, Pressure Washing & More",
  description:
    "Explore CDCS Inc.'s full range of commercial cleaning, pressure washing, fleet washing, mobile detailing, and facility-support services across Guyana.",
  alternates: { canonical: "/services/" },
};

export default function ServicesPage() {
  return (
    <>
      <section className="bg-navy-950 py-16 sm:py-20">
        <div className="container-page">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-accent-400">Our Services</p>
          <h1 className="max-w-2xl text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
            Commercial Cleaning &amp; Facility Services, Built for Guyana&apos;s Businesses
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-slate-300 sm:text-lg">
            Every service below can be delivered as a one-time project or a recurring contract,
            scaled to your property, fleet, or facility.
          </p>
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
