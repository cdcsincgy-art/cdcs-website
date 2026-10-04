import Link from "next/link";
import type { BreadcrumbItem } from "@/lib/seo";

/**
 * Visible breadcrumb trail for dark page heroes. Pass the same trail given to
 * pageLd() so the visible crumbs and the BreadcrumbList JSON-LD always match.
 * The last item is the current page and is not linked.
 */
export function Breadcrumbs({ trail }: { trail: BreadcrumbItem[] }) {
  return (
    <nav className="mb-5 text-xs font-semibold text-slate-400" aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center">
        {trail.map((item, i) => {
          const last = i === trail.length - 1;
          return (
            <li key={item.path} className="flex items-center">
              {last ? (
                <span className="text-slate-300" aria-current="page">
                  {item.name}
                </span>
              ) : (
                <>
                  <Link href={item.path} className="hover:text-accent-400">
                    {item.name}
                  </Link>
                  <span className="mx-2" aria-hidden>
                    /
                  </span>
                </>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
