import { bumbleStrategy } from "@/content/bumbleFlowCaseStudy";
import { StrategyCompareGrid } from "../StrategyCompareGrid";
import cs from "../caseStudy.module.css";
import s from "./bumbleStrategy.module.css";

export function BumbleStrategySection() {
  return (
    <section id="strategy" className={cs.section}>
      <p className={cs.sectionEyebrow}>{bumbleStrategy.eyebrow}</p>

      <div className={s.header}>
        <h2 className={s.title}>{bumbleStrategy.title}</h2>
        <p className={s.summary}>{bumbleStrategy.summary}</p>
      </div>

      <StrategyCompareGrid
        fromLabel={bumbleStrategy.fromLabel}
        toLabel={bumbleStrategy.toLabel}
        rows={bumbleStrategy.rows}
        accent="bumble"
      />
    </section>
  );
}
