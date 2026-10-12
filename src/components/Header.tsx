"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "@/components/Logo";
import { Button } from "@/components/ui/Button";
import { IconArrowRight, IconChevronDown, IconPhone, IconWhatsapp } from "@/components/icons";
import { siteConfig } from "@/lib/site-config";

export interface NavLink {
  href: string;
  label: string;
  /** Optional one-line description shown in dropdown panels. */
  note?: string;
}

interface Menu {
  id: "services" | "industries" | "work";
  label: string;
  /** Section landing page, shown as the first mobile item and panel footer. */
  featured?: NavLink;
  links: NavLink[];
  footer: NavLink[];
  /** Desktop panel layout. */
  columns: 1 | 2;
}

type NavItem = { type: "link"; link: NavLink } | { type: "menu"; menu: Menu };

const QUOTE_MESSAGE = "Hello CDCS, I'd like to request a quote.";

/**
 * Site header. Service and industry lists are passed in from the (server)
 * layout so this client component doesn't bundle the full service content.
 *
 * Dropdowns follow the disclosure-navigation pattern: a real <button> with
 * aria-expanded controls a panel of ordinary links. They open on click (and
 * on hover with a fine pointer), and close on Escape (returning focus to the
 * button), outside click, focus leaving the menu, or navigation.
 */
