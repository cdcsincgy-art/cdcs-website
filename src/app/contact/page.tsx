import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CTABanner } from "@/components/CTABanner";
import { ProjectImage } from "@/components/ProjectImage";
import {
  IconPhone,
  IconMail,
  IconMapPin,
  IconWhatsapp,
  IconArrowRight,
  IconInstagram,
  IconCheck,
} from "@/components/icons";
import { projectImagesForService } from "@/lib/project-images";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: { absolute: "Contact CDCS Inc. — Cleaning Services in Guyana" },
  description:
    "Contact CDCS Inc. in Georgetown, Guyana by phone, WhatsApp, or email for commercial cleaning, janitorial, pressure washing, fleet washing, or mobile detailing.",
  alternates: { canonical: "/contact/" },
};

const breadcrumbLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: `${siteConfig.url}/` },
    { "@type": "ListItem", position: 2, name: "Contact", item: `${siteConfig.url}/contact/` },
  ],
};

const contactMethods = [
  {
    label: "Phone",
    value: siteConfig.contact.phoneDisplay,
    href: siteConfig.contact.phoneHref,
    icon: IconPhone,
    accent: "bg-brand-50 text-brand-600",
  },
  {
    label: "WhatsApp",
    value: siteConfig.contact.phoneDisplay,
    href: siteConfig.contact.whatsappHrefWithMessage("Hello CDCS, I'd like to request a quote."),
    icon: IconWhatsapp,
    accent: "bg-[#25D366]/10 text-[#1fae56]",
    external: true,
  },
  {
    label: "Email",
    value: siteConfig.contact.email,
    href: siteConfig.contact.emailHref,
    icon: IconMail,
    accent: "bg-brand-50 text-brand-600",
  },
];

const nextSteps = [
  "We review your request",
  "We follow up to confirm details or arrange a site visit",
  "You receive a clear service proposal",
];

const serviceLinks = [
  { label: "Commercial & janitorial cleaning", href: "/services/commercial-janitorial-cleaning/" },
  { label: "Pressure washing", href: "/services/pressure-washing/" },
  { label: "Fleet washing", href: "/services/fleet-washing/" },
  { label: "Mobile detailing", href: "/services/mobile-detailing/" },
];

const areaImage = projectImagesForService("commercial-janitorial-cleaning").find((i) =>
  i.file.endsWith("commercial-exterior-window-cleaning"),
);

