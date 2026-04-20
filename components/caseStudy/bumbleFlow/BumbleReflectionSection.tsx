import { bumbleReflection } from "@/content/bumbleFlowCaseStudy";
import cs from "../caseStudy.module.css";

export function BumbleReflectionSection() {
  return (
    <section id="reflection" className={`${cs.section} ${cs.sectionBeforeNext}`}>
      <p className={cs.sectionEyebrow}>{bumbleReflection.eyebrow}</p>
      <h2 className={cs.h2}>{bumbleReflection.title}</h2>
      <div className={cs.reflectionIntro}>
        {bumbleReflection.intro.map((p) => (
          <p key={p.slice(0, 40)} className={cs.body}>
            {p}
          </p>
        ))}
      </div>
    </section>
  );
}
