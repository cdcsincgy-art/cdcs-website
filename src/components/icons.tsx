// Lightweight inline SVG icon set — no external icon fonts/images required.
// Keeping icons as SVG keeps the site fast and avoids third-party asset deps.

import type { SVGProps, ReactElement } from "react";

type IconProps = SVGProps<SVGSVGElement>;

const base = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.75,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  viewBox: "0 0 24 24",
  "aria-hidden": true as const,
};

export function IconBuilding(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <rect x="4" y="3" width="16" height="18" rx="1" />
      <path d="M9 8h.01M9 12h.01M9 16h.01M15 8h.01M15 12h.01M15 16h.01" />
      <path d="M10 21v-3a2 2 0 0 1 4 0v3" />
    </svg>
  );
}

export function IconSpray(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M6 20l3-9a2 2 0 0 1 2-1h1a2 2 0 0 1 2 1l3 9" />
      <path d="M9 11V6a2 2 0 0 1 2-2h1" />
      <path d="M15 6h4M16 3h3M14 9h4" />
      <path d="M4 20h14" />
    </svg>
  );
}

export function IconCar(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M3 13l1.5-4.5A2 2 0 0 1 6.4 7h11.2a2 2 0 0 1 1.9 1.5L21 13" />
      <rect x="3" y="13" width="18" height="5" rx="1.5" />
      <circle cx="7.5" cy="18" r="1.4" />
      <circle cx="16.5" cy="18" r="1.4" />
    </svg>
  );
}

export function IconTruck(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <rect x="2" y="8" width="12" height="8" rx="1" />
      <path d="M14 11h3.5L20 14v2h-6" />
      <circle cx="7" cy="18" r="1.5" />
      <circle cx="17" cy="18" r="1.5" />
    </svg>
  );
}

export function IconSparkle(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M12 3v4M12 17v4M3 12h4M17 12h4" />
      <path d="M6 6l2.5 2.5M15.5 15.5L18 18M18 6l-2.5 2.5M8.5 15.5L6 18" />
      <circle cx="12" cy="12" r="2.5" />
    </svg>
  );
}

export function IconChair(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M6 4h12v9H6z" />
      <path d="M6 13v7M18 13v7M6 20h12" />
      <path d="M6 9h12" />
    </svg>
  );
}

export function IconHardhat(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M4 15a8 8 0 0 1 16 0" />
      <path d="M2 15h20" />
      <path d="M12 7V4" />
      <rect x="9" y="15" width="6" height="3" rx="0.5" />
    </svg>
  );
}

export function IconFactory(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M3 21V11l5 3v-3l5 3v-3l5 3v7z" />
      <path d="M3 21h18" />
      <path d="M8 21v-4M13 21v-4M18 21v-4" />
    </svg>
  );
}

export function IconCheck(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M20 6L9 17l-5-5" />
    </svg>
  );
}

export function IconPhone(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M5 4h3l2 5-2.5 1.5a11 11 0 0 0 5 5L14 13l5 2v3a2 2 0 0 1-2 2A15 15 0 0 1 3 6a2 2 0 0 1 2-2z" />
    </svg>
  );
}

export function IconWhatsapp(props: IconProps) {
  return (
    <svg viewBox="0 0 32 32" fill="currentColor" aria-hidden {...props}>
      <path d="M16.02 3C9.4 3 4 8.36 4 15c0 2.36.66 4.56 1.8 6.44L4 29l7.76-1.74A11.9 11.9 0 0 0 16.02 27C22.64 27 28 21.64 28 15S22.64 3 16.02 3zm0 21.7c-1.98 0-3.86-.53-5.47-1.46l-.39-.23-4.6 1.03 1-4.48-.25-.4A9.62 9.62 0 0 1 5.4 15c0-5.86 4.76-10.62 10.62-10.62S26.64 9.14 26.64 15 21.88 24.7 16.02 24.7zm5.86-7.97c-.32-.16-1.9-.94-2.2-1.05-.3-.1-.5-.16-.72.16-.21.32-.83 1.05-1.02 1.26-.19.21-.37.24-.69.08-.32-.16-1.34-.5-2.55-1.58-.94-.84-1.58-1.87-1.76-2.19-.19-.32-.02-.49.14-.65.14-.14.32-.37.48-.55.16-.18.21-.32.32-.53.1-.21.05-.4-.03-.55-.08-.16-.72-1.75-.99-2.39-.26-.63-.53-.54-.72-.55h-.62c-.21 0-.55.08-.84.4-.29.32-1.1 1.08-1.1 2.62 0 1.55 1.13 3.05 1.29 3.26.16.21 2.22 3.39 5.37 4.76.75.32 1.34.52 1.8.66.76.24 1.44.21 1.99.13.61-.09 1.9-.78 2.16-1.53.27-.75.27-1.4.19-1.53-.08-.14-.29-.21-.61-.37z" />
    </svg>
  );
}

export function IconMail(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3 7l9 6 9-6" />
    </svg>
  );
}

export function IconMapPin(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M12 21s-7-6.1-7-11a7 7 0 0 1 14 0c0 4.9-7 11-7 11z" />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  );
}

export function IconArrowRight(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

export function IconShield(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M12 3l7 3v6c0 4.5-3 8.2-7 9-4-.8-7-4.5-7-9V6z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  );
}

export function IconClock(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3.5 2" />
    </svg>
  );
}

export function IconTools(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M14.7 6.3a3 3 0 0 0-4.2 4.2L4 17v3h3l6.5-6.5a3 3 0 0 0 4.2-4.2l-2 2-2-2 2-2z" />
    </svg>
  );
}

export function IconCalendar(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M16 3v4M8 3v4M3 10h18" />
    </svg>
  );
}

export function IconUsers(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <circle cx="9" cy="8" r="3" />
      <path d="M2 20c0-3.3 3.1-6 7-6s7 2.7 7 6" />
      <circle cx="18" cy="9" r="2.5" />
      <path d="M15.5 14.3c2.6.4 4.5 2.3 4.5 4.7" />
    </svg>
  );
}

export function IconClipboard(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <rect x="6" y="4" width="12" height="17" rx="2" />
      <rect x="9" y="2" width="6" height="4" rx="1" />
      <path d="M9 12h6M9 16h6" />
    </svg>
  );
}

export function IconTarget(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <circle cx="12" cy="12" r="8" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="12" cy="12" r="0.5" />
    </svg>
  );
}

export function IconUpload(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M12 16V4M7 9l5-5 5 5" />
      <path d="M4 16v3a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-3" />
    </svg>
  );
}

export const serviceIconMap: Record<string, (props: IconProps) => ReactElement> = {
  building: IconBuilding,
  spray: IconSpray,
  car: IconCar,
  truck: IconTruck,
  sparkle: IconSparkle,
  chair: IconChair,
  hardhat: IconHardhat,
  factory: IconFactory,
};

// Superset used by content sections (trust points, why-choose-us, industries,
// process steps) that reference a broader icon vocabulary.
export const iconMap: Record<string, (props: IconProps) => ReactElement> = {
  ...serviceIconMap,
  users: IconUsers,
  tools: IconTools,
  calendar: IconCalendar,
  clipboard: IconClipboard,
  shield: IconShield,
  clock: IconClock,
  target: IconTarget,
  phone: IconPhone,
  mail: IconMail,
  check: IconCheck,
};
