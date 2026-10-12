import Link from "next/link";
import { serviceIconMap, IconArrowRight } from "@/components/icons";
import type { ServiceDefinition } from "@/lib/services-data";

/**
 * Service card. On phones it is a compact row (icon beside title and
 * description) so a list of ten services doesn't become a very long scroll;
 * from `sm` up it is the full stacked card. The whole card is the link, and
 * its accessible name is its visible text.
 */
export function ServiceCard({ service }: { service: ServiceDefinition }) {
  const Icon = serviceIconMap[service.icon];
  return (
    <Link
      href={`/services/${service.slug}/`}
      className="group relative flex h-full items-start gap-4 overflow-hidden rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-navy-900/20 hover:shadow-lg hover:shadow-navy-900/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600 sm:flex-col sm:items-stretch sm:gap-0 sm:p-6"
    >
      {/* Top accent rule — slate at rest, brand on hover. */}
      <span
        aria-hidden
        className="absolute inset-x-0 top-0 h-0.5 bg-slate-200 transition-colors duration-300 group-hover:bg-accent-500"
      />
      <div className="flex shrink-0 items-center gap-3">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg text-navy-800 ring-1 ring-inset ring-navy-900/12 transition-colors duration-300 group-hover:bg-navy-900 group-hover:text-white group-hover:ring-navy-900">
          {Icon && <Icon className="h-[22px] w-[22px]" />}
        </span>
        <span className="hidden text-[10px] font-bold uppercase tracking-[0.16em] text-slate-500 sm:inline">
          {service.category}
        </span>
      </div>
      <div className="flex min-w-0 flex-1 flex-col">
        <h3 className="text-base font-bold leading-snug text-navy-900 sm:mt-4 sm:text-lg">{service.title}</h3>
        <p className="mt-1 flex-1 text-sm leading-relaxed text-slate-600 sm:mt-2">{service.shortDescription}</p>
        <span className="mt-5 hidden items-center gap-1.5 text-sm font-bold text-brand-600 transition-colors group-hover:text-brand-700 sm:inline-flex">
          Learn More
          <IconArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </span>
      </div>
      <IconArrowRight aria-hidden className="mt-1 h-4 w-4 shrink-0 text-brand-600 sm:hidden" />
    </Link>
  );
}
