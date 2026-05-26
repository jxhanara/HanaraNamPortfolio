import Image from "next/image";
import { MoreCaseStudiesSection } from "./MoreCaseStudiesSection";
import {
  trippyCaseStudyMeta,
  trippyCoreComponents,
  trippyProblem,
  trippyReflection,
  trippyResearchCompetitors,
  trippyResearchInsights,
  trippySolution,
  trippyToc,
} from "@/content/trippyCaseStudy";
import { SiteFooter } from "@/components/SiteFooter";
import { CaseStudyTocNav } from "./CaseStudyTocNav";
import { StrategicReadDiagram } from "./StrategicReadDiagram";
import { ProblemFrownIcon, SolutionSmileIcon } from "./CaseStudyMoodIcons";
import { SiteNav } from "@/components/home/SiteNav";
import { TrippyCaseStudyHero } from "./TrippyCaseStudyHero";
import { TrippyStrategySection } from "./TrippyStrategySection";
import { TrippyValidationSection } from "./TrippyValidationSection";
import homeStyles from "@/components/home/styles.module.css";
import cs from "./caseStudy.module.css";
import {
  caseStudyRailImageSizes,
  caseStudyResponsiveImageStyle,
} from "./caseStudyMedia";
import sp from "./bumbleFlow/bumbleSystemPillars.module.css";

const PILLAR_ACCENT: Record<
  (typeof trippyProblem.cards)[number]["accent"],
  string
> = {
  green: "#5ee3a8",
  orange: "#f4a261",
  blue: "#6eb5ff",
};

