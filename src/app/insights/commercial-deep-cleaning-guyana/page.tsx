import type { Metadata } from "next";
import Link from "next/link";
import { ArticleLayout } from "@/components/insights/ArticleLayout";
import { Callout } from "@/components/insights/Callout";
import { getArticleBySlug } from "@/lib/insights-data";
import { projectImageByFile } from "@/lib/project-images";
import { siteConfig } from "@/lib/site-config";

const article = getArticleBySlug("commercial-deep-cleaning-guyana")!;

const articleUrl = `${siteConfig.url}/insights/${article.slug}/`;
const heroImage = projectImageByFile(article.heroImageFile);
const heroImageUrl = `${siteConfig.url}${heroImage.file}${heroImage.fallback ? ".jpg" : ".webp"}`;

const faq = [
  {
    q: "How is a deep clean different from a regular clean?",
    a: "Routine cleaning is scheduled upkeep — daily or weekly attention to surfaces, floors, washrooms, and waste. A deep clean is a one-time intensive reset that reaches what routine visits do not have time for: behind and under fittings, tops of partitions, vents, grout, kitchen appliances, and detailed washroom sanitation.",
  },
  {
    q: "How often should a commercial space be deep cleaned?",
    a: "Many offices book a deep clean quarterly or twice a year on top of a routine programme, and more often for high-traffic or public-facing areas. Spaces without a regular cleaning contract usually need one before any noticeable build-up rather than on a fixed cycle.",
  },
  {
    q: "Should we deep clean before starting a janitorial contract?",
    a: "It is usually worth it. Running a deep clean first means the recurring schedule starts from a genuinely clean baseline rather than trying to catch up over several visits.",
  },
  {
    q: "Can you deep clean an occupied office without disrupting work?",
    a: "Yes. Deep cleans are commonly done in the evening, over a weekend, or zone by zone across several visits so no part of the office is out of use for long.",
  },
];

