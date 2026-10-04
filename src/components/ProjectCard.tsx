import Link from "next/link";
import { ProjectImage } from "@/components/ProjectImage";
import { IconArrowRight, IconMapPin } from "@/components/icons";
import { projectImageByFile } from "@/lib/project-images";
import type { ProjectDefinition } from "@/lib/projects-data";

/** Card linking to a published case study at /projects/<slug>/. */
export function ProjectCard({ project }: { project: ProjectDefinition }) {
  const hero = project.images[0] ? projectImageByFile(project.images[0]) : null;
  return (
    <Link
      href={`/projects/${project.slug}/`}
      className="group flex h-full flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-navy-900/20 hover:shadow-lg hover:shadow-navy-900/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600"
    >
      {hero && (
        <div className="relative aspect-[16/10] overflow-hidden bg-navy-950">
          <ProjectImage
            image={hero}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
          />
          <span className="absolute left-3 top-3 rounded bg-accent-500 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-navy-950">
            {project.serviceCategory}
          </span>
        </div>
      )}
      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-lg font-bold leading-snug text-navy-900">{project.title}</h3>
        <p className="mt-2 flex items-center gap-1.5 text-xs font-semibold text-slate-500">
          <IconMapPin className="h-3.5 w-3.5" />
          {project.location} · {project.clientType}
        </p>
        <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-600">{project.summary}</p>
        <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-brand-600 transition-colors group-hover:text-brand-700">
          View project
          <IconArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  );
}
