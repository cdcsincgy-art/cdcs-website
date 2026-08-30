import { IconUpload } from "@/components/icons";

interface PlaceholderMediaProps {
  label: string;
  ratio?: "video" | "square" | "portrait" | "wide";
  light?: boolean;
  className?: string;
}

const ratioClasses: Record<NonNullable<PlaceholderMediaProps["ratio"]>, string> = {
  video: "aspect-video",
  square: "aspect-square",
  portrait: "aspect-[3/4]",
  wide: "aspect-[21/9]",
};

/**
 * Clearly-marked placeholder for a real photo/video. Swap these out by
 * dropping real media into /public/images and replacing this component
 * with a plain <img> or <video> tag — see README.md "Adding real photos".
 */
export function PlaceholderMedia({ label, ratio = "video", light = false, className = "" }: PlaceholderMediaProps) {
  return (
    <div
      role="img"
      aria-label={label}
      className={`media-placeholder ${light ? "light" : ""} ${ratioClasses[ratio]} rounded-lg ${className}`}
    >
      <div className="flex max-w-[85%] flex-col items-center gap-2 px-4 py-3 text-center">
        <IconUpload className="h-6 w-6 opacity-70" />
        <span className="text-[11px] font-semibold uppercase tracking-wider opacity-90">
          Placeholder image
        </span>
        <span className="text-xs leading-snug opacity-80">{label}</span>
      </div>
    </div>
  );
}
