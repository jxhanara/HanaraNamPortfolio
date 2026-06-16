import type { CSSProperties } from "react";
import dp from "./bumblePrototypeDualPhone.module.css";
import { timelineSegmentFill } from "./walkthroughScrub";

type WalkthroughTimelineStep = {
  id: string;
  label: string;
  title: string;
};

type WalkthroughTimelineProps = {
  steps: readonly WalkthroughTimelineStep[];
  stepFloat: number;
  onStepClick: (index: number) => void;
};

export function WalkthroughTimeline({ steps, stepFloat, onStepClick }: WalkthroughTimelineProps) {
  const activeIndex = Math.min(Math.floor(stepFloat), steps.length - 1);

  return (
    <nav className={dp.timelineColumn} aria-label="Walkthrough steps">
      <ol className={dp.timelineList}>
        {steps.map((step, i) => {
          const filled = stepFloat >= i + 0.02;
          const active = i === activeIndex;
          const dotClass = [
            dp.timelineDot,
            filled && !active ? dp.timelineDotPassed : "",
            active ? dp.timelineDotActive : "",
          ]
            .filter(Boolean)
            .join(" ");

          const segmentFill = i < steps.length - 1 ? timelineSegmentFill(stepFloat, i) : 0;

          return (
            <li key={step.id} className={dp.timelineItem}>
              <button
                type="button"
                className={dotClass}
                aria-label={`${step.label} — ${step.title}`}
                aria-current={active ? "step" : undefined}
                onClick={() => onStepClick(i)}
              >
                <span className={dp.srOnly}>{step.label}</span>
              </button>
              {i < steps.length - 1 ? (
                <span className={dp.timelineLineTrack} aria-hidden>
                  <span
                    className={dp.timelineLineFill}
                    style={{ "--segment-fill": segmentFill } as CSSProperties}
                  />
                </span>
              ) : null}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
