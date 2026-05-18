import styles from "./styles.module.css";

export type MediaStripVariant = "bumble" | "trippy";

export type MediaStripProps = {
  /** When set, renders autoplaying muted loop videos instead of placeholder cells. */
  videos?: readonly string[];
  /** Accessible name for the strip when videos are shown. */
  ariaLabel?: string;
  /** Tunes overscan / focal point for letterboxed phone captures. */
  variant?: MediaStripVariant;
  className?: string;
  cellClassName?: string;
};

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
        {videos.map((src) => (
          <div
            key={src}
            className={`${styles.mediaCell} ${styles.mediaCellVideo} ${cellClassName ?? ""}`.trim()}
          >
            <div className={styles.mediaVideoScale}>
              <video
                className={styles.mediaVideo}
                src={src}
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
              />
            </div>
          </div>
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
