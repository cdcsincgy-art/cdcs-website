import type { Metadata } from "next";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PlaceholderMedia } from "@/components/ui/PlaceholderMedia";
import { CTABanner } from "@/components/CTABanner";
import { whyChooseUs } from "@/lib/content-data";
import { iconMap } from "@/components/icons";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "About Us | Commercial Cleaning Company in Guyana",
  description:
    "CDCS Inc. (Capital Detailing & Cleaning Services Inc.) is a Guyana-based commercial cleaning, pressure washing, and facility-support company built to serve businesses, organizations, and government agencies.",
  alternates: { canonical: "/about/" },
};

export default function AboutPage() {
  return (
    <>
      <section className="bg-navy-950 py-16 sm:py-20">
        <div className="container-page">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-accent-400">About CDCS</p>
          <h1 className="max-w-2xl text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
            A Commercial Cleaning &amp; Facility-Services Company Built for Guyana&apos;s Businesses
          </h1>
        </div>
      </section>

      <section className="bg-white py-16 sm:py-24">
        <div className="container-page grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <SectionHeading eyebrow="Who We Are" title="Capital Detailing & Cleaning Services Inc." />
            <div className="mt-6 space-y-4 text-base leading-relaxed text-slate-700">
              <p>
                {siteConfig.companyName}, operating as {siteConfig.brandName}, provides
                professional cleaning, detailing, pressure washing, and facility-support services
                to businesses, organizations, government agencies, commercial properties, fleets,
                and individual clients throughout Guyana.
              </p>
              <p>
                We work with corporate offices, property managers, restaurants, retail
                businesses, warehouses, construction companies, transportation and logistics
                operators, and organizations that require recurring janitorial services — as well
                as individual vehicle owners looking for premium mobile detailing.
              </p>
              <p>
                Our approach is built around organized service delivery: defined scopes of work,
                trained cleaning teams, professional-grade equipment, and scheduling that fits
                around your operation rather than disrupting it. Whether you need a single
                project completed or an ongoing service contract managed, CDCS is structured to
                support it.
              </p>
            </div>
          </div>
          <PlaceholderMedia label="CDCS team or equipment photo — company profile" ratio="square" />
        </div>
      </section>

      <section className="bg-slate-50 py-16 sm:py-24">
        <div className="container-page">
          <SectionHeading eyebrow="Our Standards" title="How We Operate" align="center" />
          <div className="mx-auto mt-12 grid max-w-5xl gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {whyChooseUs.map((item) => {
              const Icon = iconMap[item.icon];
              return (
                <div key={item.title} className="rounded-xl border border-slate-200 bg-white p-6">
                  <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
                    {Icon && <Icon className="h-5 w-5" />}
                  </div>
                  <h3 className="mt-4 font-bold text-navy-900">{item.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-slate-600">{item.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-white py-16 sm:py-24">
        <div className="container-page">
          <div className="mx-auto max-w-3xl rounded-2xl border border-slate-200 bg-brand-50 p-8 text-center sm:p-12">
            <h2 className="text-2xl font-bold text-navy-900 sm:text-3xl">Our Mission</h2>
            <p className="mt-4 text-base leading-relaxed text-slate-700 sm:text-lg">
              To give organizations and property owners throughout Guyana a dependable,
              professional cleaning and facility-services partner — one that treats every
              contract, large or small, with the same standard of care and attention to detail.
            </p>
          </div>
        </div>
      </section>

      <CTABanner
        title="Ready to Work With CDCS?"
        description="Tell us about your property, fleet, or facility and we'll help you build the right service plan."
      />
    </>
  );
}
