import Image from "next/image";
import { SiteFooter } from "@/components/SiteFooter";
import { CaseStudyTocNav } from "../CaseStudyTocNav";
import { SiteNav } from "@/components/home/SiteNav";
import { UiForAiCaseStudyHero } from "./UiForAiCaseStudyHero";
import { UiForAiProblemSection } from "./UiForAiProblemSection";
import { UiForAiTestingRound1 } from "./UiForAiTestingRound1";
import { UiForAiWhatChangedGallery } from "./UiForAiWhatChangedGallery";
import { UiForAiSeriesAccordion } from "./UiForAiSeriesAccordion";
import {
  uiForAiCaseStudyMeta,
  uiForAiReflection,
  uiForAiConceptTesting,
  uiForAiResearch,
  uiForAiTesting,
  uiForAiToc,
} from "@/content/uiForAiCaseStudy";
import { MoreCaseStudiesSection } from "../MoreCaseStudiesSection";
import homeStyles from "@/components/home/styles.module.css";
import cs from "../caseStudy.module.css";
import { caseStudyResponsiveImageStyle } from "../caseStudyMedia";
import u from "./uiForAiCaseStudy.module.css";
import rewindAiImage from "@/assets/uiforai/rewindai.jpg";
import piecesAppImage from "@/assets/uiforai/piecesapp.png";
import gemNiImage from "@/assets/uiforai/gem-ni.png";
import contextsConceptImage from "@/assets/uiforai/contexts.JPG";
import reentryConceptImage from "@/assets/uiforai/reentrypanel.JPG";
import thematicConceptImage from "@/assets/uiforai/thematicchatgrouping.JPG";
import reEntryPanelMidFiImage from "@/assets/uiforai/UIforAI_ReEntryPanelMidFi.png";
import relatedChatsMidFiImage from "@/assets/uiforai/UIforAI_RelatedChatsMidFi.png";

function PhIconRect() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
      <rect x="1" y="1" width="12" height="12" rx="1" stroke="#333" strokeWidth="1.2" />
    </svg>
  );
}

type ResearchCard = (typeof uiForAiResearch.cards)[number];

function ResearchCardVisual({ card }: { card: ResearchCard }) {
  const alt = card.visualLabel ?? card.name;

  if (card.name === "Rewind AI") {
    return (
      <Image
        src={rewindAiImage}
        alt={alt}
        className={u.researchImage}
        sizes="(max-width: 900px) 100vw, 33vw"
        style={caseStudyResponsiveImageStyle}
      />
    );
  }

  if (card.name === "Pieces") {
    return (
      <Image
        src={piecesAppImage}
        alt={alt}
        className={u.researchImage}
        sizes="(max-width: 900px) 100vw, 33vw"
        style={caseStudyResponsiveImageStyle}
      />
    );
  }

  if (card.name === "GEM-NI") {
    return (
      <Image
        src={gemNiImage}
        alt={alt}
        className={u.researchImage}
        sizes="(max-width: 900px) 100vw, 33vw"
        style={caseStudyResponsiveImageStyle}
      />
    );
  }

  return (
    <div className={u.researchImagePlaceholder}>
      <div className={u.phIcon}>
        <PhIconRect />
      </div>
      <span>{alt}</span>
    </div>
  );
}

