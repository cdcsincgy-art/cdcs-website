import Link from "next/link";
import type { ReactNode } from "react";

type Variant = "primary" | "accent" | "outline" | "ghost";
type Size = "md" | "lg";

const variantClasses: Record<Variant, string> = {
  primary:
    "bg-brand-600 text-white hover:bg-brand-700 focus-visible:outline-brand-600 shadow-sm shadow-brand-900/10",
  accent:
    "bg-accent-500 text-navy-950 hover:bg-accent-600 focus-visible:outline-accent-600 shadow-sm shadow-accent-900/10",
  outline:
    "border-2 border-white/70 text-white hover:bg-white hover:text-navy-900",
  ghost:
    "border-2 border-navy-800 text-navy-900 hover:bg-navy-900 hover:text-white",
};

const sizeClasses: Record<Size, string> = {
  md: "px-5 py-3 text-sm",
  lg: "px-7 py-4 text-base",
};

interface ButtonProps {
  href: string;
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  className?: string;
  icon?: ReactNode;
  external?: boolean;
}

export function Button({
  href,
  children,
  variant = "primary",
  size = "md",
  className = "",
  icon,
  external = false,
}: ButtonProps) {
  const classes = `inline-flex items-center justify-center gap-2 rounded-md font-semibold tracking-wide transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${variantClasses[variant]} ${sizeClasses[size]} ${className}`;

  if (external || href.startsWith("http") || href.startsWith("tel:") || href.startsWith("mailto:")) {
    return (
      <a href={href} className={classes} target={external ? "_blank" : undefined} rel={external ? "noopener noreferrer" : undefined}>
        {children}
        {icon}
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      {children}
      {icon}
    </Link>
  );
}
