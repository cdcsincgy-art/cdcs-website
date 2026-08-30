"use client";

import { IconWhatsapp } from "@/components/icons";
import { siteConfig } from "@/lib/site-config";

export function WhatsAppFloat() {
  return (
    <a
      href={siteConfig.contact.whatsappHrefWithMessage("Hello CDCS, I'd like to request a quote.")}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with CDCS Inc. on WhatsApp"
      className="fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-black/20 transition-transform duration-200 hover:scale-105 active:scale-95 sm:bottom-6 sm:right-6"
    >
      <IconWhatsapp className="h-7 w-7" />
      <span className="absolute -top-1 -right-1 flex h-4 w-4">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white/60 opacity-75" />
        <span className="relative inline-flex h-4 w-4 rounded-full bg-white/90" />
      </span>
    </a>
  );
}
