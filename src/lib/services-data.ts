// Master list of CDCS services. Add a new service by adding an object to
// this array — a page at /services/[slug] and a card on the homepage /
// services index are generated automatically.

export type ServiceCategory =
  | "Pressure Washing"
  | "Commercial Cleaning"
  | "Fleet Washing"
  | "Mobile Detailing"
  | "Deep Cleaning"
  | "Extraction Cleaning";

export interface ServiceDefinition {
  slug: string;
  title: string;
  shortDescription: string;
  category: ServiceCategory;
  icon: string; // key into <ServiceIcon />
  heroPlaceholderLabel: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  intro: string;
  idealFor: string[];
  whatsIncluded: string[];
  process?: string[];
  faq?: { q: string; a: string }[];
  keywords: string[];
}

export const services: ServiceDefinition[] = [
  {
    slug: "commercial-janitorial-cleaning",
    title: "Commercial & Janitorial Cleaning",
    shortDescription:
      "Recurring professional cleaning programs for offices, commercial facilities, institutions, and organizations.",
    category: "Commercial Cleaning",
    icon: "building",
    heroPlaceholderLabel: "Photo placeholder — office/janitorial cleaning crew in action",
    metaTitle: "Commercial & Janitorial Cleaning Services in Guyana",
    metaDescription:
      "Recurring commercial and janitorial cleaning for offices, institutions, and organizations across Guyana. Trained teams, flexible schedules, and consistent quality from CDCS Inc.",
    h1: "Commercial & Janitorial Cleaning",
    intro:
      "CDCS Inc. delivers structured, recurring cleaning programs designed for offices, corporate buildings, institutions, and organizations that depend on a consistently clean and professional environment. We build a service plan around your operating hours, foot traffic, and facility layout so your space stays presentable every day.",
    idealFor: [
      "Corporate & administrative offices",
      "Government and public-sector buildings",
      "Banks and financial institutions",
      "Schools and training institutions",
      "Medical and professional offices",
      "Multi-tenant commercial buildings",
    ],
    whatsIncluded: [
      "Daily, weekly, or custom-frequency cleaning schedules",
      "Reception, office, restroom, and common-area cleaning",
      "Floor care — sweeping, mopping, vacuuming, and surface maintenance",
      "Trash removal and liner replacement",
      "Sanitizing of high-touch surfaces and shared equipment",
      "Supervised cleaning teams with consistent quality checks",
    ],
    process: [
      "We review your facility, hours of operation, and cleaning priorities",
      "We propose a schedule and scope tailored to your building",
      "A trained team is assigned and briefed on your site's requirements",
      "Ongoing quality checks keep the program consistent over time",
    ],
    keywords: ["commercial cleaning Guyana", "janitorial services Guyana", "office cleaning Georgetown Guyana"],
  },
  {
    slug: "pressure-washing",
    title: "Pressure Washing",
    shortDescription:
      "High-pressure exterior cleaning for entrances, walkways, concrete, parking areas, walls, and compounds.",
    category: "Pressure Washing",
    icon: "spray",
    heroPlaceholderLabel: "Photo placeholder — pressure washing a commercial walkway or building exterior",
    metaTitle: "Pressure Washing Services Guyana | Commercial Exteriors",
    metaDescription:
      "Professional pressure washing for commercial entrances, parking areas, concrete, walls, and compounds in Guyana. Restore the exterior appearance of your property with CDCS Inc.",
    h1: "Pressure Washing",
    intro:
      "First impressions start outside. CDCS Inc. provides professional pressure washing to remove built-up dirt, algae, oil stains, and grime from the exterior surfaces of commercial and institutional properties — restoring a clean, well-maintained appearance for staff, customers, and visitors.",
    idealFor: [
      "Commercial building entrances and facades",
      "Parking lots and parking structures",
      "Walkways, sidewalks, and compounds",
      "Warehouses and industrial yards",
      "Loading docks and service areas",
      "Retail and restaurant exteriors",
    ],
    whatsIncluded: [
      "Site assessment of surfaces and staining",
      "Adjustable-pressure equipment matched to surface type",
      "Concrete, pavers, block, and masonry cleaning",
      "Oil and grease stain treatment on driveways and lots",
      "Wall and low-rise exterior washing",
      "Scheduling around business hours to minimize disruption",
    ],
    keywords: ["pressure washing Guyana", "commercial cleaning Georgetown"],
  },
  {
    slug: "mobile-detailing",
    title: "Mobile Detailing",
    shortDescription:
      "Professional vehicle cleaning and detailing delivered to your home, office, business, or fleet location.",
    category: "Mobile Detailing",
    icon: "car",
    heroPlaceholderLabel: "Photo placeholder — mobile detailing technician working on a vehicle interior",
    metaTitle: "Mobile Detailing Guyana | We Come to You",
    metaDescription:
      "Premium mobile vehicle detailing in Georgetown, Guyana. CDCS Inc. brings professional interior and exterior detailing to your home, office, or business location.",
    h1: "Mobile Detailing",
    intro:
      "CDCS Inc. brings premium vehicle detailing directly to you. Whether you're at home, at the office, or managing a busy schedule, our mobile detailing team arrives fully equipped to deliver a thorough interior and exterior service without you needing to visit a shop.",
    idealFor: [
      "Individual vehicle owners",
      "Executives and busy professionals",
      "Corporate pool vehicles",
      "Dealerships preparing vehicles for sale",
      "Rental and car-share operators",
    ],
    whatsIncluded: [
      "Exterior wash, decontamination, and drying",
      "Interior vacuuming and surface cleaning",
      "Dashboard, console, and door panel detailing",
      "Window and mirror cleaning, inside and out",
      "Tire, rim, and trim treatment",
      "Optional upholstery/interior extraction (see Upholstery & Fabric Extraction)",
    ],
    keywords: ["mobile detailing Guyana"],
  },
  {
    slug: "fleet-washing",
    title: "Fleet Washing",
    shortDescription:
      "Scheduled and one-time washing for trucks, commercial vehicles, and heavy-duty fleets.",
    category: "Fleet Washing",
    icon: "truck",
    heroPlaceholderLabel: "Photo placeholder — fleet washing trucks or commercial vehicles on-site",
    metaTitle: "Fleet Washing Services Guyana | Trucks & Commercial Vehicles",
    metaDescription:
      "Scheduled and one-time fleet washing for trucks, commercial vehicles, and transportation operators in Guyana. Keep your fleet looking professional with CDCS Inc.",
    h1: "Fleet Washing",
    intro:
      "A clean fleet reflects a well-run operation. CDCS Inc. provides scheduled and one-time washing programs for trucks, commercial vehicles, and heavy-duty fleets — helping transportation and logistics companies maintain a professional appearance and protect their vehicle investment.",
    idealFor: [
      "Transportation and logistics companies",
      "Trucking and haulage operators",
      "Construction and equipment fleets",
      "Delivery and courier services",
      "Company vehicle pools",
    ],
    whatsIncluded: [
      "On-site washing at your depot or yard",
      "Scheduled recurring programs (weekly, bi-weekly, monthly)",
      "One-time or as-needed washing",
      "Cab exterior and undercarriage rinse options",
      "Flexible scheduling around dispatch and delivery times",
      "Service programs scaled to fleet size",
    ],
    keywords: ["fleet washing Guyana"],
  },
  {
    slug: "deep-cleaning",
    title: "Deep Cleaning",
    shortDescription:
      "Intensive, detailed cleaning for spaces that require significantly more attention than routine cleaning.",
    category: "Deep Cleaning",
    icon: "sparkle",
    heroPlaceholderLabel: "Photo placeholder — deep cleaning of a commercial or residential space",
    metaTitle: "Deep Cleaning Services Guyana | Residential & Commercial",
    metaDescription:
      "Intensive deep cleaning for residential and commercial spaces in Guyana. CDCS Inc. handles the buildup routine cleaning leaves behind.",
    h1: "Deep Cleaning",
    intro:
      "Some spaces need more than a routine clean. CDCS Inc.'s deep cleaning service addresses built-up grime, neglected areas, and detailed surfaces — ideal for move-ins/move-outs, seasonal resets, occupied spaces that have gone without service for a while, or facilities preparing for an inspection or event.",
    idealFor: [
      "Residential properties and rentals",
      "Offices returning to service after a period of closure",
      "Facilities preparing for inspection or occupancy",
      "Businesses needing a seasonal deep reset",
    ],
    whatsIncluded: [
      "Detailed cleaning of surfaces, fixtures, and hard-to-reach areas",
      "Kitchen and restroom deep sanitation",
      "Baseboards, vents, and fixture detailing",
      "Wall spot-cleaning and door/frame cleaning",
      "Floor detailing and buildup removal",
    ],
    keywords: ["deep cleaning Guyana"],
  },
  {
    slug: "upholstery-fabric-extraction",
    title: "Upholstery & Fabric Extraction",
    shortDescription:
      "Extraction and steam cleaning for office chairs, carpets, sofas, and vehicle interiors.",
    category: "Extraction Cleaning",
    icon: "chair",
    heroPlaceholderLabel: "Photo placeholder — extraction cleaning of an office chair or carpet",
    metaTitle: "Upholstery & Fabric Extraction Cleaning Guyana",
    metaDescription:
      "Professional extraction and steam cleaning for office chairs, carpets, sofas, and vehicle interiors in Guyana, delivered by CDCS Inc.",
    h1: "Upholstery & Fabric Extraction",
    intro:
      "Fabric surfaces absorb dust, allergens, and stains over time, even with regular surface cleaning. CDCS Inc. uses extraction and steam-cleaning methods to lift embedded dirt from office furniture, carpeted areas, and vehicle interiors — refreshing the look and feel of your fabric surfaces.",
    idealFor: [
      "Office chairs and cubicle fabric panels",
      "Carpeted offices and conference rooms",
      "Sofas and reception seating",
      "Vehicle seats and interior fabric",
      "Hospitality and commercial seating",
    ],
    whatsIncluded: [
      "Pre-inspection of fabric and stain types",
      "Extraction/steam cleaning of upholstered surfaces",
      "Carpet extraction cleaning",
      "Vehicle interior fabric and seat extraction",
      "Spot and stain treatment where applicable",
    ],
    keywords: ["extraction cleaning Guyana", "upholstery cleaning Guyana"],
  },
  {
    slug: "post-construction-cleaning",
    title: "Post-Construction Cleaning",
    shortDescription:
      "Final-stage cleaning that removes construction dust, debris, and residue to prepare spaces for occupancy.",
    category: "Commercial Cleaning",
    icon: "hardhat",
    heroPlaceholderLabel: "Photo placeholder — post-construction cleanup of a newly built space",
    metaTitle: "Post-Construction Cleaning Guyana | Ready for Occupancy",
    metaDescription:
      "Post-construction and renovation cleanup in Guyana. CDCS Inc. removes dust, debris, and residue so newly built or renovated spaces are ready for occupancy.",
    h1: "Post-Construction Cleaning",
    intro:
      "Newly built and renovated spaces need a thorough final clean before they're ready for occupancy. CDCS Inc. removes construction dust, debris, adhesive residue, and material buildup from floors, fixtures, windows, and surfaces — helping contractors and property owners hand over a finished, presentable space.",
    idealFor: [
      "Construction companies handing over completed projects",
      "Property developers and owners",
      "Renovated offices and commercial units",
      "New retail and restaurant build-outs",
    ],
    whatsIncluded: [
      "Removal of construction dust and fine debris",
      "Adhesive, paint, and residue spot removal",
      "Window, frame, and fixture cleaning",
      "Floor cleaning and detailing",
      "Final touch-up clean before occupancy or handover",
    ],
    keywords: ["post construction cleaning Guyana"],
  },
  {
    slug: "commercial-facility-cleaning",
    title: "Commercial Facility Cleaning",
    shortDescription:
      "Custom cleaning programs for larger facilities requiring recurring teams, equipment, and structured schedules.",
    category: "Commercial Cleaning",
    icon: "factory",
    heroPlaceholderLabel: "Photo placeholder — cleaning team servicing a large commercial facility",
    metaTitle: "Commercial Facility Cleaning Programs Guyana",
    metaDescription:
      "Custom, structured cleaning programs for larger commercial and industrial facilities in Guyana, with recurring teams and equipment from CDCS Inc.",
    h1: "Commercial Facility Cleaning",
    intro:
      "Larger facilities need more than a standard cleaning visit — they need a structured program. CDCS Inc. designs custom facility cleaning plans that scale to your building size, staffing needs, and operational schedule, backed by trained teams, appropriate equipment, and on-site supervision.",
    idealFor: [
      "Warehouses and distribution centers",
      "Industrial and manufacturing facilities",
      "Large multi-floor commercial buildings",
      "Organizations requiring recurring janitorial contracts",
      "Facilities with specialized scheduling needs (night shifts, off-hours service)",
    ],
    whatsIncluded: [
      "Custom scope of work built around your facility",
      "Recurring team assignment and scheduling",
      "Equipment and supply planning",
      "On-site supervision and quality standards",
      "Scalable programs as your facility or contract grows",
    ],
    keywords: ["commercial cleaning Guyana", "facility cleaning Guyana"],
  },
];

export function getServiceBySlug(slug: string) {
  return services.find((s) => s.slug === slug);
}

export const portfolioCategories = [
  "All",
  "Pressure Washing",
  "Commercial Cleaning",
  "Fleet Washing",
  "Mobile Detailing",
  "Deep Cleaning",
  "Extraction Cleaning",
] as const;
