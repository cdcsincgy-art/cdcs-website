import Link from "next/link";
import { serviceIconMap, IconArrowRight } from "@/components/icons";
import { ProjectImage } from "@/components/ProjectImage";
import type { ServiceDefinition } from "@/lib/services-data";
import { serviceHeroImage } from "@/lib/project-images";

/**
 * A project photo tagged as this service's own hero, if any. The borrowed
 * `heroImage` fallback (e.g. an upholstery photo on the carpet page) is not
 * used on cards, where it would label one service with another's work.
 */
function cardImage(service: ServiceDefinition) {
  return serviceHeroImage(service.slug);
}

/**
 * Service card with the service's own project photo. On phones it is a
 * compact row (thumbnail beside title and description) so a list of services
 * doesn't become a very long scroll; from `sm` up it is a stacked card whose
 * photo zooms slowly on hover/focus while the card lifts. The whole card is
 * the link, and its accessible name is its visible text (the photo is
 * decorative here — it repeats the title).
 *
 * `feature` is the larger treatment used for the homepage's core services.
 */
export function ServiceCard({
  service,
  feature = false,
  wide = false,
}: {
  service: ServiceDefinition;
  feature?: boolean;
  /** Feature card spanning a wider column: a shallower photo. */
  wide?: boolean;
}) {
  const Icon = serviceIconMap[service.icon];
  const image = cardImage(service);
  return (
    <Link
      href={`/services/${service.slug}/`}
      className="group relative flex h-full items-start gap-4 overflow-hidden rounded-xl border border-slate-200 bg-white p-3 shadow-sm transition-[transform,box-shadow,border-color] duration-300 ease-out hover:-translate-y-1 hover:border-navy-900/20 hover:shadow-xl hover:shadow-navy-900/10 focus-visible:-translate-y-1 focus-visible:shadow-xl focus-visible:shadow-navy-900/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600 active:translate-y-0 sm:flex-col sm:items-stretch sm:gap-0 sm:p-0"
    >
      {/* Photo: a square thumbnail on phones, a full-width banner from sm. */}
      <div
        className={`relative shrink-0 overflow-hidden rounded-lg bg-navy-950 sm:rounded-none ${
          feature
            ? `h-20 w-20 sm:aspect-[16/10] sm:h-auto sm:w-full ${wide ? "lg:aspect-[21/9]" : ""}` : "h-16 w-16 sm:aspect-[16/9] sm:h-auto sm:w-full"
        }`}
      >
        {image ? (
          <div aria-hidden className="h-full w-full">
            <ProjectImage
              image={{ ...image, alt: "" }}
              sizes={feature ? "(min-width: 1024px) 400px, (min-width: 640px) 50vw, 80px" : "(min-width: 1024px) 300px, (min-width: 640px) 50vw, 64px"}
              className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06] group-focus-visible:scale-[1.06]"
            />
          </div>
        ) : (
          <span aria-hidden className="relative flex h-full w-full items-center justify-center text-accent-400">
            <span className="absolute inset-0 bg-grid-dark opacity-60" />
            <span className="absolute inset-0 brand-glow opacity-80" />
            {Icon && (
              <Icon className="relative h-7 w-7 transition-transform duration-700 ease-out group-hover:scale-110 sm:h-14 sm:w-14" />
            )}
          </span>
        )}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 hidden bg-gradient-to-t from-navy-950/55 via-transparent to-transparent sm:block"
        />
        {/* Icon chip over the photo (sm+). */}
        {image && (
          <span
            aria-hidden
            className="absolute bottom-3 left-3 hidden h-10 w-10 items-center justify-center rounded-lg bg-white/95 text-navy-800 shadow-sm transition-colors duration-300 group-hover:bg-accent-500 group-hover:text-navy-950 group-focus-visible:bg-accent-500 group-focus-visible:text-navy-950 sm:flex"
          >
            {Icon && <Icon className="h-5 w-5" />}
          </span>
        )}
      </div>

      <div className="flex min-w-0 flex-1 flex-col sm:p-5 lg:p-6">
        <span className="hidden text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500 sm:inline">
          {service.category}
        </span>
        <h3
          className={`font-semibold leading-snug text-navy-900 sm:mt-1.5 ${
            feature ? "text-[1.05rem] sm:text-xl" : "text-base sm:text-lg"
          }`}
        >
          {service.title}
        </h3>
        <p className="mt-1 line-clamp-3 flex-1 text-sm leading-relaxed text-slate-600 sm:mt-2 sm:line-clamp-none">
          {service.shortDescription}
        </p>
        <span className="mt-5 hidden items-center gap-1.5 text-sm font-semibold text-brand-600 transition-colors group-hover:text-brand-700 sm:inline-flex">
          View service
          <IconArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 group-focus-visible:translate-x-1" />
        </span>
      </div>
      <IconArrowRight aria-hidden className="mt-1 h-4 w-4 shrink-0 self-center text-brand-600 transition-transform group-active:translate-x-0.5 sm:hidden" />
      {/* Accent rule along the top edge on hover/focus. */}
      <span
        aria-hidden
        className="absolute inset-x-0 top-0 h-[3px] origin-left scale-x-0 bg-accent-500 transition-transform duration-300 group-hover:scale-x-100 group-focus-visible:scale-x-100"
      />
    </Link>
  );
}
