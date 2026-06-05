"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type MutableRefObject,
} from "react";
import { bumblePremiumFreeDualPhone } from "@/content/bumbleFlowCaseStudy";
import dp from "./bumblePrototypeDualPhone.module.css";
import { useWalkthroughStepGestures } from "./useWalkthroughStepGestures";

type StepSource = "init" | "scroll" | "click";

/**
 * Premium × Free scroll-driven dual-phone walkthrough.
 *
 * Mirrors the Premium × Premium scroll-pin pattern: the outer pin is
 * `steps.length * 100vh` tall, the inner panel is sticky, and the active step
 * is derived from scroll progress (one wheel gesture = one step). Each step
 * seeks John/Jennifer to their entry state and plays one segment, pausing at
 * its boundary so the phones stay in sync with the narrative.
 */
export function PrototypePremiumFreeWalkthrough() {
  const steps = bumblePremiumFreeDualPhone.steps;
  const lastIndex = steps.length - 1;

  const [stepIndex, setStepIndex] = useState(0);
  const [jenniferVisible, setJenniferVisible] = useState(false);

  const pinRef = useRef<HTMLDivElement | null>(null);
  const stepRef = useRef(0);
  const jenniferVisibleRef = useRef(false);
  const stepSourceRef = useRef<StepSource>("init");

  const scrollLockUntilRef = useRef(0);
  const wheelCooldownUntilRef = useRef(0);
  const nonScrollChangeAtRef = useRef(0);

  const walkthroughInViewRef = useRef(false);
  const johnVideoRef = useRef<HTMLVideoElement | null>(null);
  const jenniferVideoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    stepRef.current = stepIndex;
  }, [stepIndex]);

  useEffect(() => {
    jenniferVisibleRef.current = jenniferVisible;
  }, [jenniferVisible]);

  // —— Smooth-scroll to a given step's slice of the pin ——
  const animateScrollTo = useCallback((targetY: number, duration = 560) => {
    const start = window.scrollY;
    const distance = targetY - start;
    if (Math.abs(distance) < 2) {
      window.scrollTo(0, targetY);
      scrollLockUntilRef.current = performance.now() + 120;
      return;
    }
    const reduceMotion =
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) {
      window.scrollTo(0, targetY);
      scrollLockUntilRef.current = performance.now() + 120;
      return;
    }
    const startTime = performance.now();
    scrollLockUntilRef.current = Number.POSITIVE_INFINITY;

    const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);
    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(1, elapsed / duration);
      const y = start + distance * easeOutCubic(progress);
      window.scrollTo(0, y);
      if (progress < 1) {
        window.requestAnimationFrame(tick);
      } else {
        window.scrollTo(0, targetY);
        window.setTimeout(() => {
          scrollLockUntilRef.current = 0;
        }, 350);
      }
    };
    window.requestAnimationFrame(tick);
  }, []);

  const scrollToStep = useCallback(
    (i: number) => {
      const pin = pinRef.current;
      if (!pin) return;
      const rect = pin.getBoundingClientRect();
      const pinHeight = rect.height;
      const viewportH = window.innerHeight;
      const scrollRange = pinHeight - viewportH;
      if (scrollRange <= 0) return;
      const targetProgress = (i + 0.08) / steps.length;
      const targetIntoPin = scrollRange * targetProgress;
      const newScrollY = window.scrollY + rect.top + targetIntoPin;
      animateScrollTo(newScrollY);
    },
    [steps.length, animateScrollTo],
  );

  // —— Apply a step's video entry state (seek + play/pause + visibility) ——
  const applyStep = useCallback(
    (i: number) => {
      const step = steps[i];
      const john = johnVideoRef.current;
      const jennifer = jenniferVideoRef.current;
      const inView = walkthroughInViewRef.current;

      if (john) {
        seekTo(john, step.johnTime);
        if (step.johnPlay && inView) play(john);
        else john.pause();
      }

      if (step.jenniferVisible !== jenniferVisibleRef.current) {
        jenniferVisibleRef.current = step.jenniferVisible;
        setJenniferVisible(step.jenniferVisible);
      }

      if (jennifer) {
        if (step.jenniferVisible && step.jenniferPlay) {
          seekTo(jennifer, step.jenniferTime);
          if (inView) play(jennifer);
        } else {
          jennifer.pause();
        }
      }
    },
    [steps],
  );

  // —— React to step changes: seek videos, optional smooth-scroll follow ——
  useEffect(() => {
    const source = stepSourceRef.current;
    stepSourceRef.current = "scroll";
    applyStep(stepIndex);
    if (source === "click" && walkthroughInViewRef.current) {
      scrollToStep(stepIndex);
    }
  }, [stepIndex, applyStep, scrollToStep]);

  // —— Pause videos off-screen; resume the current segment when back ——
  useEffect(() => {
    const pin = pinRef.current;
    if (!pin) return;

    const syncPlaybackForView = (inView: boolean) => {
      const john = johnVideoRef.current;
      const jennifer = jenniferVideoRef.current;
      const step = steps[stepRef.current];
      if (inView) {
        if (step.johnPlay) resumeWithinSegment(john, step.johnPauseAt);
        if (step.jenniferVisible && step.jenniferPlay) {
          resumeWithinSegment(jennifer, step.jenniferPauseAt);
        }
      } else {
        john?.pause();
        jennifer?.pause();
      }
    };

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const inView = entry.isIntersecting && entry.intersectionRatio > 0.02;
          if (inView === walkthroughInViewRef.current) continue;
          walkthroughInViewRef.current = inView;
          syncPlaybackForView(inView);
        }
      },
      { threshold: [0, 0.02, 0.05, 0.1, 0.2] },
    );

    observer.observe(pin);
    return () => observer.disconnect();
  }, [steps]);

  // —— John timeupdate → pause at this step's boundary ——
  useEffect(() => {
    const john = johnVideoRef.current;
    if (!john) return;
    const onTime = () => {
      const step = steps[stepRef.current];
      const pauseAt = step.johnPauseAt;
      if (pauseAt != null && john.currentTime >= pauseAt - 0.1 && !john.paused) {
        john.pause();
      }
    };
    john.addEventListener("timeupdate", onTime);
    return () => john.removeEventListener("timeupdate", onTime);
  }, [steps]);

  // —— Jennifer timeupdate → pause at this step's boundary ——
  useEffect(() => {
    const jennifer = jenniferVideoRef.current;
    if (!jennifer) return;
    const onTime = () => {
      const step = steps[stepRef.current];
      const pauseAt = step.jenniferPauseAt;
      if (pauseAt != null && jennifer.currentTime >= pauseAt - 0.1 && !jennifer.paused) {
        jennifer.pause();
      }
    };
    jennifer.addEventListener("timeupdate", onTime);
    return () => jennifer.removeEventListener("timeupdate", onTime);
  }, [steps]);

  // —— Scroll listener derives the step from pin progress (rAF throttled) ——
  useEffect(() => {
    let raf = 0;
    const compute = () => {
      const now = performance.now();
      if (now < scrollLockUntilRef.current) return;
      if (now < nonScrollChangeAtRef.current + 700) return;

      const pin = pinRef.current;
      if (!pin) return;
      const rect = pin.getBoundingClientRect();
      const pinHeight = rect.height;
      const viewportH = window.innerHeight;
      const scrollRange = pinHeight - viewportH;
      if (scrollRange <= 0) return;
      const scrolled = Math.max(0, Math.min(scrollRange, -rect.top));
      const progress = scrolled / scrollRange;
      const N = steps.length;
      let next = Math.floor(progress * N);
      if (next < 0) next = 0;
      if (next >= N) next = N - 1;
      if (next !== stepRef.current) {
        stepSourceRef.current = "scroll";
        stepRef.current = next;
        setStepIndex(next);
      }
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
    };
  }, [steps.length]);

  useWalkthroughStepGestures({
    pinRef,
    stepRef,
    lastIndex,
    setStepIndex,
    stepSourceRef,
    scrollLockUntilRef,
    wheelCooldownUntilRef,
    nonScrollChangeAtRef,
  });

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
            {/* Left column — phones. */}
            <div className={dp.phonesWrap}>
              <div className={dp.phonesRow}>
                <PhoneFrame
                  label={bumblePremiumFreeDualPhone.johnLabel}
                  videoRef={johnVideoRef}
                  src={bumblePremiumFreeDualPhone.johnVideoSrc}
                  visible
                />
                <PhoneFrame
                  label={bumblePremiumFreeDualPhone.jenniferLabel}
                  videoRef={jenniferVideoRef}
                  src={bumblePremiumFreeDualPhone.jenniferVideoSrc}
                  visible={jenniferVisible}
                  ariaHiddenWhenInvisible
                />
              </div>
            </div>

            {/* Middle column — timeline dots. */}
            <nav className={dp.timelineColumn} aria-label="Walkthrough steps">
              <ol className={dp.timelineList}>
                {steps.map((step, i) => {
                  const past = i < stepIndex;
                  const active = i === stepIndex;
                  const dotClass = `${dp.timelineDot} ${
                    active ? dp.timelineDotActive : past ? dp.timelineDotPast : ""
                  }`;
                  return (
                    <li key={step.id} className={dp.timelineItem}>
                      <button
                        type="button"
                        className={dotClass}
                        aria-label={`${step.label} — ${step.title}`}
                        aria-current={active ? "step" : undefined}
                        onClick={() => {
                          if (i === stepRef.current) return;
                          stepSourceRef.current = "click";
                          stepRef.current = i;
                          scrollLockUntilRef.current = Number.POSITIVE_INFINITY;
                          nonScrollChangeAtRef.current = performance.now();
                          setStepIndex(i);
                        }}
                      >
                        <span className={dp.srOnly}>{step.label}</span>
                      </button>
                      {i < steps.length - 1 ? (
                        <span
                          className={`${dp.timelineLine} ${past ? dp.timelineLinePast : ""}`}
                          aria-hidden
                        />
                      ) : null}
                    </li>
                  );
                })}
              </ol>
            </nav>

            {/* Right column — active-step description (keyed for fade-in). */}
            <div className={dp.descriptionColumn}>
              <div className={dp.stepCard}>
                <div key={stepIndex} className={dp.stepInner}>
                  <p className={dp.stepLabel}>{activeStep.label}</p>
                  <h3 className={dp.stepTitle}>{activeStep.title}</h3>
                  <p className={dp.stepBody}>{activeStep.body}</p>
                </div>
              </div>

              {/* Scroll hint below the description text. */}
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

