// ---------------------------------------------------------------------------
// CDCS estimator — centralized pricing configuration and calculation engine.
//
// ALL prices are maintained here and nowhere else. Every monetary value is in
// Guyanese dollars (GYD) and is a plain whole number (e.g. 25000 -> "GYD $25,000").
//
// IMPORTANT: no real CDCS rates are known yet. Every profile below is set to
// `manualQuoteRequired: true` with null rates, so the estimator produces a
// structured "Site Assessment Required" outcome for every service until
// management supplies figures. The calculation engine is fully implemented and
// will start returning prices/ranges as soon as the nulls are filled in.
//
// To switch a service group on:
//   1. Fill in the rate fields it needs (basePrice, squareFootRate, …).
//   2. Fill in addOnPrices for that group.
//   3. Set manualQuoteRequired: false.
// Per-service tuning (e.g. a different base for "Sofa Cleaning" vs "Carpet
// Cleaning") goes in `serviceOverrides` keyed by the service id.
// ---------------------------------------------------------------------------

import type { EstimatorGroupId } from "./estimator-data";

export const CURRENCY = "GYD";

/** Format a numeric GYD amount as "GYD $25,000". */
export function formatGYD(amount: number): string {
  return `${CURRENCY} $${Math.round(amount).toLocaleString("en-US")}`;
}

export type ConditionKey =
  | "Light"
  | "Moderate"
  | "Heavy"
  | "Very heavy"
  | "Severe"
  | "Light dirt"
  | "Heavy dirt"
  | "Heavy algae / mould / oil";

export interface PricingProfile {
  /** Flat starting price for the job before modifiers. */
  basePrice: number | null;
  /** The job is never quoted below this. */
  minimumCharge: number | null;
  /** Generic per-unit rate (floors, washrooms, workstations…). */
  unitRate: number | null;
  /** Per square foot. */
  squareFootRate: number | null;
  /** Per item / per vehicle / per fleet vehicle. */
  quantityRate: number | null;
  /** Multiplier by vehicle type, e.g. { Car: 1, SUV: 1.2, Truck: 1.8 }. */
  vehicleTypeMultipliers: Record<string, number> | null;
  /** Multiplier by condition answer. */
  conditionMultipliers: Record<string, number> | null;
  /** Fractional discount by frequency answer, e.g. { "5x weekly": 0.15 }. */
  frequencyDiscounts: Record<string, number> | null;
  /** Flat surcharge added by access answer, e.g. { "Difficult access": 15000 }. */
  accessSurcharge: Record<string, number> | null;
  /** Price of each add-on offered for this group (keyed by add-on id). */
  addOnPrices: Record<string, number | null>;
  /**
   * How wide an "estimated range" is around the computed midpoint, as a
   * fraction (0.2 = ±20%). Used when the group produces a range rather than a
   * single figure.
   */
  rangeSpread: number;
  /** These groups always produce a range rather than a fixed price. */
  alwaysRange: boolean;
  /** True for jobs a person must scope regardless of rates. */
  inspectionRequired: boolean;
  /**
   * Master switch. While true, this group ALWAYS returns "site_assessment" and
   * never shows a number. Set false only once real rates are in place.
   */
  manualQuoteRequired: boolean;
}

/** A profile with every rate blank — the starting point for every group. */
function blankProfile(overrides: Partial<PricingProfile> = {}): PricingProfile {
  return {
    basePrice: null,
    minimumCharge: null,
    unitRate: null,
    squareFootRate: null,
    quantityRate: null,
    vehicleTypeMultipliers: null,
    conditionMultipliers: null,
    frequencyDiscounts: null,
    accessSurcharge: null,
    addOnPrices: {},
    rangeSpread: 0.2,
    alwaysRange: true,
    inspectionRequired: false,
    manualQuoteRequired: true,
    ...overrides,
  };
}

/**
 * The single source of truth for estimator pricing. One profile per question
 * group. Every value is a placeholder pending CDCS management input.
 */
export const servicePricingConfig: Record<EstimatorGroupId, PricingProfile> = {
  janitorial: blankProfile({ inspectionRequired: true }),
  deep_residential: blankProfile(),
  post_construction: blankProfile({ inspectionRequired: true }),
  pressure_washing: blankProfile(),
  mobile_detailing: blankProfile({ alwaysRange: false }),
  fleet_washing: blankProfile({ inspectionRequired: true }),
  carpet_upholstery: blankProfile({ alwaysRange: false }),
  custom: blankProfile({ inspectionRequired: true }),
};

