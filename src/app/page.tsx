import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ServiceCard } from "@/components/ServiceCard";
import { CTABanner } from "@/components/CTABanner";
import { DeliveryModel } from "@/components/DeliveryModel";
import { ProjectImage } from "@/components/ProjectImage";
import { services } from "@/lib/services-data";
import { trustPoints, whyChooseUs, industries, processSteps } from "@/lib/content-data";
import {
  homepageHeroImage,
  homepageProjectImages,
  operatingStandardsImage,
  categoryLabel,
} from "@/lib/project-images";
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
      {/* ================= HERO ================= */}
      <section className="relative overflow-hidden bg-navy-950">
        <div className="pointer-events-none absolute inset-0 bg-grid-dark opacity-[0.6]" aria-hidden />
        <div className="pointer-events-none absolute inset-0 brand-glow opacity-90" aria-hidden />
        <div className="container-page relative grid gap-12 py-16 sm:py-20 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:py-28">
          <div className="animate-fade-up">
            <p className="mb-5 inline-flex items-center rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-accent-400">
              Commercial Cleaning &amp; Facility Services · Georgetown, Guyana
            </p>
            <h1 className="text-pretty text-4xl font-extrabold leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-[3.25rem]">
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
            <div className="relative rounded-2xl border border-white/10 bg-white/[0.04] p-2 shadow-2xl shadow-black/40">
              <span
                aria-hidden
                className="absolute -left-3 -top-3 hidden h-16 w-16 rounded-tl-2xl border-l-2 border-t-2 border-accent-500/70 sm:block"
              />
              <div className="overflow-hidden rounded-xl">
                <ProjectImage
                  image={homepageHeroImage}
                  priority
                  className="w-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ CAPABILITY RIBBON (dark continuation of the masthead) ============ */}
      <section className="border-y border-white/10 bg-navy-900">
        <div className="container-page py-6 sm:py-7">
          <ul className="grid grid-cols-2 gap-x-6 gap-y-4 sm:grid-cols-3 lg:grid-cols-6 lg:divide-x lg:divide-white/10">
            {trustPoints.map((point) => {
              const Icon = iconMap[point.icon];
              return (
                <li
                  key={point.label}
                  className="flex items-center gap-2.5 lg:justify-center lg:px-3 lg:text-center"
                >
                  <span className="text-accent-400">{Icon && <Icon className="h-5 w-5 shrink-0" />}</span>
                  <span className="text-xs font-semibold leading-tight text-slate-200">{point.label}</span>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* ================= WHAT WE DO / SERVICES ================= */}
      <section className="bg-white py-20 sm:py-28">
        <div className="container-page">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,34rem)_1fr] lg:items-end lg:gap-16">
            <SectionHeading
              eyebrow="What We Do"
              title="Full-Scope Commercial Cleaning & Facility Services in Guyana"
            />
            <p className="text-base leading-relaxed text-slate-600 lg:pb-1">
              Based in Georgetown, CDCS Inc. serves businesses, government agencies, and
              organizations across Guyana — handling{" "}
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
              , post-construction cleaning, and mobile detailing as one-time projects or recurring
              contracts.
            </p>
          </div>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((service) => (
              <ServiceCard key={service.slug} service={service} />
            ))}
          </div>
          <div className="mt-10">
            <Button href="/services/" variant="ghost" size="md" icon={<IconArrowRight className="h-4 w-4" />}>
              View All Services
            </Button>
          </div>
        </div>
      </section>

      {/* ================= OPERATING STANDARDS (reputation / why clients stay) ================= */}
      <section className="bg-slate-50 py-20 sm:py-28">
        <div className="container-page">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
            <div>
              <SectionHeading
                eyebrow="Why Clients Stay"
                title="Built for Clients Who Depend on Consistent Results"
              />
              <p className="mt-4 max-w-xl text-base leading-relaxed text-slate-600">
                Corporate facilities, government offices, and property managers keep CDCS Inc. on
                contract because every visit is organized the same way — a defined scope, a trained
                team, and supervision that holds the standard.
              </p>
              <dl className="mt-8 divide-y divide-slate-200 border-y border-slate-200">
                {whyChooseUs.map((item) => {
                  const Icon = iconMap[item.icon];
                  return (
                    <div key={item.title} className="flex gap-4 py-4">
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
            </div>

            <div className="relative isolate">
              <div
                aria-hidden
                className="absolute -inset-4 -z-10 hidden rounded-2xl bg-navy-950 sm:block"
              />
              <div className="relative rounded-xl border border-navy-900/10 bg-white p-2 shadow-xl shadow-navy-900/15">
                <div className="aspect-[4/5] overflow-hidden rounded-lg">
                  <ProjectImage
                    image={operatingStandardsImage}
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>
              <p className="mt-3 text-center text-xs text-slate-600 sm:absolute sm:-bottom-9 sm:left-0 sm:right-0">
                {operatingStandardsImage.caption}
              </p>
            </div>
          </div>

          <div className="mt-16 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:mt-24 sm:p-8">
            <DeliveryModel />
          </div>
        </div>
      </section>

      {/* ================= INDUSTRIES (dark, textured) ================= */}
      <section className="relative overflow-hidden bg-navy-950 py-20 sm:py-28">
        <div className="pointer-events-none absolute inset-0 bg-grid-dark opacity-50" aria-hidden />
        <div className="container-page relative">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <SectionHeading
              eyebrow="Who We Serve"
              title="Industries We Serve"
              description="CDCS Inc. is built to support the operational demands of commercial, institutional, and industrial clients."
              light
            />
            <Link
              href="/industries/"
              className="inline-flex shrink-0 items-center gap-1.5 text-sm font-bold text-accent-400 hover:text-accent-300"
            >
              All industries
              <IconArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-white/10 bg-white/10 sm:grid-cols-3 lg:grid-cols-4">
            {industries.map((industry) => {
              const Icon = iconMap[industry.icon];
              return (
                <div
                  key={industry.name}
                  className="group flex flex-col gap-4 bg-navy-950 p-6 transition-colors duration-300 hover:bg-navy-900"
                >
                  <span className="text-accent-400">{Icon && <Icon className="h-6 w-6" />}</span>
                  <p className="text-sm font-bold leading-snug text-white">{industry.name}</p>
                  <span
                    aria-hidden
                    className="mt-auto h-0.5 w-6 bg-accent-500/40 transition-all duration-300 group-hover:w-10 group-hover:bg-accent-500"
                  />
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ================= OUR WORK (editorial) ================= */}
      <section className="bg-white py-20 sm:py-28">
        <div className="container-page">
          <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
            <SectionHeading
              eyebrow="Our Work"
              title="Real CDCS Projects Across Guyana"
              description="Photos from recent CDCS Inc. jobs — cleaning, pressure washing, fleet washing, and detailing for businesses and vehicle owners."
            />
            <Button
              href="/our-work/"
              variant="ghost"
              size="md"
              className="shrink-0"
              icon={<IconArrowRight className="h-4 w-4" />}
            >
              View Full Gallery
            </Button>
          </div>

          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {homepageProjectImages.map((image) => (
              <figure
                key={image.file}
                className="group relative overflow-hidden rounded-xl border border-slate-200 bg-navy-950"
              >
                <div className="aspect-[4/5] overflow-hidden">
                  <ProjectImage
                    image={image}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                </div>
                <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-navy-950 via-navy-950/70 to-transparent p-4 pt-12">
                  <span className="inline-block rounded bg-accent-500 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-navy-950">
                    {categoryLabel(image)}
                  </span>
                  <p className="mt-2 text-sm font-medium leading-snug text-white">{image.caption}</p>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* ================= HOW IT WORKS (timeline) ================= */}
      <section className="border-t-2 border-accent-500/70 bg-slate-50 py-20 sm:py-28">
        <div className="container-page">
          <SectionHeading
            eyebrow="How It Works"
            title="A Simple, Professional Process"
            description="From first contact to a maintained contract, the steps are the same for a one-time project or an ongoing program."
            align="center"
          />
          <ol className="mx-auto mt-14 grid max-w-6xl gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-5">
            {processSteps.map((step, i) => (
              <li key={step.step} className="relative flex flex-col">
                <div className="flex items-center gap-3">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-navy-900 text-sm font-black text-white">
                    {step.step}
                  </span>
                  {i < processSteps.length - 1 && (
                    <span className="hidden h-px flex-1 bg-slate-300 lg:block" aria-hidden />
                  )}
                </div>
                <h3 className="mt-4 text-sm font-bold text-navy-900">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{step.description}</p>
              </li>
            ))}
          </ol>

          <div className="mx-auto mt-16 flex max-w-3xl flex-col items-center gap-4 rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm sm:flex-row sm:text-left">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-brand-50 text-brand-600">
              <IconCheck className="h-6 w-6" />
            </span>
            <p className="text-sm leading-relaxed text-navy-800">
              CDCS Inc. is structured to support recurring commercial contracts and large-scale
              projects — with trained teams, professional equipment, and service plans built around
              your operation.{" "}
              <Link href="/about/" className="font-bold text-brand-600 hover:underline">
                Learn more about how we work →
              </Link>
            </p>
          </div>
        </div>
      </section>

      <CTABanner />
    </>
  );
}
