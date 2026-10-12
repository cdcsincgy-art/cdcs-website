/**
 * One-off: turn the raw authentic CDCS project photos in public/images/ into a
 * clean, optimized, web-ready library under public/images/projects/.
 *
 *   node scripts/process-project-images.mjs
 *
 * - Crops out phone / Instagram UI chrome where present (screenshots, video frames).
 * - Resizes to sensible web dimensions (no upscaling), preserves aspect ratio.
 * - Writes .webp everywhere, plus a .jpg fallback for images used as page heroes,
 * and optional smaller responsive .webp variants (`widths`).
 * - Optional `blur` regions (e.g. staff name badges) and an exact `crop`.
 * Raw originals are read from source-photos/ (git-ignored, outside /public).
 */
import sharp from "sharp";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join, dirname } from "node:path";

// Raw originals live OUTSIDE /public (git-ignored) so they can never be
// deployed or copied into out/ — see .gitignore.
const SRC = "source-photos";
const OUT = "public/images/projects";
// Jobs marked `staging: true` (client approval pending) are written outside
// /public so they can never be deployed — see scripts/pending-assets.json.
const STAGING_OUT = "staging/images/projects";

// trim = fractions of width/height to crop from each edge (removes UI chrome)
// maxW = longest-edge target for the web version
// jpg  = also emit a .jpg fallback (image is used as a page hero -> <picture>)
// q    = webp quality override
const jobs = [
  // ---- Commercial & Janitorial Cleaning ----
  { in: "IMG_2759.jpeg", out: "commercial-cleaning/commercial-cleaning-facility-interior", maxW: 1600, widths: [480, 960], jpg: true },
  { in: "IMG_2762.jpeg", out: "commercial-cleaning/janitorial-restroom-cleaning", maxW: 1100, widths: [480, 800], jpg: true },
  { in: "IMG_2761.jpeg", out: "commercial-cleaning/commercial-cleaning-staircase", maxW: 1200, widths: [480, 800], jpg: true },
  { in: "IMG_2763.jpeg", out: "commercial-cleaning/commercial-window-cleaning-glass-facade", maxW: 1100, widths: [480, 800], jpg: true },
  { in: "IMG_2765.jpeg", out: "commercial-cleaning/commercial-exterior-window-cleaning", maxW: 1100, jpg: true },

  // ---- Pressure Washing ----
  { in: "IMG_2868.jpeg", out: "pressure-washing/pressure-washing-commercial-building", maxW: 1100, widths: [480, 800], jpg: true,
    trim: { top: 0.03, bottom: 0.06 } },
  { in: "IMG_2863.jpeg", out: "pressure-washing/pressure-washing-building-exterior", maxW: 1100,
    trim: { top: 0.03, bottom: 0.06 } },
  { in: "IMG_2869.jpeg", out: "pressure-washing/pressure-washing-roadside-wall", maxW: 1100,
    trim: { top: 0.03, bottom: 0.06 } },
  { in: "IMG_2870.jpeg", out: "pressure-washing/pressure-washing-concrete-surface-cleaner", maxW: 1100,
    trim: { top: 0.02, bottom: 0.06 } },

  // ---- Fleet Washing ----
  { in: "IMG_2872.jpeg", out: "fleet-washing/fleet-washing-truck-covered-in-foam", maxW: 1200, widths: [480, 800], jpg: true },
  { in: "IMG_2871.jpeg", out: "fleet-washing/fleet-washing-truck-front-wash", maxW: 1100,
    trim: { top: 0.05, bottom: 0.065 } },
  { in: "IMG_0404.jpeg", out: "fleet-washing/fleet-washing-equipment-yard", maxW: 1000,
    trim: { top: 0.33, bottom: 0.38 } },
  { in: "IMG_0425.jpeg", out: "fleet-washing/fleet-washing-flatbed-trailer", maxW: 820,
    trim: { top: 0.135, bottom: 0.24, left: 0.02, right: 0.14 } },
  { in: "IMG_0400.jpeg", out: "fleet-washing/fleet-washing-prime-movers-yard", maxW: 820,
    trim: { top: 0.2, bottom: 0.34 } },
  { in: "IMG_0422.jpeg", out: "fleet-washing/heavy-equipment-excavator-cab-cleaning", maxW: 820,
    trim: { top: 0.118, bottom: 0.39 } },

  // ---- Mobile Detailing ----
  { in: "IMG_2873.jpeg", out: "mobile-detailing/mobile-detailing-vehicle-interior-seats-out", maxW: 1200, widths: [480, 800], jpg: true },
  { in: "IMG_2874.jpeg", out: "mobile-detailing/mobile-detailing-vehicle-interior-cleaned", maxW: 1200, widths: [480, 800] },
  { in: "IMG_2880.jpeg", out: "mobile-detailing/mobile-detailing-engine-bay-before-after", maxW: 1000 },
  { in: "IMG_2879.jpeg", out: "mobile-detailing/mobile-detailing-headlight-before-after", maxW: 1000 },
  { in: "IMG_2878.jpeg", out: "mobile-detailing/mobile-detailing-exterior-paint-before-after", maxW: 1000 },

  // ---- Upholstery & Fabric Extraction ----
  { in: "IMG_2877.jpeg", out: "upholstery-extraction/upholstery-extraction-car-seat-before-after", maxW: 1100, jpg: true, q: 62 },
  { in: "IMG_2875.jpeg", out: "upholstery-extraction/upholstery-extraction-cleaning-wand", maxW: 1100, widths: [480, 800], jpg: true,
    trim: { top: 0.075 } },
  { in: "IMG_2876.jpeg", out: "upholstery-extraction/upholstery-extraction-seat-cleaned", maxW: 1100,
    trim: { top: 0.075 } },

];

