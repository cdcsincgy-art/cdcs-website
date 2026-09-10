// ---------------------------------------------------------------------------
// CDCS multi-service estimator — taxonomy and question logic.
//
// This file describes WHAT the estimator asks. It never carries a price — all
// pricing lives in estimator-pricing.ts so rates are maintained in one place.
//
// Structure:
//   customerTypes      — step 1 options
//   estimatorServices  — step 2 options (33 services), each mapped to a
//                        question "group" and a canonical CDCS service page
//   questionSets       — step 3 fields, keyed by group; only the relevant
//                        set is ever shown
//   addOnsByGroup      — step 4 optional add-ons, keyed by group
// ---------------------------------------------------------------------------

export type EstimatorGroupId =
  | "janitorial"
  | "deep_residential"
  | "post_construction"
  | "pressure_washing"
  | "mobile_detailing"
  | "fleet_washing"
  | "carpet_upholstery"
  | "custom";

export interface CustomerTypeOption {
  id: string;
  label: string;
}

export const customerTypes: CustomerTypeOption[] = [
  { id: "residential", label: "Individual / Residential" },
  { id: "business", label: "Business / Commercial" },
  { id: "government", label: "Government / Institution" },
  { id: "contractor", label: "Contractor / Developer" },
  { id: "fleet", label: "Fleet / Transport Company" },
  { id: "property_manager", label: "Property Manager" },
  { id: "other", label: "Other" },
];

export interface EstimatorService {
  /** Stable identifier used in state, analytics, and the quote summary. */
  id: string;
  /** Customer-facing service name. */
  label: string;
  /** Heading it appears under in step 2. */
  category: string;
  /** Which question set and pricing profile this service uses. */
  group: EstimatorGroupId;
  /** Canonical CDCS service page to link back to (null = general/custom). */
  servicePageSlug: string | null;
  /**
   * Answers that are fixed by this specific service. They are seeded when the
   * service is chosen and their questions are NOT shown on the Job Details
   * step, so the job summary can never contradict the selected service (e.g.
   * "Sofa Cleaning" always records item type "Sofa"). Broad services such as
   * "Upholstery & Fabric Extraction" carry no presets and let the customer
   * choose. Keys must be question ids in the service's question group; values
   * must be valid options for those questions.
   */
  presetAnswers?: Record<string, string | string[]>;
}

/**
 * Every estimator service. `category` groups them on step 2; `group` selects
 * the question set and pricing profile; `presetAnswers` locks in the answers a
 * specialized service implies so the job summary always matches the selection.
 * Order here is the display order within each category.
 */