/**
 * Optional per-service tuning, layered on top of the group profile. Empty for
 * now; add entries keyed by EstimatorService id when rates differ within a
 * group (e.g. "sofa-cleaning" vs "mattress-cleaning").
 */
export const serviceOverrides: Record<string, Partial<PricingProfile>> = {};

export function getPricingProfile(serviceId: string, group: EstimatorGroupId): PricingProfile {
  const base = servicePricingConfig[group];
  const override = serviceOverrides[serviceId];
  return override ? { ...base, ...override, addOnPrices: { ...base.addOnPrices, ...override.addOnPrices } } : base;
}

// ---------------------------------------------------------------------------
// Calculation engine
// ---------------------------------------------------------------------------

export type EstimateResultKind = "estimated_price" | "estimated_range" | "site_assessment";

export interface EstimateLineItem {
  label: string;
  amount: number;
}

export interface EstimateResult {
  kind: EstimateResultKind;
  /** Present for "estimated_price". */
  amount?: number;
  /** Present for "estimated_range". */
  low?: number;
  high?: number;
  /** Add-on total, when any priced add-ons were selected. */
  addOnsTotal?: number;
  /** Human-readable subtotal string, when a figure is shown. */
  subtotalLabel?: string;
  /** Why a site assessment is needed, when kind is "site_assessment". */
  reason?: string;
  /** Named contributions to the figure, for the result screen. */
  lineItems?: EstimateLineItem[];
}

type AnswerMap = Record<string, string | string[] | number | boolean | undefined>;

const num = (v: unknown): number => {
  const n = typeof v === "number" ? v : parseFloat(String(v ?? ""));
  return Number.isFinite(n) && n >= 0 ? n : 0;
};

/**
 * Conditions that always route to a human even if rates exist — the job is too
 * large, too variable, or too under-specified to price from a web form.
 */
function forcesAssessment(group: EstimatorGroupId, answers: AnswerMap): string | null {
  if (group === "custom") {
    return "Custom requirements are always scoped individually so nothing is missed.";
  }
  const condition = String(answers.condition ?? answers.vehicleCondition ?? "");
  if (condition === "Very heavy" || condition === "Severe") {
    return "Very heavy soiling varies a lot job to job and is confirmed on inspection.";
  }
  if (group === "janitorial") {
    if (num(answers.squareFootage) > 15000 || num(answers.floors) > 3) {
      return "Larger multi-floor facilities are scoped on a walkthrough for an accurate contract price.";
    }
  }
  if (group === "post_construction") {
    return "Post-construction scope depends on site conditions at handover and is confirmed on inspection.";
  }
  if (group === "fleet_washing") {
    if (num(answers.fleetSize) > 10) {
      return "Fleet programs are priced per vehicle type and frequency after a short depot assessment.";
    }
  }
  if (group === "pressure_washing") {
    if (String(answers.access) === "Difficult access" || num(answers.area) > 8000) {
      return "Large or hard-to-access exterior work is quoted after a site visit.";
    }
  }
  if (group === "carpet_upholstery" && answers.petContamination === true) {
    return "Pet contamination is assessed in person so the right treatment is quoted.";
  }
  return null;
}

/**
 * Compute an estimate outcome. Returns "site_assessment" whenever the group is
 * flagged manual, the job forces an assessment, or a rate needed for the maths
 * is missing. Otherwise returns a price or a range.
 */