export default function ContactPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />

      {/* ================= HERO ================= */}
      <section className="relative overflow-hidden bg-navy-950 py-16 sm:py-20">
        <div className="pointer-events-none absolute inset-0 bg-grid-dark opacity-50" aria-hidden />
        <div className="pointer-events-none absolute inset-0 brand-glow opacity-80" aria-hidden />
        <div className="container-page relative">
          <nav className="mb-5 text-xs font-semibold text-slate-400" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-accent-400">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-slate-300">Contact</span>
          </nav>
          <p className="mb-4 flex items-center gap-2.5 text-xs font-bold uppercase tracking-[0.22em] text-accent-400">
            <span className="h-px w-6 bg-accent-400/60" aria-hidden />
            Contact Us
          </p>
          <h1 className="max-w-2xl text-pretty text-4xl font-extrabold leading-[1.1] tracking-tight text-white sm:text-5xl">
            Contact CDCS Inc. — Cleaning Services in Georgetown, Guyana
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-slate-300 sm:text-lg">
            CDCS Inc. is based in Georgetown and serves businesses across Guyana. Reach us by phone,
            WhatsApp, or email, or send a detailed{" "}
            <Link href="/quote/" className="font-semibold text-accent-400 hover:underline">quote request</Link>{" "}
            and we&apos;ll get back to you.
          </p>
        </div>
      </section>

      {/* ================= CONTACT + QUOTE PANEL ================= */}
      <section className="bg-white py-16 sm:py-24">
        <div className="container-page grid gap-10 lg:grid-cols-[1fr_0.85fr] lg:gap-14">
          {/* Contact information */}
          <div>
            <SectionHeading eyebrow="Get In Touch" title="Contact Information" />
            <div className="mt-8 space-y-4">
              {contactMethods.map((method) => {
                const Icon = method.icon;
                return (
                  <a
                    key={method.label}
                    href={method.href}
                    target={method.external ? "_blank" : undefined}
                    rel={method.external ? "noopener noreferrer" : undefined}
                    className="flex items-center gap-4 rounded-xl border border-slate-200 p-5 transition-colors hover:border-brand-400 hover:bg-slate-50"
                  >
                    <span className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full ${method.accent}`}>
                      <Icon className="h-5 w-5" />
                    </span>
                    <span>
                      <span className="block text-xs font-bold uppercase tracking-wider text-slate-500">
                        {method.label}
                      </span>
                      <span className="block text-base font-bold text-navy-900">{method.value}</span>
                    </span>
                  </a>
                );
              })}

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="flex items-center gap-4 rounded-xl border border-slate-200 p-5">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-brand-50 text-brand-600">
                    <IconMapPin className="h-5 w-5" />
                  </span>
                  <span>
                    <span className="block text-xs font-bold uppercase tracking-wider text-slate-500">Location</span>
                    <span className="block text-base font-bold text-navy-900">{siteConfig.location.display}</span>
                  </span>
                </div>
                <a
                  href={siteConfig.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 rounded-xl border border-slate-200 p-5 transition-colors hover:border-brand-400 hover:bg-slate-50"
                >
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-brand-50 text-brand-600">
                    <IconInstagram className="h-5 w-5" />
                  </span>
                  <span>
                    <span className="block text-xs font-bold uppercase tracking-wider text-slate-500">Social</span>
                    <span className="block text-base font-bold text-navy-900">{siteConfig.social.handle}</span>
                  </span>
                </a>
              </div>
            </div>
          </div>

          {/* Branded quote panel */}
          <div className="relative overflow-hidden rounded-2xl bg-navy-950 p-7 shadow-xl shadow-navy-900/20 sm:p-9">
            <div className="pointer-events-none absolute inset-0 bg-grid-dark opacity-40" aria-hidden />
            <div className="pointer-events-none absolute inset-0 brand-glow opacity-70" aria-hidden />
            <div className="relative">
              <p className="flex items-center gap-2.5 text-xs font-bold uppercase tracking-[0.22em] text-accent-400">
                <span className="h-px w-6 bg-accent-400/60" aria-hidden />
                For Commercial Prospects
              </p>
              <h2 className="mt-4 text-2xl font-bold tracking-tight text-white sm:text-3xl">
                Request a Detailed Quote
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-slate-300 sm:text-base">
                Send us the details of your property, fleet, or facility — including location, size,
                and how often you need service — and our team will follow up with a clear proposal.
              </p>

              <ol className="mt-6 space-y-3">
                {nextSteps.map((step, i) => (
                  <li key={step} className="flex items-start gap-3 text-sm text-slate-200">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white/10 text-xs font-bold text-accent-400">
                      {i + 1}
                    </span>
                    {step}
                  </li>
                ))}
              </ol>

              <div className="mt-8 flex flex-col gap-3">
                <Button href="/quote/" variant="accent" size="lg" icon={<IconArrowRight className="h-5 w-5" />}>
                  Request a Quote
                </Button>
                <Button
                  href={siteConfig.contact.whatsappHrefWithMessage("Hello CDCS, I'd like to request a quote.")}
                  variant="outline"
                  size="lg"
                  icon={<IconWhatsapp className="h-5 w-5" />}
                  external
                >
                  WhatsApp Us
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= SERVICE AREA ================= */}
      <section className="bg-slate-50 py-16 sm:py-24">
        <div className="container-page grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-16">
          <div>
            <SectionHeading eyebrow="Service Area" title="Georgetown & Across Guyana" />
            <p className="mt-4 text-base leading-relaxed text-slate-700">
              CDCS Inc. is based in Georgetown, Guyana and provides on-site cleaning, pressure
              washing, fleet washing, and mobile detailing for clients throughout the country.
              Tell us where you&apos;re located when you{" "}
              <Link href="/quote/" className="font-semibold text-brand-600 hover:underline">request a quote</Link>{" "}
              and we&apos;ll confirm scheduling.
            </p>
            <ul className="mt-6 space-y-2.5">
              {[
                "On-site service — we come to your property, yard, or facility",
                "One-time projects and recurring contracts",
                "Scheduling around your operating hours",
              ].map((point) => (
                <li key={point} className="flex items-start gap-2.5 text-sm leading-relaxed text-slate-700">
                  <IconCheck className="mt-0.5 h-5 w-5 shrink-0 text-brand-600" />
                  {point}
                </li>
              ))}
            </ul>
            <div className="mt-7 flex flex-wrap gap-2">
              {serviceLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="inline-flex items-center rounded-full border border-slate-300 bg-white px-3.5 py-1.5 text-sm font-medium text-navy-800 transition-colors hover:border-brand-400 hover:text-brand-700"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {areaImage && (
            <div className="relative rounded-2xl border border-navy-900/10 bg-white p-2 shadow-xl shadow-navy-900/10">
              <span
                aria-hidden
                className="absolute -right-3 -top-3 hidden h-16 w-16 rounded-tr-2xl border-r-2 border-t-2 border-accent-500/70 sm:block"
              />
              <div className="aspect-[4/3] overflow-hidden rounded-xl lg:aspect-[4/5]">
                <ProjectImage image={areaImage} className="h-full w-full object-cover" />
              </div>
            </div>
          )}
        </div>
      </section>

      <CTABanner
        title="Ready to Get Started?"
        description="Send CDCS Inc. the details of your property, fleet, or facility and we'll put together a clear service proposal."
      />
    </>
  );
}
