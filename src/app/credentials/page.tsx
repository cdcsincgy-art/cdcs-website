import type { Metadata } from "next";
import Link from "next/link";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CTABanner } from "@/components/CTABanner";
import { CertificatePreview, LocalContentCredential } from "@/components/LocalContentCredential";
import { GcciMembership } from "@/components/GcciMembership";
import { CredentialsShowcase } from "@/components/CredentialsShowcase";
import { IconExternal } from "@/components/icons";
import { localContentCertificate as cert, gcciMembership } from "@/lib/credentials";
import { siteConfig } from "@/lib/site-config";
import { pageLd, socialMetadata, type BreadcrumbItem } from "@/lib/seo";

const CREDENTIALS_TITLE = "Company Credentials & Local Content Registration | CDCS Inc.";
const CREDENTIALS_DESCRIPTION = `${siteConfig.companyName} (CDCS Inc.) registration details and Government of Guyana Local Content Certificate ${cert.number}.`;

export const metadata: Metadata = {
  title: { absolute: CREDENTIALS_TITLE },
  description: CREDENTIALS_DESCRIPTION,
  alternates: { canonical: "/credentials/" },
  ...socialMetadata({
    title: CREDENTIALS_TITLE,
    description: CREDENTIALS_DESCRIPTION,
    path: "/credentials/",
  }),
};

const trail: BreadcrumbItem[] = [
  { name: "Home", path: "/" },
  { name: "Credentials", path: "/credentials/" },
];

const pageJsonLd = pageLd({
  path: "/credentials/",
  name: CREDENTIALS_TITLE,
  description: CREDENTIALS_DESCRIPTION,
  trail,
  extra: { mentions: { "@id": `${siteConfig.url}/credentials/#local-content-certificate` } },
});

const companyFacts = [
  { label: "Registered company name", value: siteConfig.companyName },
  { label: "Trading as", value: siteConfig.brandName },
  { label: "Operating since", value: siteConfig.foundingDate.slice(0, 4) },
  { label: "Chamber membership", value: `${gcciMembership.shortName} member since ${gcciMembership.memberSince}` },
  { label: "Based in", value: siteConfig.location.display },
  { label: "Service area", value: `Georgetown, ${siteConfig.location.region}, and across Guyana` },
];

