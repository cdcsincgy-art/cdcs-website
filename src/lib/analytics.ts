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
