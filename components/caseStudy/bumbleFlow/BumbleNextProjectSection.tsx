import Image from "next/image";
import Link from "next/link";
import { bumbleNextProject } from "@/content/bumbleFlowCaseStudy";
import cs from "../caseStudy.module.css";

export function BumbleNextProjectSection() {
  return (
    <section className={cs.nextProject} aria-label="Next case study">
      <p className={cs.nextProjectEyebrow}>{bumbleNextProject.eyebrow}</p>
      <Link href={bumbleNextProject.href} className={cs.nextProjectCard}>
        <h2 className={cs.nextProjectTitle}>{bumbleNextProject.title}</h2>
        <p className={cs.nextProjectDesc}>{bumbleNextProject.description}</p>
        <div className={cs.nextProjectMedia}>
          <Image
            src={bumbleNextProject.imageSrc}
            alt={bumbleNextProject.imageAlt}
            fill
            className={cs.nextProjectImage}
            sizes="(max-width: 900px) 100vw, 800px"
            style={{ objectFit: "cover" }}
          />
        </div>
        <div className={cs.nextProjectMeta}>
          <span>{bumbleNextProject.metaLeft}</span>
          <span className={cs.nextProjectMetaYear}>{bumbleNextProject.metaYear}</span>
        </div>
      </Link>
    </section>
  );
}
