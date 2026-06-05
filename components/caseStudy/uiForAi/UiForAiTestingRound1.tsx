"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import Image from "next/image";
import { uiForAiTesting } from "@/content/uiForAiCaseStudy";
import { caseStudyResponsiveImageStyle } from "../caseStudyMedia";
import u from "./uiForAiCaseStudy.module.css";
import round1PivotImage from "@/assets/uiforai/UIforAI_Round1Pivot.png";
import reEntryPanelLoFiImage from "@/assets/uiforai/UIforAI_ReEntryPanelLoFi.png";
import relatedChatsLoFiImage from "@/assets/uiforai/UIforAI_RelatedChatsLoFi.png";

const round1 = uiForAiTesting.round1;

const IDEA_IMAGES = [
  round1PivotImage,
  reEntryPanelLoFiImage,
  relatedChatsLoFiImage,
] as const;

const MOBILE_IDEAS_MQ = "(max-width: 900px)";

function subscribeMobileIdeas(onStoreChange: () => void) {
  const mql = window.matchMedia(MOBILE_IDEAS_MQ);
  mql.addEventListener("change", onStoreChange);
  return () => mql.removeEventListener("change", onStoreChange);
}

function getMobileIdeasSnapshot() {
  return window.matchMedia(MOBILE_IDEAS_MQ).matches;
}

type Idea = (typeof round1.ideas)[number];

function IdeaPanelBody({
  idea,
  imageSrc,
}: {
  idea: Idea;
  imageSrc: (typeof IDEA_IMAGES)[number];
}) {
  const isKept = idea.status === "kept";

  return (
    <>
      <p className={u.ideaDesc}>{idea.desc}</p>
      <p className={`${u.ideaVerdict} ${isKept ? u.ideaVerdictKept : ""}`}>
        {idea.verdict}
      </p>
      <div className={u.ideaImageFrame}>
        <Image
          src={imageSrc}
          alt={idea.imageAlt}
          className={u.ideaImage}
          sizes="(max-width: 1024px) 100vw, min(1180px, 92vw)"
          style={caseStudyResponsiveImageStyle}
        />
      </div>
    </>
  );
}

function MobileIdeaCard({
  idea,
  imageSrc,
  isExpanded,
  onToggle,
}: {
  idea: Idea;
  imageSrc: (typeof IDEA_IMAGES)[number];
  isExpanded: boolean;
  onToggle: () => void;
}) {
  const isKept = idea.status === "kept";

  return (
    <>
      <button
        type="button"
        className={`${u.ideaCard} ${u.ideaCardMobile} ${
          isExpanded ? u.ideaCardMobileExpanded : u.ideaCardMobileCollapsed
        }`}
        aria-expanded={isExpanded}
        onClick={onToggle}
      >
        <div className={u.ideaMobileHeader}>
          <div className={u.ideaHead}>
            <span className={u.ideaIndex}>{idea.index}</span>
            <span
              className={`${u.ideaStatus} ${isKept ? u.ideaStatusKept : u.ideaStatusCut}`}
            >
              <span className={u.ideaStatusDot} aria-hidden />
              {idea.statusLabel}
            </span>
          </div>
          <p className={u.ideaName}>{idea.name}</p>
          <span
            className={`${u.ideaMiniDot} ${isKept ? u.ideaMiniDotKept : u.ideaMiniDotCut}`}
            aria-hidden
          />
        </div>
      </button>

      <div
        className={`${u.ideaPanel} ${isExpanded ? u.ideaPanelOpen : ""}`}
        aria-hidden={!isExpanded}
      >
        <div className={u.ideaPanelInner}>
          <IdeaPanelBody idea={idea} imageSrc={imageSrc} />
        </div>
      </div>
    </>
  );
}

