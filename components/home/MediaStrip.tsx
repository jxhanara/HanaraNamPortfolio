import styles from "./styles.module.css";
import { MediaStripVideoCell, type MediaStripVideoSource } from "./MediaStripVideoCell";

export type MediaStripVariant = "bumble" | "trippy";

export type MediaStripProps = {
  /** When set, renders autoplaying muted loop videos instead of placeholder cells. */
  videos?: readonly MediaStripVideoSource[];
  /** Accessible name for the strip when videos are shown. */
  ariaLabel?: string;
  /** Tunes overscan / focal point for letterboxed phone captures. */
  variant?: MediaStripVariant;
  className?: string;
  cellClassName?: string;
};

function videoKey(spec: MediaStripVideoSource): string {
  if (typeof spec === "string") return spec;
  return `${spec.src}:${spec.start ?? 0}:${spec.end ?? "end"}`;
}

export function MediaStrip({
  videos,
  ariaLabel,
  variant,
  className,
  cellClassName,
}: MediaStripProps) {
  if (videos?.length) {
    const stripClass = [
      styles.mediaStrip,
      variant === "bumble" && styles.mediaStripBumble,
      variant === "trippy" && styles.mediaStripTrippy,
      className,
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <div
        className={stripClass}
        role="region"
        aria-label={ariaLabel ?? "Project screen recordings"}
      >
        {videos.map((spec) => (
          <MediaStripVideoCell
            key={videoKey(spec)}
            spec={spec}
            className={`${styles.mediaCell} ${styles.mediaCellVideo} ${cellClassName ?? ""}`.trim()}
          />
        ))}
      </div>
    );
  }

  return (
    <div className={[styles.mediaStrip, className].filter(Boolean).join(" ")} aria-hidden>
      <div className={`${styles.mediaCell} ${cellClassName ?? ""}`.trim()} />
      <div className={`${styles.mediaCell} ${cellClassName ?? ""}`.trim()} />
      <div className={`${styles.mediaCell} ${cellClassName ?? ""}`.trim()} />
    </div>
  );
}
