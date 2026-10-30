import { IconExternal, IconUsers } from "@/components/icons";
import { gcciMembership as gcci, gcciDisclaimer } from "@/lib/credentials";
import { siteConfig } from "@/lib/site-config";

/**
 * The membership card's visual. Until GCCI's permission is confirmed
 * (`gcciMembership.logoApproved`), a neutral emblem — never an imitation of
 * the Chamber's logo. Once approved, the official GCCI logo as published at
 * gcci.gy (trimmed of transparent margin only; colours and proportions
 * unchanged). Height is set by the caller; width follows the logo's aspect.
 */
export function GcciLogo({ className = "" }: { className?: string }) {
  const logo = gcci.logo;
  if (!gcci.logoApproved) {
    return (
      <span
        aria-hidden
        className={`flex aspect-square shrink-0 items-center justify-center rounded-xl bg-navy-900 text-accent-400 ${className}`}
      >
        <IconUsers className="h-1/2 w-1/2 max-h-9 max-w-9" />
      </span>
    );
  }
  return (
    <picture className="shrink-0">
      <source
        type="image/webp"
        srcSet={`${logo.base}-160.webp 1x, ${logo.base}-320.webp 2x`}
      />
      <img
        src={`${logo.base}-320.png`}
        alt={`${gcci.organization} (${gcci.shortName}) logo`}
        width={logo.width}
        height={logo.height}
        loading="lazy"
        decoding="async"
        className={className}
      />
    </picture>
  );
}

function ListingLink({ variant }: { variant: "button" | "text" }) {
  const cls =
    variant === "button"
      ? "inline-flex min-h-11 items-center justify-center gap-2 rounded-md border-2 border-navy-800 px-5 py-2.5 text-sm font-semibold text-navy-900 transition-colors hover:bg-navy-900 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy-900"
      : "inline-flex items-center gap-1.5 font-bold text-brand-600 hover:text-brand-700 hover:underline";
  return (
    <a href={gcci.listingUrl} target="_blank" rel="noopener noreferrer" className={cls}>
      View Official GCCI Listing
      <IconExternal className="h-4 w-4" />
      <span className="sr-only">(opens the {gcci.organization} website in a new tab)</span>
    </a>
  );
}

/**
 * Georgetown Chamber of Commerce & Industry membership.
 * - "strip": slim row shown directly under the Local Content band (homepage).
 * - "card": bordered card (About, Credentials, Oil & Gas).
 * Wording: "member" only — never certified, accredited, or endorsed.
 */
export function GcciMembership({
  variant = "card",
  headingLevel = "h3",
}: {
  variant?: "strip" | "card";
  headingLevel?: "h2" | "h3";
}) {
  const Heading = headingLevel;

  if (variant === "strip") {
    return (
      <section aria-labelledby="gcci-strip" className="border-b border-slate-200 bg-slate-50">
        <div className="container-page flex flex-col gap-3 pb-6 sm:flex-row sm:items-center sm:justify-between lg:-mt-2">
          <div className="flex items-center gap-4">
            <GcciLogo className="h-14 w-auto" />
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-brand-600">Business Association</p>
              <Heading id="gcci-strip" className="mt-0.5 text-base font-bold leading-snug text-navy-900 sm:text-lg">
                {gcci.label}
              </Heading>
              <p className="text-sm text-slate-600">Member since {gcci.memberSince}</p>
            </div>
          </div>
          <div className="text-sm sm:shrink-0">
            <ListingLink variant="text" />
          </div>
        </div>
      </section>
    );
  }

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
        <GcciLogo className="h-20 w-auto" />
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-brand-600">Business Association</p>
          <Heading className="mt-1 text-xl font-semibold leading-snug text-navy-900 sm:text-2xl">
            {gcci.organization} Member
          </Heading>
          <p className="mt-1 inline-flex rounded-full bg-navy-900 px-3 py-1 text-xs font-semibold text-white">
            Member Since {gcci.memberSince}
          </p>
          <p className="mt-1 text-sm text-slate-600">
            {siteConfig.companyName} is a member of the {gcci.organization}.
          </p>
        </div>
      </div>

      <dl className="mt-6 grid gap-x-8 gap-y-4 border-t border-slate-200 pt-6 text-sm sm:grid-cols-2">
        <div>
          <dt className="font-semibold text-slate-500">Organization</dt>
          <dd className="mt-0.5 font-semibold text-navy-900">
            {gcci.organization} ({gcci.shortName})
          </dd>
        </div>
        <div>
          <dt className="font-semibold text-slate-500">Reference</dt>
          <dd className="mt-0.5 text-navy-900">CDCS&apos;s entry in the official GCCI member directory</dd>
        </div>
      </dl>

      <p className="mt-6 text-xs leading-relaxed text-slate-500">{gcciDisclaimer}</p>

      <div className="mt-5">
        <ListingLink variant="button" />
      </div>
    </div>
  );
}
