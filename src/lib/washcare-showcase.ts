// Live example pricing for the /washcare/ marketing page. Every figure here is
// produced by calling the SAME approved pricing engine the estimator uses
// (computeEstimate -> priceWashCareVehicle / priceWashCareFleet in
// estimator-pricing.ts) with representative, realistic inputs. Nothing here
// is a second pricing system or a hard-coded number — if the underlying
// WashCare configuration ever changes, these figures change with it
// automatically, and the estimator remains the single source of truth for an
// individual customer's exact plan.

import { computeEstimate, formatGYD, pricing } from "./estimator-pricing";

export interface WashCareFigure {
  /** Formatted monthly figure, e.g. "GYD $21,000 / month" or a range. */
  formatted: string;
  /** Representative monthly amount (the low end for a range) — for display only. */
  monthly: number;
  savingPct?: number;
  visits: number;
  /** True if the engine routed this combination to a site/photo assessment
   *  instead of a figure (e.g. an unsupported input) — should not happen for
   *  the curated examples below, but guards against silently showing "$0". */
  assessmentOnly: boolean;
}

function toFigure(result: ReturnType<typeof computeEstimate>): WashCareFigure {
  if (result.kind === "estimated_price" && result.amount != null) {
    return {
      formatted: `${formatGYD(result.amount)} / month`,
      monthly: result.amount,
      savingPct: result.washcare?.savingPct,
      visits: result.washcare?.visits ?? 0,
      assessmentOnly: false,
    };
  }
  if (result.kind === "estimated_range" && result.low != null && result.high != null) {
    return {
      formatted: `${formatGYD(result.low)} – ${formatGYD(result.high)} / month`,
      monthly: result.low,
      savingPct: result.washcare?.savingPct,
      visits: result.washcare?.visits ?? 0,
      assessmentOnly: false,
    };
  }
  return { formatted: "Custom quote", monthly: 0, visits: 0, assessmentOnly: true };
}

/** WashCare Bay — drop-off at the CDCS washbay. Interior + exterior, normal condition. */
export function bayExample(vehicleClass: string, frequency: string): WashCareFigure {
  return toFigure(
    computeEstimate({
      serviceId: "mobile-detailing",
      group: "mobile_detailing",
      answers: {
        serviceMode: "Washbay (drop-off at CDCS)",
        vehicleClass,
        washPackage: "Interior + exterior",
        vehicleCondition: "Normal",
        planType: "WashCare recurring plan",
        washcareFrequency: frequency,
      },
      selectedAddOnIds: [],
    }),
  );
}

/** WashCare Mobile — CDCS comes to the customer. Interior + exterior, normal condition. */
export function mobileExample(vehicleClass: string, frequency: string): WashCareFigure {
  return toFigure(
    computeEstimate({
      serviceId: "mobile-detailing",
      group: "mobile_detailing",
      answers: {
        serviceMode: "Mobile (we come to you)",
        vehicleClass,
        washPackage: "Interior + exterior",
        vehicleCondition: "Normal",
        planType: "WashCare recurring plan",
        washcareFrequency: frequency,
      },
      selectedAddOnIds: [],
    }),
  );
}

/** WashCare Fleet — illustrative example for a fleet of a given size and vehicle type. */
export function fleetExample(
  vehicleClass: string,
  fleetSize: number,
  frequency: string,
  washScope = "Exterior",
): WashCareFigure {
  return toFigure(
    computeEstimate({
      serviceId: "fleet-washing",
      group: "fleet_washing",
      answers: {
        vehicleClass,
        washScope,
        fleetSize,
        condition: "Normal operating dirt",
        washFrequency: frequency,
      },
      selectedAddOnIds: [],
    }),
  );
}

// Config values read straight from the approved engine — never re-typed as a
// marketing number. If the cap or the fleet custom-agreement threshold ever
// changes, this page updates with it.
export const washcareCapPct = Math.round(pricing.washcare.cap * 100);
export const fleetCustomAgreementThreshold =
  pricing.fleetQuantityBands.find((b) => b.custom)?.min ?? 21;

export const bayFrequencies = Object.keys(pricing.washcare.bay);
export const mobileFrequencies = Object.keys(pricing.washcare.mobile);
export const fleetFrequencies = Object.keys(pricing.washcare.fleet);
