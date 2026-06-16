"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { getPinScrollProgress } from "./walkthroughScrub";

const SCRUB_IDLE_MS = 180;

type UseWalkthroughPinScrollParams = {
  pinRef: React.RefObject<HTMLDivElement | null>;
  stepCount: number;
  /** `isScrolling` is true while the user is actively scrolling; false when idle. */
  onScrub?: (stepFloat: number, isScrolling: boolean) => void;
};

/**
 * Continuous scroll progress through a walkthrough pin (no wheel-snap).
 * Calls `onScrub(float, false)` after scroll idle so videos can resume at 1×.
 */
export function useWalkthroughPinScroll({
  pinRef,
  stepCount,
  onScrub,
}: UseWalkthroughPinScrollParams) {
  const [stepFloat, setStepFloat] = useState(0);
  const [stepIndex, setStepIndex] = useState(0);
  const [isScrubbing, setIsScrubbing] = useState(false);

  const stepFloatRef = useRef(0);
  const onScrubRef = useRef(onScrub);
  const idleTimerRef = useRef<number | null>(null);

  useEffect(() => {
    onScrubRef.current = onScrub;
  }, [onScrub]);

  const applyProgress = useCallback(
    (progress: number) => {
      const float = Math.max(0, Math.min(stepCount - 0.0001, progress * stepCount));
      const delta = Math.abs(float - stepFloatRef.current);

      stepFloatRef.current = float;
      setStepFloat(float);
      setStepIndex(Math.floor(float));

      if (delta > 0.0005) {
        setIsScrubbing(true);
        onScrubRef.current?.(float, true);
      }

      if (idleTimerRef.current != null) {
        window.clearTimeout(idleTimerRef.current);
      }
      idleTimerRef.current = window.setTimeout(() => {
        setIsScrubbing(false);
        onScrubRef.current?.(stepFloatRef.current, false);
      }, SCRUB_IDLE_MS);
    },
    [stepCount],
  );

  useEffect(() => {
    let raf = 0;

    const compute = () => {
      const pin = pinRef.current;
      if (!pin) return;
      applyProgress(getPinScrollProgress(pin));
    };

    const onScroll = () => {
      if (raf) return;
      raf = window.requestAnimationFrame(() => {
        raf = 0;
        compute();
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    compute();

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) window.cancelAnimationFrame(raf);
      if (idleTimerRef.current != null) window.clearTimeout(idleTimerRef.current);
    };
  }, [pinRef, applyProgress]);

  return { stepFloat, stepIndex, isScrubbing, stepFloatRef };
}
