import { SectionHeading } from "@/components/ui/SectionHeading";

/**
 * Accessible FAQ block using native <details>/<summary> — no client JS, and
 * the answer text stays in the DOM for crawlers. Pair with FAQPage JSON-LD
 * on the page that renders it.
 */
export function Faq({ items, title = "Frequently Asked Questions" }: {
  items: { q: string; a: string }[];
  title?: string;
}) {
  return (
    <section className="bg-white py-16 sm:py-24">
      <div className="container-page">
        <SectionHeading eyebrow="Good to Know" title={title} />
        <div className="mx-auto mt-8 max-w-3xl divide-y divide-slate-200 border-y border-slate-200">
          {items.map((item) => (
            <details key={item.q} className="group py-4">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-base font-bold text-navy-900 [&::-webkit-details-marker]:hidden">
                {item.q}
                <span
                  aria-hidden="true"
                  className="shrink-0 text-xl leading-none text-brand-600 transition-transform group-open:rotate-45"
                >
                  +
                </span>
              </summary>
              <p className="mt-3 text-sm leading-relaxed text-slate-600 sm:text-base">{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
