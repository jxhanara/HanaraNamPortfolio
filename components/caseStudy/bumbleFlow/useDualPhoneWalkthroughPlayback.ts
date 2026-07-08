"use client";

import { useCallback, useEffect, useRef, type MutableRefObject } from "react";
import type { DualPhoneHandoffConfig, DualPhoneScrubState, DualPhoneScrubStep } from "./walkthroughScrub";
import { dualPhoneHandoffPhase, resolveDualPhoneScrub } from "./walkthroughScrub";
import {
  playVideoNormal,
  scrubVideo,
  useSegmentBoundaryPause,
  type WalkthroughPlaybackLimits,
} from "./WalkthroughPhoneFrame";

type DualPhoneWalkthroughPlaybackParams = {
  pinRef: MutableRefObject<HTMLDivElement | null>;
  steps: readonly DualPhoneScrubStep[];
  durationsRef: MutableRefObject<{ john: number; jennifer: number }>;
  johnVideoRef: MutableRefObject<HTMLVideoElement | null>;
  jenniferVideoRef: MutableRefObject<HTMLVideoElement | null>;
  setJohnVisible: (visible: boolean) => void;
  setJenniferVisible: (visible: boolean) => void;
  handoff?: DualPhoneHandoffConfig;
};

/** Shared scroll-scrub + idle playback for John/Jennifer walkthrough tabs. */
export function useDualPhoneWalkthroughPlayback({
  pinRef,
  steps,
  durationsRef,
  johnVideoRef,
  jenniferVideoRef,
  setJohnVisible,
  setJenniferVisible,
  handoff,
}: DualPhoneWalkthroughPlaybackParams) {
  const inViewRef = useRef(false);
  const johnLimitsRef = useRef<WalkthroughPlaybackLimits | null>(null);
  const jenniferLimitsRef = useRef<WalkthroughPlaybackLimits | null>(null);
  const handoffSyncedRef = useRef(false);
  const isScrollingRef = useRef(false);
  const stepFloatRef = useRef(0);

  useSegmentBoundaryPause(johnVideoRef, johnLimitsRef);
  useSegmentBoundaryPause(jenniferVideoRef, jenniferLimitsRef);

  const applyState = useCallback(
    (state: DualPhoneScrubState, isScrolling: boolean) => {
      isScrollingRef.current = isScrolling;
      stepFloatRef.current = state.stepFloat;

      const handoffStepIndex = handoff?.handoffStepIndex ?? steps.length - 1;
      if (Math.floor(state.stepFloat) !== handoffStepIndex) {
        handoffSyncedRef.current = false;
      }

      setJohnVisible(state.johnVisible);
      setJenniferVisible(state.jenniferVisible);

      johnLimitsRef.current = {
        shouldPlay: state.johnShouldPlay,
        end: state.johnEnd,
      };
      jenniferLimitsRef.current = {
        shouldPlay: state.jenniferShouldPlay,
        end: state.jenniferEnd,
      };

      const john = johnVideoRef.current;
      const jennifer = jenniferVideoRef.current;
      const pin = pinRef.current;
      const inView =
        pin != null &&
        pin.getBoundingClientRect().top < window.innerHeight &&
        pin.getBoundingClientRect().bottom > 0;
      inViewRef.current = inView;

      if (isScrolling || !inView) {
        handoffSyncedRef.current = false;
        scrubVideo(john, state.johnTime);
        scrubVideo(jennifer, state.jenniferTime);
        return;
      }

      if (state.johnShouldPlay) {
        playVideoNormal(john, state.johnTime);
      } else {
        scrubVideo(john, state.johnTime);
      }

      if (state.jenniferShouldPlay) {
        playVideoNormal(jennifer, state.jenniferTime);
      } else {
        scrubVideo(jennifer, state.jenniferTime);
      }
    },
    [steps, johnVideoRef, jenniferVideoRef, pinRef, setJohnVisible, setJenniferVisible],
  );

  const applyScrub = useCallback(
    (stepFloat: number, isScrolling: boolean) => {
      const state = resolveDualPhoneScrub(steps, stepFloat, durationsRef.current, handoff);
      applyState(state, isScrolling);
    },
    [steps, durationsRef, handoff, applyState],
  );

  // When Jennifer reaches her Send moment during idle playback, resume John
  // at the frame where he receives her time suggestion.
  useEffect(() => {
    const jennifer = jenniferVideoRef.current;
    if (!jennifer || !handoff) return;

    const handoffStepIndex = handoff.handoffStepIndex;

    const onTime = () => {
      if (
        isScrollingRef.current ||
        handoffSyncedRef.current ||
        !inViewRef.current ||
        dualPhoneHandoffPhase(stepFloatRef.current, handoffStepIndex) !== "jennifer-send"
      ) {
        return;
      }

      if (jennifer.currentTime < handoff.jenniferSendTime - 0.08) return;

      handoffSyncedRef.current = true;

      const john = johnVideoRef.current;

      johnLimitsRef.current = {
        shouldPlay: true,
        end: durationsRef.current.john,
      };
      jenniferLimitsRef.current = {
        shouldPlay: true,
        end: durationsRef.current.jennifer,
      };

      playVideoNormal(john, handoff.johnResumeAtReceiveTime);
      playVideoNormal(jennifer, jennifer.currentTime);
    };

    jennifer.addEventListener("timeupdate", onTime);
    return () => jennifer.removeEventListener("timeupdate", onTime);
  }, [steps, durationsRef, handoff, johnVideoRef, jenniferVideoRef]);

  useEffect(() => {
    const pin = pinRef.current;
    if (!pin) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const inView = entry.isIntersecting && entry.intersectionRatio > 0.05;
          if (inView === inViewRef.current) continue;
          inViewRef.current = inView;
          if (!inView) {
            johnVideoRef.current?.pause();
            jenniferVideoRef.current?.pause();
          }
        }
      },
      { threshold: [0, 0.05, 0.1] },
    );

    observer.observe(pin);
    return () => observer.disconnect();
  }, [pinRef, johnVideoRef, jenniferVideoRef]);

  return { applyScrub, applyState };
}