export function UiForAiTestingRound1() {
  const isMobile = useSyncExternalStore(
    subscribeMobileIdeas,
    getMobileIdeasSnapshot,
    () => false
  );
  const [active, setActive] = useState<number | null>(0);
  const userToggled = useRef(false);

  useEffect(() => {
    if (isMobile) {
      if (!userToggled.current) {
        setActive(0);
      }
      return;
    }
    setActive((prev) => (prev === null ? 0 : prev));
  }, [isMobile]);

  const handleIdeaClick = (index: number) => {
    userToggled.current = true;
    if (isMobile) {
      setActive((prev) => (prev === index ? null : index));
      return;
    }
    setActive(index);
  };

  const desktopActive = active ?? 0;

  return (
    <>
      <p className={u.testingHint}>{round1.hint}</p>

      <div className={u.ideasGrid}>
        {round1.ideas.map((idea, i) => {
          const isExpanded = isMobile ? active === i : desktopActive === i;
          const isKept = idea.status === "kept";

          if (isMobile) {
            return (
              <div
                key={idea.name}
                className={`${u.ideaCol} ${u.ideaColMobile} ${
                  isExpanded ? u.ideaColMobileExpanded : ""
                }`}
              >
                <MobileIdeaCard
                  idea={idea}
                  imageSrc={IDEA_IMAGES[i]}
                  isExpanded={isExpanded}
                  onToggle={() => handleIdeaClick(i)}
                />
              </div>
            );
          }

          return (
            <div
              key={idea.name}
              className={`${u.ideaCol} ${
                isExpanded ? u.ideaColActive : u.ideaColCollapsed
              }`}
            >
              <button
                type="button"
                className={`${u.ideaCard} ${
                  isExpanded ? u.ideaCardActive : u.ideaCardCollapsed
                }`}
                aria-expanded={isExpanded}
                onClick={() => handleIdeaClick(i)}
              >
                <div className={u.ideaFull}>
                  <div className={u.ideaHead}>
                    <span className={u.ideaIndex}>{idea.index}</span>
                    <span
                      className={`${u.ideaStatus} ${
                        isKept ? u.ideaStatusKept : u.ideaStatusCut
                      }`}
                    >
                      <span className={u.ideaStatusDot} aria-hidden />
                      {idea.statusLabel}
                    </span>
                  </div>
                  <p className={u.ideaName}>{idea.name}</p>
                  <p className={u.ideaDesc}>{idea.desc}</p>
                  <p
                    className={`${u.ideaVerdict} ${
                      isKept ? u.ideaVerdictKept : ""
                    }`}
                  >
                    {idea.verdict}
                  </p>
                </div>
                <span className={u.ideaMini} aria-hidden>
                  <span className={u.ideaMiniIndex}>{idea.index}</span>
                  <span className={u.ideaMiniSpacer} aria-hidden />
                  <span className={u.ideaMiniName}>{idea.name}</span>
                  <span
                    className={`${u.ideaMiniDot} ${
                      isKept ? u.ideaMiniDotKept : u.ideaMiniDotCut
                    }`}
                  />
                </span>
              </button>

              {isExpanded ? (
                <div className={u.ideaImageFrame}>
                  <Image
                    src={IDEA_IMAGES[i]}
                    alt={idea.imageAlt}
                    className={u.ideaImage}
                    sizes="(max-width: 1024px) 100vw, min(1180px, 92vw)"
                    style={caseStudyResponsiveImageStyle}
                  />
                </div>
              ) : null}
            </div>
          );
        })}
      </div>

      <div className={u.testingMerge}>
        <span className={u.testingMergeLabel}>{round1.merge.label}</span>
        <div className={u.testingMergeBody}>
          <div className={u.testingMergeChips}>
            {round1.merge.chips.map((chip, chipIndex) => (
              <span key={chip} className={u.testingMergeChipGroup}>
                {chipIndex > 0 ? <span className={u.testingMergePlus}>+</span> : null}
                <span className={u.testingMergeChip}>{chip}</span>
              </span>
            ))}
            <span className={u.testingMergeArrow} aria-hidden>
              →
            </span>
          </div>
          <p className={u.testingMergeResult}>{round1.merge.result}</p>
        </div>
      </div>
    </>
  );
}
