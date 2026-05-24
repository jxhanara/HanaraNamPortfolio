import Image from "next/image";
import Link from "next/link";
import {
  type CaseStudySlug,
  portfolioCaseStudies,
} from "@/content/caseStudies";
import cs from "./caseStudy.module.css";

type MoreCaseStudiesSectionProps = {
  currentSlug: CaseStudySlug;
};

const CARD_ACCENT: Record<CaseStudySlug, string> = {
  "bumble-flow": cs.moreCaseStudiesCardBumble,
  trippy: cs.moreCaseStudiesCardTrippy,
  "ui-for-ai": cs.moreCaseStudiesCardUiForAi,
};

export function MoreCaseStudiesSection({ currentSlug }: MoreCaseStudiesSectionProps) {
  const others = portfolioCaseStudies.filter((study) => study.slug !== currentSlug);

  return (
    <section className={cs.moreCaseStudies} aria-label="More case studies">
      <p className={cs.moreCaseStudiesEyebrow}>More case studies</p>
      <div className={cs.moreCaseStudiesGrid}>
        {others.map((study) => (
          <Link
            key={study.slug}
            href={study.href}
            className={`${cs.moreCaseStudiesCard} ${CARD_ACCENT[study.slug]}`}
            aria-label={`${study.title} case study — ${study.description}`}
          >
            <div className={cs.moreCaseStudiesMedia}>
              <div className={cs.moreCaseStudiesImageWrap}>
                <Image
                  src={study.imageSrc}
                  alt={study.imageAlt}
                  fill
                  className={cs.moreCaseStudiesImage}
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </div>
            <div className={cs.moreCaseStudiesBody}>
              <h2 className={cs.moreCaseStudiesTitle}>{study.title}</h2>
              <p className={cs.moreCaseStudiesDesc}>{study.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
