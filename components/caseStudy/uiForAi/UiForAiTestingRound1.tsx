"use client";

import { useState } from "react";
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

export function UiForAiTestingRound1() {
  const [active, setActive] = useState<number>(0);
  const activeIdea = round1.ideas[active];

  return (
    <>
      <p className={u.testingHint}>{round1.hint}</p>

      <div className={u.ideasGrid}>
        {round1.ideas.map((idea, i) => {
          const isActive = active === i;
          const isKept = idea.status === "kept";
          return (
            <button
              key={idea.name}
              type="button"
              className={`${u.ideaCard} ${
                isActive ? u.ideaCardActive : u.ideaCardCollapsed
              }`}
              aria-expanded={isActive}
              onClick={() => setActive(i)}
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
                  className={`${u.ideaVerdict} ${isKept ? u.ideaVerdictKept : ""}`}
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
          );
        })}
      </div>

      <div className={u.ideaImageFrame}>
        <Image
          src={IDEA_IMAGES[active]}
          alt={activeIdea.imageAlt}
          className={u.ideaImage}
          sizes="(max-width: 1024px) 100vw, min(1180px, 92vw)"
          style={caseStudyResponsiveImageStyle}
        />
      </div>

      <div className={u.testingMerge}>
        <span className={u.testingMergeLabel}>{round1.merge.label}</span>
        <div className={u.testingMergeBody}>
          <div className={u.testingMergeChips}>
            {round1.merge.chips.map((chip, i) => (
              <span key={chip} className={u.testingMergeChipGroup}>
                {i > 0 ? <span className={u.testingMergePlus}>+</span> : null}
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
