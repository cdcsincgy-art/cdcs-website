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
  /**
   * Optional longer-form body copy shown in an "Overview" section on the
   * service page — 2–3 short paragraphs that genuinely answer what the service
   * covers and how it applies in Guyana. Not SEO filler.
   */
  overview?: string[];
  idealFor: string[];
  whatsIncluded: string[];
  process?: string[];
  faq?: { q: string; a: string }[];
  /** Slugs of the most relevant other services, shown in "Related services". */
  relatedSlugs?: string[];
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
    metaTitle: "Commercial Cleaning & Janitorial Services in Guyana",
    metaDescription:
      "Recurring commercial cleaning and janitorial services for offices, banks, and government buildings in Georgetown and across Guyana — trained, supervised teams.",
    h1: "Commercial & Janitorial Cleaning in Guyana",
    intro:
      "CDCS Inc. is a Georgetown-based commercial cleaning company providing structured, recurring janitorial programs for offices, corporate buildings, banks, government offices, and institutions across Guyana. We build a cleaning plan around your operating hours, foot traffic, and facility layout — from daily office cleaning to restroom and common-area upkeep — so your workplace stays consistently clean and presentable. Programs run daily, weekly, or on a custom schedule, and every team is supervised with regular quality checks.",
    overview: [
      "Commercial cleaning and janitorial service is the day-to-day upkeep that keeps a workplace presentable between deeper cleans: reception and entrance areas, open-plan and private offices, boardrooms, restrooms, kitchens and break rooms, corridors, stairwells, and shared equipment. CDCS Inc. runs these programs for businesses and public-sector offices in Georgetown and, by arrangement, elsewhere in Guyana.",
      "Most clients use a recurring schedule — daily, several times a week, or weekly — with the visit timed for early morning, evening, or another off-peak window so cleaning never gets in the way of staff or visitors. One-time and pre-event cleans are available too. Every program is assigned a briefed team and checked against an agreed scope so standards hold over the length of the contract.",
      "High-contact points — door handles, light switches, shared desks, lift buttons, and restroom fixtures — are part of every routine visit. Where a space needs more than routine attention, it can be paired with a deep clean, and newly fitted-out or renovated offices are handed over with post-construction cleaning first.",
    ],
    relatedSlugs: ["deep-cleaning", "post-construction-cleaning", "commercial-facility-cleaning"],
    faq: [
      {
        q: "Do you provide office and janitorial cleaning in Georgetown?",
        a: "Yes. CDCS Inc. is based in Georgetown and provides recurring janitorial and office cleaning for businesses, institutions, and government offices there and elsewhere in Guyana.",
      },
      {
        q: "Can cleaning be scheduled outside business hours?",
        a: "Yes. We build the schedule around your operating hours, including early-morning, evening, and off-hours service, so the work does not disrupt your staff or customers.",
      },
      {
        q: "Do you offer one-time cleaning as well as recurring contracts?",
        a: "Yes. CDCS Inc. handles one-time and deep cleaning projects as well as daily, weekly, or custom-frequency recurring janitorial contracts.",
      },
      {
        q: "What does a commercial cleaning program include?",
        a: "A typical program covers reception, offices, restrooms, and common areas; floor care; trash removal and liner replacement; and sanitizing of high-touch surfaces, with supervised teams and regular quality checks.",
      },
    ],
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
    metaTitle: "Pressure Washing Services in Guyana",
    metaDescription:
      "Commercial pressure washing in Georgetown and across Guyana — building exteriors, walkways, parking areas, concrete, and walls. Pressure matched to each surface.",
    h1: "Pressure Washing in Guyana",
    intro:
      "First impressions start outside. CDCS Inc. provides professional pressure washing across Guyana to remove built-up dirt, algae, oil stains, and grime from the exterior surfaces of commercial and institutional properties — walkways, facades, parking areas, and compounds — restoring a clean, well-maintained appearance for staff, customers, and visitors.",
    overview: [
      "In Guyana's climate, exterior surfaces pick up algae, moss, mold, and traffic grime quickly, and a tired-looking frontage is the first thing customers and visitors notice. Commercial pressure washing clears that build-up from concrete, pavers, block and masonry, painted walls, signage surrounds, and glass-adjacent areas, bringing a property back to a maintained appearance.",
      "CDCS Inc. handles pressure washing for shopfronts and office entrances, parking areas and walkways, warehouse aprons and loading docks, boundary walls, and compound areas around Georgetown. Water pressure and nozzle choice are matched to each surface so cleaning is effective without damaging the substrate, and oil or grease staining on driveways and bays is treated as part of the job.",
      "Pressure washing is booked as a one-time refresh or on a recurring schedule — quarterly or twice a year is common for high-traffic frontages. It also pairs naturally with an interior cleaning program and with the final clean-down after construction or renovation work.",
    ],
    relatedSlugs: ["commercial-facility-cleaning", "post-construction-cleaning", "fleet-washing"],
    process: [
      "We walk the site and identify surface types, staining, drainage, and anything that needs protecting",
      "Pressure and nozzle are set to each surface, with a test area on delicate or painted finishes",
      "Surfaces are washed methodically, with pre-treatment on oil, grease, and organic growth",
      "A final rinse and walk-through confirms the result before we leave the area usable",
    ],
    faq: [
      {
        q: "What surfaces can you pressure wash?",
        a: "Concrete, pavers, block and masonry, building facades, walkways, parking areas, loading docks, and warehouse or industrial yards. Equipment pressure is matched to each surface type.",
      },
      {
        q: "Do you offer pressure washing in Georgetown on a recurring schedule?",
        a: "Yes. CDCS Inc. is based in Georgetown and sets up recurring exterior washing — for example quarterly or twice a year for busy shopfronts and entrances — as well as one-time cleans.",
      },
      {
        q: "Do you remove oil and grease stains from parking areas?",
        a: "We treat oil and grease staining on driveways and lots as part of the service, though how much lifts depends on how long the staining has set.",
      },
      {
        q: "Can the work be done without disrupting our business?",
        a: "Yes. We schedule around your business hours to keep entrances and parking areas usable while the work is carried out.",
      },
    ],
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
    metaTitle: "Mobile Car & Vehicle Detailing in Guyana",
    metaDescription:
      "Mobile car detailing in Georgetown, Guyana. CDCS Inc. brings full interior and exterior vehicle detailing to your home, office, or business — no shop visit needed.",
    h1: "Mobile Car Detailing in Guyana",
    intro:
      "CDCS Inc. brings premium vehicle detailing directly to you. Whether you're at home, at the office, or managing a busy schedule, our mobile detailing team arrives fully equipped to deliver a thorough interior and exterior service without you needing to visit a shop.",
    overview: [
      "Mobile detailing means the full service comes to your driveway or parking area in Georgetown rather than you booking out half a day at a shop. The team arrives with water, power, and equipment and works through the vehicle inside and out: exterior wash and dry, wheels and tires, glass, and a full interior clean of seats, carpets, mats, dashboard, console, and door cards.",
      "It suits private owners who want their car kept sharp, executives and professionals who can't spare shop time, and businesses that need pool cars, management vehicles, or sales stock presented well. For larger numbers of vehicles on a routine basis, fleet washing is the better fit.",
      "Where seats, carpets, or mats are heavily soiled or stained, the detail can include hot-water extraction of the interior fabric — the same method used in our upholstery and fabric cleaning service.",
    ],
    idealFor: [
      "Individual vehicle owners",
      "Executives and busy professionals",
      "Corporate pool and management vehicles",
      "Dealerships preparing vehicles for sale",
      "Rental and car-share operators",
    ],
    whatsIncluded: [
      "Exterior wash, decontamination, and drying",
      "Interior vacuuming and surface cleaning",
      "Dashboard, console, and door panel detailing",
      "Window and mirror cleaning, inside and out",
      "Tire, rim, and trim treatment",
      "Optional interior fabric extraction (see Upholstery & Fabric Cleaning)",
    ],
    process: [
      "We confirm the vehicle, its condition, and where it will be parked for the service",
      "Exterior is washed, decontaminated, and dried; wheels, tires, and trim are treated",
      "Interior is vacuumed and wiped down, with extraction on fabric where it's needed",
      "A final walk-around checks glass, panels, and finish before hand-back",
    ],
    faq: [
      {
        q: "Do you come to my home or office?",
        a: "Yes. Mobile detailing is carried out where the vehicle is parked — a driveway, office parking area, or business premises in Georgetown. Locations outside the city can be arranged.",
      },
      {
        q: "Do you detail company and pool vehicles?",
        a: "Yes. CDCS Inc. details management vehicles, pool cars, and sales stock for businesses. For routine washing of several vehicles, fleet washing is usually the better option.",
      },
      {
        q: "Can you clean stained seats and carpets?",
        a: "Yes. Where interior fabric is heavily soiled, the detail can include hot-water extraction of seats, carpets, and mats — the same method used in our upholstery and fabric cleaning service.",
      },
    ],
    relatedSlugs: ["upholstery-fabric-extraction", "fleet-washing", "deep-cleaning"],
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
    metaTitle: "Fleet Washing for Trucks & Vehicles in Guyana",
    metaDescription:
      "Commercial fleet and truck washing in Guyana. CDCS Inc. runs scheduled and one-time washing at your depot or yard for trucks, vans, and heavy equipment fleets.",
    h1: "Fleet Washing in Guyana",
    intro:
      "A clean fleet reflects a well-run operation. CDCS Inc. provides scheduled and one-time washing programs across Guyana for trucks, commercial vehicles, and heavy-duty fleets — helping transportation and logistics companies maintain a professional appearance and protect their vehicle investment.",
    overview: [
      "Fleet washing is a routine, volume service: instead of sending vehicles out one at a time, CDCS Inc. comes to your depot or yard and works through the fleet on a set schedule. It covers trucks and prime movers, delivery vans, buses and crew transport, and construction or equipment fleets.",
      "For transport, haulage, distribution, and courier operators around Georgetown, a branded vehicle is rolling advertising — and grime, road film, and salt spray also make defects and damage harder to spot. A regular wash keeps the fleet presentable and the bodywork easier to inspect.",
      "Programs are scaled to fleet size and dispatch patterns — weekly, bi-weekly, or monthly — with washing timed around loading and delivery runs. One-time washes are available for a specific job, an audit, or before a vehicle goes back to a lessor.",
    ],
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
    relatedSlugs: ["mobile-detailing", "pressure-washing", "commercial-facility-cleaning"],
    process: [
      "We review the fleet — vehicle types and numbers, wash location, water and drainage, and dispatch times",
      "A schedule and scope are agreed, from a weekly run to a one-time wash",
      "The team works through the fleet on-site, exterior wash with undercarriage or cab options as needed",
      "The program is kept consistent, with the scope adjusted as the fleet grows or changes",
    ],
    faq: [
      {
        q: "Do you wash fleets on-site?",
        a: "Yes. Fleet washing is carried out at your depot or yard, on a scheduled recurring program or as a one-time service.",
      },
      {
        q: "How often can fleet washing be scheduled?",
        a: "Weekly, bi-weekly, monthly, or as-needed — the program is scaled to your fleet size and dispatch schedule.",
      },
      {
        q: "What vehicles do you handle?",
        a: "Trucks and prime movers, delivery and commercial vans, buses, construction and equipment fleets, and company vehicle pools.",
      },
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
    metaTitle: "Deep Cleaning Services in Guyana",
    metaDescription:
      "One-time deep cleaning for offices, facilities, and homes in Guyana. CDCS Inc. clears the built-up grime routine cleaning leaves behind.",
    h1: "Deep Cleaning in Guyana",
    intro:
      "Some spaces need more than a routine clean. CDCS Inc.'s deep cleaning service in Guyana addresses built-up grime, neglected areas, and detailed surfaces — ideal for move-ins and move-outs, seasonal resets, occupied spaces that have gone without service for a while, or facilities preparing for an inspection or event.",
    overview: [
      "Deep cleaning is a one-time, intensive reset that reaches what a routine visit doesn't have time for: behind and under furniture, tops of partitions and frames, vents and fittings, skirting and door frames, tile grout, and the parts of kitchens and restrooms that need scrubbing rather than wiping.",
      "Offices and facilities in Georgetown typically book it when a space has gone a while without service, ahead of an audit or client visit, at the start or end of a lease, or as a periodic reset on top of a regular cleaning program. CDCS Inc. also carries out residential deep cleans for property owners and rentals.",
      "A deep clean is often the first visit before a recurring commercial cleaning program starts, so the routine schedule begins from a genuinely clean baseline. Where fabric is involved, it pairs with carpet and upholstery extraction.",
    ],
    idealFor: [
      "Offices returning to service after a period of closure",
      "Facilities preparing for inspection, audit, or occupancy",
      "Businesses needing a periodic deep reset",
      "Start or end of a commercial lease",
      "Residential properties and rentals",
    ],
    whatsIncluded: [
      "Detailed cleaning of surfaces, fixtures, and hard-to-reach areas",
      "Kitchen and restroom deep sanitation",
      "Baseboards, vents, and fixture detailing",
      "Wall spot-cleaning and door/frame cleaning",
      "Floor detailing and buildup removal",
    ],
    relatedSlugs: ["commercial-janitorial-cleaning", "post-construction-cleaning", "upholstery-fabric-extraction"],
    faq: [
      {
        q: "When should we book a deep clean instead of routine cleaning?",
        a: "Deep cleaning suits move-ins and move-outs, seasonal resets, spaces that have gone without service for a while, or a facility preparing for an inspection or event.",
      },
      {
        q: "Can a deep clean start a regular cleaning contract?",
        a: "Yes, and it often does. Running a deep clean first means the recurring janitorial schedule starts from a fully clean baseline rather than trying to catch up over several visits.",
      },
      {
        q: "Is deep cleaning available for both offices and homes?",
        a: "Yes. CDCS Inc. carries out deep cleaning for commercial spaces and for residential properties and rentals in Guyana.",
      },
    ],
    keywords: ["deep cleaning Guyana"],
  },
  {
    slug: "upholstery-fabric-extraction",
    title: "Carpet, Upholstery & Fabric Cleaning",
    shortDescription:
      "Hot-water extraction — often called steam cleaning — for carpets, office chairs, sofas, and vehicle seats.",
    category: "Extraction Cleaning",
    icon: "chair",
    heroPlaceholderLabel: "Photo placeholder — extraction cleaning of an office chair or carpet",
    metaTitle: "Carpet, Upholstery & Fabric Cleaning in Guyana",
    metaDescription:
      "Carpet, upholstery, office-chair, and vehicle-seat cleaning in Guyana. CDCS Inc. uses hot-water extraction — commonly called steam cleaning — on fabric surfaces.",
    h1: "Carpet, Upholstery & Fabric Cleaning in Guyana",
    intro:
      "Fabric surfaces absorb dust, allergens, and stains over time, even with regular surface cleaning. CDCS Inc. uses hot-water extraction — the method most people call steam cleaning — to lift embedded dirt from carpets, office furniture, and vehicle interiors, refreshing the look, feel, and smell of your fabric surfaces.",
    overview: [
      "Hot-water extraction works in two steps: a heated cleaning solution is worked into the fibres to loosen dirt, oils, and residue, then a machine immediately draws the solution back out along with the soil it has lifted. It reaches well below the surface, which is why it's used for fabric that vacuuming and spot-cleaning can't fully revive. \"Steam cleaning\" is the everyday name for the same process.",
      "For offices in Georgetown, the common requests are carpeted floors in workspaces and conference rooms, and task, executive, and reception chairs that have picked up years of use. CDCS Inc. also cleans sofas and lounge seating, hospitality and event furniture, and car and vehicle seats and interior carpet.",
      "Fabric is inspected first for material and stain type, high-traffic lanes and visible marks are pre-treated, and the extraction pass follows. Upholstery and carpet are usually left damp rather than wet and dry over a few hours depending on airflow and humidity — booking an evening or a quieter day keeps disruption low.",
    ],
    idealFor: [
      "Carpeted offices, workspaces, and conference rooms",
      "Task, executive, and reception chairs",
      "Sofas, lounge, and waiting-area seating",
      "Hospitality and event furniture",
      "Vehicle seats and interior carpet",
    ],
    whatsIncluded: [
      "Pre-inspection of fabric type, wear, and staining",
      "Pre-treatment of high-traffic lanes and visible marks",
      "Hot-water extraction (steam cleaning) of upholstery and carpet",
      "Chair and seat cleaning, including office task and executive chairs",
      "Vehicle seat and interior carpet extraction",
      "Deodorizing and spot/stain treatment where the fabric allows",
    ],
    process: [
      "We inspect the fabric or carpet for material, colorfastness, wear, and stain type",
      "High-traffic areas and visible marks are pre-treated to loosen soil",
      "Hot solution is worked into the fibres and immediately extracted with the loosened dirt",
      "We check the result, treat any remaining spots, and leave drying guidance",
    ],
    faq: [
      {
        q: "Do you clean carpets as well as upholstery?",
        a: "Yes. Carpeted offices, workspaces, and conference rooms are a core part of this service, alongside chairs, sofas, and vehicle interiors. The same hot-water extraction method is used for both carpet and upholstery.",
      },
      {
        q: "Is this the same as steam cleaning?",
        a: "In practice, yes. Hot-water extraction is the method most people mean by steam cleaning: a heated cleaning solution is worked into the fabric and then drawn back out with the dirt it has lifted.",
      },
      {
        q: "Can you clean office chairs?",
        a: "Yes — task chairs, executive chairs, and reception seating are one of the most common requests from offices in Georgetown, either on their own or with the carpet.",
      },
      {
        q: "How long does fabric take to dry?",
        a: "Upholstery and carpet are left damp rather than soaked and usually dry within a few hours, though this depends on airflow and humidity on the day. Scheduling an evening or a quiet day keeps disruption low.",
      },
      {
        q: "Will old stains come out completely?",
        a: "Many do, but not all. Set-in stains, dye transfer, and damage to the fibre itself may lighten rather than disappear. We pre-treat and give an honest read on what to expect before starting.",
      },
    ],
    relatedSlugs: ["deep-cleaning", "commercial-janitorial-cleaning", "mobile-detailing"],
    keywords: ["carpet cleaning Guyana", "upholstery cleaning Guyana", "steam cleaning Guyana"],
  },
  {
    slug: "post-construction-cleaning",
    title: "Post-Construction Cleaning",
    shortDescription:
      "Final-stage cleaning that removes construction dust, debris, and residue to prepare spaces for occupancy.",
    category: "Commercial Cleaning",
    icon: "hardhat",
    heroPlaceholderLabel: "Photo placeholder — post-construction cleanup of a newly built space",
    metaTitle: "Post-Construction Cleaning in Guyana",
    metaDescription:
      "Post-construction and renovation cleanup in Guyana. CDCS Inc. removes dust, debris, and residue so newly built or renovated spaces are ready for occupancy.",
    h1: "Post-Construction Cleaning",
    intro:
      "Newly built and renovated spaces need a thorough final clean before they're ready for occupancy. CDCS Inc. removes construction dust, debris, adhesive residue, and material buildup from floors, fixtures, windows, and surfaces — helping contractors and property owners hand over a finished, presentable space.",
    overview: [
      "Construction and fit-out work leaves fine dust on every surface and in every track and vent, plus adhesive, grout haze, paint spots, silicone, and sticker residue on glass and fixtures. Post-construction cleaning is the stage that turns a finished build into a space that's ready to hand over or move into.",
      "CDCS Inc. carries this out for contractors, developers, and property owners in Guyana on new offices, retail and restaurant fit-outs, and renovated commercial units. It's usually done in a rough clean after the trades leave and a detailed final clean once snagging is complete.",
      "Where the exterior, walkways, or parking area also need attention, it's combined with pressure washing, and an incoming tenant's recurring janitorial program can start straight after handover.",
    ],
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
    relatedSlugs: ["deep-cleaning", "pressure-washing", "commercial-facility-cleaning"],
    faq: [
      {
        q: "When in the project should post-construction cleaning happen?",
        a: "It is the final stage before handover or occupancy, once construction and installation work is complete, so dust and debris are removed before the space is used.",
      },
      {
        q: "Do you work with contractors and property developers?",
        a: "Yes. CDCS Inc. works with construction companies, developers, and property owners handing over completed offices, retail units, and commercial build-outs in Guyana.",
      },
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
    metaTitle: "Commercial Facility Cleaning in Guyana",
    metaDescription:
      "Custom, structured cleaning programs for larger commercial and industrial facilities in Guyana, with recurring teams and equipment from CDCS Inc.",
    h1: "Commercial Facility Cleaning",
    intro:
      "Larger facilities need more than a standard cleaning visit — they need a structured program. CDCS Inc. designs custom facility cleaning plans that scale to your building size, staffing needs, and operational schedule, backed by trained teams, appropriate equipment, and on-site supervision.",
    overview: [
      "Facility cleaning is a managed program rather than a single recurring visit. It's the right fit when a site is large, runs across multiple floors or buildings, operates outside normal hours, or has areas — warehousing, production, plant rooms, high-traffic public space — that each need their own routine and standard.",
      "CDCS Inc. builds the scope around the facility: which areas are cleaned how often, which need specialized attention, how supplies and equipment are stocked, and how the work is supervised and checked. Teams are assigned to the site so the same people learn its layout and requirements.",
      "For warehouses and industrial sites in Guyana, this often runs alongside pressure washing for aprons and yards, and post-construction cleaning when a section is built out or refitted.",
    ],
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
    relatedSlugs: ["commercial-janitorial-cleaning", "pressure-washing", "post-construction-cleaning"],
    faq: [
      {
        q: "How is facility cleaning different from standard janitorial service?",
        a: "Facility cleaning is a structured program for larger or multi-floor sites — with a custom scope of work, recurring team assignments, equipment and supply planning, and on-site supervision.",
      },
      {
        q: "Can you service facilities outside normal hours?",
        a: "Yes. Programs can be built around night shifts and off-hours service so cleaning does not interrupt operations.",
      },
    ],
    keywords: ["commercial cleaning Guyana", "facility cleaning Guyana"],
  },
];

export function getServiceBySlug(slug: string) {
  return services.find((s) => s.slug === slug);
}
