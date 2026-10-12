/**
 * LOCAL PREVIEW ONLY — never deploy the output of this script.
 *
 *   npm run build:preview
 *
 * Builds with content awaiting client approval switched on
 * (CDCS_PREVIEW_PENDING=1, see src/lib/publication.ts), then copies the
 * staged assets listed in scripts/pending-assets.json from /staging into out/
 * so the preview renders. A normal `npm run build` overwrites out/ again.
 */
import { spawnSync } from "node:child_process";
import { cpSync, existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const build = spawnSync("npm", ["run", "build"], {
  stdio: "inherit",
  shell: true,
  env: { ...process.env, CDCS_PREVIEW_PENDING: "1" },
});
if (build.status !== 0) process.exit(build.status ?? 1);

const { pending } = JSON.parse(readFileSync("scripts/pending-assets.json", "utf8"));
for (const dir of pending) {
  const from = join("staging", dir);
  if (!existsSync(from)) {
    console.warn(`[preview] staging/${dir} not found — its images will be missing.`);
    continue;
  }
  cpSync(from, join("out", dir), { recursive: true });
  console.log(`[preview] copied staging/${dir} -> out/${dir}`);
}
console.log("\nPREVIEW BUILD — contains unapproved content. Do not deploy out/.\n");
