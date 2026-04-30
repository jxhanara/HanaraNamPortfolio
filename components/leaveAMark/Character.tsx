"use client";

import { useId } from "react";
import type { Gradient } from "./constants";
import styles from "./LeaveAMark.module.css";

const CHARACTER_SRC = "/images/cutecharacter.png";

export type CharacterPose = "idle" | "hover" | "active" | "wave" | "tap";

const poseClass: Record<CharacterPose, string> = {
  idle: "",
  hover: styles.poseHover,
  active: styles.poseActive,
  wave: styles.poseWave,
  tap: styles.poseTap,
};

type CharacterProps = {
  pose: CharacterPose;
  gradient: Gradient;
};

export function Character({ pose, gradient }: CharacterProps) {
  const uid = useId();
  const gradId = `wandGrad-${uid.replace(/:/g, "")}`;
  const wandGlow = pose === "active" || pose === "tap" || pose === "hover";

  return (
    <div className={`${styles.character} ${poseClass[pose]}`}>
      <div className={styles.charBob}>
        <div className={styles.charShadow} aria-hidden />
        <img className={styles.charSprite} src={CHARACTER_SRC} alt="" draggable={false} />
        <svg className={styles.charWand} viewBox="0 0 60 80" aria-hidden>
          <defs>
            <linearGradient id={gradId} x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor={gradient.from} />
              <stop offset="1" stopColor={gradient.to} />
            </linearGradient>
          </defs>
          <line x1="18" y1="60" x2="42" y2="14" stroke="#d6dceb" strokeWidth="3" strokeLinecap="round" />
          <circle cx="42" cy="14" r="6" fill={`url(#${gradId})`} className={styles.wandTip} />
          {wandGlow ? (
            <circle cx="42" cy="14" r="11" fill={`url(#${gradId})`} className={styles.wandHalo} />
          ) : null}
          <g className={styles.sparkles}>
            <path d="M50 6 L52 11 L57 13 L52 15 L50 20 L48 15 L43 13 L48 11 Z" fill="#fff8c2" />
            <path d="M30 4 L31 7 L34 8 L31 9 L30 12 L29 9 L26 8 L29 7 Z" fill="#fff" />
          </g>
        </svg>
      </div>
    </div>
  );
}
