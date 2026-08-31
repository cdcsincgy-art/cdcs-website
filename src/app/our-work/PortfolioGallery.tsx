"use client";

import { useState } from "react";
import { PlaceholderMedia } from "@/components/ui/PlaceholderMedia";
import { portfolioCategories } from "@/lib/services-data";
import { portfolioItems } from "@/lib/content-data";

export function PortfolioGallery() {
  const [active, setActive] = useState<(typeof portfolioCategories)[number]>("All");

  const filtered =
    active === "All" ? portfolioItems : portfolioItems.filter((item) => item.category === active);

  return (
    <div>
      <div className="flex flex-wrap gap-2.5" role="group" aria-label="Filter projects by service category">
        {portfolioCategories.map((cat) => (
          <button
            key={cat}
            type="button"
            aria-pressed={active === cat}
            onClick={() => setActive(cat)}
            className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
              active === cat
                ? "bg-navy-900 text-white"
                : "border border-slate-200 bg-white text-slate-600 hover:border-brand-400 hover:text-brand-600"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((item, i) => (
          <div key={i} className="group overflow-hidden rounded-xl">
            <PlaceholderMedia label={item.label} ratio="video" />
            <div className="mt-3 flex items-center justify-between">
              <span className="text-sm font-bold text-navy-900">{item.category}</span>
              <span className="text-xs font-semibold text-slate-400">Before / After</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
