import type { Metadata } from "next";
import Link from "next/link";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Faq } from "@/components/Faq";
import { WashCareCta } from "@/components/washcare/WashCareCta";
import {
  IconCheck,
  IconArrowRight,
  IconCalendar,
  IconClock,
  IconShield,
  IconMapPin,
  IconTruck,
  IconCar,
  IconClipboard,
  IconWhatsapp,
} from "@/components/icons";
import { siteConfig } from "@/lib/site-config";
import {
  bayExample,
  mobileExample,
  fleetExample,
  washcareCapPct,
  fleetCustomAgreementThreshold,
} from "@/lib/washcare-showcase";

export const metadata: Metadata = {
  title: { absolute: "WashCare — Recurring Vehicle Care Plans | CDCS Inc." },
  description:
    "WashCare is CDCS Inc.'s scheduled vehicle-care programme in Guyana — Washbay, Mobile, and Fleet plans with predictable monthly pricing. Keep a vehicle or fleet clean every month, without rebooking.",
  alternates: { canonical: "/washcare/" },
};

const breadcrumbLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: `${siteConfig.url}/` },
    { "@type": "ListItem", position: 2, name: "WashCare", item: `${siteConfig.url}/washcare/` },
  ],
};

// ---------------------------------------------------------------------------
// Live example pricing — every figure below comes from the approved WashCare
// pricing engine (see src/lib/washcare-showcase.ts), never a hand-typed
// number. Vehicle classes are grouped where the engine already prices them
// identically (Car / SUV / Pickup mobile visits both resolve to the GYD 6,000
// mobile minimum, for example), so nothing shown here can drift out of sync
// with what the estimator quotes.
// ---------------------------------------------------------------------------

const bay = {
  sedan: {
    p2: bayExample("Small car / sedan", "2 washes / month"),
    p4: bayExample("Small car / sedan", "4 washes / month"),
    p8: bayExample("Small car / sedan", "8 washes / month"),
  },
  suv: {
    p2: bayExample("SUV", "2 washes / month"),
    p4: bayExample("SUV", "4 washes / month"),
    p8: bayExample("SUV", "8 washes / month"),
  },
  pickup: {
    p2: bayExample("Pickup", "2 washes / month"),
    p4: bayExample("Pickup", "4 washes / month"),
    p8: bayExample("Pickup", "8 washes / month"),
  },
};

const mobile = {
  standard: {
    v2: mobileExample("SUV", "2 washes / month"),
    v4: mobileExample("SUV", "4 washes / month"),
  },
  large: {
    v2: mobileExample("Large SUV / 7-seater", "2 washes / month"),
    v4: mobileExample("Large SUV / 7-seater", "4 washes / month"),
  },
};

const fleet = {
  small: fleetExample("Medium truck", 3, "4 washes / month"),
  medium: fleetExample("Medium truck", 8, "4 washes / month"),
  large: fleetExample("Medium truck", 15, "4 washes / month"),
};

// ---------------------------------------------------------------------------
// CTA destinations — every enrollment/estimate action goes to the existing
// estimator or the existing quote form. `washcare=1` (and `mode=`) are read by
// the estimator to preselect WashCare / vehicle-service intent — see
// src/app/estimate/Estimator.tsx.
// ---------------------------------------------------------------------------

const HERO_ESTIMATE_HREF = "/estimate/?washcare=1";
const BAY_ESTIMATE_HREF = "/estimate/?service=mobile-detailing&washcare=1&mode=bay";
const MOBILE_ESTIMATE_HREF = "/estimate/?service=mobile-detailing&washcare=1&mode=mobile";
const FLEET_ESTIMATE_HREF = "/estimate/?service=fleet-washing&washcare=1";
const WHATSAPP_HREF = siteConfig.contact.whatsappHrefWithMessage(
  "Hello CDCS, I'd like to ask about a WashCare recurring vehicle-care plan.",
);

const whyWashcare = [
  { icon: IconCalendar, title: "Scheduled, Not Rebooked", text: "A fixed number of washes every month — no remembering to call or book again." },
  { icon: IconClock, title: "Priority Scheduling", text: "WashCare plans get priority over one-off bookings when the schedule is set." },
  { icon: IconClipboard, title: "One Predictable Cost", text: "A set monthly figure for your vehicle or fleet, agreed up front." },
  { icon: IconShield, title: "Professional CDCS Service", text: "The same trained CDCS teams and standards as every other CDCS service." },
  { icon: IconCar, title: "Better Value, Regularly", text: "Scheduled plans cost less per wash than booking the same washes one at a time." },
];