export const estimatorServices: EstimatorService[] = [
  // --- Commercial & Facility Cleaning ---
  { id: "commercial-janitorial", label: "Commercial & Janitorial Cleaning", category: "Commercial & Facility Cleaning", group: "janitorial", servicePageSlug: "commercial-janitorial-cleaning" },
  { id: "commercial-facility", label: "Commercial Facility Cleaning", category: "Commercial & Facility Cleaning", group: "janitorial", servicePageSlug: "commercial-facility-cleaning" },
  { id: "office-cleaning", label: "Office Cleaning", category: "Commercial & Facility Cleaning", group: "janitorial", servicePageSlug: "commercial-janitorial-cleaning", presetAnswers: { facilityType: "Office" } },
  { id: "post-construction", label: "Post-Construction Cleaning", category: "Commercial & Facility Cleaning", group: "post_construction", servicePageSlug: "post-construction-cleaning" },

  // --- Residential & Deep Cleaning ---
  { id: "deep-cleaning", label: "Deep Cleaning", category: "Residential & Deep Cleaning", group: "deep_residential", servicePageSlug: "deep-cleaning" },
  { id: "residential-cleaning", label: "Residential Cleaning", category: "Residential & Deep Cleaning", group: "deep_residential", servicePageSlug: "deep-cleaning" },
  { id: "move-in-out", label: "Move-In / Move-Out Cleaning", category: "Residential & Deep Cleaning", group: "deep_residential", servicePageSlug: "deep-cleaning" },
  { id: "washroom-deep", label: "Washroom / Bathroom Deep Cleaning", category: "Residential & Deep Cleaning", group: "deep_residential", servicePageSlug: "deep-cleaning" },
  { id: "kitchen-deep", label: "Kitchen Deep Cleaning", category: "Residential & Deep Cleaning", group: "deep_residential", servicePageSlug: "deep-cleaning" },

  // --- Carpet, Upholstery & Extraction ---
  { id: "carpet-cleaning", label: "Carpet Cleaning", category: "Carpet, Upholstery & Extraction", group: "carpet_upholstery", servicePageSlug: "upholstery-fabric-extraction", presetAnswers: { itemType: "Carpet" } },
  { id: "upholstery-extraction", label: "Upholstery & Fabric Extraction", category: "Carpet, Upholstery & Extraction", group: "carpet_upholstery", servicePageSlug: "upholstery-fabric-extraction" },
  { id: "office-chair-cleaning", label: "Office Chair Cleaning", category: "Carpet, Upholstery & Extraction", group: "carpet_upholstery", servicePageSlug: "upholstery-fabric-extraction", presetAnswers: { itemType: "Office chair", chairType: "Office chair" } },
  { id: "sofa-cleaning", label: "Sofa Cleaning", category: "Carpet, Upholstery & Extraction", group: "carpet_upholstery", servicePageSlug: "upholstery-fabric-extraction", presetAnswers: { itemType: "Sofa" } },
  { id: "mattress-cleaning", label: "Mattress Cleaning", category: "Carpet, Upholstery & Extraction", group: "carpet_upholstery", servicePageSlug: "upholstery-fabric-extraction", presetAnswers: { itemType: "Mattress" } },
  { id: "vehicle-seat-extraction", label: "Vehicle Seat Extraction / Steam Cleaning", category: "Carpet, Upholstery & Extraction", group: "carpet_upholstery", servicePageSlug: "upholstery-fabric-extraction", presetAnswers: { itemType: "Vehicle seats / interior" } },

  // --- Pressure & Exterior Cleaning ---
  { id: "pressure-washing", label: "Pressure Washing", category: "Pressure & Exterior Cleaning", group: "pressure_washing", servicePageSlug: "pressure-washing" },
  { id: "concrete-cleaning", label: "Concrete / Pavement Cleaning", category: "Pressure & Exterior Cleaning", group: "pressure_washing", servicePageSlug: "pressure-washing", presetAnswers: { surfaceType: "Concrete" } },
  { id: "building-wall-washing", label: "Building / Wall Washing", category: "Pressure & Exterior Cleaning", group: "pressure_washing", servicePageSlug: "pressure-washing", presetAnswers: { surfaceType: "Wall" } },
  { id: "fence-washing", label: "Fence Washing", category: "Pressure & Exterior Cleaning", group: "pressure_washing", servicePageSlug: "pressure-washing", presetAnswers: { surfaceType: "Fence" } },
  { id: "roof-washing", label: "Roof Washing", category: "Pressure & Exterior Cleaning", group: "pressure_washing", servicePageSlug: "pressure-washing", presetAnswers: { surfaceType: "Roof" } },
  { id: "parking-area-cleaning", label: "Parking Area Cleaning", category: "Pressure & Exterior Cleaning", group: "pressure_washing", servicePageSlug: "pressure-washing", presetAnswers: { surfaceType: "Parking area" } },

  // --- Vehicle Detailing ---
  { id: "mobile-detailing", label: "Mobile Vehicle Detailing", category: "Vehicle Detailing", group: "mobile_detailing", servicePageSlug: "mobile-detailing" },
  { id: "exterior-vehicle-wash", label: "Exterior Vehicle Wash", category: "Vehicle Detailing", group: "mobile_detailing", servicePageSlug: "mobile-detailing", presetAnswers: { washPackage: "Exterior only" } },
  { id: "interior-exterior-wash", label: "Interior & Exterior Vehicle Wash", category: "Vehicle Detailing", group: "mobile_detailing", servicePageSlug: "mobile-detailing", presetAnswers: { washPackage: "Interior + exterior" } },
  { id: "engine-wash", label: "Engine Wash", category: "Vehicle Detailing", group: "mobile_detailing", servicePageSlug: "mobile-detailing", presetAnswers: { focusService: "Engine wash only" } },
  { id: "undercarriage-wash", label: "Vehicle Bottom / Undercarriage Wash", category: "Vehicle Detailing", group: "mobile_detailing", servicePageSlug: "mobile-detailing", presetAnswers: { focusService: "Undercarriage wash only" } },
  { id: "headlight-restoration", label: "Headlight Restoration", category: "Vehicle Detailing", group: "mobile_detailing", servicePageSlug: "mobile-detailing", presetAnswers: { focusService: "Headlight restoration only" } },
  { id: "buffing-polishing", label: "Buffing & Polishing", category: "Vehicle Detailing", group: "mobile_detailing", servicePageSlug: "mobile-detailing", presetAnswers: { focusService: "Buffing & polishing only" } },
  { id: "odor-treatment", label: "Odor Treatment / Elimination", category: "Vehicle Detailing", group: "mobile_detailing", servicePageSlug: "mobile-detailing", presetAnswers: { focusService: "Odor treatment only" } },

  // --- Fleet & Heavy-Duty Washing ---
  { id: "fleet-washing", label: "Fleet & Truck Washing", category: "Fleet & Heavy-Duty Washing", group: "fleet_washing", servicePageSlug: "fleet-washing" },
  { id: "commercial-vehicle-washing", label: "Commercial Vehicle Washing", category: "Fleet & Heavy-Duty Washing", group: "fleet_washing", servicePageSlug: "fleet-washing" },
  { id: "equipment-washing", label: "Equipment / Heavy-Duty Machinery Washing", category: "Fleet & Heavy-Duty Washing", group: "fleet_washing", servicePageSlug: "fleet-washing", presetAnswers: { vehicleClass: "Heavy equipment" } },

  // --- Other ---
  { id: "custom", label: "Other / Custom Cleaning Requirement", category: "Other", group: "custom", servicePageSlug: null },
];

