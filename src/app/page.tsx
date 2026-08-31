import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PlaceholderMedia } from "@/components/ui/PlaceholderMedia";
import { ServiceCard } from "@/components/ServiceCard";
import { CTABanner } from "@/components/CTABanner";
import { services } from "@/lib/services-data";
import { trustPoints, whyChooseUs, industries, processSteps, portfolioItems } from "@/lib/content-data";
import { iconMap, IconArrowRight, IconWhatsapp, IconCheck } from "@/components/icons";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: {
    absolute: "Commercial Cleaning & Janitorial Services in Guyana | CDCS Inc.",
  },
  description:
    "CDCS Inc. is a Georgetown cleaning company — commercial and janitorial cleaning, pressure washing, fleet washing, and mobile detailing for businesses across Guyana.",
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden bg-navy-950">
        <div
          className="pointer-events-none absolute inset-0 opacity-50"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 10%, rgba(28,123,214,0.4), transparent 40%), radial-gradient(circle at 90% 90%, rgba(231,161,37,0.3), transparent 45%)",
          }}
        />
        <div className="container-page relative grid gap-10 py-16 sm:py-20 lg:grid-cols-2 lg:items-center lg:py-28">
          <div className="animate-fade-up">
            <p className="mb-4 inline-flex items-center rounded-full border border-white/20 bg-white/5 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-accent-400">
              Commercial Cleaning &amp; Facility Services · Georgetown, Guyana
            </p>
            <h1 className="text-4xl font-extrabold leading-[1.1] tracking-tight text-white sm:text-5xl lg:text-[3.1rem]">
              Commercial Cleaning &amp; Janitorial Services in Guyana
            </h1>
            <p className="mt-4 text-lg font-bold text-accent-500 sm:text-xl">
              Professional Cleaning. Powerful Results.
            </p>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-slate-300 sm:text-lg">
              CDCS Inc. is a Georgetown-based cleaning company providing commercial and janitorial
              cleaning, deep cleaning, pressure washing, fleet washing, and mobile detailing for
              businesses, government agencies, and organizations across Guyana.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Button href="/quote/" variant="accent" size="lg" icon={<IconArrowRight className="h-5 w-5" />}>
                Request a Quote
              </Button>
              <Button href="/services/" variant="outline" size="lg">
                Explore Our Services
              </Button>
            </div>
            <a
              href={siteConfig.contact.whatsappHrefWithMessage("Hello CDCS, I'd like to request a quote.")}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-slate-300 hover:text-accent-400"
            >
              <IconWhatsapp className="h-5 w-5 text-[#25D366]" />
              Or message us directly on WhatsApp: {siteConfig.contact.phoneDisplay}
            </a>
          </div>

          <div className="animate-fade-up delay-200">
            {/* Static export (output: "export", images.unoptimized) — next/image
                adds no optimization here, so a plain <img> with explicit
                dimensions is the correct, lighter choice. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/commercial-cleaning.jpg"
              alt="A CDCS worker cleaning the exterior glass of a commercial building in Guyana"
              width={1152}
              height={2048}
              fetchPriority="high"
              decoding="async"
              className="aspect-[4/3] w-full rounded-2xl object-cover object-center"
            />
          </div>
        </div>
      </section>

      {/* TRUST / CAPABILITY STRIP */}
      <section className="border-b border-slate-200 bg-white py-10 sm:py-12">
        <div className="container-page">
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-6">
            {trustPoints.map((point) => {
              const Icon = iconMap[point.icon];
              return (
                <div key={point.label} className="flex flex-col items-center gap-2.5 text-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-50 text-brand-600">
                    {Icon && <Icon className="h-6 w-6" />}
                  </div>
                  <p className="text-xs font-bold leading-snug text-navy-900 sm:text-sm">{point.label}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* OVERVIEW — crawlable intro with internal links to key service pages */}
      <section className="bg-white py-14 sm:py-16">
        <div className="container-page">
          <div className="mx-auto max-w-3xl text-base leading-relaxed text-slate-700 sm:text-lg">
            <p>
              Based in Georgetown, CDCS Inc. provides professional cleaning services to businesses,
              government agencies, and organizations across Guyana. Our teams handle{" "}
              <Link href="/services/commercial-janitorial-cleaning/" className="font-semibold text-brand-600 hover:underline">
                commercial and janitorial cleaning
              </Link>
              ,{" "}
              <Link href="/services/deep-cleaning/" className="font-semibold text-brand-600 hover:underline">
                deep cleaning
              </Link>
              ,{" "}
              <Link href="/services/pressure-washing/" className="font-semibold text-brand-600 hover:underline">
                pressure washing
              </Link>
              ,{" "}
              <Link href="/services/fleet-washing/" className="font-semibold text-brand-600 hover:underline">
                fleet washing
              </Link>
              , post-construction cleaning, and mobile detailing — as one-time projects or recurring
              contracts built around your schedule.
            </p>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="bg-slate-50 py-16 sm:py-24">
        <div className="container-page">
          <SectionHeading
            eyebrow="What We Do"
            title="Full-Scope Commercial Cleaning & Facility Services in Guyana"
            description="From daily janitorial programs to fleet washing and mobile detailing, CDCS Inc. delivers the service standards commercial clients rely on."
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((service) => (
              <ServiceCard key={service.slug} service={service} />
            ))}
          </div>
          <div className="mt-10 text-center">
            <Button href="/services/" variant="ghost" size="md" icon={<IconArrowRight className="h-4 w-4" />}>
              View All Services
            </Button>
          </div>
        </div>
      </section>

      {/* WHY CHOOSE CDCS */}
      <section className="bg-white py-16 sm:py-24">
        <div className="container-page">
          <SectionHeading
            eyebrow="Why Choose CDCS"
            title="Built for Clients Who Depend on Consistent Results"
            align="center"
          />
          <div className="mx-auto mt-12 grid max-w-5xl gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {whyChooseUs.map((item) => {
              const Icon = iconMap[item.icon];
              return (
                <div key={item.title} className="flex gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-navy-900 text-accent-400">
                    {Icon && <Icon className="h-5 w-5" />}
                  </div>
                  <div>
                    <h3 className="font-bold text-navy-900">{item.title}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-slate-600">{item.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* INDUSTRIES */}
      <section className="bg-navy-900 py-16 sm:py-24">
        <div className="container-page">
          <SectionHeading
            eyebrow="Who We Serve"
            title="Industries We Serve"
            description="CDCS Inc. is built to support the operational demands of commercial, institutional, and industrial clients."
            light
          />
          <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {industries.map((industry) => {
              const Icon = iconMap[industry.icon];
              return (
                <div
                  key={industry.name}
                  className="flex flex-col items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-8 text-center transition-colors hover:border-accent-500/50 hover:bg-white/10"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent-500/15 text-accent-400">
                    {Icon && <Icon className="h-6 w-6" />}
                  </div>
                  <p className="text-sm font-bold text-white">{industry.name}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* OUR WORK */}
      <section className="bg-slate-50 py-16 sm:py-24">
        <div className="container-page">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <SectionHeading
              eyebrow="Our Work"
              title="See the CDCS Standard"
              description="A preview of the project types we handle. Full before-and-after photos and videos are added as jobs are completed."
            />
            <Button href="/our-work/" variant="ghost" size="md" className="shrink-0" icon={<IconArrowRight className="h-4 w-4" />}>
              View Full Gallery
            </Button>
          </div>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {portfolioItems.slice(0, 6).map((item, i) => (
              <div key={i} className="group overflow-hidden rounded-xl">
                <PlaceholderMedia label={item.label} ratio="video" />
                <div className="mt-3 flex items-center justify-between">
                  <span className="text-sm font-bold text-navy-900">{item.category}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="bg-white py-16 sm:py-24">
        <div className="container-page">
          <SectionHeading eyebrow="How It Works" title="A Simple, Professional Process" align="center" />
          <div className="mx-auto mt-14 grid max-w-6xl gap-8 sm:grid-cols-2 lg:grid-cols-5">
            {processSteps.map((step, i) => {
              const Icon = iconMap[step.icon];
              return (
                <div key={step.step} className="relative flex flex-col items-center text-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-brand-600 bg-brand-50 text-brand-600">
                    {Icon && <Icon className="h-7 w-7" />}
                  </div>
                  <span className="mt-4 text-xs font-black tracking-widest text-accent-600">STEP {step.step}</span>
                  <h3 className="mt-1.5 text-sm font-bold text-navy-900">{step.title}</h3>
                  <p className="mt-2 text-xs leading-relaxed text-slate-600">{step.description}</p>
                  {i < processSteps.length - 1 && (
                    <div className="mt-6 hidden h-px w-full bg-slate-200 lg:block" aria-hidden />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* TRUST NOTE (no invented stats — honest positioning) */}
      <section className="bg-brand-50 py-12">
        <div className="container-page">
          <div className="mx-auto flex max-w-3xl flex-col items-center gap-4 text-center sm:flex-row sm:text-left">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white text-brand-600 shadow-sm">
              <IconCheck className="h-6 w-6" />
            </div>
            <p className="text-sm leading-relaxed text-navy-800">
              CDCS Inc. is structured to support recurring commercial contracts and large-scale
              projects — with trained teams, professional equipment, and service plans built
              around your operation. <Link href="/about/" className="font-bold text-brand-600 hover:underline">Learn more about how we work →</Link>
            </p>
          </div>
        </div>
      </section>

      <CTABanner />
    </>
  );
}
