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

## 3. Adding real photos and videos

Every photo/video slot on the site is currently a clearly labeled placeholder (dashed border,
"PLACEHOLDER IMAGE" tag) built with the `<PlaceholderMedia />` component
(`src/components/ui/PlaceholderMedia.tsx`), per the request not to fabricate content.

To replace a placeholder with a real photo:

1. Add your image file to the `public/images/` folder (create it if it doesn't exist), e.g.
   `public/images/pressure-washing-1.jpg`.
2. In the relevant page file, replace the `<PlaceholderMedia ... />` component with a normal
   `<img>` tag, e.g.:

   ```tsx
   <img
     src="/images/pressure-washing-1.jpg"
     alt="CDCS technician pressure washing a commercial walkway"
     className="aspect-video w-full rounded-lg object-cover"
   />
   ```

   Keep the `alt` text descriptive — it matters for SEO and accessibility.
3. For the "Our Work" gallery, real items live in `src/lib/content-data.ts` in the
   `portfolioItems` array — swap the `label` placeholders for real photos the same way, or extend
   `PortfolioGallery.tsx` to render `<img>`/`<video>` per item once you have a full set.

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

## 10. What's intentionally left as a placeholder

Per the brief, nothing has been invented. The following are marked as placeholders for you to
fill in once available:
- All photos and videos (dashed-border "PLACEHOLDER IMAGE" blocks throughout).
- The embedded map on the Contact page (add a Google Maps embed once you have a public
  office/pickup address).
- Testimonials, certifications, years-in-business stats, and client counts are **not included**
  anywhere on the site, since none were provided — add them once you have real ones to cite.
