/**
 * Generates the web/display and browser-identity assets from the official CDCS
 * logo (public/images/cdcs-logo.png).
 *
 *   npm run logo:assets
 *
 * The source is a black line-art seal on a transparent background. It is only
 * trimmed to its square bounding box and scaled — never recoloured or redrawn.
 * The original PNG is left untouched.
 *
 * Outputs
 *   public/images/cdcs-logo-mark.webp / .png   256px, transparent, small inner
 *                                              margin so the ring survives a
 *                                              circular crop. Used in the
 *                                              header + footer <Logo>.
 *   src/app/favicon.ico    16 / 32 / 48 px, seal on white (PNG-in-ICO)
 *   src/app/icon.png       256px, seal on white
 *   src/app/apple-icon.png 180px, seal on white
 *
 * Favicon note: at 16px the thin outlines and micro-text are not crisp; the
 * seal reads well from ~32px up (and at Google's ~48px search size). Placed on
 * white so it stays visible in light and dark browser chrome.
 */
import sharp from "sharp";
import { writeFileSync } from "node:fs";

const SRC = "public/images/cdcs-logo.png";
const master = await sharp(SRC).trim({ threshold: 10 }).toBuffer();

// --- display mark: 256px, transparent, ~9% inner margin ---
async function displayMark() {
  const inner = 232;
  const seal = await sharp(master)
    .resize(inner, inner, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .toBuffer();
  return sharp({
    create: { width: 256, height: 256, channels: 4, background: { r: 0, g: 0, b: 0, alpha: 0 } },
  })
    .composite([{ input: seal, gravity: "center" }])
    .png()
    .toBuffer();
}
const mark = await displayMark();
await sharp(mark).webp({ quality: 92, alphaQuality: 100 }).toFile("public/images/cdcs-logo-mark.webp");
await sharp(mark).png({ compressionLevel: 9, palette: true }).toFile("public/images/cdcs-logo-mark.png");

// --- browser icons: seal on an opaque white ground ---
async function iconPng(size, pad) {
  const inner = Math.round(size * (1 - pad * 2));
  const seal = await sharp(master)
    .resize(inner, inner, { fit: "contain", background: "#ffffff" })
    .toBuffer();
  return sharp({ create: { width: size, height: size, channels: 4, background: "#ffffff" } })
    .composite([{ input: seal, gravity: "center" }])
    .png({ compressionLevel: 9 })
    .toBuffer();
}

writeFileSync("src/app/icon.png", await iconPng(256, 0.05));
writeFileSync("src/app/apple-icon.png", await iconPng(180, 0.08));

// favicon.ico — PNG-in-ICO (16 / 32 / 48)
const sizes = [16, 32, 48];
const pngs = await Promise.all(sizes.map((s) => iconPng(s, s <= 16 ? 0.0 : 0.05)));
const header = Buffer.alloc(6);
header.writeUInt16LE(1, 2); // type: icon
header.writeUInt16LE(sizes.length, 4);
const entries = Buffer.alloc(16 * sizes.length);
let offset = 6 + entries.length;
sizes.forEach((s, i) => {
  const e = i * 16;
  entries[e] = s;
  entries[e + 1] = s;
  entries.writeUInt16LE(1, e + 4);
  entries.writeUInt16LE(32, e + 6);
  entries.writeUInt32LE(pngs[i].length, e + 8);
  entries.writeUInt32LE(offset, e + 12);
  offset += pngs[i].length;
});
writeFileSync("src/app/favicon.ico", Buffer.concat([header, entries, ...pngs]));

console.log("cdcs-logo-mark.{webp,png} + favicon.ico + icon.png + apple-icon.png regenerated");
