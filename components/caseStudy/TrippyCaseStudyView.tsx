import Image from "next/image";
import {
  trippyCaseStudyMeta,
  trippyNextProject,
  trippyProblem,
  trippyReflection,
  trippyResearchCompetitors,
  trippyResearchInsights,
  trippySolution,
  trippyStrategy,
  trippyToc,
  trippyValidation,
} from "@/content/trippyCaseStudy";
import { CaseStudyFooter } from "./CaseStudyFooter";
import { CaseStudyTocNav } from "./CaseStudyTocNav";
import { StrategicReadDiagram } from "./StrategicReadDiagram";
import { MediaStrip } from "@/components/home/MediaStrip";
import { SiteNav } from "@/components/home/SiteNav";
import { TRIPPY_STRIP_VIDEOS } from "@/components/home/trippyStrip";
import homeStyles from "@/components/home/styles.module.css";
import cs from "./caseStudy.module.css";

const PROBLEM_ICON_COLOR: Record<
  (typeof trippyProblem.cards)[number]["accent"],
  string
> = {
  green: "#5ee3a8",
  orange: "#f4a261",
  blue: "#6eb5ff",
};

function ProblemFrownIcon({ color }: { color: string }) {
  return (
    <svg
      className={cs.problemCardIconSvg}
      width="44"
      height="44"
      viewBox="0 0 44 44"
      aria-hidden
    >
      <circle cx="22" cy="22" r="15.5" fill="none" stroke={color} strokeWidth="1" />
      <circle cx="17.25" cy="17" r="1.05" fill="none" stroke={color} strokeWidth="1" />
      <circle cx="26.75" cy="17" r="1.05" fill="none" stroke={color} strokeWidth="1" />
      <path
        d="M 15.5 25.5 Q 22 32.5 28.5 25.5"
        fill="none"
        stroke={color}
        strokeWidth="1"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function TrippyCaseStudyView() {
  return (
    <div className={homeStyles.page}>
      <SiteNav />
      <div id="top" className={cs.caseStudyPage}>
        <div className={cs.heroOuter}>
          <div className={cs.heroCard}>
            <div className={cs.heroTop}>
              <h1 className={cs.heroTitle}>{trippyCaseStudyMeta.title}</h1>
              <p className={cs.heroSubtitle}>{trippyCaseStudyMeta.subtitle}</p>
            </div>
            <div className={cs.heroMedia}>
              <MediaStrip
                videos={TRIPPY_STRIP_VIDEOS}
                variant="trippy"
                ariaLabel="Trippy product recordings"
              />
            </div>
          </div>
        </div>

        <div className={cs.shellTrack}>
          <div className={cs.shellMain}>
          <section id="overview" className={cs.section}>
            <p className={cs.eyebrow}>{trippyCaseStudyMeta.caseStudyEyebrow}</p>
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
            <div className={cs.specCard}>
              {trippyCaseStudyMeta.specRows.map((row) => (
                <div key={row.label} className={cs.specBlock}>
                  <p className={cs.specLabel}>{row.label}</p>
                  <p className={cs.specValue}>{row.value}</p>
                </div>
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
            <div className={cs.problemGrid}>
              {trippyProblem.cards.map((c) => (
                <div key={c.kicker} className={cs.problemCard}>
                  <p className={cs.problemCardKicker}>{c.kicker}</p>
                  <p className={cs.problemCardBody}>{c.body}</p>
                  <div className={cs.problemCardFooter}>
                    <span className={cs.problemCardIcon}>
                      <ProblemFrownIcon color={PROBLEM_ICON_COLOR[c.accent]} />
                    </span>
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
                  <article key={c.id} className={cs.competitorCard}>
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
                          fill
                          sizes="(max-width: 900px) 100vw, 360px"
                          style={{ objectFit: "contain" }}
                        />
                      </div>
                    </div>
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

          <section id="strategy" className={cs.section}>
            <p className={cs.sectionEyebrow}>{trippyStrategy.eyebrow}</p>
            <h2 className={cs.h2}>{trippyStrategy.title}</h2>
            <p className={cs.body}>{trippyStrategy.body}</p>

            <div className={cs.synthesis}>
              <p className={cs.synthesisLabel}>{trippyStrategy.pivotEyebrow}</p>
              <p className={cs.synthesisText}>{trippyStrategy.pivotTitle}</p>
            </div>

            <div className={cs.strategySplit}>
              <div className={cs.strategyCol}>
                <p className={cs.strategyColTitle}>{trippyStrategy.initialLabel}</p>
                <p className={cs.strategyHeadline}>{trippyStrategy.initialHeadline}</p>
                <ul className={cs.miniBullets}>
                  {trippyStrategy.initialBullets.map((b) => (
                    <li key={b.title}>
                      <p className={cs.miniBulletTitle}>{b.title}</p>
                      <p className={cs.miniBulletBody}>{b.body}</p>
                    </li>
                  ))}
                </ul>
              </div>
              <div className={cs.strategyCol}>
                <p className={cs.strategyColTitle}>{trippyStrategy.workedLabel}</p>
                <p className={cs.strategyHeadline}>{trippyStrategy.workedHeadline}</p>
                <ul className={cs.miniBullets}>
                  {trippyStrategy.workedBullets.map((b) => (
                    <li key={b.title}>
                      <p className={cs.miniBulletTitle}>{b.title}</p>
                      <p className={cs.miniBulletBody}>{b.body}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className={cs.outcomeBanner}>{trippyStrategy.outcomeLine}</div>
          </section>

          <section id="validation" className={cs.section}>
            <p className={cs.sectionEyebrow}>{trippyValidation.eyebrow}</p>
            <p className={cs.display}>{trippyValidation.displayLine}</p>
            <p className={cs.body}>{trippyValidation.body}</p>

            <div className={cs.validationStatsMedia}>
              <div className={cs.validationStatsStack}>
                {trippyValidation.stats.map((s) => (
                  <div key={s.value} className={cs.validationStatBlock}>
                    <p className={cs.statValue}>{s.value}</p>
                    <p className={cs.statLabel}>{s.label}</p>
                  </div>
                ))}
              </div>
              <div className={cs.validationQuotesFigure}>
                <Image
                  src={trippyValidation.userQuotesImageSrc}
                  alt={trippyValidation.userQuotesImageAlt}
                  fill
                  sizes="(max-width: 900px) 100vw, 520px"
                  style={{ objectFit: "contain" }}
                />
              </div>
            </div>

            <div className={cs.insightRow}>
              {trippyValidation.insightModules.map((m) => (
                <div key={m.n} className={cs.insightCard}>
                  <span className={cs.insightBigNum} aria-hidden>
                    {m.n}
                  </span>
                  <div>
                    <h3 className={cs.insightTitle}>{m.title}</h3>
                    <ul className={cs.insightList}>
                      {m.bullets.map((b) => (
                        <li key={b}>{b}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>

            <div className={cs.synthesis}>
              <p className={cs.synthesisLabel}>Synthesis</p>
              <p className={cs.synthesisText}>{trippyValidation.synthesis}</p>
            </div>
          </section>

          <section id="solution" className={cs.section}>
            <p className={cs.sectionEyebrow}>{trippySolution.eyebrow}</p>
            <p className={cs.display}>{trippySolution.displayLine[0]}</p>
            <p className={cs.body}>{trippySolution.intro}</p>
            <div className={cs.solutionPillars}>
              {trippySolution.pillars.map((p) => (
                <div key={p.kicker} className={cs.solutionPillar}>
                  <p className={cs.solutionPillarKicker}>{p.kicker}</p>
                  <p className={cs.bodyTight}>{p.body}</p>
                </div>
              ))}
            </div>

            {trippySolution.modules.map((mod) => (
              <article key={mod.n} className={`${cs.module} ${cs.solutionModuleClamp}`}>
                <div className={cs.moduleHeader}>
                  <span className={cs.moduleNum} aria-hidden>
                    {mod.n}
                  </span>
                  <div>
                    <h3 className={cs.moduleTitle}>{mod.title}</h3>
                    <p className={cs.moduleBody}>{mod.body}</p>
                  </div>
                </div>
                <div className={cs.moduleMediaFull}>
                  <Image
                    src={mod.imageSrc}
                    alt={mod.imageAlt}
                    width={mod.imageWidth}
                    height={mod.imageHeight}
                    className={cs.moduleImageUncropped}
                    sizes="(max-width: 900px) 100vw, min(1100px, 95vw)"
                  />
                </div>
              </article>
            ))}
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

          <section className={cs.nextProject} aria-label="Next case study">
            <p className={cs.nextProjectEyebrow}>{trippyNextProject.eyebrow}</p>
            <a
              href={trippyNextProject.href}
              className={cs.nextProjectCard}
              target="_blank"
              rel="noreferrer"
            >
              <h2 className={cs.nextProjectTitle}>{trippyNextProject.title}</h2>
              <p className={cs.nextProjectDesc}>{trippyNextProject.description}</p>
              <div className={cs.nextProjectMedia}>
                <Image
                  src={trippyNextProject.imageSrc}
                  alt={trippyNextProject.imageAlt}
                  fill
                  className={cs.nextProjectImage}
                  sizes="(max-width: 900px) 100vw, 800px"
                  style={{ objectFit: "cover" }}
                />
              </div>
              <div className={cs.nextProjectMeta}>
                <span>{trippyNextProject.metaLeft}</span>
                <span className={cs.nextProjectMetaYear}>{trippyNextProject.metaYear}</span>
              </div>
            </a>
          </section>
          </div>

          <div className={cs.tocWrap}>
            <CaseStudyTocNav items={trippyToc} />
          </div>
        </div>

        <CaseStudyFooter />
      </div>
    </div>
  );
}
