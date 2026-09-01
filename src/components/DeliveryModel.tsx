import { IconArrowRight } from "@/components/icons";

/**
 * The five stages every CDCS program runs through, from first walkthrough to
 * ongoing service. This is a restrained visual summary of language already used
 * across the site (defined scope of work, trained teams, on-site supervision,
 * quality checks, responsive communication) — not a claim of formal SOPs,
 * scoring systems, or inspection metrics.
 */
const stages = [
  "Defined Scope",
  "Trained Teams",
  "On-Site Supervision",
  "Quality Checks",
  "Client Communication",
];

export function DeliveryModel({
  heading = "How a CDCS program runs",
  className = "",
}: {
  heading?: string;
  className?: string;
}) {
  return (
    <div className={className}>
      <p className="flex items-center gap-2.5 text-xs font-bold uppercase tracking-[0.22em] text-brand-600">
        <span className="h-px w-6 bg-brand-600/50" aria-hidden />
        {heading}
      </p>
      <ol className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
        {stages.map((stage, i) => (
          <li
            key={stage}
            className="relative flex items-center gap-3 rounded-lg border border-slate-200 bg-white px-4 py-3.5 shadow-sm"
          >
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-navy-900 text-xs font-bold text-white">
              {i + 1}
            </span>
            <span className="text-sm font-semibold leading-tight text-navy-900">{stage}</span>
            {i < stages.length - 1 && (
              <IconArrowRight
                className="absolute -right-3 top-1/2 hidden h-4 w-4 -translate-y-1/2 text-slate-300 lg:block"
                aria-hidden
              />
            )}
          </li>
        ))}
      </ol>
    </div>
  );
}
