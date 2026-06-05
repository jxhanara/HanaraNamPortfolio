import { trippyStrategy } from "@/content/trippyCaseStudy";
import { StrategyCompareGrid } from "./StrategyCompareGrid";
import cs from "./caseStudy.module.css";
import s from "./trippyStrategy.module.css";

export function TrippyStrategySection() {
  return (
    <section id="strategy" className={cs.section}>
      <p className={cs.sectionEyebrow}>{trippyStrategy.eyebrow}</p>

      <div className={s.header}>
        <h2 className={s.title}>{trippyStrategy.title}</h2>
        <p className={s.summary}>{trippyStrategy.summary}</p>
      </div>

      <StrategyCompareGrid
        fromLabel={trippyStrategy.fromLabel}
        toLabel={trippyStrategy.toLabel}
        rows={trippyStrategy.rows}
        accent="trippy"
      />

      <div className={cs.outcomeBanner}>{trippyStrategy.outcomeLine}</div>
    </section>
  );
}
