"use client";

import { createPortal } from "react-dom";
import { useLayoutEffect, useState } from "react";
import type { CSSProperties } from "react";
import type { Gradient } from "./constants";
import styles from "./LeaveAMark.module.css";

type JumpSpotlightProps = {
  itemId: string;
  gradient: Gradient;
};

function measureTarget(itemId: string): DOMRect | null {
  const el = document.querySelector<HTMLElement>(
    `[data-lam-item-id="${itemId}"][data-lam-jump-highlight="true"]`,
  );
  return el?.getBoundingClientRect() ?? null;
}

export function JumpSpotlight({ itemId, gradient }: JumpSpotlightProps) {
  const [rect, setRect] = useState<DOMRect | null>(null);

  useLayoutEffect(() => {
    const measure = () => setRect(measureTarget(itemId));
    measure();
    const raf = requestAnimationFrame(() => measure());
    const t1 = window.setTimeout(measure, 200);
    const t2 = window.setTimeout(measure, 450);
    const t3 = window.setTimeout(measure, 900);
    window.addEventListener("scroll", measure, true);
    window.addEventListener("resize", measure);
    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(t1);
      window.clearTimeout(t2);
      window.clearTimeout(t3);
      window.removeEventListener("scroll", measure, true);
      window.removeEventListener("resize", measure);
    };
  }, [itemId]);

  if (!rect || rect.width === 0) return null;

  const pad = 18;
  const glowStyle = {
    left: rect.left - pad,
    top: rect.top - pad,
    width: rect.width + pad * 2,
    height: rect.height + pad * 2,
    "--from": gradient.from,
    "--to": gradient.to,
  } as CSSProperties;

  return createPortal(
    <div className={styles.jumpSpotlightLayer} aria-hidden>
      <div className={styles.jumpSpotlightGlow} style={glowStyle} />
    </div>,
    document.body,
  );
}
