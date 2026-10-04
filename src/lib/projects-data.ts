// CDCS project / case-study pages (/projects/ and /projects/<slug>/).
//
// Add a project by adding one object to `projects`. Only `status: "published"`
// entries get a page, a card on /projects/, a sitemap entry, and links from
// service pages. A "draft" entry is a placeholder for a case study CDCS has
// delivered but not yet documented — it is never rendered, and its
// `missing` list says what is needed before it can be published.
//
// Content rules (same as the photo captions in project-images.ts):
// - Describe only what the photos show or what CDCS has confirmed in writing.
// - No client names, contract values, dates, staff counts, or measured
//   results unless the client has approved them and CDCS can evidence them.
// - Describe the client by sector ("a hotel in Georgetown"), not by name.

export interface ProjectDefinition {
  slug: string;
  status: "published" | "draft";
  /** Card title and H1. */
  title: string;
  metaTitle: string;
  metaDescription: string;
  /** Short label shown on cards, e.g. "Fleet & Heavy Equipment Washing". */
  serviceCategory: string;
  /** Related service slugs, primary service first. */
  serviceSlugs: string[];
  /** Only as specific as CDCS can confirm — "Guyana" unless a town is confirmed. */
  location: string;
  /** Client type or sector, never a client name. */
  clientType: string;
  /** Industry ids from content-data.ts. */
  industryIds: string[];
  summary: string;
  scope: string[];
  challenge?: string;
  approach?: string;
  methodology?: string[];
  execution?: string;
  result?: string;
  /** Tails of project-image file paths (see projectImageByFile). First is the hero. */
  images: string[];
  /** How the details on the page were sourced — shown on the page. */
  evidenceNote: string;
  /** Drafts only: the information or photos needed before publishing. */
  missing?: string[];
}

