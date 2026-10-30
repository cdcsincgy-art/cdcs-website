import Link from "next/link";
import { IconArrowRight, IconExternal } from "@/components/icons";
import { GcciLogo } from "@/components/GcciMembership";
import {
  localContentCertificate as cert,
  formatCredentialDate,
  gcciMembership as gcci,
} from "@/lib/credentials";
import { siteConfig } from "@/lib/site-config";

const NUMBER_WORDS = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten"];

/**
 * Whole years of operation since the founding date, as of this build. The
 * site is static, so this is accurate to the last deploy (it ticks over on the
 * first build after each anniversary).
 */
function yearsOperating(): number {
  const founded = new Date(`${siteConfig.foundingDate}T00:00:00Z`);
  const now = new Date();
  let years = now.getUTCFullYear() - founded.getUTCFullYear();
  const beforeAnniversary =
    now.getUTCMonth() < founded.getUTCMonth() ||
    (now.getUTCMonth() === founded.getUTCMonth() && now.getUTCDate() < founded.getUTCDate());
  if (beforeAnniversary) years -= 1;
  return years;
}

const cardCls =
  "relative flex h-full flex-col rounded-2xl border p-6 shadow-sm sm:p-7";
const eyebrowCls = "text-[11px] font-bold uppercase tracking-[0.18em] text-brand-600";

/**
 * The three corporate credentials side by side: GCCI membership (with the
 * official GCCI logo), Local Content registration (with a preview of the
 * official certificate), and years of operation. Only real documents and the
 * GCCI's own logo are shown — no invented badges or seals.
 */
export function CredentialsShowcase({
  headingLevel = "h3",
  className = "",
}: {
  headingLevel?: "h2" | "h3";
  className?: string;
}) {
  const Heading = headingLevel;
  const doc = cert.document;
  const years = yearsOperating();
  const foundingYear = siteConfig.foundingDate.slice(0, 4);
  // "Four Years of Operations" — only for a sensible count (static build).
  const yearsLabel =
    years > 0 && years <= 10
      ? `${NUMBER_WORDS[years][0].toUpperCase()}${NUMBER_WORDS[years].slice(1)} Year${years === 1 ? "" : "s"} of Operations`
      : "";

  return (
    <ul data-reveal="stagger" className={`grid gap-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-6 ${className}`}>
      {/* GCCI — the whole card links to CDCS's official directory listing. */}
      <li>
        <a
          href={gcci.listingUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={`${cardCls} group border-slate-200 bg-white transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-1 hover:border-navy-900/20 hover:shadow-lg hover:shadow-navy-900/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600`}
        >
          <div className="flex flex-col items-start gap-4 sm:flex-row sm:gap-5 md:flex-col md:gap-4 xl:flex-row xl:gap-5">
            <GcciLogo className="h-16 w-auto shrink-0 sm:h-20" />
            <div className="min-w-0">
              <p className={eyebrowCls}>Chamber Membership</p>
              <Heading className="mt-1.5 text-lg font-semibold leading-snug text-navy-900">
                {gcci.organization} Member
              </Heading>
            </div>
          </div>
          <p className="mt-5 inline-flex w-fit items-center rounded-full bg-navy-900 px-3 py-1 text-xs font-semibold text-white">
            Member Since {gcci.memberSince}
          </p>
          <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-600">
            Listed in the Chamber&apos;s official member directory. Membership is not a certification
            or an endorsement of CDCS services.
          </p>
          <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-brand-600 group-hover:text-brand-700">
            View official GCCI listing
            <IconExternal className="h-4 w-4" />
          </span>
          <span className="sr-only">(opens the {gcci.organization} website in a new tab)</span>
        </a>
      </li>

      {/* Local Content — preview of the official certificate as issued. */}
      <li>
        <div className={`${cardCls} border-slate-200 bg-white`}>
          <div className="flex flex-col items-start gap-4 sm:flex-row sm:gap-5 md:flex-col md:gap-4 xl:flex-row xl:gap-5">
            {doc ? (
              <picture className="shrink-0">
                <source type="image/webp" srcSet={`${doc.image}-320.webp 320w`} sizes="112px" />
                <img
                  src={`${doc.image}-${doc.fallbackWidth}.jpg`}
                  alt={`Preview of the official ${cert.name}`}
                  width={doc.width}
                  height={doc.height}
                  loading="lazy"
                  decoding="async"
                  className="h-auto w-24 rounded border border-slate-200 bg-white shadow-sm sm:w-28"
                />
              </picture>
            ) : null}
            <div className="min-w-0">
              <p className={eyebrowCls}>{cert.issuerCountry}</p>
              <Heading className="mt-1.5 text-lg font-semibold leading-snug text-navy-900">
                Local Content Registered
              </Heading>
            </div>
          </div>
          <dl className="mt-5 space-y-1.5 text-sm">
            <div className="flex flex-wrap gap-x-2">
              <dt className="font-semibold text-slate-500">Certificate</dt>
              <dd className="font-mono text-[13px] font-semibold text-navy-900">{cert.number}</dd>
            </div>
            <div className="flex flex-wrap gap-x-2">
              <dt className="font-semibold text-slate-500">Valid to</dt>
              <dd className="font-semibold text-navy-900">
                <time dateTime={cert.validTo}>{formatCredentialDate(cert.validTo)}</time>
              </dd>
            </div>
          </dl>
          <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-600">
            {cert.name} on the public {cert.registerName}.
          </p>
          <div className="mt-4 flex flex-col gap-1 text-sm">
            <a
              href={cert.verifyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center gap-1.5 font-bold text-brand-600 hover:text-brand-700"
            >
              Verify on the official register
              <IconExternal className="h-4 w-4" />
              <span className="sr-only">(opens the {cert.issuer} website in a new tab)</span>
            </a>
          </div>
        </div>
      </li>

      {/* Years of operation — plain typography, no badge. */}
      <li className="md:col-span-2 lg:col-span-1">
        <div className={`${cardCls} overflow-hidden border-navy-900 bg-navy-950 text-white`}>
          <div aria-hidden className="pointer-events-none absolute inset-0 parallax-bg bg-grid-dark opacity-50" />
          <div className="relative flex flex-1 flex-col">
            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-accent-400">Company Experience</p>
            <Heading className="mt-1.5 text-lg font-semibold leading-snug">
              Established {foundingYear}
              {yearsLabel && <span className="block text-slate-300">{yearsLabel}</span>}
            </Heading>
            <p aria-hidden className="mt-4 font-heading text-6xl font-semibold leading-none tracking-tight text-accent-400 sm:text-7xl">
              {foundingYear}
            </p>
            <p className="mt-4 flex-1 text-sm leading-relaxed text-slate-300">
              Commercial cleaning, pressure washing, fleet washing, and facility services in
              Guyana since {foundingYear}.
            </p>
            <Link
              href="/about/"
              className="mt-4 inline-flex min-h-11 items-center gap-1.5 text-sm font-bold text-accent-400 hover:text-accent-300"
            >
              About CDCS
              <IconArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </li>
    </ul>
  );
}
