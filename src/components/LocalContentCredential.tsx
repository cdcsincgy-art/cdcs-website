import Link from "next/link";
import { IconArrowRight, IconDownload, IconExternal, IconShield } from "@/components/icons";
import {
  localContentCertificate as cert,
  certificateAlt,
  formatCredentialDate,
  type CredentialDocument,
} from "@/lib/credentials";

/** Shown wherever the certificate is described in full. */
export const credentialDisclaimer =
  "Registration on the Local Content Register confirms CDCS's registration status. It does not by itself constitute prequalification, vendor approval, or the award of any contract.";

/**
 * Responsive rendering of the official certificate preview: WebP srcset with a
 * JPEG fallback; width/height reserve the space so nothing shifts on load.
 */
function CertificateImage({
  doc,
  sizes,
  alt,
  className = "",
  priority = false,
}: {
  doc: CredentialDocument;
  sizes: string;
  alt: string;
  className?: string;
  priority?: boolean;
}) {
  return (
    <picture>
      <source
        type="image/webp"
        srcSet={doc.widths.map((w) => `${doc.image}-${w}.webp ${w}w`).join(", ")}
        sizes={sizes}
      />
      <img
        src={`${doc.image}-${doc.fallbackWidth}.jpg`}
        alt={alt}
        width={doc.width}
        height={doc.height}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        className={className}
      />
    </picture>
  );
}

/**
 * Small certificate thumbnail if the official file has been supplied,
 * otherwise a neutral emblem — never a mock-up of the certificate itself.
 */
function CertificateVisual({ size }: { size: "sm" | "md" }) {
  const doc = cert.document;
  if (doc) {
    return (
      <span className="block shrink-0">
        <CertificateImage
          doc={doc}
          sizes={size === "sm" ? "96px" : "128px"}
          alt={`Preview of the ${cert.name}`}
          className={`${size === "sm" ? "w-24" : "w-32"} h-auto rounded border border-slate-200 bg-white shadow-sm`}
        />
      </span>
    );
  }
  return (
    <span
      aria-hidden
      className={`flex shrink-0 items-center justify-center rounded-xl bg-navy-900 text-accent-400 ${
        size === "sm" ? "h-14 w-14" : "h-16 w-16"
      }`}
    >
      <IconShield className={size === "sm" ? "h-7 w-7" : "h-8 w-8"} />
    </span>
  );
}

