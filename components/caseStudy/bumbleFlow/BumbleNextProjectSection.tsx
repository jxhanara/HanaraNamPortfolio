import Image from "next/image";
import Link from "next/link";
import { bumbleNextProject } from "@/content/bumbleFlowCaseStudy";
import cs from "../caseStudy.module.css";

export function BumbleNextProjectSection() {
  const p = bumbleNextProject;
  return (
    <section className={cs.nextProject} aria-label="Next case study">
      <Link
        href={p.href}
        className={cs.nextProjectCard}
        aria-label={`${p.title} case study — ${p.description}`}
      >
        <div className={cs.nextProjectLead}>
          <p className={cs.nextProjectEyebrow}>{p.eyebrow}</p>
          <h2 className={cs.nextProjectTitle}>{p.title}</h2>
          <p className={cs.nextProjectDesc}>{p.description}</p>
        </div>
        <div className={cs.nextProjectMedia}>
          <Image
            src={p.imageSrc}
            alt={p.imageAlt}
            fill
            className={cs.nextProjectImage}
            sizes="(max-width: 900px) 100vw, 800px"
            style={{ objectFit: "cover" }}
          />
        </div>
        <div className={cs.nextProjectMeta}>
          <span>{p.metaLeft}</span>
          <span className={cs.nextProjectMetaYear}>{p.metaYear}</span>
        </div>
      </Link>
    </section>
  );
}
