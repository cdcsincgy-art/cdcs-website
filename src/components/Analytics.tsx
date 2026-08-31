import Script from "next/script";
import { siteConfig } from "@/lib/site-config";

const GA_ID = siteConfig.analytics.gaId;

// The one hostname allowed to report. Derived from siteConfig.url so it stays
// in sync with the canonical domain.
let PROD_HOST = "";
try {
  PROD_HOST = new URL(siteConfig.url).hostname;
} catch {
  /* malformed siteConfig.url — analytics stays disabled */
}

/**
 * Google Analytics 4 via gtag.js.
 *
 * - Loads after hydration (`strategy="afterInteractive"`) so it stays off the
 *   critical render path. A `<link rel="preconnect">` is set in layout.tsx.
 * - A single inline script gates on `location.hostname`: nothing loads or
 *   sends on localhost or Vercel preview URLs, so development traffic never
 *   reaches the GA property. No React state, so no hydration mismatch.
 * - Pageviews for client-side route changes are handled automatically by GA4's
 *   "Enhanced measurement -> page changes based on browser history events".
 */
export function Analytics() {
  if (!GA_ID || !PROD_HOST) return null;

  return (
    <Script id="ga4" strategy="afterInteractive">
      {`
        if (location.hostname === ${JSON.stringify(PROD_HOST)}) {
          window.dataLayer = window.dataLayer || [];
          window.gtag = function gtag(){ dataLayer.push(arguments); };
          gtag('js', new Date());
          gtag('config', ${JSON.stringify(GA_ID)});
          var s = document.createElement('script');
          s.async = true;
          s.src = 'https://www.googletagmanager.com/gtag/js?id=' + ${JSON.stringify(GA_ID)};
          document.head.appendChild(s);
        }
      `}
    </Script>
  );
}