export function computeEstimate(params: {
  serviceId: string;
  group: EstimatorGroupId;
  answers: AnswerMap;
  selectedAddOnIds: string[];
}): EstimateResult {
  const { serviceId, group, answers, selectedAddOnIds } = params;
  const profile = getPricingProfile(serviceId, group);

  const ASSESSMENT_FALLBACK =
    "CDCS prepares every quotation from confirmed scope and site conditions. Send your details through and an estimator will follow up with your official quotation — usually within one business day.";

  if (profile.manualQuoteRequired) {
    return { kind: "site_assessment", reason: ASSESSMENT_FALLBACK };
  }

  const forced = forcesAssessment(group, answers);
  if (forced) return { kind: "site_assessment", reason: forced };

  // ---- Build the figure from whatever rates the profile provides ----
  const lineItems: EstimateLineItem[] = [];
  let subtotal = 0;

  if (profile.basePrice != null) {
    subtotal += profile.basePrice;
    lineItems.push({ label: "Base service", amount: profile.basePrice });
  }

  const area = num(answers.squareFootage) || num(answers.area);
  if (area > 0) {
    if (profile.squareFootRate == null) {
      return { kind: "site_assessment", reason: ASSESSMENT_FALLBACK };
    }
    const areaCost = area * profile.squareFootRate;
    subtotal += areaCost;
    lineItems.push({ label: `Area (${area.toLocaleString("en-US")} sq ft)`, amount: areaCost });
  }

  const qty = num(answers.quantity) || num(answers.fleetSize);
  if (qty > 0 && profile.quantityRate != null) {
    const qtyCost = qty * profile.quantityRate;
    subtotal += qtyCost;
    lineItems.push({ label: `Quantity (${qty})`, amount: qtyCost });
  }

  // Vehicle-type multiplier
  const vehicleType = String(answers.vehicleType ?? "");
  if (vehicleType && profile.vehicleTypeMultipliers) {
    const m = profile.vehicleTypeMultipliers[vehicleType];
    if (typeof m === "number" && m > 0) subtotal *= m;
  }

  // Condition multiplier
  const conditionKey = String(answers.condition ?? answers.vehicleCondition ?? answers.debrisLevel ?? "");
  if (conditionKey && profile.conditionMultipliers) {
    const m = profile.conditionMultipliers[conditionKey];
    if (typeof m === "number" && m > 0) subtotal *= m;
  }

  // Access surcharge
  const accessKey = String(answers.access ?? "");
  if (accessKey && profile.accessSurcharge) {
    const s = profile.accessSurcharge[accessKey];
    if (typeof s === "number" && s > 0) {
      subtotal += s;
      lineItems.push({ label: `Access (${accessKey})`, amount: s });
    }
  }

  // Frequency discount
  const freqKey = String(answers.frequency ?? "");
  if (freqKey && profile.frequencyDiscounts) {
    const d = profile.frequencyDiscounts[freqKey];
    if (typeof d === "number" && d > 0 && d < 1) {
      const discount = -subtotal * d;
      subtotal += discount;
      lineItems.push({ label: `Frequency discount (${freqKey})`, amount: discount });
    }
  }

  // Add-ons
  let addOnsTotal = 0;
  for (const id of selectedAddOnIds) {
    const price = profile.addOnPrices[id];
    if (price == null) {
      // A selected add-on has no price yet — fall back rather than guess.
      return { kind: "site_assessment", reason: ASSESSMENT_FALLBACK };
    }
    addOnsTotal += price;
  }
  subtotal += addOnsTotal;

  // Guards: nothing to price, or a broken figure -> assessment.
  if (subtotal <= 0 || !Number.isFinite(subtotal)) {
    return { kind: "site_assessment", reason: ASSESSMENT_FALLBACK };
  }

  if (profile.minimumCharge != null) {
    subtotal = Math.max(subtotal, profile.minimumCharge);
  }
  subtotal = Math.round(subtotal);

  if (profile.alwaysRange) {
    const spread = Math.min(Math.max(profile.rangeSpread, 0), 0.9);
    const low = Math.max(profile.minimumCharge ?? 0, Math.round(subtotal * (1 - spread)));
    const high = Math.round(subtotal * (1 + spread));
    return {
      kind: "estimated_range",
      low,
      high,
      addOnsTotal: addOnsTotal || undefined,
      subtotalLabel: `${formatGYD(low)} – ${formatGYD(high)}`,
      lineItems,
    };
  }

  return {
    kind: "estimated_price",
    amount: subtotal,
    addOnsTotal: addOnsTotal || undefined,
    subtotalLabel: formatGYD(subtotal),
    lineItems,
  };
}

/**
 * Estimate reference number, e.g. CDCS-EST-20260910-4821. Generated on the
 * client when the customer reaches the estimate screen.
 */
export function makeEstimateReference(date: Date = new Date()): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  const rand = Math.floor(1000 + Math.random() * 9000);
  return `CDCS-EST-${y}${m}${d}-${rand}`;
}
