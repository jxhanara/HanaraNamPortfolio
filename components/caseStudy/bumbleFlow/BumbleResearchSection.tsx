import { bumbleResearch } from "@/content/bumbleFlowCaseStudy";
import { BumbleBridgeShiftVisual } from "./BumbleBridgeShiftVisual";
import { BumbleEngagementDropVisual } from "./BumbleEngagementDropVisual";
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
      {bumbleResearch.lead[0] ? (
        <p className={cs.body}>{bumbleResearch.lead[0]}</p>
      ) : null}
      <BumbleEngagementDropVisual />
      {bumbleResearch.lead.slice(1).map((p, i) => (
        <p
          key={p.slice(0, 32)}
          className={cs.body}
          style={i === 0 ? { marginTop: "clamp(24px, 3vw, 36px)" } : undefined}
        >
          {p}
        </p>
      ))}
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

      <BumbleBridgeShiftVisual />
      <div className={cs.hmwCallout}>
        <p className={cs.hmwQuestionLabel}>{bumbleResearch.hmwEyebrow}</p>
        <p className={cs.hmwCalloutText}>“{bumbleResearch.hmw}”</p>
      </div>
    </section>
  );
}
