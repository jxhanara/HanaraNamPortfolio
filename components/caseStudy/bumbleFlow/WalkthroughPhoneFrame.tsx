"use client";

import { useEffect, type MutableRefObject } from "react";
import dp from "./bumblePrototypeDualPhone.module.css";

/** Pause and seek — used while the user is actively scrolling. */
export function scrubVideo(video: HTMLVideoElement | null, time: number) {
  if (!video) return;
  const apply = () => {
    try {
      video.pause();
      video.playbackRate = 1;
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

/** Seek (if needed) and play at normal speed once scrolling stops. */
export function playVideoNormal(video: HTMLVideoElement | null, time?: number) {
  if (!video) return;
  const start = () => {
    try {
      if (time != null) video.currentTime = time;
      video.playbackRate = 1;
      const result = video.play();
      if (result && typeof result.catch === "function") {
        result.catch(() => {
          /* autoplay restriction — muted attribute should keep this happy */
        });
      }
    } catch {
      /* ignore */
    }
  };
  if (video.readyState >= 1) {
    start();
  } else {
    const once = () => {
      start();
      video.removeEventListener("loadedmetadata", once);
    };
    video.addEventListener("loadedmetadata", once);
  }
}

export type WalkthroughPlaybackLimits = {
  end: number;
  shouldPlay: boolean;
};

/** Pause a video once it reaches the end of the current narrative segment. */
export function useSegmentBoundaryPause(
  videoRef: MutableRefObject<HTMLVideoElement | null>,
  limitsRef: MutableRefObject<WalkthroughPlaybackLimits | null>,
) {
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const onTime = () => {
      const limits = limitsRef.current;
      if (!limits?.shouldPlay || video.paused) return;
      if (video.currentTime >= limits.end - 0.08) {
        video.pause();
        try {
          video.currentTime = limits.end;
        } catch {
          /* ignore */
        }
      }
    };

    video.addEventListener("timeupdate", onTime);
    return () => video.removeEventListener("timeupdate", onTime);
  }, [videoRef, limitsRef]);
}

// Re-export for backwards compatibility in imports
export { scrubVideo as seekVideo };

export function WalkthroughPhoneFrame({
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
