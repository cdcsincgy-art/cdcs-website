import type { Metadata } from "next";
import Link from "next/link";
import { ArticleLayout } from "@/components/insights/ArticleLayout";
import { Callout } from "@/components/insights/Callout";
import { getArticleBySlug } from "@/lib/insights-data";
import { projectImageByFile } from "@/lib/project-images";
import { siteConfig } from "@/lib/site-config";

const article = getArticleBySlug("commercial-cleaning-cost-guyana")!;

const articleUrl = `${siteConfig.url}/insights/${article.slug}/`;
const heroImage = projectImageByFile(article.heroImageFile);
const heroImageUrl = `${siteConfig.url}${heroImage.file}${heroImage.fallback ? ".jpg" : ".webp"}`;

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

export default function CommercialCleaningCostArticle() {
  return (
    <ArticleLayout article={article}>
      <p className="lead">
        &ldquo;How much does commercial cleaning cost?&rdquo; is one of the first
        questions a business owner or office manager asks, and the honest answer
        is that there is no single figure. A commercial cleaning quote is built
        from the specifics of your facility — its size, how often it is cleaned,
        what the scope covers, and the hours involved. This guide explains each
        of those cost drivers so you can read a quote with confidence and get an
        accurate figure for your own office or facility in Guyana.
      </p>

      <h2>Why there is no standard price for commercial cleaning</h2>
      <p>
        Two businesses on the same street can pay very different amounts for
        cleaning because their buildings, hours, and standards are different. A
        compact professional office cleaned three mornings a week is a small
        fraction of the work — and cost — of a busy multi-floor building with
        public-facing areas, shared washrooms, and a staff kitchen cleaned every
        day. A quote reflects your site, not an average.
      </p>
      <p>
        Be cautious of any provider that gives a firm monthly price without
        seeing the space or asking about your scope and hours. For anything
        beyond a small office, a short walk-round assessment is what makes a
        quote accurate. A structured{" "}
        <Link href="/services/commercial-janitorial-cleaning/">
          commercial cleaning service
        </Link>{" "}
        is priced around a defined scope of work rather than a guess.
      </p>

      <h2>What goes into a commercial cleaning quote</h2>
      <p>
        Most quotes are built from the same set of factors. Understanding them
        makes it much easier to compare providers and to see where a price is
        coming from.
      </p>

      <h3>Facility size and layout</h3>
      <p>
        Floor area is the starting point, but layout matters just as much. Lots
        of small rooms, multiple washrooms, stairwells, glass partitions, and
        separate zones take longer to clean than the same area of open-plan
        space. Number of floors and whether there is lift access also affect the
        time a visit takes, as does the amount of furniture and equipment a
        cleaner has to work around. Two offices of identical square footage can
        differ by a third or more in the hours they require.
      </p>

      <h3>The standard the space is held to</h3>
      <p>
        A back-office store room and a bank&apos;s public banking hall are not
        cleaned to the same standard, and the difference shows up in the price.
        Customer-facing areas, boardrooms, and reception generally need more
        frequent and more detailed attention, so a quote reflects not just what
        is cleaned but how thoroughly and how often each area is expected to be
        kept.
      </p>

      <h3>Cleaning frequency</h3>
      <p>
        Daily service costs more per month than two or three visits a week, but
        often less per visit, because the space never falls far behind. Washrooms
        and kitchens in shared use generally need daily attention regardless of
        how often the rest of the office is done. Our guide to{" "}
        <Link href="/insights/commercial-office-cleaning-guyana/">
          how often a commercial office should be cleaned
        </Link>{" "}
        walks through setting a frequency per area.
      </p>

      <h3>Scope of work — what is and isn&apos;t included</h3>
      <p>
        The scope is the biggest single influence on price after size and
        frequency. A quote for &ldquo;general office cleaning&rdquo; and a quote
        that also covers internal glass, high dusting, floor machining, and
        kitchen appliance cleaning are not the same quote. Agreeing exactly what
        is included — and what is excluded — is what makes two prices comparable.
      </p>

      <h3>Cleaning hours and staffing</h3>
      <p>
        Ultimately a recurring quote is buying a number of cleaning hours per
        week, delivered by a certain number of staff, with or without on-site
        supervision. A lower price often means fewer hours on site — and if the
        hours are not enough for the scope, the standard slips within a couple of
        months. It is worth asking each provider to state the weekly hours and
        the staffing their quote assumes, and whether supervision and cover for
        staff absence are included in that figure or added separately.
      </p>

      <h3>Consumables and supplies</h3>
      <p>
        Washroom and kitchen consumables — hand towels, toilet paper, soap, bin
        liners — are handled differently by different providers: included in the
        monthly fee, billed separately at cost, or supplied by the client.
        Cleaning equipment and chemicals are normally the contractor&apos;s
        responsibility. Knowing which model a quote uses prevents surprises later.
      </p>

      <h3>Periodic and specialist tasks</h3>
      <p>
        Work that happens monthly, quarterly, or a few times a year — hard-floor
        machining and re-finishing,{" "}
        <Link href="/insights/carpet-upholstery-cleaning-guyana/">
          carpet and upholstery extraction
        </Link>
        , high-level cleaning, and a periodic{" "}
        <Link href="/services/deep-cleaning/">deep clean</Link> — is usually
        quoted as separate line items rather than folded into the monthly fee.
      </p>

      <h3>Access, security, and site conditions</h3>
      <p>
        Out-of-hours access, security induction or clearance requirements,
        lone-working arrangements, and difficult site conditions (limited water
        or power, awkward layouts, ongoing construction nearby) all add time and
        therefore cost.
      </p>

      <h3>Location</h3>
      <p>
        A site within the greater Georgetown area is straightforward to schedule
        and staff. A location further out in Guyana may carry a travel or
        logistics component, and is quoted case by case depending on the site and
        the schedule.
      </p>

      <h2>How commercial cleaning is usually priced</h2>
      <ul>
        <li>
          <strong>A fixed monthly fee</strong> for the recurring scope of work.
          This is the most common model for offices and{" "}
          <Link href="/services/commercial-janitorial-cleaning/">
            recurring janitorial programmes
          </Link>
          , and it makes budgeting predictable.
        </li>
        <li>
          <strong>Hourly or per-visit rates</strong> for one-time and ad-hoc work
          — a move-in or move-out clean, a post-event clean, or a one-off deep
          clean.
        </li>
        <li>
          <strong>Separate line items</strong> for periodic tasks and, where they
          are not included, for consumables.
        </li>
      </ul>
      <p>
        A per-area or per-square-foot estimate can be a useful starting point,
        but it is refined by a site visit that accounts for layout, standard,
        and hours. For large or multi-building sites, pricing is built around a
        structured{" "}
        <Link href="/services/commercial-facility-cleaning/">
          facility cleaning programme
        </Link>{" "}
        rather than a simple visit rate.
      </p>

      <h2>Why two quotes for the &ldquo;same job&rdquo; can differ so much</h2>
      <p>
        When quotes come back with a wide spread, the difference is almost always
        in the assumptions, not the building:
      </p>
      <ul>
        <li>Different assumed cleaning hours and staffing levels.</li>
        <li>On-site supervision included in one quote and not the other.</li>
        <li>Relief and backup cover for staff absence built in — or not.</li>
        <li>Consumables inside the monthly fee versus billed on top.</li>
        <li>Periodic tasks priced in versus left for a later invoice.</li>
      </ul>
      <p>
        This is why the lowest number is not automatically the best value: a
        quote that is cheaper because it assumes fewer hours or leaves out
        supervision and cover tends to surface later as missed work and
        complaints. Our guide to{" "}
        <Link href="/insights/commercial-janitorial-contract-guyana/">
          what a commercial janitorial service agreement should include
        </Link>{" "}
        covers how to normalise the scope so quotes are genuinely comparable.
      </p>

      <h2>A commercial cleaning cost-driver checklist</h2>
      <div className="article-table">
        <table>
          <caption>
            The main factors that move a commercial cleaning quote up or down.
          </caption>
          <thead>
            <tr>
              <th scope="col">Cost driver</th>
              <th scope="col">Pushes the price up</th>
              <th scope="col">Keeps the price down</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">Facility size &amp; layout</th>
              <td>Large area, many small rooms, multiple washrooms, several floors</td>
              <td>Compact, open-plan, single floor</td>
            </tr>
            <tr>
              <th scope="row">Cleaning frequency</th>
              <td>Daily service, multiple daily washroom checks</td>
              <td>Two to three visits a week</td>
            </tr>
            <tr>
              <th scope="row">Scope of work</th>
              <td>Broad scope with glass, high dusting, kitchens, floor care</td>
              <td>Core surfaces, floors, washrooms, and waste</td>
            </tr>
            <tr>
              <th scope="row">Cleaning hours &amp; staffing</th>
              <td>More hours on site, dedicated supervision</td>
              <td>Fewer hours, shared supervision</td>
            </tr>
            <tr>
              <th scope="row">Consumables</th>
              <td>Included and stocked by the contractor</td>
              <td>Supplied by the client</td>
            </tr>
            <tr>
              <th scope="row">Periodic &amp; specialist tasks</th>
              <td>Frequent floor machining, carpet extraction, high-level work</td>
              <td>Occasional, booked as needed</td>
            </tr>
            <tr>
              <th scope="row">Access &amp; security</th>
              <td>Strict out-of-hours access, clearance, lone-working rules</td>
              <td>Straightforward daytime or early-morning access</td>
            </tr>
            <tr>
              <th scope="row">Location</th>
              <td>Sites well outside the greater Georgetown area</td>
              <td>Within the greater Georgetown area</td>
            </tr>
          </tbody>
        </table>
      </div>

      <Callout title="Before you compare prices">
        <p>
          Write down your own scope of work first — the areas, the tasks, the
          frequencies, the hours, and how you want consumables handled — and ask
          every provider to quote against it. Prices are only comparable when
          they are quoting for the same thing.
        </p>
      </Callout>

      <h2>Questions to ask about a commercial cleaning quote</h2>
      <p>
        Once you have quotes in hand, a few questions will tell you whether they
        are realistic and comparable:
      </p>
      <ul>
        <li>How many cleaning hours per week does this price assume, and how many staff?</li>
        <li>Is on-site supervision included, or is it an added cost?</li>
        <li>How is cover for staff leave and absence handled — and is it in this price?</li>
        <li>Are washroom and kitchen consumables included, billed at cost, or supplied by us?</li>
        <li>Which periodic tasks (floor machining, carpet extraction, high dusting) are in the monthly fee, and which are quoted separately?</li>
        <li>How and when can the price change over the term of the contract?</li>
        <li>What happens to the price if our scope, hours, or headcount change?</li>
        <li>Can you provide the quote broken into recurring, periodic, and consumable costs?</li>
      </ul>
      <p>
        A provider that can answer these clearly is quoting from a real
        understanding of the site. Vague answers usually mean the number will
        move once the contract starts.
      </p>

      <h2>How to get an accurate quote</h2>
      <p>
        To get a quote you can rely on, have this ready before you contact a
        provider:
      </p>
      <ul>
        <li>Approximate floor area, or a simple floor plan.</li>
        <li>A list of the areas to be cleaned, and any to be excluded.</li>
        <li>Your current cleaning frequency, or the frequency you want.</li>
        <li>Operating hours and the window available for cleaning.</li>
        <li>Any problem areas or higher-standard areas (reception, boardroom, labs).</li>
        <li>Whether you want consumables included or will supply them.</li>
        <li>Access and security constraints.</li>
      </ul>
      <p>
        Expect a short walk-round assessment for anything larger than a small
        office, and ask for the quote broken into its parts — the recurring
        monthly figure, periodic tasks, and consumables — so it is easy to
        compare and to budget.
      </p>

      <Callout title="What to have ready for a quote">
        <ul className="list-disc pl-5">
          <li>Floor area or plan, and a list of areas in and out of scope</li>
          <li>Desired cleaning frequency per area</li>
          <li>Operating hours and the available cleaning window</li>
          <li>Higher-standard areas and known problem spots</li>
          <li>Consumables preference — included or client-supplied</li>
          <li>Access, keys, alarm, and any security requirements</li>
        </ul>
      </Callout>

      <h2>Getting a commercial cleaning quote from CDCS Inc.</h2>
      <p>
        CDCS Inc. provides{" "}
        <Link href="/services/commercial-janitorial-cleaning/">
          professional commercial and janitorial cleaning
        </Link>{" "}
        for offices, institutions, and organizations in Georgetown and across
        Guyana. We assess the site, agree a scope of work and schedule, and
        provide a written proposal with a clear figure for the recurring scope
        plus rates for any periodic or one-time work. Larger and multi-site
        facilities are quoted as a structured{" "}
        <Link href="/services/commercial-facility-cleaning/">
          facility cleaning programme
        </Link>
        .
      </p>
      <p>
        <Link href="/quote/">Request a quote</Link> with your facility details,
        or{" "}
        <Link href="/contact/">contact the CDCS Inc. team</Link> to arrange a
        site assessment.
      </p>
    </ArticleLayout>
  );
}
