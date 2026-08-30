import type { Metadata } from "next";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PlaceholderMedia } from "@/components/ui/PlaceholderMedia";
import { IconPhone, IconMail, IconMapPin, IconWhatsapp, IconArrowRight } from "@/components/icons";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Contact Us | Georgetown, Guyana",
  description:
    "Contact CDCS Inc. by phone, WhatsApp, or email to request a quote for commercial cleaning, pressure washing, fleet washing, or mobile detailing in Guyana.",
  alternates: { canonical: "/contact/" },
};

export default function ContactPage() {
  return (
    <>
      <section className="bg-navy-950 py-16 sm:py-20">
        <div className="container-page">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-accent-400">Contact Us</p>
          <h1 className="max-w-2xl text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
            Let&apos;s Talk About Your Property, Fleet, or Facility
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-slate-300 sm:text-lg">
            Reach us by phone, WhatsApp, or email — or send a detailed quote request and we&apos;ll
            get back to you.
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
            <PlaceholderMedia
              label="Map placeholder — embed a Google Map of your Georgetown service area here"
              ratio="square"
              light
              className="lg:aspect-[4/5]"
            />
            <p className="mt-3 text-xs text-slate-500">
              Add an embedded Google Map once a public office/pickup address is confirmed.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
