// ---------------------------------------------------------------------------
// CDCS ESTIMATOR — MASTER PRICING ENGINE
//
// Every rate lives in the `pricing` object below (all values GYD). Nothing in
// the UI carries a price. The engine (`computeEstimate`) dispatches by service
// group to a dedicated pricer and returns one of four outcomes:
//
//   estimated_price     — high confidence, single figure
//   estimated_range     — condition / scope creates reasonable uncertainty
//   photo_assessment    — visual condition must be seen (photos suffice)
//   site_assessment     — large / commercial / complex; needs a walkthrough
//
// PRICING SOURCE
//   APPROVED (CDCS management-approved rates, §2–§11 of the brief):
//     - washbay & mobile vehicle wash rates
//     - fleet & heavy-duty one-off rates + heavy-equipment starting prices
//     - vehicle extraction, chairs, mattresses, sofas
//     - carpet 25–35 GYD/sq ft framework
//   PROVISIONAL (marked `PROVISIONAL` — reasonable bands pending CDCS sign-off,
//   only ever shown as a RANGE, never an exact price):
//     - pressure washing bands & minimum
//     - deep / residential cleaning bands
//     - post-construction bands
//     - janitorial one-time & monthly bands
//   Every PROVISIONAL value is listed in the task's final report.
//
// SAFETY: all outputs pass through guards — no NaN, no negative, no zero-price
// bookings; discounts are capped; severe/unknown conditions never receive a
// misleading exact price.
// ---------------------------------------------------------------------------

import type { EstimatorGroupId } from "./estimator-data";

export const CURRENCY = "GYD";

/** Format a numeric GYD amount as "GYD $25,000". */
export function formatGYD(amount: number): string {
  return `${CURRENCY} $${Math.round(amount).toLocaleString("en-US")}`;
}

/**
 * Round a customer-facing figure to a commercially sensible increment:
 * nearest 500 below 20k, nearest 1,000 to 100k, nearest 5,000 above.
 */
export function roundCommercial(n: number): number {
  if (!Number.isFinite(n) || n <= 0) return 0;
  const step = n < 20000 ? 500 : n < 100000 ? 1000 : 5000;
  return Math.round(n / step) * step;
}

function roundRangeBounds(low: number, high: number): [number, number] {
  const step = high < 20000 ? 500 : high < 100000 ? 1000 : 5000;
  return [Math.max(0, Math.floor(low / step) * step), Math.ceil(high / step) * step];
}

// ---------------------------------------------------------------------------
// MASTER PRICING CONFIG (GYD)
// ---------------------------------------------------------------------------

