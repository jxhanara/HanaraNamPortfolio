"use client";

import { useEffect, useRef, useState } from "react";
import { bumblePrototypeDualPhone } from "@/content/bumbleFlowCaseStudy";
import dp from "./bumblePrototypeDualPhone.module.css";
import { useKevinLindseyWalkthroughPlayback } from "./useKevinLindseyWalkthroughPlayback";
import { useWalkthroughPinScroll } from "./useWalkthroughPinScroll";
import { scrollPinToStepFloat } from "./walkthroughScrub";
import { WalkthroughPhoneFrame } from "./WalkthroughPhoneFrame";
import { WalkthroughTimeline } from "./WalkthroughTimeline";

/**
 * Premium × Premium — scroll-scrub while scrolling; normal-speed playback when idle.
 */
export function PrototypeDualPhoneWalkthrough() {
  const steps = bumblePrototypeDualPhone.steps;
  const lastIndex = steps.length - 1;

  const pinRef = useRef<HTMLDivElement | null>(null);
  const kevinVideoRef = useRef<HTMLVideoElement | null>(null);
  const lindseyVideoRef = useRef<HTMLVideoElement | null>(null);
  const durationsRef = useRef({ kevin: 150, lindsey: 25 });

  const [lindseyVisible, setLindseyVisible] = useState(false);

  const { applyScrub } = useKevinLindseyWalkthroughPlayback({
    pinRef,
    steps,
    durationsRef,
    kevinVideoRef,
    lindseyVideoRef,
    setLindseyVisible,
    kevinPauseAtTime: bumblePrototypeDualPhone.kevinPauseAtTime,
    lindseyResumeKevinAt: bumblePrototypeDualPhone.lindseyResumeKevinAt,
    kevinResumeAtTime: bumblePrototypeDualPhone.kevinResumeAtTime,
  });

  const { stepFloat, stepIndex, isScrubbing } = useWalkthroughPinScroll({
    pinRef,
    stepCount: steps.length,
    onScrub: applyScrub,
  });

  useEffect(() => {
    const onMeta = () => {
      const kevin = kevinVideoRef.current;
      const lindsey = lindseyVideoRef.current;
      if (kevin?.duration) durationsRef.current.kevin = kevin.duration;
      if (lindsey?.duration) durationsRef.current.lindsey = lindsey.duration;
      applyScrub(stepFloat, false);
    };
    const kevin = kevinVideoRef.current;
    const lindsey = lindseyVideoRef.current;
    kevin?.addEventListener("loadedmetadata", onMeta);
    lindsey?.addEventListener("loadedmetadata", onMeta);
    return () => {
      kevin?.removeEventListener("loadedmetadata", onMeta);
      lindsey?.removeEventListener("loadedmetadata", onMeta);
    };
  }, [applyScrub, stepFloat]);

  const handleStepClick = (i: number) => {
    const pin = pinRef.current;
    if (!pin) return;
    scrollPinToStepFloat(pin, i + 0.08, steps.length);
  };

  const activeStep = steps[stepIndex];

  return (
    <div className={dp.dualPhoneRail}>
      <div
        ref={pinRef}
        className={dp.scrollPin}
        style={{ height: `${steps.length * 100}vh` }}
      >
        <div className={dp.scrollPinInner}>
          <div className={dp.walkthroughGrid}>
            <div className={dp.phonesWrap}>
              <span
                className={`${dp.scrubSpeedBadge} ${isScrubbing ? dp.scrubSpeedBadgeVisible : ""}`}
                aria-hidden
              >
                2×
              </span>
              <div className={dp.phonesRow}>
                <WalkthroughPhoneFrame
                  label={bumblePrototypeDualPhone.kevinPosterLabel}
                  videoRef={kevinVideoRef}
                  src={bumblePrototypeDualPhone.kevinVideoSrc}
                  visible
                />
                <WalkthroughPhoneFrame
                  label={bumblePrototypeDualPhone.lindseyPosterLabel}
                  videoRef={lindseyVideoRef}
                  src={bumblePrototypeDualPhone.lindseyVideoSrc}
                  visible={lindseyVisible}
                  ariaHiddenWhenInvisible
                />
              </div>
            </div>

            <WalkthroughTimeline
              steps={steps}
              stepFloat={stepFloat}
              onStepClick={handleStepClick}
            />

            <div className={dp.descriptionColumn}>
              <div className={dp.stepCard}>
                <div key={stepIndex} className={dp.stepInner}>
                  <p className={dp.stepLabel}>{activeStep.label}</p>
                  <h3 className={dp.stepTitle}>{activeStep.title}</h3>
                  <p className={dp.stepBody}>{activeStep.body}</p>
                </div>
              </div>

              <span
                className={`${dp.scrollHint} ${dp.scrollHintBelowText} ${stepIndex >= lastIndex ? dp.scrollHintHidden : ""}`}
                aria-hidden
              >
                {bumblePrototypeDualPhone.scrollHint}
                <span className={dp.scrollHintChevron}>
                  <svg viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M3 5l4 4 4-4"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
