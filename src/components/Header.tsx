"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "@/components/Logo";
import { Button } from "@/components/ui/Button";
import { IconPhone, IconWhatsapp } from "@/components/icons";
import { siteConfig } from "@/lib/site-config";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/services/", label: "Services" },
  { href: "/industries/", label: "Industries" },
  { href: "/our-work/", label: "Our Work" },
  { href: "/about/", label: "About" },
  { href: "/contact/", label: "Contact" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200">
      {/* This inner wrapper carries the blur/translucency. backdrop-filter
          establishes a CSS containing block for fixed descendants, so it
          must NOT wrap the mobile menu panel below — otherwise the panel
          would be positioned relative to this header instead of the
          viewport. Keep the panel as a direct child of <header> instead. */}
      <div className="bg-white/95 backdrop-blur">
        {/* Top utility bar */}
        <div className="hidden bg-navy-950 text-slate-200 lg:block">
          <div className="container-page flex items-center justify-between py-2 text-xs">
            <p className="font-medium tracking-wide">
              Serving businesses, organizations &amp; individuals across Guyana
            </p>
            <div className="flex items-center gap-5">
              <a href={siteConfig.contact.emailHref} className="hover:text-accent-400">
                {siteConfig.contact.email}
              </a>
              <a href={siteConfig.contact.phoneHref} className="flex items-center gap-1.5 hover:text-accent-400">
                <IconPhone className="h-3.5 w-3.5" />
                {siteConfig.contact.phoneDisplay}
              </a>
            </div>
          </div>
        </div>

        <div className="container-page flex items-center justify-between py-3">
          <Logo />

          <nav className="hidden items-center gap-7 lg:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-semibold text-slate-700 transition-colors hover:text-brand-600"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <a
              href={siteConfig.contact.phoneHref}
              className="flex items-center gap-2 text-sm font-bold text-navy-900 hover:text-brand-600"
            >
              <IconPhone className="h-4 w-4" />
              {siteConfig.contact.phoneDisplay}
            </a>
            <Button href="/quote/" size="md">
              Request a Quote
            </Button>
          </div>

          {/* Mobile controls */}
          <div className="flex items-center gap-2 lg:hidden">
            <a
              href={siteConfig.contact.phoneHref}
              aria-label="Call CDCS Inc."
              className="flex h-11 w-11 items-center justify-center rounded-md border border-slate-200 text-navy-900"
            >
              <IconPhone className="h-5 w-5" />
            </a>
            <a
              href={siteConfig.contact.whatsappHrefWithMessage("Hello CDCS, I'd like to request a quote.")}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp CDCS Inc."
              className="flex h-11 w-11 items-center justify-center rounded-md bg-[#25D366] text-white"
            >
              <IconWhatsapp className="h-5 w-5" />
            </a>
            <button
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
              className="flex h-11 w-11 flex-col items-center justify-center gap-1.5 rounded-md border border-slate-200"
            >
              <span className={`h-0.5 w-5 bg-navy-900 transition-transform ${open ? "translate-y-2 rotate-45" : ""}`} />
              <span className={`h-0.5 w-5 bg-navy-900 transition-opacity ${open ? "opacity-0" : ""}`} />
              <span className={`h-0.5 w-5 bg-navy-900 transition-transform ${open ? "-translate-y-2 -rotate-45" : ""}`} />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu panel */}
      {open && (
        <div className="fixed top-[65px] right-0 bottom-0 left-0 z-30 flex flex-col bg-white lg:hidden">
          <nav className="flex flex-1 flex-col gap-1 overflow-y-auto px-5 py-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-md px-3 py-3.5 text-base font-semibold text-navy-900 hover:bg-slate-50"
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="border-t border-slate-200 px-5 py-5">
            <Button href="/quote/" variant="accent" size="lg" className="w-full">
              Request a Quote
            </Button>
            <a
              href={siteConfig.contact.phoneHref}
              className="mt-3 flex items-center justify-center gap-2 rounded-md border-2 border-navy-900 px-5 py-3.5 text-sm font-bold text-navy-900"
            >
              <IconPhone className="h-4 w-4" />
              Call {siteConfig.contact.phoneDisplay}
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