export const pricing = {
  /** Discounts (frequency + volume + promo) can never exceed this in total. */
  maxTotalDiscount: 0.2,
  /** Mobile jobs are never quoted below this within the standard service area. */
  mobileMinimum: 6000,

  // --- §2 WASHBAY (drop-off at CDCS) ---
  washbay: {
    interior_exterior: {
      "Small car / sedan": 2500,
      SUV: 3000,
      Pickup: 4000,
      "Large SUV / 7-seater": 4000,
      "Canter / light commercial": 5000,
    } as Record<string, number>,
    exterior_only: {
      "Small car / sedan": 1500,
      SUV: 2000,
      Pickup: 2500,
      "Large SUV / 7-seater": 3000,
      "Canter / light commercial": 3500,
    } as Record<string, number>,
  },

  // --- §3 MOBILE vehicle wash (mobilization within standard service area included) ---
  mobileWash: {
    interior_exterior: {
      "Small car / sedan": 5000,
      SUV: 6000,
      Pickup: 6000,
      "Large SUV / 7-seater": 7000,
      "Canter / light commercial": 7000,
    } as Record<string, number>,
    // No approved mobile "exterior only" rates — handled as photo assessment.
    exterior_only: {} as Record<string, number>,
  },

  // --- §2/§3 vehicle condition ---
  vehicleCondition: { Normal: 1, Moderate: 1.15, Heavy: 1.3 } as Record<string, number>,
  // (Severe -> photo assessment)

  // --- Standalone detailing services (approved starting rates) ---
  // Keyed by the focusService answer.
  standaloneDetailing: {
    "Engine wash only": {
      base: 4000,
      sizeUplift: true,
      severeMessage:
        "Severe grease or oil buildup in the engine bay is confirmed from photos before pricing — send a few and CDCS will follow up.",
    },
    "Undercarriage wash only": {
      base: 4000,
      sizeUplift: true,
      severeMessage:
        "Severe mud, tar, or grease buildup underneath is confirmed from photos before pricing.",
    },
    "Headlight restoration only": {
      base: 8000,
      sizeUplift: false,
      severeMessage:
        "Cracked lenses, moisture inside the housing, or damage beyond surface hazing is assessed first — normal restoration may not be suitable.",
      note: "GYD $8,000 covers a standard pair of front headlights.",
    },
    "Buffing & polishing only": {
      base: 15000,
      sizeUplift: true,
      heavyAssessment: true, // heavy oxidation / deep scratches / correction-level -> photo
      range: true,
      rangeFactor: 1.3,
      note:
        "Starting price. Buffing & polishing restores gloss and reduces light swirl marks — deeper scratches and paint damage are not guaranteed to be removed.",
    },
    "Odor treatment only": {
      base: 5000,
      sizeUplift: false,
      range: true,
      rangeFactor: 1.6,
      severeMessage:
        "Severe smoke, biological contamination, urine, or an unknown source is assessed (photos or in person) before pricing.",
      note: "Starting price for a standard odor treatment.",
    },
  } as Record<
    string,
    {
      base: number;
      sizeUplift: boolean;
      heavyAssessment?: boolean;
      severeMessage?: string;
      range?: boolean;
      rangeFactor?: number;
      note?: string;
    }
  >,
  // Vehicle-size uplift for size-sensitive standalone detailing (engine, bottom, buffing).
  detailSizeMultipliers: {
    "Small car / sedan": 1,
    SUV: 1.25,
    Pickup: 1.25,
    "Large SUV / 7-seater": 1.5,
    "Canter / light commercial": 1.75,
  } as Record<string, number>,

  // --- §4 FLEET & HEAVY-DUTY one-off mobile, normal condition ---
  fleet: {
    "Canter / light commercial": { Exterior: 7000, "Exterior + Engine": 10000, "Exterior + Bottom": 10000, "Exterior + Engine + Bottom": 13000 },
    "Medium truck": { Exterior: 10000, "Exterior + Engine": 13000, "Exterior + Bottom": 14000, "Exterior + Engine + Bottom": 17000 },
    "Hauler / prime mover": { Exterior: 12000, "Exterior + Engine": 16000, "Exterior + Bottom": 16000, "Exterior + Engine + Bottom": 20000 },
    "Side loader / garbage truck": { Exterior: 12000, "Exterior + Engine": 16000, "Exterior + Bottom": 17000, "Exterior + Engine + Bottom": 21000 },
    "Bus / large commercial vehicle": { Exterior: 10000, "Exterior + Engine": 13000, "Exterior + Bottom": 14000, "Exterior + Engine + Bottom": 17000 },
    "Trailer only": { Exterior: 8000, "Exterior + Bottom": 11000 },
    "Hauler + trailer": { Exterior: 18000, "Exterior + Engine": 22000, "Exterior + Bottom": 23000, "Exterior + Engine + Bottom": 27000 },
  } as Record<string, Record<string, number>>,

  // --- §4 heavy-duty condition ---
  fleetCondition: {
    "Normal operating dirt": 0,
    "Heavy mud / grease": 0.15,
    "Severe buildup": 0.25,
  } as Record<string, number>,
  // ("Exceptional / unknown contamination" -> assessment)

  // --- §5 HEAVY EQUIPMENT starting preliminary prices ---
  heavyEquipment: {
    "Skid steer / mini equipment": 12000,
    "Backhoe / small loader": 18000,
    "Medium excavator / loader": 25000,
    "Large excavator / bulldozer": 35000,
  } as Record<string, number>,
  // ("Very large mining / construction equipment" -> site/photo assessment)

  // --- §6 FLEET QUANTITY bands (similar units, one location) ---
  fleetQuantityBands: [
    { min: 1, max: 2, discount: 0, label: "1-2" },
    { min: 3, max: 5, discount: 0.05, label: "3-5" },
    { min: 6, max: 10, discount: 0.1, label: "6-10" },
    { min: 11, max: 20, discount: 0.13, label: "11-20" },
    { min: 21, max: Infinity, discount: null, label: "20+", custom: true },
  ] as { min: number; max: number; discount: number | null; label: string; custom?: boolean }[],

  // --- §7 VEHICLE EXTRACTION / steam cleaning ---
  vehicleExtraction: {
    "Single vehicle seat": 3000,
    "2 seats": 5000,
    "Rear bench": 6000,
    "Front + rear seats": 10000,
    "Seats + vehicle carpet": 14000,
    "Full vehicle extraction": 16000, // "from"
  } as Record<string, number>,
  vehicleExtractionFrom: new Set(["Full vehicle extraction"]),

  // --- §8 CHAIRS (per chair) ---
  chairs: {
    "Dining / standard upholstered chair": 2000,
    "Office chair": 2500,
    "Large padded / executive chair": 3500,
  } as Record<string, number>,
  chairLargeQtyThreshold: 20, // above this -> range / official quotation

  // --- §9 MATTRESSES ---
  mattresses: { Single: 7000, Double: 9000, Queen: 11000, King: 13000 } as Record<string, number>,

  // --- §10 SOFAS ---
  sofas: {
    "1-seater": 5000,
    "2-seater": 8000,
    "3-seater": 11000,
    "2-1-1 set": 16000,
    "3-2-1 set": 20000,
    "Large sectional": 22000, // "from"
  } as Record<string, number>,
  sofaFrom: new Set(["Large sectional"]),

  // --- §11 EXTRACTION condition ---
  extractionCondition: { "Light / normal": 1, Moderate: 1.1, Heavy: 1.25 } as Record<string, number>,
  // (Severe -> photo assessment)

  // --- §11 EXTRACTION add-ons ---
  extractionAddOns: {
    "stain-treatment": { min: 2000, max: 4000 }, // variable -> pushes result to a range
    "odor-treatment": 3000,
    "pet-treatment": 3000, // pet hair / light pet contamination
    "fabric-protection": null, // no approved rate -> "Available on request"
  } as Record<string, number | { min: number; max: number } | null>,

  // --- §12 CARPET / commercial extraction (25–35 GYD/sq ft framework) ---
  carpet: {
    minimum: 6000,
    // volume bands within the 25–35 framework
    bands: [
      { maxSqFt: 500, rate: 35 },
      { maxSqFt: 1500, rate: 32 },
      { maxSqFt: 3000, rate: 28 },
      { maxSqFt: 6000, rate: 25 },
    ],
    largeCommercialSqFt: 6000, // above this -> site assessment
    commercialUplift: 1.1, // commercial carpet: access / obstruction / scheduling
    obstructionUplift: 1.1,
  },

  // --- §17 CONSUMER SUBSCRIPTIONS (mobile interior+exterior full wash) ---
  subscription: {
    twoPerMonthFactor: 0.92, // of (2 x one-time)
    fourPerMonthFactor: 0.85, // of (4 x one-time)
    marginFloorFactor: 0.8, // never below this share of (visits x one-time)
  },

  // ======================================================================
  // PROVISIONAL bands — reasonable, pending CDCS confirmation. Only ever
  // shown as a RANGE. Listed in the final report.
  // ======================================================================

  // --- §13 PRESSURE WASHING (PROVISIONAL) ---
  pressure: {
    minimumMobile: 8000, // PROVISIONAL premium mobile minimum
    // straightforward ground-level concrete/pavement/parking, light–moderate:
    bands: [
      { maxSqFt: 400, low: 8000, high: 16000 },
      { maxSqFt: 1200, low: 16000, high: 35000 },
      { maxSqFt: 3000, low: 35000, high: 70000 },
    ],
    largeSqFt: 3000, // above this, or roof/height/difficult/fragile -> assessment
    conditionUplift: { "Light dirt": 0, Moderate: 0.15, "Heavy dirt": 0.3 } as Record<string, number>,
  },

  // --- §14 DEEP / RESIDENTIAL CLEANING (PROVISIONAL) ---
  deep: {
    // one-time residential, condition not "Very heavy", predictable scope:
    bedroomBands: [
      { maxBeds: 2, low: 25000, high: 45000 },
      { maxBeds: 3, low: 40000, high: 70000 },
      { maxBeds: 5, low: 60000, high: 100000 },
    ],
    vacantUplift: 0.15, // vacant / move-in-out
    largeSqFt: 4000, // above this -> site assessment
    largeBeds: 5,
    // single-room deep cleans are priced on their own small band, not the
    // whole-home bedroom bands:
    standalone: {
      "washroom-deep": { low: 12000, high: 28000 },
      "kitchen-deep": { low: 15000, high: 35000 },
    } as Record<string, { low: number; high: number }>,
  },

  // --- §15 POST-CONSTRUCTION (PROVISIONAL) ---
  postConstruction: {
    // small, predictable final/detailed cleans only:
    smallMaxSqFt: 3000,
    smallMaxFloors: 2,
    smallBand: { low: 45000, high: 110000 },
    // everything else -> site assessment
  },

  // --- §16 COMMERCIAL / JANITORIAL — PRICING ENGINE V2 (CDCS management-approved
  //     preliminary commercial ranges; not binding quotations) ---
  janitorial: {
    // §A base monthly ranges at ~5 cleaning visits per week
    baseMonthlyBands: [
      { maxSqFt: 1500, low: 110000, high: 160000 },
      { maxSqFt: 3000, low: 160000, high: 240000 },
      { maxSqFt: 5000, low: 240000, high: 350000 },
      { maxSqFt: 8000, low: 350000, high: 500000 },
      { maxSqFt: 12000, low: 500000, high: 720000 },
      { maxSqFt: 15000, low: 700000, high: 950000 },
    ],
    maxSqFt: 15000, // above -> site assessment
    maxFloors: 4, // above -> site assessment
    // §B frequency factor by visits/week (existing UI labels are mapped to these)
    frequencyFactor: {
      "1x weekly": 0.32,
      "2x weekly": 0.48,
      "3x weekly": 0.65,
      "4x weekly": 0.82,
      "5x weekly": 1.0,
      "6x weekly": 1.15,
      "7x weekly": 1.3,
    } as Record<string, number>,
    // §G facility-type complexity factor (existing options mapped conservatively)
    facilityFactor: {
      Office: 1.0,
      "Commercial building": 1.0,
      Retail: 1.05,
      Bank: 1.08,
      "Government building": 1.05,
      School: 1.1,
      "Medical facility": 1.15,
      Warehouse: 1.1,
      Industrial: 1.1,
      Other: 1.0,
    } as Record<string, number>,
    roundTo: 5000, // §H customer-facing monthly ranges round to nearest 5,000
    // §K one-time commercial cleaning (kept separate from recurring)
    oneTimeBands: [
      { maxSqFt: 1500, low: 30000, high: 50000 },
      { maxSqFt: 3000, low: 45000, high: 75000 },
      { maxSqFt: 4000, low: 65000, high: 100000 },
    ],
    oneTimeMaxSqFt: 4000, // above -> site assessment
  },
};

