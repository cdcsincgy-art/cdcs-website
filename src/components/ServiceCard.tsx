import Link from "next/link";
import { serviceIconMap, IconArrowRight } from "@/components/icons";
import type { ServiceDefinition } from "@/lib/services-data";

export function ServiceCard({ service }: { service: ServiceDefinition }) {
  const Icon = serviceIconMap[service.icon];
  return (
    <div className="group flex h-full flex-col rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-navy-900/10">
      <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-lg bg-brand-50 text-brand-600 transition-colors group-hover:bg-brand-600 group-hover:text-white">
        {Icon && <Icon className="h-6 w-6" />}
      </div>
      <h3 className="text-lg font-bold text-navy-900">{service.title}</h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600">{service.shortDescription}</p>
      <Link
        href={`/services/${service.slug}/`}
        className="mt-5 inline-flex items-center gap-1.5 text-sm font-bold text-brand-600 transition-colors hover:text-brand-700"
      >
        Learn More
        <IconArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
      </Link>
    </div>
  );
}
