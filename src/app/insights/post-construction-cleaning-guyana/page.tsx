import type { Metadata } from "next";
import Link from "next/link";
import { ArticleLayout } from "@/components/insights/ArticleLayout";
import { Callout } from "@/components/insights/Callout";
import { getArticleBySlug } from "@/lib/insights-data";
import { projectImageByFile } from "@/lib/project-images";
import { siteConfig } from "@/lib/site-config";

const article = getArticleBySlug("post-construction-cleaning-guyana")!;

const articleUrl = `${siteConfig.url}/insights/${article.slug}/`;
const heroImage = projectImageByFile(article.heroImageFile);
const heroImageUrl = `${siteConfig.url}${heroImage.file}${heroImage.fallback ? ".jpg" : ".webp"}`;

const faq = [
  {
    q: "When in a project should post-construction cleaning be done?",
    a: "It follows the trades. A rough clean can happen as sections are completed, the main builders' clean is done once construction and installation work is finished, and a final detail clean takes place after snagging and just before handover or occupancy.",
  },
  {
    q: "Is post-construction cleaning the contractor's responsibility or the client's?",
    a: "It depends on the build contract. On many projects the main contractor is responsible for handing over a clean space and arranges it; on others the client or incoming tenant arranges it directly. Agreeing this in writing early avoids a gap at handover.",
  },
  {
    q: "How is it different from a regular deep clean?",
    a: "A deep clean is an intensive reset of a space that is already in use. Post-construction cleaning removes construction-specific residue — fine dust, adhesive, grout haze, paint, silicone, and sticker residue — from a newly built or renovated space before it is used for the first time.",
  },
  {
    q: "Do you work on sites where other trades are still finishing?",
    a: "Yes. CDCS Inc. coordinates with the site manager, works to the site's access and safety requirements, and can clean completed areas in stages while other work continues elsewhere on site.",
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

export default function PostConstructionCleaningArticle() {
  return (
    <ArticleLayout article={article} faq={faq}>
      <p className="lead">
        A finished building is not the same as a building ready to occupy.
        Construction and fit-out work leave fine dust on every surface and in
        every track and vent, plus adhesive, grout haze, paint spots, silicone,
        and sticker residue on glass and fixtures. Post-construction cleaning is
        the stage that closes that gap. This guide explains what it involves,
        the stages it runs in, how it is scoped on an active site, and how
        contractors, developers, and property owners in Guyana can plan for it.
      </p>

      <h2>Why post-construction cleaning is a specialist stage</h2>
      <p>
        Post-construction cleaning is not a bigger version of an office clean.
        The soiling is different — construction dust is fine and pervasive,
        settling back onto surfaces for days, and much of what has to come off is
        stuck on: adhesive from protective film, grout and plaster haze, paint
        flecks, silicone smears, and labels on glazing, appliances, and
        sanitaryware. Removing all of that without marking new finishes takes the
        right method for each surface, which is why it is handled as its own
        stage rather than folded into a general clean.
      </p>
      <p>
        CDCS Inc. carries out{" "}
        <Link href="/services/post-construction-cleaning/">
          post-construction and renovation cleaning
        </Link>{" "}
        for contractors, developers, and property owners in Guyana on new
        offices, retail and restaurant fit-outs, and renovated commercial units.
      </p>

      <h2>The stages of a post-construction clean</h2>
      <p>
        On most projects the work runs in stages that track the build programme
        rather than as a single visit at the end.
      </p>

      <h3>Rough clean</h3>
      <p>
        Carried out during or straight after the trades: removing debris,
        offcuts, packaging, and the bulk of the dust so the space can be worked
        in and inspected. Protective coverings on floors and fittings are checked
        and, where sections are complete, lifted.
      </p>

      <h3>Builders&apos; clean</h3>
      <p>
        The main clean, once construction and installation work is finished. This
        is the pass that takes surfaces from &ldquo;built&rdquo; to
        &ldquo;presentable&rdquo;: all dust removed, residues taken off glass and
        fixtures, floors cleaned and detailed to their finish, and every room
        brought to a consistent standard.
      </p>

      <h3>Final detail clean</h3>
      <p>
        After snagging is complete and any remedial work is done, a final pass
        deals with marks left by that work, polishes glass and fixtures, and
        checks the space against the handover standard so it is ready for
        furniture, fit-out items, or occupation.
      </p>

      <h3>Post-handover touch-up</h3>
      <p>
        An optional short visit once furniture and equipment are installed, to
        clear the dust and packaging that installation generates and to leave the
        space genuinely move-in ready.
      </p>

      <div className="article-table">
        <table>
          <caption>
            The stages of a post-construction clean and how they map to the
            build programme.
          </caption>
          <thead>
            <tr>
              <th scope="col">Stage</th>
              <th scope="col">When</th>
              <th scope="col">Focus</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">Rough clean</th>
              <td>During / just after the trades</td>
              <td>Debris, packaging, bulk dust; make the space workable</td>
            </tr>
            <tr>
              <th scope="row">Builders&apos; clean</th>
              <td>Construction &amp; installation complete</td>
              <td>All dust and residue removed; every room to a consistent standard</td>
            </tr>
            <tr>
              <th scope="row">Final detail clean</th>
              <td>After snagging / remedial work</td>
              <td>Marks from remedial work, glass and fixtures polished, handover standard</td>
            </tr>
            <tr>
              <th scope="row">Post-handover touch-up</th>
              <td>After furniture / fit-out installed</td>
              <td>Installation dust and packaging; move-in ready</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2>The residues a post-construction clean removes</h2>
      <p>
        Knowing what is actually being removed explains why the work takes the
        time it does and why method matters:
      </p>
      <ul>
        <li><strong>Fine construction dust</strong> — from cutting, sanding, and drilling. It is light, travels through the air, settles into every track, reveal, and vent, and returns to surfaces for days, so it needs more than one pass.</li>
        <li><strong>Adhesive and film residue</strong> — from the protective film on windows, doors, worktops, and sanitaryware, which leaves a sticky layer that attracts dirt if it is not removed.</li>
        <li><strong>Grout haze and plaster or render splashes</strong> — a fine film left on tiles and adjacent surfaces after tiling and wet trades.</li>
        <li><strong>Paint flecks and overspray</strong> — on glass, frames, hardware, and floors.</li>
        <li><strong>Silicone and sealant smears</strong> — around glazing, sanitaryware, and joinery.</li>
        <li><strong>Labels and stickers</strong> — on glazing, appliances, sanitaryware, and electrical fittings, along with the adhesive they leave behind.</li>
      </ul>
      <p>
        Each of these comes off differently, and using the wrong approach on a
        new finish — an abrasive pad on glass, a harsh solvent on a coated
        surface — can leave permanent marks. Matching the method to the surface
        is the core skill of the work.
      </p>

      <h2>What gets cleaned, area by area</h2>
      <p>A builders&apos; clean typically covers:</p>
      <ul>
        <li><strong>Floors</strong> — covering removal, debris and dust, then cleaning and detailing appropriate to each finish (tile, vinyl, timber, polished concrete).</li>
        <li><strong>Windows, frames, and tracks</strong> — glass cleaned inside and out where accessible, labels and paint removed, tracks and reveals cleared of dust.</li>
        <li><strong>Doors, frames, and ironmongery</strong> — wiped down, handles and closers cleaned, protective film removed.</li>
        <li><strong>Kitchens and joinery</strong> — cupboards inside and out, worktops, splashbacks, and the fronts of appliances.</li>
        <li><strong>Washrooms and sanitaryware</strong> — fixtures, tiling, grout haze, mirrors, and fittings.</li>
        <li><strong>Lighting, switches, and sockets</strong> — dust removed, plates wiped, diffusers cleaned.</li>
        <li><strong>Vents and grilles</strong> — construction dust cleared so the system is not circulating it later.</li>
        <li><strong>Skirtings, ledges, and high-level surfaces</strong> — the horizontal surfaces where fine dust settles.</li>
      </ul>

      <h2>How the work is scoped on an active site</h2>
      <ul>
        <li>
          <strong>Responsibility.</strong> Whether the clean is the main
          contractor&apos;s obligation or the client&apos;s is usually set in the
          build contract or bill of quantities. Confirm it early so it is not
          discovered as a gap at handover.
        </li>
        <li>
          <strong>Timing.</strong> The clean is booked against the programme —
          after the trades, before fit-out and handover — with a return visit
          allowed for after snagging.
        </li>
        <li>
          <strong>Site provisions.</strong> Power, water, working lighting, safe
          access, and a route for waste removal are normally provided by the
          site; the scope should say so.
        </li>
        <li>
          <strong>Standard.</strong> Agree what &ldquo;clean&rdquo; means for the
          handover — a written spec or an area-by-area checklist gives the clean
          something to be inspected against.
        </li>
      </ul>
      <p>
        Where the exterior, entrances, walkways, or parking areas also need
        attention, post-construction cleaning is combined with{" "}
        <Link href="/services/pressure-washing/">exterior pressure washing</Link>,
        and the incoming occupier&apos;s{" "}
        <Link href="/services/commercial-janitorial-cleaning/">
          recurring janitorial programme
        </Link>{" "}
        can start straight after handover so the space never falls behind.
      </p>

      <h2>Safety and coordination on a construction site</h2>
      <p>
        A live construction site is a different working environment from an
        occupied office. A post-construction cleaning team should work to the
        site&apos;s own requirements: site induction, the required personal
        protective equipment, coordination with the site manager over which areas
        are released for cleaning, and awareness of the hazards that come with
        construction dust, materials, working at height, and wet floors. CDCS Inc.
        plans each project clean around the site&apos;s access hours and
        safety rules.
      </p>

      <h2>Post-construction cleaning versus a deep clean</h2>
      <p>
        The two are often confused. A{" "}
        <Link href="/insights/commercial-deep-cleaning-guyana/">
          commercial deep clean
        </Link>{" "}
        is an intensive reset of a space that is already in use — it tackles
        accumulated grime in an occupied building. Post-construction cleaning
        removes construction-specific residue from a new or renovated space
        before its first use. A space that has been fitted out and then sat
        unused for months may need both: the post-construction clean for the
        build residue, and a{" "}
        <Link href="/services/deep-cleaning/">deep clean</Link> for the dust and
        settling that followed.
      </p>

      <Callout title="A post-construction cleaning checklist for the project team">
        <ul className="list-disc pl-5">
          <li>Confirm in the contract who is responsible for the handover clean.</li>
          <li>Agree the handover standard or an area-by-area spec.</li>
          <li>Book the clean against the programme, not a guessed date.</li>
          <li>Confirm the site will provide power, water, lighting, access, and a waste route.</li>
          <li>Allow for a return visit after snagging.</li>
          <li>Combine with exterior pressure washing if the frontage or compound needs it.</li>
          <li>Line up the incoming occupier&apos;s janitorial programme to start at handover.</li>
        </ul>
      </Callout>

      <h2>Getting post-construction cleaning quoted</h2>
      <p>
        CDCS Inc. assesses the site and its stage, scopes the clean against the
        handover spec, and schedules it around the build programme and the
        site&apos;s access hours. Where it helps, the clean is combined with{" "}
        <Link href="/services/pressure-washing/">pressure washing</Link> for the
        exterior and handed over to a{" "}
        <Link href="/services/commercial-janitorial-cleaning/">
          janitorial programme
        </Link>{" "}
        for the incoming occupier.
      </p>
      <p>
        <Link href="/quote/">Request a quote</Link> with the project type, size,
        and stage, or{" "}
        <Link href="/contact/">contact the CDCS Inc. team</Link> to discuss a
        handover date.
      </p>
    </ArticleLayout>
  );
}