// ---------------------------------------------------------------------------
// Result types
// ---------------------------------------------------------------------------

export type EstimateResultKind =
  | "estimated_price"
  | "estimated_range"
  | "photo_assessment"
  | "site_assessment";

export interface EstimateLineItem {
  label: string;
  amount: number;
}

export interface SubscriptionOption {
  label: string;
  monthly: number;
}

export interface EstimateResult {
  kind: EstimateResultKind;
  amount?: number;
  low?: number;
  high?: number;
  addOnsTotal?: number;
  subtotalLabel?: string;
  reason?: string;
  lineItems?: EstimateLineItem[];
  /** Recurring consumer plan options (mobile vehicle washing). */
  subscriptions?: SubscriptionOption[];
  /** e.g. "Recurring Fleet Program Available". */
  recurringNote?: string;
  /** Extra customer-facing caveat (stain disclaimer, add-ons on request…). */
  noteExtra?: string;
  /** Overrides the outcome-block label (e.g. "Preliminary Monthly Estimate"). */
  headline?: string;
  /** Unit shown after the figure, e.g. "/ month". */
  unitSuffix?: string;
  /** Non-PII attributes for analytics. */
  analytics?: Record<string, string | number>;
}

// ---------------------------------------------------------------------------
// Shared helpers
// ---------------------------------------------------------------------------

type AnswerMap = Record<string, string | string[] | number | boolean | undefined>;

const s = (v: unknown): string => (typeof v === "string" ? v : v == null ? "" : String(v));
const n = (v: unknown): number => {
  const x = typeof v === "number" ? v : parseFloat(String(v ?? ""));
  return Number.isFinite(x) && x >= 0 ? x : 0;
};

const PHOTO_REASON =
  "The right price depends on the condition of the item. Send a few photos with your quote request and a CDCS estimator will price it from those — no site visit needed.";
const SITE_REASON =
  "This job is scoped in person so the quotation is accurate. Send your details through and a CDCS estimator will arrange a walkthrough and follow up with your official quotation.";

const photoAssessment = (reason = PHOTO_REASON, analytics?: EstimateResult["analytics"]): EstimateResult => ({
  kind: "photo_assessment",
  reason,
  analytics: { ...analytics, outcome: "photo_assessment" },
});
const siteAssessment = (reason = SITE_REASON, analytics?: EstimateResult["analytics"]): EstimateResult => ({
  kind: "site_assessment",
  reason,
  analytics: { ...analytics, outcome: "site_assessment" },
});

interface OutOpts {
  lineItems?: EstimateLineItem[];
  addOnsTotal?: number;
  subscriptions?: SubscriptionOption[];
  recurringNote?: string;
  noteExtra?: string;
  headline?: string;
  unitSuffix?: string;
  analytics?: EstimateResult["analytics"];
}

/** Finalize a single-figure estimate with all safety guards. */
function priceOut(amount: number, opts: OutOpts = {}): EstimateResult {
  if (!Number.isFinite(amount) || amount <= 0) return siteAssessment(SITE_REASON, opts.analytics);
  const rounded = roundCommercial(amount);
  if (rounded <= 0) return siteAssessment(SITE_REASON, opts.analytics);
  return {
    kind: "estimated_price",
    amount: rounded,
    subtotalLabel: formatGYD(rounded),
    lineItems: opts.lineItems,
    addOnsTotal: opts.addOnsTotal || undefined,
    subscriptions: opts.subscriptions,
    recurringNote: opts.recurringNote,
    noteExtra: opts.noteExtra,
    headline: opts.headline,
    unitSuffix: opts.unitSuffix,
    analytics: { ...opts.analytics, outcome: "estimated_price" },
  };
}

/** Finalize a range estimate with all safety guards. */
function rangeOut(low: number, high: number, opts: OutOpts = {}): EstimateResult {
  if (!Number.isFinite(low) || !Number.isFinite(high) || high <= 0) {
    return siteAssessment(SITE_REASON, opts.analytics);
  }
  let lo = Math.max(0, Math.min(low, high));
  let hi = Math.max(low, high);
  [lo, hi] = roundRangeBounds(lo, hi);
  if (lo <= 0) lo = roundCommercial(hi * 0.6);
  if (hi <= lo) hi = lo + (lo < 20000 ? 500 : 1000);
  return {
    kind: "estimated_range",
    low: lo,
    high: hi,
    subtotalLabel: `${formatGYD(lo)} – ${formatGYD(hi)}${opts.unitSuffix ? ` ${opts.unitSuffix}` : ""}`,
    lineItems: opts.lineItems,
    addOnsTotal: opts.addOnsTotal || undefined,
    subscriptions: opts.subscriptions,
    recurringNote: opts.recurringNote,
    noteExtra: opts.noteExtra,
    headline: opts.headline,
    unitSuffix: opts.unitSuffix,
    analytics: { ...opts.analytics, outcome: "estimated_range" },
  };
}

/** Clamp a total discount fraction to the configured maximum. */
function cappedDiscount(...fractions: number[]): number {
  const total = fractions.reduce((a, b) => a + (Number.isFinite(b) && b > 0 ? b : 0), 0);
  return Math.min(total, pricing.maxTotalDiscount);
}

