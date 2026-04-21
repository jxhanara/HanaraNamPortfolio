import { bumbleReflection } from "@/content/bumbleFlowCaseStudy";
import cs from "../caseStudy.module.css";

export function BumbleReflectionSection() {
  return (
    <section id="reflection" className={`${cs.section} ${cs.sectionBeforeNext}`}>
      <p className={cs.sectionEyebrow}>{bumbleReflection.eyebrow}</p>
      <div className={cs.reflectionSplit}>
        <div className={cs.reflectionSplitCopy}>
          <h2 className={`${cs.h2} ${cs.reflectionSplitHeading}`}>{bumbleReflection.title}</h2>
          <div className={cs.reflectionIntro}>
            {bumbleReflection.intro.map((p) => (
              <p key={p.slice(0, 48)} className={cs.body}>
                {p}
              </p>
            ))}
          </div>
        </div>
        <div className={cs.reflectionCardStack}>
          {bumbleReflection.takeaways.map((t) => (
            <article key={t.n} className={cs.takeawayCard}>
              <div className={cs.takeawayCardBadge} aria-hidden>
                {t.n}
              </div>
              <h3 className={cs.takeawayCardTitle}>{t.title}</h3>
              <p className={cs.takeawayCardBody}>{t.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
