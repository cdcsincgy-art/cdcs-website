import type { ProjectImage as ProjectImageData } from "@/lib/project-images";

/** Default `sizes` for responsive images: roughly half the page on wide screens. */
const DEFAULT_SIZES = "(min-width: 1280px) 600px, (min-width: 640px) 50vw, 100vw";

/**
 * Renders an authentic CDCS project photo. Static export can't use next/image
 * optimization, so this is a plain <picture>: a WebP source with a JPEG
 * fallback for the hero images, or a WebP-only <img> for gallery thumbnails.
 * Images with `widths` also get a responsive srcset, so phones download a
 * smaller file; pass `sizes` where the rendered width differs from the default.
 * Width/height are always set to reserve layout space (no CLS).
 */
export function ProjectImage({
  image,
  className = "",
  priority = false,
  sizes = DEFAULT_SIZES,
}: {
  image: ProjectImageData;
  className?: string;
  priority?: boolean;
  sizes?: string;
}) {
  const loading = priority ? "eager" : "lazy";
  const fetchPriority = priority ? "high" : "auto";
  const srcSet = image.widths?.length
    ? [
        ...image.widths.map((w) => `${image.file}-${w}.webp ${w}w`),
        `${image.file}.webp ${image.width}w`,
      ].join(", ")
    : undefined;

  if (image.fallback) {
    return (
      <picture>
        <source
          srcSet={srcSet ?? `${image.file}.webp`}
          sizes={srcSet ? sizes : undefined}
          type="image/webp"
        />
        <img
          src={`${image.file}.jpg`}
          alt={image.alt}
          width={image.width}
          height={image.height}
          loading={loading}
          fetchPriority={fetchPriority}
          decoding="async"
          className={className}
          style={image.focus ? { objectPosition: image.focus } : undefined}
        />
      </picture>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={`${image.file}.webp`}
      srcSet={srcSet}
      sizes={srcSet ? sizes : undefined}
      alt={image.alt}
      width={image.width}
      height={image.height}
      loading={loading}
      fetchPriority={fetchPriority}
      decoding="async"
      className={className}
      style={image.focus ? { objectPosition: image.focus } : undefined}
    />
  );
}
