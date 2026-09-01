import type { ReactNode } from "react";

/**
 * A bordered aside used inside Insights articles to lift a practical takeaway
 * out of the running text. Sits full-width of the reading measure; the accent
 * bar keeps it visually tied to the CDCS brand without shouting.
 */
export function Callout({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <aside className="rounded-xl border border-slate-200 border-l-4 border-l-accent-500 bg-slate-50 p-5 sm:p-6">
      <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand-600">{title}</p>
      <div className="mt-2 space-y-2 text-sm leading-relaxed text-slate-700 sm:text-base">
        {children}
      </div>
    </aside>
  );
}
