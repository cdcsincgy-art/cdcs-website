// Authentic CDCS Inc. project photos, organized by service.
//
// Every image is a real photo of CDCS work, optimized for the web by
// scripts/process-project-images.mjs. `file` is the path under /public with
// no extension; a matching .webp always exists, and .jpg only when
// `fallback` is true (those are used as page heroes via <picture>).
//
// Captions describe only what is visibly evident. No client names, project
// names, dates, values, or quantified results.

export interface ProjectImage {
  /** Path under /public, without extension. */
  file: string;
  /** A .jpg fallback exists alongside the .webp. */
  fallback: boolean;
  width: number;
  height: number;
  alt: string;
  caption: string;
  /** Slug of the service this belongs to (links to /services/<slug>/). */
  service: string;
  /** Image is a single side-by-side before/after composite (left = before). */
  beforeAfter?: boolean;
  /** If set, this image is the hero for that service page. */
  heroForService?: string;
}

export interface ProjectCategory {
  slug: string;          // anchor + maps to service slug
  title: string;
  service: string;       // service page slug
  blurb: string;
  images: ProjectImage[];
}

const P = "/images/projects";

export const projectCategories: ProjectCategory[] = [
  {
    slug: "commercial-janitorial-cleaning",
    title: "Commercial & Janitorial Cleaning",
    service: "commercial-janitorial-cleaning",
    blurb:
      "Office, facility, and janitorial cleaning for businesses and institutions in Georgetown and across Guyana — floors, restrooms, glass, and common areas.",
    images: [
      {
        file: `${P}/commercial-cleaning/commercial-cleaning-facility-interior`,
        fallback: true,
        width: 1600,
        height: 900,
        alt: "CDCS cleaning team mopping the floor and cleaning windows inside a large commercial building in Guyana",
        caption: "Floor care and window cleaning in a newly finished commercial space.",
        service: "commercial-janitorial-cleaning",
        heroForService: "commercial-facility-cleaning",
      },
      {
        file: `${P}/commercial-cleaning/janitorial-restroom-cleaning`,
        fallback: true,
        width: 1100,
        height: 1467,
        alt: "A CDCS worker cleaning the tiled floor of a commercial restroom",
        caption: "Restroom cleaning during a recurring janitorial program.",
        service: "commercial-janitorial-cleaning",
        heroForService: "deep-cleaning",
      },
      {
        file: `${P}/commercial-cleaning/commercial-cleaning-staircase`,
        fallback: true,
        width: 1200,
        height: 1600,
        alt: "Two CDCS team members cleaning a commercial staircase and stainless steel handrail",
        caption: "Cleaning a stairwell and handrails on a commercial site.",
        service: "commercial-janitorial-cleaning",
        heroForService: "commercial-janitorial-cleaning",
      },
      {
        file: `${P}/commercial-cleaning/commercial-window-cleaning-glass-facade`,
        fallback: true,
        width: 1100,
        height: 1956,
        alt: "A CDCS worker cleaning the full-height glass facade of a commercial building in Guyana",
        caption: "Cleaning a full-height glass facade on a commercial building.",
        service: "commercial-janitorial-cleaning",
        heroForService: "post-construction-cleaning",
      },
      {
        file: `${P}/commercial-cleaning/commercial-exterior-window-cleaning`,
        fallback: true,
        width: 1100,
        height: 1467,
        alt: "A CDCS worker on a ladder cleaning the exterior windows of a two-storey commercial building",
        caption: "Exterior window cleaning from a ladder.",
        service: "commercial-janitorial-cleaning",
      },
    ],
  },
  {
    slug: "pressure-washing",
    title: "Pressure Washing",
    service: "pressure-washing",
    blurb:
      "Exterior pressure washing for commercial buildings, walls, walkways, and concrete surfaces across Guyana.",
    images: [
      {
        file: `${P}/pressure-washing/pressure-washing-commercial-building`,
        fallback: true,
        width: 1100,
        height: 1593,
        alt: "A CDCS worker pressure washing the exterior of a two-storey commercial building in Guyana at dusk",
        caption: "Washing the eaves and upper exterior of a commercial building.",
        service: "pressure-washing",
        heroForService: "pressure-washing",
      },
      {
        file: `${P}/pressure-washing/pressure-washing-building-exterior`,
        fallback: false,
        width: 1100,
        height: 1623,
        alt: "A CDCS worker on a ladder pressure washing the exterior wall and windows of a building",
        caption: "Pressure washing an exterior wall and windows from a ladder.",
        service: "pressure-washing",
      },
      {
        file: `${P}/pressure-washing/pressure-washing-roadside-wall`,
        fallback: false,
        width: 1100,
        height: 1613,
        alt: "A CDCS worker pressure washing a boundary wall beside a road in Guyana, with a pressure washer on the ground",
        caption: "Pressure washing a roadside boundary wall.",
        service: "pressure-washing",
      },
      {
        file: `${P}/pressure-washing/pressure-washing-concrete-surface-cleaner`,
        fallback: false,
        width: 1100,
        height: 1584,
        alt: "A rotary surface cleaner pressure washing a large concrete slab, with a cleaned strip showing against the grimy surface",
        caption: "Cleaning a concrete slab with a rotary surface cleaner.",
        service: "pressure-washing",
      },
    ],
  },
  {
    slug: "fleet-washing",
    title: "Fleet Washing",
    service: "fleet-washing",
    blurb:
      "On-site washing for trucks, trailers, and commercial vehicles at depots and yards in Guyana.",
    images: [
      {
        file: `${P}/fleet-washing/fleet-washing-truck-covered-in-foam`,
        fallback: true,
        width: 1200,
        height: 1594,
        alt: "A commercial truck cab covered in cleaning foam during a CDCS fleet wash in Guyana",
        caption: "A truck cab under a full coat of cleaning foam.",
        service: "fleet-washing",
        heroForService: "fleet-washing",
      },
      {
        file: `${P}/fleet-washing/fleet-washing-truck-front-wash`,
        fallback: false,
        width: 1100,
        height: 1563,
        alt: "A CDCS worker cleaning the front of a commercial truck at a fleet yard in Guyana",
        caption: "Hand-cleaning the front of a truck at a fleet yard.",
        service: "fleet-washing",
      },
      {
        file: `${P}/fleet-washing/fleet-washing-equipment-yard`,
        fallback: false,
        width: 707,
        height: 445,
        alt: "Two CDCS workers in high-visibility vests washing a trailer and lifting equipment at an industrial yard in Guyana",
        caption: "Washing a trailer and lifting equipment at an industrial site.",
        service: "fleet-washing",
      },
      {
        file: `${P}/fleet-washing/fleet-washing-flatbed-trailer`,
        fallback: false,
        width: 594,
        height: 960,
        alt: "Cleaning foam on the wheels and deck of a flatbed trailer during a CDCS fleet wash",
        caption: "Foam on the wheels of a flatbed trailer mid-wash.",
        service: "fleet-washing",
      },
    ],
  },
  {
    slug: "mobile-detailing",
    title: "Mobile Detailing",
    service: "mobile-detailing",
    blurb:
      "Interior and exterior vehicle detailing — carpets, seats, engine bays, headlights, and paintwork.",
    images: [
      {
        file: `${P}/mobile-detailing/mobile-detailing-vehicle-interior-seats-out`,
        fallback: true,
        width: 1200,
        height: 1730,
        alt: "A car interior with the seats removed for a full extraction clean during a CDCS detailing service",
        caption: "Seats out for a full interior extraction clean.",
        service: "mobile-detailing",
        heroForService: "mobile-detailing",
      },
      {
        file: `${P}/mobile-detailing/mobile-detailing-vehicle-interior-cleaned`,
        fallback: false,
        width: 1200,
        height: 1782,
        alt: "The cleaned interior of a sedan with the seats refitted after a CDCS detailing service",
        caption: "The same interior, cleaned and refitted.",
        service: "mobile-detailing",
      },
      {
        file: `${P}/mobile-detailing/mobile-detailing-exterior-paint-before-after`,
        fallback: false,
        width: 860,
        height: 425,
        alt: "A car's front wing before and after exterior detailing by CDCS — duller on the left, glossier on the right",
        caption: "Exterior paintwork, before (left) and after (right).",
        service: "mobile-detailing",
        beforeAfter: true,
      },
      {
        file: `${P}/mobile-detailing/mobile-detailing-headlight-before-after`,
        fallback: false,
        width: 876,
        height: 419,
        alt: "A vehicle headlight lens before and after cleaning during a detailing service — cloudy on the left, clear on the right",
        caption: "A headlight lens, before (left) and after (right).",
        service: "mobile-detailing",
        beforeAfter: true,
      },
      {
        file: `${P}/mobile-detailing/mobile-detailing-engine-bay-before-after`,
        fallback: false,
        width: 879,
        height: 440,
        alt: "An engine bay before and after cleaning during a CDCS detailing service — dusty on the left, clean on the right",
        caption: "An engine bay, before (left) and after (right).",
        service: "mobile-detailing",
        beforeAfter: true,
      },
    ],
  },
  {
    slug: "upholstery-fabric-extraction",
    title: "Upholstery & Fabric Extraction",
    service: "upholstery-fabric-extraction",
    blurb:
      "Extraction and steam cleaning for car seats, office chairs, carpets, and fabric surfaces.",
    images: [
      {
        file: `${P}/upholstery-extraction/upholstery-extraction-car-seat-before-after`,
        fallback: true,
        width: 1100,
        height: 1097,
        alt: "A soiled car seat before and after fabric extraction cleaning by CDCS — heavily stained on the left, clean on the right",
        caption: "Car seat fabric, before (left) and after (right) extraction cleaning.",
        service: "upholstery-fabric-extraction",
        beforeAfter: true,
      },
      {
        file: `${P}/upholstery-extraction/upholstery-extraction-cleaning-wand`,
        fallback: true,
        width: 1100,
        height: 1273,
        alt: "A CDCS worker running an extraction cleaning tool over a car seat, with a cleaned band showing on the fabric",
        caption: "Extracting dirt from a car seat with a cleaning wand.",
        service: "upholstery-fabric-extraction",
        heroForService: "upholstery-fabric-extraction",
      },
      {
        file: `${P}/upholstery-extraction/upholstery-extraction-seat-cleaned`,
        fallback: false,
        width: 1100,
        height: 1273,
        alt: "A cleaned two-tone car seat after fabric extraction cleaning by CDCS",
        caption: "A car seat after extraction cleaning.",
        service: "upholstery-fabric-extraction",
      },
    ],
  },
];

