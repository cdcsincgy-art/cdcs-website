import type { Metadata } from "next";
import Link from "next/link";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CTABanner } from "@/components/CTABanner";
import { DeliveryModel } from "@/components/DeliveryModel";
import { ProjectImage } from "@/components/ProjectImage";
import { whyChooseUs } from "@/lib/content-data";
import { aboutImage } from "@/lib/project-images";
import { iconMap } from "@/components/icons";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: { absolute: "About CDCS Inc. — Cleaning Company in Guyana" },
  description:
    "Capital Detailing & Cleaning Services Inc. (CDCS Inc.) — a Guyana-based commercial cleaning, pressure washing, and facility-support company for businesses.",
  alternates: { canonical: "/about/" },
};

export default function AboutPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-navy-950 py-16 sm:py-20">
        <div className="pointer-events-none absolute inset-0 bg-grid-dark opacity-50" aria-hidden />
        <div className="pointer-events-none absolute inset-0 brand-glow opacity-80" aria-hidden />
        <div className="container-page relative">
          <p className="mb-4 flex items-center gap-2.5 text-xs font-bold uppercase tracking-[0.22em] text-accent-400">
            <span className="h-px w-6 bg-accent-400/60" aria-hidden />
            About CDCS
          </p>
          <h1 className="max-w-3xl text-pretty text-4xl font-extrabold leading-[1.1] tracking-tight text-white sm:text-5xl">
            A Commercial Cleaning &amp; Facility-Services Company Built for Guyana&apos;s Businesses
          </h1>
        </div>
      </section>

      <section className="bg-white py-16 sm:py-24">
        <div className="container-page grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
          <div>
            <SectionHeading eyebrow="Who We Are" title="Capital Detailing & Cleaning Services Inc." />
            <div className="mt-6 space-y-4 text-base leading-relaxed text-slate-700">
              <p>
                {siteConfig.companyName}, operating as {siteConfig.brandName}, is a
                Georgetown-based company providing professional cleaning, detailing, pressure
                washing, and facility-support services to businesses, organizations, government
                agencies, commercial properties, fleets, and individual clients throughout Guyana.
              </p>
              <p>
                We work with corporate offices, property managers, restaurants, retail
                businesses, warehouses, construction companies, transportation and logistics
                operators, and organizations that require recurring{" "}
                <Link href="/services/commercial-janitorial-cleaning/" className="font-semibold text-brand-600 hover:underline">
                  janitorial services
                </Link>{" "}
                — as well as individual vehicle owners looking for premium mobile detailing.
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
          <div className="relative rounded-2xl border border-navy-900/10 bg-white p-2 shadow-xl shadow-navy-900/10">
            <span
              aria-hidden
              className="absolute -right-3 -top-3 hidden h-16 w-16 rounded-tr-2xl border-r-2 border-t-2 border-accent-500/70 sm:block"
            />
            <div className="overflow-hidden rounded-xl">
              <ProjectImage image={aboutImage} className="w-full object-cover" />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-16 sm:py-24">
        <div className="container-page">
          <SectionHeading eyebrow="Our Standards" title="How We Operate" align="center" />
          <dl className="mx-auto mt-12 grid max-w-4xl gap-x-10 gap-y-1 sm:grid-cols-2">
            {whyChooseUs.map((item) => {
              const Icon = iconMap[item.icon];
              return (
                <div
                  key={item.title}
                  className="flex gap-4 border-b border-slate-200 py-5"
                >
                  <span className="mt-0.5 shrink-0 text-brand-600">
                    {Icon && <Icon className="h-5 w-5" />}
                  </span>
                  <div>
                    <dt className="font-bold text-navy-900">{item.title}</dt>
                    <dd className="mt-1 text-sm leading-relaxed text-slate-600">{item.description}</dd>
                  </div>
                </div>
              );
            })}
          </dl>
          <div className="mx-auto mt-14 max-w-4xl rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <DeliveryModel />
          </div>
        </div>
      </section>

      <section className="bg-white py-16 sm:py-24">
        <div className="container-page">
          <div className="mx-auto max-w-3xl border-l-4 border-accent-500 pl-6 sm:pl-8">
            <h2 className="text-xs font-bold uppercase tracking-[0.22em] text-brand-600">Our Mission</h2>
            <p className="mt-4 text-xl font-medium leading-relaxed text-navy-900 sm:text-2xl">
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
