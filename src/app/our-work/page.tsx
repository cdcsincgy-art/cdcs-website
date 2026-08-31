import type { Metadata } from "next";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CTABanner } from "@/components/CTABanner";
import { PortfolioGallery } from "./PortfolioGallery";

export const metadata: Metadata = {
  title: "Our Work | Project Gallery",
  description:
    "Browse CDCS Inc. commercial cleaning, pressure washing, fleet washing, mobile detailing, and deep cleaning projects across Guyana.",
  alternates: { canonical: "/our-work/" },
};

export default function OurWorkPage() {
  return (
    <>
      <section className="bg-navy-950 py-16 sm:py-20">
        <div className="container-page">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-accent-400">Our Work</p>
          <h1 className="max-w-2xl text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
            See the CDCS Standard
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-slate-300 sm:text-lg">
            This gallery is updated as jobs are completed. Filter by category to see the type of
            project you have in mind.
          </p>
          <p className="mt-3 max-w-2xl text-sm text-slate-400">
            Real before-and-after photos and videos from completed CDCS projects are added here as
            work is finished.
          </p>
        </div>
      </section>

      <section className="bg-white py-16 sm:py-24">
        <div className="container-page">
          <SectionHeading eyebrow="Project Gallery" title="Browse by Service Category" />
          <div className="mt-10">
            <PortfolioGallery />
          </div>
        </div>
      </section>

      <CTABanner />
    </>
  );
}
