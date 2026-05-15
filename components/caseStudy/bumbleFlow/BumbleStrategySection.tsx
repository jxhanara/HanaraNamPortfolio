import { bumbleStrategy } from "@/content/bumbleFlowCaseStudy";
import { CaseStudyStrategyPivotArrow } from "../CaseStudyStrategyPivotArrow";
import cs from "../caseStudy.module.css";

export function BumbleStrategySection() {
  return (
    <section id="strategy" className={cs.section}>
      <p className={cs.sectionEyebrow}>{bumbleStrategy.eyebrow}</p>
      <h2 className={cs.h2}>{bumbleStrategy.title}</h2>
      <p className={cs.body}>{bumbleStrategy.body}</p>

      <div className={cs.strategySplit}>
        <div className={cs.strategyCol} data-pivot="from">
          <p className={cs.strategyColTitle}>{bumbleStrategy.initialLabel}</p>
          <p className={cs.strategyHeadline}>{bumbleStrategy.initialHeadline}</p>
          <ul className={cs.miniBullets}>
            {bumbleStrategy.initialBullets.map((b) => (
              <li key={b.title}>
                <p className={cs.miniBulletTitle}>{b.title}</p>
                <p className={cs.miniBulletBody}>{b.body}</p>
              </li>
            ))}
          </ul>
        </div>
        <CaseStudyStrategyPivotArrow />
        <div className={cs.strategyCol} data-pivot="to">
          <p className={cs.strategyColTitle}>{bumbleStrategy.workedLabel}</p>
          <p className={cs.strategyHeadline}>{bumbleStrategy.workedHeadline}</p>
          <ul className={cs.miniBullets}>
            {bumbleStrategy.workedBullets.map((b) => (
              <li key={b.title}>
                <p className={cs.miniBulletTitle}>{b.title}</p>
                <p className={cs.miniBulletBody}>{b.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className={cs.outcomeBanner}>{bumbleStrategy.outcomeLine}</div>
    </section>
  );
}
