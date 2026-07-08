import { bumbleResearch } from "@/content/bumbleFlowCaseStudy";
import { BumbleBridgeShiftVisual } from "./BumbleBridgeShiftVisual";
import { BumbleEngagementDropVisual } from "./BumbleEngagementDropVisual";
import cs from "../caseStudy.module.css";
import rs from "./bumbleResearch.module.css";

export function BumbleResearchSection() {
  return (
    <section id="research" className={cs.section}>
      <p className={cs.sectionEyebrow}>{bumbleResearch.eyebrow}</p>
      <h2 className={cs.h2}>{bumbleResearch.title}</h2>
      {bumbleResearch.lead.map((p) => {
        const [before, after] = p.split("{{analyticsLink}}");
        return (
          <p key={p.slice(0, 32)} className={cs.body}>
            {after !== undefined ? (
              <>
                {before}
                <a
                  href={bumbleResearch.analyticsLinkHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={rs.analyticsLink}
                >
                  {bumbleResearch.analyticsLinkText}
                </a>
                {after}
              </>
            ) : (
              p
            )}
          </p>
        );
      })}

      <BumbleEngagementDropVisual />

      <div className={rs.whyBlock}>
        <p className={rs.whyEyebrow}>{bumbleResearch.whyEyebrow}</p>
        <p className={rs.whyBody}>{bumbleResearch.whyBody}</p>
      </div>

      <div className={rs.themeGrid}>
        {bumbleResearch.themeCards.map((c) => (
          <article key={c.pill} className={rs.themeCard}>
            <span className={rs.themePill}>{c.pill}</span>
            <div className={rs.themeTitle}>{c.title}</div>
            <p className={rs.themeBody}>{c.body}</p>
          </article>
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