export const estimatorCategories: string[] = [
  "Commercial & Facility Cleaning",
  "Residential & Deep Cleaning",
  "Carpet, Upholstery & Extraction",
  "Pressure & Exterior Cleaning",
  "Vehicle Detailing",
  "Fleet & Heavy-Duty Washing",
  "Other",
];

/** Question ids that a service pre-fills and therefore hides on Job Details. */
export function presetQuestionIds(service: EstimatorService | undefined): string[] {
  return service?.presetAnswers ? Object.keys(service.presetAnswers) : [];
}

export function getEstimatorService(id: string | null | undefined): EstimatorService | undefined {
  return estimatorServices.find((s) => s.id === id);
}

export function servicesInCategory(category: string): EstimatorService[] {
  return estimatorServices.filter((s) => s.category === category);
}

// ---------------------------------------------------------------------------
// Question sets
// ---------------------------------------------------------------------------

export type QuestionType = "select" | "multiselect" | "number" | "boolean" | "text" | "textarea";

export interface EstimatorQuestion {
  id: string;
  label: string;
  type: QuestionType;
  /** For select / multiselect. */
  options?: string[];
  /** For number — a short unit shown beside the field, e.g. "sq ft". */
  unit?: string;
  /** For number — minimum accepted value (defaults to 0). */
  min?: number;
  placeholder?: string;
  /** When true the field can be left blank. */
  optional?: boolean;
  /** When set, the answer is used to pre-fill the lead-capture "location". */
  fillsLocation?: boolean;
  /**
   * Only show this question when another answer matches. Used so item-specific
   * detail (sofa size, mattress size, extraction package…) appears only when
   * relevant. A hidden question is skipped for validation and pricing.
   */
  showWhen?: { questionId: string; equalsAny: string[] };
}

/** True if a question should be shown given the current answers. */
export function isQuestionVisible(
  q: EstimatorQuestion,
  answers: Record<string, unknown>,
): boolean {
  if (!q.showWhen) return true;
  const v = answers[q.showWhen.questionId];
  const have = Array.isArray(v) ? v.map(String) : [String(v ?? "")];
  return q.showWhen.equalsAny.some((want) => have.includes(want));
}

const CONDITION_4 = ["Light", "Moderate", "Heavy", "Very heavy"];

