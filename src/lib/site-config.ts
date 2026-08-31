// Central configuration for CDCS Inc. — update contact details, socials, and
// copy toggles here and they propagate across the entire site.

export const siteConfig = {
  companyName: "Capital Detailing & Cleaning Services Inc.",
  brandName: "CDCS Inc.",
  brandShort: "CDCS",
  tagline: "Professional Cleaning. Powerful Results.",
  description:
    "Professional cleaning services in Guyana. CDCS Inc. provides commercial and janitorial cleaning, pressure washing, fleet washing, mobile detailing, and specialized facility cleaning.",
  // Canonical origin for the site. Must exactly match the primary domain
  // configured in Vercel (www is primary; the bare apex 308-redirects to it).
  // Used for canonical URLs, Open Graph, sitemap, robots, and JSON-LD.
  url: "https://www.cdcsincgy.com",
  location: {
    city: "Georgetown",
    country: "Guyana",
    // TODO: add a specific street address here once you have a public office
    // address to display. Left intentionally general per company instructions.
    display: "Georgetown, Guyana",
  },
  contact: {
    phoneDisplay: "+592 625-2141",
    phoneHref: "tel:+5926252141",
    whatsappNumber: "5926252141",
    get whatsappHref() {
      return `https://wa.me/${this.whatsappNumber}`;
    },
    whatsappHrefWithMessage: (message: string) =>
      `https://wa.me/5926252141?text=${encodeURIComponent(message)}`,
    email: "cdcsincgy@gmail.com",
    emailHref: "mailto:cdcsincgy@gmail.com",
  },
  social: {
    handle: "@cdcsinc",
    instagram: "https://instagram.com/cdcsinc",
    facebook: "https://facebook.com/cdcsinc",
  },
  // Configure this to point at a form backend (e.g. Formspree, Web3Forms,
  // your own API route) to receive quote requests by email. Until it is
  // configured the form falls back to opening a pre-filled email/WhatsApp
  // message so no lead is ever lost. See README.md for setup steps.
  quoteFormEndpoint: process.env.NEXT_PUBLIC_QUOTE_FORM_ENDPOINT || "",
  analytics: {
    // Google Analytics 4 Measurement ID (format G-XXXXXXXXXX). Not a secret —
    // it ships in client JS on every GA site. The env var lets you override it
    // per environment; the fallback keeps the live site working with no Vercel
    // config. Analytics only load on the domain in `url` above — never from
    // localhost or Vercel preview URLs — see src/components/Analytics.tsx.
    gaId: process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || "G-EDWXCW6NXW",
  },
};

export type SiteConfig = typeof siteConfig;

// Social-sharing card, shared by every page's Open Graph + Twitter metadata.
// Static 1200x630 PNG committed at public/og-image.png; regenerate it with
// `npm run og:image` (scripts/generate-og-image.mjs) after brand/copy changes.
export const ogImage = {
  url: "/og-image.png",
  width: 1200,
  height: 630,
  type: "image/png",
  alt: `${siteConfig.brandName} — professional commercial cleaning, pressure washing, fleet washing, and mobile detailing in Guyana.`,
};