const channels = [
  { id: "bay", icon: IconMapPin, title: "WashCare Bay", text: "Drop your vehicle at the CDCS washbay on a set monthly schedule." },
  { id: "mobile", icon: IconCar, title: "WashCare Mobile", text: "We come to you — a scheduled wash at your home or workplace." },
  { id: "fleet", icon: IconTruck, title: "WashCare Fleet", text: "A scheduled washing programme for company vehicles and commercial fleets." },
];

const included = [
  "The scheduled maintenance wash for your selected plan and vehicle",
  "Exterior wash — body, glass, wheels, tyres and trim",
  "Interior clean where an interior & exterior plan is selected",
  "Consistent scheduling and a CDCS team familiar with your vehicle",
];

const separate = [
  "Steam / extraction cleaning",
  "Engine washing",
  "Undercarriage washing",
  "Buffing & polishing",
  "Headlight restoration",
  "Odor treatment",
  "Heavy mud / grease remediation",
  "Stain treatment",
  "Restoration work",
  "Special contamination treatment",
];

const rules = [
  "Plans are billed and scheduled monthly, in advance.",
  "Scheduled washes apply within that month's billing cycle.",
  "Unused washes don't normally accumulate indefinitely — book them in.",
  "Plans cover your registered vehicle(s); swapping a vehicle needs a quick check with CDCS first.",
  "Vehicles in unusually heavy or severe condition may need extra treatment, priced separately.",
  "Mobile visits run within our service area — access and logistics are confirmed when you enroll.",
  "Larger or more complex fleets are set up on a Fleet Service Agreement.",
  "CDCS may confirm a vehicle's condition before enrollment starts.",
];

const faqItems = [
  {
    q: "What is WashCare?",
    a: "WashCare is CDCS Inc.'s scheduled vehicle-care programme. Instead of booking a wash each time, your vehicle or fleet is washed on a fixed monthly schedule — at the CDCS washbay, by a mobile visit, or under a fleet programme.",
  },
  {
    q: "Can I choose Bay or Mobile?",
    a: "Yes. WashCare Bay is a scheduled drop-off at the CDCS washbay; WashCare Mobile brings the same scheduled wash to your home or workplace, within our service area. Pick whichever suits you when you set up your plan.",
  },
  {
    q: "What if my vehicle needs more than a wash?",
    a: "WashCare covers the scheduled maintenance wash for your plan. Extraction cleaning, engine washing, buffing, headlight restoration, odor treatment, and similar specialist work remain separate services, available on request.",
  },
  {
    q: "Do unused washes roll over?",
    a: "Plans are billed and scheduled monthly, and washes apply within that billing cycle — they don't normally accumulate indefinitely. If you expect to miss a scheduled visit, let CDCS know and we'll see what we can do.",
  },
  {
    q: "How is my exact WashCare price calculated?",
    a: "Your plan is priced from your vehicle type, chosen channel (Bay or Mobile), and washes per month, using CDCS's standard WashCare rates — the same rates shown on this page. Get your exact monthly figure in the estimator.",
  },
  {
    q: "Does WashCare Fleet get a volume discount?",
    a: `Yes. Fleet plans combine a fleet-size discount with a recurring-service saving, capped at ${washcareCapPct}% in total so pricing stays sustainable. Fleets of ${fleetCustomAgreementThreshold}+ vehicles, or with more complex requirements, are set up on a Fleet Service Agreement instead of a standard plan.`,
  },
  {
    q: "What about a vehicle in rough condition?",
    a: "CDCS may confirm a vehicle's condition before enrollment, and unusually heavy dirt, mud, grease, or contamination may need extra treatment priced separately from the standard plan.",
  },
];

