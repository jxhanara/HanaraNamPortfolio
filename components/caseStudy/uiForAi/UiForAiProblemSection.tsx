"use client";

import { useEffect, useRef, useState } from "react";
import { uiForAiHmw, uiForAiProblem } from "@/content/uiForAiCaseStudy";
import cs from "../caseStudy.module.css";
import p from "./uiForAiProblem.module.css";

type MockupRole = "you" | "ai";

type MockupMessage = {
  role: MockupRole;
  lineWidths: readonly string[];
  callout?: 1 | 2;
};

/** Enough rows to overflow; card clips the bottom (scroll metaphor). */
const MOCKUP_MESSAGES: MockupMessage[] = [
  { role: "you", lineWidths: ["88%", "62%"] },
  { role: "ai", lineWidths: ["100%", "92%", "78%", "54%"] },
  { role: "you", lineWidths: ["72%", "100%"], callout: 1 },
  { role: "ai", lineWidths: ["96%", "84%", "60%"] },
  { role: "you", lineWidths: ["100%", "70%"] },
  { role: "ai", lineWidths: ["100%", "88%", "76%", "64%", "48%"], callout: 2 },
  { role: "you", lineWidths: ["90%", "55%"] },
  { role: "ai", lineWidths: ["100%", "82%", "68%"] },
  { role: "you", lineWidths: ["78%", "100%"] },
  { role: "ai", lineWidths: ["94%", "86%", "72%", "58%"] },
  { role: "you", lineWidths: ["100%", "64%"] },
  { role: "ai", lineWidths: ["100%", "90%", "74%"] },
];

const DIMMED_MESSAGE_COUNT = 4;
const STACKED_MOCKUP_MQ = "(max-width: 900px)";

function LongChatMockup({ heightPx }: { heightPx: number | null }) {
  return (
    <div className={p.mockupCol}>
      <div
        className={p.mockupFrame}
        aria-hidden
        style={heightPx != null ? { height: heightPx } : undefined}
      >
        <p className={p.mockupSession}>{uiForAiProblem.mockupSession}</p>
        <div className={p.mockupBody}>
          <div className={p.mockupFade} aria-hidden />
          <div className={p.mockupScroll}>
            {MOCKUP_MESSAGES.map((message, index) => (
              <div
                key={index}
                className={`${p.msgRow} ${message.role === "you" ? p.msgYou : p.msgAi} ${
                  index < DIMMED_MESSAGE_COUNT ? p.msgRowDimmed : ""
                }`}
              >
                <span className={p.msgRole}>{message.role === "you" ? "You" : "AI"}</span>
                <div className={p.msgBubble}>
                  {message.lineWidths.map((width, lineIndex) => (
                    <span key={lineIndex} className={p.msgBar} style={{ width }} />
                  ))}
                </div>
                {message.callout != null ? (
                  <span className={p.calloutBadge}>{message.callout}</span>
                ) : null}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function UiForAiProblemSection() {
  const asideRef = useRef<HTMLDivElement>(null);
  const [mockupHeight, setMockupHeight] = useState<number | null>(null);

  useEffect(() => {
    const el = asideRef.current;
    if (!el) return;

    const syncHeight = () => {
      if (window.matchMedia(STACKED_MOCKUP_MQ).matches) {
        setMockupHeight(null);
        return;
      }
      setMockupHeight(el.offsetHeight);
    };

    syncHeight();
    const observer = new ResizeObserver(syncHeight);
    observer.observe(el);
    window.addEventListener("resize", syncHeight);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", syncHeight);
    };
  }, []);

  return (
    <section id="problem" className={cs.section}>
      <p className={cs.sectionEyebrow}>01 · Problem</p>
      <h2 className={cs.h2}>{uiForAiProblem.title}</h2>

      <div className={p.problemSplit}>
        <LongChatMockup heightPx={mockupHeight} />

        <div ref={asideRef} className={p.problemAside}>
          <p className={p.problemIntro}>{uiForAiProblem.intro}</p>

          <ol className={p.painList}>
            {uiForAiProblem.painPoints.map((item, index) => (
              <li key={item.title} className={p.painItem}>
                <span className={p.painNum} aria-hidden>
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div className={p.painCopy}>
                  <p className={p.painTitle}>{item.title}</p>
                  <p className={p.painBody}>{item.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>

      <div className={cs.hmwCallout}>
        <p className={cs.hmwQuestionLabel}>{uiForAiHmw.label}</p>
        <p className={cs.hmwCalloutText}>“{uiForAiHmw.question}”</p>
      </div>
    </section>
  );
}
