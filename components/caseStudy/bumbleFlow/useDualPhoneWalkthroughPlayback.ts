"use client";

import { useCallback, useEffect, useRef, type MutableRefObject } from "react";
import type { DualPhoneScrubState, DualPhoneScrubStep } from "./walkthroughScrub";
import { resolveDualPhoneScrub } from "./walkthroughScrub";
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
}: DualPhoneWalkthroughPlaybackParams) {
  const inViewRef = useRef(false);
  const johnLimitsRef = useRef<WalkthroughPlaybackLimits | null>(null);
  const jenniferLimitsRef = useRef<WalkthroughPlaybackLimits | null>(null);

  useSegmentBoundaryPause(johnVideoRef, johnLimitsRef);
  useSegmentBoundaryPause(jenniferVideoRef, jenniferLimitsRef);

  const applyState = useCallback(
    (state: DualPhoneScrubState, isScrolling: boolean) => {
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

      if (isScrolling || !inView) {
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
    [johnVideoRef, jenniferVideoRef, pinRef, setJohnVisible, setJenniferVisible],
  );

  const applyScrub = useCallback(
    (stepFloat: number, isScrolling: boolean) => {
      const state = resolveDualPhoneScrub(steps, stepFloat, durationsRef.current);
      applyState(state, isScrolling);
    },
    [steps, durationsRef, applyState],
  );

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
