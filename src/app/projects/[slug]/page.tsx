import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CTABanner } from "@/components/CTABanner";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ProjectCard } from "@/components/ProjectCard";
import { ServiceCard } from "@/components/ServiceCard";
import { ProjectImage } from "@/components/ProjectImage";
import { IconArrowRight, IconCheck, IconPhone } from "@/components/icons";
import { publishedProjects, getPublishedProject } from "@/lib/projects-data";
import { getServiceBySlug } from "@/lib/services-data";
import { getIndustry } from "@/lib/content-data";
import { projectImageByFile, projectImagePath } from "@/lib/project-images";
import { siteConfig, ogImage } from "@/lib/site-config";
import { pageLd } from "@/lib/seo";

export function generateStaticParams() {
  return publishedProjects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const project = getPublishedProject(slug);
  if (!project) return {};
  const hero = project.images[0] ? projectImageByFile(project.images[0]) : null;
  const images = hero
    ? [{ url: projectImagePath(hero), width: hero.width, height: hero.height, alt: hero.alt }]
    : [ogImage];
  return {
    title: { absolute: project.metaTitle },
    description: project.metaDescription,
    alternates: { canonical: `/projects/${project.slug}/` },
    openGraph: {
      type: "article",
      url: `${siteConfig.url}/projects/${project.slug}/`,
      siteName: siteConfig.brandName,
      title: project.metaTitle,
      description: project.metaDescription,
      images,
    },
    twitter: {
      card: "summary_large_image",
      title: project.metaTitle,
      description: project.metaDescription,
      images,
    },
  };
}

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="text-xl font-bold tracking-tight text-navy-900 sm:text-2xl">{title}</h2>
      <div className="mt-3 text-base leading-relaxed text-slate-700">{children}</div>
    </div>
  );
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getPublishedProject(slug);
  if (!project) notFound();

  const images = project.images.map(projectImageByFile);
  const [hero, ...gallery] = images;
  const services = project.serviceSlugs
    .map((s) => getServiceBySlug(s))
    .filter((s): s is NonNullable<typeof s> => Boolean(s));
  const primaryService = services[0];
  const industries = project.industryIds
    .map((id) => getIndustry(id))
    .filter((i): i is NonNullable<typeof i> => Boolean(i));
  const otherProjects = publishedProjects.filter((p) => p.slug !== project.slug).slice(0, 2);

  const path = `/projects/${project.slug}/`;
  const trail = [
    { name: "Home", path: "/" },
    { name: "Projects", path: "/projects/" },
    { name: project.title, path },
  ];
  const jsonLd = pageLd({
    path,
    name: project.metaTitle,
    description: project.metaDescription,
    trail,
    image: hero ? `${siteConfig.url}${projectImagePath(hero)}` : undefined,
    extra: {
      mentions: services.map((s) => ({
        "@type": "Service",
        name: s.title,
        url: `${siteConfig.url}/services/${s.slug}/`,
        provider: { "@id": `${siteConfig.url}/#business` },
      })),
    },
  });

  // Commercial projects lead to a site assessment; consumer ones to the estimator.
  const consumer = primaryService?.audience === "consumer" && Boolean(primaryService.estimateServiceId);
  const quoteHref = consumer
    ? `/estimate/?service=${primaryService!.estimateServiceId}`
    : primaryService
      ? `/quote/?service=${primaryService.slug}`
      : "/quote/";
  const ctaLabel = consumer ? "Get an Estimate" : "Request a Site Assessment";

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ================= HERO ================= */}
      <section className="relative overflow-hidden bg-navy-950 py-14 sm:py-20">
        <div className="pointer-events-none absolute inset-0 bg-grid-dark opacity-50" aria-hidden />
        <div className="pointer-events-none absolute inset-0 brand-glow opacity-80" aria-hidden />
        <div className="container-page relative grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <Breadcrumbs trail={trail} />
            <p className="mb-4 flex items-center gap-2.5 text-xs font-bold uppercase tracking-[0.22em] text-accent-400">
              <span className="h-px w-6 bg-accent-400/60" aria-hidden />
              Project · {project.serviceCategory}
            </p>
            <h1 className="text-pretty text-4xl font-extrabold leading-[1.1] tracking-tight text-white sm:text-5xl">
              {project.title}
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-slate-300 sm:text-lg">{project.summary}</p>
            <dl className="mt-6 grid max-w-xl grid-cols-2 gap-x-6 gap-y-3 text-sm">
              <div>
                <dt className="text-xs font-bold uppercase tracking-wider text-slate-400">Location</dt>
                <dd className="mt-0.5 font-semibold text-white">{project.location}</dd>
              </div>
              <div>
                <dt className="text-xs font-bold uppercase tracking-wider text-slate-400">Client type</dt>
                <dd className="mt-0.5 font-semibold text-white">{project.clientType}</dd>
              </div>
            </dl>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button href={quoteHref} variant="accent" size="lg" icon={<IconArrowRight className="h-5 w-5" />}>
                {ctaLabel}
              </Button>
              <Button href={siteConfig.contact.phoneHref} variant="outline" size="lg" icon={<IconPhone className="h-5 w-5" />}>
                Call {siteConfig.contact.phoneDisplay}
              </Button>
            </div>
          </div>
          {hero && (
            <div className="relative rounded-2xl border border-white/10 bg-white/[0.04] p-2 shadow-2xl shadow-black/40">
              <div className="aspect-[4/3] overflow-hidden rounded-xl">
                <ProjectImage image={hero} priority className="h-full w-full object-cover" />
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ================= CASE STUDY BODY ================= */}
      <section className="bg-white py-16 sm:py-24">
        <div className="container-page grid gap-12 lg:grid-cols-[1fr_minmax(0,20rem)] lg:gap-16">
          <article className="max-w-3xl space-y-10">
            <Block title="Scope of Work">
              <ul className="grid gap-2.5 sm:grid-cols-2">
                {project.scope.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm leading-relaxed">
                    <IconCheck className="mt-0.5 h-5 w-5 shrink-0 text-brand-600" />
                    {item}
                  </li>
                ))}
              </ul>
            </Block>
            {project.challenge && (
              <Block title="The Challenge">
                <p>{project.challenge}</p>
              </Block>
            )}
            {project.approach && (
              <Block title="The CDCS Approach">
                <p>{project.approach}</p>
              </Block>
            )}
            {project.methodology && project.methodology.length > 0 && (
              <Block title="Equipment & Methodology">
                <ul className="grid gap-2.5 sm:grid-cols-2">
                  {project.methodology.map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-sm leading-relaxed">
                      <IconCheck className="mt-0.5 h-5 w-5 shrink-0 text-brand-600" />
                      {item}
                    </li>
                  ))}
                </ul>
              </Block>
            )}
            {project.execution && (
              <Block title="Execution">
                <p>{project.execution}</p>
              </Block>
            )}
            {project.result && (
              <Block title="Result">
                <p>{project.result}</p>
              </Block>
            )}
            <p className="border-l-2 border-slate-200 pl-4 text-sm leading-relaxed text-slate-500">
              {project.evidenceNote}
            </p>
          </article>

          <aside className="space-y-6 lg:sticky lg:top-28 lg:self-start">
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
              <h2 className="text-sm font-bold uppercase tracking-wider text-navy-900">Related Services</h2>
              <ul className="mt-4 space-y-2.5 text-sm">
                {services.map((s) => (
                  <li key={s.slug}>
                    <Link href={`/services/${s.slug}/`} className="font-semibold text-brand-600 hover:underline">
                      {s.title}
                    </Link>
                  </li>
                ))}
              </ul>
              {industries.length > 0 && (
                <>
                  <h2 className="mt-6 text-sm font-bold uppercase tracking-wider text-navy-900">Sectors</h2>
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {industries.map((i) => (
                      <li key={i.id}>
                        <Link
                          href={`/industries/#${i.id}`}
                          className="inline-block rounded-full border border-slate-300 bg-white px-3 py-1 text-xs font-semibold text-navy-800 hover:border-brand-400 hover:text-brand-700"
                        >
                          {i.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </div>
            <div className="rounded-2xl border border-slate-200 p-6">
              <p className="text-sm leading-relaxed text-slate-700">
                {consumer
                  ? "Want similar results? Answer a few questions for a preliminary figure, then send it through as a booking request."
                  : "Need similar work at your site? Send the location, what needs cleaning, and any access or timing constraints."}
              </p>
              <Button href={quoteHref} size="md" className="mt-4 w-full" icon={<IconArrowRight className="h-4 w-4" />}>
                {consumer ? "Get an Estimate" : "Request a Commercial Quote"}
              </Button>
            </div>
          </aside>
        </div>
      </section>

      {/* ================= PHOTOS ================= */}
      {gallery.length > 0 && (
        <section className="relative overflow-hidden bg-navy-950 py-16 sm:py-24">
          <div className="pointer-events-none absolute inset-0 bg-grid-dark opacity-40" aria-hidden />
          <div className="container-page relative">
            <SectionHeading eyebrow="Photos" title="Project Photos" description="Photographs from the job, as taken on site." light />
            <div className="mt-10 gap-4 sm:columns-2 lg:columns-3">
              {gallery.map((image) => (
                <figure
                  key={image.file}
                  className="mb-4 break-inside-avoid overflow-hidden rounded-xl border border-white/10 bg-navy-900 [&_img]:block [&_img]:w-full"
                >
                  <ProjectImage image={image} className="w-full" />
                  <figcaption className="px-4 py-3 text-sm leading-snug text-slate-200">
                    {image.beforeAfter && (
                      <span className="mr-2 inline-block rounded bg-accent-500 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-navy-950">
                        Before / After
                      </span>
                    )}
                    {image.caption}
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ================= RELATED ================= */}
      <section className="bg-slate-50 py-16 sm:py-24">
        <div className="container-page">
          <SectionHeading eyebrow="Services" title="Services Used on This Project" />
          <div className="mt-10 grid gap-6 sm:grid-cols-3">
            {services.slice(0, 3).map((s) => (
              <ServiceCard key={s.slug} service={s} />
            ))}
          </div>
          {otherProjects.length > 0 && (
            <>
              <div className="mt-16 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
                <SectionHeading eyebrow="More Work" title="Other CDCS Projects" />
                <Link href="/projects/" className="inline-flex shrink-0 items-center gap-1.5 text-sm font-bold text-brand-600 hover:text-brand-700">
                  All projects
                  <IconArrowRight className="h-4 w-4" />
                </Link>
              </div>
              <div className="mt-8 grid gap-6 sm:grid-cols-2">
                {otherProjects.map((p) => (
                  <ProjectCard key={p.slug} project={p} />
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      <CTABanner
        title={primaryService?.ctaTitle ?? "Request a Site Assessment"}
        description={
          consumer
            ? "Get a preliminary figure online, or message CDCS Inc. on WhatsApp to book."
            : "Tell us about your site, fleet, or facility and CDCS Inc. will assess it and send a clear proposal."
        }
        primaryLabel={ctaLabel}
        primaryHref={quoteHref}
        whatsappMessage={`Hello CDCS, I saw your ${project.serviceCategory.toLowerCase()} project and would like to discuss similar work.`}
      />
    </>
  );
}
