"use client";

import { useEffect, useRef } from "react";
import styles from "./styles.module.css";

export type MediaStripVideoSource =
  | string
  | {
      src: string;
      /** Loop start in seconds (e.g. 3 for 00:03). */
      start?: number;
      /** Loop end in seconds (e.g. 71 for 01:11). Omit to play through file end. */
      end?: number;
    };

function normalizeSpec(spec: MediaStripVideoSource): {
  src: string;
  start: number;
  end: number | undefined;
  key: string;
} {
  if (typeof spec === "string") {
    return { src: spec, start: 0, end: undefined, key: spec };
  }
  const start = spec.start ?? 0;
  return {
    src: spec.src,
    start,
    end: spec.end,
    key: `${spec.src}:${start}:${spec.end ?? "end"}`,
  };
}

export function MediaStripVideoCell({
  spec,
  className,
}: {
  spec: MediaStripVideoSource;
  className?: string;
}) {
  const { src, start, end, key } = normalizeSpec(spec);
  const videoRef = useRef<HTMLVideoElement>(null);

  /* Use native `loop` when there is no custom end — the browser then handles wraparound. */
  const useNativeLoop = end === undefined;

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const seekToStart = () => {
      const target = Number.isFinite(start) && start > 0 ? start : 0;
      try {
        video.currentTime = target;
      } catch {
        /* ignore seek errors before metadata */
      }
    };

    const playSafe = () => {
      void video.play().catch(() => {});
    };

    const onLoadedMetadata = () => {
      seekToStart();
      playSafe();
    };

    const onTimeUpdate = () => {
      if (end === undefined || !Number.isFinite(end)) return;
      if (video.currentTime >= end - 0.05) {
        seekToStart();
        playSafe();
      }
    };

    /* Fallback: if a frame skip carries currentTime past `end` before timeupdate fires. */
    const onEnded = () => {
      seekToStart();
      playSafe();
    };

    video.muted = true;
    video.playsInline = true;
    video.loop = useNativeLoop;

    video.addEventListener("loadedmetadata", onLoadedMetadata);
    video.addEventListener("timeupdate", onTimeUpdate);
    video.addEventListener("ended", onEnded);

    if (video.readyState >= 1) {
      onLoadedMetadata();
    }

    return () => {
      video.removeEventListener("loadedmetadata", onLoadedMetadata);
      video.removeEventListener("timeupdate", onTimeUpdate);
      video.removeEventListener("ended", onEnded);
    };
  }, [key, start, end, useNativeLoop]);

  return (
    <div className={className}>
      <div className={styles.mediaVideoScale}>
        <video
          ref={videoRef}
          key={key}
          className={styles.mediaVideo}
          src={src}
          autoPlay
          muted
          loop={useNativeLoop}
          playsInline
          preload="metadata"
          aria-hidden
        />
      </div>
    </div>
  );
}
