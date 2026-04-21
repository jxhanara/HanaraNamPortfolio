import { bumbleChallenge } from "@/content/bumbleFlowCaseStudy";
import cs from "../caseStudy.module.css";
import m from "./bumbleChallengeMandate.module.css";

function mandateIndex(n: number) {
  return String(n).padStart(2, "0");
}

export function BumbleChallengeSection() {
  return (
    <section id="challenge" className={cs.section}>
      <p className={cs.sectionEyebrow}>{bumbleChallenge.eyebrow}</p>
      <h2 className={cs.h2}>{bumbleChallenge.title}</h2>
      <div className={m.challengeLead}>
        {bumbleChallenge.lead.map((p) => (
          <p key={p.slice(0, 32)} className={cs.body}>
            {p}
          </p>
        ))}
      </div>
      <p className={cs.eyebrow} style={{ marginTop: 36 }}>
        {bumbleChallenge.mandateLabel}
      </p>
      <div className={m.mandateGrid}>
        {bumbleChallenge.mandateBlocks.map((b, i) => (
          <article key={b.kicker} className={m.mandateCard}>
            <div className={m.mandateStack}>
              <span className={m.mandateWatermark} aria-hidden>
                {mandateIndex(i + 1)}
              </span>
              <h3 className={m.mandateTitle}>{b.kicker}</h3>
              <p className={m.mandateBody}>{b.body}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
