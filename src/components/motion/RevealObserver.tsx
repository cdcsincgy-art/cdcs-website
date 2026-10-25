"use client";

import { useLayoutEffect } from "react";
import { usePathname } from "next/navigation";

const SELECTOR = "[data-reveal]";

/**
 * Drives the `data-reveal` entrance animations (styles in globals.css) with
 * one shared IntersectionObserver — no scroll listeners.
 *
 * Server HTML is fully visible. Only after this runs does <html> get
 * `.reveal-ready`, which lets CSS hide not-yet-revealed items, so if the
 * script never runs nothing is hidden. On the first load, anything already on
 * screen is marked `.is-shown` before paint (no flash, no animation); the rest
 * animate once as they scroll into view. Elements added later (client
 * navigation, filtered gallery sections) are picked up by a MutationObserver.
 * Reduced-motion visitors get no reveals at all.
 */
export function RevealObserver() {
  const pathname = usePathname();

  useLayoutEffect(() => {
    if (
      typeof IntersectionObserver === "undefined" ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    const root = document.documentElement;
    const firstRun = !root.classList.contains("reveal-ready");

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add("is-revealed");
          io.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -8% 0px" },
    );

    const track = (el: Element) => {
      if (el.classList.contains("is-revealed") || el.classList.contains("is-shown")) return;
      if (firstRun) {
        const r = el.getBoundingClientRect();
        if (r.bottom > 0 && r.top < window.innerHeight && r.height > 0) {
          el.classList.add("is-shown");
          return;
        }
      }
      io.observe(el);
    };

    document.querySelectorAll(SELECTOR).forEach(track);
    root.classList.add("reveal-ready");

    const mo = new MutationObserver((mutations) => {
      for (const m of mutations) {
        m.addedNodes.forEach((node) => {
          if (!(node instanceof Element)) return;
          if (node.matches(SELECTOR)) io.observe(node);
          node.querySelectorAll(SELECTOR).forEach((el) => io.observe(el));
        });
      }
    });
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      io.disconnect();
      mo.disconnect();
    };
  }, [pathname]);

  return null;
}
