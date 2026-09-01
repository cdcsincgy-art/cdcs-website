# CDCS Inc. — Website

Website for **Capital Detailing & Cleaning Services Inc. (CDCS Inc.)**, Georgetown, Guyana.

Built with [Next.js](https://nextjs.org) (App Router, static export) + TypeScript + Tailwind CSS.
The site compiles to plain static HTML/CSS/JS, so it can be hosted on almost any static
host and pointed at your existing Squarespace-registered domain via DNS.

---

## 1. Project structure

```
src/
  app/                     Pages (Next.js App Router — one folder per URL)
    page.tsx               Homepage
    services/page.tsx      Services index
    services/[slug]/       Individual service pages (auto-generated from services-data.ts)
    industries/page.tsx    Industries We Serve
    our-work/               Portfolio / project gallery
    about/page.tsx         About CDCS
    quote/                 Request-a-Quote form
    contact/page.tsx       Contact page
    sitemap.ts             Auto-generated sitemap.xml
    robots.ts              Auto-generated robots.txt
    layout.tsx             Global layout: header, footer, WhatsApp button, SEO defaults, JSON-LD
    globals.css            Design tokens (colors, fonts) and small utilities
  components/              Reusable UI: Header, Footer, ServiceCard, buttons, icons, etc.
  lib/
    site-config.ts         Company name, phone, email, socials — edit this file first
    services-data.ts       The 8 services — add/edit a service here and its page is generated automatically
    content-data.ts        Homepage content blocks (trust points, industries, process steps, portfolio items)
```

**To add a 9th service later:** add one object to the `services` array in
`src/lib/services-data.ts`. A page at `/services/your-slug/` is created automatically, and it
appears on the homepage, the services index, and the footer with no other changes needed.

---

## 2. Editing company information

Almost everything company-specific (phone, WhatsApp number, email, social handles, domain)
lives in **`src/lib/site-config.ts`**. Update it there and it propagates across the whole site
(header, footer, quote page, structured data, WhatsApp links, etc.).

---

## 3. Project photos

Authentic CDCS project photos live in `public/images/projects/`, organized by service, and are
listed in **`src/lib/project-images.ts`** (path, dimensions, alt text, caption, category). They
power the homepage hero and "Our Work" preview, the About photo, every service-page hero and
"Recent Projects" gallery, and the `/our-work/` portfolio.

**To add more photos:**

1. Drop the originals into `public/images/` (they are git-ignored) and add an entry for each to
   the `jobs` array in `scripts/process-project-images.mjs` — set the output path, a `maxW`, a
   `trim` if the shot has phone/Instagram UI to crop out, and `jpg: true` if it will be a page
   hero.
2. Run `node scripts/process-project-images.mjs` — it writes optimized `.webp` (and `.jpg`
   fallbacks) into `public/images/projects/`. Commit those.
3. Add the images to the right category in `src/lib/project-images.ts` with a natural, accurate
   `alt` and a factual `caption` (describe only what's visible — no client names, dates, values,
   or quantified results). Set `beforeAfter: true` for side-by-side composites and
   `heroForService: "<slug>"` to make one the hero of a service page.

The three service pages without their own photos yet (deep cleaning, post-construction, and
commercial facility cleaning) reuse a related commercial-cleaning shot and show a "View Our Work"
card instead of a gallery until dedicated photos exist.

### Logo

The official CDCS seal is `public/images/cdcs-logo.png` (kept as supplied). `npm run logo:assets`
(`scripts/generate-logo-assets.mjs`) derives everything else from it — never editing the
original:

- `public/images/cdcs-logo-mark.{webp,png}` — 256px transparent mark used in the header and
  footer `<Logo>` (via `<picture>`). On dark surfaces the footer places it on a small white chip
  because the seal is black line art.
- `src/app/favicon.ico` + `icon.png` + `apple-icon.png` — browser icons, seal on white. The
  seal's thin outlines and micro-text are soft below ~32px; it reads well from 32px up and at
  Google's ~48px search size.
- The social card (`public/og-image.png`, `npm run og:image`) shows the seal on a white disc.
- `ProfessionalService` JSON-LD `logo` points at the full-resolution
  `https://www.cdcsincgy.com/images/cdcs-logo.png`.

---

## 4. Connecting the quote form to email

The quote form (`/quote/`) works out of the box with **no setup**: if no backend is configured,
submitting it opens the visitor's email app with a pre-filled message addressed to
`cdcsincgy@gmail.com`, so no lead is lost. This is a reasonable fallback, but two better options:

**Option A — Formspree (free tier available, supports file uploads, ~5 minutes):**
1. Create a free account at [formspree.io](https://formspree.io) and create a new form pointed at
   `cdcsincgy@gmail.com`.
2. Copy the form's endpoint URL (looks like `https://formspree.io/f/xxxxxxx`).
3. Add it as an environment variable when you deploy: `NEXT_PUBLIC_QUOTE_FORM_ENDPOINT=https://formspree.io/f/xxxxxxx`
4. Rebuild/redeploy. The form will now POST directly (including any uploaded photo) instead of
   using the mailto fallback.

**Option B — Web3Forms, Getform, or your own API route** — any endpoint that accepts a
multipart form POST works the same way; just set `NEXT_PUBLIC_QUOTE_FORM_ENDPOINT`.

---

## 5. Local development

Requires Node.js 20+.

```bash
npm install
npm run dev
```

Visit `http://localhost:3000`.

## 6. Building for production

```bash
npm run build
```

This produces a fully static site in the `out/` folder (because `next.config.ts` sets
`output: "export"`). That `out/` folder is the entire website — every page is plain HTML/CSS/JS
with no server required.

---

## 7. Deploying

Any static host works. Two straightforward options:

### Option A — Vercel (built by the makers of Next.js, generous free tier)
1. Push this project to a GitHub/GitLab repository.
2. Go to [vercel.com](https://vercel.com), "Add New Project", import the repository.
3. Vercel auto-detects Next.js — click Deploy. No configuration needed.
4. Add the `NEXT_PUBLIC_QUOTE_FORM_ENDPOINT` environment variable in the Vercel project settings
   if you set up Formspree (step 4 above).

### Option B — Netlify / Cloudflare Pages / any static host
1. Run `npm run build` locally (or let the host run it — build command `npm run build`,
   publish directory `out`).
2. Upload/connect the `out/` folder as you would any static site.

### Security headers

`vercel.json` sets the site's HTTP security headers (Content-Security-Policy, HSTS,
`X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`, `Permissions-Policy`). These are
applied by Vercel at serve time — they do **not** appear in a local `npm run build`; verify them
with `curl -I https://www.cdcsincgy.com/` after deploying. On other hosts, translate `vercel.json`
into that host's equivalent (e.g. a Netlify/Cloudflare `_headers` file).

The Content-Security-Policy currently allows this origin, `https://formspree.io` (the quote
form), and the Google Analytics / Tag Manager origins. **If you add anything else third-party —
a Google Maps embed on the Contact page, another analytics or ads script, an embedded video, a
web font from Google — you must add its origin to the matching CSP directive in `vercel.json`,
or the browser will silently block it.**

---

## 8. Connecting your Squarespace-registered domain

Your domain can stay registered with Squarespace — you're only changing where it *points*,
not who it's registered through.

1. Deploy the site first (Vercel/Netlify/etc.) and note the domain they give you
   (e.g. `cdcs-inc.vercel.app`).
2. In your hosting provider's dashboard, add your real domain (e.g. `cdcsinc.gy` or whatever you
   own) as a **Custom Domain**. The host will show you the DNS records to add — typically:
   - An **A record** (or **ALIAS/ANAME**) for the root domain (`cdcsinc.gy`) pointing to the
     host's IP or apex target.
   - A **CNAME record** for `www` pointing to the host's provided subdomain
     (e.g. `cname.vercel-dns.com`).
3. Log in to Squarespace Domains (Settings → Domains → your domain → DNS Settings) and add those
   exact records.
4. DNS changes can take anywhere from a few minutes to 24–48 hours to propagate. Once it does,
   your domain will serve this website while Squarespace continues to manage the domain
   registration/billing.

Update `url` in `src/lib/site-config.ts` to your real domain once it's live — it's used for SEO
metadata (canonical URLs, sitemap, structured data).

---

## 9. SEO notes

- Every page has a unique, natural-language `<title>` and meta description targeting relevant
  searches (commercial cleaning Guyana, pressure washing Guyana, janitorial services Guyana,
  etc.) without keyword-stuffing.
- `ProfessionalService` structured data (JSON-LD) is included site-wide in `layout.tsx`, plus a
  `Service` schema on each individual service page.
- `sitemap.xml` and `robots.txt` are generated automatically from `src/app/sitemap.ts` and
  `src/app/robots.ts`.
- Open Graph / Twitter tags (including a 1200×630 social-sharing card) are set site-wide in
  `layout.tsx`, with per-service titles/descriptions on service pages. The card image lives at
  `public/og-image.png` — regenerate it with `npm run og:image` after changing the brand tokens
  or copy in `scripts/generate-og-image.mjs`, then commit the new PNG.
- The canonical domain is `https://www.cdcsincgy.com` (set once in `src/lib/site-config.ts` as
  `url`). It must match the primary domain in Vercel; the bare apex redirects to it.
- Image `alt` text should be added descriptively as real photos replace placeholders (see
  Section 3).

---

## 10. Analytics (Google Analytics 4)

GA4 is wired in via `gtag.js` (`src/components/Analytics.tsx`, rendered once in `layout.tsx`).

- **Measurement ID** lives in `src/lib/site-config.ts` (`analytics.gaId`, currently
  `G-HE4BG5Z5MD`). Override per environment with `NEXT_PUBLIC_GA_MEASUREMENT_ID` if needed.
  It is not a secret — it ships in client JS on every GA site.
- **Only the live domain reports.** The script checks `window.location.hostname` against
  `siteConfig.url` and does nothing on localhost or `*.vercel.app` preview URLs, so your own
  browsing never lands in the data.
- **Performance:** the script loads with `strategy="afterInteractive"` (after hydration, off the
  critical path); a `<link rel="preconnect">` to `googletagmanager.com` is in `layout.tsx`.
- **Pageviews** for client-side navigations are automatic — just confirm GA4 → Admin → Data
  streams → your stream → *Enhanced measurement* has "Page changes based on browser history
  events" enabled (on by default).
- **Quote-form conversion:** a successful submission (confirmed by the Formspree backend, not the
  mailto fallback) fires a GA4 `generate_lead` event with the selected `service` and `frequency`
  — no personal data. **After deploying, mark it as a Key event:** GA4 → Admin → Events → toggle
  *Mark as key event* on `generate_lead`.
- **Privacy suggestions:** GA4 → Admin → Data settings → *Data retention* → 14 months; turn off
  *Google signals* unless you need demographics/cross-device. GA4 does not store full IP
  addresses. No cookie-consent banner is included (not legally required for a Guyana audience);
  if you later need EU/UK coverage, add Google Consent Mode v2.
- **CSP:** `vercel.json` already allows the Google Analytics / Tag Manager origins. If you switch
  to GTM or add other Google tags, update the CSP directives accordingly.

---

## 11. What's intentionally left as a placeholder

Per the brief, nothing has been invented. Still outstanding:
- **Photos for deep cleaning, post-construction cleaning, and commercial facility cleaning** —
  these three service pages currently reuse a related commercial-cleaning photo. Add dedicated
  shots via `src/lib/project-images.ts` (see Section 3).
- The embedded map on the Contact page (add a Google Maps embed once you have a public
  office/pickup address).
- Testimonials, certifications, years-in-business stats, and client counts are **not included**
  anywhere on the site, since none were provided — add them once you have real ones to cite.
- Project captions are deliberately generic (what's visible only). No client/company is named,
  including where a company's livery is visible in a fleet-washing photo.
