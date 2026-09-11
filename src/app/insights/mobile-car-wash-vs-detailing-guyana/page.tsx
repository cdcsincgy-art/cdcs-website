import type { Metadata } from "next";
import Link from "next/link";
import { ArticleLayout } from "@/components/insights/ArticleLayout";
import { Callout } from "@/components/insights/Callout";
import { getArticleBySlug } from "@/lib/insights-data";
import { projectImageByFile } from "@/lib/project-images";
import { siteConfig } from "@/lib/site-config";

const article = getArticleBySlug("mobile-car-wash-vs-detailing-guyana")!;

const articleUrl = `${siteConfig.url}/insights/${article.slug}/`;
const heroImage = projectImageByFile(article.heroImageFile);
const heroImageUrl = `${siteConfig.url}${heroImage.file}${heroImage.fallback ? ".jpg" : ".webp"}`;

const faq = [
  {
    q: "Is a car wash the same as detailing?",
    a: "No. A car wash is routine exterior and interior cleaning to keep a vehicle presentable. Detailing is a deeper, longer service — machine polishing, paint correction, headlight restoration, engine-bay cleaning, and deep interior fabric extraction. Most drivers need frequent washes and an occasional detail.",
  },
  {
    q: "What is mobile car washing?",
    a: "Mobile washing is a standard car wash brought to where the vehicle is parked — a home driveway or an office car park — instead of a drop-off. CDCS Inc. offers mobile vehicle washing in Georgetown and, where scheduling and logistics permit, elsewhere in Guyana.",
  },
  {
    q: "How often should I wash my car in Guyana?",
    a: "Weekly to fortnightly for a car in regular use is a reasonable baseline. Rain, dust, unpaved routes, tree sap, and coastal salt air all shorten the interval. A recurring WashCare plan sets a fixed monthly schedule so it is not left until the car looks bad.",
  },
  {
    q: "When should I book a detail instead of a wash?",
    a: "When washing no longer makes the vehicle look right — dull or swirled paint, cloudy headlights, ingrained interior grime, odour, or heavy staining — or when you are preparing a vehicle for sale or handback. That is detailing and, for fabric, extraction cleaning.",
  },
  {
    q: "What about washing several company vehicles?",
    a: "Washing a group of vehicles or trucks on a regular schedule is fleet washing — carried out on-site at your depot or yard. A small number of pool or management vehicles can instead go on a recurring WashCare plan.",
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

export default function MobileCarWashVsDetailingArticle() {
  return (
    <ArticleLayout article={article} faq={faq}>
      <p className="lead">
        People use &ldquo;car wash&rdquo; and &ldquo;detailing&rdquo; as if they mean the same
        thing. They do not &mdash; they are different services, done at different depth, for
        different reasons, and at very different price points. Knowing which one a vehicle needs
        saves money on the routine work and makes sure the occasional deeper job is actually
        worth booking. This guide walks through routine washing, mobile washing, interior and
        exterior washing, full detailing, fabric extraction, and fleet washing, with a plain
        way to choose between them in Guyana.
      </p>

      <h2>The short version</h2>
      <p>
        Five levels of vehicle cleaning, from lightest and most frequent to deepest and
        occasional:
      </p>

      <div className="article-table">
        <table>
          <caption>
            Vehicle-cleaning services compared &mdash; what each does, how often, and who it
            suits.
          </caption>
          <thead>
            <tr>
              <th scope="col">Service</th>
              <th scope="col">What it does</th>
              <th scope="col">Typical frequency</th>
              <th scope="col">Best for</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">Exterior wash</th>
              <td>Body, glass, wheels, tyres, and trim washed and rinsed</td>
              <td>Weekly&ndash;fortnightly</td>
              <td>Keeping a vehicle presentable between deeper cleans</td>
            </tr>
            <tr>
              <th scope="row">Interior &amp; exterior wash</th>
              <td>Adds vacuuming and a wipe-down of seats, mats, dash, console, and doors</td>
              <td>Every 1&ndash;4 weeks</td>
              <td>Daily drivers, family vehicles, anyone carrying passengers</td>
            </tr>
            <tr>
              <th scope="row">Mobile washing</th>
              <td>The same wash, done where the vehicle is parked</td>
              <td>As above</td>
              <td>People short on time; multiple vehicles at one address</td>
            </tr>
            <tr>
              <th scope="row">Mobile detailing</th>
              <td>Machine polishing, paint correction, headlight restoration, engine-bay cleaning, deep interior work</td>
              <td>Every few months, or before a sale</td>
              <td>Restoring a tired vehicle; protecting a valued one</td>
            </tr>
            <tr>
              <th scope="row">Fabric / extraction cleaning</th>
              <td>Hot-water extraction of seats, carpets, and mats to lift embedded soil and staining</td>
              <td>As needed</td>
              <td>Stained, soiled, or odorous interiors</td>
            </tr>
            <tr>
              <th scope="row">Fleet washing</th>
              <td>Scheduled on-site washing of several company vehicles or trucks</td>
              <td>Weekly&ndash;monthly by vehicle group</td>
              <td>Transport, logistics, and construction operators</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2>What a car wash covers</h2>
      <p>
        A wash is routine upkeep. The exterior is rinsed to lift loose grit, washed with
        detergent, and rinsed again &mdash; body panels, glass, wheels, tyres, and exterior
        trim &mdash; then dried to avoid water spotting. Where an interior and exterior wash is
        booked, the inside is vacuumed and the seats, mats, carpets, dashboard, console, and
        door panels are wiped down. It is quick, it is inexpensive, and it is the service most
        drivers need most often.
      </p>
      <p>
        A wash does not correct paint, remove swirl marks, restore cloudy headlights, clean an
        engine bay, or lift set-in stains and odour from fabric. Those are detailing tasks. A
        wash keeps a vehicle that is already in good order looking that way.
      </p>

      <h2>What mobile washing adds</h2>
      <p>
        Mobile washing is the same wash, carried out where the vehicle is parked rather than at
        a drop-off. The team arrives with water, power, and equipment and works on the car in a
        driveway or an office car park, so there is no queue and no half a day lost. CDCS Inc.
        provides{" "}
        <Link href="/services/car-wash-mobile-vehicle-washing/">
          car wash and mobile vehicle washing
        </Link>{" "}
        in Georgetown, with service elsewhere in Guyana arranged where scheduling and logistics
        permit. Washbay drop-off is available too.
      </p>

      <h2>Interior and exterior washing</h2>
      <p>
        The step up from an exterior-only wash. It suits vehicles that carry passengers daily,
        family cars that collect crumbs and sand, and anyone who wants the cabin kept fresh
        rather than just the paint clean. It is still a wash &mdash; a vacuum and a wipe-down,
        not a scrub of the upholstery &mdash; so it stays quick and affordable. When the inside
        needs more than that, it moves into extraction cleaning.
      </p>

      <h2>What mobile detailing covers</h2>
      <p>
        Detailing is a deeper, slower job aimed at bringing a vehicle back toward its best, or
        keeping a valued one there. Depending on the vehicle and what it needs, a{" "}
        <Link href="/services/mobile-detailing/">mobile detail</Link> can include:
      </p>
      <ul>
        <li>Machine polishing and paint correction to reduce swirl marks and restore gloss</li>
        <li>Headlight restoration for cloudy, yellowed lenses</li>
        <li>Engine-bay cleaning</li>
        <li>A thorough interior clean, beyond a vacuum and wipe</li>
        <li>Deep fabric extraction of seats and carpets where they are soiled or stained</li>
      </ul>
      <p>
        Detailing takes hours, not minutes, and costs accordingly. Most owners detail a few
        times a year at most &mdash; or once, before selling or handing back a vehicle &mdash;
        and wash in between.
      </p>

      <h2>Fabric and extraction cleaning</h2>
      <p>
        When seats, carpets, or mats are stained, soiled, or holding odour, a wipe-down will
        not fix it. Hot-water extraction works a heated cleaning solution into the fibres and
        immediately draws it back out with the loosened soil. CDCS Inc. offers this for vehicle
        interiors as part of{" "}
        <Link href="/services/upholstery-fabric-extraction/">
          carpet, upholstery and fabric cleaning
        </Link>
        , and it can be added to a mobile detail. How much lifts depends on the fabric, the
        type and age of the staining, and any previous treatment &mdash; we give an honest read
        before starting.
      </p>

      <h2>Fleet washing &mdash; the commercial version</h2>
      <p>
        Everything above assumes one or two personal vehicles. Washing a group of company
        vehicles or trucks on a regular schedule is a different service:{" "}
        <Link href="/services/fleet-washing/">fleet washing</Link> is carried out on-site at a
        depot or yard, works through the whole fleet in one session, and is timed around
        dispatch so it does not hold up operations. A small number of pool or management
        vehicles can instead go on a recurring WashCare plan rather than a full fleet
        programme.
      </p>

      <h2>How to choose</h2>
      <ul>
        <li>
          <strong>The car looks fine, it is just dirty.</strong> A wash &mdash; exterior, or
          interior and exterior if passengers ride in it.
        </li>
        <li>
          <strong>You do not have time to sit at a wash.</strong> Mobile washing, at home or
          the office.
        </li>
        <li>
          <strong>The paint looks dull or swirled, the headlights are cloudy, the engine bay
          is grimy.</strong> Detailing.
        </li>
        <li>
          <strong>The seats or carpet are stained or smell.</strong> Fabric extraction, on its
          own or with a detail.
        </li>
        <li>
          <strong>You are selling or handing back the vehicle.</strong> A detail, usually with
          extraction.
        </li>
        <li>
          <strong>You run several company vehicles.</strong> Fleet washing, or WashCare for a
          small group.
        </li>
      </ul>

      <h2>WashCare: putting washing on a schedule</h2>
      <p>
        The routine wash is the one people put off &mdash; it gets left until the car looks
        bad, then done, then left again. WashCare is CDCS Inc.&apos;s recurring
        vehicle-washing programme: an eligible vehicle is washed on a set monthly schedule, at
        the washbay or by mobile service where available, so it stays consistently clean
        without anyone having to remember to book it. The{" "}
        <Link href="/estimate/">CDCS estimator</Link> carries the approved WashCare plans and
        returns a preliminary monthly figure for your vehicle and wash frequency.
      </p>

      <Callout title="Quick decision guide">
        <ul className="list-disc pl-5">
          <li>Dirty but sound &rarr; wash</li>
          <li>No time &rarr; mobile wash</li>
          <li>Want it handled automatically &rarr; WashCare plan</li>
          <li>Paint, lights, engine bay, or deep interior &rarr; detailing</li>
          <li>Stains or odour in the fabric &rarr; extraction cleaning</li>
          <li>Several company vehicles &rarr; fleet washing</li>
        </ul>
      </Callout>

      <h2>Getting an estimate</h2>
      <p>
        For a routine wash or a WashCare plan, start with{" "}
        <Link href="/services/car-wash-mobile-vehicle-washing/">
          car wash and mobile vehicle washing
        </Link>
        . For a deeper job, see{" "}
        <Link href="/services/mobile-detailing/">mobile detailing</Link>. For a company fleet,
        see <Link href="/services/fleet-washing/">fleet washing</Link>. Either way, the{" "}
        <Link href="/estimate/">CDCS estimator</Link> gives a preliminary figure in a few
        questions, and you can then <Link href="/quote/">request an official quotation</Link>.
      </p>
    </ArticleLayout>
  );
}
