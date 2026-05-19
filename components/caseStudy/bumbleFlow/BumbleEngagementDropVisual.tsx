"use client";

import { useEffect, useRef, useState } from "react";
import { bumbleResearch } from "@/content/bumbleFlowCaseStudy";
import styles from "./bumbleEngagementDrop.module.css";

export function BumbleEngagementDropVisual() {
  const scale = bumbleResearch.engagementScaleMax;
  const wasPct = bumbleResearch.engagementWasPct;
  const nowPct = bumbleResearch.engagementNowPct;
  /* Bars use the comparison band so 18% → 6% reads at true scale, not a 0–100% axis. */
  const wasFill = `${(wasPct / scale) * 100}%`;
  const nowFill = `${(nowPct / scale) * 100}%`;

  const wrapRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const node = wrapRef.current;
    if (!node) return;

    if (typeof IntersectionObserver === "undefined") {
      setActive(true);
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActive(true);
            io.disconnect();
            break;
          }
        }
      },
      { threshold: 0.35, rootMargin: "0px 0px -10% 0px" },
    );
    io.observe(node);
    return () => io.disconnect();
  }, []);

  return (
    <figure ref={wrapRef} className={styles.wrap}>
      <div className={styles.grid}>
        <div className={styles.chartCol}>
          <p className={styles.caption}>{bumbleResearch.engagementCaption}</p>

          <div className={styles.row}>
            <p className={styles.rowLabel}>{bumbleResearch.engagementWasLabel}</p>
            <p className={styles.rowValue}>{bumbleResearch.engagementWasValue}</p>
            <div className={styles.barTrack} aria-hidden>
              <div
                className={`${styles.bar} ${styles.barWas}`}
                style={{ width: active ? wasFill : "0%" }}
              />
            </div>
          </div>

          <div className={styles.row}>
            <p className={styles.rowLabel}>{bumbleResearch.engagementNowLabel}</p>
            <p className={styles.rowValue}>{bumbleResearch.engagementNowValue}</p>
            <div className={styles.barTrack} aria-hidden>
              <div
                className={`${styles.bar} ${styles.barNow}`}
                style={{
                  width: active ? nowFill : "0%",
                  transitionDelay: active ? "0.25s" : "0s",
                }}
              />
            </div>
          </div>
        </div>

        <div className={styles.deltaCol}>
          <p className={styles.deltaEyebrow}>{bumbleResearch.engagementDeltaEyebrow}</p>
          <p className={styles.deltaValue}>{bumbleResearch.engagementDeltaLabel}</p>
          <p className={styles.deltaBody}>{bumbleResearch.engagementDeltaBody}</p>
        </div>
      </div>
    </figure>
  );
}