export function TrippyCaseStudyView() {
  return (
    <div className={homeStyles.page} data-site-rail="case-study">
      <SiteNav />
      <div id="top" className={cs.caseStudyPage}>
        <div className={cs.shellTrack}>
          <div className={cs.shellMain}>
          <TrippyCaseStudyHero />
          <section id="overview" className={cs.section}>
            <p className={cs.sectionEyebrow}>{trippyCaseStudyMeta.overviewEyebrow}</p>
            <p className={cs.display}>
              {trippyCaseStudyMeta.displayThesis[0]}
              <br />
              {trippyCaseStudyMeta.displayThesis[1]}
            </p>
            <div className={cs.twoCol}>
              {trippyCaseStudyMeta.introColumns.map((p) => (
                <p key={p.slice(0, 24)} className={cs.body}>
                  {p}
                </p>
              ))}
            </div>
          </section>

          <section id="problem" className={cs.section}>
            <p className={cs.sectionEyebrow}>{trippyProblem.eyebrow}</p>
            <h2 className={cs.h2}>{trippyProblem.title}</h2>
            {trippyProblem.lead.map((p) => (
              <p key={p.slice(0, 32)} className={cs.body}>
                {p}
              </p>
            ))}
            <div className={sp.pillarGrid}>
              {trippyProblem.cards.map((c) => (
                <div key={c.kicker} className={sp.pillarCard}>
                  <div className={sp.pillarStack}>
                    <h3 className={sp.pillarTitle}>{c.kicker}</h3>
                    <p className={sp.pillarBody}>{c.body}</p>
                    <div className={sp.pillarFooter}>
                      <ProblemFrownIcon
                        color={PILLAR_ACCENT[c.accent]}
                        className={sp.pillarMoodIcon}
                        size={32}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section id="research" className={cs.section}>
            <div className={cs.competitiveSection}>
              <div className={cs.researchTitleBlock}>
                <p className={cs.sectionEyebrow}>{trippyResearchCompetitors.eyebrow}</p>
                <h2 className={cs.h2}>{trippyResearchCompetitors.title}</h2>
              </div>
              <p className={cs.competitiveIntro}>{trippyResearchCompetitors.intro}</p>
              <div className={cs.competitiveGrid}>
                {trippyResearchCompetitors.cards.map((c) => (
                  <article
                    key={c.id}
                    className={cs.competitorCard}
                    data-competitor={c.id}
                  >
                    <div className={cs.competitorLogoRow}>
                      <Image
                        src={c.logoSrc}
                        alt={c.logoAlt}
                        width={320}
                        height={72}
                        className={cs.competitorLogo}
                        sizes="(max-width: 900px) 70vw, 280px"
                      />
                    </div>
                    <div className={cs.competitorMedia}>
                      <div className={cs.competitorMediaInner}>
                        <Image
                          src={c.imageSrc}
                          alt={c.imageAlt}
                          width={c.imageWidth}
                          height={c.imageHeight}
                          sizes="(max-width: 900px) 100vw, 360px"
                        />
                      </div>
                    </div>
                    <div className={cs.competitorCardLower}>
                      <ul className={cs.ratingList} aria-label={`Evaluation: ${c.logoAlt}`}>
                        {c.ratings.map((r) => (
                          <li key={r.label} className={cs.ratingRow}>
                            <span className={cs.ratingLabel}>{r.label}</span>
                            <span className={cs.dotRow} aria-hidden>
                              {[1, 2, 3].map((i) => (
                                <span
                                  key={i}
                                  className={
                                    i <= r.filled ? cs.ratingDotFilled : cs.ratingDot
                                  }
                                />
                              ))}
                            </span>
                          </li>
                        ))}
                      </ul>
                      <div className={cs.competitorSummary}>
                        <p className={cs.summaryLabel}>Summary</p>
                        <p className={cs.summaryText}>{c.summary}</p>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
              <p className={cs.competitiveFootnote}>{trippyResearchCompetitors.footnote}</p>
            </div>

            <div className={cs.strategicReadBlock}>
              <div>
                <p className={cs.eyebrow}>{trippyResearchInsights.eyebrow}</p>
                <h2 className={cs.h2}>{trippyResearchInsights.title}</h2>
                <p className={cs.body} style={{ marginTop: 16 }}>
                  {trippyResearchInsights.body}
                </p>
              </div>
              <StrategicReadDiagram convergence={trippyResearchInsights.strategicConvergence} />
            </div>
          </section>

          <TrippyStrategySection />

          <TrippyValidationSection />

          <section id="solution" className={cs.section}>
            <p className={cs.sectionEyebrow}>{trippySolution.eyebrow}</p>
            <p className={cs.display}>{trippySolution.displayLine[0]}</p>
            <p className={cs.body}>{trippySolution.intro}</p>
            <div className={sp.pillarGrid}>
              {trippySolution.pillars.map((p) => (
                <div key={p.kicker} className={sp.pillarCard}>
                  <div className={sp.pillarStack}>
                    <h3 className={sp.pillarTitle}>{p.kicker}</h3>
                    <p className={sp.pillarBody}>{p.body}</p>
                    <div className={sp.pillarFooter}>
                      <SolutionSmileIcon
                        color={PILLAR_ACCENT[p.accent]}
                        className={sp.pillarMoodIcon}
                        size={32}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {trippySolution.modules.map((mod) => (
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
                <div className={cs.validationConceptWrapFull}>
                  <Image
                    src={mod.imageSrc}
                    alt={mod.imageAlt}
                    width={mod.imageWidth}
                    height={mod.imageHeight}
                    className={cs.validationConceptImg}
                    sizes={caseStudyRailImageSizes}
                    style={caseStudyResponsiveImageStyle}
                  />
                </div>
              </article>
            ))}
          </section>

          <section id="decisions" className={cs.section}>
            <p className={cs.sectionEyebrow}>{trippyCoreComponents.eyebrow}</p>
            <h2 className={cs.h2}>{trippyCoreComponents.title}</h2>
            <p className={cs.body}>{trippyCoreComponents.body}</p>
            <div className={cs.designSystemVisualRoot}>
              <div className={cs.moduleMediaFull}>
                <Image
                  src={trippyCoreComponents.imageSrc}
                  alt={trippyCoreComponents.imageAlt}
                  width={trippyCoreComponents.imageWidth}
                  height={trippyCoreComponents.imageHeight}
                  className={cs.moduleImageUncropped}
                  sizes={caseStudyRailImageSizes}
                  style={caseStudyResponsiveImageStyle}
                />
              </div>
            </div>
          </section>

          <section id="reflection" className={`${cs.section} ${cs.sectionBeforeNext}`}>
            <p className={cs.sectionEyebrow}>{trippyReflection.eyebrow}</p>
            <div className={cs.reflectionSplit}>
              <div className={cs.reflectionSplitCopy}>
                <h2 className={`${cs.h2} ${cs.reflectionSplitHeading}`}>{trippyReflection.title}</h2>
                <div className={cs.reflectionIntro}>
                  {trippyReflection.intro.map((p) => (
                    <p key={p.slice(0, 48)} className={cs.body}>
                      {p}
                    </p>
                  ))}
                </div>
              </div>
              <div className={cs.reflectionCardStack}>
                {trippyReflection.takeaways.map((t) => (
                  <article key={t.n} className={cs.takeawayCard}>
                    <div className={cs.takeawayCardBadge} aria-hidden>
                      {t.n}
                    </div>
                    <h3 className={cs.takeawayCardTitle}>{t.title}</h3>
                    <p className={cs.takeawayCardBody}>{t.body}</p>
                  </article>
                ))}
              </div>
            </div>
          </section>

          <MoreCaseStudiesSection currentSlug="trippy" />
          </div>

          <div className={cs.tocWrap}>
            <CaseStudyTocNav items={trippyToc} />
          </div>
        </div>

        <SiteFooter />
      </div>
    </div>
  );
}
