import { bumbleCaseStudyMeta } from "@/content/bumbleFlowCaseStudy";
import cs from "../caseStudy.module.css";

export function BumbleOverviewSection() {
  return (
    <section id="overview" className={cs.section}>
      <p className={cs.eyebrow}>{bumbleCaseStudyMeta.caseStudyEyebrow}</p>
      <p className={cs.display}>
        {bumbleCaseStudyMeta.displayThesis[0]}
        <br />
        {bumbleCaseStudyMeta.displayThesis[1]}
      </p>
      <div className={cs.twoCol}>
        {bumbleCaseStudyMeta.introColumns.map((p) => (
          <p key={p.slice(0, 24)} className={cs.body}>
            {p}
          </p>
        ))}
      </div>
      <div className={cs.specCard}>
        {bumbleCaseStudyMeta.specRows.map((row) => (
          <div key={row.label} className={cs.specBlock}>
            <p className={cs.specLabel}>{row.label}</p>
            <p className={cs.specValue}>{row.value}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
