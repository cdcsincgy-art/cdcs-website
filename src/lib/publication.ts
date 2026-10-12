// Content that is ready but must not go live yet — e.g. a case study whose
// client has not yet approved publication.
//
// Such content is NOT in this repository at all (the repo is public). It lives
// in staging/pending-content.json (git-ignored, local only), and its images in
// staging/images/ — never in /public, because anything in /public is publicly
// downloadable once deployed. A prebuild guard (scripts/check-pending-assets.mjs)
// fails any build where those images reappear in /public.
//
// The local file is read ONLY in a local preview build:
//
//   npm run build:preview        (sets CDCS_PREVIEW_PENDING=1)
//
// Normal builds — including every Vercel preview and production build — never
// read it, and have no pending content to show even if the flag were set
// (the file does not exist there).
//
// On approval: move the entries from staging/pending-content.json back into
// src/lib/projects-data.ts, src/lib/project-images.ts, and
// scripts/process-project-images.mjs (as status "published"), move the image
// folder from staging/ to public/, and remove it from scripts/pending-assets.json.
//
// Server-only: imported by projects-data.ts and project-images.ts, which are
// never part of a client bundle.

import fs from "node:fs";
import path from "node:path";

export const showPendingClientContent = process.env.CDCS_PREVIEW_PENDING === "1";

interface PendingContent {
  /** Project-definition objects (see ProjectDefinition in projects-data.ts). */
  projects: unknown[];
  /** Image-category objects (see ProjectCategory in project-images.ts). */
  imageCategories: unknown[];
  /** Project slugs to feature first on the homepage. */
  homepageProjectSlugs: string[];
}

const EMPTY: PendingContent = { projects: [], imageCategories: [], homepageProjectSlugs: [] };

let cached: PendingContent | undefined;

/** Pending content from the local file — empty unless this is a local preview build. */
export function pendingContent(): PendingContent {
  if (cached) return cached;
  cached = EMPTY;
  if (showPendingClientContent) {
    const file = path.join(process.cwd(), "staging", "pending-content.json");
    if (fs.existsSync(file)) {
      const data = JSON.parse(fs.readFileSync(file, "utf8")) as Partial<PendingContent>;
      cached = {
        projects: data.projects ?? [],
        imageCategories: data.imageCategories ?? [],
        homepageProjectSlugs: data.homepageProjectSlugs ?? [],
      };
    }
  }
  return cached;
}
