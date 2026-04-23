import Image from "next/image";
import { bumbleCoreComponents } from "@/content/bumbleFlowCaseStudy";
import cs from "../caseStudy.module.css";

export function BumbleCoreComponentsSection() {
  return (
    <section id="core-components" className={cs.section}>
      <p className={cs.sectionEyebrow}>{bumbleCoreComponents.eyebrow}</p>
      <h2 className={cs.h2}>{bumbleCoreComponents.title}</h2>
      <p className={cs.body}>{bumbleCoreComponents.body}</p>

      <div className={cs.validationConceptWrap}>
        <Image
          className={cs.validationConceptImg}
          src={bumbleCoreComponents.image.src}
          alt={bumbleCoreComponents.image.alt}
          width={bumbleCoreComponents.image.width}
          height={bumbleCoreComponents.image.height}
          sizes="(max-width: 900px) 100vw, min(1100px, 92vw)"
        />
      </div>
    </section>
  );
}
