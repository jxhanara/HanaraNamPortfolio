import Image from "next/image";
import { bumbleValidation } from "@/content/bumbleFlowCaseStudy";
import cs from "../caseStudy.module.css";

const INITIAL_CONCEPT_SRC = "/assets/bumbleflow/BumbleFlow_InitialConcept.png";

export function BumbleValidationSection() {
  return (
    <section id="validation" className={cs.section}>
      <p className={cs.sectionEyebrow}>{bumbleValidation.eyebrow}</p>
      <p className={cs.display}>{bumbleValidation.displayLine}</p>
      <p className={cs.body}>{bumbleValidation.body}</p>

      <p className={`${cs.body} ${cs.validationIssuesIntro}`}>{bumbleValidation.issuesIntro}</p>

      <div className={cs.validationConceptWrap}>
        <Image
          className={cs.validationConceptImg}
          src={INITIAL_CONCEPT_SRC}
          alt={bumbleValidation.initialConceptAlt}
          width={bumbleValidation.initialConceptWidth}
          height={bumbleValidation.initialConceptHeight}
          sizes="(max-width: 900px) 100vw, min(1100px, 92vw)"
          priority={false}
        />
      </div>

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

      <div className={cs.validationSynthesisCallout}>
        <div className={cs.validationSynthesisIcon} aria-hidden>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path
              d="M2 7L5 10L12 3"
              stroke="#ffce08"
              strokeWidth="1.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <div>
          <p className={cs.validationSynthesisLabel}>Synthesis</p>
          <p className={cs.validationSynthesisText}>{bumbleValidation.synthesis}</p>
        </div>
      </div>
    </section>
  );
}
