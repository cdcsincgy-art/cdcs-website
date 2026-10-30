"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { IconPhone, IconWhatsapp } from "@/components/icons";
import { siteConfig } from "@/lib/site-config";

// Routes with their own prominent contact controls, where a fixed bar would
// only compete with (or cover) the page's own actions.
export const ACTION_BAR_HIDDEN_ON = ["/estimate", "/washcare"];

/**
 * Phone/tablet contact bar (below `lg`): Call · WhatsApp · Request a Quote,
 * fixed to the bottom of the screen. It replaces the floating WhatsApp button
 * on small screens so contact options aren't duplicated, and renders a spacer
 * of its own height so it never covers the end of the page.
 */
export function MobileActionBar() {
  const pathname = usePathname() ?? "/";
  if (ACTION_BAR_HIDDEN_ON.some((p) => pathname === p || pathname.startsWith(`${p}/`))) {
    return null;
  }
  const onQuotePage = pathname.startsWith("/quote");

  const cell =
    "flex min-h-14 flex-1 flex-col items-center justify-center gap-0.5 text-xs font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2";

  return (
    <>
      <div aria-hidden className="h-[calc(3.5rem+env(safe-area-inset-bottom))] lg:hidden" />
      <nav
        aria-label="Contact CDCS"
        data-analytics-location="mobile_action_bar"
        className="fixed inset-x-0 bottom-0 z-30 flex border-t border-slate-200 bg-white pb-[env(safe-area-inset-bottom)] shadow-[0_-4px_16px_rgba(15,23,42,0.08)] lg:hidden"
      >
        <a href={siteConfig.contact.phoneHref} className={`${cell} text-navy-900 focus-visible:outline-brand-600`}>
          <IconPhone className="h-5 w-5" />
          Call
        </a>
        <a
          href={siteConfig.contact.whatsappHrefWithMessage("Hello CDCS, I'd like to request a quote.")}
          target="_blank"
          rel="noopener noreferrer"
          className={`${cell} border-l border-slate-200 text-navy-900 focus-visible:outline-brand-600`}
        >
          <IconWhatsapp className="h-5 w-5 text-[#1DA851]" />
          WhatsApp
        </a>
        {!onQuotePage && (
          <Link
            href="/quote/"
            className={`${cell} bg-accent-500 text-navy-950 focus-visible:outline-navy-900`}
          >
            <span className="text-sm">Request a Quote</span>
          </Link>
        )}
      </nav>
    </>
  );
}
