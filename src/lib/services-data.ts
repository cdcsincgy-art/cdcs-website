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
  | "Carpet Cleaning"
  | "Extraction Cleaning";

/** A free-form body section on a service page (rendered after the overview). */
export interface ServiceSection {
  /** Anchor id for in-page links. */
  id?: string;
  eyebrow?: string;
  title: string;
  paragraphs?: string[];
  bullets?: string[];
  /** Titled sub-points, shown as a two-column grid. */
  items?: { title: string; text: string }[];
  /** Small-print caveat shown under the section (e.g. no-guarantee notes). */
  note?: string;
}

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
  /**
   * Who the page mainly sells to. Commercial pages lead with "Request a Site
   * Assessment"; consumer pages lead with "Get an Estimate" and WhatsApp.
   */
  audience?: "commercial" | "consumer";
  /** Estimator service id (src/lib/estimator-data.ts) for /estimate/?service= deep links. */
  estimateServiceId?: string;
  /**
   * Tail of a project-image file to use as the hero when no image is tagged
   * `heroForService` for this slug (see src/lib/project-images.ts).
   */
  heroImage?: string;
  /** Short benefit statements shown as a grid under the overview. */
  benefits?: { title: string; text: string }[];
  /** Additional body sections, in display order. */
  sections?: ServiceSection[];
  /** Equipment and capability points — only what CDCS actually uses. */
  equipment?: string[];
  /** "Why choose CDCS" points — supported facts only, no superlatives. */
  whyChoose?: string[];
  /** Industry ids from src/lib/content-data.ts, most relevant first. */
  industryIds?: string[];
  /**
   * Related authentic photos for pages without their own gallery yet. Image
   * file tails plus a heading and an honest description of what is shown.
   */
  relatedWork?: { images: string[]; title: string; description: string };
}

// Supported operating facts shared by the "Why choose CDCS" lists. Keep these
// to things the company can stand behind — no awards, certifications, staff
// counts, or years-of-experience claims beyond the 2022 founding date.
const companyBasis =
  "A registered Guyanese company, based in Georgetown and operating since 2022";
const writtenScope = "A written scope of work agreed before the first visit";
const supervised = "Supervised teams, with quality checks against the agreed scope";
const flexibleHours = "Scheduling around your operating hours, including evenings and weekends";
const honestAssessment = "An honest assessment up front of what the work can and cannot achieve";
const oneProvider =
  "Janitorial, carpet, upholstery, exterior, and fleet work coordinated through one provider";

