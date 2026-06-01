"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import l from "./uiForAiHero.module.css";

type HeroSlide = {
  src: string;
  label: string;
};

const HERO_SLIDES: readonly HeroSlide[] = [
  {
    src: "/assets/uiforai/ContextSwitching_SearchJumpBackIn.mp4",
    label: "Recall Search and Thread Map",
  },
  {
    src: "/assets/uiforai/ContextSwitching_AISummaryNextSteps.mp4",
    label: "Welcome Back summary and Next Steps",
  },
  {
    src: "/assets/uiforai/ContextSwitching_RelatedChatsMerge.mp4",
    label: "Resume State side-by-side reference and merge",
  },
];

/** Safety buffer (ms) added to a clip's real duration before force-rotating. */
const ROTATE_SAFETY_MS = 1500;
/** Used only until a clip reports its true duration. */
const FALLBACK_ROTATE_MS = 15000;

export function UiForAiHeroCarousel() {
  const slideCount = HERO_SLIDES.length;
  const [activeIndex, setActiveIndex] = useState(0);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const fallbackTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const advance = useCallback(() => {
    setActiveIndex((current) => (current + 1) % slideCount);
  }, [slideCount]);

  useEffect(() => {
    const activeVideo = videoRefs.current[activeIndex];

    videoRefs.current.forEach((video, index) => {
      if (!video) return;
      if (index === activeIndex) return;
      video.pause();
      video.currentTime = 0;
    });

    const armFallback = () => {
      if (fallbackTimer.current) clearTimeout(fallbackTimer.current);
      const duration = activeVideo?.duration;
      const ms =
        duration && Number.isFinite(duration) && duration > 0
          ? duration * 1000 + ROTATE_SAFETY_MS
          : FALLBACK_ROTATE_MS;
      fallbackTimer.current = setTimeout(advance, ms);
    };

    if (activeVideo) {
      activeVideo.currentTime = 0;
      const playAttempt = activeVideo.play();
      if (playAttempt && typeof playAttempt.catch === "function") {
        playAttempt.catch(() => {
          /* autoplay may be blocked; fallback timer still rotates */
        });
      }
      // Wait for real duration so we never cut a clip short.
      if (activeVideo.readyState >= 1) {
        armFallback();
      } else {
        activeVideo.addEventListener("loadedmetadata", armFallback, { once: true });
      }
    } else {
      armFallback();
    }

    return () => {
      if (fallbackTimer.current) clearTimeout(fallbackTimer.current);
      activeVideo?.removeEventListener("loadedmetadata", armFallback);
    };
  }, [activeIndex, advance]);

  return (
    <div className={l.stage}>
      <div className={l.viewport}>
        {HERO_SLIDES.map((slide, index) => {
          const slot = (index - activeIndex + slideCount) % slideCount;
          const slotClass =
            slot === 0 ? l.slotPrimary : slot === 1 ? l.slotRight : slot === 2 ? l.slotLeft : l.slotHidden;

          return (
            <div key={slide.src} className={`${l.laptop} ${slotClass}`} aria-hidden={slot !== 0}>
              <div className={l.screen}>
                <span className={l.notch} aria-hidden />
                <div className={l.display}>
                  <video
                    ref={(node) => {
                      videoRefs.current[index] = node;
                    }}
                    className={l.media}
                    src={slide.src}
                    muted
                    playsInline
                    preload="auto"
                    aria-label={slide.label}
                    onEnded={() => {
                      if (index === activeIndex) advance();
                    }}
                  />
                </div>
              </div>
              <div className={l.base} aria-hidden />
            </div>
          );
        })}
      </div>
    </div>
  );
}
