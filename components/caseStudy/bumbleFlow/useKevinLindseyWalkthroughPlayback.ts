"use client";

import { useCallback, useEffect, useRef, type MutableRefObject } from "react";
import type { KevinLindseyScrubState, KevinLindseyScrubStep } from "./walkthroughScrub";
import { resolveKevinLindseyScrub, kevinLindseyHandoffPhase } from "./walkthroughScrub";
import {
  playVideoNormal,
  scrubVideo,
  useSegmentBoundaryPause,
  type WalkthroughPlaybackLimits,
} from "./WalkthroughPhoneFrame";

type KevinLindseyPlaybackParams = {
  pinRef: MutableRefObject<HTMLDivElement | null>;
  steps: readonly KevinLindseyScrubStep[];
  durationsRef: MutableRefObject<{ kevin: number; lindsey: number }>;
  kevinVideoRef: MutableRefObject<HTMLVideoElement | null>;
  lindseyVideoRef: MutableRefObject<HTMLVideoElement | null>;
  setLindseyVisible: (visible: boolean) => void;
  kevinPauseAtTime: number;
  lindseyResumeKevinAt: number;
  kevinResumeAtTime: number | null;
};

export function useKevinLindseyWalkthroughPlayback({
  pinRef,
  steps,
  durationsRef,
  kevinVideoRef,
  lindseyVideoRef,
  setLindseyVisible,
  kevinPauseAtTime,
  lindseyResumeKevinAt,
  kevinResumeAtTime,
}: KevinLindseyPlaybackParams) {
  const inViewRef = useRef(false);
  const kevinLimitsRef = useRef<WalkthroughPlaybackLimits | null>(null);
  const lindseyLimitsRef = useRef<WalkthroughPlaybackLimits | null>(null);
  const handoffSyncedRef = useRef(false);
  const isScrollingRef = useRef(false);
  const stepFloatRef = useRef(0);

  useSegmentBoundaryPause(kevinVideoRef, kevinLimitsRef);
  useSegmentBoundaryPause(lindseyVideoRef, lindseyLimitsRef);

  const applyState = useCallback(
    (state: KevinLindseyScrubState, isScrolling: boolean) => {
      isScrollingRef.current = isScrolling;
      stepFloatRef.current = state.stepFloat;

      const handoffStepIndex = steps.findIndex((s) => s.lindseyShowAtKevinTime != null);
      if (state.stepIndex !== handoffStepIndex) {
        handoffSyncedRef.current = false;
      }

      setLindseyVisible(state.lindseyVisible);

      kevinLimitsRef.current = {
        shouldPlay: state.kevinShouldPlay,
        end: state.kevinEnd,
      };
      lindseyLimitsRef.current = {
        shouldPlay: state.lindseyShouldPlay,
        end: state.lindseyEnd,
      };

      const kevin = kevinVideoRef.current;
      const lindsey = lindseyVideoRef.current;
      const pin = pinRef.current;
      const inView =
        pin != null &&
        pin.getBoundingClientRect().top < window.innerHeight &&
        pin.getBoundingClientRect().bottom > 0;
      inViewRef.current = inView;

      if (isScrolling || !inView) {
        handoffSyncedRef.current = false;
        scrubVideo(kevin, state.kevinTime);
        scrubVideo(lindsey, state.lindseyTime);
        return;
      }

      if (state.kevinShouldPlay) {
        playVideoNormal(kevin, state.kevinTime);
      } else {
        scrubVideo(kevin, state.kevinTime);
      }

      if (state.lindseyShouldPlay) {
        playVideoNormal(lindsey, state.lindseyTime);
      } else {
        scrubVideo(lindsey, state.lindseyTime);
      }
    },
    [steps, kevinVideoRef, lindseyVideoRef, pinRef, setLindseyVisible],
  );

  const applyScrub = useCallback(
    (stepFloat: number, isScrolling: boolean) => {
      const state = resolveKevinLindseyScrub(
        steps,
        stepFloat,
        durationsRef.current.kevin,
        durationsRef.current.lindsey,
        kevinPauseAtTime,
        lindseyResumeKevinAt,
        kevinResumeAtTime,
      );
      applyState(state, isScrolling);
    },
    [
      steps,
      durationsRef,
      kevinPauseAtTime,
      lindseyResumeKevinAt,
      kevinResumeAtTime,
      applyState,
    ],
  );

  // When Lindsey reaches her Send moment during idle playback, resume Kevin
  // at the frame where he receives her counter-suggestion.
  useEffect(() => {
    const lindsey = lindseyVideoRef.current;
    if (!lindsey || kevinResumeAtTime == null) return;

    const handoffStepIndex = steps.findIndex((s) => s.lindseyShowAtKevinTime != null);
    if (handoffStepIndex < 0) return;

    const onTime = () => {
      if (
        isScrollingRef.current ||
        handoffSyncedRef.current ||
        !inViewRef.current ||
        kevinLindseyHandoffPhase(stepFloatRef.current, handoffStepIndex) !== "lindsey-send"
      ) {
        return;
      }

      if (lindsey.currentTime < lindseyResumeKevinAt - 0.08) return;

      handoffSyncedRef.current = true;

      const kevin = kevinVideoRef.current;
      const nextKevinEnd =
        handoffStepIndex < steps.length - 1
          ? steps[handoffStepIndex + 1].kevinTime
          : durationsRef.current.kevin;

      kevinLimitsRef.current = { shouldPlay: true, end: nextKevinEnd };
      lindseyLimitsRef.current = {
        shouldPlay: true,
        end: durationsRef.current.lindsey,
      };

      playVideoNormal(kevin, kevinResumeAtTime);
      playVideoNormal(lindsey, lindsey.currentTime);
    };

    lindsey.addEventListener("timeupdate", onTime);
    return () => lindsey.removeEventListener("timeupdate", onTime);
  }, [
    steps,
    durationsRef,
    kevinVideoRef,
    lindseyVideoRef,
    lindseyResumeKevinAt,
    kevinResumeAtTime,
  ]);

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
            kevinVideoRef.current?.pause();
            lindseyVideoRef.current?.pause();
          }
        }
      },
      { threshold: [0, 0.05, 0.1] },
    );

    observer.observe(pin);
    return () => observer.disconnect();
  }, [pinRef, kevinVideoRef, lindseyVideoRef]);

  return { applyScrub };
}