export const questionSets: Record<EstimatorGroupId, EstimatorQuestion[]> = {
  janitorial: [
    { id: "facilityType", label: "Facility type", type: "select", options: ["Office", "Bank", "Government building", "School", "Medical facility", "Retail", "Warehouse", "Industrial", "Commercial building", "Other"] },
    { id: "squareFootage", label: "Approximate square footage", type: "number", unit: "sq ft" },
    { id: "floors", label: "Number of floors", type: "number" },
    { id: "washrooms", label: "Number of washrooms", type: "number" },
    { id: "kitchens", label: "Number of kitchens / breakrooms", type: "number" },
    { id: "workstations", label: "Number of offices / workstations", type: "number" },
    { id: "frequency", label: "Cleaning frequency", type: "select", options: ["One time", "Daily", "2x weekly", "3x weekly", "5x weekly", "6x weekly", "7x weekly"] },
    { id: "cleaningPeriod", label: "Preferred cleaning period", type: "select", options: ["Business hours", "After hours", "Overnight", "Flexible"] },
    { id: "suppliesExpectation", label: "You expect CDCS to supply", type: "select", options: ["Labour only", "Labour + equipment", "Labour + chemicals", "Full janitorial package"] },
    { id: "condition", label: "Current condition", type: "select", options: CONDITION_4 },
  ],

  deep_residential: [
    { id: "propertyType", label: "Property type", type: "select", options: ["House", "Apartment / Flat", "Townhouse", "Office", "Commercial space", "Other"] },
    { id: "bedrooms", label: "Bedrooms", type: "number" },
    { id: "bathrooms", label: "Bathrooms", type: "number" },
    { id: "kitchens", label: "Kitchen count", type: "number" },
    { id: "squareFootage", label: "Approximate square footage", type: "number", unit: "sq ft" },
    { id: "occupancy", label: "Occupied or vacant", type: "select", options: ["Occupied", "Vacant"] },
    { id: "furnishing", label: "Furnished or unfurnished", type: "select", options: ["Furnished", "Unfurnished"] },
    { id: "condition", label: "Current condition", type: "select", options: CONDITION_4 },
    { id: "petHair", label: "Pet hair present", type: "boolean" },
    { id: "heavyGrease", label: "Heavy grease present", type: "boolean" },
    { id: "mould", label: "Mould / mildew present", type: "boolean" },
    { id: "moveInOut", label: "Move-in / move-out clean", type: "boolean" },
    { id: "insideCupboards", label: "Inside cupboards required", type: "boolean" },
    { id: "insideAppliances", label: "Inside appliances required", type: "boolean" },
    { id: "windows", label: "Windows required", type: "boolean" },
  ],

  post_construction: [
    { id: "squareFootage", label: "Approximate square footage", type: "number", unit: "sq ft" },
    { id: "buildingType", label: "Building type", type: "select", options: ["House", "Apartment building", "Office", "Commercial building", "Retail", "Industrial", "Mixed-use", "Other"] },
    { id: "floors", label: "Number of floors", type: "number" },
    { id: "constructionStage", label: "Construction stage", type: "select", options: ["Rough clean", "Detailed clean", "Final handover clean"] },
    { id: "debrisLevel", label: "Debris level", type: "select", options: CONDITION_4 },
    { id: "dustLevel", label: "Construction dust level", type: "select", options: CONDITION_4 },
    { id: "residues", label: "Present on site", type: "multiselect", options: ["Paint spots", "Adhesive", "Grout haze", "Cement residue", "Window stickers", "Heavy debris"], optional: true },
    { id: "coverage", label: "Interior only / exterior / both", type: "select", options: ["Interior only", "Exterior only", "Both"] },
  ],

  pressure_washing: [
    { id: "surfaceType", label: "Surface type", type: "select", options: ["Concrete", "Pavement", "Pavers", "Fence", "Wall", "Building exterior", "Roof", "Parking area", "Yard", "Other"] },
    { id: "area", label: "Approximate area", type: "number", unit: "sq ft" },
    { id: "condition", label: "Condition", type: "select", options: ["Light dirt", "Moderate", "Heavy dirt", "Heavy algae / mould / oil"] },
    { id: "access", label: "Access", type: "select", options: ["Ground level", "Elevated", "Difficult access"] },
    { id: "waterOnSite", label: "Water available on site", type: "boolean" },
    { id: "electricityOnSite", label: "Electricity available on site", type: "boolean" },
  ],

  mobile_detailing: [
    { id: "serviceMode", label: "Where will the wash happen?", type: "select", options: ["Mobile (we come to you)", "Washbay (drop-off at CDCS)"] },
    { id: "vehicleClass", label: "Vehicle type", type: "select", options: ["Small car / sedan", "SUV", "Pickup", "Large SUV / 7-seater", "Canter / light commercial", "Other"] },
    { id: "washPackage", label: "Wash package", type: "select", options: ["Interior + exterior", "Exterior only"] },
    { id: "focusService", label: "Anything specific instead of a full wash?", type: "select", options: ["Full wash / detail", "Engine wash only", "Undercarriage wash only", "Headlight restoration only", "Buffing & polishing only", "Odor treatment only"], optional: true },
    { id: "vehicleCondition", label: "Vehicle condition", type: "select", options: ["Normal", "Moderate", "Heavy", "Severe"] },
    { id: "subscriptionInterest", label: "Interested in a recurring plan?", type: "select", options: ["One-time only", "2 washes per month", "4 washes per month"], optional: true },
    { id: "petHair", label: "Pet hair", type: "boolean" },
    { id: "heavyStains", label: "Heavy interior stains", type: "boolean" },
    { id: "odor", label: "Odor to treat", type: "boolean" },
    { id: "serviceLocation", label: "Vehicle location (or 'CDCS washbay')", type: "text", placeholder: "e.g. Georgetown, Region 4", fillsLocation: true },
  ],

  fleet_washing: [
    { id: "vehicleClass", label: "Vehicle / unit type", type: "select", options: ["Canter / light commercial", "Medium truck", "Hauler / prime mover", "Side loader / garbage truck", "Bus / large commercial vehicle", "Trailer only", "Hauler + trailer", "Heavy equipment", "Mixed / other"] },
    { id: "equipmentClass", label: "Equipment type", type: "select", options: ["Skid steer / mini equipment", "Backhoe / small loader", "Medium excavator / loader", "Large excavator / bulldozer", "Very large mining / construction equipment"], showWhen: { questionId: "vehicleClass", equalsAny: ["Heavy equipment"] } },
    { id: "washScope", label: "Wash scope", type: "select", options: ["Exterior", "Exterior + Engine", "Exterior + Bottom", "Exterior + Engine + Bottom"] },
    { id: "fleetSize", label: "How many similar units at one location?", type: "number", min: 1 },
    { id: "condition", label: "Condition", type: "select", options: ["Normal operating dirt", "Heavy mud / grease", "Severe buildup", "Exceptional / unknown contamination"] },
    { id: "frequency", label: "Frequency", type: "select", options: ["One time", "Weekly", "Biweekly", "Monthly"] },
    { id: "depotLocation", label: "Depot / yard location", type: "text", placeholder: "e.g. Ruimveldt, Georgetown", fillsLocation: true },
  ],

  carpet_upholstery: [
    { id: "serviceMode", label: "Where will the cleaning happen?", type: "select", options: ["Mobile (we come to you)", "Drop-off at CDCS"] },
    { id: "itemType", label: "What are we cleaning?", type: "select", options: ["Carpet", "Rug", "Sofa", "Armchair / dining chair", "Office chair", "Mattress", "Vehicle seats / interior"] },
    { id: "sofaConfig", label: "Sofa configuration", type: "select", options: ["1-seater", "2-seater", "3-seater", "2-1-1 set", "3-2-1 set", "Large sectional"], showWhen: { questionId: "itemType", equalsAny: ["Sofa"] } },
    { id: "mattressSize", label: "Mattress size", type: "select", options: ["Single", "Double", "Queen", "King"], showWhen: { questionId: "itemType", equalsAny: ["Mattress"] } },
    { id: "chairType", label: "Chair type", type: "select", options: ["Dining / standard upholstered chair", "Office chair", "Large padded / executive chair"], showWhen: { questionId: "itemType", equalsAny: ["Armchair / dining chair", "Office chair"] } },
    { id: "chairQty", label: "How many chairs?", type: "number", min: 1, showWhen: { questionId: "itemType", equalsAny: ["Armchair / dining chair", "Office chair"] } },
    { id: "carpetArea", label: "Approximate carpet area", type: "number", unit: "sq ft", min: 1, showWhen: { questionId: "itemType", equalsAny: ["Carpet", "Rug"] } },
    { id: "carpetSetting", label: "Residential or commercial", type: "select", options: ["Residential", "Commercial"], showWhen: { questionId: "itemType", equalsAny: ["Carpet", "Rug"] } },
    { id: "carpetAreas", label: "Number of separate areas / rooms", type: "number", min: 1, optional: true, showWhen: { questionId: "itemType", equalsAny: ["Carpet"] } },
    { id: "furnitureObstruction", label: "Furniture needs moving", type: "boolean", showWhen: { questionId: "itemType", equalsAny: ["Carpet"] } },
    { id: "extractionPackage", label: "Extraction package", type: "select", options: ["Single vehicle seat", "2 seats", "Rear bench", "Front + rear seats", "Seats + vehicle carpet", "Full vehicle extraction"], showWhen: { questionId: "itemType", equalsAny: ["Vehicle seats / interior"] } },
    { id: "quantity", label: "How many (sofas / mattresses / rugs)?", type: "number", min: 1, optional: true, showWhen: { questionId: "itemType", equalsAny: ["Sofa", "Mattress", "Rug"] } },
    { id: "condition", label: "Condition", type: "select", options: ["Light / normal", "Moderate", "Heavy", "Severe"] },
    { id: "material", label: "Fabric / material (if known)", type: "text", placeholder: "e.g. microfibre, wool, leather", optional: true },
    { id: "stains", label: "Visible stains", type: "boolean" },
    { id: "odor", label: "Odor present", type: "boolean" },
    { id: "petContamination", label: "Pet contamination", type: "boolean" },
    { id: "serviceLocation", label: "Service location (or 'CDCS')", type: "text", placeholder: "e.g. Georgetown, Region 4", fillsLocation: true },
  ],

  custom: [
    { id: "description", label: "Describe the cleaning or detailing work you need", type: "textarea", placeholder: "Tell us what needs cleaning, roughly how big the job is, and anything unusual about it." },
    { id: "approxScale", label: "Approximate size or scale", type: "text", placeholder: "e.g. one building, 5 vehicles, 2,000 sq ft yard", optional: true },
    { id: "serviceLocation", label: "Service location", type: "text", placeholder: "e.g. Georgetown, Region 4", fillsLocation: true },
  ],
};

