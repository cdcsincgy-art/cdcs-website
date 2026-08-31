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
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `Cleaning Services Guyana | Commercial & Janitorial Cleaning | CDCS Inc.`,
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
    title: `Cleaning Services Guyana | CDCS Inc.`,
    description: siteConfig.description,
  },
  twitter: {
    card: "summary_large_image",
    title: `Cleaning Services Guyana | CDCS Inc.`,
    description: siteConfig.description,
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
  url: siteConfig.url,
  telephone: siteConfig.contact.phoneDisplay,
  email: siteConfig.contact.email,
  address: {
    "@type": "PostalAddress",
    addressLocality: siteConfig.location.city,
    addressCountry: "GY",
  },
  areaServed: {
    "@type": "Country",
    name: "Guyana",
  },
  sameAs: [siteConfig.social.instagram, siteConfig.social.facebook],
  makesOffer: [
    "Commercial & Janitorial Cleaning",
    "Pressure Washing",
    "Mobile Detailing",
    "Fleet Washing",
    "Deep Cleaning",
    "Upholstery & Fabric Extraction",
    "Post-Construction Cleaning",
    "Commercial Facility Cleaning",
  ].map((name) => ({
    "@type": "Offer",
    itemOffered: { "@type": "Service", name },
  })),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="antialiased">
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Header />
        <main>{children}</main>
        <Footer />
        <WhatsAppFloat />
      </body>
    </html>
  );
}
