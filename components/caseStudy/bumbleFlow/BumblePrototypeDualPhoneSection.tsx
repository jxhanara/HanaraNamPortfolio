"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type MutableRefObject,
} from "react";
import { bumblePrototypeDualPhone } from "@/content/bumbleFlowCaseStudy";
import dp from "./bumblePrototypeDualPhone.module.css";
import { useWalkthroughStepGestures } from "./useWalkthroughStepGestures";

/**
 * Premium × Premium scroll-driven walkthrough.
 *
 * Architecture (scrollytelling pin pattern):
 *   - The outer `.scrollPin` is `steps.length * 100vh` tall — one viewport per
 *     step. The inner `.scrollPinInner` is `position: sticky`, so the
 *     dual-phone + timeline + description UI stays locked while scrolling.
 *   - The active step is derived from scroll progress inside the pin.
 *     Scrolling past the last (or before the first) dot releases the pin and
 *     the page continues naturally.
 *
 * Sync behavior:
 *   - Step changes seek Kevin to the step's `kevinTime` and play.
 *   - When Kevin's video plays through a step boundary the page smooth-scrolls
 *     to that step's slice (so the right-side text follows) — only while the
 *     walkthrough pin is in the viewport, so reading other sections is never
 *     hijacked by background autoplay.
 *   - During step 5, Kevin's video pauses at `kevinPauseAtTime` and is forced
 *     to resume only once Lindsey's video reaches `lindseyResumeKevinAt` —
 *     Kevin then seeks to `kevinResumeAtTime` so his "Lindsey sent" message
 *     lines up with Lindsey's tap-Send in the same wall-clock instant.
 *   - Lindsey appears the moment Kevin pauses, and freezes + hides as soon as
 *     her short recording reaches its end. Neither video loops.
 *
 * Smoothness:
 *   - No fade-out-then-set timeout — a `key`-driven CSS fade-in plays on every
 *     stepIndex change.
 *   - The scroll listener locks to `Infinity` for the entire RAF animation,
 *     then releases 100 ms after completion. This is the key fix for the
 *     dot-flip-back-and-forth on auto-advance: while the page is animating to
 *     the new step's slice, the scroll listener cannot recompute (and revert)
 *     the step from the not-yet-arrived scroll position.
 */
type StepSource = "init" | "scroll" | "click" | "video";