export const metadata: Metadata = {
  title: { absolute: `${article.metaTitle} | ${siteConfig.brandName}` },
  description: article.metaDescription,
  keywords: article.keywords,
  alternates: { canonical: `/insights/${article.slug}/` },
  openGraph: {
    type: "article",
    url: articleUrl,
    siteName: siteConfig.brandName,
    title: article.metaTitle,
    description: article.metaDescription,
    publishedTime: article.datePublished,
    modifiedTime: article.dateModified ?? article.datePublished,
    authors: [siteConfig.companyName],
    images: [
      {
        url: heroImageUrl,
        width: heroImage.width,
        height: heroImage.height,
        alt: heroImage.alt,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: article.metaTitle,
    description: article.metaDescription,
    images: [heroImageUrl],
  },
};

export default function CommercialDeepCleaningArticle() {
  return (
    <ArticleLayout article={article} faq={faq}>
      <p className="lead">
        Routine cleaning keeps a workplace presentable day to day, but it does not
        have time to reach everywhere. Over months, grime builds up in the places
        a scheduled visit skips — behind and under furniture, on the tops of
        partitions and frames, in vents and fittings, and in tile grout. A deep
        clean resets those areas. This guide explains how a commercial deep clean
        differs from routine cleaning, what it actually covers, and the
        situations when a business or facility in Guyana genuinely needs one.
      </p>

      <h2>Routine cleaning versus deep cleaning: the difference</h2>
      <p>
        Both matter, and they do different jobs.{" "}
        <Link href="/services/commercial-janitorial-cleaning/">
          Routine commercial cleaning
        </Link>{" "}
        is upkeep on a schedule — daily or weekly attention to reception,
        offices, washrooms, kitchens, floors, and waste — that keeps a space at a
        steady standard. A deep clean is a one-time, intensive reset that clears
        the accumulated build-up routine visits cannot get to, and restores the
        space to a genuinely clean baseline.
      </p>

      <div className="article-table">
        <table>
          <caption>
            What routine cleaning covers, and what a deep clean adds.
          </caption>
          <thead>
            <tr>
              <th scope="col">Routine cleaning covers</th>
              <th scope="col">A deep clean additionally covers</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Reachable surfaces, desks, and shared touchpoints</td>
              <td>Behind and under furniture, equipment, and appliances</td>
            </tr>
            <tr>
              <td>Floors swept, mopped, and vacuumed</td>
              <td>Floor edges, corners, and machine scrubbing or buildup removal</td>
            </tr>
            <tr>
              <td>Washrooms cleaned and restocked</td>
              <td>Grout, limescale, fittings, and detailed sanitation</td>
            </tr>
            <tr>
              <td>Kitchen worktops, sinks, and appliance fronts</td>
              <td>Inside appliances, cupboards, and extract surfaces</td>
            </tr>
            <tr>
              <td>Visible dusting</td>
              <td>Tops of partitions and frames, vents, grilles, and light fittings</td>
            </tr>
            <tr>
              <td>Spot-cleaning of obvious marks</td>
              <td>Wall spot-cleaning, skirtings, and door frames throughout</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2>What a commercial deep clean actually covers</h2>
      <p>
        The exact scope is agreed for each site during a walk-through, but a
        commercial deep clean generally works through the space area by area
        rather than task by task.
      </p>

      <h3>Interiors and workspaces</h3>
      <p>
        Cleaning behind and under furniture, equipment, and appliances that
        routine visits have to work around; the tops of partitions, cabinets,
        pelmets, and door frames where dust settles unseen; vents, grilles,
        diffusers, and light fittings; and skirtings, door frames, and edges
        throughout the space, not only where marks are visible. Internal glass
        and partitions are cleaned on both faces, and walls are spot-cleaned for
        scuffs and handprints.
      </p>

      <h3>Kitchens and break rooms</h3>
      <p>
        Appliances cleaned inside and out — the oven, microwave, fridge, and the
        gaps between and behind them — along with the insides of cupboards and
        drawers, extract surfaces and filters, splashbacks, and the grease that
        collects on wall and ceiling surfaces above a cooking area. Bins are
        cleaned rather than just emptied.
      </p>

      <h3>Washrooms</h3>
      <p>
        Detailed sanitation of fixtures and fittings, descaling of taps,
        showerheads, and toilet fittings, grout and tile-joint cleaning, and
        attention to the base of partitions, pipe boxing, and floor edges where
        soil and moisture accumulate.
      </p>

      <h3>Floors and hard surfaces</h3>
      <p>
        Floor detailing into corners and along edges, and — where the finish
        allows — machine scrubbing, buildup removal, or stripping and
        re-finishing of hard floors. Carpeted areas are addressed with hot-water
        extraction rather than vacuuming alone.
      </p>

      <h2>When your business needs a deep clean</h2>
      <p>The common triggers:</p>
      <ul>
        <li><strong>Move-in or move-out</strong> — the start or end of a lease, when the space needs to be handed over or taken on in good condition.</li>
        <li><strong>Before an audit, inspection, or important client visit</strong> — when the space needs to look its best on a fixed date.</li>
        <li><strong>A space that has gone a while without regular service</strong> — reopening after a closure, or taking over a contract from a provider who fell behind.</li>
        <li><strong>A seasonal reset</strong> — a scheduled intensive clean once or twice a year.</li>
        <li><strong>Before starting a recurring janitorial contract</strong> — so the routine schedule begins from a clean baseline.</li>
        <li><strong>After a period of widespread illness</strong> in the office.</li>
        <li><strong>Preparing for or recovering from an event.</strong></li>
      </ul>
      <p>
        A useful way to decide is to compare an exposed surface with one that has
        been protected — the carpet under a filing cabinet, or the wall behind a
        cupboard. If the difference is obvious, the space is due a deep clean
        rather than another routine visit.
      </p>

      <h2>Deep cleaning and Guyana&apos;s climate</h2>
      <p>
        Warm, humid conditions mean the parts of a building that hold moisture —
        washrooms, kitchens, damp corners, the base of walls, and areas with
        little airflow — collect soil and odour faster than they would in a drier
        climate, and they are exactly the areas a routine visit spends least time
        on. A periodic deep clean gives those areas the detailed scrubbing they
        need. Where wet work is involved, drying is planned into the schedule so
        surfaces are not left damp; a deep clean is designed to leave the space
        clean and dry, not merely wiped over.
      </p>

      <h2>One-time deep clean or a recurring cycle</h2>
      <p>
        A deep clean is a one-time job by nature, but many offices schedule one
        regularly — quarterly or twice a year — on top of their routine
        programme, so the building never drifts far from standard. Our guide to{" "}
        <Link href="/insights/commercial-office-cleaning-guyana/">
          how often a commercial office should be cleaned
        </Link>{" "}
        covers where periodic deep cleaning fits in a full schedule.
      </p>

      <h2>How long a deep clean takes</h2>
      <p>
        Time on site depends on the floor area, how far behind the space has
        fallen, and the agreed scope — a single office suite is usually a
        one-visit job, while a multi-floor building is planned across several
        visits or a weekend. The realistic constraints are access hours and
        drying time: floors and carpets treated with water need a few hours of
        airflow before furniture goes back and foot traffic resumes, so an
        evening or Friday start is common so the space is ready for the next
        working day.
      </p>

      <h2>How a deep clean is scoped and scheduled</h2>
      <p>
        For anything larger than a small office, a deep clean starts with a
        walk-through to build an area-by-area task list and agree the standard.
        From there:
      </p>
      <ul>
        <li>Access hours are fixed — evening, weekend, or the space cleaned zone by zone across several visits.</li>
        <li>Time on site is estimated from the area, its condition, and the scope.</li>
        <li>Drying time is planned for wherever floors or carpets are treated.</li>
        <li>
          Where fabric is involved, the deep clean is paired with{" "}
          <Link href="/insights/carpet-upholstery-cleaning-guyana/">
            carpet and upholstery extraction
          </Link>
          .
        </li>
        <li>
          For a newly fitted-out or renovated space, the correct first step is{" "}
          <Link href="/insights/post-construction-cleaning-guyana/">
            post-construction cleaning
          </Link>{" "}
          rather than a standard deep clean.
        </li>
      </ul>

      <Callout title="Preparing your space for a deep clean">
        <ul className="list-disc pl-5">
          <li>Clear surfaces and floors of small items, cables, and waste.</li>
          <li>Flag anything fragile or valuable, and point out pre-existing damage.</li>
          <li>Note the areas that matter most or have known problems.</li>
          <li>Decide which zones are done together so the rest stays usable.</li>
          <li>Confirm access, keys, alarm, power, and water.</li>
          <li>Plan for drying — keep foot traffic off treated floors and run airflow.</li>
        </ul>
      </Callout>

      <h2>Getting a deep clean quoted</h2>
      <p>
        CDCS Inc. provides{" "}
        <Link href="/services/deep-cleaning/">commercial and residential deep cleaning</Link>{" "}
        for offices, facilities, and property owners in Georgetown and across
        Guyana. We assess the space, agree a scope and standard, and schedule the
        work around your operation — as a one-time reset or a recurring cycle
        alongside a{" "}
        <Link href="/services/commercial-janitorial-cleaning/">
          routine janitorial programme
        </Link>
        .
      </p>
      <p>
        <Link href="/quote/">Request a quote</Link> with the space, its
        condition, and any deadline, or{" "}
        <Link href="/contact/">contact the CDCS Inc. team</Link> to arrange a
        walk-through.
      </p>
    </ArticleLayout>
  );
}
