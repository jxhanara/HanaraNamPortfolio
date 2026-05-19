import Image from "next/image";
import { bumbleResearch } from "@/content/bumbleFlowCaseStudy";
import styles from "./bumbleBridgeShift.module.css";
import {
  caseStudyRailImageSizes,
  caseStudyResponsiveImageStyle,
} from "../caseStudyMedia";

const d = bumbleResearch.bridgeDesignShift;
const r = bumbleResearch;

const NEW_BEFORE_AFTER_SRC = "/assets/bumbleflow/NewBeforeAfterPicture.png";

export function BumbleBridgeShiftVisual() {
  return (
    <div
      className={styles.wrap}
      role="group"
      aria-label="Strategic read: location moved from UI into system logic"
    >
      <div className={styles.cardShell}>
        <div className={styles.introBlock}>
          <p className={styles.introEyebrow}>{r.bridgeEyebrow}</p>
          <h2 className={styles.introStrategicTitle}>
            {r.bridgeHeadlineLead}
            <span className={styles.introHeadlineAccent}>{r.bridgeHeadlineAccent}</span>
          </h2>
          <p className={styles.introStrategicBody}>{r.bridgeBody}</p>
        </div>

        <div className={styles.newBeforeAfterWrap}>
          <Image
            className={styles.newBeforeAfterImg}
            src={NEW_BEFORE_AFTER_SRC}
            alt={d.newBeforeAfterAlt}
            width={d.newBeforeAfterWidth}
            height={d.newBeforeAfterHeight}
            sizes={caseStudyRailImageSizes}
            style={caseStudyResponsiveImageStyle}
            priority={false}
          />
        </div>
      </div>
    </div>
  );
}
