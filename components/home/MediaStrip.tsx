import styles from "./styles.module.css";

export type MediaStripVariant = "bumble" | "trippy";

export type MediaStripProps = {
  /** When set, renders autoplaying muted loop videos instead of placeholder cells. */
  videos?: readonly string[];
  /** Accessible name for the strip when videos are shown. */
  ariaLabel?: string;
  /** Tunes overscan / focal point for letterboxed phone captures. */
  variant?: MediaStripVariant;
};

export function MediaStrip({ videos, ariaLabel, variant }: MediaStripProps) {
  if (videos?.length) {
    const stripClass =
      variant === "bumble"
        ? `${styles.mediaStrip} ${styles.mediaStripBumble}`
        : variant === "trippy"
          ? `${styles.mediaStrip} ${styles.mediaStripTrippy}`
          : styles.mediaStrip;

    return (
      <div
        className={stripClass}
        role="region"
        aria-label={ariaLabel ?? "Project screen recordings"}
      >
        {videos.map((src) => (
          <div
            key={src}
            className={`${styles.mediaCell} ${styles.mediaCellVideo}`}
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
    <div className={styles.mediaStrip} aria-hidden>
      <div className={styles.mediaCell} />
      <div className={styles.mediaCell} />
      <div className={styles.mediaCell} />
    </div>
  );
}
