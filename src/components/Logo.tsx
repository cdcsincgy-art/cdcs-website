import Link from "next/link";

export function Logo({ variant = "dark" }: { variant?: "dark" | "light" }) {
  const isLight = variant === "light";
  return (
    <Link href="/" className="flex items-center gap-2.5 shrink-0">
      <span
        className={`flex h-10 w-10 items-center justify-center rounded-md text-base font-black tracking-tight ${
          isLight ? "bg-accent-500 text-navy-950" : "bg-navy-900 text-white"
        }`}
      >
        CD
      </span>
      <span className="flex flex-col leading-none">
        <span className={`text-lg font-extrabold tracking-tight ${isLight ? "text-white" : "text-navy-900"}`}>
          CDCS <span className="text-accent-500">Inc.</span>
        </span>
        <span className={`text-[10px] font-semibold uppercase tracking-[0.18em] ${isLight ? "text-slate-300" : "text-slate-500"}`}>
          Cleaning &amp; Facility Services
        </span>
      </span>
    </Link>
  );
}