export const projects: ProjectDefinition[] = [
  {
    slug: "fleet-heavy-equipment-washing-guyana",
    status: "published",
    title: "Fleet and Heavy Equipment Washing — Guyana",
    metaTitle: "Fleet & Heavy Equipment Washing Project in Guyana | CDCS",
    metaDescription:
      "Photos and method from CDCS on-site fleet washing in Guyana — prime movers, truck cabs, trailers, lifting equipment, and an excavator operator cab, washed at the client's yard or site.",
    serviceCategory: "Fleet & Heavy Equipment Washing",
    serviceSlugs: ["fleet-washing", "pressure-washing", "mobile-detailing"],
    location: "Guyana",
    clientType: "Transport, logistics, and heavy-equipment operators",
    industryIds: ["logistics-transport", "construction", "oil-gas-support", "industrial-facilities"],
    summary:
      "On-site washing of commercial trucks, prime movers, trailers, lifting equipment, and machinery at operators' yards and work sites in Guyana — the vehicles were washed where they were parked rather than driven to a wash bay.",
    scope: [
      "Exterior washing of prime movers and truck cabs at a gravel fleet yard",
      "Foam pre-wash and rinsing of cabs, chassis, wheels, and trailer decks",
      "Hand cleaning of cab fronts, grilles, and glass",
      "Washing of a trailer and lifting equipment at an industrial yard",
      "Interior cleaning of an excavator operator cab",
    ],
    challenge:
      "Vehicles and machines working on unpaved yards, roads, and construction sites collect mud, dust, and road film on cabs, chassis, wheels, and trailer decks, and operator cabs gather dust and debris on floors, controls, and glass. Bringing each unit to a wash bay takes it out of service; the work had to be done in the yards and on the sites where the equipment is kept.",
    approach:
      "CDCS brought the washing to the vehicles. Units were washed in place at the yard, with cleaning foam applied first to loosen soiling, followed by rinsing and hand detailing of the cab fronts. Team members on the industrial site worked in high-visibility vests.",
    methodology: [
      "Foam pre-wash applied to cabs, chassis, and wheels for dwell time",
      "Pressure rinse of bodywork, wheels, and trailer decks",
      "Hand cleaning of cab fronts, grilles, and glass",
      "High-visibility PPE on active yards and industrial sites",
      "Interior cleaning of machine operator cabs",
    ],
    execution:
      "Washing was carried out on the yard surfaces where the fleet is parked, with hoses, cleaning products, and hand tools set out beside the vehicles.",
    result:
      "The fleet and equipment were washed without leaving the operators' premises. For an ongoing arrangement, the same approach is run as a scheduled fleet-washing programme timed around dispatch.",
    images: [
      "fleet-washing-truck-covered-in-foam",
      "fleet-washing-prime-movers-yard",
      "fleet-washing-truck-front-wash",
      "fleet-washing-equipment-yard",
      "fleet-washing-flatbed-trailer",
      "heavy-equipment-excavator-cab-cleaning",
    ],
    evidenceNote:
      "This page brings together photographs from CDCS fleet and heavy-equipment washing jobs in Guyana. Details are described from the photographs; client names, locations, dates, and fleet sizes are not published.",
  },
  {
    slug: "commercial-pressure-washing-guyana",
    status: "published",
    title: "Commercial Pressure Washing — Building Exteriors, Walls & Concrete",
    metaTitle: "Commercial Pressure Washing Project in Guyana | CDCS",
    metaDescription:
      "Photos and method from CDCS commercial pressure washing in Guyana — a two-storey building exterior, a boundary wall, and a concrete slab cleaned with a rotary surface cleaner.",
    serviceCategory: "Commercial Pressure Washing",
    serviceSlugs: ["pressure-washing", "commercial-facility-cleaning", "post-construction-cleaning"],
    location: "Guyana",
    clientType: "Commercial property",
    industryIds: ["commercial-properties", "retail", "industrial-facilities"],
    summary:
      "Exterior pressure washing of a two-storey commercial building, a roadside boundary wall, and a large concrete slab in Guyana, using surface-matched pressure and a rotary surface cleaner on flat concrete.",
    scope: [
      "Upper exterior walls and eaves of a two-storey commercial building",
      "Exterior wall and window surrounds, washed from a ladder",
      "A roadside boundary wall",
      "A large concrete slab",
    ],
    challenge:
      "Exterior surfaces in Guyana's climate gather algae, mould, and traffic grime quickly. Painted walls and eaves need controlled pressure to avoid damage, while large concrete areas wash unevenly — leaving stripes — if cleaned with a hand lance alone.",
    approach:
      "Each surface was handled differently: walls and eaves were washed by hand lance at a pressure suited to the finish, with ladder access for the upper sections, and the concrete slab was cleaned with a rotary surface cleaner for an even finish.",
    methodology: [
      "Commercial pressure washer with adjustable pressure",
      "Rotary surface cleaner on flat concrete",
      "Ladder access for upper walls, eaves, and windows",
      "Pressure matched to painted walls versus bare concrete",
    ],
    execution:
      "Upper walls and eaves were washed from ground level and from a ladder, the boundary wall was washed from the roadside with the pressure washer set beside it, and the slab was cleaned in passes with the surface cleaner.",
    result:
      "The concrete photograph shows the cleaned path of the surface cleaner standing out clearly against the untreated slab — the difference the method makes on grimy concrete.",
    images: [
      "pressure-washing-commercial-building",
      "pressure-washing-concrete-surface-cleaner",
      "pressure-washing-building-exterior",
      "pressure-washing-roadside-wall",
    ],
    evidenceNote:
      "This page brings together photographs from CDCS pressure washing jobs in Guyana. Details are described from the photographs; client names, addresses, and dates are not published.",
  },
  {
    slug: "commercial-building-cleaning-guyana",
    status: "published",
    title: "Commercial Building Cleaning — Floors, Stairwells & Glass",
    metaTitle: "Commercial Building Cleaning Project in Guyana | CDCS",
    metaDescription:
      "Photos and method from CDCS commercial building cleaning in Guyana — floor care, stairwell and handrail cleaning, and interior and exterior glass on a newly finished commercial space.",
    serviceCategory: "Commercial Cleaning",
    serviceSlugs: ["commercial-janitorial-cleaning", "post-construction-cleaning", "commercial-facility-cleaning"],
    location: "Guyana",
    clientType: "Commercial building",
    industryIds: ["commercial-properties", "corporate-offices", "construction"],
    summary:
      "Interior and exterior cleaning on commercial premises in Guyana — floors, a staircase and stainless-steel handrails, a full-height glass facade, and exterior windows — the work involved in bringing a newly finished space to a presentable standard.",
    scope: [
      "Floor care across a large, newly finished interior",
      "Interior window cleaning",
      "Staircase and stainless-steel handrail cleaning",
      "Full-height glass facade cleaning",
      "Exterior window cleaning on a two-storey building",
    ],
    challenge:
      "A newly finished commercial space carries fine dust on floors, stairs, rails, and glass. Large glazed areas and stairwells take time to clean properly, and exterior glass needs safe access.",
    approach:
      "The work was split by area: floors were mopped, windows cleaned from inside, stairs and handrails cleaned by hand, the full-height glass facade cleaned, and exterior windows cleaned from a ladder.",
    methodology: [
      "Floor care matched to the installed finish",
      "Hand cleaning of stair treads and stainless-steel handrails",
      "Glass cleaning on interior windows and a full-height facade",
      "Ladder access for exterior windows",
    ],
    execution:
      "Team members worked side by side — one on the floor while another cleaned the windows, and two together on the staircase and handrails.",
    result:
      "Floors, stairwell, handrails, and glass were cleaned. Once a building like this is occupied, the same standard can be held with a recurring janitorial programme.",
    images: [
      "commercial-cleaning-facility-interior",
      "commercial-cleaning-staircase",
      "commercial-window-cleaning-glass-facade",
      "commercial-exterior-window-cleaning",
    ],
    evidenceNote:
      "This page is described from CDCS photographs of commercial cleaning work in Guyana. Client names, addresses, and dates are not published.",
  },
  {
    slug: "vehicle-interior-extraction-detailing-guyana",
    status: "published",
    title: "Vehicle Interior Extraction & Detailing",
    metaTitle: "Vehicle Interior Extraction & Detailing Project | CDCS",
    metaDescription:
      "Photos and method from CDCS vehicle interior detailing in Guyana — seats removed for a full interior clean, and hot-water extraction of heavily soiled fabric car seats, with before and after results.",
    serviceCategory: "Mobile Vehicle Detailing",
    serviceSlugs: ["mobile-detailing", "upholstery-fabric-extraction", "car-wash-mobile-vehicle-washing"],
    location: "Guyana",
    clientType: "Vehicle owners",
    industryIds: ["residential", "corporate-offices"],
    summary:
      "Full interior detailing of passenger vehicles in Guyana — seats removed to reach the floor carpet, and hot-water extraction of heavily soiled fabric seats — with before and after photographs of the results.",
    scope: [
      "Seat removal for access to the full floor area",
      "Interior carpet and floor cleaning",
      "Hot-water extraction of fabric car seats",
      "Refitting seats and finishing the interior",
    ],
    challenge:
      "Fabric car seats and floor carpet absorb spills, dirt, and body oils that surface wiping and vacuuming cannot lift, and the floor under the seats is difficult to reach with the seats in place.",
    approach:
      "For a full interior clean, the seats were taken out so the floor could be cleaned completely. Soiled seat fabric was cleaned by hot-water extraction, which draws the loosened soil back out of the fabric rather than spreading it.",
    methodology: [
      "Seat removal and full floor access",
      "Hot-water extraction wand on seat fabric",
      "Seats refitted after cleaning",
    ],
    execution:
      "The extraction tool was worked across the seat in overlapping passes; the cleaned bands are visible against the untreated fabric mid-clean.",
    result:
      "The before and after photographs show a heavily stained seat cleaned to an even finish and an interior refitted after cleaning. Results on other vehicles depend on the fabric and the type and age of the staining.",
    images: [
      "mobile-detailing-vehicle-interior-seats-out",
      "mobile-detailing-vehicle-interior-cleaned",
      "upholstery-extraction-car-seat-before-after",
      "upholstery-extraction-cleaning-wand",
      "upholstery-extraction-seat-cleaned",
    ],
    evidenceNote:
      "This page brings together photographs from CDCS vehicle detailing and extraction jobs in Guyana. Owner names and vehicle details are not published.",
  },

  // ---- Drafts: delivered work awaiting photos and confirmed details ----
  {
    slug: "commercial-hotel-carpet-cleaning-georgetown",
    status: "draft",
    title: "Commercial Hotel Carpet Cleaning — Georgetown",
    metaTitle: "Hotel Carpet Cleaning Project in Georgetown | CDCS",
    metaDescription: "",
    serviceCategory: "Commercial Carpet Cleaning",
    serviceSlugs: ["carpet-cleaning", "upholstery-fabric-extraction"],
    location: "Georgetown",
    clientType: "Hotel",
    industryIds: ["hotels-hospitality"],
    summary: "",
    scope: [],
    images: [],
    evidenceNote: "",
    missing: [
      "Photos: before / during / after of corridors, rooms, or function spaces (no guest or staff faces without consent)",
      "Confirmation the hotel can be described as 'a hotel in Georgetown' (or approval to name it)",
      "Areas cleaned (e.g. corridors, guest rooms, function rooms) and approximate scale, if publishable",
      "Method used (hot-water extraction, low-moisture, spot treatment) and any scheduling constraints (occupied rooms, night work)",
      "What the client asked for and what was delivered — only outcomes CDCS can stand behind",
    ],
  },
  {
    slug: "government-upholstery-cleaning-guyana",
    status: "draft",
    title: "Government Facility Upholstery Cleaning — Guyana",
    metaTitle: "Government Facility Upholstery Cleaning Project | CDCS",
    metaDescription: "",
    serviceCategory: "Upholstery & Office Chair Cleaning",
    serviceSlugs: ["upholstery-fabric-extraction", "carpet-cleaning", "commercial-janitorial-cleaning"],
    location: "Guyana",
    clientType: "Government / public-sector facility",
    industryIds: ["government-public-sector"],
    summary: "",
    scope: [],
    images: [],
    evidenceNote: "",
    missing: [
      "Photos of chairs or seating before / during / after (no documents, screens, or ID badges visible)",
      "Confirmation that the work can be referenced publicly as 'a government facility' and in which town or region",
      "Types and approximate number of chairs or seating, if publishable",
      "Method, scheduling (after hours / weekend), and any access or security arrangements that can be described",
      "Outcome statement the client is comfortable with",
    ],
  },
];

export const publishedProjects = projects.filter((p) => p.status === "published");

export function getPublishedProject(slug: string) {
  return publishedProjects.find((p) => p.slug === slug);
}

/** Published projects related to a service, primary-service matches first. */
export function projectsForService(serviceSlug: string): ProjectDefinition[] {
  const matches = publishedProjects.filter((p) => p.serviceSlugs.includes(serviceSlug));
  return [
    ...matches.filter((p) => p.serviceSlugs[0] === serviceSlug),
    ...matches.filter((p) => p.serviceSlugs[0] !== serviceSlug),
  ];
}
