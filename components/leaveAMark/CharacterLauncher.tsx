"use client";

import { useEffect, useRef, useState } from "react";
import type { Gradient } from "./constants";
import { Character } from "./Character";
import styles from "./LeaveAMark.module.css";

type CharacterLauncherProps = {
  onLaunch: () => void;
  hasCard: boolean;
  visitorName: string | undefined;
  gradient: Gradient;
};

export function CharacterLauncher({
  onLaunch,
  hasCard,
  visitorName,
  gradient,
}: CharacterLauncherProps) {
  const [hover, setHover] = useState(false);
  const [showTip, setShowTip] = useState(false);
  const tipTimer = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    if (hover) {
      tipTimer.current = setTimeout(() => setShowTip(true), 600);
    } else {
      clearTimeout(tipTimer.current);
      setShowTip(false);
    }
    return () => clearTimeout(tipTimer.current);
  }, [hover]);

  const tip = hasCard ? `Welcome back, ${visitorName} ✦` : "Leave a mark ✦";

  return (
    <button
      type="button"
      data-lam-ui
      className={`${styles.launcher} ${hasCard ? styles.launcherReturning : ""}`}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={onLaunch}
      aria-label={tip}
    >
      {hasCard ? <span className={styles.launcherRing} aria-hidden /> : null}
      <Character pose={hover ? "hover" : "idle"} gradient={gradient} />
      <span className={`${styles.launcherTip} ${showTip ? styles.launcherTipShow : ""}`}>{tip}</span>
    </button>
  );
}
