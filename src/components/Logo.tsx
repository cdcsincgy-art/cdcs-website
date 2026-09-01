import Link from "next/link";

export function Logo({ variant = "dark" }: { variant?: "dark" | "light" }) {
  const isLight = variant === "light";
  return (
    <Link href="/" className="flex items-center gap-2.5 shrink-0">
      {/* Official CDCS seal. It is black line art, so on dark surfaces it sits
          on a white chip. The image is only scaled — never recoloured. */}
      <span
        className={`flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full ${
          isLight ? "bg-white p-[2px]" : ""
        }`}
      >
        <picture>
          <source srcSet="/images/cdcs-logo-mark.webp" type="image/webp" />
          <img
            src="/images/cdcs-logo-mark.png"
            alt="CDCS Inc. logo"
            width={256}
            height={256}
            decoding="async"
            className="h-full w-full object-contain"
          />
        </picture>
      </span>
      <span className="flex min-w-0 flex-col leading-none">
        <span className={`text-lg font-extrabold tracking-tight ${isLight ? "text-white" : "text-navy-900"}`}>
          CDCS <span className="text-accent-500">Inc.</span>
        </span>
        {/* Tagline is hidden on the smallest screens so the header logo never
            crowds the phone / WhatsApp / menu controls. */}
        <span
          className={`hidden text-[10px] font-semibold uppercase tracking-[0.18em] sm:block ${
            isLight ? "text-slate-300" : "text-slate-500"
          }`}
        >
          Cleaning &amp; Facility Services
        </span>
      </span>
    </Link>
  );
}
