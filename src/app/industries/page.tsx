import type { Metadata } from "next";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CTABanner } from "@/components/CTABanner";
import { iconMap } from "@/components/icons";

export const metadata: Metadata = {
  title: "Industries We Serve | Commercial Cleaning Across Guyana",
  description:
    "CDCS Inc. supports corporate offices, government agencies, transportation and logistics companies, construction firms, retail, hospitality, and industrial facilities across Guyana.",
  alternates: { canonical: "/industries/" },
};

const industryDetails = [
  {
    icon: "building",
    name: "Corporate Offices",
    description: "Recurring janitorial programs and deep cleaning for professional office environments.",
  },
  {
    icon: "shield",
    name: "Government & Public Sector",
    description: "Structured, accountable cleaning services suited to public-sector facilities and procurement standards.",
  },
  {
    icon: "truck",
    name: "Transportation & Logistics",
    description: "Fleet washing and yard/depot cleaning for trucking, courier, and logistics operators.",
  },
  {
    icon: "hardhat",
    name: "Construction",
    description: "Post-construction cleaning that prepares newly built or renovated spaces for occupancy.",
  },
  {
    icon: "clipboard",
    name: "Retail",
    description: "Storefront, floor, and common-area cleaning that keeps retail spaces presentable for customers.",
  },
  {
    icon: "sparkle",
    name: "Hospitality",
    description: "Deep cleaning and extraction services for hotels, restaurants, and hospitality venues.",
  },
  {
    icon: "building",
    name: "Commercial Properties",
    description: "Cleaning and pressure washing programs for property managers overseeing multi-tenant buildings.",
  },
  {
    icon: "factory",
    name: "Industrial Facilities",
    description: "Large-scale facility cleaning programs with recurring teams, equipment, and supervision.",
  },
];

export default function IndustriesPage() {
  return (
    <>
      <section className="bg-navy-950 py-16 sm:py-20">
        <div className="container-page">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-accent-400">Who We Serve</p>
          <h1 className="max-w-2xl text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
            Industries We Serve
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-slate-300 sm:text-lg">
            CDCS Inc. is structured to support the operational demands of commercial,
            institutional, and industrial clients across Guyana.
          </p>
        </div>
      </section>

      <section className="bg-white py-16 sm:py-24">
        <div className="container-page">
          <SectionHeading eyebrow="Sectors" title="Built for Organizations That Depend on Reliable Service" />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {industryDetails.map((industry) => {
              const Icon = iconMap[industry.icon];
              return (
                <div key={industry.name} className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-navy-900 text-accent-400">
                    {Icon && <Icon className="h-6 w-6" />}
                  </div>
                  <h3 className="mt-4 font-bold text-navy-900">{industry.name}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">{industry.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <CTABanner
        title="Don't See Your Industry Listed?"
        description="CDCS Inc. works with a wide range of organizations. Reach out and tell us about your facility or fleet — we'll help determine the right service."
      />
    </>
  );
}
