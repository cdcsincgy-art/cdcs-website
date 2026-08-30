interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  light?: boolean;
}

export function SectionHeading({ eyebrow, title, description, align = "left", light = false }: SectionHeadingProps) {
  return (
    <div className={`max-w-2xl ${align === "center" ? "mx-auto text-center" : ""}`}>
      {eyebrow && (
        <p className={`mb-3 text-xs font-bold uppercase tracking-[0.2em] ${light ? "text-accent-400" : "text-brand-600"}`}>
          {eyebrow}
        </p>
      )}
      <h2 className={`text-3xl font-bold tracking-tight sm:text-4xl ${light ? "text-white" : "text-navy-900"}`}>
        {title}
      </h2>
      {description && (
        <p className={`mt-4 text-base leading-relaxed sm:text-lg ${light ? "text-slate-200" : "text-slate-600"}`}>
          {description}
        </p>
      )}
    </div>
  );
}
