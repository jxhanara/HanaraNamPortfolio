import { bumbleResearch } from "@/content/bumbleFlowCaseStudy";
import styles from "./bumbleEngagementDrop.module.css";

export function BumbleEngagementDropVisual() {
  const scale = bumbleResearch.engagementScaleMax;
  const wasPct = bumbleResearch.engagementWasPct;
  const nowPct = bumbleResearch.engagementNowPct;
  const wasH = `${(wasPct / scale) * 100}%`;
  const nowH = `${(nowPct / scale) * 100}%`;

  return (
    <figure className={styles.wrap}>
      <figcaption className={styles.caption}>{bumbleResearch.engagementCaption}</figcaption>

      <div className={styles.chartRow}>
        <div className={styles.col}>
          <p className={styles.pct}>{bumbleResearch.engagementWasValue}</p>
          <div className={styles.barTrack} aria-hidden>
            <div className={`${styles.bar} ${styles.barWas}`} style={{ height: wasH }} />
          </div>
          <p className={styles.label}>{bumbleResearch.engagementWasLabel}</p>
        </div>

        <div className={styles.deltaColumn}>
          <span className={styles.deltaBadge}>{bumbleResearch.engagementDeltaLabel}</span>
          <p className={styles.deltaSub}>{bumbleResearch.engagementDeltaSub}</p>
        </div>

        <div className={styles.col}>
          <p className={styles.pct}>{bumbleResearch.engagementNowValue}</p>
          <div className={styles.barTrack} aria-hidden>
            <div className={`${styles.bar} ${styles.barNow}`} style={{ height: nowH }} />
          </div>
          <p className={styles.label}>{bumbleResearch.engagementNowLabel}</p>
        </div>
      </div>

      <p className={styles.footnote}>
        Bars use a {scale}% comparison band so the decline reads at true scale, not washed out on a
        0–100% axis.
      </p>
    </figure>
  );
}
