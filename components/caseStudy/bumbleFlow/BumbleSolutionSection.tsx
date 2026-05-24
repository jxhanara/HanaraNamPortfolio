import Image from "next/image";
import { bumbleSolution } from "@/content/bumbleFlowCaseStudy";
import { SolutionSmileIcon } from "../CaseStudyMoodIcons";
import cs from "../caseStudy.module.css";
import {
  caseStudyRailImageSizes,
  caseStudyResponsiveImageStyle,
} from "../caseStudyMedia";
import sp from "./bumbleSystemPillars.module.css";

const ACCENT: Record<(typeof bumbleSolution.pillars)[number]["accent"], string> = {
  green: "#5ee3a8",
  orange: "#f4a261",
  blue: "#6eb5ff",
};

export function BumbleSolutionSection() {
  return (
    <section id="system" className={cs.section}>
      <p className={cs.sectionEyebrow}>{bumbleSolution.eyebrow}</p>
      <p className={cs.display}>{bumbleSolution.displayLine[0]}</p>
      <p className={cs.body}>{bumbleSolution.intro}</p>
      <div className={sp.pillarGrid}>
        {bumbleSolution.pillars.map((p) => (
          <div key={p.kicker} className={sp.pillarCard}>
            <div className={sp.pillarStack}>
              <h3 className={sp.pillarTitle}>{p.kicker}</h3>
              <p className={sp.pillarBody}>{p.body}</p>
              <div className={sp.pillarFooter}>
                <SolutionSmileIcon
                  color={ACCENT[p.accent]}
                  className={sp.pillarMoodIcon}
                  size={32}
                />
              </div>
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
          {mod.image ? (
            <div className={cs.validationConceptWrapFull}>
              <Image
                className={cs.validationConceptImg}
                src={mod.image.src}
                alt={mod.image.alt}
                sizes={caseStudyRailImageSizes}
                style={caseStudyResponsiveImageStyle}
              />
            </div>
          ) : null}
        </article>
      ))}
    </section>
  );
}