export default function CredentialsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pageJsonLd) }}
      />

      <section className="relative overflow-hidden bg-navy-950 py-16 sm:py-20">
        <div className="pointer-events-none absolute inset-0 bg-grid-dark opacity-50" aria-hidden />
        <div className="pointer-events-none absolute inset-0 brand-glow opacity-80" aria-hidden />
        <div className="container-page relative">
          <Breadcrumbs trail={trail} />
          <p className="mb-4 flex items-center gap-2.5 text-xs font-bold uppercase tracking-[0.22em] text-accent-400">
            <span className="h-px w-6 bg-accent-400/60" aria-hidden />
            Credentials
          </p>
          <h1 className="max-w-3xl text-pretty text-4xl font-extrabold leading-[1.1] tracking-tight text-white sm:text-5xl">
            Company Credentials &amp; Registration
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-slate-300 sm:text-lg">
            Registration details for {siteConfig.companyName}, for procurement teams, facility
            managers, and contractors evaluating CDCS as a cleaning services provider in Guyana.
          </p>
        </div>
      </section>

      <section aria-labelledby="credentials-overview" className="border-b border-slate-200 bg-slate-50 py-12 sm:py-16">
        <div className="container-page">
          <h2 id="credentials-overview" className="sr-only">
            Credentials at a glance
          </h2>
          <CredentialsShowcase />
        </div>
      </section>

      <section className="bg-white py-16 sm:py-24">
        <div className="container-page grid gap-12 lg:grid-cols-[minmax(0,24rem)_1fr] lg:gap-16">
          <div>
            <SectionHeading eyebrow="Company" title="Company Details" />
            <dl className="mt-8 divide-y divide-slate-200 border-y border-slate-200 text-sm">
              {companyFacts.map((f) => (
                <div key={f.label} className="py-3.5">
                  <dt className="font-semibold text-slate-500">{f.label}</dt>
                  <dd className="mt-0.5 font-semibold text-navy-900">{f.value}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div>
            <SectionHeading eyebrow="Local Content" title="Local Content Registration" />
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-600">
              CDCS holds a Government of Guyana {cert.name}, issued under {cert.legalBasis}.
              The company is listed on the public {cert.registerName}, administered by the{" "}
              {cert.issuer} of the {cert.issuerParent}, under the approved sectors shown below.
            </p>
            <div className="mt-8">
              <LocalContentCredential headingLevel="h3" linkToCredentials={false} />
            </div>
          </div>
        </div>
      </section>

      {cert.document && (
        <section aria-labelledby="official-certificate" className="border-t border-slate-200 bg-white py-16 sm:py-24">
          <div className="container-page">
            <div className="mx-auto max-w-2xl text-center">
              <p className="mb-4 flex items-center justify-center gap-2.5 text-xs font-bold uppercase tracking-[0.22em] text-brand-600">
                <span className="h-px w-6 bg-brand-600/50" aria-hidden />
                Official Document
              </p>
              <h2
                id="official-certificate"
                className="text-pretty text-[1.9rem] font-bold leading-[1.15] tracking-tight text-navy-900 sm:text-4xl"
              >
                Local Content Certificate of Registration
              </h2>
              <p className="mt-4 text-base leading-relaxed text-slate-600">
                The certificate as issued. Open the PDF to view it at full resolution, or download
                a copy for your vendor file.
              </p>
            </div>
            <div className="mt-10">
              <CertificatePreview />
            </div>
          </div>
        </section>
      )}

      <section aria-labelledby="gcci-membership" className="border-t border-slate-200 bg-white py-16 sm:py-24">
        <div className="container-page grid gap-10 lg:grid-cols-[minmax(0,26rem)_1fr] lg:gap-16">
          <div>
            <p className="mb-4 flex items-center gap-2.5 text-xs font-bold uppercase tracking-[0.22em] text-brand-600">
              <span className="h-px w-6 bg-brand-600/50" aria-hidden />
              Chamber Membership
            </p>
            <h2
              id="gcci-membership"
              className="text-pretty text-[1.9rem] font-bold leading-[1.15] tracking-tight text-navy-900 sm:text-4xl"
            >
              Georgetown Chamber of Commerce &amp; Industry Membership
            </h2>
            <p className="mt-4 text-base leading-relaxed text-slate-600">
              {siteConfig.companyName} has been a member of the {gcciMembership.organization} (
              {gcciMembership.shortName}) since {gcciMembership.memberSince}. The company is listed in
              the Chamber&apos;s official member directory.
            </p>
          </div>
          <GcciMembership headingLevel="h3" />
        </div>
      </section>

      <section className="bg-slate-50 py-16 sm:py-24">
        <div className="container-page grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <SectionHeading eyebrow="Verification" title="How to Verify Our Registration" />
            <ol className="mt-8 space-y-4 text-sm leading-relaxed text-slate-700">
              <li className="flex gap-4">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-navy-900 text-xs font-black text-white">1</span>
                <span>
                  Open the{" "}
                  <a
                    href={cert.registerSearchUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 font-semibold text-brand-600 hover:underline"
                  >
                    public {cert.registerName}
                    <IconExternal className="h-3.5 w-3.5" />
                    <span className="sr-only">(opens in a new tab)</span>
                  </a>{" "}
                  on the {cert.issuer}&apos;s website.
                </span>
              </li>
              <li className="flex gap-4">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-navy-900 text-xs font-black text-white">2</span>
                <span>
                  Search for the company name {siteConfig.companyName} or the certificate
                  number <span className="font-mono font-semibold text-navy-900">{cert.number}</span>.
                </span>
              </li>
              <li className="flex gap-4">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-navy-900 text-xs font-black text-white">3</span>
                <span>
                  The register shows the certificate&apos;s current status, validity dates, and
                  approved sectors. You can also go{" "}
                  <a
                    href={cert.verifyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 font-semibold text-brand-600 hover:underline"
                  >
                    straight to the certificate record
                    <IconExternal className="h-3.5 w-3.5" />
                    <span className="sr-only">(opens in a new tab)</span>
                  </a>
                  .
                </span>
              </li>
            </ol>
          </div>

          <div>
            <SectionHeading eyebrow="Procurement" title="Vendor & Procurement Enquiries" />
            <p className="mt-4 text-base leading-relaxed text-slate-600">
              For vendor registration, tender, or supplier-qualification enquiries, contact CDCS
              directly and tell us what your process requires. We&apos;ll respond with the
              information we can provide.
            </p>
            <ul className="mt-6 space-y-2 text-sm">
              <li>
                <span className="font-semibold text-slate-500">Email: </span>
                <a href={siteConfig.contact.emailHref} className="font-semibold text-brand-600 hover:underline">
                  {siteConfig.contact.email}
                </a>
              </li>
              <li>
                <span className="font-semibold text-slate-500">Phone / WhatsApp: </span>
                <a href={siteConfig.contact.phoneHref} className="font-semibold text-brand-600 hover:underline">
                  {siteConfig.contact.phoneDisplay}
                </a>
              </li>
            </ul>
            <p className="mt-6 text-sm text-slate-600">
              See also the{" "}
              <Link href="/industries/" className="font-semibold text-brand-600 hover:underline">
                industries we serve
              </Link>
              , our{" "}
              <Link href="/industries/oil-and-gas/" className="font-semibold text-brand-600 hover:underline">
                oil and gas support services
              </Link>
              , and{" "}
              <Link href="/projects/" className="font-semibold text-brand-600 hover:underline">
                project case studies
              </Link>
              .
            </p>
          </div>
        </div>
      </section>

      <CTABanner
        title="Evaluating Cleaning Contractors?"
        description="Tell us about your facility, fleet, or site and we'll prepare a scope and quotation for your review."
      />
    </>
  );
}
