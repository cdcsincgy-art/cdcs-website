import type { Metadata } from "next";
import { QuoteForm } from "./QuoteForm";
import { IconPhone, IconWhatsapp, IconMail, IconClock, IconCheck } from "@/components/icons";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Request a Cleaning Quote in Guyana",
  description:
    "Request a free quote from CDCS Inc. for commercial cleaning, janitorial, pressure washing, fleet washing, or mobile detailing in Georgetown and across Guyana.",
  alternates: { canonical: "/quote/" },
};

const reassurances = [
  "No obligation — quotes are free",
  "We respond to every request",
  "One-time projects and recurring contracts welcome",
  "Serving businesses, organizations & individuals",
];

export default function QuotePage() {
  return (
    <section className="bg-slate-50 py-14 sm:py-20">
      <div className="container-page grid gap-10 lg:grid-cols-3 lg:gap-12">
        <div className="lg:col-span-2">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-brand-600">Request a Quote</p>
          <h1 className="text-3xl font-extrabold tracking-tight text-navy-900 sm:text-4xl">
            Tell Us What Needs to Be Cleaned
          </h1>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-slate-600">
            Tell us about your property, fleet, or facility in Georgetown or anywhere in Guyana.
            Complete the form below with as much detail as possible and our team will follow up
            with a clear service proposal.
          </p>

          <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <QuoteForm />
          </div>
        </div>

        <aside className="space-y-6">
          <div className="rounded-2xl border border-slate-200 bg-white p-6">
            <h2 className="text-sm font-bold uppercase tracking-wider text-navy-900">Prefer to Talk Directly?</h2>
            <div className="mt-4 space-y-3">
              <a href={siteConfig.contact.phoneHref} className="flex items-center gap-3 text-sm font-semibold text-navy-800 hover:text-brand-600">
                <IconPhone className="h-4 w-4 text-brand-600" />
                {siteConfig.contact.phoneDisplay}
              </a>
              <a
                href={siteConfig.contact.whatsappHrefWithMessage("Hello CDCS, I'd like to request a quote.")}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-sm font-semibold text-navy-800 hover:text-brand-600"
              >
                <IconWhatsapp className="h-4 w-4 text-[#25D366]" />
                WhatsApp: {siteConfig.contact.phoneDisplay}
              </a>
              <a href={siteConfig.contact.emailHref} className="flex items-center gap-3 text-sm font-semibold text-navy-800 hover:text-brand-600">
                <IconMail className="h-4 w-4 text-brand-600" />
                {siteConfig.contact.email}
              </a>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6">
            <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-navy-900">
              <IconClock className="h-4 w-4 text-accent-600" />
              What Happens Next
            </div>
            <ul className="mt-4 space-y-2.5 text-sm text-slate-600">
              <li>1. We review your request</li>
              <li>2. We follow up to confirm details or schedule a site visit</li>
              <li>3. You receive a clear service proposal</li>
              <li>4. We schedule your service once approved</li>
            </ul>
          </div>

          <div className="rounded-2xl bg-navy-900 p-6 text-white">
            <ul className="space-y-3 text-sm">
              {reassurances.map((r) => (
                <li key={r} className="flex items-start gap-2.5">
                  <IconCheck className="mt-0.5 h-4 w-4 shrink-0 text-accent-400" />
                  {r}
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>
    </section>
  );
}
