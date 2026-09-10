import type { Metadata } from "next";
import Link from "next/link";
import { Estimator } from "./Estimator";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { IconCheck, IconShield, IconTools, IconMapPin, IconClipboard } from "@/components/icons";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Service Cost Estimator Guyana",
  description:
    "Get a preliminary estimate for commercial, residential, or vehicle cleaning and detailing in Guyana, then request an official quotation from CDCS Inc.",
  alternates: { canonical: "/estimate/" },
};

const breadcrumbLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: `${siteConfig.url}/` },
    { "@type": "ListItem", position: 2, name: "Get an Estimate", item: `${siteConfig.url}/estimate/` },
  ],
};

const whyCdcs = [
  { icon: IconShield, text: "Professional cleaning and detailing company serving Guyana" },
  { icon: IconTools, text: "Commercial and residential capability, with professional equipment" },
  { icon: IconMapPin, text: "Mobile service capability — we come to your site or depot" },
  { icon: IconClipboard, text: "Corporate quotation and invoicing available" },
];

export default function EstimatePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />

      {/* ===== Hero ===== */}
      <section className="relative overflow-hidden bg-navy-950 py-14 sm:py-20">
        <div className="pointer-events-none absolute inset-0 bg-grid-dark opacity-50" aria-hidden />
        <div className="pointer-events-none absolute inset-0 brand-glow opacity-80" aria-hidden />
        <div className="container-page relative">
          <nav className="mb-5 text-xs font-semibold text-slate-400" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-accent-400">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-slate-300">Get an Estimate</span>
          </nav>
          <p className="mb-4 flex items-center gap-2.5 text-xs font-bold uppercase tracking-[0.22em] text-accent-400">
            <span className="h-px w-6 bg-accent-400/60" aria-hidden />
            Instant Estimate
          </p>
          <h1 className="max-w-3xl text-pretty text-4xl font-extrabold leading-[1.1] tracking-tight text-white sm:text-5xl">
            Get an Estimate for CDCS Services
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-slate-300 sm:text-lg">
            Answer a few questions about your job — residential, commercial, corporate, or vehicle —
            and get a preliminary estimate for cleaning or detailing anywhere in Guyana. When
            you are ready, send it through as an official quotation request.
          </p>
          <p className="mt-5 max-w-2xl rounded-lg border border-white/15 bg-white/5 px-4 py-3 text-sm leading-relaxed text-slate-200">
            Your estimate is preliminary and may change after photos, inspection, measurements, site
            conditions or final scope verification.
          </p>
        </div>
      </section>

      {/* ===== Estimator ===== */}
      <section className="bg-slate-50 py-12 sm:py-16">
        <div className="container-page max-w-3xl">
          <Estimator />
        </div>
      </section>

      {/* ===== Why CDCS ===== */}
      <section className="bg-white py-14 sm:py-20">
        <div className="container-page max-w-3xl">
          <SectionHeading eyebrow="Why CDCS?" title="A Guyana-based cleaning and detailing company built for business" />
          <ul className="mt-8 grid gap-4 sm:grid-cols-2">
            {whyCdcs.map(({ icon: Icon, text }) => (
              <li key={text} className="flex items-start gap-3 rounded-xl border border-slate-200 bg-slate-50 p-4">
                <span className="mt-0.5 shrink-0 text-brand-600">
                  <Icon className="h-5 w-5" />
                </span>
                <span className="text-sm font-semibold leading-relaxed text-navy-900">{text}</span>
              </li>
            ))}
          </ul>
          <ul className="mt-6 grid gap-2 text-sm text-slate-600 sm:grid-cols-2">
            {["Trained personnel", "Professional equipment", "One-time projects and recurring contracts", "Serving businesses, organizations & individuals"].map((t) => (
              <li key={t} className="flex items-start gap-2">
                <IconCheck className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" />
                {t}
              </li>
            ))}
          </ul>
          <p className="mt-8 text-sm text-slate-600">
            Prefer to talk it through? Call{" "}
            <a href={siteConfig.contact.phoneHref} className="font-semibold text-brand-600 hover:underline">
              {siteConfig.contact.phoneDisplay}
            </a>{" "}
            or{" "}
            <Link href="/quote/" className="font-semibold text-brand-600 hover:underline">
              use the full quote form
            </Link>
            .
          </p>
        </div>
      </section>
    </>
  );
}
