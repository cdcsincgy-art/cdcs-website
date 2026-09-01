import Link from "next/link";
import { serviceIconMap, IconArrowRight } from "@/components/icons";
import type { ServiceDefinition } from "@/lib/services-data";

export function ServiceCard({ service }: { service: ServiceDefinition }) {
  const Icon = serviceIconMap[service.icon];
  return (
    <Link
      href={`/services/${service.slug}/`}
      aria-label={`${service.title} — learn more`}
      className="group relative flex h-full flex-col overflow-hidden rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-navy-900/20 hover:shadow-lg hover:shadow-navy-900/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600"
    >
      {/* Top accent rule — slate at rest, brand on hover. */}
      <span
        aria-hidden
        className="absolute inset-x-0 top-0 h-0.5 bg-slate-200 transition-colors duration-300 group-hover:bg-accent-500"
      />
      <div className="flex items-center gap-3">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg text-navy-800 ring-1 ring-inset ring-navy-900/12 transition-colors duration-300 group-hover:bg-navy-900 group-hover:text-white group-hover:ring-navy-900">
          {Icon && <Icon className="h-[22px] w-[22px]" />}
        </span>
        <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-slate-400">
          {service.category}
        </span>
      </div>
      <h3 className="mt-4 text-lg font-bold leading-snug text-navy-900">{service.title}</h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600">{service.shortDescription}</p>
      <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-bold text-brand-600 transition-colors group-hover:text-brand-700">
        Learn More
        <IconArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
      </span>
    </Link>
  );
}
