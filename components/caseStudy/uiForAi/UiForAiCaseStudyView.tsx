import Image from "next/image";
import Link from "next/link";
import { CaseStudyFooter } from "../CaseStudyFooter";
import { CaseStudyTocNav } from "../CaseStudyTocNav";
import { MediaStrip } from "@/components/home/MediaStrip";
import { SiteNav } from "@/components/home/SiteNav";
import {
  uiForAiCaseStudyMeta,
  uiForAiClosingReflection,
  uiForAiHmw,
  uiForAiOverviewLinks,
  uiForAiResearch,
  uiForAiNextProject,
  uiForAiToc,
} from "@/content/uiForAiCaseStudy";
import homeStyles from "@/components/home/styles.module.css";
import cs from "../caseStudy.module.css";
import u from "./uiForAiCaseStudy.module.css";
import rewindAiImage from "@/assets/uiforai/rewindai.jpg";
import piecesAppImage from "@/assets/uiforai/piecesapp.png";

function PhIconRect() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
      <rect x="1" y="1" width="12" height="12" rx="1" stroke="#333" strokeWidth="1.2" />
    </svg>
  );
}

export function UiForAiCaseStudyView() {
  return (
    <div className={homeStyles.page}>
      <SiteNav />
      <div id="top" className={`${cs.caseStudyPage} ${cs.caseStudyPageAccentUiForAi}`}>
        <div className={cs.heroOuter}>
          <div className={cs.heroCard}>
            <div className={cs.heroTop}>
              <h1 className={cs.heroTitle}>{uiForAiCaseStudyMeta.title}</h1>
              <p className={cs.heroSubtitle}>{uiForAiCaseStudyMeta.subtitle}</p>
            </div>
            <div className={cs.heroMedia}>
              <MediaStrip ariaLabel="Prototype recording placeholder" />
            </div>
          </div>
        </div>

        <div className={cs.shellTrack}>
          <div className={cs.shellMain}>
            <section id="overview" className={cs.section}>
              <p className={cs.eyebrow}>{uiForAiCaseStudyMeta.caseStudyEyebrow}</p>
              <p className={u.overviewLede}>
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
              <div className={cs.specCard}>
                {uiForAiCaseStudyMeta.specRows.map((row) => (
                  <div key={row.label} className={cs.specBlock}>
                    <p className={cs.specLabel}>{row.label}</p>
                    <p className={cs.specValue}>{row.value}</p>
                  </div>
                ))}
              </div>
              <div className={u.seriesCallout}>
                <p className={u.seriesLabel}>{uiForAiOverviewLinks.label}</p>
                <div className={u.seriesGrid}>
                  <div className={u.seriesCol}>
                    <p className={u.seriesBody}>{uiForAiOverviewLinks.description}</p>
                    <a
                      className={u.seriesPrimaryLink}
                      href={uiForAiOverviewLinks.primaryLink.href}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {uiForAiOverviewLinks.primaryLink.label}
                    </a>
                  </div>
                  <div className={u.seriesCol}>
                    <p className={u.seriesCollabTitle}>{uiForAiOverviewLinks.collaborationTitle}</p>
                    <div className={u.seriesLinkList}>
                      {uiForAiOverviewLinks.collaborationLinks.map((link) => (
                        <a
                          key={link.href}
                          className={u.seriesCollabLink}
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {link.label}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section id="problem" className={cs.section}>
              <p className={cs.sectionEyebrow}>01 · Problem</p>
              <h2 className={cs.h2}>Where AI chats break down</h2>
              <p className={cs.body}>
                Linear chat works fine for quick sessions. But when work stretches across hours,
                days, or weeks, returning users have to scroll, skim, and mentally reconstruct
                everything just to get back to where they left off. The information is technically
                still there — but resuming often takes more effort than the task itself.
              </p>

              <div className={u.cardGrid}>
                <div className={u.card}>
                  <div className={u.cardNum}>01</div>
                  <div className={u.cardTitle}>Disorientation</div>
                  <p className={u.cardBody}>
                    Long threads bury decisions, files, and reasoning steps with no way to jump
                    back.
                  </p>
                </div>
                <div className={u.card}>
                  <div className={u.cardNum}>02</div>
                  <div className={u.cardTitle}>High re-entry cost</div>
                  <p className={u.cardBody}>
                    After stepping away, users must reconstruct context from scratch before moving
                    forward.
                  </p>
                </div>
                <div className={u.card}>
                  <div className={u.cardNum}>03</div>
                  <div className={u.cardTitle}>Re-prompting loop</div>
                  <p className={u.cardBody}>
                    Instead of building forward, users end up repeating prompts they already sent.
                  </p>
                </div>
                <div className={u.card}>
                  <div className={u.cardNum}>04</div>
                  <div className={u.cardTitle}>Lost insights</div>
                  <p className={u.cardBody}>
                    Valuable outputs get buried in the scroll and forgotten before they can be acted
                    on.
                  </p>
                </div>
              </div>

              <div className={cs.hmwCallout}>
                <p className={cs.hmwQuestionLabel}>{uiForAiHmw.label}</p>
                <p className={cs.hmwCalloutText}>“{uiForAiHmw.question}”</p>
              </div>
            </section>

            <section id="research" className={cs.section}>
              <p className={cs.sectionEyebrow}>02 · Research</p>
              <h2 className={cs.h2}>
                {uiForAiResearch.title[0]} {uiForAiResearch.title[1]}
              </h2>
              <div className={u.researchCards}>
                {uiForAiResearch.cards.map((card) => (
                  <article
                    key={card.name}
                    className={`${u.researchCard} ${card.visualLabel ? u.researchCardAdjacent : ""}`}
                  >
                    {card.visualLabel ? (
                      <div className={u.researchImageFrame}>
                        <Image
                          src={card.name === "Rewind AI" ? rewindAiImage : piecesAppImage}
                          alt={card.visualLabel}
                          fill
                          className={u.researchImage}
                          sizes="(max-width: 900px) 100vw, 860px"
                        />
                      </div>
                    ) : null}
                    <div className={u.researchCardType}>
                      <span>{card.type}</span>
                      <a href={card.linkHref} target="_blank" rel="noopener noreferrer">
                        {card.linkLabel}
                      </a>
                    </div>
                    <div className={u.researchCardName}>{card.name}</div>
                    <p className={u.researchCardDesc}>{card.description}</p>
                    <p className={u.researchCardQuote}>{card.quote}</p>
                  </article>
                ))}
              </div>

              <div className={u.insightBox}>
                <div className={u.insightLabel}>{uiForAiResearch.synthesis.label}</div>
                <div className={u.insightTitle}>{uiForAiResearch.synthesis.title}</div>
                <p className={u.insightBody}>{uiForAiResearch.synthesis.body}</p>
              </div>
            </section>

            <section id="solution" className={cs.section}>
              <p className={cs.sectionEyebrow}>03 · Solution</p>
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
                    src="/assets/uiforai/ContextSwitching_SearchJumpBackIn.mp4"
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
                    src="/assets/uiforai/ContextSwitching_AISummaryNextSteps.mp4"
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
                    src="/assets/uiforai/ContextSwitching_RelatedChatsMerge.mp4"
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="metadata"
                  />
                </div>
              </div>
            </section>

            <section id="testing" className={cs.section}>
              <p className={cs.sectionEyebrow}>04 · Testing</p>
              <h2 className={cs.h2}>Two rounds, clearer focus</h2>
              <p className={cs.body}>
                We tested three approaches — Re-Entry Panel, AI Topics, and Task Contexts. Task
                Contexts let users define named tasks and tag chats accordingly. Conceptually
                interesting, but it introduced too much setup overhead.
              </p>

              <div className={u.quoteTrio}>
                <p className={u.testingQuote}>
                  Users want automatic context recovery, not manual organization.
                </p>
                <p className={u.testingQuote}>
                  Reducing scope improved clarity and usability.
                </p>
                <p className={u.testingQuote}>
                  Context is most helpful directly in the chat, at the right moment.
                </p>
              </div>

              <div className={u.roundRow}>
                <div>
                  <div className={u.roundLabel}>Round 1</div>
                  <div className={u.roundTitle}>Three directions, one clear winner</div>
                  <p className={u.roundBody}>
                    Users favored the Re-Entry Panel and AI Topics — both felt immediately useful with
                    zero setup. Task Contexts added too much cognitive overhead. Key signal: users
                    prefer AI-assisted reorientation that requires no configuration.
                  </p>
                </div>
                <div className={`${u.imgPlaceholder} ${u.medium} ${u.roundPlaceholderTight}`}>
                  <div className={u.phIcon}>
                    <PhIconRect />
                  </div>
                  Round 1 — Task Contexts prototype screens
                </div>
              </div>

              <div className={u.roundRow}>
                <div className={`${u.imgPlaceholder} ${u.medium} ${u.roundPlaceholderTight}`}>
                  <div className={u.phIcon}>
                    <PhIconRect />
                  </div>
                  Round 2 — refined Re-Entry Panel screens
                </div>
                <div>
                  <div className={u.roundLabel}>Round 2</div>
                  <div className={u.roundTitle}>Next Steps needed a new home</div>
                  <p className={u.roundBody}>
                    Users saw Next Steps less as a re-entry tool and more as a prompt for what to do
                    next. So they needed to live closer to the action — in the chat input area rather
                    than the side panel. Context-setting and forward momentum became distinct, each
                    handled in the right place.
                  </p>
                </div>
              </div>
            </section>

            <section id="reflection" className={`${cs.section} ${cs.sectionBeforeNext}`}>
              <p className={cs.sectionEyebrow}>05 · Reflection</p>
              <h2 className={cs.h2}>Why it matters</h2>
              <p className={cs.body}>
                Re-entry breaks down when people remember fragments, not timelines. Our solution meets
                users where they are — searching by keyword, jumping by topic, or picking up from a
                summary — rather than forcing them to scroll until something looks familiar.
              </p>

              <div className={u.takeawayGrid}>
                <div className={u.takeaway}>
                  <div className={u.takeawayNum}>01</div>
                  <div className={u.takeawayTitle}>Retrieval beats re-generation</div>
                  <p className={u.takeawayBody}>
                    The core frustration was finding past outputs, not generating new ones. Treating
                    chat history as a recoverable asset changes the whole experience.
                  </p>
                </div>
                <div className={u.takeaway}>
                  <div className={u.takeawayNum}>02</div>
                  <div className={u.takeawayTitle}>Lightweight wins</div>
                  <p className={u.takeawayBody}>
                    The best interaction required the least new behavior. Automation and quick recall
                    outperformed expressive but heavier alternatives.
                  </p>
                </div>
                <div className={u.takeaway}>
                  <div className={u.takeawayNum}>03</div>
                  <div className={u.takeawayTitle}>Placement is everything</div>
                  <p className={u.takeawayBody}>
                    Context and suggestions land best when they appear in the main chat at the right
                    moment — not in a panel users have to seek out.
                  </p>
                </div>
                <div className={u.takeaway}>
                  <div className={u.takeawayNum}>04</div>
                  <div className={u.takeawayTitle}>AI as a durable workspace</div>
                  <p className={u.takeawayBody}>
                    This project gestures toward a future where AI chats work less like disposable
                    conversations and more like spaces you can actually return to.
                  </p>
                </div>
              </div>

              <div className={cs.hmwCallout}>
                <p className={cs.hmwQuestionLabel}>{uiForAiClosingReflection.label}</p>
                <p className={cs.hmwCalloutText}>“{uiForAiClosingReflection.text}”</p>
              </div>
            </section>

            <section className={cs.nextProject} aria-label="Next case study">
              <Link
                href={uiForAiNextProject.href}
                className={cs.nextProjectCard}
                aria-label={`${uiForAiNextProject.title} case study — ${uiForAiNextProject.description}`}
              >
                <div className={cs.nextProjectLead}>
                  <p className={cs.nextProjectEyebrow}>{uiForAiNextProject.eyebrow}</p>
                  <h2 className={cs.nextProjectTitle}>{uiForAiNextProject.title}</h2>
                  <p className={cs.nextProjectDesc}>{uiForAiNextProject.description}</p>
                </div>
                <div className={cs.nextProjectMedia}>
                  <Image
                    src={uiForAiNextProject.imageSrc}
                    alt={uiForAiNextProject.imageAlt}
                    fill
                    className={cs.nextProjectImage}
                    sizes="(max-width: 900px) 100vw, 800px"
                    style={{ objectFit: "cover" }}
                  />
                </div>
                <div className={cs.nextProjectMeta}>
                  <span>{uiForAiNextProject.metaLeft}</span>
                  <span className={cs.nextProjectMetaYear}>{uiForAiNextProject.metaYear}</span>
                </div>
              </Link>
            </section>
          </div>

          <div className={cs.tocWrap}>
            <CaseStudyTocNav items={uiForAiToc} />
          </div>
        </div>

        <CaseStudyFooter />
      </div>
    </div>
  );
}
