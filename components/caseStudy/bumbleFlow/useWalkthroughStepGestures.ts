"use client";

import { useEffect, type MutableRefObject } from "react";

const COOLDOWN_MS = 680;
const TOUCH_STEP_THRESHOLD_PX = 36;

export type WalkthroughStepSource = "init" | "scroll" | "click" | "video";

function isPinEngaged(pin: HTMLElement): boolean {
  const rect = pin.getBoundingClientRect();
  const viewportH = window.innerHeight;
  return rect.top <= 0 && rect.bottom >= viewportH;
}

type WalkthroughGesturesParams = {
  pinRef: MutableRefObject<HTMLDivElement | null>;
  stepRef: MutableRefObject<number>;
  lastIndex: number;
  setStepIndex: (index: number) => void;
  stepSourceRef: MutableRefObject<WalkthroughStepSource>;
  scrollLockUntilRef: MutableRefObject<number>;
  wheelCooldownUntilRef: MutableRefObject<number>;
  nonScrollChangeAtRef: MutableRefObject<number>;
};

/** Wheel + touch: one step per gesture while the scroll-pin walkthrough is engaged. */
export function useWalkthroughStepGestures({
  pinRef,
  stepRef,
  lastIndex,
  setStepIndex,
  stepSourceRef,
  scrollLockUntilRef,
  wheelCooldownUntilRef,
  nonScrollChangeAtRef,
}: WalkthroughGesturesParams) {
  useEffect(() => {
    const tryAdvance = (dir: 1 | -1): boolean => {
      const current = stepRef.current;
      const target = current + dir;
      if (target < 0 || target > lastIndex) return false;

      const now = performance.now();
      if (now < wheelCooldownUntilRef.current) return true;
      wheelCooldownUntilRef.current = now + COOLDOWN_MS;

      stepSourceRef.current = "click";
      stepRef.current = target;
      scrollLockUntilRef.current = Number.POSITIVE_INFINITY;
      nonScrollChangeAtRef.current = now;
      setStepIndex(target);
      return true;
    };

    const onWheel = (e: WheelEvent) => {
      const pin = pinRef.current;
      if (!pin || !isPinEngaged(pin)) return;

      if (e.deltaY === 0 || Math.abs(e.deltaY) <= Math.abs(e.deltaX)) return;

      const dir = e.deltaY > 0 ? 1 : -1;
      const current = stepRef.current;
      const target = current + dir;
      if (target < 0 || target > lastIndex) return;

      e.preventDefault();
      tryAdvance(dir);
    };

    let touchStartY = 0;
    let touchStepConsumed = false;

    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length !== 1) return;
      touchStartY = e.touches[0].clientY;
      touchStepConsumed = false;
    };

    const onTouchMove = (e: TouchEvent) => {
      const pin = pinRef.current;
      if (!pin || !isPinEngaged(pin) || e.touches.length !== 1 || touchStepConsumed) {
        return;
      }

      const delta = touchStartY - e.touches[0].clientY;
      if (Math.abs(delta) < TOUCH_STEP_THRESHOLD_PX) return;

      const dir: 1 | -1 = delta > 0 ? 1 : -1;
      const current = stepRef.current;
      if ((dir === 1 && current >= lastIndex) || (dir === -1 && current <= 0)) {
        return;
      }

      e.preventDefault();
      touchStepConsumed = true;
      tryAdvance(dir);
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: false });

    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
    };
  }, [
    pinRef,
    stepRef,
    lastIndex,
    setStepIndex,
    stepSourceRef,
    scrollLockUntilRef,
    wheelCooldownUntilRef,
    nonScrollChangeAtRef,
  ]);
}
