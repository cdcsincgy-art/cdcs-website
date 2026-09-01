import type { Metadata } from "next";
import Link from "next/link";
import { ArticleLayout } from "@/components/insights/ArticleLayout";
import { Callout } from "@/components/insights/Callout";
import { getArticleBySlug } from "@/lib/insights-data";
import { projectImageByFile } from "@/lib/project-images";
import { siteConfig } from "@/lib/site-config";

const article = getArticleBySlug("commercial-fleet-washing-guyana")!;

const articleUrl = `${siteConfig.url}/insights/${article.slug}/`;
const heroImage = projectImageByFile(article.heroImageFile);
const heroImageUrl = `${siteConfig.url}${heroImage.file}${heroImage.fallback ? ".jpg" : ".webp"}`;

const faq = [
  {
    q: "How often should we wash our fleet?",
    a: "It depends on the vehicles and how they are used. Branded delivery vans on city routes and buses generally benefit from weekly washing; long-haul trucks and prime movers weekly to bi-weekly; construction and equipment fleets monthly or as needed. Wet weather, unpaved routes, and coastal salt air all shorten the interval.",
  },
  {
    q: "Do you wash vehicles on-site at our depot?",
    a: "Yes. On-site washing at your depot or yard means vehicles are cleaned between runs without losing time to travel, and the whole fleet can be done in one session. The site needs space, a water supply, and a plan for drainage or run-off.",
  },
  {
    q: "What does a fleet wash include?",
    a: "A standard fleet wash covers the exterior body, cab, mirrors, wheels and arches, and glass, with an undercarriage rinse available as an option. It is a presentation wash rather than a full detail — interior and paint correction fall under mobile detailing.",
  },
  {
    q: "Can you handle a large fleet on a regular schedule?",
    a: "Yes. Programmes are scaled to fleet size and dispatch patterns — weekly, bi-weekly, or monthly for different vehicle groups — with one-time washes available for audits, lease returns, or a specific job.",
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

export default function CommercialFleetWashingArticle() {
  return (
    <ArticleLayout article={article} faq={faq}>
      <p className="lead">
        There is no single answer to how often a commercial fleet should be
        washed — it depends on what the vehicles do, where they run, and whether
        they carry branding. A branded delivery van working city routes needs
        attention far more often than a piece of plant that rarely leaves a yard.
        This guide sets out fleet washing frequency by vehicle type, explains
        what an on-site wash at your depot involves, and covers how transport and
        logistics operators in Guyana can put a scheduled programme in place.
      </p>

      <h2>Why fleet washing frequency varies</h2>
      <p>
        A few things drive how quickly a vehicle needs washing again:
      </p>
      <ul>
        <li>
          <strong>What the vehicle does.</strong> A van making dozens of drops a
          day on paved city routes, a prime mover on long inter-regional runs,
          and an excavator on a construction site accumulate very different
          amounts of grime.
        </li>
        <li>
          <strong>Whether it is branded.</strong> A liveried vehicle is rolling
          advertising. A dirty branded truck works against the business every
          time it is seen, so branded fleets are usually washed more often than
          plain ones.
        </li>
        <li>
          <strong>Inspection and maintenance.</strong> Road film and mud hide
          damage, leaks, and defects. A clean vehicle is easier to inspect before
          a trip and easier to hand back at the end of a lease.
        </li>
        <li>
          <strong>Conditions in Guyana.</strong> Heavy rain and unpaved sections
          throw up mud, dry spells raise dust, and coastal routes add salt air —
          all of which shorten the interval between washes.
        </li>
      </ul>

      <h2>A fleet washing frequency guide</h2>
      <p>
        The table below is a starting point. Adjust for branding, route
        conditions, and how visible the vehicles are to customers.
      </p>

      <div className="article-table">
        <table>
          <caption>
            Sample commercial fleet washing frequency by vehicle type and use.
          </caption>
          <thead>
            <tr>
              <th scope="col">Vehicle type</th>
              <th scope="col">Light use</th>
              <th scope="col">Typical use</th>
              <th scope="col">Heavy use / branded / customer-facing</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">Delivery vans (city routes)</th>
              <td>Every 2 weeks</td>
              <td>Weekly</td>
              <td>Twice a week</td>
            </tr>
            <tr>
              <th scope="row">Trucks &amp; prime movers</th>
              <td>Monthly</td>
              <td>Every 1&ndash;2 weeks</td>
              <td>Weekly</td>
            </tr>
            <tr>
              <th scope="row">Buses &amp; crew transport</th>
              <td>Weekly</td>
              <td>Twice a week</td>
              <td>Daily or per shift</td>
            </tr>
            <tr>
              <th scope="row">Construction &amp; equipment fleet</th>
              <td>As needed</td>
              <td>Monthly</td>
              <td>Fortnightly, or before it leaves site</td>
            </tr>
            <tr>
              <th scope="row">Management &amp; pool cars</th>
              <td>Every 2 weeks</td>
              <td>Weekly</td>
              <td>Weekly plus periodic detailing</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2>What an on-site fleet wash covers</h2>
      <p>
        A standard fleet wash is a presentation wash — the goal is a vehicle that
        looks maintained and is easy to inspect, delivered quickly enough to fit
        between runs:
      </p>
      <ul>
        <li>Pre-rinse to lift loose grit, then a detergent wash of the exterior body, with attention to branding and livery so decals are cleaned without being lifted.</li>
        <li>Cab exterior, mirrors, door shuts, and all glass.</li>
        <li>Wheels, rims, and wheel arches, where road film and brake dust build up fastest.</li>
        <li>An undercarriage rinse as an option — worth adding after muddy inland routes or coastal runs where salt collects underneath.</li>
        <li>A final rinse and, where time allows, a dry-down to avoid water spotting.</li>
      </ul>
      <p>
        Interior cleaning, machine polishing, paint correction, and headlight
        restoration are a different service. Where management or pool vehicles
        need that level of finish, it falls under{" "}
        <Link href="/services/mobile-detailing/">mobile detailing</Link>, which
        CDCS Inc. also brings to your site. It is common to run a routine wash on
        the working fleet and periodic detailing on the vehicles that carry
        managers and clients.
      </p>

      <h2>Water supply and drainage at your site</h2>
      <p>
        On-site washing needs somewhere for the water and lifted soil to go.
        Before a programme starts, CDCS Inc. checks the wash location for a usable
        water supply and for drainage — an existing wash bay and interceptor, a
        drain the site is permitted to use, or an area where run-off can be
        managed. This is worth confirming early, because it can determine where on
        the yard the washing is done and whether any containment is needed.
      </p>

      <h2>What affects the cost of a fleet washing programme</h2>
      <p>
        A fleet washing quote is built from the same kind of factors as any
        recurring service: the number and type of vehicles, how often each group
        is washed, whether an undercarriage rinse is included, the site
        conditions (water access, drainage, space to manoeuvre), and the
        location. A regular programme is usually quoted as a per-visit or monthly
        figure for the fleet, with one-time washes priced separately.
      </p>

      <h2>On-site washing at your depot versus sending vehicles out</h2>
      <p>
        For a fleet of any size, on-site washing usually wins. Sending vehicles
        to a wash one at a time takes a driver and a vehicle off the road for the
        round trip and the queue; a mobile team working at your depot cleans the
        fleet where it already parks, between runs, and works through all the
        vehicles in one scheduled session.
      </p>
      <p>It also gives you more control:</p>
      <ul>
        <li>The schedule is fixed and predictable, so vehicles are consistently presentable rather than washed only when someone notices.</li>
        <li>The team learns your fleet — which vehicles carry branding, which need extra attention, which must not be washed at a given time.</li>
        <li>Washing is timed around dispatch, loading, and driver hours so it never holds up operations.</li>
      </ul>
      <p>
        Sending vehicles out can still make sense for a very small fleet, or for
        an operator without the space or water supply for on-site washing.
      </p>

      <h2>Signs a vehicle or fleet is overdue a wash</h2>
      <p>
        If you are working out the right interval, these are the practical
        signals that the current schedule is too loose:
      </p>
      <ul>
        <li>Branding and livery are hard to read from a distance.</li>
        <li>Drivers are reporting that pre-trip checks take longer, or defects are being missed.</li>
        <li>Road film and salt residue are visibly building up on lower panels and the undercarriage.</li>
        <li>Customers or the public see the vehicles regularly and the fleet no longer looks maintained.</li>
        <li>You are booking one-off washes reactively before audits, client visits, or vehicle inspections.</li>
      </ul>

      <h2>Setting up a scheduled fleet washing programme</h2>
      <p>
        Most operators run different vehicle groups on different cycles — for
        example vans weekly, trucks bi-weekly, plant monthly — with the whole
        programme scaled to fleet size and adjusted as the fleet changes. One-time
        washes are available for an audit, a lease return, or before a specific
        job. The yard, apron, or loading area itself can be{" "}
        <Link href="/services/pressure-washing/">pressure washed</Link> on the
        same visit where it needs it.
      </p>

      <Callout title="Preparing for a fleet wash">
        <ul className="list-disc pl-5">
          <li>Confirm which vehicles are to be washed and when they will be available.</li>
          <li>Clear the wash area and move vehicles that are not in scope.</li>
          <li>Secure or remove loose items and loads.</li>
          <li>Flag any vehicle that needs extra attention, or that must not be washed yet (a curing wrap, sensitive equipment).</li>
          <li>Confirm the water supply and where run-off will drain.</li>
        </ul>
      </Callout>

      <h2>Getting a fleet washing quote</h2>
      <p>
        CDCS Inc. provides{" "}
        <Link href="/services/fleet-washing/">on-site fleet and truck washing</Link>{" "}
        for transport, logistics, and construction operators across Guyana. We
        review the fleet, the wash location, water and drainage, and dispatch
        times, then propose a schedule — from a weekly run to a one-time wash —
        and a clear quote scaled to the fleet.
      </p>
      <p>
        <Link href="/quote/">Request a quote</Link> with your fleet size, vehicle
        types, and depot location, or{" "}
        <Link href="/contact/">contact the CDCS Inc. team</Link> to discuss a
        washing schedule.
      </p>
    </ArticleLayout>
  );
}
