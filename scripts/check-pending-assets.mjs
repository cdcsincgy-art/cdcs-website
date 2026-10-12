/**
 * Prebuild guard (runs before every `npm run build`, including on Vercel).
 *
 * Everything under /public is deployed as a public URL whether or not any page
 * links to it, and is copied into out/ by every local build. This fails the
 * build if /public contains:
 *   1. an asset folder awaiting client publication approval
 *      (scripts/pending-assets.json) — those belong in /staging; or
 *   2. raw, unprocessed photo originals (IMG_*) — those belong in
 *      /source-photos (they can show unblurred badges, plates, or client
 *      branding that the processed versions remove).
 */
import { existsSync, readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";

const problems = [];

const { pending } = JSON.parse(readFileSync("scripts/pending-assets.json", "utf8"));
for (const dir of pending) {
  if (existsSync(join("public", dir))) {
    problems.push(`public/${dir} — awaiting client approval; move it to staging/${dir}`);
  }
}

const rawOriginals = readdirSync("public/images").filter((f) => /^IMG_/i.test(f));
for (const f of rawOriginals) {
  problems.push(`public/images/${f} — raw original; move it to source-photos/${f}`);
}

if (problems.length) {
  console.error(
    `\n✖ Files in /public that must not be published:\n` +
      problems.map((p) => `    ${p}`).join("\n") +
      `\n  If a pending folder's client has approved publication, remove it from scripts/pending-assets.json.\n`,
  );
  process.exit(1);
}
