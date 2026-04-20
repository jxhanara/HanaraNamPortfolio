import { bumbleResearch } from "@/content/bumbleFlowCaseStudy";
import { ProblemFrownIcon } from "../CaseStudyMoodIcons";
import cs from "../caseStudy.module.css";

const ACCENT: Record<(typeof bumbleResearch.themeCards)[number]["accent"], string> = {
  green: "#5ee3a8",
  orange: "#f4a261",
  blue: "#6eb5ff",
};

export function BumbleResearchSection() {
  return (
    <section id="research" className={cs.section}>
      <p className={cs.sectionEyebrow}>{bumbleResearch.eyebrow}</p>
      <h2 className={cs.h2}>{bumbleResearch.title}</h2>
      {bumbleResearch.lead.map((p) => (
        <p key={p.slice(0, 32)} className={cs.body}>
          {p}
        </p>
      ))}
      <p className={cs.specLabel} style={{ marginTop: 28 }}>
        {bumbleResearch.engagementCaption}
      </p>
      <div className={cs.engagementCompare}>
        <div className={cs.engagementCompareBlock}>
          <p className={cs.engagementCompareValue}>{bumbleResearch.engagementWasValue}</p>
          <p className={cs.engagementCompareLabel}>{bumbleResearch.engagementWasLabel}</p>
        </div>
        <div className={cs.engagementCompareBlock}>
          <p className={cs.engagementCompareValue}>{bumbleResearch.engagementNowValue}</p>
          <p className={cs.engagementCompareLabel}>{bumbleResearch.engagementNowLabel}</p>
        </div>
      </div>
      <div className={cs.problemGrid}>
        {bumbleResearch.themeCards.map((c) => (
          <div key={c.kicker} className={cs.problemCard}>
            <p className={cs.problemCardKicker}>{c.kicker}</p>
            <p className={cs.problemCardBody}>{c.body}</p>
            <div className={cs.problemCardFooter}>
              <span className={cs.problemCardIcon}>
                <ProblemFrownIcon color={ACCENT[c.accent]} />
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className={cs.strategicReadBlock} style={{ marginTop: 48 }}>
        <div>
          <p className={cs.eyebrow}>{bumbleResearch.bridgeEyebrow}</p>
          <h2 className={cs.h2}>{bumbleResearch.bridgeTitle}</h2>
          <p className={cs.body} style={{ marginTop: 16 }}>
            {bumbleResearch.bridgeBody}
          </p>
        </div>
      </div>
      <div className={cs.hmwCallout}>
        <p className={cs.hmwCalloutText}>{bumbleResearch.hmw}</p>
      </div>
    </section>
  );
}