/** Scroll-driven dual-phone walkthrough (no section chrome — parent supplies header/tabs). */
export function PrototypeDualPhoneWalkthrough() {
  const steps = bumblePrototypeDualPhone.steps;
  const lastIndex = steps.length - 1;

  const [stepIndex, setStepIndex] = useState(0);
  const [lindseyVisible, setLindseyVisible] = useState(false);

  // Refs read by event listeners without re-binding effects.
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const pinRef = useRef<HTMLDivElement | null>(null);
  const stepRef = useRef(0);
  const lindseyVisibleRef = useRef(false);
  const stepSourceRef = useRef<StepSource>("init");

  // True between Kevin's pause and Lindsey's tap-Send — gates resume logic.
  const kevinPausedForLindseyRef = useRef(false);

  // Once Lindsey's recording reaches its end, she stays hidden until the user
  // scrolls back to a step BEFORE step 5 (which counts as a fresh re-entry).
  const lindseyDoneRef = useRef(false);

  // Blocks the scroll listener from re-deriving the step while a click/video
  // smooth-scroll is animating. Set to Infinity during animation, then to a
  // small post-buffer at completion.
  const scrollLockUntilRef = useRef(0);

  // Wheel-snapping: while the panel is pinned, each wheel gesture advances
  // exactly one step. This timestamp swallows the momentum-tail wheel events
  // (and rapid repeats) that otherwise made one swipe skip two steps — or land
  // mid-step so a second swipe was needed.
  const wheelCooldownUntilRef = useRef(0);

  // Belt-and-suspenders guard for the dot flicker the user saw on auto-
  // advance: even after the scroll lock releases, this freeze window prevents
  // the scroll-derived listener from reverting a video/click-driven change
  // for ~700 ms (covers reflows, late scroll events, video seek settling).
  const nonScrollChangeAtRef = useRef(0);

  const kevinVideoRef = useRef<HTMLVideoElement | null>(null);
  const lindseyVideoRef = useRef<HTMLVideoElement | null>(null);

  // True while the walkthrough pin intersects the viewport — gates autoplay,
  // step advancement, and programmatic scroll so other sections stay readable.
  const walkthroughInViewRef = useRef(false);

  useEffect(() => {
    stepRef.current = stepIndex;
  }, [stepIndex]);

  useEffect(() => {
    lindseyVisibleRef.current = lindseyVisible;
  }, [lindseyVisible]);

  // —— Smooth-scroll helpers ——
  /**
   * RAF-driven smooth scroll. Holds the scroll listener lock for the entire
   * animation (lock = Infinity) and releases 100 ms after the final frame —
   * eliminates the back-and-forth dot flicker that happened when the listener
   * sampled a not-yet-arrived scroll position mid-animation.
   */
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
    scrollLockUntilRef.current = Number.POSITIVE_INFINITY; // hold for full animation

    const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);
    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(1, elapsed / duration);
      const y = start + distance * easeOutCubic(progress);
      window.scrollTo(0, y);
      if (progress < 1) {
        window.requestAnimationFrame(tick);
      } else {
        window.scrollTo(0, targetY); // land exactly on target
        // 350 ms buffer covers stray scroll events / reflow after the final
        // scrollTo. Combined with the `nonScrollChangeAtRef` freeze window
        // this is what makes the 4→5 and 5→6 auto-advances stop flickering.
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

  // —— Effect: react to step changes (seek video, optional smooth-scroll) ——
  useEffect(() => {
    const source = stepSourceRef.current;
    stepSourceRef.current = "scroll"; // default for any future un-tagged change

    const step = steps[stepIndex];

    // Each step change is a fresh start for Lindsey's "done" gate so that
    // navigating away and back replays her recording cleanly.
    lindseyDoneRef.current = false;
    kevinPausedForLindseyRef.current = false;

    // Seek + play Kevin unless the change came FROM his timeupdate.
    // We do NOT gate on `walkthroughInViewRef` — the IntersectionObserver
    // pauses Kevin when out of view, so seeking is harmless here. Gating it
    // caused Kevin to fail to seek when stepping rapidly before the observer
    // had reported inView=true.
    if (source !== "video") {
      seekAndPlay(kevinVideoRef.current, step.kevinTime);
    }

    // Lindsey visibility based on the step's anchor + Kevin's anchor time.
    const lindseyShouldShow =
      step.lindseyShowAtKevinTime != null &&
      step.kevinTime >= step.lindseyShowAtKevinTime;
    if (lindseyShouldShow !== lindseyVisibleRef.current) {
      lindseyVisibleRef.current = lindseyShouldShow;
      setLindseyVisible(lindseyShouldShow);
    }

    if ((source === "click" || source === "video") && walkthroughInViewRef.current) {
      scrollToStep(stepIndex);
    }
  }, [stepIndex, steps, scrollToStep]);

  // —— Effect: pause videos off-screen; resume when the walkthrough is visible ——
  // Important: we only PAUSE/RESUME here — we do NOT re-seek. Re-seeking on every
  // re-entry would reset Kevin back to the step's kevinTime and prevent him from
  // ever reaching kevinPauseAtTime (which is what triggers Lindsey to appear).
  useEffect(() => {
    const pin = pinRef.current;
    if (!pin) return;

    const resume = (video: HTMLVideoElement | null) => {
      if (!video) return;
      const p = video.play();
      if (p && typeof p.catch === "function") {
        p.catch(() => {
          /* autoplay restriction — muted attribute should keep this happy */
        });
      }
    };

    const syncPlaybackForView = (inView: boolean) => {
      const kevin = kevinVideoRef.current;
      const lindsey = lindseyVideoRef.current;
      if (inView) {
        resume(kevin);
        if (lindseyVisibleRef.current && !lindseyDoneRef.current) {
          resume(lindsey);
        }
      } else {
        kevin?.pause();
        lindsey?.pause();
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
  }, []);

  // —— Effect: Lindsey play / pause based on visibility ——
  // Decoupled from `walkthroughInViewRef` — the IntersectionObserver effect
  // pauses her when out of view and resumes when back. Gating play on
  // `walkthroughInViewRef` here caused her to silently fail to start if the ref
  // hadn't flipped to true yet when she was set visible.
  useEffect(() => {
    const lindsey = lindseyVideoRef.current;
    if (!lindsey) return;
    if (lindseyVisible) {
      if (lindseyDoneRef.current) return; // safety — shouldn't be visible if done
      try {
        lindsey.currentTime = 0;
      } catch {
        /* ignore — pre-metadata seek may throw */
      }
      const playResult = lindsey.play();
      if (playResult && typeof playResult.catch === "function") {
        playResult.catch(() => {
          /* autoplay restriction — muted attribute should keep this happy */
        });
      }
    } else {
      lindsey.pause();
    }
  }, [lindseyVisible]);

  // —— Effect: Lindsey "ended" → freeze + hide phone, mark done ——
  useEffect(() => {
    const lindsey = lindseyVideoRef.current;
    if (!lindsey) return;
    const onEnded = () => {
      lindseyDoneRef.current = true;
      // Pause defensively (browser already paused on end with loop=false).
      lindsey.pause();
      if (lindseyVisibleRef.current) {
        lindseyVisibleRef.current = false;
        setLindseyVisible(false);
      }
    };
    lindsey.addEventListener("ended", onEnded);
    return () => {
      lindsey.removeEventListener("ended", onEnded);
    };
  }, []);

  // —— Effect: scroll listener derives step from pin progress (rAF throttled) ——
  useEffect(() => {
    let raf = 0;
    const compute = () => {
      const now = performance.now();
      // Skip while a click/video smooth-scroll is animating.
      if (now < scrollLockUntilRef.current) return;
      // Freeze window: don't let a stale scroll position revert a recent
      // click/video-driven step change.
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
    compute(); // initial sync (deep links / mid-section refresh)

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

  // —— Effect: Kevin timeupdate → pause-for-Lindsey, auto-advance step ——
  useEffect(() => {
    const kevin = kevinVideoRef.current;
    if (!kevin) return;

    const onTimeUpdate = () => {
      const t = kevin.currentTime;
      const step = steps[stepRef.current];

      // —— Pause Kevin so he doesn't show "Lindsey sent" before she sends. ——
      // We require:
      //   - This step actually involves Lindsey
      //   - We haven't paused for her yet this cycle
      //   - Lindsey isn't already "done" (post-end)
      //   - Kevin's time is at-or-past the pause anchor (narrow window so
      //     scrubbing past doesn't re-pause).
      // When the pause fires we also FORCE Lindsey to be visible — the two
      // moments must land in the same tick to avoid a flash of Kevin showing
      // "Lindsey sent" before Lindsey appears.
      const pauseAt = bumblePrototypeDualPhone.kevinPauseAtTime;
      if (
        step.lindseyShowAtKevinTime != null &&
        !kevinPausedForLindseyRef.current &&
        !lindseyDoneRef.current &&
        t >= pauseAt &&
        t < pauseAt + 1.5
      ) {
        if (!lindseyVisibleRef.current) {
          lindseyVisibleRef.current = true;
          setLindseyVisible(true);
        }
        kevinPausedForLindseyRef.current = true;
        kevin.pause();
        return; // skip step-advance this tick
      }

      // —— Freeze at the current step's boundary ——
      // The video plays ONLY the current step's segment, then pauses so the
      // phone stays in sync with the on-screen narrative. It never advances the
      // step or drives the scroll position — moving between steps is fully
      // manual (scroll-snap / dot click). This is what stops the runaway
      // auto-scroll the user saw after a single swipe.
      const nextIdx = stepRef.current + 1;
      if (nextIdx <= steps.length - 1) {
        const boundary = steps[nextIdx].kevinTime;
        if (t >= boundary - 0.1 && !kevin.paused && !kevinPausedForLindseyRef.current) {
          kevin.pause();
        }
      }

      // —— Lindsey appearance (timeupdate-driven, in case we didn't pause) ——
      const lindseyShouldShow =
        step.lindseyShowAtKevinTime != null &&
        t >= step.lindseyShowAtKevinTime &&
        !lindseyDoneRef.current;
      if (lindseyShouldShow && !lindseyVisibleRef.current) {
        lindseyVisibleRef.current = true;
        setLindseyVisible(true);
      }
    };

    kevin.addEventListener("timeupdate", onTimeUpdate);
    return () => {
      kevin.removeEventListener("timeupdate", onTimeUpdate);
    };
  }, [steps]);

  // —— Effect: Lindsey timeupdate → resume Kevin once she "sends" ——
  useEffect(() => {
    const lindsey = lindseyVideoRef.current;
    if (!lindsey) return;

    const onLindseyTime = () => {
      if (!kevinPausedForLindseyRef.current) return;
      if (lindsey.currentTime >= bumblePrototypeDualPhone.lindseyResumeKevinAt) {
        kevinPausedForLindseyRef.current = false;
        const kevin = kevinVideoRef.current;
        if (kevin) {
          // Seek Kevin to the exact "Lindsey sent" frame so the two phones
          // light up the new-suggestion message in the same instant.
          const resumeTime = bumblePrototypeDualPhone.kevinResumeAtTime;
          if (typeof resumeTime === "number") {
            try {
              kevin.currentTime = resumeTime;
            } catch {
              /* ignore */
            }
          }
          const p = kevin.play();
          if (p && typeof p.catch === "function") {
            p.catch(() => {
              /* autoplay rejection — ignore */
            });
          }
        }
      }
    };

    lindsey.addEventListener("timeupdate", onLindseyTime);
    return () => {
      lindsey.removeEventListener("timeupdate", onLindseyTime);
    };
  }, []);

  // —— Render ——
  const activeStep = steps[stepIndex];
  return (
    <div ref={sectionRef} className={dp.dualPhoneRail}>
        {/* Scroll-pin region — one viewport per step keeps the panel sticky. */}
        <div
          ref={pinRef}
          className={dp.scrollPin}
          style={{ height: `${steps.length * 100}vh` }}
        >
          <div className={dp.scrollPinInner}>
            <div className={dp.walkthroughGrid}>
              {/* Left column — phones (no chassis: videos already have a bezel). */}
              <div className={dp.phonesWrap}>
                <div className={dp.phonesRow}>
                  <PhoneFrame
                    label={bumblePrototypeDualPhone.kevinPosterLabel}
                    videoRef={kevinVideoRef}
                    src={bumblePrototypeDualPhone.kevinVideoSrc}
                    visible
                  />
                  <PhoneFrame
                    label={bumblePrototypeDualPhone.lindseyPosterLabel}
                    videoRef={lindseyVideoRef}
                    src={bumblePrototypeDualPhone.lindseyVideoSrc}
                    visible={lindseyVisible}
                    ariaHiddenWhenInvisible
                  />
                </div>
              </div>

              {/* Middle column — timeline (slim). */}
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
                            // Pre-lock so any stray scroll event between this
                            // setStepIndex and the useEffect's animateScrollTo
                            // can't revert the step.
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

              {/* Right column — narrow active-step description.
                  Keyed on stepIndex so the fade-in animation replays each change. */}
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

/** Seek a video to `time` (waiting for metadata if needed) then play it. */
function seekAndPlay(video: HTMLVideoElement | null, time: number | null) {
  if (!video || time == null) return;
  const apply = () => {
    try {
      video.currentTime = time;
    } catch {
      /* ignore — some browsers throw before metadata is ready */
    }
    const playResult = video.play();
    if (playResult && typeof playResult.catch === "function") {
      playResult.catch(() => {
        /* autoplay restriction — muted attribute should keep this happy */
      });
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

/** Frame-less phone. The screen recordings already include the device bezel,
 *  so we just render the video with a soft drop shadow. No `loop` — the video
 *  freezes on its last frame at the end of the recording. */
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
          aria-label={`${label}'s screen recording`}
        />
      </div>
    </div>
  );
}
