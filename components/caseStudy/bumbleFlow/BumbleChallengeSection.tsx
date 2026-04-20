import { bumbleChallenge } from "@/content/bumbleFlowCaseStudy";
import cs from "../caseStudy.module.css";

export function BumbleChallengeSection() {
  return (
    <section id="challenge" className={cs.section}>
      <p className={cs.sectionEyebrow}>{bumbleChallenge.eyebrow}</p>
      <h2 className={cs.h2}>{bumbleChallenge.title}</h2>
      {bumbleChallenge.lead.map((p) => (
        <p key={p.slice(0, 32)} className={cs.body}>
          {p}
        </p>
      ))}
      <p className={cs.eyebrow} style={{ marginTop: 36 }}>
        {bumbleChallenge.mandateLabel}
      </p>
      <div className={cs.pillarGrid}>
        {bumbleChallenge.mandateBlocks.map((b) => (
          <div key={b.kicker} className={cs.pillarCard}>
            <p className={cs.problemCardKicker}>{b.kicker}</p>
            <p className={cs.bodyTight}>{b.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
