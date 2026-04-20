import { bumbleSolution } from "@/content/bumbleFlowCaseStudy";
import { SolutionSmileIcon } from "../CaseStudyMoodIcons";
import cs from "../caseStudy.module.css";

const ACCENT: Record<(typeof bumbleSolution.pillars)[number]["accent"], string> = {
  green: "#5ee3a8",
  orange: "#f4a261",
  blue: "#6eb5ff",
};

export function BumbleSolutionSection() {
  return (
    <section id="solution" className={cs.section}>
      <p className={cs.sectionEyebrow}>{bumbleSolution.eyebrow}</p>
      <p className={cs.display}>{bumbleSolution.displayLine[0]}</p>
      <p className={cs.body}>{bumbleSolution.intro}</p>
      <div className={cs.solutionPillars}>
        {bumbleSolution.pillars.map((p) => (
          <div key={p.kicker} className={cs.solutionPillar}>
            <p className={cs.solutionPillarKicker}>{p.kicker}</p>
            <p className={`${cs.bodyTight} ${cs.solutionPillarBody}`}>{p.body}</p>
            <div className={cs.problemCardFooter}>
              <span className={cs.problemCardIcon}>
                <SolutionSmileIcon color={ACCENT[p.accent]} />
              </span>
            </div>
          </div>
        ))}
      </div>

      {bumbleSolution.modules.map((mod) => (
        <article key={mod.n} className={cs.module}>
          <div className={cs.moduleHeader}>
            <span className={cs.moduleNum} aria-hidden>
              {mod.n}
            </span>
            <div>
              <h3 className={cs.moduleTitle}>{mod.title}</h3>
              <p className={cs.moduleBody}>{mod.body}</p>
            </div>
          </div>
        </article>
      ))}
    </section>
  );
}
