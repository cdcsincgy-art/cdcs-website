interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  light?: boolean;
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  light = false,
  className = "",
}: SectionHeadingProps) {
  const centered = align === "center";
  return (
    <div className={`max-w-2xl ${centered ? "mx-auto text-center" : ""} ${className}`}>
      {eyebrow && (
        <p
          className={`mb-4 flex items-center gap-2.5 text-xs font-bold uppercase tracking-[0.22em] ${
            centered ? "justify-center" : ""
          } ${light ? "text-accent-400" : "text-brand-600"}`}
        >
          <span className={`h-px w-6 ${light ? "bg-accent-400/60" : "bg-brand-600/50"}`} aria-hidden />
          {eyebrow}
        </p>
      )}
      <h2
        className={`text-pretty text-[1.9rem] font-bold leading-[1.15] tracking-tight sm:text-4xl ${
          light ? "text-white" : "text-navy-900"
        }`}
      >
        {title}
      </h2>
      {description && (
        <p
          className={`mt-4 text-base leading-relaxed sm:text-lg ${
            light ? "text-slate-200" : "text-slate-600"
          }`}
        >
          {description}
        </p>
      )}
    </div>
  );
}
