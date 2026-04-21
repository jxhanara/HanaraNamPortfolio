import Image from "next/image";
import { bumbleResearch } from "@/content/bumbleFlowCaseStudy";
import styles from "./bumbleBridgeShift.module.css";

const d = bumbleResearch.bridgeDesignShift;
const r = bumbleResearch;

const NEW_BEFORE_AFTER_SRC = "/assets/bumbleflow/NewBeforeAfterPicture.png";

export function BumbleBridgeShiftVisual() {
  return (
    <div className={styles.wrap} role="group" aria-label="Design shift: from UI-led proximity to system-led messaging">
      <div className={styles.cardShell}>
        <div className={styles.introBlock}>
          <span className={styles.introTag}>{d.tag}</span>
          <p className={styles.introEyebrow}>{r.bridgeEyebrow}</p>
          <h2 className={styles.introStrategicTitle}>{r.bridgeTitle}</h2>
          <p className={styles.introStrategicBody}>{r.bridgeBody}</p>
          <div className={styles.introDivider} aria-hidden />
          <p className={styles.introHeadline}>
            {d.headlineLead}
            <span className={styles.introHeadlineAccent}>{d.headlineAccent}</span>
          </p>
        </div>

        <div className={styles.newBeforeAfterWrap}>
          <Image
            className={styles.newBeforeAfterImg}
            src={NEW_BEFORE_AFTER_SRC}
            alt={d.newBeforeAfterAlt}
            width={d.newBeforeAfterWidth}
            height={d.newBeforeAfterHeight}
            sizes="(max-width: 720px) 100vw, min(1120px, 96vw)"
            priority={false}
          />
        </div>
      </div>
    </div>
  );
}