/** Resume playback, swallowing autoplay-policy rejections (videos are muted). */
function play(video: HTMLVideoElement | null) {
  if (!video) return;
  const result = video.play();
  if (result && typeof result.catch === "function") {
    result.catch(() => {
      /* autoplay restriction — muted attribute should keep this happy */
    });
  }
}

/** Seek a video to `time`, waiting for metadata if it isn't ready yet. */
function seekTo(video: HTMLVideoElement, time: number) {
  const apply = () => {
    try {
      video.currentTime = time;
    } catch {
      /* pre-metadata seek may throw — ignore */
    }
  };
  if (video.readyState >= 1) {
    apply();
  } else {
    const once = () => {
      apply();
      video.removeEventListener("loadedmetadata", once);
    };
    video.addEventListener("loadedmetadata", once);
  }
}

/** Resume a video only if it hasn't already reached its segment boundary. */
function resumeWithinSegment(video: HTMLVideoElement | null, pauseAt: number | null) {
  if (!video) return;
  if (pauseAt != null && video.currentTime >= pauseAt - 0.1) return;
  play(video);
}

/** Frame-less phone — the recording already includes the device bezel. No loop. */
function PhoneFrame({
  label,
  src,
  videoRef,
  visible,
  ariaHiddenWhenInvisible = false,
}: {
  label: string;
  src: string;
  videoRef: MutableRefObject<HTMLVideoElement | null>;
  visible: boolean;
  ariaHiddenWhenInvisible?: boolean;
}) {
  return (
    <div
      className={dp.phoneColumn}
      aria-hidden={ariaHiddenWhenInvisible && !visible ? true : undefined}
    >
      <p className={dp.phoneLabel}>{label}</p>
      <div className={`${dp.phoneStage} ${visible ? dp.phoneVisible : dp.phoneHidden}`}>
        <video
          ref={videoRef}
          src={src}
          muted
          playsInline
          preload="metadata"
          aria-label={`${label} screen recording`}
        />
      </div>
    </div>
  );
}