// ---------------------------------------------------------------------------
// Optional add-ons (step 4)
// ---------------------------------------------------------------------------

export interface EstimatorAddOn {
  id: string;
  label: string;
}

export const addOnsByGroup: Record<EstimatorGroupId, EstimatorAddOn[]> = {
  janitorial: [
    { id: "supply-consumables", label: "Supply washroom consumables (soap, tissue, liners)" },
    { id: "interior-windows", label: "Interior window cleaning" },
    { id: "carpet-extraction", label: "Carpet extraction for carpeted areas" },
    { id: "initial-deep-clean", label: "One-time deep clean before the program starts" },
  ],
  deep_residential: [
    { id: "interior-windows", label: "Interior windows" },
    { id: "exterior-windows", label: "Reachable exterior windows" },
    { id: "wall-washing", label: "Wall washing / spot cleaning" },
    { id: "balcony-patio", label: "Balcony / patio cleaning" },
  ],
  post_construction: [
    { id: "exterior-pressure-wash", label: "Exterior pressure washing" },
    { id: "window-track-detail", label: "Detailed window track & frame cleaning" },
    { id: "carpet-extraction", label: "Carpet & upholstery extraction" },
  ],
  pressure_washing: [
    { id: "protective-treatment", label: "Post-wash sealing / protective treatment" },
    { id: "gutter-cleaning", label: "Gutter clearing" },
    { id: "rust-oil-treatment", label: "Rust / oil stain treatment" },
  ],
  mobile_detailing: [
    { id: "engine-bay", label: "Engine bay wash" },
    { id: "undercarriage", label: "Undercarriage wash" },
    { id: "headlight-restoration", label: "Headlight restoration" },
    { id: "pet-hair", label: "Pet hair removal" },
    { id: "odor-treatment", label: "Odor treatment" },
    { id: "buff-polish", label: "Buff & polish / paint correction" },
  ],
  fleet_washing: [
    { id: "engine-wash", label: "Engine wash across the fleet" },
    { id: "undercarriage", label: "Undercarriage wash" },
    { id: "cab-interior", label: "Cab interior cleaning" },
    { id: "recurring-program", label: "Set up a recurring washing program" },
  ],
  carpet_upholstery: [
    { id: "stain-treatment", label: "Targeted stain treatment" },
    { id: "odor-treatment", label: "Odor treatment" },
    { id: "fabric-protection", label: "Fabric protection application" },
    { id: "pet-treatment", label: "Pet contamination treatment" },
  ],
  custom: [],
};

export const groupLabels: Record<EstimatorGroupId, string> = {
  janitorial: "Commercial & janitorial cleaning",
  deep_residential: "Deep & residential cleaning",
  post_construction: "Post-construction cleaning",
  pressure_washing: "Pressure washing",
  mobile_detailing: "Vehicle detailing",
  fleet_washing: "Fleet & equipment washing",
  carpet_upholstery: "Carpet, upholstery & extraction",
  custom: "Custom requirement",
};
