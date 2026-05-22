import { trippyStrategy } from "@/content/trippyCaseStudy";
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

      <div className={s.compare}>
        <div className={s.compareHead}>
          <p className={s.fromColLabel}>{trippyStrategy.fromLabel}</p>
          <p className={s.toColLabel}>{trippyStrategy.toLabel}</p>
        </div>

        {trippyStrategy.rows.map((row) => (
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

      <div className={cs.outcomeBanner}>{trippyStrategy.outcomeLine}</div>
    </section>
  );
}