export default function WashCarePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />

      {/* ================= HERO ================= */}
      <section className="relative overflow-hidden bg-navy-950 py-14 sm:py-20">
        <div className="pointer-events-none absolute inset-0 bg-grid-dark opacity-50" aria-hidden />
        <div className="pointer-events-none absolute inset-0 brand-glow opacity-80" aria-hidden />
        <div className="container-page relative">
          <nav className="mb-5 text-xs font-semibold text-slate-400" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-accent-400">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-slate-300">WashCare</span>
          </nav>
          <p className="mb-4 flex items-center gap-2.5 text-xs font-bold uppercase tracking-[0.22em] text-accent-400">
            <span className="h-px w-6 bg-accent-400/60" aria-hidden />
            Recurring Vehicle Care
          </p>
          <h1 className="max-w-3xl text-pretty text-4xl font-extrabold leading-[1.1] tracking-tight text-white sm:text-5xl">
            Keep Your Vehicle Clean. Every Month. Without Rebooking.
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-slate-300 sm:text-lg">
            WashCare is CDCS Inc.&apos;s scheduled vehicle-care programme for private vehicles,
            businesses, and commercial fleets in Guyana — a fixed monthly wash schedule, priority
            scheduling, and one predictable monthly cost, instead of remembering to book a wash
            every time.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <WashCareCta
              href={HERO_ESTIMATE_HREF}
              event="washcare_cta_clicked"
              params={{ cta: "hero_get_plan", channel: "general" }}
              variant="accent"
              size="lg"
              icon={<IconArrowRight className="h-5 w-5" />}
            >
              Get My WashCare Plan
            </WashCareCta>
            <WashCareCta
              href={WHATSAPP_HREF}
              event="washcare_whatsapp_clicked"
              params={{ cta: "hero", channel: "general" }}
              variant="outline"
              size="lg"
              icon={<IconWhatsapp className="h-5 w-5" />}
              external
            >
              Ask About WashCare on WhatsApp
            </WashCareCta>
          </div>
        </div>
      </section>

      {/* ================= THREE CHANNELS (quick nav) ================= */}
      <section className="bg-white py-14 sm:py-16">
        <div className="container-page">
          <div className="grid gap-4 sm:grid-cols-3">
            {channels.map((c) => {
              const Icon = c.icon;
              return (
                <a
                  key={c.id}
                  href={`#${c.id}`}
                  className="group flex flex-col rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-colors hover:border-brand-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600"
                >
                  <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
                    <Icon className="h-5 w-5" />
                  </span>
                  <h2 className="mt-4 text-base font-bold text-navy-900">{c.title}</h2>
                  <p className="mt-1.5 flex-1 text-sm leading-relaxed text-slate-600">{c.text}</p>
                  <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-bold text-brand-600 group-hover:text-brand-700">
                    See plans &amp; pricing
                    <IconArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </a>
              );
            })}
          </div>
        </div>
      </section>

      {/* ================= WHY WASHCARE ================= */}
      <section className="bg-slate-50 py-16 sm:py-24">
        <div className="container-page">
          <SectionHeading
            eyebrow="Why WashCare"
            title="A Scheduled Alternative to Booking Every Time"
            description="WashCare is not an unlimited-wash membership — it's a fixed, scheduled number of washes each month, priced and planned in advance."
          />
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
            {whyWashcare.map((w) => {
              const Icon = w.icon;
              return (
                <div key={w.title} className="rounded-xl border border-slate-200 bg-white p-5">
                  <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
                    <Icon className="h-4 w-4" />
                  </span>
                  <h3 className="mt-3 text-sm font-bold text-navy-900">{w.title}</h3>
                  <p className="mt-1.5 text-xs leading-relaxed text-slate-600">{w.text}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ================= WASHCARE BAY ================= */}
      <section id="bay" className="scroll-mt-24 bg-white py-16 sm:py-24">
        <div className="container-page">
          <SectionHeading
            eyebrow="WashCare Bay"
            title="Scheduled Washbay Maintenance"
            description="Drop your vehicle at the CDCS washbay on a set monthly schedule. 4 washes a month is the plan most customers choose, with 2 or 8 a month also available."
          />
          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {[
              { label: "Small Car / Sedan", d: bay.sedan },
              { label: "SUV", d: bay.suv },
              { label: "Pickup", d: bay.pickup },
            ].map(({ label, d }) => (
              <div key={label} className="rounded-xl border-2 border-slate-200 bg-white p-5 shadow-sm">
                <p className="text-xs font-bold uppercase tracking-wider text-slate-500">{label}</p>
                <p className="mt-2 text-2xl font-black leading-tight text-navy-900">{d.p4.formatted}</p>
                <p className="mt-1 text-xs text-slate-500">
                  4 scheduled washbay washes / month
                  {d.p4.savingPct ? ` · saves ${d.p4.savingPct}% vs one-time` : ""}
                </p>
                <dl className="mt-3 space-y-1.5 border-t border-slate-100 pt-3 text-xs">
                  <div className="flex justify-between gap-3">
                    <dt className="text-slate-500">2× / month</dt>
                    <dd className="font-semibold text-navy-900">{d.p2.formatted}</dd>
                  </div>
                  <div className="flex justify-between gap-3">
                    <dt className="text-slate-500">8× / month</dt>
                    <dd className="font-semibold text-navy-900">{d.p8.formatted}</dd>
                  </div>
                </dl>
              </div>
            ))}
          </div>
          <p className="mt-5 max-w-2xl text-sm leading-relaxed text-slate-600">
            Prices shown are for a standard interior &amp; exterior wash in normal condition.
            Exterior-only, other vehicle types, and larger vehicles are priced in the estimator.
            Specialist services — extraction, engine washing, buffing, headlight restoration, and
            similar work — can be added to any visit separately.
          </p>
          <div className="mt-6">
            <WashCareCta
              href={BAY_ESTIMATE_HREF}
              event="washcare_cta_clicked"
              params={{ cta: "bay_estimate", channel: "bay" }}
              variant="primary"
              icon={<IconArrowRight className="h-4 w-4" />}
            >
              Estimate My WashCare Plan
            </WashCareCta>
          </div>
        </div>
      </section>

      {/* ================= WASHCARE MOBILE ================= */}
      <section id="mobile" className="scroll-mt-24 bg-slate-50 py-16 sm:py-24">
        <div className="container-page">
          <SectionHeading
            eyebrow="WashCare Mobile"
            title="We Come to You"
            description="A scheduled wash at your home or workplace in Georgetown, within our mobile service area — no driving to a washbay, no waiting."
          />
          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {[
              { label: "2 Mobile Visits / Month", d: mobile.standard.v2, dl: mobile.large.v2 },
              { label: "4 Mobile Visits / Month", d: mobile.standard.v4, dl: mobile.large.v4 },
            ].map(({ label, d, dl }) => (
              <div key={label} className="rounded-xl border-2 border-brand-200 bg-white p-6 shadow-sm">
                <p className="text-xs font-bold uppercase tracking-wider text-brand-700">{label}</p>
                <dl className="mt-3 space-y-2.5 text-sm">
                  <div className="flex justify-between gap-3">
                    <dt className="text-slate-600">Car, SUV &amp; Pickup</dt>
                    <dd className="font-bold text-navy-900">{d.formatted}</dd>
                  </div>
                  <div className="flex justify-between gap-3">
                    <dt className="text-slate-600">Large SUV / 7-Seater &amp; Canter</dt>
                    <dd className="font-bold text-navy-900">{dl.formatted}</dd>
                  </div>
                </dl>
              </div>
            ))}
          </div>
          <p className="mt-5 max-w-2xl text-sm leading-relaxed text-slate-600">
            Mobile visits are scheduled within CDCS&apos;s standard service area and require normal
            site access (parking, water where needed). It is not an unlimited-travel service —
            locations outside the standard area are confirmed with CDCS before enrollment.
          </p>
          <div className="mt-6">
            <WashCareCta
              href={MOBILE_ESTIMATE_HREF}
              event="washcare_cta_clicked"
              params={{ cta: "mobile_estimate", channel: "mobile" }}
              variant="primary"
              icon={<IconArrowRight className="h-4 w-4" />}
            >
              Estimate My WashCare Plan
            </WashCareCta>
          </div>
        </div>
      </section>

      {/* ================= WASHCARE FLEET ================= */}
      <section id="fleet" className="scroll-mt-24 relative overflow-hidden bg-navy-950 py-16 sm:py-24">
        <div className="pointer-events-none absolute inset-0 bg-grid-dark opacity-50" aria-hidden />
        <div className="container-page relative">
          <SectionHeading
            eyebrow="WashCare Fleet"
            title="A Scheduled Wash Programme for Your Fleet"
            description="For company cars, SUVs, pickups, vans, canters, trucks, haulers, and other commercial vehicles — washed on-site, on a schedule your fleet can rely on."
            light
          />
          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {[
              { label: "3–5 Vehicles", d: fleet.small },
              { label: "6–10 Vehicles", d: fleet.medium },
              { label: "11–20 Vehicles", d: fleet.large },
            ].map(({ label, d }) => (
              <div key={label} className="rounded-xl border border-white/15 bg-white/5 p-5 text-center">
                <p className="text-xs font-bold uppercase tracking-wider text-accent-400">{label}</p>
                <p className="mt-2 text-xl font-black leading-tight text-white sm:text-2xl">{d.formatted}</p>
                <p className="mt-1 text-xs text-slate-400">
                  Example — mid-size trucks, exterior wash, 4×/month
                </p>
              </div>
            ))}
          </div>
          <p className="mt-6 max-w-2xl text-sm leading-relaxed text-slate-300">
            Figures above are illustrative examples, not a quote — actual pricing depends on
            vehicle mix, wash scope, condition, and frequency. Fleet plans combine a fleet-size
            discount with a recurring-service saving, capped at {washcareCapPct}% in total, and
            keep the same volume protections and condition-based escalation as a one-time fleet
            wash. Fleets of {fleetCustomAgreementThreshold}+ vehicles, or with operationally
            complex requirements, are set up as a <strong className="text-white">Fleet Service
            Agreement</strong> following a short assessment.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <WashCareCta
              href="/quote/"
              event="washcare_fleet_requested"
              params={{ cta: "fleet_primary" }}
              variant="accent"
              size="lg"
              icon={<IconArrowRight className="h-5 w-5" />}
            >
              Request a Fleet WashCare Plan
            </WashCareCta>
            <WashCareCta
              href={FLEET_ESTIMATE_HREF}
              event="washcare_cta_clicked"
              params={{ cta: "fleet_estimate", channel: "fleet" }}
              variant="outline"
              size="lg"
            >
              Estimate My Fleet WashCare Plan
            </WashCareCta>
          </div>
        </div>
      </section>

      {/* ================= INCLUSIONS / EXCLUSIONS ================= */}
      <section className="bg-white py-16 sm:py-24">
        <div className="container-page">
          <div className="grid gap-8 lg:grid-cols-2">
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 sm:p-8">
              <SectionHeading eyebrow="Included" title="What a WashCare Visit Covers" />
              <ul className="mt-6 space-y-2.5 text-sm">
                {included.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 leading-relaxed text-slate-700">
                    <IconCheck className="mt-0.5 h-5 w-5 shrink-0 text-brand-600" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border border-slate-200 p-6 sm:p-8">
              <SectionHeading eyebrow="Available Separately" title="Specialist Services" />
              <p className="mt-4 text-sm leading-relaxed text-slate-600">
                These stay separate from a standard WashCare plan unless specifically added — just
                ask and CDCS will quote the extra work.
              </p>
              <ul className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2 text-sm text-slate-700">
                {separate.map((item) => (
                  <li key={item} className="leading-snug">{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ================= SUBSCRIPTION TERMS (friendly, not a wall of legal text) ================= */}
      <section className="bg-slate-50 py-16 sm:py-24">
        <div className="container-page">
          <SectionHeading eyebrow="Good to Know" title="How a WashCare Plan Works" />
          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            {rules.map((r) => (
              <div key={r} className="flex items-start gap-3 rounded-lg border border-slate-200 bg-white px-4 py-3.5 text-sm leading-relaxed text-slate-700">
                <IconCheck className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" />
                {r}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= FAQ ================= */}
      <Faq items={faqItems} title="WashCare — Frequently Asked Questions" />

      {/* ================= FINAL CTA ================= */}
      <section className="relative overflow-hidden bg-navy-900">
        <div className="pointer-events-none absolute inset-0 bg-grid-dark opacity-40" aria-hidden />
        <div className="pointer-events-none absolute inset-0 brand-glow opacity-80" aria-hidden />
        <div className="container-page relative py-16 sm:py-20">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Ready for One Less Thing to Remember?
            </h2>
            <p className="mt-4 text-base leading-relaxed text-slate-200 sm:text-lg">
              Get your exact WashCare monthly figure in a couple of minutes, or ask the CDCS team
              directly on WhatsApp.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <WashCareCta
                href={HERO_ESTIMATE_HREF}
                event="washcare_cta_clicked"
                params={{ cta: "bottom_get_plan", channel: "general" }}
                variant="accent"
                size="lg"
                icon={<IconArrowRight className="h-5 w-5" />}
              >
                Get My WashCare Plan
              </WashCareCta>
              <WashCareCta
                href={WHATSAPP_HREF}
                event="washcare_whatsapp_clicked"
                params={{ cta: "bottom", channel: "general" }}
                variant="outline"
                size="lg"
                icon={<IconWhatsapp className="h-5 w-5" />}
                external
              >
                Ask About WashCare on WhatsApp
              </WashCareCta>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