/** All project images for a given service slug (empty if none). */
export function projectImagesForService(slug: string): ProjectImage[] {
  return projectCategories.find((c) => c.service === slug)?.images ?? [];
}

/** Look up a category (and its display title) by the service slug it covers. */
export function categoryForService(slug: string): ProjectCategory | undefined {
  return projectCategories.find((c) => c.service === slug);
}

/** A short, human category label for an image, from its service slug. */
export function categoryLabel(image: ProjectImage): string {
  return categoryForService(image.service)?.title ?? "CDCS Project";
}

/** Find one image anywhere in the catalogue by the tail of its file path. */
function pick(endsWith: string): ProjectImage {
  for (const c of projectCategories) {
    const hit = c.images.find((i) => i.file.endsWith(endsWith));
    if (hit) return hit;
  }
  throw new Error(`No project image ending in "${endsWith}"`);
}

/** The wide commercial-cleaning shot used as the homepage hero and About photo. */
export const homepageHeroImage: ProjectImage = pick("commercial-cleaning-facility-interior");

/** A commercial-cleaning shot for the About page (not used as a page hero). */
export const aboutImage: ProjectImage = pick("commercial-exterior-window-cleaning");

/** Operational photo shown beside the homepage / About "how we operate" copy. */
export const operatingStandardsImage: ProjectImage = pick("commercial-cleaning-staircase");

/** The designated hero image for a service page, or null. */
export function serviceHeroImage(slug: string): ProjectImage | null {
  for (const c of projectCategories) {
    const hit = c.images.find((img) => img.heroForService === slug);
    if (hit) return hit;
  }
  return null;
}

/** Project images for a service page's gallery (excludes its own hero). */
export function serviceGalleryImages(slug: string): ProjectImage[] {
  return projectImagesForService(slug).filter((img) => img.heroForService !== slug);
}

/**
 * Curated set for the homepage "Our Work" editorial grid — one strong photo per
 * service line, shown with an overlaid category label. None is the homepage
 * hero, the operating-standards photo, or a before/after composite (those need
 * to be shown uncropped, which the grid can't guarantee).
 */
export const homepageProjectImages: ProjectImage[] = [
  pick("commercial-window-cleaning-glass-facade"),
  pick("pressure-washing-commercial-building"),
  pick("fleet-washing-truck-covered-in-foam"),
  pick("mobile-detailing-vehicle-interior-seats-out"),
  pick("upholstery-extraction-cleaning-wand"),
  pick("janitorial-restroom-cleaning"),
];
