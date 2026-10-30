"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ProjectImage } from "@/components/ProjectImage";
import { IconArrowRight } from "@/components/icons";
import type { ProjectCategory, ProjectImage as ProjectImageData } from "@/lib/project-images";

interface Item {
  image: ProjectImageData;
  category: ProjectCategory;
}

/**
 * The /our-work/ photo gallery: one section per service category (all of
 * them server-rendered, so every photo and caption stays in the HTML), with
 * service filters and a lightbox.
 *
 * Filters are toggle buttons (`aria-pressed`); hidden categories use the
 * `hidden` attribute and a polite live region announces the new count.
 * The lightbox is a native modal <dialog>: the page behind it is inert, Escape
 * closes it, focus starts on the close button and returns to the thumbnail
 * that opened it. Arrow keys, the on-screen buttons and horizontal swipes move
 * through the photos currently shown by the filter.
 */
export function ProjectGallery({ categories }: { categories: ProjectCategory[] }) {
  const [filter, setFilter] = useState("all");
  // Sections fade in when a filter reveals them, but not on first load.
  const [filtered, setFiltered] = useState(false);
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const openerRef = useRef<HTMLButtonElement | null>(null);
  const swipeX = useRef<number | null>(null);

  const visible = filter === "all" ? categories : categories.filter((c) => c.slug === filter);
  const items: Item[] = visible.flatMap((category) => category.images.map((image) => ({ image, category })));
  const current = openIndex === null ? null : items[openIndex];
  // Index of each visible category's first photo within `items`.
  const startOf = new Map<string, number>();
  visible.reduce((n, c) => (startOf.set(c.slug, n), n + c.images.length), 0);

  // The hero's category links jump to #<category>; make sure that section
  // isn't filtered out when someone follows one.
  useEffect(() => {
    const onHash = () => {
      const slug = decodeURIComponent(window.location.hash.slice(1));
      if (categories.some((c) => c.slug === slug)) setFilter((f) => (f === "all" || f === slug ? f : "all"));
    };
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, [categories]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog || openIndex === null || dialog.open) return;
    dialog.showModal();
    document.documentElement.style.overflow = "hidden";
    closeRef.current?.focus();
  }, [openIndex]);

  const open = (index: number, button: HTMLButtonElement) => {
    openerRef.current = button;
    setOpenIndex(index);
  };
  const step = (delta: number) =>
    setOpenIndex((i) => (i === null ? i : (i + delta + items.length) % items.length));
  const onClose = () => {
    document.documentElement.style.overflow = "";
    setOpenIndex(null);
    openerRef.current?.focus();
  };

  return (
    <>
      <section aria-labelledby="gallery-filter-label" className="border-b border-slate-200 bg-white">
        <div className="container-page flex flex-col gap-3 py-5 sm:flex-row sm:items-center sm:gap-5">
          <p id="gallery-filter-label" className="text-sm font-bold text-navy-900">
            Filter photos by service
          </p>
          <div role="group" aria-labelledby="gallery-filter-label" className="flex flex-wrap gap-2">
            {[{ slug: "all", title: "All work" }, ...categories].map((c) => {
              const active = filter === c.slug;
              return (
                <button
                  key={c.slug}
                  type="button"
                  aria-pressed={active}
                  onClick={() => {
                    setFilter(c.slug);
                    setFiltered(true);
                  }}
                  className={`min-h-10 rounded-full border px-4 text-sm font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600 ${
                    active
                      ? "border-navy-900 bg-navy-900 text-white"
                      : "border-slate-300 bg-white text-navy-800 hover:border-brand-400 hover:text-brand-700"
                  }`}
                >
                  {c.title}
                </button>
              );
            })}
          </div>
          <p className="text-xs font-medium text-slate-500 sm:ml-auto" aria-live="polite">
            {items.length} {items.length === 1 ? "photo" : "photos"}
          </p>
        </div>
      </section>

      {categories.map((category, i) => {
        const shown = visible.includes(category);
        const start = startOf.get(category.slug) ?? 0;
        return (
          <section
            key={category.slug}
            id={category.slug}
            hidden={!shown}
            data-filter-anim={filtered || undefined}
            className={`py-16 sm:py-20 ${i % 2 === 0 ? "bg-white" : "bg-slate-50"}`}
          >
            <div className="container-page">
              <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
                <div data-reveal className="max-w-2xl">
                  <p className="mb-3 flex items-center gap-2.5 text-xs font-bold uppercase tracking-[0.22em] text-brand-600">
                    <span className="h-px w-6 bg-brand-600/50" aria-hidden />
                    {`0${i + 1}`.slice(-2)} · Project Category
                  </p>
                  <h2 className="text-2xl font-bold tracking-tight text-navy-900 sm:text-3xl">{category.title}</h2>
                  <p className="mt-3 text-base leading-relaxed text-slate-600">{category.blurb}</p>
                </div>
                <Link
                  href={`/services/${category.service}/`}
                  className="inline-flex shrink-0 items-center gap-1.5 text-sm font-bold text-brand-600 hover:text-brand-700"
                >
                  View the {category.title.toLowerCase()} service
                  <IconArrowRight className="h-4 w-4" />
                </Link>
              </div>

              <div data-reveal="stagger" className="mt-10 gap-5 [column-fill:_balance] sm:columns-2 lg:columns-3">
                {category.images.map((image, j) => (
                  <figure
                    key={image.file}
                    className="mb-5 break-inside-avoid overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm"
                  >
                    <button
                      type="button"
                      onClick={(e) => open(start + j, e.currentTarget)}
                      aria-label={`Enlarge photo: ${image.caption}`}
                      aria-haspopup="dialog"
                      className="group relative block w-full cursor-zoom-in overflow-hidden focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-brand-600"
                    >
                      <ProjectImage
                        image={image}
                        className="w-full transition-transform duration-500 group-hover:scale-[1.02] group-focus-visible:scale-[1.02]"
                        sizes="(min-width: 1024px) 400px, (min-width: 640px) 50vw, 100vw"
                      />
                      <span
                        aria-hidden
                        className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-navy-950/70 text-white opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100"
                      >
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-4 w-4">
                          <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </span>
                    </button>
                    <figcaption className="px-4 py-3 text-sm leading-relaxed text-slate-600">
                      {image.beforeAfter && (
                        <span className="mr-2 inline-block rounded bg-brand-50 px-1.5 py-0.5 text-xs font-bold uppercase tracking-wide text-brand-700">
                          Before / After
                        </span>
                      )}
                      {image.caption}
                    </figcaption>
                  </figure>
                ))}
              </div>
            </div>
          </section>
        );
      })}

      <dialog
        ref={dialogRef}
        onClose={onClose}
        aria-label="Project photo viewer"
        className="lightbox fixed inset-0 m-0 h-dvh max-h-none w-screen max-w-none bg-transparent p-0 text-white"
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") step(1);
          else if (e.key === "ArrowLeft") step(-1);
        }}
      >
        {current && (
          <div
            className="flex h-full flex-col"
            onClick={(e) => {
              if (e.target === e.currentTarget) dialogRef.current?.close();
            }}
            onPointerDown={(e) => {
              swipeX.current = e.pointerType === "mouse" ? null : e.clientX;
            }}
            onPointerUp={(e) => {
              if (swipeX.current === null) return;
              const dx = e.clientX - swipeX.current;
              swipeX.current = null;
              if (Math.abs(dx) > 50) step(dx < 0 ? 1 : -1);
            }}
          >
            <div className="flex items-center justify-between gap-4 px-4 py-3 sm:px-6">
              <p className="text-sm font-semibold text-slate-300" aria-live="polite">
                Photo {openIndex! + 1} of {items.length}
                <span className="text-slate-500"> · {current.category.title}</span>
              </p>
              <button
                ref={closeRef}
                type="button"
                onClick={() => dialogRef.current?.close()}
                className="inline-flex min-h-11 items-center gap-2 rounded-md border border-white/30 px-4 text-sm font-semibold text-white hover:bg-white hover:text-navy-950 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                Close
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-4 w-4" aria-hidden>
                  <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
                </svg>
              </button>
            </div>

            <div
              className="relative flex min-h-0 flex-1 items-center justify-center px-4 sm:px-20"
              onClick={(e) => {
                if (e.target === e.currentTarget) dialogRef.current?.close();
              }}
            >
              <figure key={current.image.file} className="lightbox-figure flex max-h-full flex-col items-center">
                <ProjectImage
                  image={current.image}
                  priority
                  sizes="(min-width: 1024px) 80vw, 100vw"
                  className="max-h-[calc(100dvh-13rem)] w-auto max-w-full rounded-lg object-contain"
                />
                <figcaption className="mt-4 max-w-2xl text-center text-sm leading-relaxed text-slate-200">
                  {current.image.caption}{" "}
                  <Link
                    href={`/services/${current.category.service}/`}
                    className="font-bold text-accent-400 underline-offset-2 hover:underline"
                  >
                    {current.category.title} service
                  </Link>
                </figcaption>
              </figure>
            </div>

            <div className="flex items-center justify-center gap-3 px-4 pb-[calc(1rem+env(safe-area-inset-bottom))] pt-3">
              <button
                type="button"
                onClick={() => step(-1)}
                aria-label="Previous photo"
                className="flex h-12 w-12 items-center justify-center rounded-full border border-white/30 text-white hover:bg-white hover:text-navy-950 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-5 w-5" aria-hidden>
                  <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <button
                type="button"
                onClick={() => step(1)}
                aria-label="Next photo"
                className="flex h-12 w-12 items-center justify-center rounded-full border border-white/30 text-white hover:bg-white hover:text-navy-950 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-5 w-5" aria-hidden>
                  <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
          </div>
        )}
      </dialog>
    </>
  );
}
