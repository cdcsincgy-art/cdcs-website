/**
 * One-off: turn the raw authentic CDCS project photos in public/images/ into a
 * clean, optimized, web-ready library under public/images/projects/.
 *
 *   node scripts/process-project-images.mjs
 *
 * - Crops out phone / Instagram UI chrome where present (screenshots, video frames).
 * - Resizes to sensible web dimensions (no upscaling), preserves aspect ratio.
 * - Writes .webp everywhere, plus a .jpg fallback for images used as page heroes.
 * The raw IMG_*.jpeg originals are NOT committed.
 */
import sharp from "sharp";
import { mkdirSync } from "node:fs";
import { join, dirname } from "node:path";

const SRC = "public/images";
const OUT = "public/images/projects";

// trim = fractions of width/height to crop from each edge (removes UI chrome)
// maxW = longest-edge target for the web version
// jpg  = also emit a .jpg fallback (image is used as a page hero -> <picture>)
// q    = webp quality override
const jobs = [
  // ---- Commercial & Janitorial Cleaning ----
  { in: "IMG_2759.jpeg", out: "commercial-cleaning/commercial-cleaning-facility-interior", maxW: 1600, jpg: true },
  { in: "IMG_2762.jpeg", out: "commercial-cleaning/janitorial-restroom-cleaning", maxW: 1100, jpg: true },
  { in: "IMG_2761.jpeg", out: "commercial-cleaning/commercial-cleaning-staircase", maxW: 1200, jpg: true },
  { in: "IMG_2763.jpeg", out: "commercial-cleaning/commercial-window-cleaning-glass-facade", maxW: 1100, jpg: true },
  { in: "IMG_2765.jpeg", out: "commercial-cleaning/commercial-exterior-window-cleaning", maxW: 1100, jpg: true },

  // ---- Pressure Washing ----
  { in: "IMG_2868.jpeg", out: "pressure-washing/pressure-washing-commercial-building", maxW: 1100, jpg: true,
    trim: { top: 0.03, bottom: 0.06 } },
  { in: "IMG_2863.jpeg", out: "pressure-washing/pressure-washing-building-exterior", maxW: 1100,
    trim: { top: 0.03, bottom: 0.06 } },
  { in: "IMG_2869.jpeg", out: "pressure-washing/pressure-washing-roadside-wall", maxW: 1100,
    trim: { top: 0.03, bottom: 0.06 } },
  { in: "IMG_2870.jpeg", out: "pressure-washing/pressure-washing-concrete-surface-cleaner", maxW: 1100,
    trim: { top: 0.02, bottom: 0.06 } },

  // ---- Fleet Washing ----
  { in: "IMG_2872.jpeg", out: "fleet-washing/fleet-washing-truck-covered-in-foam", maxW: 1200, jpg: true },
  { in: "IMG_2871.jpeg", out: "fleet-washing/fleet-washing-truck-front-wash", maxW: 1100,
    trim: { top: 0.05, bottom: 0.065 } },
  { in: "IMG_0404.jpeg", out: "fleet-washing/fleet-washing-equipment-yard", maxW: 1000,
    trim: { top: 0.33, bottom: 0.38 } },
  { in: "IMG_0425.jpeg", out: "fleet-washing/fleet-washing-flatbed-trailer", maxW: 820,
    trim: { top: 0.135, bottom: 0.24, left: 0.02, right: 0.14 } },

  // ---- Mobile Detailing ----
  { in: "IMG_2873.jpeg", out: "mobile-detailing/mobile-detailing-vehicle-interior-seats-out", maxW: 1200, jpg: true },
  { in: "IMG_2874.jpeg", out: "mobile-detailing/mobile-detailing-vehicle-interior-cleaned", maxW: 1200 },
  { in: "IMG_2880.jpeg", out: "mobile-detailing/mobile-detailing-engine-bay-before-after", maxW: 1000 },
  { in: "IMG_2879.jpeg", out: "mobile-detailing/mobile-detailing-headlight-before-after", maxW: 1000 },
  { in: "IMG_2878.jpeg", out: "mobile-detailing/mobile-detailing-exterior-paint-before-after", maxW: 1000 },

  // ---- Upholstery & Fabric Extraction ----
  { in: "IMG_2877.jpeg", out: "upholstery-extraction/upholstery-extraction-car-seat-before-after", maxW: 1100, jpg: true, q: 62 },
  { in: "IMG_2875.jpeg", out: "upholstery-extraction/upholstery-extraction-cleaning-wand", maxW: 1100, jpg: true,
    trim: { top: 0.075 } },
  { in: "IMG_2876.jpeg", out: "upholstery-extraction/upholstery-extraction-seat-cleaned", maxW: 1100,
    trim: { top: 0.075 } },
];

let totalBytes = 0;
for (const job of jobs) {
  const srcPath = join(SRC, job.in);
  const meta = await sharp(srcPath).rotate().metadata();
  const t = job.trim || {};
  const left = Math.round((t.left || 0) * meta.width);
  const right = Math.round((t.right || 0) * meta.width);
  const top = Math.round((t.top || 0) * meta.height);
  const bottom = Math.round((t.bottom || 0) * meta.height);
  const region = { left, top, width: meta.width - left - right, height: meta.height - top - bottom };

  const pipeline = () =>
    sharp(srcPath)
      .rotate()
      .extract(region)
      .resize({ width: Math.min(job.maxW, region.width), withoutEnlargement: true });

  mkdirSync(join(OUT, dirname(job.out)), { recursive: true });

  const webpBuf = await pipeline().webp({ quality: job.q ?? 78 }).toBuffer();
  await sharp(webpBuf).toFile(join(OUT, job.out + ".webp"));
  const wm = await sharp(webpBuf).metadata();
  totalBytes += webpBuf.length;
  let line = `${job.out}.webp  ${wm.width}x${wm.height}  ${(webpBuf.length / 1024).toFixed(0)}KB`;

  if (job.jpg) {
    const jpgBuf = await pipeline().jpeg({ quality: 80, mozjpeg: true }).toBuffer();
    await sharp(jpgBuf).toFile(join(OUT, job.out + ".jpg"));
    totalBytes += jpgBuf.length;
    line += `  (+jpg ${(jpgBuf.length / 1024).toFixed(0)}KB)`;
  }
  console.log(line);
}
console.log(`\n${jobs.length} images -> ${(totalBytes / 1024 / 1024).toFixed(2)}MB total`);
