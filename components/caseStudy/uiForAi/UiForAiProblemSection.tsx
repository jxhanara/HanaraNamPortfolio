import { uiForAiHmw, uiForAiProblem } from "@/content/uiForAiCaseStudy";
import cs from "../caseStudy.module.css";
import p from "./uiForAiProblem.module.css";

const MOCKUP_TURNS = [
  { role: "you" as const, lines: 2 },
  { role: "ai" as const, lines: 4 },
  { role: "you" as const, lines: 2 },
  { role: "ai" as const, lines: 3 },
  { role: "you" as const, lines: 2 },
  { role: "ai" as const, lines: 5 },
  { role: "you" as const, lines: 2 },
  { role: "ai" as const, lines: 4 },
  { role: "you" as const, lines: 2 },
  { role: "ai" as const, lines: 3 },
];

function LongChatMockup() {
  return (
    <div className={p.mockupFrame} aria-hidden>
      <p className={p.mockupSession}>{uiForAiProblem.mockupSession}</p>
      <div className={p.mockupScroll}>
        {MOCKUP_TURNS.map((turn, index) => (
          <div
            key={index}
            className={turn.role === "you" ? p.bubbleYou : p.bubbleAi}
          >
            <span className={p.bubbleRole}>{turn.role === "you" ? "You" : "AI"}</span>
            <div className={p.bubbleLines}>
              {Array.from({ length: turn.lines }).map((_, lineIndex) => (
                <span
                  key={lineIndex}
                  className={p.bubbleLine}
                  style={
                    turn.role === "you"
                      ? { width: lineIndex === turn.lines - 1 ? "72%" : "100%" }
                      : {
                          width:
                            lineIndex === 0
                              ? "100%"
                              : lineIndex === turn.lines - 1
                                ? "58%"
                                : "88%",
                        }
                  }
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function UiForAiProblemSection() {
  return (
    <section id="problem" className={cs.section}>
      <p className={cs.sectionEyebrow}>01 · Problem</p>
      <h2 className={cs.h2}>{uiForAiProblem.title}</h2>

      <div className={p.problemSplit}>
        <LongChatMockup />

        <div className={p.problemAside}>
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
