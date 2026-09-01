import type { Metadata } from "next";
import Link from "next/link";
import { ArticleLayout } from "@/components/insights/ArticleLayout";
import { Callout } from "@/components/insights/Callout";
import { getArticleBySlug } from "@/lib/insights-data";
import { projectImageByFile } from "@/lib/project-images";
import { siteConfig } from "@/lib/site-config";

const article = getArticleBySlug("commercial-janitorial-contract-guyana")!;

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

export default function JanitorialContractArticle() {
  return (
    <ArticleLayout article={article}>
      <p className="lead">
        Whether you are putting commercial cleaning out to tender for the first
        time or reviewing an arrangement that has drifted over the years, a clear
        service agreement is what keeps expectations aligned and disagreements
        rare. This guide walks through what a well-written commercial janitorial
        service agreement covers — scope, frequencies, staffing, supervision,
        quality control, and pricing — and how to compare quotations fairly. It
        is written for organizations in Guyana that are evaluating janitorial
        services for an office or facility.
      </p>

      <Callout title="A note on legal advice">
        <p>
          This article is general commercial guidance, not legal advice. Contract
          terms, notice periods, and obligations vary with the situation, and a
          binding service agreement should be reviewed with appropriate
          professional or legal advice before it is signed.
        </p>
      </Callout>

      <h2>What a janitorial service agreement should contain</h2>
      <p>
        A commercial cleaning contract does not need to be long, but it does need
        to be specific. Each of the areas below is worth setting out in writing,
        because each is a place where a vague agreement leads to a dispute later.
      </p>

      <h3>A clearly defined scope of work</h3>
      <p>
        The scope of work is the most important part of the agreement and the
        part most often left too loose. It should say exactly what is cleaned,
        how, and — just as importantly — what is not included. A scope that only
        says &ldquo;general office cleaning&rdquo; is where problems begin. A good
        one breaks the building down area by area:
      </p>
      <ul>
        <li>
          <strong>Areas covered</strong> — reception, open-plan and private
          offices, meeting rooms, corridors and stairwells, restrooms, kitchens
          and break rooms, lift interiors, and any external areas such as
          entrances or walkways that form part of the deal.
        </li>
        <li>
          <strong>Areas and tasks explicitly excluded</strong> — for example
          exterior windows above ground-floor level, carpet and upholstery
          extraction, kitchen extract cleaning, or warehouse and production
          floors — so nothing is left to assumption.
        </li>
        <li>
          <strong>Task detail per area</strong> — a restroom line should list
          fixtures, floors, mirrors, touchpoints, restocking, and waste, not just
          &ldquo;clean restrooms&rdquo;.
        </li>
      </ul>
      <p>
        The CDCS Inc.{" "}
        <Link href="/services/commercial-janitorial-cleaning/">
          commercial and janitorial cleaning
        </Link>{" "}
        programmes are built around an agreed scope of this kind, and for larger
        or multi-building sites a{" "}
        <Link href="/services/commercial-facility-cleaning/">
          structured facility cleaning programme
        </Link>{" "}
        sets the scope zone by zone.
      </p>

      <h3>Cleaning frequencies: daily, weekly, and periodic</h3>
      <p>
        Every task in the scope should be tied to a frequency — otherwise there
        is no way to tell whether a job is being done to plan or quietly dropped.
      </p>
      <ul>
        <li>
          <strong>Daily tasks</strong> — restrooms, kitchens, bins, reception,
          high-touch points, and floors in circulation areas.
        </li>
        <li>
          <strong>Several-times-weekly or weekly tasks</strong> — vacuuming of
          lower-traffic offices, internal glass, detailed dusting, and
          board-room resets.
        </li>
        <li>
          <strong>Periodic tasks</strong> — high dusting, vent grilles, light
          fittings, floor machining and re-finishing, and carpet or upholstery
          extraction, each with its own cadence (monthly, quarterly, twice a
          year).
        </li>
      </ul>
      <p>
        It helps to attach a frequency schedule to the agreement as an appendix.
        Our guides to{" "}
        <Link href="/insights/commercial-office-cleaning-guyana/">
          how often a commercial office should be cleaned
        </Link>{" "}
        and{" "}
        <Link href="/insights/carpet-upholstery-cleaning-guyana/">
          how often carpets and upholstery need professional cleaning
        </Link>{" "}
        are a useful starting point for setting those frequencies.
      </p>

      <h3>Staffing, operating hours, and schedules</h3>
      <ul>
        <li>
          <strong>Staffing level</strong> — how many cleaners are assigned to the
          site, and the total cleaning hours per visit or per week. This is what
          a price actually buys, and it is where under-resourced contracts show
          up later.
        </li>
        <li>
          <strong>Operating hours and schedule</strong> — whether cleaning is
          done before opening, after close, or during the day with a day porter,
          and how that fits around your staff and visitors.
        </li>
        <li>
          <strong>Site coverage pattern</strong> — for larger sites, which zones
          are cleaned on which days, and how the week is structured.
        </li>
      </ul>

      <h3>Supervision, management, and backup cover</h3>
      <ul>
        <li>
          <strong>On-site supervision</strong> — whether a supervisor works
          alongside the team or visits, and how often.
        </li>
        <li>
          <strong>Account management</strong> — a named contact above the site
          team for reviews, changes, and escalations.
        </li>
        <li>
          <strong>Relief and backup cover</strong> — how the contractor covers
          planned leave and unplanned absence so the site is not left
          unserviced. This is one of the clearest differences between a well-run
          contract and a fragile one.
        </li>
      </ul>

      <h3>Equipment, supplies, and consumables</h3>
      <p>A common source of confusion is who pays for what:</p>
      <ul>
        <li>
          <strong>Cleaning equipment</strong> — normally provided and maintained
          by the contractor; confirm this and where it is stored on site.
        </li>
        <li>
          <strong>Cleaning chemicals</strong> — provided by the contractor, with
          safe storage arrangements agreed for the site.
        </li>
        <li>
          <strong>Washroom and kitchen consumables</strong> — hand towels, toilet
          paper, soap, and bin liners. State clearly whether these are included
          in the monthly price, billed separately at cost, or supplied by the
          client. This one line prevents a lot of friction later.
        </li>
        <li>
          <strong>PPE and safe-work procedures</strong> — the contractor is
          responsible for its staff&apos;s protective equipment and safe working
          practices, and its team should follow your site&apos;s own health and
          safety rules.
        </li>
      </ul>

      <h3>Site-specific requirements, security, and access</h3>
      <p>
        Cleaning teams often work out of hours and around sensitive areas, so
        access and security deserve their own section:
      </p>
      <ul>
        <li>Keys, alarm codes, and access cards — who holds them, how they are logged, and how they are returned at the end of the contract.</li>
        <li>Staff identification, and any security clearance or induction your site requires before a cleaner starts.</li>
        <li>Sign-in and out-of-hours procedures, and lone-working arrangements.</li>
        <li>Confidentiality expectations where cleaners work around documents, IT, or restricted areas.</li>
      </ul>

      <h3>Quality control, standards, and records</h3>
      <p>
        The agreement should make &ldquo;clean&rdquo; measurable rather than a
        matter of opinion:
      </p>
      <ul>
        <li>
          <strong>Service standards</strong> — a description of the expected
          result for each area, so an inspection has something to check against.
        </li>
        <li>
          <strong>Scheduled inspections</strong> — regular checks by the
          contractor&apos;s supervisor, plus joint inspections with the client at
          an agreed interval, recorded on a checklist.
        </li>
        <li>
          <strong>Corrective action</strong> — a timeframe for putting right
          anything an inspection flags.
        </li>
        <li>
          <strong>Attendance and service records</strong> — sign-in sheets or
          digital logs showing who attended and when.
        </li>
        <li>
          <strong>Incident reporting</strong> — how the team reports damage,
          spills, security concerns, or maintenance faults it notices during a
          visit.
        </li>
      </ul>

      <h3>Communication and escalation</h3>
      <p>
        Set out how day-to-day contact works — usually through the site
        supervisor or account manager — how to raise an issue, and the response
        time you can expect. Include an escalation path for anything not resolved
        at the first level, and agree a schedule of review meetings, monthly or
        quarterly, to catch drift before it becomes a complaint.
      </p>

      <h3>Changes to scope and additional work</h3>
      <ul>
        <li>
          <strong>Scope changes</strong> — how adding a floor, opening a new
          area, or changing a frequency is requested, priced, and confirmed, and
          the notice period involved.
        </li>
        <li>
          <strong>Additional work outside the agreement</strong> — one-off jobs
          such as a post-event clean, a{" "}
          <Link href="/services/deep-cleaning/">one-off deep clean</Link>, or a
          clean-up after building work, and how these are quoted and authorised
          before they go ahead.
        </li>
      </ul>

      <h3>Contract duration, renewal, and termination</h3>
      <ul>
        <li>
          <strong>Duration</strong> — a fixed term (often twelve months), and
          whether there is an initial review period.
        </li>
        <li>
          <strong>Renewal</strong> — whether the contract renews automatically or
          is renegotiated, and the notice required either way.
        </li>
        <li>
          <strong>Termination</strong> — the notice period for each side,
          provisions for ending the contract for cause, and what happens at
          handover: return of keys and access, removal of equipment, and any
          consumables stock or client-owned items.
        </li>
      </ul>

      <h3>Pricing, invoicing, and payment terms</h3>
      <ul>
        <li>
          <strong>Pricing structure</strong> — typically a fixed monthly fee for
          the core recurring scope, with separate rates for periodic tasks and
          ad-hoc work.
        </li>
        <li>
          <strong>What is included versus billed separately</strong> —
          consumables, periodic machine work, and specialist tasks are often
          quoted on top of the monthly fee; make sure you know which.
        </li>
        <li>
          <strong>Invoicing and payment</strong> — invoicing frequency (monthly
          in arrears is common) and the payment terms.
        </li>
        <li>
          <strong>Price review</strong> — how and when the price can change, for
          example an annual review, so there are no mid-term surprises.
        </li>
      </ul>

      <h2>Comparing quotations and choosing a contractor</h2>

      <h3>Compare like for like</h3>
      <p>
        Cleaning quotes are only comparable if every contractor is quoting for
        the same thing. Before you look at price, write your own scope document —
        areas, task detail, frequencies, hours, and how consumables are to be
        handled — and ask each cleaning company to quote against it rather than
        against its own standard offer. Then line the quotes up side by side
        using the framework below.
      </p>

      <div className="article-table">
        <table>
          <caption>
            A framework for comparing commercial janitorial quotations against a
            single scope document.
          </caption>
          <thead>
            <tr>
              <th scope="col">What to compare</th>
              <th scope="col">What to look for</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">Scope match</th>
              <td>Every quote covers the same areas and the same included / excluded tasks as your scope document.</td>
            </tr>
            <tr>
              <th scope="row">Frequencies</th>
              <td>Daily, weekly, and periodic tasks are each mapped to a stated frequency, not left open.</td>
            </tr>
            <tr>
              <th scope="row">Cleaning hours &amp; staffing</th>
              <td>The hours per visit or per week are stated — this is what the price actually buys.</td>
            </tr>
            <tr>
              <th scope="row">Supervision</th>
              <td>On-site supervision or scheduled supervisor visits, and a named account contact.</td>
            </tr>
            <tr>
              <th scope="row">Backup / relief cover</th>
              <td>A defined way of covering leave and absence so the site is never unserviced.</td>
            </tr>
            <tr>
              <th scope="row">Consumables</th>
              <td>Clearly included, billed separately at cost, or client-supplied — on the same basis across all quotes.</td>
            </tr>
            <tr>
              <th scope="row">Periodic tasks</th>
              <td>High dusting, floor machining, carpet extraction and similar are priced and scheduled, not vague.</td>
            </tr>
            <tr>
              <th scope="row">Quality control</th>
              <td>Inspection schedule, checklist, corrective-action timeframe, and service records.</td>
            </tr>
            <tr>
              <th scope="row">Commercial terms</th>
              <td>Duration, renewal, notice periods, price-review mechanism, and invoicing terms.</td>
            </tr>
            <tr>
              <th scope="row">Total value</th>
              <td>Monthly fee plus the realistic cost of everything billed on top — compared over the full term.</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3>Why the cheapest quote is not always the best value</h3>
      <p>
        The lowest number is not automatically the best deal. A quote can be
        cheaper because it assumes fewer cleaning hours, no on-site supervision,
        no relief cover, consumables billed separately, or periodic tasks left
        out. Those gaps tend to surface within a few months as missed work,
        complaints, high staff turnover, and a fresh round of quotations. A
        slightly higher price that resources the site properly is often the
        cheaper option over the life of the contract.
      </p>

      <h3>Questions to ask before appointing a contractor</h3>
      <ul>
        <li>How will you cover staff leave and unplanned absence?</li>
        <li>Who supervises this site, and how often are they here?</li>
        <li>What exactly is included in the monthly price, and what is billed separately?</li>
        <li>How are washroom and kitchen consumables handled?</li>
        <li>How do you run quality inspections, and what happens when something is missed?</li>
        <li>What is your process — and notice period — for a change to scope?</li>
        <li>Can you provide a sample service agreement and inspection checklist?</li>
        <li>How is site access managed during the contract and returned at the end?</li>
        <li>What are the notice periods for termination on each side?</li>
      </ul>

      <Callout title="A quick janitorial-agreement checklist">
        <p>The essentials a commercial cleaning contract should nail down:</p>
        <ul className="mt-2 list-disc pl-5">
          <li>Scope of work, area by area, with exclusions stated</li>
          <li>A frequency for every task, with periodic work scheduled</li>
          <li>Cleaning hours, staffing, and the working schedule</li>
          <li>Supervision, account contact, and backup cover</li>
          <li>Who provides equipment, chemicals, and consumables</li>
          <li>Access, security, and confidentiality arrangements</li>
          <li>Service standards, inspections, records, and incident reporting</li>
          <li>Communication and escalation procedures</li>
          <li>How scope changes and extra work are priced and authorised</li>
          <li>Duration, renewal, termination, and handover</li>
          <li>Pricing structure, invoicing, payment terms, and price review</li>
        </ul>
      </Callout>

      <h2>Building an agreement with CDCS Inc.</h2>
      <p>
        CDCS Inc. is a Georgetown-based commercial cleaning company providing{" "}
        <Link href="/services/commercial-janitorial-cleaning/">
          janitorial services
        </Link>{" "}
        for offices, institutions, and organizations across Guyana, working to a
        defined scope of work with supervised teams and regular quality checks.
        For larger or multi-site facilities, a{" "}
        <Link href="/services/commercial-facility-cleaning/">
          structured facility cleaning programme
        </Link>{" "}
        sets the scope, staffing, and standards for the whole site. We are happy
        to quote against your own scope document and to provide a sample service
        agreement and inspection checklist for your review.
      </p>
      <p>
        <Link href="/quote/">Request a quote</Link> with your facility details,
        operating hours, and priorities, or{" "}
        <Link href="/contact/">contact the CDCS Inc. team</Link> to talk through
        what your organization needs.
      </p>
    </ArticleLayout>
  );
}