// ---------------------------------------------------------------------------
// §2 / §3 / §17 — VEHICLE WASHING (mobile_detailing group)
// ---------------------------------------------------------------------------

function priceVehicleWash(a: AnswerMap, addOns: string[]): EstimateResult {
  const focus = s(a.focusService) || "Full wash / detail";
  const vClass = s(a.vehicleClass);
  const mode = s(a.serviceMode);
  const isWashbay = mode.startsWith("Washbay");
  const analytics = {
    service_mode: isWashbay ? "washbay" : "mobile",
    vehicle_type: vClass || "unspecified",
    subscription_interest: s(a.subscriptionInterest) || "none",
  };

  if (focus !== "Full wash / detail") {
    return priceStandaloneDetail(focus, a, { ...analytics, subscription_interest: "none" });
  }

  const cond = s(a.vehicleCondition);
  if (cond === "Severe") {
    return photoAssessment(
      "Severe condition varies a lot vehicle to vehicle — send a few photos and CDCS will price it from those.",
      analytics,
    );
  }
  if (!vClass || vClass === "Other") {
    return photoAssessment("Send a photo of the vehicle and CDCS will confirm the right price for it.", analytics);
  }

  const pkgKey = s(a.washPackage) === "Exterior only" ? "exterior_only" : "interior_exterior";
  const table = isWashbay ? pricing.washbay : pricing.mobileWash;
  let base = table[pkgKey]?.[vClass];
  // There is no standalone mobile "exterior only" rate. Anchor on the approved
  // washbay exterior-only rate for the class; the 6,000 mobile minimum then
  // applies, so a mobile exterior-only wash still shows a firm figure rather
  // than falling back to an assessment.
  if (base == null && !isWashbay && pkgKey === "exterior_only") {
    base = pricing.washbay.exterior_only[vClass];
  }
  if (base == null) {
    return photoAssessment(
      "CDCS will confirm the exact price for this vehicle and service — send a photo or contact us.",
      analytics,
    );
  }

  const condMult = pricing.vehicleCondition[cond] ?? 1;
  let amount = base * condMult;
  if (!isWashbay) amount = Math.max(amount, pricing.mobileMinimum);
  const washFigure = roundCommercial(amount);

  const lineItems: EstimateLineItem[] = [
    {
      label: `${s(a.washPackage) || "Interior + exterior"} — ${vClass}${
        condMult !== 1 ? ` (+${Math.round((condMult - 1) * 100)}% ${cond})` : ""
      } · ${isWashbay ? "washbay" : "mobile"}`,
      amount: washFigure,
    },
  ];

  // Fixed add-ons — never scaled by condition.
  let addTotal = 0;
  const onRequest: string[] = [];
  const addPrices: Record<string, number | null> = {
    "pet-hair": 3000,
    "odor-treatment": 3000,
    "engine-bay": null,
    undercarriage: null,
    "headlight-restoration": null,
    "buff-polish": null,
  };
  for (const id of addOns) {
    if (!(id in addPrices)) continue;
    const p = addPrices[id];
    if (p == null) {
      onRequest.push(id.replace(/-/g, " "));
    } else {
      addTotal += p;
      lineItems.push({ label: `Add-on: ${id.replace(/-/g, " ")}`, amount: p });
    }
  }
  amount = washFigure + addTotal;

  // Subscriptions — mobile interior+exterior full wash only.
  let subscriptions: SubscriptionOption[] | undefined;
  if (!isWashbay && pkgKey === "interior_exterior") {
    const oneTime = Math.max(base, pricing.mobileMinimum);
    const two = clampSub(oneTime, 2, pricing.subscription.twoPerMonthFactor);
    const four = clampSub(oneTime, 4, pricing.subscription.fourPerMonthFactor);
    subscriptions = [
      { label: "2 washes / month", monthly: two },
      { label: "4 washes / month", monthly: four },
    ];
  }

  const noteExtra = onRequest.length
    ? `Also requested (confirmed with your vehicle): ${onRequest.join(", ")}.`
    : undefined;

  return priceOut(amount, {
    lineItems,
    addOnsTotal: addTotal,
    subscriptions,
    noteExtra,
    analytics,
  });
}

function clampSub(oneTime: number, visits: number, factor: number): number {
  const raw = oneTime * visits * factor;
  const floor = oneTime * visits * pricing.subscription.marginFloorFactor;
  return roundCommercial(Math.max(raw, floor));
}

/**
 * Standalone detailing services (engine wash, undercarriage wash, headlight
 * restoration, buffing & polishing, odor treatment) — approved starting rates
 * with vehicle-size uplift where relevant. Severe / correction-level condition
 * escalates to a photo assessment rather than an uncontrolled multiplier.
 */
function priceStandaloneDetail(focus: string, a: AnswerMap, analytics: EstimateResult["analytics"]): EstimateResult {
  const cfg = pricing.standaloneDetailing[focus];
  const an = { ...analytics, detail_focus: focus.replace(/ only$/, "").toLowerCase() };
  if (!cfg) return photoAssessment(PHOTO_REASON, an);

  const vClass = s(a.vehicleClass);
  const cond = s(a.vehicleCondition);
  const isWashbay = s(a.serviceMode).startsWith("Washbay");
  const name = focus.replace(/ only$/, "");

  // Condition gates — a photo, not a blind multiplier.
  if (cfg.heavyAssessment && (cond === "Heavy" || cond === "Severe")) {
    return photoAssessment(
      "Heavy oxidation, deep scratches, or paint-correction work is quoted from photos first. Buffing improves gloss and reduces light swirl marks — deeper scratches and paint damage are not guaranteed to be removed.",
      an,
    );
  }
  if (cond === "Severe") {
    return photoAssessment(cfg.severeMessage ?? PHOTO_REASON, an);
  }

  // Vehicle-size uplift (engine, bottom, buffing).
  let sizeMult = 1;
  if (cfg.sizeUplift) {
    const m = pricing.detailSizeMultipliers[vClass];
    if (m == null) {
      return photoAssessment("Send a photo of the vehicle and CDCS will confirm the price for it.", an);
    }
    sizeMult = m;
  }

  const condMult = pricing.vehicleCondition[cond] ?? 1; // Normal 1 · Moderate 1.15 · Heavy 1.3
  let amount = cfg.base * sizeMult * condMult;
  if (!isWashbay) amount = Math.max(amount, pricing.mobileMinimum);

  const label = `${name}${cfg.sizeUplift && vClass ? ` — ${vClass}` : ""}${
    condMult !== 1 ? ` (+${Math.round((condMult - 1) * 100)}% ${cond})` : ""
  }`;
  const lineItems: EstimateLineItem[] = [{ label, amount: roundCommercial(amount) }];

  if (cfg.range) {
    return rangeOut(amount, amount * (cfg.rangeFactor ?? 1.3), {
      lineItems,
      noteExtra: cfg.note,
      analytics: an,
    });
  }
  return priceOut(amount, { lineItems, noteExtra: cfg.note, analytics: an });
}

