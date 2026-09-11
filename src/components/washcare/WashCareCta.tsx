"use client";

import type { ReactNode } from "react";
import { Button } from "@/components/ui/Button";
import { trackEvent } from "@/lib/analytics";

/**
 * A CDCS <Button> that fires one non-PII GA4 event on click, then follows the
 * link normally. Used for every trackable WashCare call-to-action on the
 * WashCare page (and a couple of cross-links elsewhere) so `event`/`params`
 * stay explicit at each call site instead of duplicated click handlers.
 */
export function WashCareCta({
  href,
  event,
  params,
  children,
  variant = "primary",
  size = "md",
  icon,
  external = false,
  className = "",
}: {
  href: string;
  event: string;
  params?: Record<string, unknown>;
  children: ReactNode;
  variant?: "primary" | "accent" | "outline" | "ghost";
  size?: "md" | "lg";
  icon?: ReactNode;
  external?: boolean;
  className?: string;
}) {
  return (
    <Button
      href={href}
      variant={variant}
      size={size}
      icon={icon}
      external={external}
      className={className}
      onClick={() => trackEvent(event, params)}
    >
      {children}
    </Button>
  );
}
