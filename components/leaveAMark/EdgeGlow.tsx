"use client";

import type { CSSProperties } from "react";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import type { Gradient } from "./constants";
import styles from "./LeaveAMark.module.css";

export type EdgeGlowMode = "off" | "drawing" | "breathing" | "fading";

const modeClass: Record<EdgeGlowMode, string> = {
  off: styles.modeOff,
  drawing: styles.modeDrawing,
  breathing: styles.modeBreathing,
  fading: styles.modeFading,
};

type EdgeGlowProps = {
  gradient: Gradient;
  mode: EdgeGlowMode;
};

/**
 * Renders at `document.body` so the vignette stacks above the sticky nav (z-index) while
 * keeping `pointer-events: none` so links and the visitor pill stay clickable.
 */
export function EdgeGlow({ gradient, mode }: EdgeGlowProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const style = {
    "--glow-from": gradient.from,
    "--glow-to": gradient.to,
  } as CSSProperties;

  const node = (
    <div
      className={`${styles.edgeGlow} ${styles.edgeGlowDocRoot} ${modeClass[mode]}`}
      style={style}
      aria-hidden
    />
  );

  if (!mounted) return null;
  return createPortal(node, document.body);
}