export function UiForAiCaseStudyView() {
  return (
    <div className={homeStyles.page} data-site-rail="case-study">
      <SiteNav />
      <div id="top" className={`${cs.caseStudyPage} ${cs.caseStudyPageAccentUiForAi}`}>
        <div className={cs.shellTrack}>
          <div className={cs.shellMain}>
            <UiForAiCaseStudyHero />

            <section id="overview" className={cs.section}>
              <p className={cs.sectionEyebrow}>{uiForAiCaseStudyMeta.overviewEyebrow}</p>
              <p className={cs.display}>
                {uiForAiCaseStudyMeta.displayThesis[0]}
                <br />
                {uiForAiCaseStudyMeta.displayThesis[1]}
              </p>
              <div className={cs.twoCol}>
                {uiForAiCaseStudyMeta.introColumns.map((p) => (
                  <p key={p.slice(0, 28)} className={cs.body}>
                    {p}
                  </p>
                ))}
              </div>
              <UiForAiSeriesAccordion />
            </section>

            <UiForAiProblemSection />

            <section id="research" className={cs.section}>
              <p className={cs.sectionEyebrow}>02 · Research</p>
              <h2 className={cs.h2}>
                {uiForAiResearch.title[0]} {uiForAiResearch.title[1]}
              </h2>
              <div className={u.researchCards}>
                {uiForAiResearch.cards.map((card) => (
                  <article key={card.name} className={u.researchCard}>
                    <div className={u.researchImageFrame}>
                      <ResearchCardVisual card={card} />
                    </div>
                    <div className={u.researchCardBody}>
                      <div className={u.researchCardType}>
                        <span>{card.type}</span>
                        <a href={card.linkHref} target="_blank" rel="noopener noreferrer">
                          {card.linkLabel}
                        </a>
                      </div>
                      <h3 className={u.researchCardName}>{card.name}</h3>
                      <p className={u.researchCardDesc}>{card.description}</p>
                    </div>
                  </article>
                ))}
              </div>

              <div className={u.researchSynthesis}>
                <div className={u.researchSynthesisLead}>
                  <p className={u.researchSynthesisLabel}>{uiForAiResearch.synthesis.label}</p>
                  <h3 className={u.researchSynthesisTitle}>{uiForAiResearch.synthesis.title}</h3>
                </div>
                <div className={u.researchSynthesisCopy}>
                  <p className={u.researchSynthesisBody}>{uiForAiResearch.synthesis.body}</p>
                  <p className={u.researchSynthesisTakeaway}>
                    → {uiForAiResearch.synthesis.takeaway}
                  </p>
                </div>
              </div>
            </section>

            <section id="concept-testing" className={cs.section}>
              <p className={cs.sectionEyebrow}>{uiForAiConceptTesting.eyebrow}</p>
              <h2 className={cs.h2}>{uiForAiConceptTesting.title}</h2>
              <p className={cs.body}>{uiForAiConceptTesting.intro}</p>

              <div className={u.conceptTestingRuledOutGrid}>
                {uiForAiConceptTesting.ruledOut.map((item) => (
                  <article key={item.name} className={u.conceptTestingRuledOutCard}>
                    <div className={u.conceptTestingRuledOutTop}>
                      <p className={u.conceptTestingRuledOutName}>{item.name}</p>
                      <p className={u.conceptTestingRuledOutVerdict}>{item.verdict}</p>
                    </div>
                    <p className={u.conceptTestingRuledOutReason}>{item.reason}</p>
                  </article>
                ))}
              </div>

              <div className={u.conceptTestingDivider}>
                <p className={u.conceptTestingDividerLabel}>{uiForAiConceptTesting.dividerLabel}</p>
                <div className={u.conceptTestingDividerLine} />
              </div>

              <div className={u.conceptTestingGrid}>
                {uiForAiConceptTesting.concepts.map((concept) => {
                  const conceptImage =
                    concept.imageKey === "contexts"
                      ? contextsConceptImage
                      : concept.imageKey === "reentry"
                        ? reentryConceptImage
                        : thematicConceptImage;

                  return (
                    <article key={concept.id} className={u.conceptTestingCard}>
                      <div className={u.conceptTestingImageWrap}>
                        <Image
                          src={conceptImage}
                          alt={concept.imageAlt}
                          className={u.conceptTestingImage}
                          sizes="(max-width: 900px) 100vw, 33vw"
                          style={caseStudyResponsiveImageStyle}
                        />
                      </div>
                      <div className={u.conceptTestingCardBody}>
                        <p className={u.conceptTestingCardTag}>Concept {concept.id}</p>
                        <p className={u.conceptTestingCardName}>{concept.name}</p>
                        <p className={u.conceptTestingCardDesc}>{concept.description}</p>
                      </div>
                    </article>
                  );
                })}
              </div>

              <div className={u.conceptTestingConverge}>
                <div className={u.conceptTestingConvergeIcon} aria-hidden>
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path
                      d="M2 7L5 10L12 3"
                      stroke="#89c5ea"
                      strokeWidth="1.4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <div>
                  <p className={u.conceptTestingConvergeLabel}>
                    {uiForAiConceptTesting.convergence.label}
                  </p>
                  <p className={u.conceptTestingConvergeText}>
                    {uiForAiConceptTesting.convergence.text}
                  </p>
                </div>
              </div>
            </section>

            <section id="testing" className={cs.section}>
              <p className={cs.sectionEyebrow}>{uiForAiTesting.eyebrow}</p>
              <h2 className={cs.h2}>
                {uiForAiTesting.titleLines[0]} {uiForAiTesting.titleLines[1]}
              </h2>
              <p className={cs.body}>{uiForAiTesting.intro}</p>

              <div className={u.testingFlow}>
                <div className={u.testingStep}>
                  <div className={u.testingSpine}>
                    <div className={u.testingDot} />
                    <div className={u.testingLine} />
                  </div>
                  <div className={u.testingStepContent}>
                    <div className={u.conceptTag}>{uiForAiTesting.baseline.tag}</div>
                    <p className={u.roundTitle}>{uiForAiTesting.baseline.title}</p>
                    <p className={u.roundBody}>{uiForAiTesting.baseline.body}</p>
                    <div className={u.testingBaselineCard}>
                      <div className={u.testingBcHeadline}>
                        <p className={u.testingBcNum}>{uiForAiTesting.baseline.statValue}</p>
                        <p className={u.testingBcLabel}>{uiForAiTesting.baseline.statLabel}</p>
                      </div>
                      <p className={u.testingBcContextText}>
                        {uiForAiTesting.baseline.statContext}
                      </p>
                      <p className={u.testingBcNote}>{uiForAiTesting.baseline.footnote}</p>
                    </div>
                  </div>
                </div>

                <div className={u.testingStep}>
                  <div className={u.testingSpine}>
                    <div className={u.testingDot} />
                    <div className={u.testingLine} />
                  </div>
                  <div className={u.testingStepContent}>
                    <div className={u.conceptTag}>{uiForAiTesting.round1.tag}</div>
                    <p className={u.roundTitle}>{uiForAiTesting.round1.title}</p>
                    <p className={u.roundBody}>{uiForAiTesting.round1.body}</p>
                    <UiForAiTestingRound1 />
                  </div>
                </div>

                <div className={u.testingStep}>
                  <div className={u.testingSpine}>
                    <div className={u.testingDot} />
                    <div className={u.testingLine} />
                  </div>
                  <div className={u.testingStepContent}>
                    <div className={u.conceptTag}>{uiForAiTesting.whatChanged.tag}</div>
                    <p className={u.roundTitle}>{uiForAiTesting.whatChanged.title}</p>
                    <p className={u.roundBody}>{uiForAiTesting.whatChanged.body}</p>
                    <UiForAiWhatChangedGallery
                      slides={[
                        {
                          src: reEntryPanelMidFiImage,
                          alt: uiForAiTesting.whatChanged.imageAlts[0],
                        },
                        {
                          src: relatedChatsMidFiImage,
                          alt: uiForAiTesting.whatChanged.imageAlts[1],
                        },
                      ]}
                    />
                  </div>
                </div>

                <div className={u.testingStep}>
                  <div className={u.testingSpine}>
                    <div className={u.testingDot} />
                  </div>
                  <div className={u.testingStepContent}>
                    <div className={u.conceptTag}>{uiForAiTesting.round2.tag}</div>
                    <p className={u.roundTitle}>{uiForAiTesting.round2.title}</p>
                    <p className={u.roundBody}>{uiForAiTesting.round2.body}</p>
                    <div className={u.testingStatBar}>
                      {uiForAiTesting.round2.stats.map((stat) => (
                        <div key={stat.label} className={u.testingStatCell}>
                          <p className={u.testingStatNum}>
                            {stat.number}
                            <span className={u.testingStatSuffix}>{stat.suffix}</span>
                          </p>
                          <p className={u.testingStatLabel}>{stat.label}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section id="solution" className={cs.section}>
              <p className={cs.sectionEyebrow}>04 · Solution</p>
              <h2 className={cs.h2}>The Re-Entry Panel</h2>
              <p className={cs.body}>
                The panel lives alongside the chat and stays available throughout the conversation.
                Users can expand or collapse it whenever they need help reorienting — surfacing
                structure and familiar cues without requiring a scroll through the full transcript.
              </p>

              <div className={`${u.conceptBlock} ${u.conceptBlockFirst}`}>
                <div className={u.conceptTag}>Concept 1 + 2</div>
                <div className={u.conceptName}>Recall Search + Thread Map</div>
                <p className={u.conceptDesc}>
                  Users type keywords they remember — a hotel name, a topic, a file — and the system
                  surfaces relevant past messages. AI-generated topics organize the conversation into
                  scannable sections, giving users both a keyword path and a structural map back into
                  their work.
                </p>
                <div className={u.solutionVideoFrame}>
                  <video
                    className={u.solutionVideo}
                    src="/assets/uiforai/UIforAI_RecallSearch_ThreadMap.mp4"
                    aria-label="Recall Search and Thread Map demo in the Re-Entry Panel"
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="metadata"
                  />
                </div>
              </div>

              <div className={u.conceptBlock}>
                <div className={u.conceptTag}>Concept 3 + 4</div>
                <div className={u.conceptName}>Welcome Back + Next Steps</div>
                <p className={u.conceptDesc}>
                  A collapsible summary appears when you return, catching you up without re-reading
                  the last ten messages. Once reoriented, context-aware Next Steps appear directly in
                  the chat input — pre-filling prompts so users can continue with a single click rather
                  than starting from a blank box.
                </p>
                <div className={u.solutionVideoFrame}>
                  <video
                    className={u.solutionVideo}
                    src="/assets/uiforai/UIforAI_WelcomeBack_NextSteps.mp4"
                    aria-label="Welcome Back summary and Next Steps demo in the Re-Entry Panel"
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="metadata"
                  />
                </div>
              </div>

              <div className={u.conceptBlock}>
                <div className={u.conceptTag}>Concept 5</div>
                <div className={u.conceptName}>Resume State</div>
                <p className={u.conceptDesc}>
                  Work rarely lives in one window. Side-by-Side Reference lets users pull up related
                  chats in the same view, drag outputs across conversations, and merge threads when they
                  belong together — carrying key context, preferences, and decisions forward
                  automatically.
                </p>
                <div className={u.solutionVideoFrame}>
                  <video
                    className={u.solutionVideo}
                    src="/assets/uiforai/UIforAI_ResumeState.mp4"
                    aria-label="Resume State side-by-side reference and thread merge demo"
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="metadata"
                  />
                </div>
              </div>
            </section>

            <section id="reflection" className={`${cs.section} ${cs.sectionBeforeNext}`}>
              <p className={cs.sectionEyebrow}>{uiForAiReflection.eyebrow}</p>
              <div className={cs.reflectionSplit}>
                <div className={cs.reflectionSplitCopy}>
                  <h2 className={`${cs.h2} ${cs.reflectionSplitHeading}`}>
                    {uiForAiReflection.title}
                  </h2>
                  <div className={cs.reflectionIntro}>
                    {uiForAiReflection.intro.map((paragraph) => (
                      <p key={paragraph.slice(0, 48)} className={cs.body}>
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </div>
                <div className={cs.reflectionCardStack}>
                  {uiForAiReflection.takeaways.map((takeaway) => (
                    <article key={takeaway.n} className={cs.takeawayCard}>
                      <div className={cs.takeawayCardBadge} aria-hidden>
                        {takeaway.n}
                      </div>
                      <h3 className={cs.takeawayCardTitle}>{takeaway.title}</h3>
                      <p className={cs.takeawayCardBody}>{takeaway.body}</p>
                    </article>
                  ))}
                </div>
              </div>
            </section>

            <MoreCaseStudiesSection currentSlug="ui-for-ai" />
          </div>

          <div className={cs.tocWrap}>
            <CaseStudyTocNav items={uiForAiToc} />
          </div>
        </div>

        <SiteFooter />
      </div>
    </div>
  );
}
