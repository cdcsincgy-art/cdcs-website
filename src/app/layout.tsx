import type { Metadata } from "next";
import { Inter, Manrope } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";
import { MobileActionBar } from "@/components/MobileActionBar";
import { industries } from "@/lib/content-data";
import { Analytics } from "@/components/Analytics";
import { ContactLinkTracker } from "@/components/ContactLinkTracker";
import { RevealObserver } from "@/components/motion/RevealObserver";
import { ScrollEffects } from "@/components/motion/ScrollEffects";
import { siteConfig, ogImage } from "@/lib/site-config";
import { services } from "@/lib/services-data";
import { localContentCredentialLd, gcciMembership } from "@/lib/credentials";

// Fonts via next/font: self-hosted from this site at build time (no browser
// requests to Google, so the CSP font-src 'self' still holds), preloaded, and
// with metric-matched fallbacks so text doesn't shift when the font arrives.
// Variable fonts cover every weight in one file each (was 8 separate files).
//
// Manrope — premium/brand typeface for headings, navigation, buttons, the
// brand wordmark, and the estimator's/WashCare's headline figures and plan
// names. Body copy, forms, the estimator's questions/tables, and all
// small/legal text stay on Inter (see --font-sans / --font-heading in
// globals.css) — Manrope is used for short, prominent text, not extended
// reading copy.
const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const manrope = Manrope({ subsets: ["latin"], variable: "--font-manrope", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `Cleaning Services in Guyana | ${siteConfig.brandName}`,
    template: `%s | ${siteConfig.brandName}`,
  },
  description: siteConfig.description,
  keywords: [
    "commercial cleaning Guyana",
    "cleaning company Guyana",
    "janitorial services Guyana",
    "pressure washing Guyana",
    "mobile detailing Guyana",
    "fleet washing Guyana",
    "commercial carpet cleaning Guyana",
    "office cleaning Georgetown Guyana",
    "commercial cleaning Georgetown",
    "post construction cleaning Guyana",
    "deep cleaning Guyana",
  ],
  authors: [{ name: siteConfig.companyName }],
  openGraph: {
    type: "website",
    locale: "en_GY",
    url: siteConfig.url,
    siteName: siteConfig.brandName,
    images: [ogImage],
  },
  twitter: {
    card: "summary_large_image",
    images: [ogImage],
  },
  // favicon.ico / icon.png / apple-icon.png are provided by the App Router
  // file conventions in src/app/ — regenerate with `npm run logo:assets`.
};

// One connected entity graph for the whole site: the CDCS business
// (ProfessionalService, @id #business) and the website (@id #website) that
// publishes it. Service pages, article publishers, and breadcrumbs all point
// back to #business by @id, so Google resolves them to this single entity.
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ProfessionalService",
      "@id": `${siteConfig.url}/#business`,
      name: siteConfig.companyName,
      legalName: siteConfig.companyName,
      alternateName: [siteConfig.brandName, siteConfig.companyNameAmpersand],
      description: siteConfig.description,
      slogan: siteConfig.tagline,
      url: `${siteConfig.url}/`,
      foundingDate: siteConfig.foundingDate,
      logo: `${siteConfig.url}/images/cdcs-logo.png`,
      image: [
        `${siteConfig.url}${ogImage.url}`,
        `${siteConfig.url}/images/projects/commercial-cleaning/commercial-cleaning-facility-interior.jpg`,
        `${siteConfig.url}/images/projects/fleet-washing/fleet-washing-truck-covered-in-foam.jpg`,
        `${siteConfig.url}/images/projects/upholstery-extraction/upholstery-extraction-car-seat-before-after.jpg`,
      ],
      telephone: siteConfig.contact.phoneE164,
      email: siteConfig.contact.email,
      knowsLanguage: ["en"],
      knowsAbout: [
        "Janitorial services",
        "Commercial and office cleaning",
        "Deep cleaning",
        "Post-construction cleaning",
        "Pressure washing",
        "Commercial carpet cleaning",
        "Upholstery and office chair cleaning",
        "Car wash and mobile vehicle washing",
        "Mobile vehicle detailing",
        "Fleet washing",
        "Heavy equipment washing",
      ],
      address: {
        "@type": "PostalAddress",
        addressLocality: siteConfig.location.city,
        addressRegion: siteConfig.location.region,
        addressCountry: "GY",
      },
      areaServed: [
        { "@type": "City", name: "Georgetown" },
        { "@type": "AdministrativeArea", name: siteConfig.location.region },
        { "@type": "Country", name: "Guyana" },
      ],
      contactPoint: {
        "@type": "ContactPoint",
        telephone: siteConfig.contact.phoneE164,
        email: siteConfig.contact.email,
        contactType: "customer service",
        areaServed: "GY",
        availableLanguage: "English",
      },
      // Includes the official GCCI member-directory listing for CDCS — an
      // independent page about this business.
      sameAs: [siteConfig.social.instagram, siteConfig.social.facebook, gcciMembership.listingUrl],
      // Shown in full, with a link to the official register, on /credentials/.
      hasCredential: localContentCredentialLd(),
      // Chamber membership (a business-association membership, not a credential).
      memberOf: {
        "@type": "Organization",
        name: gcciMembership.organization,
        alternateName: gcciMembership.shortName,
        url: gcciMembership.organizationUrl,
      },
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Cleaning & facility services",
        itemListElement: services.map((s) => ({
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: s.title,
            description: s.shortDescription,
            url: `${siteConfig.url}/services/${s.slug}/`,
          },
        })),
      },
    },
    {
      "@type": "WebSite",
      "@id": `${siteConfig.url}/#website`,
      url: `${siteConfig.url}/`,
      name: siteConfig.brandName,
      alternateName: siteConfig.companyName,
      inLanguage: "en",
      publisher: { "@id": `${siteConfig.url}/#business` },
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-scroll-behavior="smooth" className={`${inter.variable} ${manrope.variable}`}>
      <head>
        <link rel="preconnect" href="https://www.googletagmanager.com" />
      </head>
      <body className="antialiased">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70] focus:rounded-md focus:bg-navy-900 focus:px-4 focus:py-3 focus:text-sm focus:font-bold focus:text-white"
        >
          Skip to main content
        </a>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {/* Only titles and links go to the client header — not full service content. */}
        <Header
          services={services.map((s) => ({ href: `/services/${s.slug}/`, label: s.title }))}
          industries={industries.map((i) => ({ href: i.page ?? `/industries/#${i.id}`, label: i.name }))}
        />
        <main id="main-content" tabIndex={-1} className="focus:outline-none">
          {children}
        </main>
        <Footer />
        <WhatsAppFloat />
        <MobileActionBar />
        <Analytics />
        <ContactLinkTracker />
        <RevealObserver />
        <ScrollEffects />
      </body>
    </html>
  );
}