export function Header({ services, industries }: { services: NavLink[]; industries: NavLink[] }) {
  const pathname = usePathname() ?? "/";
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<Menu["id"] | null>(null);
  const [mobileSection, setMobileSection] = useState<Menu["id"] | null>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const hoverTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const oilGas = industries.find((i) => i.href === "/industries/oil-and-gas/");
  const menus: Record<Menu["id"], Menu> = {
    services: {
      id: "services",
      label: "Services",
      links: services,
      footer: [
        { href: "/services/", label: "All services" },
        { href: "/estimate/", label: "Get an instant estimate" },
      ],
      columns: 2,
    },
    industries: {
      id: "industries",
      label: "Industries",
      featured: oilGas && {
        ...oilGas,
        note: "Cleaning and facility support from a Local Content–registered Guyanese contractor",
      },
      links: industries.filter((i) => i !== oilGas),
      footer: [{ href: "/industries/", label: "All industries" }],
      columns: 2,
    },
    work: {
      id: "work",
      label: "Our Work",
      links: [
        { href: "/our-work/", label: "Photo gallery", note: "Photos from CDCS jobs, by service" },
        { href: "/projects/", label: "Project case studies", note: "Scope, method, and photos from site" },
      ],
      footer: [],
      columns: 1,
    },
  };

  const navItems: NavItem[] = [
    { type: "link", link: { href: "/", label: "Home" } },
    { type: "link", link: { href: "/about/", label: "About" } },
    { type: "menu", menu: menus.services },
    { type: "menu", menu: menus.industries },
    { type: "menu", menu: menus.work },
    { type: "link", link: { href: "/credentials/", label: "Credentials" } },
    { type: "link", link: { href: "/contact/", label: "Contact" } },
  ];

  const isCurrent = (href: string) => (href === "/" ? pathname === "/" : pathname === href);
  const menuIsActive = (m: Menu) =>
    [...m.links, ...m.footer, ...(m.featured ? [m.featured] : [])].some(
      (l) => l.href !== "/" && pathname.startsWith(l.href.split("#")[0]),
    ) || (m.id === "services" && pathname.startsWith("/services/"));

  // Close everything on navigation (state adjusted during render when the
  // route changes — React's recommended alternative to a reset effect).
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setMobileOpen(false);
    setOpenMenu(null);
    setMobileSection(null);
  }

  // Desktop dropdowns: close on outside click and on Escape.
  useEffect(() => {
    if (!openMenu) return;
    const onDown = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) setOpenMenu(null);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        const id = openMenu;
        setOpenMenu(null);
        navRef.current?.querySelector<HTMLButtonElement>(`[data-menu-trigger="${id}"]`)?.focus();
      }
    };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [openMenu]);

  // Mobile menu: lock body scroll; focus into the panel; Escape / back closes.
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    if (!mobileOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMobileOpen(false);
        triggerRef.current?.focus();
      }
    };
    const onPop = () => setMobileOpen(false);
    window.addEventListener("keydown", onKey);
    window.addEventListener("popstate", onPop);
    panelRef.current?.querySelector<HTMLElement>("a, button")?.focus();
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("popstate", onPop);
    };
  }, [mobileOpen]);

  const hoverOpen = (id: Menu["id"]) => (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse") return; // touch uses click
    if (hoverTimer.current) clearTimeout(hoverTimer.current);
    setOpenMenu(id);
  };
  const hoverClose = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse") return;
    if (hoverTimer.current) clearTimeout(hoverTimer.current);
    hoverTimer.current = setTimeout(() => setOpenMenu(null), 180);
  };

  const linkCls = (active: boolean) =>
    `font-heading whitespace-nowrap text-sm font-semibold transition-colors hover:text-brand-600 ${
      active ? "text-brand-600" : "text-slate-700"
    }`;

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

        <div className="container-page flex items-center justify-between gap-4 py-3">
          <Logo compactAtLg />

          {/* ---------- Desktop navigation ---------- */}
          <nav ref={navRef} aria-label="Primary" className="hidden items-center gap-4 lg:flex xl:gap-7">
            {navItems.map((item) => {
              if (item.type === "link") {
                const active = isCurrent(item.link.href);
                return (
                  <Link
                    key={item.link.href}
                    href={item.link.href}
                    aria-current={active ? "page" : undefined}
                    className={linkCls(active)}
                  >
                    {item.link.label}
                  </Link>
                );
              }
              const m = item.menu;
              const expanded = openMenu === m.id;
              return (
                <div
                  key={m.id}
                  className="relative"
                  onPointerEnter={hoverOpen(m.id)}
                  onPointerLeave={hoverClose}
                  onBlur={(e) => {
                    if (!e.currentTarget.contains(e.relatedTarget as Node)) setOpenMenu(null);
                  }}
                >
                  <button
                    type="button"
                    data-menu-trigger={m.id}
                    aria-expanded={expanded}
                    aria-controls={`menu-${m.id}`}
                    onClick={() => setOpenMenu(expanded ? null : m.id)}
                    className={`${linkCls(menuIsActive(m))} flex items-center gap-1 py-2`}
                  >
                    {m.label}
                    <IconChevronDown
                      className={`h-3.5 w-3.5 transition-transform ${expanded ? "rotate-180" : ""}`}
                    />
                  </button>
                  {expanded && (
                    // pt-3 bridges the gap so the pointer can travel into the panel.
                    <div
                      id={`menu-${m.id}`}
                      className="absolute left-1/2 top-full z-50 -translate-x-1/2 pt-3"
                    >
                      <div
                        className={`rounded-xl border border-slate-200 bg-white p-3 shadow-xl shadow-navy-900/15 ${
                          m.columns === 2 ? "w-[36rem]" : "w-80"
                        }`}
                      >
                        {m.featured && (
                          <Link
                            href={m.featured.href}
                            aria-current={isCurrent(m.featured.href) ? "page" : undefined}
                            className="mb-2 flex items-center justify-between gap-3 rounded-lg bg-navy-950 px-4 py-3 text-white hover:bg-navy-900"
                          >
                            <span>
                              <span className="block text-sm font-bold">{m.featured.label}</span>
                              {m.featured.note && (
                                <span className="mt-0.5 block text-xs text-slate-300">{m.featured.note}</span>
                              )}
                            </span>
                            <IconArrowRight className="h-4 w-4 shrink-0 text-accent-400" />
                          </Link>
                        )}
                        <ul className={`grid gap-0.5 ${m.columns === 2 ? "grid-cols-2" : ""}`}>
                          {m.links.map((l) => (
                            <li key={l.href}>
                              <Link
                                href={l.href}
                                aria-current={isCurrent(l.href) ? "page" : undefined}
                                className={`block rounded-md px-3 py-2 text-sm hover:bg-slate-50 ${
                                  isCurrent(l.href) ? "font-semibold text-brand-600" : "text-navy-900"
                                }`}
                              >
                                <span className="font-semibold">{l.label}</span>
                                {l.note && <span className="mt-0.5 block text-xs text-slate-600">{l.note}</span>}
                              </Link>
                            </li>
                          ))}
                        </ul>
                        {m.footer.length > 0 && (
                          <div className="mt-2 flex flex-wrap gap-x-5 gap-y-1 border-t border-slate-100 px-3 pt-3">
                            {m.footer.map((l) => (
                              <Link
                                key={l.href}
                                href={l.href}
                                className="inline-flex items-center gap-1 text-sm font-bold text-brand-600 hover:text-brand-700"
                              >
                                {l.label}
                                <IconArrowRight className="h-3.5 w-3.5" />
                              </Link>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </nav>

          <div className="hidden items-center gap-4 lg:flex">
            <a
              href={siteConfig.contact.phoneHref}
              className="font-heading hidden items-center gap-2 text-sm font-bold text-navy-900 hover:text-brand-600 xl:flex"
            >
              <IconPhone className="h-4 w-4" />
              {siteConfig.contact.phoneDisplay}
            </a>
            <Button href="/quote/" size="md" className="whitespace-nowrap">
              Request a Quote
            </Button>
          </div>

          {/* ---------- Mobile control (calls / WhatsApp / quote live in the bottom action bar) ---------- */}
          <button
            ref={triggerRef}
            type="button"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            onClick={() => setMobileOpen((v) => !v)}
            className="flex h-11 w-11 flex-col items-center justify-center gap-1.5 rounded-md border border-slate-200 lg:hidden"
          >
            <span className={`h-0.5 w-5 bg-navy-900 transition-transform ${mobileOpen ? "translate-y-2 rotate-45" : ""}`} />
            <span className={`h-0.5 w-5 bg-navy-900 transition-opacity ${mobileOpen ? "opacity-0" : ""}`} />
            <span className={`h-0.5 w-5 bg-navy-900 transition-transform ${mobileOpen ? "-translate-y-2 -rotate-45" : ""}`} />
          </button>
        </div>
      </div>

      {/* ---------- Mobile menu panel ---------- */}
      {mobileOpen && (
        <div
          ref={panelRef}
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Site menu"
          data-analytics-location="mobile_nav"
          className="fixed top-[65px] right-0 bottom-0 left-0 z-50 flex flex-col bg-white lg:hidden"
        >
          <nav aria-label="Mobile" className="flex flex-1 flex-col overflow-y-auto px-4 py-4">
            {navItems.map((item) => {
              if (item.type === "link") {
                const active = isCurrent(item.link.href);
                return (
                  <Link
                    key={item.link.href}
                    href={item.link.href}
                    aria-current={active ? "page" : undefined}
                    className={`font-heading flex min-h-12 items-center rounded-md px-3 text-base font-semibold hover:bg-slate-50 ${
                      active ? "text-brand-600" : "text-navy-900"
                    }`}
                  >
                    {item.link.label}
                  </Link>
                );
              }
              const m = item.menu;
              const expanded = mobileSection === m.id;
              return (
                <div key={m.id}>
                  <button
                    type="button"
                    aria-expanded={expanded}
                    aria-controls={`mobile-${m.id}`}
                    onClick={() => setMobileSection(expanded ? null : m.id)}
                    className="font-heading flex min-h-12 w-full items-center justify-between rounded-md px-3 text-left text-base font-semibold text-navy-900 hover:bg-slate-50"
                  >
                    {m.label}
                    <IconChevronDown className={`h-5 w-5 transition-transform ${expanded ? "rotate-180" : ""}`} />
                  </button>
                  {expanded && (
                    <ul id={`mobile-${m.id}`} className="mb-2 ml-3 border-l-2 border-slate-100 pl-2">
                      {[...(m.featured ? [m.featured] : []), ...m.links, ...m.footer].map((l) => (
                        <li key={l.href}>
                          <Link
                            href={l.href}
                            aria-current={isCurrent(l.href) ? "page" : undefined}
                            className={`flex min-h-11 items-center rounded-md px-3 text-[0.95rem] hover:bg-slate-50 ${
                              l === m.featured ? "font-bold text-navy-900" : "text-slate-700"
                            } ${isCurrent(l.href) ? "text-brand-600" : ""}`}
                          >
                            {l.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              );
            })}
          </nav>
          <div className="grid grid-cols-2 gap-3 border-t border-slate-200 px-4 py-4">
            <Button href="/quote/" variant="accent" size="md" className="col-span-2 min-h-12">
              Request a Quote
            </Button>
            <a
              href={siteConfig.contact.phoneHref}
              className="font-heading flex min-h-12 items-center justify-center gap-2 rounded-md border-2 border-navy-900 text-sm font-bold text-navy-900"
            >
              <IconPhone className="h-4 w-4" />
              Call
            </a>
            <a
              href={siteConfig.contact.whatsappHrefWithMessage(QUOTE_MESSAGE)}
              target="_blank"
              rel="noopener noreferrer"
              className="font-heading flex min-h-12 items-center justify-center gap-2 rounded-md bg-[#25D366] text-sm font-bold text-navy-950"
            >
              <IconWhatsapp className="h-4 w-4" />
              WhatsApp
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