// Jobs for content awaiting client approval are NOT in this repository (it is
// public): they are read from the local, git-ignored staging/pending-content.json
// when present, and always write into staging/ (never /public).
const PENDING = "staging/pending-content.json";
if (existsSync(PENDING)) {
  const extra = JSON.parse(readFileSync(PENDING, "utf8")).imageJobs ?? [];
  jobs.push(...extra.map((j) => ({ ...j, staging: true })));
}

// Optional: pass source filenames to process only those, e.g.
//   node scripts/process-project-images.mjs IMG_0400.jpeg IMG_0422.jpeg
const only = process.argv.slice(2);
const selected = only.length ? jobs.filter((j) => only.includes(j.in)) : jobs;

let totalBytes = 0;
for (const job of selected) {
  const srcPath = join(SRC, job.in);
  // Upright, full-resolution source; blur regions (in upright pixel
  // coordinates) are applied here, before any crop or resize.
  let source = await sharp(srcPath).rotate().png().toBuffer();
  if (job.blur?.length) {
    const patches = [];
    for (const b of job.blur) {
      const { sigma = 14, ...rect } = b;
      patches.push({ input: await sharp(source).extract(rect).blur(sigma).toBuffer(), left: rect.left, top: rect.top });
    }
    source = await sharp(source).composite(patches).png().toBuffer();
  }
  const meta = await sharp(source).metadata();
  const t = job.trim || {};
  const left = Math.round((t.left || 0) * meta.width);
  const right = Math.round((t.right || 0) * meta.width);
  const top = Math.round((t.top || 0) * meta.height);
  const bottom = Math.round((t.bottom || 0) * meta.height);
  // crop = exact pixel region (upright coordinates); trim = edge fractions.
  const region = job.crop ?? { left, top, width: meta.width - left - right, height: meta.height - top - bottom };

  const pipeline = (maxW = job.maxW) =>
    sharp(source)
      .extract(region)
      .resize({ width: Math.min(maxW, region.width), withoutEnlargement: true });

  const OUT_DIR = job.staging ? STAGING_OUT : OUT;
  mkdirSync(join(OUT_DIR, dirname(job.out)), { recursive: true });

  const webpBuf = await pipeline().webp({ quality: job.q ?? 78 }).toBuffer();
  writeFileSync(join(OUT_DIR, job.out + ".webp"), webpBuf);
  const wm = await sharp(webpBuf).metadata();
  totalBytes += webpBuf.length;
  let line = `${job.out}.webp  ${wm.width}x${wm.height}  ${(webpBuf.length / 1024).toFixed(0)}KB`;

  // Smaller responsive variants, <out>-<w>.webp — list the same widths in
  // the image's `widths` field in src/lib/project-images.ts.
  for (const w of job.widths ?? []) {
    if (w >= wm.width) continue;
    const buf = await pipeline(w).webp({ quality: job.q ?? 78 }).toBuffer();
    writeFileSync(join(OUT_DIR, `${job.out}-${w}.webp`), buf);
    totalBytes += buf.length;
    line += `  [${w}w ${(buf.length / 1024).toFixed(0)}KB]`;
  }

  if (job.jpg) {
    const jpgBuf = await pipeline().jpeg({ quality: 80, mozjpeg: true }).toBuffer();
    writeFileSync(join(OUT_DIR, job.out + ".jpg"), jpgBuf);
    totalBytes += jpgBuf.length;
    line += `  (+jpg ${(jpgBuf.length / 1024).toFixed(0)}KB)`;
  }
  console.log(line);
}
console.log(`\n${selected.length} images -> ${(totalBytes / 1024 / 1024).toFixed(2)}MB total`);