// ---------------------------------------------------------------------------
// §4 / §5 / §6 — FLEET & HEAVY-DUTY (fleet_washing group)
// ---------------------------------------------------------------------------

function fleetBand(size: number) {
  return pricing.fleetQuantityBands.find((b) => size >= b.min && size <= b.max) ?? pricing.fleetQuantityBands[0];
}

function priceFleet(a: AnswerMap): EstimateResult {
  const vClass = s(a.vehicleClass);
  const size = Math.max(1, Math.round(n(a.fleetSize) || 1));
  const band = fleetBand(size);
  const analytics = { vehicle_type: vClass || "unspecified", fleet_quantity_band: band.label };

  if (vClass === "Heavy equipment") return priceHeavyEquipment(a, size, band, analytics);

  if (band.custom) {
    return siteAssessment(
      "A fleet of this size is set up as a custom CDCS Fleet Service Agreement with program pricing — contact CDCS to arrange it.",
      analytics,
    );
  }
  if (!vClass || vClass === "Mixed / other") {
    return siteAssessment("A mixed fleet is priced per vehicle type after a short depot assessment.", analytics);
  }

  const cond = s(a.condition);
  if (cond === "Exceptional / unknown contamination") {
    return siteAssessment(
      "Unusual or unknown contamination is confirmed on inspection before pricing.",
      analytics,
    );
  }

  const scope = s(a.washScope) || "Exterior";
  const perUnitBase = pricing.fleet[vClass]?.[scope];
  if (perUnitBase == null) {
    return siteAssessment("CDCS will confirm the rate for this unit and wash scope at the depot.", analytics);
  }

  const condUplift = pricing.fleetCondition[cond] ?? 0;
  const perUnit = perUnitBase * (1 + condUplift);
  const discount = cappedDiscount(band.discount ?? 0);
  const perUnitAfter = perUnit * (1 - discount);
  const total = perUnitAfter * size;

  const recurring = ["Weekly", "Biweekly", "Monthly"].includes(s(a.frequency))
    ? "Recurring Fleet Program Available — CDCS can prepare a Fleet Service Agreement with scheduled program pricing."
    : undefined;

  const lineItems: EstimateLineItem[] = [
    {
      label: `${scope} — ${vClass}${condUplift ? ` (+${Math.round(condUplift * 100)}% ${cond})` : ""}`,
      amount: roundCommercial(perUnit),
    },
  ];
  if (size > 1) {
    lineItems.push({
      label: `× ${size} units${discount ? ` (−${Math.round(discount * 100)}% volume)` : ""}`,
      amount: roundCommercial(total),
    });
  }

  return priceOut(total, { lineItems, recurringNote: recurring, analytics });
}

function priceHeavyEquipment(
  a: AnswerMap,
  size: number,
  band: ReturnType<typeof fleetBand>,
  analytics: EstimateResult["analytics"],
): EstimateResult {
  const eClass = s(a.equipmentClass);
  if (!eClass || eClass === "Very large mining / construction equipment") {
    return siteAssessment(
      "Large mining and construction equipment is scoped on site — track and undercarriage complexity, grease level, and size are confirmed before pricing.",
      analytics,
    );
  }
  const cond = s(a.condition);
  if (cond === "Exceptional / unknown contamination") {
    return siteAssessment("Unusual contamination on heavy equipment is confirmed on inspection.", analytics);
  }
  const base = pricing.heavyEquipment[eClass];
  if (base == null) return siteAssessment(SITE_REASON, analytics);
  if (band.custom) {
    return siteAssessment("Equipment fleets of this size are set up as a Fleet Service Agreement.", analytics);
  }

  const condUplift = pricing.fleetCondition[cond] ?? 0;
  const discount = cappedDiscount(band.discount ?? 0);
  const perUnit = base * (1 + condUplift) * (1 - discount);
  const total = perUnit * size;
  // Heavy equipment carries real variability — always a range, anchored on the
  // approved starting price.
  return rangeOut(total, total * 1.35, {
    lineItems: [{ label: `${eClass}${size > 1 ? ` × ${size}` : ""} — from`, amount: roundCommercial(total) }],
    analytics,
  });
}

// ---------------------------------------------------------------------------
// §7–§12 — EXTRACTION / UPHOLSTERY / CARPET (carpet_upholstery group)
// ---------------------------------------------------------------------------

