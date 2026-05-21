import { bumbleCaseStudyMeta } from "@/content/bumbleFlowCaseStudy";
import cs from "../caseStudy.module.css";

export function BumbleOverviewSection() {
  return (
    <section id="overview" className={cs.section}>
      <p className={cs.sectionEyebrow}>{bumbleCaseStudyMeta.overviewEyebrow}</p>
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
    </section>
  );
}
