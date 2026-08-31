import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PlaceholderMedia } from "@/components/ui/PlaceholderMedia";
import { IconPhone, IconMail, IconMapPin, IconWhatsapp, IconArrowRight } from "@/components/icons";
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

export default function ContactPage() {
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
            <span className="text-slate-300">Contact</span>
          </nav>
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-accent-400">Contact Us</p>
          <h1 className="max-w-2xl text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
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

      <section className="bg-white py-16 sm:py-24">
        <div className="container-page grid gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading eyebrow="Get In Touch" title="Contact Information" />
            <div className="mt-8 space-y-5">
              <a
                href={siteConfig.contact.phoneHref}
                className="flex items-center gap-4 rounded-xl border border-slate-200 p-5 transition-colors hover:border-brand-400"
              >
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-brand-50 text-brand-600">
                  <IconPhone className="h-5 w-5" />
                </span>
                <span>
                  <span className="block text-xs font-bold uppercase tracking-wider text-slate-500">Phone</span>
                  <span className="block text-base font-bold text-navy-900">{siteConfig.contact.phoneDisplay}</span>
                </span>
              </a>

              <a
                href={siteConfig.contact.whatsappHrefWithMessage("Hello CDCS, I'd like to request a quote.")}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 rounded-xl border border-slate-200 p-5 transition-colors hover:border-brand-400"
              >
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#25D366]/10 text-[#1fae56]">
                  <IconWhatsapp className="h-5 w-5" />
                </span>
                <span>
                  <span className="block text-xs font-bold uppercase tracking-wider text-slate-500">WhatsApp</span>
                  <span className="block text-base font-bold text-navy-900">{siteConfig.contact.phoneDisplay}</span>
                </span>
              </a>

              <a
                href={siteConfig.contact.emailHref}
                className="flex items-center gap-4 rounded-xl border border-slate-200 p-5 transition-colors hover:border-brand-400"
              >
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-brand-50 text-brand-600">
                  <IconMail className="h-5 w-5" />
                </span>
                <span>
                  <span className="block text-xs font-bold uppercase tracking-wider text-slate-500">Email</span>
                  <span className="block text-base font-bold text-navy-900">{siteConfig.contact.email}</span>
                </span>
              </a>

              <div className="flex items-center gap-4 rounded-xl border border-slate-200 p-5">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-brand-50 text-brand-600">
                  <IconMapPin className="h-5 w-5" />
                </span>
                <span>
                  <span className="block text-xs font-bold uppercase tracking-wider text-slate-500">Location</span>
                  <span className="block text-base font-bold text-navy-900">{siteConfig.location.display}</span>
                </span>
              </div>

              <div className="rounded-xl border border-slate-200 p-5">
                <span className="block text-xs font-bold uppercase tracking-wider text-slate-500">Social</span>
                <span className="block text-base font-bold text-navy-900">{siteConfig.social.handle}</span>
              </div>
            </div>

            <div className="mt-8">
              <Button href="/quote/" size="lg" icon={<IconArrowRight className="h-5 w-5" />}>
                Request a Detailed Quote
              </Button>
            </div>
          </div>

          <div>
            <SectionHeading eyebrow="Service Area" title="Georgetown &amp; Across Guyana" />
            <p className="mt-4 text-base leading-relaxed text-slate-700">
              CDCS Inc. is based in Georgetown, Guyana and provides on-site cleaning, pressure
              washing, fleet washing, and mobile detailing for clients throughout the country.
              Tell us where you&apos;re located when you{" "}
              <Link href="/quote/" className="font-semibold text-brand-600 hover:underline">request a quote</Link>{" "}
              and we&apos;ll confirm scheduling.
            </p>
            <PlaceholderMedia
              label="Map placeholder — embed a Google Map of your Georgetown service area here"
              ratio="square"
              light
              className="mt-6 lg:aspect-[4/5]"
            />
          </div>
        </div>
      </section>
    </>
  );
}
