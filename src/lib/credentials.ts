// CDCS company credentials — the single source for every place a credential
// is shown (homepage strip, About, /credentials/, Oil & Gas page) and for the
// `hasCredential` JSON-LD in layout.tsx.
//
// Content rules:
// - Every value here must match the issuing authority's public record. The
//   Local Content certificate below was checked against the official register
//   at https://localcontent.gov.gy/certificate/LCSR-2026282-AF8326EB3B.
// - Approved sectors are quoted exactly as the register words them. The
//   registration covers ONSHORE industrial cleaning — never imply offshore
//   work, operator approval, vendor prequalification, or contract award.
// - The site is static, so pages can't know today's date at view time. Show
//   validity as plain dates ("Valid to …"), never "currently valid", and link
//   to the register, which always shows the live status.
// - The registered street address appears on the register but is deliberately
//   NOT published on this site (management decision).

import { siteConfig } from "./site-config";

export interface CredentialDocument {
  /** Public path of the official PDF — a byte-identical copy of the issued file. */
  pdf: string;
  /** Suggested filename when downloading. */
  downloadName: string;
  /** Human-readable file size, shown on the download button. */
  pdfSize: string;
  /**
   * Preview image base path under /public. Files are `${image}-${w}.webp` for
   * each width in `widths`, plus a `${image}-${fallbackWidth}.jpg` fallback.
   */
  image: string;
  widths: number[];
  fallbackWidth: number;
  /** Intrinsic aspect of the preview (largest size), for layout reservation. */
  width: number;
  height: number;
}

export const localContentCertificate = {
  /** Title exactly as printed on the certificate. */
  name: "Local Content Certificate of Registration",
  holder: siteConfig.companyName,
  number: "LCSR-2026282-AF8326EB3B",
  /** Signatory and legal basis, as printed on the certificate. */
  issuedBy: "the Minister, Ministry with responsibility for Petroleum",
  legalBasis: "Section 6(2) of the Local Content Act",
  /** Body that administers the public register (per localcontent.gov.gy). */
  issuer: "Local Content Secretariat",
  issuerParent: "Ministry of Natural Resources",
  issuerCountry: "Government of Guyana",
  issuerUrl: "https://localcontent.gov.gy/",
  registerName: "Local Content Register",
  registerSearchUrl: "https://localcontent.gov.gy/registry",
  verifyUrl: "https://localcontent.gov.gy/certificate/LCSR-2026282-AF8326EB3B",
  /** ISO dates (YYYY-MM-DD). */
  validFrom: "2026-10-09",
  validTo: "2027-10-09",
  /**
   * Named sectors exactly as listed on the register. The register also shows
   * an unnamed "Other" tag, which isn't repeated here because it says nothing
   * on its own — the register link shows the full listing.
   */
  approvedSectors: ["Industrial Cleaning services (Onshore)", "Janitorial and Laundry Services"],
  /**
   * The official certificate file, published unaltered (management decision,
   * 2026-10-11 — it prints the registered address, which is otherwise kept off
   * the site). The PDF is a byte-identical copy of the issued file; previews
   * were rendered from it (pdf.js, 3x) and resized with sharp. Never edit the
   * PDF or substitute a mock-up. On renewal, add the new file under a new name.
   */
  document: {
    pdf: "/documents/cdcs-local-content-certificate-2026.pdf",
    downloadName: "CDCS-Local-Content-Certificate-LCSR-2026282-AF8326EB3B.pdf",
    pdfSize: "1.5 MB",
    image: "/images/credentials/local-content-certificate-2026",
    widths: [320, 640, 1200, 1800],
    fallbackWidth: 1200,
    width: 1800,
    height: 1391,
  } as CredentialDocument | undefined,
};

/** Descriptive alt text for any rendering of the certificate. */
export function certificateAlt(): string {
  const c = localContentCertificate;
  return `Government of Guyana ${c.name} ${c.number} issued to ${c.holder}, issue date ${formatCredentialDate(c.validFrom)}, expiry date ${formatCredentialDate(c.validTo)}`;
}

/** "October 9, 2026" — fixed to UTC so the build machine's timezone can't shift the day. */
export function formatCredentialDate(iso: string): string {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}

// Build-time reminder: static pages built near or after expiry keep showing
// the stored dates, so warn whoever builds the site to renew and update.
{
  const daysLeft = Math.floor(
    (Date.parse(`${localContentCertificate.validTo}T00:00:00Z`) - Date.now()) / 86_400_000,
  );
  if (daysLeft <= 60) {
    console.warn(
      daysLeft < 0
        ? `[credentials] Local Content certificate ${localContentCertificate.number} expired on ${localContentCertificate.validTo}. Update src/lib/credentials.ts with the renewed certificate or remove it.`
        : `[credentials] Local Content certificate ${localContentCertificate.number} expires in ${daysLeft} days (${localContentCertificate.validTo}). Update src/lib/credentials.ts once renewed.`,
    );
  }
}

/**
 * schema.org credential node for the business entity. Every property is also
 * visible on /credentials/.
 */
export function localContentCredentialLd() {
  const c = localContentCertificate;
  return {
    "@type": "EducationalOccupationalCredential",
    "@id": `${siteConfig.url}/credentials/#local-content-certificate`,
    name: c.name,
    credentialCategory: "Local Content Certificate of Registration",
    identifier: c.number,
    url: c.verifyUrl,
    ...(c.document
      ? { image: `${siteConfig.url}${c.document.image}-${c.document.fallbackWidth}.jpg` }
      : {}),
    dateCreated: c.validFrom,
    expires: c.validTo,
    validIn: { "@type": "Country", name: "Guyana" },
    recognizedBy: {
      "@type": "GovernmentOrganization",
      name: `${c.issuer}, ${c.issuerParent}`,
      url: c.issuerUrl,
    },
    description: `Approved sectors and subsectors: ${c.approvedSectors.join("; ")}.`,
  };
}