export const services: ServiceDefinition[] = [
  {
    slug: "commercial-janitorial-cleaning",
    title: "Commercial & Janitorial Cleaning",
    shortDescription:
      "Recurring professional cleaning programs for offices, commercial facilities, institutions, and organizations.",
    category: "Commercial Cleaning",
    icon: "building",
    heroPlaceholderLabel: "Photo placeholder — office/janitorial cleaning crew in action",
    metaTitle: "Commercial Cleaning & Janitorial Services in Guyana | CDCS",
    seoTitleAbsolute: true,
    metaDescription:
      "Commercial cleaning and janitorial services in Georgetown and across Guyana for offices, government buildings, and institutions — written scopes, supervised teams, flexible hours.",
    ctaTitle: "Discuss Your Facility Requirements",
    audience: "commercial",
    estimateServiceId: "commercial-janitorial",
    h1: "Commercial Cleaning & Janitorial Services in Guyana",
    intro:
      "CDCS Inc. is a Georgetown-based cleaning company providing professional cleaning services in Guyana for offices, corporate buildings, banks, government offices, and institutions. We run structured, recurring janitorial programs built around your operating hours, foot traffic, and facility layout — from daily office cleaning to restroom and common-area upkeep — so your workplace stays consistently clean and presentable. Programs run daily, weekly, or on a custom schedule, and every team is supervised with regular quality checks.",
    overview: [
      "Commercial cleaning and janitorial service is the day-to-day upkeep that keeps a workplace presentable between deeper cleans: reception and entrance areas, open-plan and private offices, boardrooms, restrooms, kitchens and break rooms, corridors, stairwells, and shared equipment. CDCS Inc. runs these programs for businesses and public-sector offices in Georgetown and, by arrangement, elsewhere in Guyana.",
      "Most clients use a recurring schedule — daily, several times a week, or weekly — with the visit timed for early morning, evening, or another off-peak window so cleaning never gets in the way of staff or visitors. One-time and pre-event cleans are available too. Every program is assigned a briefed team and checked against an agreed scope so standards hold over the length of the contract.",
      "High-contact points — door handles, light switches, shared desks, lift buttons, and restroom fixtures — are part of every routine visit. Where a space needs more than routine attention, it can be paired with a deep clean, and newly fitted-out or renovated offices are handed over with post-construction cleaning first.",
      "Organizations choose CDCS Inc. as their professional commercial cleaning company because the service is delivered like a managed contract rather than an informal arrangement: a written scope of work, an assigned and supervised team, defined cleaning frequencies, and regular quality checks. CDCS Inc. is based in Georgetown and serves offices and commercial facilities across the greater Georgetown area, with service elsewhere in Guyana arranged around the site and schedule.",
    ],
    relatedSlugs: [
      "carpet-cleaning",
      "upholstery-fabric-extraction",
      "pressure-washing",
      "post-construction-cleaning",
      "deep-cleaning",
      "commercial-facility-cleaning",
    ],
    benefits: [
      {
        title: "A consistent standard",
        text: "The same scope, checked the same way, every visit — so the building looks the same on a Friday as it did on Monday.",
      },
      {
        title: "Less to manage in-house",
        text: "Staffing, relief cover, supplies planning, and supervision sit with CDCS, with one contact for changes.",
      },
      {
        title: "Work that fits your hours",
        text: "Visits are timed for early mornings, evenings, or other quiet windows so staff and visitors are not disrupted.",
      },
      {
        title: "Cleaner shared spaces",
        text: "High-contact points — handles, switches, lift buttons, shared desks, and restroom fixtures — are part of every routine visit.",
      },
    ],
    equipment: [
      "Vacuums, mops, and floor-care tools matched to each floor finish",
      "Cleaning products suited to each surface and area, including restrooms and kitchens",
      "Appropriate PPE for the environment",
      "Consumables and supply planning built into the programme where agreed",
      "Supervisor inspections and service records for each site",
      "Team size scaled from a single office to multi-floor and multi-site facilities",
    ],
    whyChoose: [companyBasis, writtenScope, supervised, flexibleHours, oneProvider],
    industryIds: [
      "corporate-offices",
      "government-public-sector",
      "commercial-properties",
      "retail",
      "oil-gas-support",
    ],
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
      {
        q: "Can you provide cleaning staff for recurring service?",
        a: "Yes. CDCS Inc. assigns a dedicated, briefed team to each recurring contract, with attendance tracked and relief staff arranged to cover absences so your schedule isn't disrupted.",
      },
      {
        q: "Do you provide site inspections?",
        a: "Yes. Before a program starts, CDCS Inc. reviews the facility — in person for larger sites, or by discussion for smaller requests — to confirm the scope, priorities, and schedule, and continues with regular supervisor inspections once the contract is running.",
      },
      {
        q: "Can CDCS mobilize for larger or multi-site facilities?",
        a: "Yes. Team size and equipment are scaled to the site — from a single office to a large multi-floor or multi-site facility — and mobilized according to what the project requires. Larger organizations are typically served through our commercial facility cleaning program.",
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
    slug: "carpet-cleaning",
    title: "Commercial Carpet Cleaning",
    shortDescription:
      "Hot-water extraction, spot and stain treatment, and scheduled maintenance for office, hotel, and public-building carpet.",
    category: "Carpet Cleaning",
    icon: "carpet",
    heroPlaceholderLabel: "Photo placeholder — commercial carpet extraction in an office or hotel corridor",
    heroImage: "upholstery-extraction-cleaning-wand",
    metaTitle: "Commercial Carpet Cleaning in Guyana | CDCS",
    seoTitleAbsolute: true,
    metaDescription:
      "Commercial carpet cleaning in Georgetown and across Guyana — hot-water extraction, stain treatment, odour control, and maintenance programmes for offices, hotels, and public buildings.",
    ctaTitle: "Request a Carpet Site Assessment",
    audience: "commercial",
    estimateServiceId: "carpet-cleaning",
    h1: "Commercial Carpet Cleaning in Guyana",
    intro:
      "CDCS Inc. provides commercial carpet cleaning in Guyana for offices, hotels, government buildings, and commercial properties. From our base in Georgetown, our teams assess the carpet, treat traffic lanes and spots, and remove embedded soil by hot-water extraction or a low-moisture method — chosen for the fibre, the level of soiling, and how quickly the area has to be back in use.",
    overview: [
      "Carpet in a busy building takes in far more than routine vacuuming removes. Grit tracked in from car parks and roads works down into the pile and wears the fibres; spills, body oils, and airborne dust bind to them; and in Guyana's humid climate, carpet that stays damp after a spill or a leak can start to smell. Over time traffic lanes grey out, and the carpet looks older than it is.",
      "Commercial carpet cleaning deals with that build-up in a controlled way: dry soil is removed first, spots and lanes are pre-treated according to what caused them, and the carpet is then cleaned and rinsed so that residue is not left behind to attract new soil. Done on a schedule, it keeps carpet presentable and helps it last longer before replacement.",
      "CDCS Inc. cleans carpet in offices and boardrooms, hotel corridors, guest rooms and function rooms, government and public-sector buildings, and the common areas of commercial properties in Georgetown and, by arrangement, elsewhere in Guyana. Work is usually booked for evenings, weekends, or another quiet window so spaces can dry before they are used again.",
    ],
    benefits: [
      {
        title: "Longer carpet life",
        text: "Removing abrasive grit and binding soil slows the fibre wear that makes traffic lanes look flattened and grey.",
      },
      {
        title: "Better presentation",
        text: "Reception areas, corridors, and meeting rooms are often the first thing a client or guest sees up close.",
      },
      {
        title: "Fresher indoor spaces",
        text: "Extraction lifts embedded dust and the residue behind many stale-carpet odours, with deodorizing available on request.",
      },
      {
        title: "Planned, not reactive",
        text: "A maintenance schedule spreads the cost across the year and avoids leaving carpet until it needs a heavy restorative clean.",
      },
    ],
    sections: [
      {
        id: "services",
        eyebrow: "What We Offer",
        title: "Our Commercial Carpet Cleaning Services",
        paragraphs: [
          "Each site is assessed before a method is chosen. Most commercial programmes combine more than one of the services below.",
        ],
        items: [
          {
            title: "Hot-water extraction",
            text: "A heated cleaning solution is applied to the carpet and immediately extracted with the soil it has loosened. It is the main method for deep cleaning and for carpet that has not been professionally cleaned in some time.",
          },
          {
            title: "Low-moisture maintenance",
            text: "Where the fibre, the soiling, and the schedule suit it, a low-moisture method cleans the upper pile with much shorter drying times — useful between full extraction cleans in areas that must reopen quickly.",
          },
          {
            title: "Spot and stain treatment",
            text: "Marks are identified by likely cause and treated with a matching product and dwell time, rather than one general-purpose spotter for everything.",
          },
          {
            title: "Interim maintenance",
            text: "Periodic cleaning of entrances, traffic lanes, and other high-use zones between full cleans, so heavy areas do not fall behind the rest of the floor.",
          },
          {
            title: "Deep restorative cleaning",
            text: "A more intensive pre-treatment, agitation, and extraction process for heavily soiled or neglected carpet, often as the first visit before a maintenance schedule begins.",
          },
          {
            title: "Odour treatment and deodorizing",
            text: "Odour-causing residue is removed by extraction first; deodorizing or a light fragrance treatment can then be applied where the client wants it.",
          },
          {
            title: "Scheduled maintenance programmes",
            text: "Agreed frequencies for each zone — entrances, corridors, offices, rooms — with the work timed around occupancy and recorded on each visit.",
          },
          {
            title: "Office, hotel, and public-building carpet",
            text: "Office floors and boardrooms, hotel corridors, guest rooms and function spaces, and government and institutional buildings with heavy daily foot traffic.",
          },
        ],
      },
      {
        id: "stain-treatment",
        eyebrow: "Spots & Stains",
        title: "Stain and Spot Treatment",
        paragraphs: [
          "Stains are not all the same, and the product that lifts one can set another. Before treatment, our team looks at what the mark is likely to be — water-based spills, oil and grease, protein-based soiling, tannins from coffee and tea, rust, or dye — and at the fibre underneath. Where there is any doubt about colourfastness, a discreet test area is checked first.",
          "Treatment is then matched to the stain, given time to work, and rinsed out during extraction so no sticky residue is left to attract new soil. Stubborn spots may need more than one pass.",
        ],
        note: "Stain removal cannot be guaranteed. Results depend on the fibre type, the chemistry of the stain, how old it is, any earlier treatment or home remedy, contamination in the carpet, and its overall condition. Some marks — dye transfer, bleach spots, burns, and permanent discolouration — may lighten rather than disappear. We tell you what to realistically expect before work begins.",
      },
      {
        id: "extraction",
        eyebrow: "Method",
        title: "Carpet Extraction and Rinsing",
        paragraphs: [
          "Extraction cleaning works best on carpet that has been properly prepared. Dry soil is vacuumed out first, because loose grit turns to mud once water is added. Traffic lanes and soiled areas are then pre-sprayed and, where appropriate, agitated so the solution can reach the soil bound to the fibres.",
          "The extraction pass applies a heated cleaning solution and draws it straight back out, together with the loosened soil. A rinse pass helps remove remaining detergent — residue left in carpet is one of the main reasons it re-soils quickly after a poor clean.",
          "Over-wetting is avoided. Carpet is left damp rather than soaked, which matters in a humid climate where slow drying can lead to odour or damage to the backing. Drying time depends on the carpet, airflow, and humidity on the day; ventilation and air-conditioning help, and we give clear guidance on when the area can be walked on and furniture returned.",
        ],
      },
      {
        id: "maintenance-programmes",
        eyebrow: "Ongoing Care",
        title: "Commercial Carpet Maintenance Programmes",
        paragraphs: [
          "For most commercial buildings, the most cost-effective approach is a programme rather than an occasional emergency clean. A programme sets how often each zone is cleaned and by which method, based on traffic and how the space is used.",
        ],
        bullets: [
          "Daily or routine vacuuming, often handled within a janitorial contract",
          "Spot treatment as marks appear, before they set",
          "Interim cleaning of entrances and traffic lanes on a monthly or quarterly cycle",
          "Full extraction cleaning at intervals set for each area",
          "Work timed for evenings, weekends, or low-occupancy periods",
          "A record of what was cleaned on each visit, and anything that needs attention",
        ],
        note: "Frequencies are set per site after an assessment. Our guide to commercial carpet and upholstery cleaning frequency explains the usual starting points.",
      },
      {
        id: "settings",
        eyebrow: "Where We Work",
        title: "Carpet Cleaning for Different Commercial Settings",
        items: [
          {
            title: "Hotel carpet cleaning",
            text: "Corridors, guest rooms, lobbies, and function rooms, scheduled room-by-room or floor-by-floor around occupancy and events so rooms can be returned to service in an orderly way.",
          },
          {
            title: "Office carpet cleaning",
            text: "Open-plan floors, private offices, boardrooms, and reception areas, typically cleaned after hours or over a weekend, and often alongside office-chair cleaning.",
          },
          {
            title: "Government facility carpet cleaning",
            text: "Ministries, agencies, and public buildings with heavy daily foot traffic, scoped against a written specification with access and security arrangements agreed in advance.",
          },
          {
            title: "High-traffic commercial carpet",
            text: "Entrances, corridors, lift lobbies, and shared areas in commercial properties, where interim cleaning of traffic lanes keeps the floor consistent between full cleans.",
          },
        ],
      },
    ],
    idealFor: [
      "Hotels and guest accommodation",
      "Corporate offices and boardrooms",
      "Government and public-sector buildings",
      "Conference and function rooms",
      "Commercial property common areas",
      "Schools and training centres",
    ],
    whatsIncluded: [
      "Site assessment of carpet type, condition, and soiling",
      "Dry-soil removal by vacuuming before wet cleaning",
      "Pre-treatment of traffic lanes and spot-specific stain treatment",
      "Hot-water extraction or low-moisture cleaning, matched to the carpet",
      "Rinsing to reduce detergent residue and re-soiling",
      "Odour treatment and optional deodorizing",
      "Drying, re-entry, and furniture-return guidance",
      "One-time cleans or a scheduled maintenance programme",
    ],
    process: [
      "Assess — we look at the carpet construction, fibre, condition, traffic patterns, staining, and the times the area can be closed",
      "Test and pre-treat — colourfastness is checked where needed, traffic lanes are pre-sprayed, and spots are treated according to their likely cause",
      "Clean — dry soil is vacuumed out, the carpet is agitated where appropriate, then cleaned by extraction or a low-moisture method",
      "Rinse and finish — remaining residue is rinsed out, the pile is groomed, and deodorizing is applied if requested",
      "Inspect and hand back — a walk-through with drying guidance, noting any marks that did not respond to treatment",
    ],
    equipment: [
      "Hot-water extraction equipment with floor and upholstery tools",
      "Pre-spray and spot-treatment products selected by stain type",
      "Vacuuming for dry-soil removal before any wet cleaning",
      "Low-moisture cleaning methods where the carpet and schedule suit",
      "Deodorizing treatments where requested",
      "Safety-conscious working practices in occupied buildings",
    ],
    whyChoose: [
      companyBasis,
      "Carpet assessed before a method is chosen — not one process for every floor",
      honestAssessment,
      flexibleHours,
      supervised,
      "Carpet care that fits alongside your janitorial and upholstery cleaning",
    ],
    industryIds: [
      "hotels-hospitality",
      "corporate-offices",
      "government-public-sector",
      "commercial-properties",
    ],
    relatedWork: {
      images: [
        "upholstery-extraction-seat-cleaned",
        "mobile-detailing-vehicle-interior-seats-out",
        "mobile-detailing-vehicle-interior-cleaned",
      ],
      title: "Related CDCS Extraction Work",
      description:
        "Real CDCS Inc. jobs using the same hot-water extraction approach on fabric and vehicle interiors. Commercial carpet project photos will be added here as projects are documented.",
    },
    faq: [
      {
        q: "What method do you use for commercial carpet cleaning?",
        a: "Most commercial carpet is cleaned by hot-water extraction, after vacuuming and pre-treatment. Where the fibre and the schedule suit it, a low-moisture method is used for maintenance cleans between full extractions because it dries faster. The method is chosen after we have seen the carpet.",
      },
      {
        q: "Will all the stains come out?",
        a: "Many do, but no honest provider can guarantee it. Results depend on the fibre, the stain chemistry, its age, any earlier treatment, contamination, and the carpet's condition. Dye transfer, bleach spots, burns, and permanent discolouration may only lighten. We assess the marks and tell you what to expect before starting.",
      },
      {
        q: "How long does carpet take to dry after cleaning?",
        a: "Carpet is left damp rather than wet. After hot-water extraction it usually dries within several hours, depending on the carpet, airflow, and humidity; low-moisture cleaning dries faster. We give re-entry and furniture guidance on the day and schedule around it.",
      },
      {
        q: "Can you clean carpet in a hotel or office that stays open?",
        a: "Yes. Work is planned room-by-room, floor-by-floor, or zone-by-zone, and timed for evenings, weekends, or low-occupancy periods so the building can keep operating.",
      },
      {
        q: "How often should commercial carpet be professionally cleaned?",
        a: "It depends on traffic and use. Entrances and main corridors usually need interim cleaning far more often than private offices or meeting rooms. We set a frequency for each zone after an assessment — our guide to carpet and upholstery cleaning frequency covers typical starting points.",
      },
      {
        q: "Do you treat carpet odours?",
        a: "Yes. Most carpet odour comes from residue in the fibres and backing, so it is addressed by extraction first, with deodorizing or a light fragrance treatment afterwards if you want it. Odour caused by a persistent leak or damage to the subfloor needs the source fixed first.",
      },
      {
        q: "Do you offer carpet maintenance contracts?",
        a: "Yes. A maintenance programme sets the method and frequency for each area, with visits scheduled around your operation. It can run on its own or alongside a CDCS janitorial contract.",
      },
      {
        q: "Do you clean carpet outside Georgetown?",
        a: "CDCS Inc. is based in Georgetown and serves the greater Georgetown area and Demerara-Mahaica. Carpet cleaning elsewhere in Guyana can be arranged depending on the size of the job and the schedule.",
      },
    ],
    relatedSlugs: ["upholstery-fabric-extraction", "commercial-janitorial-cleaning", "deep-cleaning"],
    keywords: [
      "commercial carpet cleaning Guyana",
      "carpet cleaning Georgetown Guyana",
      "carpet cleaning Guyana",
      "hotel carpet cleaning Guyana",
      "office carpet cleaning Georgetown",
      "carpet extraction Guyana",
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
    metaTitle: "Commercial Pressure Washing in Guyana | CDCS",
    seoTitleAbsolute: true,
    metaDescription:
      "Commercial pressure washing in Georgetown and across Guyana for building exteriors, concrete, walkways, parking areas, walls, and yards. Surface-matched pressure and site assessments by CDCS Inc.",
    ctaTitle: "Request a Pressure Washing Site Assessment",
    audience: "commercial",
    estimateServiceId: "pressure-washing",
    h1: "Commercial Pressure Washing in Guyana",
    benefits: [
      {
        title: "A maintained frontage",
        text: "Clean entrances, walls, and walkways tell customers and visitors the property is looked after.",
      },
      {
        title: "Safer walkways",
        text: "Removing algae, moss, and slick grime from walkways, steps, and ramps reduces slippery surfaces.",
      },
      {
        title: "Surfaces that last",
        text: "Clearing organic growth and staining regularly is gentler on concrete, paint, and masonry than leaving it to build up.",
      },
      {
        title: "Minimal disruption",
        text: "Work is sequenced so entrances and parking stay usable, and timed around your business hours.",
      },
    ],
    equipment: [
      "Commercial pressure washers with adjustable pressure and interchangeable nozzles",
      "Rotary surface cleaners for even results on concrete slabs and walkways",
      "Pre-treatment for oil, grease, algae, and organic growth",
      "Ladders for low-rise exterior walls, eaves, and windows",
      "Test areas on painted or delicate finishes before full washing",
    ],
    whyChoose: [companyBasis, "Pressure and method matched to each surface", flexibleHours, honestAssessment, oneProvider],
    industryIds: ["commercial-properties", "retail", "hotels-hospitality", "logistics-transport", "industrial-facilities"],
    intro:
      "First impressions start outside. CDCS Inc. provides professional pressure washing services in Guyana for businesses, property owners, and organizations — clearing dirt, algae, oil staining, and grime from building exteriors, walkways, parking areas, walls, and compounds so a property looks clean and well maintained to staff, customers, and visitors. Based in Georgetown, CDCS covers commercial, residential, and institutional exterior cleaning across the country where operationally feasible.",
    overview: [
      "In Guyana's climate, exterior surfaces pick up algae, moss, mold, and traffic grime quickly, and a tired-looking frontage is the first thing customers and visitors notice. Commercial pressure washing clears that build-up from concrete, pavers, block and masonry, painted walls, signage surrounds, and glass-adjacent areas, bringing a property back to a maintained appearance.",
      "CDCS Inc. handles pressure washing for shopfronts and office entrances, parking areas and walkways, warehouse aprons and loading docks, boundary walls, and compound areas around Georgetown. Water pressure and nozzle choice are matched to each surface so cleaning is effective without damaging the substrate, and oil or grease staining on driveways and bays is treated as part of the job.",
      "Pressure washing is booked as a one-time refresh or on a recurring schedule — quarterly or twice a year is common for high-traffic frontages. It also pairs naturally with an interior cleaning program and with the final clean-down after construction or renovation work.",
    ],
    relatedSlugs: ["commercial-facility-cleaning", "post-construction-cleaning", "fleet-washing", "commercial-janitorial-cleaning"],
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
      {
        q: "Will pressure washing damage paint or masonry?",
        a: "It should not when it is done properly. Pressure and nozzle are set for each surface, painted and delicate finishes are tested first, and lower pressure with pre-treatment is used where a surface cannot take a strong jet. Paint that is already flaking or failing may lift, and we point that out before starting.",
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
    title: "Mobile Vehicle Detailing",
    shortDescription:
      "Professional vehicle cleaning and detailing delivered to your home, office, business, or fleet location.",
    category: "Mobile Detailing",
    icon: "car",
    heroPlaceholderLabel: "Photo placeholder — mobile detailing technician working on a vehicle interior",
    metaTitle: "Mobile Car Detailing in Guyana | We Come to You | CDCS",
    seoTitleAbsolute: true,
    metaDescription:
      "Professional mobile car detailing in Guyana at your home, office or business. Interior and exterior vehicle detailing and extraction cleaning by CDCS Inc.",
    ctaTitle: "Book a Mobile Detail",
    audience: "consumer",
    estimateServiceId: "mobile-detailing",
    h1: "Mobile Car Detailing in Guyana",
    benefits: [
      {
        title: "No trip to a shop",
        text: "The vehicle is detailed where it is parked, so you do not lose half a day dropping it off and collecting it.",
      },
      {
        title: "Inside and out",
        text: "Exterior wash and finish, wheels and glass, plus a full interior clean in one visit.",
      },
      {
        title: "Fabric that is actually clean",
        text: "Stained seats, carpets, and mats can be hot-water extracted rather than just vacuumed.",
      },
      {
        title: "Add what you need",
        text: "Engine-bay cleaning, headlight restoration, buffing and polishing, and odour treatment are available as add-ons.",
      },
    ],
    equipment: [
      "Team arrives with water, power, and equipment for on-site work",
      "Hot-water extraction for seats, carpets, and mats",
      "Buffing and polishing equipment for paintwork",
      "Headlight restoration and engine-bay cleaning where selected",
      "Interior-safe products for dashboards, consoles, and door cards",
    ],
    whyChoose: [
      companyBasis,
      "Mobile service at your home, office, or business in Georgetown",
      "Clear pricing — get a preliminary figure from the online estimator",
      honestAssessment,
      "Easy to book by phone or WhatsApp",
    ],
    industryIds: ["residential", "corporate-offices"],
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
      "Optional interior fabric extraction (see Upholstery & Office Chair Cleaning)",
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
    relatedSlugs: ["upholstery-fabric-extraction", "car-wash-mobile-vehicle-washing", "fleet-washing"],
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
    title: "Fleet & Heavy Equipment Washing",
    shortDescription:
      "On-site washing for trucks, prime movers, trailers, and heavy equipment — scheduled programmes or one-time washes.",
    category: "Fleet Washing",
    icon: "truck",
    heroPlaceholderLabel: "Photo placeholder — fleet washing trucks or commercial vehicles on-site",
    metaTitle: "Fleet Washing & Heavy Equipment Cleaning in Guyana | CDCS",
    seoTitleAbsolute: true,
    metaDescription:
      "On-site fleet washing and heavy equipment cleaning in Guyana for trucks, prime movers, trailers, and construction machinery. Scheduled programmes at your depot or yard from CDCS Inc.",
    ctaTitle: "Request a Fleet Washing Assessment",
    audience: "commercial",
    estimateServiceId: "fleet-washing",
    h1: "Fleet Washing & Heavy Equipment Cleaning in Guyana",
    intro:
      "A clean fleet reflects a well-run operation. CDCS Inc. provides on-site fleet washing in Guyana for trucks, prime movers, trailers, commercial vehicles, and heavy equipment — scheduled washing programmes and one-time washes carried out at your depot, yard, or work site, so transport, logistics, construction, and energy-sector support companies keep a professional appearance and can inspect their vehicles easily. CDCS is based in Georgetown and takes on fleet work across the country depending on fleet size, location, and operating requirements.",
    benefits: [
      {
        title: "Vehicles stay on site",
        text: "The wash comes to your yard, so drivers and vehicles are not tied up travelling to a wash bay one at a time.",
      },
      {
        title: "Easier inspections",
        text: "Mud, dust, and road film hide damage and leaks. Clean bodywork, chassis, and equipment are easier to check.",
      },
      {
        title: "A fleet that represents you",
        text: "Branded trucks and service vehicles are seen by clients and the public every day.",
      },
      {
        title: "Built around dispatch",
        text: "Washing is timed around loading, delivery runs, and shift changes, scaled to the size of the fleet.",
      },
    ],
    sections: [
      {
        id: "heavy-equipment",
        eyebrow: "Heavy Equipment",
        title: "Heavy Equipment Washing and Cab Cleaning",
        paragraphs: [
          "Construction and yard equipment works in mud, dust, and debris, and much of it is never close to a wash bay. CDCS Inc. washes heavy equipment on site where safe access is available and water run-off can be managed — the same mobile approach used for truck fleets.",
          "Exterior washing removes caked mud, dust, and general soiling from bodywork, tracks or wheels, buckets, and attachments. Operator cabs can be cleaned inside as well: floors and mats, seats, controls, glass, and interior surfaces, where dust and debris build up quickly on an active site.",
        ],
        bullets: [
          "Excavators, loaders, and similar construction machinery",
          "Lifting equipment and yard machinery",
          "Operator cab interiors — floors, seats, controls, and glass",
          "Trailers, flatbeds, and low-beds",
          "Work carried out with machines shut down and the operator's site rules followed",
          "Heavy grease and caked deposits treated where agreed in the scope",
        ],
        note: "Washing removes normal soiling. It does not repair corrosion, oxidised paint, or permanent staining, and engine or hydraulic-component degreasing is only carried out where it has been specifically agreed.",
      },
    ],
    equipment: [
      "Pressure-washing equipment for on-site truck, trailer, and machinery washing",
      "Foam application for pre-wash dwell time on cabs, chassis, and wheels",
      "Hand-detailing tools for cab fronts, grilles, glass, and trim",
      "High-visibility PPE for work in active yards and industrial sites",
      "Interior cleaning for truck and machine operator cabs",
    ],
    whyChoose: [
      companyBasis,
      "On-site washing at your depot, yard, or work site",
      "Recurring programmes scaled to fleet size and dispatch patterns",
      "Site safety rules, inductions, and access arrangements confirmed in advance",
      honestAssessment,
    ],
    industryIds: ["logistics-transport", "oil-gas-support", "construction", "industrial-facilities"],
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
    relatedSlugs: ["mobile-detailing", "car-wash-mobile-vehicle-washing", "pressure-washing"],
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
    ctaTitle: "Book a Vehicle Wash",
    audience: "consumer",
    estimateServiceId: "interior-exterior-wash",
    industryIds: ["residential", "corporate-offices"],
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
    title: "Residential & Commercial Deep Cleaning",
    shortDescription:
      "Intensive one-time cleaning for homes, rentals, and offices that need far more attention than a routine clean.",
    category: "Deep Cleaning",
    icon: "sparkle",
    heroPlaceholderLabel: "Photo placeholder — deep cleaning of a commercial or residential space",
    metaTitle: "Deep Cleaning Services in Guyana | Homes & Businesses | CDCS",
    seoTitleAbsolute: true,
    metaDescription:
      "Residential and commercial deep cleaning in Georgetown and across Guyana — move-in and move-out cleans, rental turnovers, kitchens, bathrooms, floors, and fixtures by CDCS Inc.",
    ctaTitle: "Book a Deep Clean",
    audience: "consumer",
    estimateServiceId: "deep-cleaning",
    h1: "Deep Cleaning for Homes & Businesses in Guyana",
    benefits: [
      {
        title: "A genuine reset",
        text: "Reaches built-up grime, grout, vents, ledges, and fittings that routine cleaning has no time for.",
      },
      {
        title: "Ready for the next stage",
        text: "Hand over a rental, move into a new home, or prepare for an inspection, guests, or an event.",
      },
      {
        title: "A clean baseline",
        text: "Start a recurring cleaning arrangement from a genuinely clean property instead of catching up over several visits.",
      },
      {
        title: "One team, one visit",
        text: "Kitchens, bathrooms, floors, and general areas handled together, with fabric and exterior work added if needed.",
      },
    ],
    sections: [
      {
        id: "residential",
        eyebrow: "For Homes",
        title: "Residential Deep Cleaning in Georgetown",
        paragraphs: [
          "For homeowners, tenants, landlords, and property managers, a residential deep clean brings a house or apartment back to a properly clean standard in one organized visit. It is a step above regular housekeeping: kitchens are degreased, bathrooms are scrubbed and detailed, and the edges, ledges, and fittings that collect dust are cleaned rather than skipped.",
        ],
        items: [
          {
            title: "Move-in and move-out cleaning",
            text: "Empty-property cleans for tenants handing back keys and owners preparing for new occupants, including cupboards and appliance exteriors.",
          },
          {
            title: "Rental and short-stay turnovers",
            text: "Deep cleans between tenancies or as a periodic reset for furnished rentals and short-stay apartments.",
          },
          {
            title: "Before guests, events, or a sale",
            text: "A thorough clean timed ahead of visitors, an occasion, or viewings so the property presents well.",
          },
          {
            title: "After renovation work",
            text: "Light renovation dust and residue can be handled in a deep clean; heavier building work is better scoped as post-construction cleaning.",
          },
        ],
        note: "Sofas and upholstered chairs can be added with upholstery extraction, and yards, driveways, and exterior walls with pressure washing.",
      },
    ],
    equipment: [
      "Degreasing products for kitchens and suitable cleaners for bathrooms and tile",
      "Grout and tile detailing",
      "Vacuums and floor-care tools matched to the floor finish",
      "Ladders for high ledges, vents, and fittings",
      "Hot-water extraction available for fabric as an add-on",
    ],
    whyChoose: [
      companyBasis,
      "A clear checklist agreed before the clean, checked in a final walk-through",
      honestAssessment,
      "Preliminary pricing available through the online estimator",
      "Easy to book by phone or WhatsApp",
    ],
    industryIds: ["residential", "corporate-offices", "commercial-properties", "hotels-hospitality"],
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
    relatedSlugs: ["commercial-janitorial-cleaning", "post-construction-cleaning", "upholstery-fabric-extraction", "carpet-cleaning"],
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
    title: "Upholstery & Office Chair Cleaning",
    shortDescription:
      "Hot-water extraction — often called steam cleaning — for office chairs, boardroom and reception seating, sofas, and vehicle seats.",
    category: "Extraction Cleaning",
    icon: "chair",
    heroPlaceholderLabel: "Photo placeholder — extraction cleaning of an office chair",
    metaTitle: "Upholstery & Office Chair Cleaning in Guyana | CDCS",
    seoTitleAbsolute: true,
    metaDescription:
      "Office chair and upholstery cleaning in Guyana by hot-water extraction — task and executive chairs, boardroom and reception seating, sofas, and vehicle seats. Georgetown-based CDCS Inc.",
    ctaTitle: "Request an Upholstery Cleaning Quote",
    audience: "commercial",
    estimateServiceId: "upholstery-extraction",
    h1: "Upholstery & Office Chair Cleaning in Guyana",
    intro:
      "Fabric seating holds dust, body oils, spills, and stains that vacuuming cannot reach. CDCS Inc. provides upholstery cleaning and office chair cleaning in Guyana using hot-water extraction — the method most people call steam cleaning — for task and executive chairs, boardroom and reception seating, sofas, hospitality furniture, and vehicle seats, in Georgetown and across the country.",
    overview: [
      "Hot-water extraction works in two steps: a heated cleaning solution is worked into the fabric to loosen dirt, oils, and residue, then a machine immediately draws the solution back out along with the soil it has lifted. It reaches well below the surface, which is why it is used for fabric that vacuuming and spot-cleaning cannot revive. \"Steam cleaning\" is the everyday name for the same process.",
      "For offices, the most common request is a full set of task, executive, and meeting-room chairs that have picked up years of daily use — often booked together with the carpet. CDCS Inc. also cleans reception and waiting-area seating, sofas and lounge furniture, hotel and event seating, and car and vehicle seats.",
      "Fabric is inspected first for material and stain type, visible marks are pre-treated, and the extraction pass follows. Upholstery is left damp rather than wet and usually dries within a few hours depending on airflow and humidity — booking an evening or a quieter day keeps disruption low.",
    ],
    benefits: [
      {
        title: "Fresher seating",
        text: "Extraction lifts embedded soil, body oils, and the residue behind stale odours from chair seats and backs.",
      },
      {
        title: "A consistent look",
        text: "Cleaning a whole set of chairs at once removes the patchwork of stained and clean seats across an office or boardroom.",
      },
      {
        title: "Longer furniture life",
        text: "Regular cleaning removes the grit and oils that wear fabric, delaying re-upholstery or replacement.",
      },
      {
        title: "On site, out of hours",
        text: "Chairs are cleaned where they are, typically after hours, so there is no collection or downtime.",
      },
    ],
    sections: [
      {
        id: "office-chairs",
        eyebrow: "For Offices & Institutions",
        title: "Office Chair Cleaning Programmes",
        paragraphs: [
          "A typical office-chair job covers every fabric chair on a floor or in a building in one scheduled visit: task chairs at workstations, executive chairs, boardroom and meeting-room seating, and reception and waiting-area chairs. Larger organizations and government offices often schedule it once or twice a year, alongside commercial carpet cleaning.",
          "Different seating needs different handling. Fabric seats and backs are extraction-cleaned; mesh backs are cleaned with care for the frame and tension; leather and vinyl are not extraction-cleaned and need a gentler, low-moisture approach. Tell us the materials when you request a quote and we will confirm what is suitable.",
        ],
        bullets: [
          "Task, executive, and meeting-room chairs",
          "Reception, lobby, and waiting-area seating",
          "Boardroom and conference seating",
          "Lounge sofas and staff-room furniture",
          "Hotel, restaurant, and banquet seating",
          "Car and vehicle seats",
        ],
        note: "Stain removal cannot be guaranteed. Results depend on the fabric, the stain chemistry and age, any earlier treatment, and the condition of the fibre. Dye transfer, ink, and set-in marks may lighten rather than disappear.",
      },
    ],
    equipment: [
      "Hot-water extraction equipment with upholstery tools",
      "Pre-treatment and spot products chosen for the fabric and stain type",
      "Colourfastness checks before cleaning where needed",
      "Deodorizing treatment where requested",
      "Drying guidance so seating returns to use quickly",
    ],
    whyChoose: [
      companyBasis,
      "Whole sets of office chairs cleaned in one scheduled visit",
      honestAssessment,
      flexibleHours,
      "Upholstery and carpet cleaning coordinated together",
    ],
    industryIds: ["corporate-offices", "government-public-sector", "hotels-hospitality", "residential"],
    idealFor: [
      "Corporate offices and boardrooms",
      "Government and public-sector offices",
      "Reception, lobby, and waiting areas",
      "Hotels, restaurants, and event venues",
      "Homes — sofas and upholstered chairs",
      "Vehicle seats and interiors",
    ],
    whatsIncluded: [
      "Pre-inspection of fabric type, wear, and staining",
      "Pre-treatment of visible marks and heavily used areas",
      "Hot-water extraction (steam cleaning) of fabric seating",
      "Office task, executive, meeting-room, and reception chairs",
      "Sofas, lounge seating, and upholstered furniture",
      "Vehicle seat extraction",
      "Deodorizing and spot/stain treatment where the fabric allows",
    ],
    process: [
      "We inspect each type of seating for material, colourfastness, wear, and stain type",
      "Visible marks and heavily used areas are pre-treated to loosen soil",
      "Hot solution is worked into the fabric and immediately extracted with the loosened dirt",
      "We check the result, treat any remaining spots, and leave drying guidance",
    ],
    faq: [
      {
        q: "Do you clean carpets as well as upholstery?",
        a: "Yes. Carpet is covered by our dedicated commercial carpet cleaning service, and the two are often booked together — chairs and carpet in the same office, cleaned in one scheduled visit.",
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
    relatedSlugs: ["carpet-cleaning", "commercial-janitorial-cleaning", "mobile-detailing", "deep-cleaning"],
    keywords: [
      "upholstery cleaning Guyana",
      "office chair cleaning Guyana",
      "upholstery cleaning services Guyana",
      "steam cleaning services Guyana",
      "sofa cleaning Guyana",
      "chair cleaning Georgetown",
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
    ctaTitle: "Request a Site Inspection",
    audience: "commercial",
    estimateServiceId: "post-construction",
    h1: "Post-Construction Cleaning in Guyana",
    benefits: [
      {
        title: "Handover-ready spaces",
        text: "Dust, debris, and residue are cleared so the project presents properly at inspection and handover.",
      },
      {
        title: "Protects new finishes",
        text: "Residue is removed with methods suited to each new surface, rather than scraped off and risking damage.",
      },
      {
        title: "Fits the build programme",
        text: "Rough, detailed, and final cleans are timed to the trades and the handover date.",
      },
      {
        title: "A clean start for occupants",
        text: "Incoming tenants move into a space that is ready to use, and a recurring janitorial programme can start straight away.",
      },
    ],
    equipment: [
      "Vacuums and floor-care tools for fine construction dust",
      "Residue removal suited to glass, tile, and new finishes",
      "Ladders for frames, ledges, and glass where accessible",
      "Pressure washing for exteriors, walkways, and compounds where included",
      "Appropriate PPE for active and recently completed sites",
    ],
    whyChoose: [companyBasis, writtenScope, "Cleaning staged to the build programme and handover date", honestAssessment, oneProvider],
    industryIds: ["construction", "commercial-properties", "corporate-offices", "retail"],
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
    ctaTitle: "Discuss Your Facility Requirements",
    audience: "commercial",
    estimateServiceId: "commercial-facility",
    whyChoose: [companyBasis, writtenScope, supervised, "Teams assigned to the site so they learn its layout and requirements", oneProvider],
    industryIds: ["industrial-facilities", "government-public-sector", "oil-gas-support", "commercial-properties"],
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
