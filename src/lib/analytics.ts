type Gtag = (command: string, ...args: unknown[]) => void;

/**
 * Send a GA4 event. Safe no-op when analytics isn't loaded — on the server,
 * in development, on Vercel preview URLs, or before gtag.js has finished
 * loading. See src/components/Analytics.tsx for how GA4 is set up.
 *
 * Never pass personally identifying information (name, email, phone, free
 * text) in `params` — GA4's terms prohibit it and it isn't needed for
 * reporting.
 */
export function trackEvent(name: string, params?: Record<string, unknown>) {
  if (typeof window === "undefined") return;
  const gtag = (window as unknown as { gtag?: Gtag }).gtag;
  gtag?.("event", name, params);
}

/** Primary contact methods we measure as conversions. */
export type ContactMethod = "whatsapp" | "phone" | "email";

const CONTACT_EVENT: Record<ContactMethod, string> = {
  whatsapp: "whatsapp_click",
  phone: "phone_click",
  email: "email_click",
};

/**
 * Record a click on a primary contact method (WhatsApp / phone / email) as a
 * GA4 event. Fired by <ContactLinkTracker> on real link clicks only — never on
 * page load.
 *
 * `transport_type: "beacon"` makes gtag.js send the hit with
 * `navigator.sendBeacon`, so it still leaves the browser after the click hands
 * off to the dialer / mail app / WhatsApp and the tab is backgrounded or
 * frozen. Without it the `/g/collect` request is routinely cancelled on that
 * navigation and the event never reaches GA4.
 *
 * No PII: the phone number and email address themselves are never sent. Only
 * the method, a coarse on-page location (header, footer, floating_button, …),
 * and the current path — all non-identifying. `transport_type` is consumed by
 * gtag.js and is not recorded as an event parameter.
 */
export function trackContactClick(
  method: ContactMethod,
  params?: { link_location?: string },
) {
  const payload: Record<string, unknown> = {
    contact_method: method,
    link_location: params?.link_location ?? "unknown",
    transport_type: "beacon",
  };
  if (typeof window !== "undefined") {
    payload.page_path = window.location.pathname;
  }
  trackEvent(CONTACT_EVENT[method], payload);
}
