import { bumbleCoreComponents } from "@/content/bumbleFlowCaseStudy";
import cs from "../caseStudy.module.css";

export function BumbleCoreComponentsSection() {
  return (
    <section id="core-components" className={cs.section}>
      <p className={cs.sectionEyebrow}>{bumbleCoreComponents.eyebrow}</p>
      <h2 className={cs.h2}>{bumbleCoreComponents.title}</h2>
      <p className={cs.body}>{bumbleCoreComponents.body}</p>
    </section>
  );
}