function priceExtraction(a: AnswerMap, addOns: string[]): EstimateResult {
  const itemType = s(a.itemType);
  const mode = s(a.serviceMode);
  const isMobile = mode.startsWith("Mobile");
  const cond = s(a.condition);
  const analytics = {
    item_type: itemType || "unspecified",
    service_mode: isMobile ? "mobile" : "dropoff",
  };

  if (cond === "Severe") {
    return photoAssessment(
      "Severe soiling is confirmed from photos before pricing — send a few and CDCS will follow up.",
      analytics,
    );
  }
  if (a.petContamination === true) {
    return photoAssessment(
      "Pet contamination needs a look before we quote the right treatment — a few photos are enough. Severe urine or biological contamination is assessed on site.",
      analytics,
    );
  }

  const condMult = pricing.extractionCondition[cond] ?? 1;

  // --- resolve the base by item type ---
  let base: number | null = null;
  let label = itemType;
  let isFrom = false;
  let forceRange = false;

  if (itemType === "Sofa") {
    const cfg = s(a.sofaConfig);
    base = pricing.sofas[cfg] ?? null;
    label = cfg || "Sofa";
    isFrom = pricing.sofaFrom.has(cfg);
    const qty = Math.max(1, Math.round(n(a.quantity) || 1));
    if (base != null && qty > 1) {
      base *= qty;
      label = `${cfg} × ${qty}`;
    }
    if (s(a.material) && /leather|delicate|silk|antique|suede/i.test(s(a.material))) {
      return photoAssessment(
        "Delicate or unusual materials (leather, silk, suede, antique) are checked from a photo before pricing.",
        analytics,
      );
    }
  } else if (itemType === "Mattress") {
    base = pricing.mattresses[s(a.mattressSize)] ?? null;
    label = `${s(a.mattressSize)} mattress`;
    const qty = Math.max(1, Math.round(n(a.quantity) || 1));
    if (base != null && qty > 1) {
      base *= qty;
      label = `${s(a.mattressSize)} mattress × ${qty}`;
    }
  } else if (itemType === "Armchair / dining chair" || itemType === "Office chair") {
    const t = s(a.chairType) || (itemType === "Office chair" ? "Office chair" : "Dining / standard upholstered chair");
    const each = pricing.chairs[t];
    const qty = Math.max(1, Math.round(n(a.chairQty) || 1));
    if (each == null) return photoAssessment(PHOTO_REASON, analytics);
    if (qty > pricing.chairLargeQtyThreshold) {
      // commercial quantity — modest volume band, always a range, official quote
      const lo = each * qty * (1 - cappedDiscount(0.1));
      const hi = each * qty;
      return rangeOut(lo * condMult, hi * condMult, {
        noteExtra: "Large chair orders are confirmed with an official quotation.",
        lineItems: [{ label: `${qty} × ${t}`, amount: roundCommercial(hi) }],
        analytics,
      });
    }
    base = each * qty;
    label = `${qty} × ${t}`;
  } else if (itemType === "Carpet" || itemType === "Rug") {
    const area = n(a.carpetArea);
    if (area <= 0) {
      return photoAssessment(
        "Tell us the approximate carpet area (sq ft), or send a photo, and CDCS will confirm the price.",
        analytics,
      );
    }
    if (area > pricing.carpet.largeCommercialSqFt) {
      return siteAssessment(
        "Large carpet areas are measured and scoped on site so the quotation is accurate.",
        analytics,
      );
    }
    const rateBand = pricing.carpet.bands.find((b) => area <= b.maxSqFt);
    if (!rateBand) return siteAssessment(SITE_REASON, analytics);
    const rate = rateBand.rate;
    let mult = 1;
    if (s(a.carpetSetting) === "Commercial") mult *= pricing.carpet.commercialUplift;
    if (a.furnitureObstruction === true) mult *= pricing.carpet.obstructionUplift;
    base = area * rate * mult;
    label = `Carpet ${area.toLocaleString("en-US")} sq ft @ ${rate}/sq ft${
      mult !== 1 ? ` (+${Math.round((mult - 1) * 100)}% access/obstruction)` : ""
    }`;
    // carpet always carries condition + spread uncertainty -> range
    forceRange = true;
  } else if (itemType === "Vehicle seats / interior") {
    const pkg = s(a.extractionPackage);
    base = pricing.vehicleExtraction[pkg] ?? null;
    label = pkg || "Vehicle extraction";
    isFrom = pricing.vehicleExtractionFrom.has(pkg);
  }

  if (base == null || !Number.isFinite(base) || base <= 0) {
    return photoAssessment("Send a photo of the item and CDCS will confirm the price.", analytics);
  }

  let amount = base * condMult;
  if (isMobile) amount = Math.max(amount, pricing.mobileMinimum);
  const coreFigure = roundCommercial(amount);

  const lineItems: EstimateLineItem[] = [
    { label: `${label}${condMult !== 1 ? ` (+${Math.round((condMult - 1) * 100)}% ${cond})` : ""}`, amount: coreFigure },
  ];

  // --- extraction add-ons (fixed, not condition-scaled) ---
  let addFixed = 0;
  let rangeSpan = 0;
  const onRequest: string[] = [];
  for (const id of addOns) {
    const spec = pricing.extractionAddOns[id as keyof typeof pricing.extractionAddOns];
    if (spec === undefined) continue;
    if (spec === null) {
      onRequest.push(id.replace(/-/g, " "));
    } else if (typeof spec === "number") {
      addFixed += spec;
      lineItems.push({ label: `Add-on: ${id.replace(/-/g, " ")}`, amount: spec });
    } else {
      // variable range add-on (stain treatment)
      addFixed += spec.min;
      rangeSpan += spec.max - spec.min;
      lineItems.push({ label: `Add-on: ${id.replace(/-/g, " ")}`, amount: spec.min });
    }
  }
  amount = coreFigure + addFixed;

  const disclaimerBits: string[] = [];
  if (addOns.includes("stain-treatment") || a.stains === true) {
    disclaimerBits.push("Stain treatment improves results but complete stain removal cannot be guaranteed.");
  }
  if (onRequest.length) {
    disclaimerBits.push(`Available on request: ${onRequest.join(", ")} (priced with the job).`);
  }
  const noteExtra = disclaimerBits.join(" ") || undefined;

  if (isFrom || forceRange || rangeSpan > 0) {
    const lo = amount;
    const hi = amount + rangeSpan + (isFrom ? amount * 0.35 : 0) + (forceRange ? amount * 0.2 : 0);
    return rangeOut(lo, hi, { lineItems, addOnsTotal: addFixed, noteExtra, analytics });
  }

  return priceOut(amount, { lineItems, addOnsTotal: addFixed, noteExtra, analytics });
}

// ---------------------------------------------------------------------------
// §13 — PRESSURE WASHING (PROVISIONAL — range / assessment only)
// ---------------------------------------------------------------------------

function pricePressure(a: AnswerMap): EstimateResult {
  const surface = s(a.surfaceType);
  const access = s(a.access);
  const cond = s(a.condition);
  const area = n(a.area);
  const analytics = { surface_type: surface || "unspecified" };

  if (surface === "Roof") {
    return siteAssessment(
      "Roof washing is quoted after a site visit — pitch, material fragility, height and access all affect the price and the method.",
      analytics,
    );
  }
  if (access === "Elevated" || access === "Difficult access") {
    return siteAssessment(
      "Elevated or hard-to-access exterior work is quoted after a site visit for safety and accuracy.",
      analytics,
    );
  }
  if (cond === "Heavy algae / mould / oil") {
    return photoAssessment(
      "Heavy algae, mould, or oil staining varies a lot — send a photo and CDCS will price it from that.",
      analytics,
    );
  }
  if (area > pricing.pressure.largeSqFt) {
    return siteAssessment("Large exterior areas are measured on site for an accurate price.", analytics);
  }
  if (area <= 0) {
    return rangeOut(pricing.pressure.minimumMobile, pricing.pressure.minimumMobile * 3, {
      noteExtra: "Give an approximate area (sq ft) for a closer estimate.",
      analytics,
    });
  }

  const band = pricing.pressure.bands.find((b) => area <= b.maxSqFt) ?? pricing.pressure.bands[pricing.pressure.bands.length - 1];
  const uplift = pricing.pressure.conditionUplift[cond] ?? 0;
  const lo = Math.max(pricing.pressure.minimumMobile, band.low * (1 + uplift));
  const hi = band.high * (1 + uplift);
  return rangeOut(lo, hi, {
    lineItems: [{ label: `${surface || "Exterior surface"} ~${area.toLocaleString("en-US")} sq ft${uplift ? ` (${cond})` : ""}`, amount: roundCommercial((lo + hi) / 2) }],
    noteExtra: "Preliminary range — confirmed after CDCS checks surface, water supply and access.",
    analytics,
  });
}

// ---------------------------------------------------------------------------
// §14 — DEEP / RESIDENTIAL CLEANING (PROVISIONAL — range / assessment only)
// ---------------------------------------------------------------------------

