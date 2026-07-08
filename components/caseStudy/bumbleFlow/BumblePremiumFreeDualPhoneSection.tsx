"use client";

import { useEffect, useRef, useState } from "react";
import { bumblePremiumFreeDualPhone } from "@/content/bumbleFlowCaseStudy";
import dp from "./bumblePrototypeDualPhone.module.css";
import { useDualPhoneWalkthroughPlayback } from "./useDualPhoneWalkthroughPlayback";
import { useWalkthroughPinScroll } from "./useWalkthroughPinScroll";
import { scrollPinToStepFloat } from "./walkthroughScrub";
import { WalkthroughPhoneFrame } from "./WalkthroughPhoneFrame";
import { WalkthroughTimeline } from "./WalkthroughTimeline";

/**
 * Premium × Free — scroll-scrub while scrolling; normal-speed playback when idle.
 */
export function PrototypePremiumFreeWalkthrough() {
  const steps = bumblePremiumFreeDualPhone.steps;
  const lastIndex = steps.length - 1;

  const pinRef = useRef<HTMLDivElement | null>(null);
  const johnVideoRef = useRef<HTMLVideoElement | null>(null);
  const jenniferVideoRef = useRef<HTMLVideoElement | null>(null);
  const durationsRef = useRef({ john: 60, jennifer: 30 });

  const [johnVisible, setJohnVisible] = useState(true);
  const [jenniferVisible, setJenniferVisible] = useState(false);

  const { applyScrub } = useDualPhoneWalkthroughPlayback({
    pinRef,
    steps,
    durationsRef,
    johnVideoRef,
    jenniferVideoRef,
    setJohnVisible,
    setJenniferVisible,
    handoff: {
      handoffStepIndex: bumblePremiumFreeDualPhone.handoffStepIndex,
      johnPauseAtSendTime: bumblePremiumFreeDualPhone.johnPauseAtSendTime,
      jenniferSendTime: bumblePremiumFreeDualPhone.jenniferSendTime,
      johnResumeAtReceiveTime: bumblePremiumFreeDualPhone.johnResumeAtReceiveTime,
    },
  });

  const { stepFloat, stepIndex, isScrubbing } = useWalkthroughPinScroll({
    pinRef,
    stepCount: steps.length,
    onScrub: applyScrub,
  });

  useEffect(() => {
    const onMeta = () => {
      const john = johnVideoRef.current;
      const jennifer = jenniferVideoRef.current;
      if (john?.duration) durationsRef.current.john = john.duration;
      if (jennifer?.duration) durationsRef.current.jennifer = jennifer.duration;
      applyScrub(stepFloat, false);
    };
    const john = johnVideoRef.current;
    const jennifer = jenniferVideoRef.current;
    john?.addEventListener("loadedmetadata", onMeta);
    jennifer?.addEventListener("loadedmetadata", onMeta);
    return () => {
      john?.removeEventListener("loadedmetadata", onMeta);
      jennifer?.removeEventListener("loadedmetadata", onMeta);
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
                  label={bumblePremiumFreeDualPhone.johnLabel}
                  videoRef={johnVideoRef}
                  src={bumblePremiumFreeDualPhone.johnVideoSrc}
                  visible={johnVisible}
                />
                <WalkthroughPhoneFrame
                  label={bumblePremiumFreeDualPhone.jenniferLabel}
                  videoRef={jenniferVideoRef}
                  src={bumblePremiumFreeDualPhone.jenniferVideoSrc}
                  visible={jenniferVisible}
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
                {bumblePremiumFreeDualPhone.scrollHint}
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