function VerifyLink({ className = "" }: { className?: string }) {
  return (
    <a
      href={cert.verifyUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center gap-1.5 font-bold text-brand-600 hover:text-brand-700 hover:underline ${className}`}
    >
      Verify on the official register
      <IconExternal className="h-4 w-4" />
      <span className="sr-only">(opens the {cert.issuer} website in a new tab)</span>
    </a>
  );
}

/**
 * Local Content certificate summary.
 * - "strip": compact full-width band (homepage).
 * - "card": bordered card with full details and disclaimer (About, industry pages).
 */
export function LocalContentCredential({
  variant = "card",
  headingLevel = "h2",
  linkToCredentials = true,
}: {
  variant?: "strip" | "card";
  headingLevel?: "h2" | "h3";
  /** Card only: link to /credentials/ (off on that page itself). */
  linkToCredentials?: boolean;
}) {
  const Heading = headingLevel;
  const validity = `${formatCredentialDate(cert.validFrom)} – ${formatCredentialDate(cert.validTo)}`;

  if (variant === "strip") {
    return (
      <section aria-labelledby="local-content-strip" className="border-b border-slate-200 bg-slate-50">
        <div className="container-page flex flex-col gap-5 py-8 lg:flex-row lg:items-center lg:gap-8">
          <div className="flex items-start gap-4 lg:flex-1">
            {/* Mouse/touch shortcut only — the text link below is the accessible one. */}
            <Link href="/credentials/" tabIndex={-1} aria-hidden className="shrink-0">
              <CertificateVisual size="sm" />
            </Link>
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-brand-600">
                {cert.issuerCountry} · {cert.registerName}
              </p>
              <Heading id="local-content-strip" className="mt-1 text-lg font-bold leading-snug text-navy-900 sm:text-xl">
                Registered on Guyana&apos;s Local Content Register
              </Heading>
              <dl className="mt-2 flex flex-col gap-x-6 gap-y-1 text-sm text-slate-600 sm:flex-row sm:flex-wrap">
                <div>
                  <dt className="inline font-semibold text-navy-800">Certificate: </dt>
                  <dd className="inline font-mono text-[13px]">{cert.number}</dd>
                </div>
                <div>
                  <dt className="inline font-semibold text-navy-800">Valid: </dt>
                  <dd className="inline">{validity}</dd>
                </div>
                <div>
                  <dt className="inline font-semibold text-navy-800">Sectors: </dt>
                  <dd className="inline">{cert.approvedSectors.join(" · ")}</dd>
                </div>
              </dl>
            </div>
          </div>
          <div className="flex flex-col gap-3 text-sm sm:flex-row sm:items-center sm:gap-6 lg:shrink-0">
            <VerifyLink />
            <Link
              href="/credentials/"
              className="inline-flex items-center gap-1.5 font-bold text-navy-900 hover:text-brand-600"
            >
              View company credentials
              <IconArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
        <CertificateVisual size="md" />
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-brand-600">
            {cert.issuerCountry} · {cert.registerName}
          </p>
          <Heading className="mt-1 text-xl font-bold leading-snug text-navy-900 sm:text-2xl">
            {cert.name}
          </Heading>
          <p className="mt-1 text-sm text-slate-600">
            Issued by {cert.issuedBy}, under {cert.legalBasis}
          </p>
        </div>
      </div>

      <dl className="mt-6 grid gap-x-8 gap-y-4 border-t border-slate-200 pt-6 text-sm sm:grid-cols-2">
        <div>
          <dt className="font-semibold text-slate-500">Registered company</dt>
          <dd className="mt-0.5 font-semibold text-navy-900">{cert.holder}</dd>
        </div>
        <div>
          <dt className="font-semibold text-slate-500">Certificate number</dt>
          <dd className="mt-0.5 font-mono font-semibold text-navy-900">{cert.number}</dd>
        </div>
        <div>
          <dt className="font-semibold text-slate-500">Valid from</dt>
          <dd className="mt-0.5 font-semibold text-navy-900">
            <time dateTime={cert.validFrom}>{formatCredentialDate(cert.validFrom)}</time>
          </dd>
        </div>
        <div>
          <dt className="font-semibold text-slate-500">Valid to</dt>
          <dd className="mt-0.5 font-semibold text-navy-900">
            <time dateTime={cert.validTo}>{formatCredentialDate(cert.validTo)}</time>
          </dd>
        </div>
        <div className="sm:col-span-2">
          <dt className="font-semibold text-slate-500">Approved sectors (as listed on the register)</dt>
          <dd className="mt-2 flex flex-wrap gap-2">
            {cert.approvedSectors.map((s) => (
              <span
                key={s}
                className="rounded-full border border-brand-600/20 bg-brand-50 px-3 py-1 text-xs font-semibold text-navy-900"
              >
                {s}
              </span>
            ))}
          </dd>
        </div>
      </dl>

      <p className="mt-6 text-xs leading-relaxed text-slate-500">{credentialDisclaimer}</p>

      <div className="mt-5 flex flex-col gap-3 text-sm sm:flex-row sm:flex-wrap sm:items-center sm:gap-6">
        <VerifyLink />
        {cert.document?.pdf && (
          <a
            href={cert.document.pdf}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 font-bold text-navy-900 hover:text-brand-600"
          >
            View Official Certificate
            <IconExternal className="h-4 w-4" />
            <span className="sr-only">(PDF, opens in a new tab)</span>
          </a>
        )}
        {linkToCredentials && (
          <Link
            href="/credentials/"
            className="inline-flex items-center gap-1.5 font-bold text-navy-900 hover:text-brand-600"
          >
            View company credentials
            <IconArrowRight className="h-4 w-4" />
          </Link>
        )}
      </div>
    </div>
  );
}

/**
 * Large preview of the official certificate with "View" and "Download"
 * actions (/credentials/). Renders nothing until the real file is supplied.
 */
export function CertificatePreview() {
  const doc = cert.document;
  if (!doc) return null;
  const btn =
    "font-heading inline-flex w-full items-center justify-center gap-2 rounded-md px-5 py-3 text-sm font-semibold tracking-wide transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 sm:w-auto";
  return (
    <div className="mx-auto max-w-4xl">
      <figure className="rounded-2xl border border-slate-200 bg-white p-2 shadow-xl shadow-navy-900/10 sm:p-3">
        <a
          href={doc.pdf}
          target="_blank"
          rel="noopener noreferrer"
          className="block overflow-hidden rounded-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600"
        >
          <CertificateImage
            doc={doc}
            sizes="(min-width: 1024px) 872px, calc(100vw - 56px)"
            alt={certificateAlt()}
            className="h-auto w-full"
          />
          <span className="sr-only">(opens the official certificate PDF in a new tab)</span>
        </a>
        <figcaption className="px-2 pb-1 pt-3 text-center text-xs leading-relaxed text-slate-500">
          {cert.name} {cert.number}, issued under {cert.legalBasis}. Shown exactly as issued.
        </figcaption>
      </figure>
      <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
        <a
          href={doc.pdf}
          target="_blank"
          rel="noopener noreferrer"
          className={`${btn} bg-brand-600 text-white shadow-sm shadow-brand-900/10 hover:bg-brand-700 focus-visible:outline-brand-600`}
        >
          View Official Certificate
          <IconExternal className="h-4 w-4" />
          <span className="sr-only">(PDF, opens in a new tab)</span>
        </a>
        <a
          href={doc.pdf}
          download={doc.downloadName}
          type="application/pdf"
          className={`${btn} border-2 border-navy-800 text-navy-900 hover:bg-navy-900 hover:text-white focus-visible:outline-navy-900`}
        >
          Download Certificate (PDF)
          <IconDownload className="h-4 w-4" />
          <span className="sr-only">, {doc.pdfSize}</span>
        </a>
      </div>
      <p className="mt-3 text-center text-xs text-slate-500">PDF · {doc.pdfSize}</p>
    </div>
  );
}
