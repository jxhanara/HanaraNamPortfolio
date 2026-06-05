import Image from "next/image";
import { bumbleValidation } from "@/content/bumbleFlowCaseStudy";
import cs from "../caseStudy.module.css";
import { caseStudyRailImageSizes } from "../caseStudyMedia";

const INITIAL_CONCEPT_SRC = "/assets/bumbleflow/BumbleFlow_InitialConcept.png";

const PHONE_SLICE_OFFSETS = ["translateX(0)", "translateX(-33.333%)", "translateX(-66.666%)"] as const;

export function BumbleValidationSection() {
  return (
    <section id="validation" className={cs.section}>
      <p className={cs.sectionEyebrow}>{bumbleValidation.eyebrow}</p>
      <p className={cs.display}>{bumbleValidation.displayLine}</p>
      <p className={cs.body}>{bumbleValidation.body}</p>

      <p className={`${cs.body} ${cs.validationIssuesIntro}`}>{bumbleValidation.issuesIntro}</p>

      <div className={cs.validationThreeCol}>
        {bumbleValidation.issueModules.map((m, index) => (
          <div key={m.n} className={cs.validationCol}>
            <div className={cs.validationPhoneCol}>
              <Image
                className={`${cs.validationConceptImg} ${cs.validationPhoneSlice}`}
                src={INITIAL_CONCEPT_SRC}
                alt={index === 0 ? bumbleValidation.initialConceptAlt : ""}
                width={bumbleValidation.initialConceptWidth}
                height={bumbleValidation.initialConceptHeight}
                sizes={caseStudyRailImageSizes}
                style={{ transform: PHONE_SLICE_OFFSETS[index] }}
                aria-hidden={index !== 0}
              />
            </div>

            <article
              className={cs.issueTestFlip}
              tabIndex={0}
              aria-label={`${m.title}. Hover or focus to read user quote.`}
            >
              <div className={cs.issueTestFlipInner}>
                <div className={cs.issueTestFlipFaceFront}>
                  <div className={cs.issueTestCardStack}>
                    <span className={cs.issueTestCardNum} aria-hidden>
                      {m.n}
                    </span>
                    <h3 className={cs.issueTestCardTitle}>{m.title}</h3>
                    <ul className={cs.issueTestCardBullets}>
                      {m.bullets.map((b) => (
                        <li key={b}>{b}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className={cs.issueTestFlipFaceBack}>
                  <div className={cs.issueTestFlipBackContent}>
                    <p className={cs.issueTestFlipQuoteEyebrow}>User quote</p>
                    <blockquote className={cs.issueTestFlipQuote}>“{m.quote}”</blockquote>
                  </div>
                </div>
              </div>
            </article>
          </div>
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
