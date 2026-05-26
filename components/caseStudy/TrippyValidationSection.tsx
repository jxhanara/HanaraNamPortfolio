import Image from "next/image";
import { trippyValidation } from "@/content/trippyCaseStudy";
import cs from "./caseStudy.module.css";
import {
  caseStudyResponsiveImageStyle,
} from "./caseStudyMedia";
import v from "./trippyValidation.module.css";

export function TrippyValidationSection() {
  return (
    <section id="validation" className={cs.section}>
      <p className={cs.sectionEyebrow}>{trippyValidation.eyebrow}</p>
      <p className={cs.display}>{trippyValidation.displayLine}</p>
      <p className={cs.body}>{trippyValidation.body}</p>

      <div className={cs.validationStatsMedia}>
        <div className={cs.validationStatsStack}>
          {trippyValidation.stats.map((s) => (
            <div key={s.value} className={cs.validationStatBlock}>
              <p className={cs.statValue}>{s.value}</p>
              <p className={cs.statLabel}>{s.label}</p>
            </div>
          ))}
        </div>
        <div className={cs.validationQuotesFigure}>
          <Image
            src={trippyValidation.userQuotesImageSrc}
            alt={trippyValidation.userQuotesImageAlt}
            width={trippyValidation.userQuotesImageWidth}
            height={trippyValidation.userQuotesImageHeight}
            className={cs.caseStudyRaster}
            sizes="(max-width: 900px) 100vw, 520px"
            style={caseStudyResponsiveImageStyle}
          />
        </div>
      </div>

      <div className={v.insightGrid}>
        {trippyValidation.insightModules.map((m) => (
          <article key={m.n} className={v.insightCard}>
            <div className={v.insightStack}>
              <div className={v.insightWatermark} aria-hidden>
                {m.n}
              </div>
              <h3 className={v.insightTitle}>{m.title}</h3>
              <ul className={v.insightBullets}>
                {m.bullets.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
            </div>
          </article>
        ))}
      </div>

      <div className={v.synthesisCallout}>
        <div className={v.synthesisIcon} aria-hidden>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path
              d="M2 7L5 10L12 3"
              stroke="#3881ff"
              strokeWidth="1.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <div>
          <p className={v.synthesisLabel}>Synthesis</p>
          <p className={v.synthesisText}>{trippyValidation.synthesis}</p>
        </div>
      </div>
    </section>
  );
}