function priceDeep(serviceId: string, a: AnswerMap): EstimateResult {
  const propertyType = s(a.propertyType);
  const sqft = n(a.squareFootage);
  const beds = n(a.bedrooms);
  const cond = s(a.condition);
  const isCommercial = propertyType === "Office" || propertyType === "Commercial space";
  const analytics = { property_type: propertyType || "unspecified" };

  if (cond === "Very heavy") {
    return photoAssessment(
      "Very heavy condition is confirmed from photos before pricing — send a few and CDCS will follow up.",
      analytics,
    );
  }

  // Single-room deep cleans (washroom, kitchen) are priced on their own small
  // band, not the whole-home bedroom bands.
  const standalone = pricing.deep.standalone[serviceId];
  if (standalone && !isCommercial) {
    const vacant = a.moveInOut === true || s(a.occupancy) === "Vacant";
    const mult = vacant ? 1 + pricing.deep.vacantUplift : 1;
    return rangeOut(standalone.low * mult, standalone.high * mult, {
      lineItems: [{ label: serviceId === "kitchen-deep" ? "Kitchen deep clean" : "Washroom deep clean", amount: roundCommercial(((standalone.low + standalone.high) / 2) * mult) }],
      noteExtra: "Preliminary range — confirmed after CDCS checks the room, its condition and access.",
      analytics,
    });
  }

  if (isCommercial) {
    if (sqft > 0 && sqft <= pricing.deep.largeSqFt) {
      return rangeOut(
        pricing.deep.bedroomBands[pricing.deep.bedroomBands.length - 1].low,
        pricing.deep.bedroomBands[pricing.deep.bedroomBands.length - 1].high * 1.4,
        { noteExtra: "Commercial deep clean — preliminary range, confirmed on a walkthrough.", analytics },
      );
    }
    return siteAssessment("Commercial deep cleaning is scoped on a walkthrough for an accurate quotation.", analytics);
  }
  if (sqft > pricing.deep.largeSqFt || beds > pricing.deep.largeBeds) {
    return siteAssessment("Large residences are scoped on a walkthrough for an accurate quotation.", analytics);
  }

  const band =
    pricing.deep.bedroomBands.find((b) => (beds || 1) <= b.maxBeds) ??
    pricing.deep.bedroomBands[pricing.deep.bedroomBands.length - 1];
  const vacant = a.moveInOut === true || s(a.occupancy) === "Vacant";
  const mult = vacant ? 1 + pricing.deep.vacantUplift : 1;
  return rangeOut(band.low * mult, band.high * mult, {
    lineItems: [{ label: `${propertyType || "Home"} deep clean${vacant ? " (vacant / move-in-out)" : ""}`, amount: roundCommercial(((band.low + band.high) / 2) * mult) }],
    noteExtra: "Preliminary range — confirmed after CDCS checks condition, access and final scope. Add-ons (windows, cupboards, appliances) quoted with the job.",
    analytics,
  });
}

// ---------------------------------------------------------------------------
// §15 — POST-CONSTRUCTION (PROVISIONAL — small range, else site assessment)
// ---------------------------------------------------------------------------

function pricePostConstruction(a: AnswerMap): EstimateResult {
  const sqft = n(a.squareFootage);
  const floors = n(a.floors);
  const stage = s(a.constructionStage);
  const debris = s(a.debrisLevel);
  const analytics = { stage: stage || "unspecified" };

  const small =
    sqft > 0 &&
    sqft <= pricing.postConstruction.smallMaxSqFt &&
    (floors || 1) <= pricing.postConstruction.smallMaxFloors &&
    stage !== "Rough clean" &&
    debris !== "Very heavy";

  if (!small) {
    return siteAssessment(
      "Post-construction scope depends on site conditions at handover — floor area, debris, residues and finishes are confirmed on inspection before pricing.",
      analytics,
    );
  }
  return rangeOut(pricing.postConstruction.smallBand.low, pricing.postConstruction.smallBand.high, {
    lineItems: [{ label: `${stage} · ~${sqft.toLocaleString("en-US")} sq ft`, amount: roundCommercial((pricing.postConstruction.smallBand.low + pricing.postConstruction.smallBand.high) / 2) }],
    noteExtra: "Preliminary range for a small, predictable final clean — confirmed after CDCS reviews the site.",
    analytics,
  });
}

// ---------------------------------------------------------------------------
// §16 — COMMERCIAL / JANITORIAL — PRICING ENGINE V2
//
// Recurring: base monthly band (by sq ft) applied SEQUENTIALLY / MULTIPLICATIVELY
// by frequency, facility type, washrooms, kitchens, workstations and floors —
// never by adding the percentages together. One-time commercial cleaning is a
// separate track. No promo / subscription / lead-gen discounting.
// ---------------------------------------------------------------------------

const round5k = (x: number): number => Math.round(x / pricing.janitorial.roundTo) * pricing.janitorial.roundTo;

/** Map the existing frequency UI labels onto visits-per-week keys. */
function janitorialFrequencyKey(label: string): string {
  const map: Record<string, string> = {
    Daily: "5x weekly", // every working day
    "1x weekly": "1x weekly",
    "2x weekly": "2x weekly",
    "3x weekly": "3x weekly",
    "4x weekly": "4x weekly",
    "5x weekly": "5x weekly",
    "6x weekly": "6x weekly",
    "7x weekly": "7x weekly",
  };
  return map[label] ?? label;
}

function janitorialSqftBand(sqft: number): string {
  if (sqft <= 0) return "unspecified";
  const b = pricing.janitorial.baseMonthlyBands.find((x) => sqft <= x.maxSqFt);
  return b ? `<=${b.maxSqFt}` : ">15000";
}

