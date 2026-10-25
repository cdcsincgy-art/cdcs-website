"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { ACTION_BAR_HIDDEN_ON } from "@/components/MobileActionBar";

/**
 * Page-level scroll affordances, all without scroll listeners:
 *
 * - A reading-progress bar (pure CSS scroll timeline; see `.scroll-progress`).
 * - `data-scrolled` on <html> once the page leaves the top, for the header
 *   shadow — from an IntersectionObserver on an 8px sentinel.
 * - A back-to-top button after about one screen of scrolling — the same
 *   sentinel, observed with the root extended one viewport upward, stops
 *   intersecting only after that much scrolling. The sentinel is tiny, so it
 *   never adds height to short pages.
 */
export function ScrollEffects() {
  const pathname = usePathname() ?? "/";
  const sentinel = useRef<HTMLDivElement>(null);
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const el = sentinel.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const root = document.documentElement;

    const header = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) root.removeAttribute("data-scrolled");
      else root.setAttribute("data-scrolled", "");
    });
    const far = new IntersectionObserver(([entry]) => setShowTop(!entry.isIntersecting), {
      rootMargin: "100% 0px 0px 0px",
    });
    header.observe(el);
    far.observe(el);
    return () => {
      header.disconnect();
      far.disconnect();
      root.removeAttribute("data-scrolled");
    };
  }, []);

  // Pages without the mobile action bar get the button lower on phones.
  const noActionBar = ACTION_BAR_HIDDEN_ON.some((p) => pathname === p || pathname.startsWith(`${p}/`));

  const toTop = () => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
    // Keyboard users continue from the top of the page, not from the button:
    // focus the first header link that is actually displayed at this width.
    const first = [...document.querySelectorAll<HTMLElement>("header a[href]")].find(
      (el) => el.getClientRects().length > 0,
    );
    first?.focus({ preventScroll: true });
  };

  return (
    <>
      <div
        ref={sentinel}
        aria-hidden
        className="pointer-events-none absolute left-0 top-0 h-2 w-px"
      />
      <div aria-hidden className="scroll-progress" />
      <button
        type="button"
        onClick={toTop}
        aria-label="Back to top"
        tabIndex={showTop ? 0 : -1}
        aria-hidden={!showTop}
        className={`fixed right-4 z-30 flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white/95 text-navy-900 shadow-lg shadow-navy-900/15 backdrop-blur transition-[opacity,transform] duration-300 hover:bg-navy-900 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600 lg:right-7 lg:bottom-24 ${
          noActionBar
            ? "bottom-[calc(1rem+env(safe-area-inset-bottom))]"
            : "bottom-[calc(4.25rem+env(safe-area-inset-bottom))]"
        } ${showTop ? "opacity-100" : "pointer-events-none translate-y-3 opacity-0"}`}
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-5 w-5" aria-hidden>
          <path d="M12 19V5M5 12l7-7 7 7" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
    </>
  );
}
