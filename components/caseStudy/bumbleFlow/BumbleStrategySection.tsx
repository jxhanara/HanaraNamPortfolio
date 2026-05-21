import { bumbleStrategy } from "@/content/bumbleFlowCaseStudy";
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

      <div className={s.compare}>
        <div className={s.compareHead}>
          <p className={s.fromColLabel}>{bumbleStrategy.fromLabel}</p>
          <p className={s.toColLabel}>{bumbleStrategy.toLabel}</p>
        </div>

        {bumbleStrategy.rows.map((row) => (
          <div key={row.from.title} className={s.compareRow}>
            <div className={s.cell}>
              <p className={s.rowTitleFrom}>{row.from.title}</p>
              <p className={s.rowBody}>{row.from.body}</p>
            </div>
            <div className={s.cell}>
              <p className={s.rowTitleTo}>{row.to.title}</p>
              <p className={s.rowBody}>{row.to.body}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
