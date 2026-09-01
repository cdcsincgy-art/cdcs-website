"use client";

import { useEffect } from "react";
import { trackContactClick, type ContactMethod } from "@/lib/analytics";

/**
 * One delegated click listener that records GA4 conversion events when a
 * visitor clicks a primary contact method anywhere on the site:
 *
 *   tel:  links      -> phone_click
 *   mailto: links    -> email_click
 *   wa.me / WhatsApp -> whatsapp_click
 *
 * Why delegation instead of per-link handlers:
 *  - the contact links live in server components (Header, Footer, CTABanner,
 *    page bodies) — a single document listener avoids turning them all into
 *    client components or scattering gtag() calls;
 *  - it automatically covers any contact link added later;
 *  - the existing markup, destination URLs, target/rel, and UX are untouched.
 *
 * The click event bubbles to `document` before the browser opens the dialer /
 * mail app / WhatsApp, and every contact link either opens an external handler
 * or a new tab, so the current page never unloads first — the event is sent
 * reliably on both desktop and mobile. No event fires on page load.
 */

function classify(href: string): ContactMethod | null {
  const h = href.trim().toLowerCase();
  if (h.startsWith("tel:")) return "phone";
  if (h.startsWith("mailto:")) return "email";
  if (
    h.startsWith("https://wa.me/") ||
    h.startsWith("http://wa.me/") ||
    h.includes("//api.whatsapp.com/") ||
    h.includes("//web.whatsapp.com/")
  ) {
    return "whatsapp";
  }
  return null;
}

function linkLocation(anchor: Element): string {
  const tagged = anchor.closest<HTMLElement>("[data-analytics-location]");
  if (tagged?.dataset.analyticsLocation) return tagged.dataset.analyticsLocation;
  if (anchor.closest("header")) return "header";
  if (anchor.closest("footer")) return "footer";

  const path = window.location.pathname;
  if (path.startsWith("/contact")) return "contact_page";
  if (path.startsWith("/quote")) return "quote_page";
  if (path.startsWith("/services")) return "service_page";
  if (path === "/" || path === "") return "homepage";
  return "page_body";
}

export function ContactLinkTracker() {
  useEffect(() => {
    function onClick(event: MouseEvent) {
      const el = event.target;
      if (!(el instanceof Element)) return;
      const anchor = el.closest("a");
      if (!anchor) return;

      const href = anchor.getAttribute("href");
      if (!href) return;

      const method = classify(href);
      if (!method) return;

      trackContactClick(method, { link_location: linkLocation(anchor) });
    }

    // Single bubble-phase listener -> exactly one event per click, no
    // duplicates from nested handlers.
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return null;
}
