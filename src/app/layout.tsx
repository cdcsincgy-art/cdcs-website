import type { Metadata } from "next";
import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/600.css";
import "@fontsource/inter/700.css";
import "@fontsource/sora/600.css";
import "@fontsource/sora/700.css";
import "@fontsource/sora/800.css";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";
import { Analytics } from "@/components/Analytics";
import { siteConfig, ogImage } from "@/lib/site-config";
import { services } from "@/lib/services-data";

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
  icons: {
    icon: "/favicon.ico",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": `${siteConfig.url}/#business`,
  name: siteConfig.companyName,
  alternateName: siteConfig.brandName,
  description: siteConfig.description,
  slogan: siteConfig.tagline,
  url: siteConfig.url,
  image: `${siteConfig.url}${ogImage.url}`,
  telephone: siteConfig.contact.phoneDisplay,
  email: siteConfig.contact.email,
  knowsLanguage: ["en"],
  address: {
    "@type": "PostalAddress",
    addressLocality: siteConfig.location.city,
    addressCountry: "GY",
  },
  areaServed: [
    { "@type": "Country", name: "Guyana" },
    { "@type": "City", name: "Georgetown" },
  ],
  contactPoint: {
    "@type": "ContactPoint",
    telephone: siteConfig.contact.phoneDisplay,
    email: siteConfig.contact.email,
    contactType: "customer service",
    areaServed: "GY",
    availableLanguage: "English",
  },
  sameAs: [siteConfig.social.instagram, siteConfig.social.facebook],
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
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://www.googletagmanager.com" />
      </head>
      <body className="antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Header />
        <main>{children}</main>
        <Footer />
        <WhatsAppFloat />
        <Analytics />
      </body>
    </html>
  );
}
