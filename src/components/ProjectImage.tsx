import type { ProjectImage as ProjectImageData } from "@/lib/project-images";

/**
 * Renders an authentic CDCS project photo. Static export can't use next/image
 * optimization, so this is a plain <picture>: a WebP source with a JPEG
 * fallback for the hero images, or a WebP-only <img> for gallery thumbnails.
 * Width/height are always set to reserve layout space (no CLS).
 */
export function ProjectImage({
  image,
  className = "",
  priority = false,
}: {
  image: ProjectImageData;
  className?: string;
  priority?: boolean;
}) {
  const loading = priority ? "eager" : "lazy";
  const fetchPriority = priority ? "high" : "auto";

  if (image.fallback) {
    return (
      <picture>
        <source srcSet={`${image.file}.webp`} type="image/webp" />
        <img
          src={`${image.file}.jpg`}
          alt={image.alt}
          width={image.width}
          height={image.height}
          loading={loading}
          fetchPriority={fetchPriority}
          decoding="async"
          className={className}
        />
      </picture>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={`${image.file}.webp`}
      alt={image.alt}
      width={image.width}
      height={image.height}
      loading={loading}
      fetchPriority={fetchPriority}
      decoding="async"
      className={className}
    />
  );
}