function priceJanitorial(a: AnswerMap): EstimateResult {
  const J = pricing.janitorial;
  const sqft = n(a.squareFootage);
  const floors = Math.max(1, Math.round(n(a.floors) || 1));
  const washrooms = Math.round(n(a.washrooms));
  const kitchens = Math.round(n(a.kitchens));
  const workstations = Math.round(n(a.workstations));
  const facilityType = s(a.facilityType);
  const frequency = s(a.frequency);
  const condition = s(a.condition);
  const analytics = {
    facility_type: facilityType || "unspecified",
    frequency: frequency || "unspecified",
    sqft_band: janitorialSqftBand(sqft),
  };

  // --- §L assessment escalation ---
  if (condition === "Very heavy") {
    return siteAssessment(
      "Heavy or unusual contamination in a commercial facility is confirmed on a site walkthrough before pricing.",
      analytics,
    );
  }
  if (floors > J.maxFloors) {
    return siteAssessment(
      "Facilities over 4 floors are scoped on a site walkthrough, and the recurring contract is finalised with an official CDCS quotation.",
      analytics,
    );
  }

  // --- §K one-time commercial cleaning (separate from recurring) ---
  if (frequency === "One time") {
    if (sqft <= 0 || sqft > J.oneTimeMaxSqFt) {
      return siteAssessment(
        "A one-time commercial clean of this size is scoped on a site walkthrough for an official quotation.",
        analytics,
      );
    }
    const otBand = J.oneTimeBands.find((b) => sqft <= b.maxSqFt);
    if (!otBand) return siteAssessment(SITE_REASON, analytics);
    return rangeOut(round5k(otBand.low), round5k(otBand.high), {
      headline: "Preliminary Estimate",
      lineItems: [
        {
          label: `One-time commercial clean · ~${sqft.toLocaleString("en-US")} sq ft`,
          amount: round5k((otBand.low + otBand.high) / 2),
        },
      ],
      noteExtra:
        "One-time commercial clean — not a recurring programme. Preliminary range, confirmed after CDCS reviews the space.",
      analytics,
    });
  }

  // --- recurring programme ---
  if (sqft <= 0) {
    return siteAssessment(
      "Give the approximate facility size, or arrange a walkthrough, for a preliminary monthly estimate.",
      analytics,
    );
  }
  if (sqft > J.maxSqFt) {
    return siteAssessment(
      "Facilities over 15,000 sq ft are scoped on a site walkthrough and an official CDCS quotation. Contact CDCS to arrange it.",
      analytics,
    );
  }
  const band = J.baseMonthlyBands.find((b) => sqft <= b.maxSqFt);
  if (!band) return siteAssessment(SITE_REASON, analytics);

  const freqKey = janitorialFrequencyKey(frequency);
  const freqFactor = J.frequencyFactor[freqKey];
  if (freqFactor == null || freqFactor <= 0) {
    return siteAssessment(
      "Recurring janitorial pricing is built on a walkthrough and finalised with an official CDCS quotation.",
      analytics,
    );
  }
  const facilityFactor = J.facilityFactor[facilityType] ?? 1;

  const scopeNotes: string[] = [];

  // §C washrooms — first 2 included
  let washFactor = 1;
  if (washrooms >= 3 && washrooms <= 4) washFactor = 1.05;
  else if (washrooms >= 5 && washrooms <= 6) washFactor = 1.1;
  else if (washrooms >= 7 && washrooms <= 10) washFactor = 1.15;
  else if (washrooms > 10) {
    washFactor = 1.2;
    scopeNotes.push("Final pricing requires scope confirmation for the number of washrooms.");
  }

  // §D kitchens / breakrooms — first 1 included
  let kitchenFactor = 1;
  if (kitchens === 2) kitchenFactor = 1.03;
  else if (kitchens >= 3 && kitchens <= 4) kitchenFactor = 1.06;
  else if (kitchens >= 5) {
    kitchenFactor = 1.1;
    scopeNotes.push("Scope confirmation is recommended for the number of kitchens / breakrooms.");
  }

  // §E workstations — workload modifier only, up to 20 included
  let wsFactor = 1;
  if (workstations >= 21 && workstations <= 50) wsFactor = 1.03;
  else if (workstations >= 51 && workstations <= 100) wsFactor = 1.06;
  else if (workstations >= 101 && workstations <= 200) wsFactor = 1.1;
  else if (workstations > 200) {
    wsFactor = 1.15;
    scopeNotes.push("A site assessment is recommended for a facility with this many workstations.");
  }

  // §F floors
  const floorFactor = floors <= 1 ? 1 : floors === 2 ? 1.03 : floors === 3 ? 1.06 : 1.1;

  // §H sequential / multiplicative — NOT additive
  const factor = freqFactor * facilityFactor * washFactor * kitchenFactor * wsFactor * floorFactor;
  const lo = round5k(band.low * factor);
  const hi = round5k(band.high * factor);

  // §I / safety — never below the frequency-adjusted base, never broken
  const freqBaseLo = round5k(band.low * freqFactor);
  if (!Number.isFinite(lo) || !Number.isFinite(hi) || lo <= 0 || hi < lo || lo < freqBaseLo) {
    if (!Number.isFinite(lo) || lo <= 0 || hi < lo) return siteAssessment(SITE_REASON, analytics);
  }
  const safeLo = Math.max(lo, freqBaseLo);
  const safeHi = Math.max(hi, safeLo);

  const applied: string[] = [`${freqKey} frequency`];
  if (facilityFactor !== 1) applied.push(`${facilityType.toLowerCase()} facility (+${Math.round((facilityFactor - 1) * 100)}%)`);
  if (washFactor !== 1) applied.push(`washrooms (+${Math.round((washFactor - 1) * 100)}%)`);
  if (kitchenFactor !== 1) applied.push(`kitchens / breakrooms (+${Math.round((kitchenFactor - 1) * 100)}%)`);
  if (wsFactor !== 1) applied.push(`workstations (+${Math.round((wsFactor - 1) * 100)}%)`);
  if (floorFactor !== 1) applied.push(`${floors} floors (+${Math.round((floorFactor - 1) * 100)}%)`);

  return rangeOut(safeLo, safeHi, {
    headline: "Preliminary Monthly Estimate",
    unitSuffix: "/ month",
    lineItems: [
      {
        label: `Recurring programme · ~${sqft.toLocaleString("en-US")} sq ft · ${freqKey}${
          facilityFactor !== 1 ? ` · ${facilityType}` : ""
        }`,
        amount: round5k((safeLo + safeHi) / 2),
      },
    ],
    recurringNote:
      "Recurring janitorial programmes require a site walkthrough and final scope confirmation before an official CDCS quotation or service agreement is issued.",
    noteExtra: [
      "Based on the facility information provided and the selected cleaning frequency.",
      `Applied: ${applied.join(", ")}.`,
      ...scopeNotes,
    ].join(" "),
    analytics,
  });
}

// ---------------------------------------------------------------------------
// Dispatch
// ---------------------------------------------------------------------------

export function computeEstimate(params: {
  serviceId: string;
  group: EstimatorGroupId;
  answers: AnswerMap;
  selectedAddOnIds: string[];
}): EstimateResult {
  const { group, answers, selectedAddOnIds } = params;
  try {
    switch (group) {
      case "mobile_detailing":
        return priceVehicleWash(answers, selectedAddOnIds);
      case "fleet_washing":
        return priceFleet(answers);
      case "carpet_upholstery":
        return priceExtraction(answers, selectedAddOnIds);
      case "pressure_washing":
        return pricePressure(answers);
      case "deep_residential":
        return priceDeep(params.serviceId, answers);
      case "post_construction":
        return pricePostConstruction(answers);
      case "janitorial":
        return priceJanitorial(answers);
      case "custom":
      default:
        return siteAssessment(
          "Custom requirements are always scoped individually so nothing is missed.",
        );
    }
  } catch {
    // Any unexpected failure -> safe assessment, never a broken figure.
    return siteAssessment(SITE_REASON);
  }
}

/**
 * Estimate reference number, e.g. CDCS-EST-20260910-4821.
 */
export function makeEstimateReference(date: Date = new Date()): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  const rand = Math.floor(1000 + Math.random() * 9000);
  return `CDCS-EST-${y}${m}${d}-${rand}`;
}
