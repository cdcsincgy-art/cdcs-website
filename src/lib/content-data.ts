// Homepage / cross-page content blocks that aren't full "services" but are
// reused in more than one place (trust points, industries, process steps).

export const trustPoints = [
  { icon: "building", label: "Commercial & Corporate Services" },
  { icon: "users", label: "Trained Cleaning Teams" },
  { icon: "tools", label: "Professional Equipment" },
  { icon: "calendar", label: "Flexible Scheduling" },
  { icon: "truck", label: "Mobile Service Available" },
  { icon: "clipboard", label: "Customized Service Plans" },
];

export const whyChooseUs = [
  {
    icon: "shield",
    title: "Professional Service Standards",
    description: "Every job follows a defined scope of work and quality standard — not an improvised approach.",
  },
  {
    icon: "clock",
    title: "Reliable Scheduling",
    description: "We show up when we say we will, and structure recurring programs around your operating hours.",
  },
  {
    icon: "target",
    title: "Attention to Detail",
    description: "Our teams are trained to look for the details that get missed in a rushed clean.",
  },
  {
    icon: "factory",
    title: "Commercial Capability",
    description: "From single offices to large facilities and fleets, our teams and equipment scale to the job.",
  },
  {
    icon: "clipboard",
    title: "Flexible Service Programs",
    description: "One-time projects, recurring contracts, or custom programs — built around what you need.",
  },
  {
    icon: "phone",
    title: "Responsive Communication",
    description: "Straightforward quotes, clear scheduling, and a team that's easy to reach by phone or WhatsApp.",
  },
];

export interface Industry {
  /** Anchor on /industries/ (e.g. /industries/#hotels-hospitality). */
  id: string;
  icon: string;
  name: string;
  group: "institutions" | "operations";
  description: string;
  /** Service slugs most relevant to this sector, most important first. */
  services: string[];
}

// One sector list shared by the homepage, the Industries page, and the
// "Industries served" strip on service pages. Descriptions describe the work,
// not credentials — no sector certifications or approvals are claimed.
export const industries: Industry[] = [
  {
    id: "corporate-offices",
    icon: "building",
    name: "Corporate Offices",
    group: "institutions",
    description:
      "Recurring janitorial programmes for professional offices, with carpet, office-chair, and deep cleaning scheduled around working hours.",
    services: ["commercial-janitorial-cleaning", "carpet-cleaning", "upholstery-fabric-extraction", "deep-cleaning"],
  },
  {
    id: "government-public-sector",
    icon: "shield",
    name: "Government & Public Sector",
    group: "institutions",
    description:
      "Structured, documented cleaning for ministries, agencies, and public buildings — defined scopes, supervised teams, and service records suited to public procurement.",
    services: ["commercial-janitorial-cleaning", "commercial-facility-cleaning", "upholstery-fabric-extraction", "carpet-cleaning"],
  },
  {
    id: "hotels-hospitality",
    icon: "sparkle",
    name: "Hotels & Hospitality",
    group: "institutions",
    description:
      "Carpet extraction for corridors, rooms, and function spaces, upholstery cleaning for lobby and banquet seating, and exterior washing for entrances and pool decks.",
    services: ["carpet-cleaning", "upholstery-fabric-extraction", "deep-cleaning", "pressure-washing"],
  },
  {
    id: "retail",
    icon: "clipboard",
    name: "Retail",
    group: "institutions",
    description:
      "Storefront, floor, and common-area cleaning that keeps retail spaces presentable, with frontage pressure washing on a set schedule.",
    services: ["commercial-janitorial-cleaning", "pressure-washing", "deep-cleaning"],
  },
  {
    id: "commercial-properties",
    icon: "building",
    name: "Commercial Properties",
    group: "operations",
    description:
      "Cleaning, carpet care, and exterior washing programmes for property managers overseeing multi-tenant buildings and shared areas.",
    services: ["commercial-facility-cleaning", "pressure-washing", "carpet-cleaning", "commercial-janitorial-cleaning"],
  },
  {
    id: "logistics-transport",
    icon: "truck",
    name: "Logistics & Transport",
    group: "operations",
    description:
      "On-site fleet washing for trucks, prime movers, and trailers, plus yard, apron, and depot pressure washing for haulage, courier, and distribution operators.",
    services: ["fleet-washing", "pressure-washing", "commercial-facility-cleaning"],
  },
  {
    id: "oil-gas-support",
    icon: "flame",
    name: "Oil & Gas Support Companies",
    group: "operations",
    description:
      "Fleet and heavy-equipment washing, yard pressure washing, and office and facility cleaning for contractors and service companies supporting the sector. Site inductions, permits, and access rules are confirmed during scoping.",
    services: ["fleet-washing", "commercial-facility-cleaning", "pressure-washing", "commercial-janitorial-cleaning"],
  },
  {
    id: "construction",
    icon: "hardhat",
    name: "Construction",
    group: "operations",
    description:
      "Post-construction cleaning for handover, exterior washing of new frontages, and washing of site vehicles and equipment.",
    services: ["post-construction-cleaning", "pressure-washing", "fleet-washing"],
  },
  {
    id: "industrial-facilities",
    icon: "factory",
    name: "Industrial Facilities",
    group: "operations",
    description:
      "Structured facility cleaning programmes with recurring teams and supervision, alongside yard pressure washing and equipment washing.",
    services: ["commercial-facility-cleaning", "pressure-washing", "fleet-washing"],
  },
  {
    id: "residential",
    icon: "home",
    name: "Residential Clients",
    group: "operations",
    description:
      "Deep cleaning for homes, apartments, and rentals, sofa and upholstery cleaning, exterior washing, and vehicle detailing at your home.",
    services: ["deep-cleaning", "upholstery-fabric-extraction", "pressure-washing", "mobile-detailing"],
  },
];

export function getIndustry(id: string) {
  return industries.find((i) => i.id === id);
}

export const processSteps = [
  {
    step: "01",
    title: "Request a Quote",
    description: "Reach out online, by phone, or on WhatsApp with details about your property, vehicle, or facility.",
    icon: "clipboard",
  },
  {
    step: "02",
    title: "Site Assessment / Service Review",
    description: "We review the scope of work — in person for larger jobs, or by discussion for smaller requests.",
    icon: "target",
  },
  {
    step: "03",
    title: "Receive Your Service Proposal",
    description: "We provide a clear proposal outlining the service, schedule, and pricing.",
    icon: "mail",
  },
  {
    step: "04",
    title: "Schedule Service",
    description: "Once approved, we lock in a service date or set up your recurring schedule.",
    icon: "calendar",
  },
  {
    step: "05",
    title: "CDCS Executes & Maintains Quality",
    description: "Our team completes the work to standard and maintains consistency for ongoing contracts.",
    icon: "check",
  },
];
