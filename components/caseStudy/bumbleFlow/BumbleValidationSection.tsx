import { bumbleValidation } from "@/content/bumbleFlowCaseStudy";
import cs from "../caseStudy.module.css";

export function BumbleValidationSection() {
  return (
    <section id="validation" className={cs.section}>
      <p className={cs.sectionEyebrow}>{bumbleValidation.eyebrow}</p>
      <p className={cs.display}>{bumbleValidation.displayLine}</p>
      <p className={cs.body}>{bumbleValidation.body}</p>

      <div className={cs.statsRow}>
        {bumbleValidation.stats.map((s) => (
          <div key={s.label} className={cs.validationStatBlock}>
            <p className={cs.statValue}>{s.value}</p>
            <p className={cs.statLabel}>{s.label}</p>
          </div>
        ))}
      </div>

      <p className={cs.specLabel} style={{ marginTop: 8 }}>
        From testing, key issues
      </p>
      <div className={cs.issueTestStack}>
        {bumbleValidation.issueModules.map((m) => (
          <article key={m.n} className={cs.issueTestCard}>
            <div className={cs.issueTestCardTop}>
              <span className={cs.issueTestCardNum} aria-hidden>
                {m.n}
              </span>
              <div>
                <h3 className={cs.issueTestCardTitle}>{m.title}</h3>
              </div>
            </div>
            <ul className={cs.issueTestCardBullets}>
              {m.bullets.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
            <blockquote className={cs.issueTestCardQuote}>“{m.quote}”</blockquote>
          </article>
        ))}
      </div>

      <div className={cs.synthesis}>
        <p className={cs.synthesisLabel}>Synthesis</p>
        <p className={cs.synthesisText}>{bumbleValidation.synthesis}</p>
      </div>
    </section>
  );
}
