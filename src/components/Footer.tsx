import Link from "next/link";
import { Logo } from "@/components/Logo";
import { Button } from "@/components/ui/Button";
import { services } from "@/lib/services-data";
import { siteConfig } from "@/lib/site-config";
import { IconPhone, IconMail, IconMapPin, IconWhatsapp, IconInstagram, IconFacebook } from "@/components/icons";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-navy-950 text-slate-300">
      <div className="container-page grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
        <div className="sm:col-span-2 lg:col-span-1">
          <Logo variant="light" />
          <p className="mt-4 text-sm leading-relaxed text-slate-400">
            {siteConfig.companyName} — professional commercial cleaning, pressure washing, fleet
            washing, and mobile detailing serving businesses, organizations, and individuals
            across Guyana.
          </p>
          <div className="mt-5 flex gap-3">
            <a
              href={siteConfig.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-9 w-9 items-center justify-center rounded-md border border-white/15 text-slate-300 transition-colors hover:border-accent-500 hover:text-accent-400"
              aria-label="CDCS Inc. on Instagram"
            >
              <IconInstagram className="h-4 w-4" />
            </a>
            <a
              href={siteConfig.social.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-9 w-9 items-center justify-center rounded-md border border-white/15 text-slate-300 transition-colors hover:border-accent-500 hover:text-accent-400"
              aria-label="CDCS Inc. on Facebook"
            >
              <IconFacebook className="h-4 w-4" />
            </a>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-bold uppercase tracking-wider text-white">Services</h3>
          <ul className="mt-4 space-y-2.5 text-sm">
            {services.map((s) => (
              <li key={s.slug}>
                <Link href={`/services/${s.slug}/`} className="text-slate-400 hover:text-accent-400">
                  {s.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-bold uppercase tracking-wider text-white">Company</h3>
          <ul className="mt-4 space-y-2.5 text-sm">
            <li><Link href="/about/" className="text-slate-400 hover:text-accent-400">About CDCS</Link></li>
            <li><Link href="/industries/" className="text-slate-400 hover:text-accent-400">Industries We Serve</Link></li>
            <li><Link href="/our-work/" className="text-slate-400 hover:text-accent-400">Our Work</Link></li>
            <li><Link href="/quote/" className="text-slate-400 hover:text-accent-400">Request a Quote</Link></li>
            <li><Link href="/contact/" className="text-slate-400 hover:text-accent-400">Contact Us</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-bold uppercase tracking-wider text-white">Contact</h3>
          <ul className="mt-4 space-y-3 text-sm text-slate-400">
            <li className="flex items-start gap-2.5">
              <IconMapPin className="mt-0.5 h-4 w-4 shrink-0 text-accent-500" />
              {siteConfig.location.display}
            </li>
            <li className="flex items-center gap-2.5">
              <IconPhone className="h-4 w-4 shrink-0 text-accent-500" />
              <a href={siteConfig.contact.phoneHref} className="hover:text-accent-400">{siteConfig.contact.phoneDisplay}</a>
            </li>
            <li className="flex items-center gap-2.5">
              <IconWhatsapp className="h-4 w-4 shrink-0 text-accent-500" />
              <a href={siteConfig.contact.whatsappHref} target="_blank" rel="noopener noreferrer" className="hover:text-accent-400">
                WhatsApp: {siteConfig.contact.phoneDisplay}
              </a>
            </li>
            <li className="flex items-center gap-2.5">
              <IconMail className="h-4 w-4 shrink-0 text-accent-500" />
              <a href={siteConfig.contact.emailHref} className="hover:text-accent-400">{siteConfig.contact.email}</a>
            </li>
            <li className="text-slate-500">Social: {siteConfig.social.handle}</li>
          </ul>
          <Button href="/quote/" variant="accent" size="md" className="mt-5">
            Request a Quote
          </Button>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-page flex flex-col items-center justify-between gap-3 py-5 text-xs text-slate-500 sm:flex-row">
          <p>© {year} {siteConfig.companyName}. All rights reserved.</p>
          <p>Georgetown, Guyana</p>
        </div>
      </div>
    </footer>
  );
}
