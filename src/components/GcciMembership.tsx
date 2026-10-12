import { IconExternal, IconUsers } from "@/components/icons";
import { gcciMembership as gcci, gcciDisclaimer } from "@/lib/credentials";
import { siteConfig } from "@/lib/site-config";

function ListingLink({ variant }: { variant: "button" | "text" }) {
  const cls =
    variant === "button"
      ? "font-heading inline-flex min-h-11 items-center justify-center gap-2 rounded-md border-2 border-navy-800 px-5 py-2.5 text-sm font-semibold text-navy-900 transition-colors hover:bg-navy-900 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy-900"
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
            <span aria-hidden className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white text-navy-800 sm:w-24">
              <IconUsers className="h-6 w-6" />
            </span>
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
        <span aria-hidden className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-navy-900 text-accent-400">
          <IconUsers className="h-8 w-8" />
        </span>
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-brand-600">Business Association</p>
          <Heading className="mt-1 text-xl font-bold leading-snug text-navy-900 sm:text-2xl">
            {gcci.label}
          </Heading>
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
          <dt className="font-semibold text-slate-500">Member since</dt>
          <dd className="mt-0.5 font-semibold text-navy-900">{gcci.memberSince}</dd>
        </div>
        <div className="sm:col-span-2">
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
