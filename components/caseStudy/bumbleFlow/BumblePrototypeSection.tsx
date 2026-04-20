import { bumblePrototype } from "@/content/bumbleFlowCaseStudy";
import cs from "../caseStudy.module.css";

export function BumblePrototypeSection() {
  return (
    <section id="prototype" className={cs.section}>
      <p className={cs.sectionEyebrow}>{bumblePrototype.eyebrow}</p>
      <h2 className={cs.h2}>{bumblePrototype.title}</h2>
      <div className={cs.reflectionIntro}>
        {bumblePrototype.lead.map((p) => (
          <p key={p.slice(0, 40)} className={cs.body}>
            {p}
          </p>
        ))}
      </div>
    </section>
  );
}
