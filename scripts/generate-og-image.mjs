/**
 * Generates the social-sharing card at public/og-image.png (1200x630).
 *
 * Run with:  npm run og:image
 *
 * The site is a static export, so the Open Graph / Twitter image is a committed
 * asset rather than a runtime route — that guarantees a real .png extension and
 * an image/* content-type on any host. Re-run this script whenever the brand
 * tokens or copy below change, and commit the regenerated PNG.
 *
 * Content is limited to CDCS's own brand, tagline, and factual service list —
 * no photography, testimonials, or performance claims.
 */
import { createRequire } from "node:module";
import { readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { join, dirname } from "node:path";

const require = createRequire(import.meta.url);
const { ImageResponse } = require("next/og.js");
const sharp = require("sharp");

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

// Brand tokens mirrored from src/app/globals.css
const NAVY_950 = "#030d1c";
const NAVY_800 = "#0c2843";
const BRAND_700 = "#0e4c8c";
const ACCENT_500 = "#e7a125";
const ACCENT_400 = "#f2b34a";
const SLATE_300 = "#cbd5e1";
const SLATE_400 = "#94a3b8";

const DOMAIN = "www.cdcsincgy.com";

// Minimal hyperscript helper (this file can't use JSX).
const h = (type, style, ...children) => ({ type, props: { style, children } });

const fontsDir = join(root, "node_modules/@fontsource");
const [soraExtraBold, interRegular, interSemiBold] = await Promise.all([
  readFile(join(fontsDir, "sora/files/sora-latin-800-normal.woff")),
  readFile(join(fontsDir, "inter/files/inter-latin-400-normal.woff")),
  readFile(join(fontsDir, "inter/files/inter-latin-600-normal.woff")),
]);

const tree = h(
  "div",
  {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    padding: "72px 76px",
    backgroundColor: NAVY_950,
    backgroundImage: `linear-gradient(135deg, ${NAVY_950} 0%, ${NAVY_800} 52%, ${BRAND_700} 125%)`,
    borderTop: `10px solid ${ACCENT_500}`,
    fontFamily: "Inter",
    color: "#ffffff",
  },
  // Brand lockup
  h(
    "div",
    { display: "flex", alignItems: "center" },
    h(
      "div",
      {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: 68,
        height: 68,
        borderRadius: 16,
        backgroundColor: ACCENT_500,
        color: NAVY_950,
        fontFamily: "Sora",
        fontSize: 32,
        fontWeight: 800,
      },
      "CD"
    ),
    h(
      "div",
      { display: "flex", flexDirection: "column", marginLeft: 22 },
      h(
        "div",
        { display: "flex", fontFamily: "Sora", fontSize: 34, fontWeight: 800 },
        h("span", {}, "CDCS "),
        h("span", { color: ACCENT_400 }, "Inc.")
      ),
      h(
        "div",
        {
          display: "flex",
          fontSize: 15,
          letterSpacing: 3,
          textTransform: "uppercase",
          color: SLATE_400,
          marginTop: 4,
        },
        "Cleaning & Facility Services"
      )
    )
  ),
  // Headline
  h(
    "div",
    { display: "flex", flexDirection: "column" },
    h(
      "div",
      { display: "flex", fontFamily: "Sora", fontSize: 78, fontWeight: 800, lineHeight: 1.05 },
      "Professional Cleaning."
    ),
    h(
      "div",
      {
        display: "flex",
        fontFamily: "Sora",
        fontSize: 78,
        fontWeight: 800,
        lineHeight: 1.05,
        color: ACCENT_400,
      },
      "Powerful Results."
    ),
    h(
      "div",
      { display: "flex", fontSize: 25, color: SLATE_300, marginTop: 26 },
      "Commercial cleaning · Pressure washing · Fleet washing · Mobile detailing"
    )
  ),
  // Footer
  h(
    "div",
    { display: "flex", alignItems: "center", justifyContent: "space-between" },
    h(
      "div",
      { display: "flex", fontSize: 20, color: SLATE_400 },
      "Serving businesses & organizations across Guyana"
    ),
    h(
      "div",
      { display: "flex", fontFamily: "Inter", fontWeight: 600, fontSize: 22, color: ACCENT_400 },
      DOMAIN
    )
  )
);

const response = new ImageResponse(tree, {
  width: 1200,
  height: 630,
  fonts: [
    { name: "Sora", data: soraExtraBold, style: "normal", weight: 800 },
    { name: "Inter", data: interRegular, style: "normal", weight: 400 },
    { name: "Inter", data: interSemiBold, style: "normal", weight: 600 },
  ],
});

// next/og emits RGBA; flatten to an opaque PNG (some scrapers render
// transparent OG images on a black background) and compress.
const png = await sharp(Buffer.from(await response.arrayBuffer()))
  .flatten({ background: NAVY_950 })
  .png({ compressionLevel: 9, palette: true })
  .toBuffer();

const out = join(root, "public", "og-image.png");
await writeFile(out, png);
console.log(`Wrote ${out} (${(png.length / 1024).toFixed(0)} KB)`);
