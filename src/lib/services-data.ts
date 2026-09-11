// Master list of CDCS services. Add a new service by adding an object to
// this array — a page at /services/[slug] and a card on the homepage /
// services index are generated automatically.

export type ServiceCategory =
  | "Pressure Washing"
  | "Commercial Cleaning"
  | "Fleet Washing"
  | "Mobile Detailing"
  | "Vehicle Washing"
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
  /**
   * When true, `metaTitle` is used verbatim as the <title> tag (the root
   * layout's "%s | CDCS Inc." template is skipped). Use this when metaTitle
   * already carries its own brand/structure.
   */
  seoTitleAbsolute?: boolean;
  metaDescription: string;
  /**
   * Optional override for the closing CTA banner heading. Defaults to
   * `Ready to Schedule ${title}?`. Use a service-specific quote prompt where
   * that reads more naturally.
   */
  ctaTitle?: string;
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
    metaTitle: "Cleaning Services Guyana | Commercial & Janitorial | CDCS",
    seoTitleAbsolute: true,
    metaDescription:
      "Professional cleaning services in Guyana for offices, businesses, government facilities and institutions. Commercial and janitorial cleaning by CDCS Inc.",
    h1: "Commercial Cleaning & Janitorial Services in Guyana",
    intro:
      "CDCS Inc. is a Georgetown-based cleaning company providing professional cleaning services in Guyana for offices, corporate buildings, banks, government offices, and institutions. We run structured, recurring janitorial programs built around your operating hours, foot traffic, and facility layout — from daily office cleaning to restroom and common-area upkeep — so your workplace stays consistently clean and presentable. Programs run daily, weekly, or on a custom schedule, and every team is supervised with regular quality checks.",
    overview: [
      "Commercial cleaning and janitorial service is the day-to-day upkeep that keeps a workplace presentable between deeper cleans: reception and entrance areas, open-plan and private offices, boardrooms, restrooms, kitchens and break rooms, corridors, stairwells, and shared equipment. CDCS Inc. runs these programs for businesses and public-sector offices in Georgetown and, by arrangement, elsewhere in Guyana.",
      "Most clients use a recurring schedule — daily, several times a week, or weekly — with the visit timed for early morning, evening, or another off-peak window so cleaning never gets in the way of staff or visitors. One-time and pre-event cleans are available too. Every program is assigned a briefed team and checked against an agreed scope so standards hold over the length of the contract.",
      "High-contact points — door handles, light switches, shared desks, lift buttons, and restroom fixtures — are part of every routine visit. Where a space needs more than routine attention, it can be paired with a deep clean, and newly fitted-out or renovated offices are handed over with post-construction cleaning first.",
      "Organizations choose CDCS Inc. as their professional commercial cleaning company because the service is delivered like a managed contract rather than an informal arrangement: a written scope of work, an assigned and supervised team, defined cleaning frequencies, and regular quality checks. CDCS Inc. is based in Georgetown and serves offices and commercial facilities across the greater Georgetown area, with service elsewhere in Guyana arranged around the site and schedule.",
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
      {
        q: "How is a commercial cleaning program priced?",
        a: "Pricing depends on the size and layout of the facility, how often it is cleaned, the scope of work, and the cleaning hours required. CDCS Inc. assesses the site and provides a written proposal with a clear figure for the recurring scope, plus rates for any periodic or one-time work.",
      },
      {
        q: "Does CDCS Inc. provide commercial cleaning outside Georgetown?",
        a: "CDCS Inc. is based in Georgetown and primarily serves the greater Georgetown area. Service in other parts of Guyana can be arranged depending on the site, the scope, and the schedule — contact us with the details.",
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
    keywords: [
      "cleaning services Guyana",
      "commercial cleaning Guyana",
      "janitorial services Guyana",
      "cleaning company Guyana",
      "office cleaning Guyana",
      "commercial cleaning Georgetown Guyana",
    ],
  },
  {
    slug: "pressure-washing",
    title: "Pressure Washing",
    shortDescription:
      "High-pressure exterior cleaning for entrances, walkways, concrete, parking areas, walls, and compounds.",
    category: "Pressure Washing",
    icon: "spray",
    heroPlaceholderLabel: "Photo placeholder — pressure washing a commercial walkway or building exterior",
    metaTitle: "Pressure Washing Services Guyana | Commercial & Exterior | CDCS",
    seoTitleAbsolute: true,
    metaDescription:
      "Professional pressure washing services in Guyana for buildings, concrete, yards, parking areas, walls and commercial properties. Request a quote from CDCS Inc.",
    h1: "Pressure Washing in Guyana",
    intro:
      "First impressions start outside. CDCS Inc. provides professional pressure washing services in Guyana for businesses, property owners, and organizations — clearing dirt, algae, oil staining, and grime from building exteriors, walkways, parking areas, walls, and compounds so a property looks clean and well maintained to staff, customers, and visitors. Based in Georgetown, CDCS covers commercial, residential, and institutional exterior cleaning across the country where operationally feasible.",
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
    keywords: [
      "pressure washing Guyana",
      "pressure washing services Guyana",
      "pressure washing Georgetown Guyana",
      "power washing services Guyana",
      "commercial pressure washing Guyana",
      "exterior cleaning Guyana",
    ],
  },
  {
    slug: "mobile-detailing",
    title: "Mobile Detailing",
    shortDescription:
      "Professional vehicle cleaning and detailing delivered to your home, office, business, or fleet location.",
    category: "Mobile Detailing",
    icon: "car",
    heroPlaceholderLabel: "Photo placeholder — mobile detailing technician working on a vehicle interior",
    metaTitle: "Mobile Car Detailing Guyana | We Come to You | CDCS",
    seoTitleAbsolute: true,
    metaDescription:
      "Professional mobile car detailing in Guyana at your home, office or business. Interior and exterior vehicle detailing and extraction cleaning by CDCS Inc.",
    h1: "Mobile Car Detailing in Guyana",
    intro:
      "CDCS Inc. provides mobile car detailing in Guyana — professional interior and exterior vehicle detailing brought directly to you. Whether the vehicle is at home, at the office, or at your business premises in Georgetown, our mobile detailing team arrives fully equipped to deliver a thorough detail without you needing to leave the car at a shop.",
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
    keywords: [
      "mobile detailing Guyana",
      "mobile car detailing Guyana",
      "car detailing Guyana",
      "car detailing Georgetown Guyana",
      "interior car detailing Guyana",
      "vehicle detailing Guyana",
    ],
  },
  {
    slug: "fleet-washing",
    title: "Fleet Washing",
    shortDescription:
      "Scheduled and one-time washing for trucks, commercial vehicles, and heavy-duty fleets.",
    category: "Fleet Washing",
    icon: "truck",
    heroPlaceholderLabel: "Photo placeholder — fleet washing trucks or commercial vehicles on-site",
    metaTitle: "Fleet & Truck Washing Guyana | Commercial Vehicles | CDCS",
    seoTitleAbsolute: true,
    metaDescription:
      "Professional fleet and truck washing in Guyana for trucks, commercial vehicles and company fleets. On-site and scheduled washing programs from CDCS Inc.",
    h1: "Fleet & Truck Washing in Guyana",
    intro:
      "A clean fleet reflects a well-run operation. CDCS Inc. provides on-site fleet washing in Guyana for trucks, commercial vehicles, and heavy-duty fleets — scheduled washing programs and one-time truck washing carried out at your depot or yard, so transportation and logistics companies keep a professional appearance and can inspect the bodywork easily. CDCS is based in Georgetown and takes on fleet work across the country depending on fleet size, location, and operating requirements.",
    overview: [
      "Fleet washing is a routine, volume service: instead of sending vehicles out one at a time, CDCS Inc. comes to your depot or yard and works through the fleet on a set schedule. It covers trucks and prime movers, canters and delivery vehicles, trailers, buses and crew transport, and construction or equipment fleets where the site allows.",
      "For transport, haulage, distribution, and courier operators around Georgetown, a branded vehicle is rolling advertising — and grime, road film, and salt spray also make defects and damage harder to spot. A regular wash keeps the fleet presentable and the bodywork easier to inspect.",
      "Programs are scaled to fleet size and dispatch patterns — weekly, bi-weekly, monthly, or a custom recurring schedule — with washing timed around loading and delivery runs. One-time washes are available for a specific job, an audit, or before a vehicle goes back to a lessor.",
    ],
    idealFor: [
      "Transportation and logistics companies",
      "Trucking and haulage operators",
      "Construction companies and equipment operators",
      "Delivery and courier services",
      "Corporate vehicle fleets and company pools",
      "Commercial and rental fleet operators",
    ],
    whatsIncluded: [
      "On-site washing at your depot, yard, or operating location",
      "Exterior truck and vehicle washing — removal of normal road dirt, mud, and grime",
      "Cab exterior, wheels, and tyres",
      "Trailer washing",
      "Chassis / undercarriage rinse where requested",
      "Pressure washing of the wash area or yard where appropriate",
      "Scheduled recurring programs (weekly, bi-weekly, monthly, or custom) and one-time washes",
      "Flexible scheduling around dispatch and delivery times, scaled to fleet size",
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
        a: "Yes. CDCS Inc. travels to your depot, yard, or operating location and washes the fleet where it parks — on a scheduled recurring program or as a one-time service. This is mobile fleet washing: you do not send vehicles out one at a time.",
      },
      {
        q: "How often can fleet washing be scheduled?",
        a: "Weekly, bi-weekly, monthly, or on a custom recurring schedule. CDCS can prepare a recurring fleet-washing program based on fleet size, vehicle type, location, and required frequency.",
      },
      {
        q: "What vehicles do you handle?",
        a: "Trucks and prime movers, canters and delivery vehicles, trailers, commercial vans, company vehicles, buses, and construction vehicles or equipment where the site allows.",
      },
      {
        q: "Does fleet washing remove stains, corrosion, or paint damage?",
        a: "Fleet washing removes normal road dirt, mud, road film, and grime. It does not resolve permanent staining, corrosion, oxidised or damaged paint, or oil contamination — those need different treatment, and we will say so rather than imply a wash will fix them.",
      },
    ],
    keywords: [
      "fleet washing Guyana",
      "truck washing Guyana",
      "commercial vehicle washing Guyana",
      "fleet washing services Guyana",
      "on-site fleet washing Guyana",
      "commercial truck washing",
      "heavy equipment washing Guyana",
    ],
  },
  {
    slug: "car-wash-mobile-vehicle-washing",
    title: "Car Wash & Mobile Vehicle Washing",
    shortDescription:
      "Routine exterior and interior vehicle washing — mobile at your home or workplace, or drop-off at the CDCS washbay, one-time or on a recurring WashCare plan.",
    category: "Vehicle Washing",
    icon: "car",
    heroPlaceholderLabel: "Photo placeholder — a vehicle being washed on-site by CDCS",
    metaTitle: "Car Wash Guyana | Mobile Vehicle Washing | CDCS",
    seoTitleAbsolute: true,
    metaDescription:
      "Professional car wash and mobile vehicle washing in Guyana. CDCS Inc. washes cars, SUVs, pickups and company vehicles at your home or workplace in Georgetown, or by washbay drop-off — one-time or on a recurring WashCare plan.",
    ctaTitle: "Request a Vehicle Washing Quote",
    h1: "Car Wash & Mobile Vehicle Washing in Guyana",
    intro:
      "CDCS Inc. provides professional car wash and mobile vehicle washing in Guyana — routine exterior and interior cleaning for cars, SUVs, pickups, and company vehicles. Based in Georgetown, we bring the wash to your home or workplace where scheduling and logistics permit, or you can drop the vehicle at the CDCS washbay. Book a single wash or set up a recurring WashCare plan that keeps the vehicle consistently clean.",
    overview: [
      "A vehicle wash is routine upkeep: a thorough exterior wash — body, glass, wheels, tyres, and trim — with an interior clean of seats, mats, carpets, and surfaces where an interior-and-exterior wash is booked. It keeps a car, SUV, pickup, or work vehicle presentable week to week, and it is the regular service most drivers need between the occasional full detail.",
      "CDCS Inc. washes vehicles two ways. Mobile vehicle washing brings the team, water, and equipment to your driveway or office parking area in Georgetown, so you do not lose time to a queue. Washbay washing is a drop-off at CDCS. Either way, the wash is matched to the vehicle type and its condition, and a heavily soiled or stained interior can be referred to a fuller service.",
      "For anything beyond routine washing — machine polishing, paint correction, headlight restoration, engine-bay cleaning, or deep interior fabric extraction — mobile detailing is the right service. For washing several company vehicles or trucks on a schedule, fleet washing is the better fit. This page covers the regular wash; those services cover the heavier work.",
    ],
    idealFor: [
      "Private car, SUV, and pickup owners",
      "Executives and professionals short on time",
      "Households keeping more than one vehicle clean",
      "Company pool, management, and sales vehicles",
      "Drivers who want a vehicle kept clean on a set schedule",
    ],
    whatsIncluded: [
      "Exterior wash — body, glass, wheels, tyres, and exterior trim",
      "Interior clean — vacuuming, seats, mats, carpets, dashboard, console, and door panels (interior & exterior wash)",
      "Wash matched to the vehicle type, size, and condition",
      "Mobile washing at your home or workplace, or drop-off at the CDCS washbay",
      "Cars, SUVs, pickups, 7-seaters, and light commercial vehicles",
      "One-time washes or a recurring WashCare plan",
      "Heavily soiled or stained interiors referred to mobile detailing or fabric extraction",
    ],
    process: [
      "Tell us the vehicle, its condition, and whether you want mobile service or washbay drop-off",
      "We confirm the wash package — exterior only, or interior and exterior — and a time",
      "The vehicle is washed inside and/or out, matched to its size and condition",
      "A quick walk-around checks glass, panels, and the interior before hand-back",
    ],
    relatedSlugs: ["mobile-detailing", "fleet-washing", "upholstery-fabric-extraction"],
    faq: [
      {
        q: "Do you offer mobile car washing in Guyana?",
        a: "Yes. CDCS Inc. brings mobile vehicle washing to your home or workplace in Georgetown, with service in other areas of Guyana arranged where scheduling and logistics permit. You can also drop the vehicle at the CDCS washbay.",
      },
      {
        q: "Can CDCS come to my home or workplace?",
        a: "Yes, within the mobile service area. The team arrives with water, power, and equipment and washes the vehicle where it is parked — a driveway or an office parking area. Tell us the location when you request an estimate and we will confirm.",
      },
      {
        q: "What is the difference between a car wash and mobile detailing?",
        a: "A car wash is routine exterior and interior cleaning to keep a vehicle presentable. Mobile detailing is more intensive — machine polishing, paint correction, headlight restoration, engine-bay cleaning, and deep interior fabric extraction. Most drivers need a regular wash and an occasional detail.",
      },
      {
        q: "Do you wash SUVs and pickups?",
        a: "Yes. Cars, SUVs, pickups, 7-seaters, and light commercial vehicles are all washed, with the package and price matched to the vehicle size and condition.",
      },
      {
        q: "Do you wash trucks and company vehicles?",
        a: "A single company vehicle can be washed as a normal booking. For several vehicles or trucks washed on a regular schedule, fleet washing is the right service — CDCS Inc. washes fleets on-site at your depot or yard.",
      },
      {
        q: "What is WashCare?",
        a: "WashCare is CDCS Inc.'s recurring vehicle-washing programme. Instead of booking each wash, eligible vehicles are washed on a set monthly schedule — washbay or mobile where available — for a consistent appearance and simpler planning. Commercial and fleet arrangements are handled separately.",
      },
      {
        q: "How do I get a vehicle-washing estimate?",
        a: "Use the CDCS estimator — answer a few questions about the vehicle and the wash you want and it returns a preliminary figure, including WashCare monthly plans. You can then send it through as an official quotation request.",
      },
    ],
    keywords: [
      "car wash Guyana",
      "mobile car wash Guyana",
      "car wash Georgetown",
      "vehicle washing Guyana",
      "mobile vehicle washing Guyana",
      "on-site vehicle washing Guyana",
    ],
  },
  {
    slug: "deep-cleaning",
    title: "Deep Cleaning",
    shortDescription:
      "Intensive, detailed cleaning for spaces that require significantly more attention than routine cleaning.",
    category: "Deep Cleaning",
    icon: "sparkle",
    heroPlaceholderLabel: "Photo placeholder — deep cleaning of a commercial or residential space",
    metaTitle: "Deep Cleaning Services Guyana | Homes & Businesses | CDCS",
    seoTitleAbsolute: true,
    metaDescription:
      "Professional deep cleaning services in Guyana for homes, offices and commercial properties — kitchens, bathrooms, floors, fixtures and detailed cleaning by CDCS Inc.",
    h1: "Deep Cleaning in Guyana",
    intro:
      "Some spaces need more than a routine clean. CDCS Inc. provides professional deep cleaning services in Guyana for homes, offices, businesses, and commercial properties — an intensive one-time clean that reaches the built-up grime, neglected corners, and detailed surfaces a routine visit does not have time for. It suits move-ins and move-outs, a space that has gone a while without service, or a property being prepared for an inspection, guests, or a new tenant. CDCS is based in Georgetown and takes on deep cleaning across Guyana depending on the location and the job.",
    overview: [
      "Deep cleaning is a one-time, intensive reset that reaches what a routine visit doesn't have time for: behind and under furniture, tops of partitions and frames, vents and fittings, skirting and door frames, tile grout, and the parts of kitchens and bathrooms that need scrubbing rather than wiping.",
      "Offices and facilities in Georgetown typically book it when a space has gone a while without service, ahead of an audit or client visit, at the start or end of a lease, or as a periodic reset on top of a regular cleaning program. CDCS Inc. also carries out residential deep cleans for houses, apartments, and rental properties.",
      "A deep clean is often the first visit before a recurring commercial cleaning program starts, so the routine schedule begins from a genuinely clean baseline. Where fabric is involved, it pairs with carpet and upholstery extraction.",
    ],
    idealFor: [
      "Homes, apartments, and rental properties",
      "Move-in and move-out cleaning",
      "Offices returning to service after a closure",
      "Facilities preparing for inspection, audit, or occupancy",
      "Businesses starting a recurring janitorial contract",
      "Periodic intensive resets and pre-event cleaning",
    ],
    whatsIncluded: [
      "Kitchen deep clean — counters, cabinet and appliance exteriors, sinks, fixtures, degreasing where required, and floors",
      "Bathroom and washroom deep sanitation — toilets, sinks, fixtures, tiled surfaces, grout detailing, and floors",
      "Baseboards, skirting, door frames, ledges, vents, and fittings",
      "Detailed dust removal from high and hard-to-reach surfaces",
      "Wall spot-cleaning where the finish allows",
      "Floor detailing and build-up removal",
      "A final walk-through against an agreed standard",
    ],
    relatedSlugs: ["commercial-janitorial-cleaning", "post-construction-cleaning", "upholstery-fabric-extraction"],
    faq: [
      {
        q: "When should we book a deep clean instead of routine cleaning?",
        a: "Deep cleaning suits move-ins and move-outs, a space that has gone a while without service, a periodic intensive reset, or a property preparing for an inspection, guests, or an event.",
      },
      {
        q: "Can a deep clean start a regular cleaning contract?",
        a: "Yes, and it often does. Running a deep clean first means the recurring janitorial schedule starts from a fully clean baseline rather than trying to catch up over several visits.",
      },
      {
        q: "Is deep cleaning available for both homes and businesses?",
        a: "Yes. CDCS Inc. deep cleans houses, apartments, and rental properties as well as offices, commercial buildings, and institutions in Georgetown and across Guyana.",
      },
      {
        q: "Does a deep clean remove every stain and mark?",
        a: "It clears built-up grime and most surface marks. Set-in stains, damage to a surface, and worn or discoloured finishes may lighten rather than disappear — we give an honest read on what to expect before starting.",
      },
    ],
    keywords: [
      "deep cleaning services Guyana",
      "deep cleaning Guyana",
      "professional deep cleaning Guyana",
      "commercial deep cleaning Guyana",
      "house deep cleaning Guyana",
      "move in cleaning Guyana",
      "move out cleaning Guyana",
    ],
  },
  {
    slug: "upholstery-fabric-extraction",
    title: "Carpet, Upholstery & Fabric Cleaning",
    shortDescription:
      "Hot-water extraction — often called steam cleaning — for carpets, office chairs, sofas, and vehicle seats.",
    category: "Extraction Cleaning",
    icon: "chair",
    heroPlaceholderLabel: "Photo placeholder — extraction cleaning of an office chair or carpet",
    metaTitle: "Carpet & Upholstery Cleaning Guyana | Steam Cleaning | CDCS",
    seoTitleAbsolute: true,
    metaDescription:
      "Professional carpet and upholstery cleaning in Guyana using hot-water extraction. Office chairs, sofas, carpets and vehicle seats cleaned by CDCS Inc.",
    ctaTitle: "Request a Carpet & Upholstery Cleaning Quote",
    h1: "Carpet, Upholstery & Fabric Cleaning in Guyana",
    intro:
      "Fabric surfaces hold dust, grit, and stains that build up below the surface, even with regular vacuuming. CDCS Inc. provides carpet cleaning in Guyana and upholstery cleaning using hot-water extraction — the method most people call steam cleaning — to lift that embedded soil from office and home carpets, chairs, sofas, and vehicle interiors in Georgetown and across the country, refreshing the look and feel of the fabric.",
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
        a: "Many do, but not all. How much lifts depends on the fabric type, the type of stain, how long it has been there, any previous treatments, and the condition of the fibre. Set-in stains, dye transfer, and damage to the fibre itself may lighten rather than disappear. We pre-treat and give an honest read on what to expect before starting.",
      },
      {
        q: "Can you clean a whole office of chairs and carpeted areas?",
        a: "Yes. Multiple task and executive chairs, reception and waiting-area seating, and carpeted workspaces and conference rooms can be quoted together as a single commercial cleaning project, scheduled around your operating hours.",
      },
      {
        q: "Do you provide carpet and upholstery cleaning outside Georgetown?",
        a: "CDCS Inc. is based in Georgetown and takes on carpet and upholstery cleaning elsewhere in Guyana depending on the location, the size of the job, and the schedule. Contact us with the details.",
      },
    ],
    relatedSlugs: ["deep-cleaning", "commercial-janitorial-cleaning", "mobile-detailing"],
    keywords: [
      "carpet cleaning Guyana",
      "upholstery cleaning Guyana",
      "carpet cleaning services Guyana",
      "upholstery cleaning services Guyana",
      "steam cleaning services Guyana",
      "commercial carpet cleaning Guyana",
      "sofa cleaning Guyana",
    ],
  },
  {
    slug: "post-construction-cleaning",
    title: "Post-Construction Cleaning",
    shortDescription:
      "Final-stage cleaning that removes construction dust, debris, and residue to prepare spaces for occupancy.",
    category: "Commercial Cleaning",
    icon: "hardhat",
    heroPlaceholderLabel: "Photo placeholder — post-construction cleanup of a newly built space",
    metaTitle: "Post-Construction Cleaning Guyana | Final Cleaning | CDCS",
    seoTitleAbsolute: true,
    metaDescription:
      "Professional post-construction cleaning in Guyana for contractors, developers and property owners. Dust, debris and residue removal plus final handover cleaning.",
    h1: "Post-Construction Cleaning in Guyana",
    intro:
      "Newly built and renovated spaces need a thorough final clean before they are ready for occupancy. CDCS Inc. provides post-construction cleaning in Guyana for contractors, developers, and commercial property owners — clearing construction dust, debris, and adhesive and material residue from floors, fixtures, windows, and surfaces so a project can be handed over presentation-ready. CDCS is based in Georgetown and works on projects across the country depending on location, size, and requirements.",
    overview: [
      "Construction and fit-out work leaves fine dust on every surface and in every track and vent, plus adhesive, grout haze, paint spots, silicone, and sticker residue on glass and fixtures. Post-construction cleaning is the stage that turns a finished build into a space that's ready to hand over or move into.",
      "CDCS Inc. carries this out for construction companies, contractors, developers, and commercial property owners in Guyana on new offices, retail and restaurant fit-outs, and renovated commercial units. It is usually done as a rough clean after the trades leave and a detailed final clean once snagging is complete, though the exact scope depends on the condition of the site and the client's requirements.",
      "Where the exterior, walkways, or parking area also need attention, it's combined with pressure washing, and an incoming tenant's recurring janitorial program can start straight after handover.",
    ],
    idealFor: [
      "Construction companies handing over completed projects",
      "Contractors and fit-out firms",
      "Property developers and commercial property owners",
      "Businesses preparing new offices and premises",
      "Retail and restaurant fit-outs",
      "Renovated commercial facilities",
    ],
    whatsIncluded: [
      "Construction dust and fine debris removal from all surfaces",
      "Fine dust from ledges, tracks, window frames, and vents",
      "Floor cleaning and detailing to the installed finish",
      "Window, frame, and glass cleaning inside and out where accessible",
      "Adhesive, sticker, grout-haze, and paint-spot removal where it lifts without marking the finish",
      "Washroom and kitchen fittings and surfaces where part of the fit-out",
      "Final touch-up and detailing before occupancy or handover",
    ],
    relatedSlugs: ["deep-cleaning", "pressure-washing", "commercial-facility-cleaning"],
    faq: [
      {
        q: "When in the project should post-construction cleaning happen?",
        a: "It follows the trades. A rough clean can be done as sections are completed, the main detailed clean once construction and installation work is finished, and a final handover clean after snagging — so dust, debris, and residue are removed before the space is used.",
      },
      {
        q: "Do you work with contractors and property developers?",
        a: "Yes. CDCS Inc. works with construction companies, contractors, developers, and commercial property owners handing over completed offices, retail units, restaurant fit-outs, and renovated facilities in Guyana.",
      },
      {
        q: "Can you remove paint, adhesive, and grout haze from new surfaces?",
        a: "In most cases, yes — fresh adhesive, sticker residue, grout haze, and paint spots are part of the job. Where a mark cannot be removed without damaging the finish underneath, we say so rather than risk the surface.",
      },
      {
        q: "Do you cover projects outside Georgetown?",
        a: "CDCS Inc. is based in Georgetown and takes on post-construction projects elsewhere in Guyana depending on the location, the size of the project, and the schedule. Contact us with the details.",
      },
    ],
    keywords: [
      "post construction cleaning Guyana",
      "post-construction cleaning Guyana",
      "post construction cleaning services Guyana",
      "construction cleaning Guyana",
      "builders cleaning Guyana",
      "post renovation cleaning Guyana",
    ],
  },
  {
    slug: "commercial-facility-cleaning",
    title: "Commercial Facility Cleaning",
    shortDescription:
      "Custom cleaning programs for larger facilities requiring recurring teams, equipment, and structured schedules.",
    category: "Commercial Cleaning",
    icon: "factory",
    heroPlaceholderLabel: "Photo placeholder — cleaning team servicing a large commercial facility",
    metaTitle: "Commercial Facility Cleaning Programs in Guyana",
    metaDescription:
      "Custom, structured cleaning programs for larger commercial and industrial facilities in Guyana — multi-floor sites, warehouses, and multi-building operations, with recurring teams, equipment, and on-site supervision from CDCS Inc.",
    h1: "Commercial Facility Cleaning Programs",
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
      "Organizations managing large or multi-site cleaning contracts",
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
    keywords: ["facility cleaning Guyana", "industrial cleaning Guyana", "multi-site cleaning contract Guyana"],
  },
];

export function getServiceBySlug(slug: string) {
  return services.find((s) => s.slug === slug);
}
