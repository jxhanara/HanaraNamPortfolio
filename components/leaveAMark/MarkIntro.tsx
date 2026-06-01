"use client";

import { useEffect, useMemo, useRef, useState, type CSSProperties } from "react";
import { Character } from "./Character";
import { GRADIENTS, type Gradient } from "./constants";
import styles from "./LeaveAMark.module.css";

// Trail always uses the "frost" gradient (light blue → lavender), independent of the visitor card color.
const TRAIL_GRADIENT = GRADIENTS.find((g) => g.id === "frost") ?? GRADIENTS[0];

type MarkIntroProps = {
  gradient: Gradient;
  onDone: () => void;
};

const FLY_MS = 2300;
const HOLD_MS = 2700;
const CORNER_MS = 1150;

const FLY_EASE = "cubic-bezier(0.34, 0.04, 0.28, 1)";
const CORNER_EASE = "cubic-bezier(0.5, 0, 0.35, 1)";

const BUBBLE_TEXT =
  "Hi, I'm Hanara's agent Mark! I'll be in the corner if you need me!";

type Star = { x: number; y: number; delay: number; scale: number; rot: number };

type Geometry = {
  width: number;
  height: number;
  d: string;
  totalLen: number;
  holdPct: number;
  holdPoint: { x: number; y: number };
  stars: Star[];
};

const STAR_PATH =
  "M0,-5.5 L1.3,-1.3 L5.5,0 L1.3,1.3 L0,5.5 L-1.3,1.3 L-5.5,0 L-1.3,-1.3 Z";

function buildGeometry(width: number, height: number): Geometry {
  const startX = -90;
  // Loops resolve at the page center, so Mark "falls" into the middle before heading to the corner.
  const baseY = height * 0.5;
  const cornerX = width - 74;
  const cornerY = height - 74;

  const loops = 2;
  const span = width * 0.5 - startX;
  const forwardPerRad = span / (Math.PI * 2 * loops);
  // Radius > forward drift per radian forces the path to cross itself (cursive loops).
  const radius = Math.min(forwardPerRad * 1.85, height * 0.2);

  const pts: Array<[number, number]> = [];
  const loopSamples = 240;
  for (let i = 0; i <= loopSamples; i++) {
    const t = i / loopSamples;
    const theta = t * Math.PI * 2 * loops;
    const x = startX + forwardPerRad * theta - radius * Math.sin(theta);
    const y = baseY - radius * Math.cos(theta) + radius;
    pts.push([x, y]);
  }

  const holdIndex = pts.length - 1;
  const holdPoint = { x: pts[holdIndex][0], y: pts[holdIndex][1] };

  // Smooth tail from the final loop down to the resting corner.
  const last = pts[holdIndex];
  const c1: [number, number] = [last[0] + (cornerX - last[0]) * 0.45, last[1] - 30];
  const c2: [number, number] = [cornerX - 30, cornerY - height * 0.2];
  const tailSamples = 60;
  for (let k = 1; k <= tailSamples; k++) {
    const t = k / tailSamples;
    const mt = 1 - t;
    const x =
      mt * mt * mt * last[0] +
      3 * mt * mt * t * c1[0] +
      3 * mt * t * t * c2[0] +
      t * t * t * cornerX;
    const y =
      mt * mt * mt * last[1] +
      3 * mt * mt * t * c1[1] +
      3 * mt * t * t * c2[1] +
      t * t * t * cornerY;
    pts.push([x, y]);
  }

  // Cumulative arc length (approx) for hold fraction + per-star timing.
  const cum: number[] = [0];
  for (let i = 1; i < pts.length; i++) {
    const dx = pts[i][0] - pts[i - 1][0];
    const dy = pts[i][1] - pts[i - 1][1];
    cum[i] = cum[i - 1] + Math.hypot(dx, dy);
  }
  const totalLen = cum[cum.length - 1] || 1;
  const holdPct = cum[holdIndex] / totalLen;

  const d =
    `M ${pts[0][0].toFixed(1)} ${pts[0][1].toFixed(1)} ` +
    pts
      .slice(1)
      .map((p) => `L ${p[0].toFixed(1)} ${p[1].toFixed(1)}`)
      .join(" ");

  // Drop a sparkle every few samples along the loop section (skip the tail).
  const stars: Star[] = [];
  for (let i = 4; i <= holdIndex; i += 7) {
    const frac = cum[i] / cum[holdIndex];
    stars.push({
      x: pts[i][0],
      y: pts[i][1],
      delay: frac * FLY_MS * 0.92,
      scale: 0.6 + ((i * 37) % 70) / 100,
      rot: (i * 53) % 90,
    });
  }

  return { width, height, d, totalLen, holdPct, holdPoint, stars };
}

type Step = "init" | "fly" | "hold" | "corner";

export function MarkIntro({ gradient, onDone }: MarkIntroProps) {
  const [geo, setGeo] = useState<Geometry | null>(null);
  const [step, setStep] = useState<Step>("init");
  const onDoneRef = useRef(onDone);
  onDoneRef.current = onDone;

  useEffect(() => {
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      const t = window.setTimeout(() => onDoneRef.current(), 200);
      return () => window.clearTimeout(t);
    }
    setGeo(buildGeometry(window.innerWidth, window.innerHeight));
  }, []);

  useEffect(() => {
    if (!geo) return;
    const timers: number[] = [];
    // Kick off the fly-in on the next frame so the initial (distance 0) state paints first.
    const raf = window.requestAnimationFrame(() => setStep("fly"));
    timers.push(window.setTimeout(() => setStep("hold"), FLY_MS));
    timers.push(window.setTimeout(() => setStep("corner"), FLY_MS + HOLD_MS));
    timers.push(
      window.setTimeout(() => onDoneRef.current(), FLY_MS + HOLD_MS + CORNER_MS),
    );
    return () => {
      window.cancelAnimationFrame(raf);
      timers.forEach((t) => window.clearTimeout(t));
    };
  }, [geo]);

  const gradId = useMemo(
    () => `markIntroTrail-${Math.random().toString(36).slice(2)}`,
    [],
  );

  if (!geo) return null;

  const flown = step !== "init";
  const atCorner = step === "corner";

  const moverDistance = atCorner ? "100%" : flown ? `${(geo.holdPct * 100).toFixed(2)}%` : "0%";
  const moverTransition = atCorner
    ? `offset-distance ${CORNER_MS}ms ${CORNER_EASE}`
    : `offset-distance ${FLY_MS}ms ${FLY_EASE}`;

  const bubbleVisible = step === "hold";

  return (
    <div
      className={styles.introOverlay}
      aria-hidden
      style={{ ["--glow-from" as string]: TRAIL_GRADIENT.from } as CSSProperties}
    >
      <div
        className={styles.introDim}
        style={{ opacity: flown && !atCorner ? 1 : 0 }}
      />

      <svg
        className={`${styles.introTrail} ${atCorner ? styles.introTrailFade : ""}`}
        width={geo.width}
        height={geo.height}
        viewBox={`0 0 ${geo.width} ${geo.height}`}
        fill="none"
      >
        <defs>
          <linearGradient id={gradId} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor={TRAIL_GRADIENT.from} />
            <stop offset="1" stopColor={TRAIL_GRADIENT.to} />
          </linearGradient>
        </defs>
        <path
          className={styles.introTrailLine}
          d={geo.d}
          stroke={`url(#${gradId})`}
          style={{
            strokeDasharray: geo.totalLen,
            // Reveal only the looping section (not the tail toward the corner).
            strokeDashoffset: flown
              ? geo.totalLen * (1 - geo.holdPct)
              : geo.totalLen,
            transition: `stroke-dashoffset ${FLY_MS}ms ${FLY_EASE}`,
          }}
        />
        <g>
          {geo.stars.map((s, i) => (
            <path
              key={i}
              className={styles.introStar}
              d={STAR_PATH}
              fill={i % 3 === 0 ? "#fff8c2" : "#ffffff"}
              transform={`translate(${s.x.toFixed(1)} ${s.y.toFixed(1)}) rotate(${s.rot}) scale(${s.scale.toFixed(2)})`}
              style={{ animationDelay: `${Math.round(s.delay)}ms` }}
            />
          ))}
        </g>
      </svg>

      <div
        className={styles.introMover}
        style={{
          offsetPath: `path('${geo.d}')`,
          offsetRotate: "0deg",
          offsetDistance: moverDistance,
          transition: moverTransition,
        }}
      >
        <div className={styles.introScale}>
          <Character pose="active" gradient={gradient} />
        </div>
      </div>

      <div
        className={`${styles.introBubble} ${bubbleVisible ? styles.introBubbleShow : ""}`}
        style={{ left: geo.holdPoint.x, top: geo.holdPoint.y }}
      >
        <span className={styles.introBubbleText}>{BUBBLE_TEXT}</span>
        <span className={styles.introBubbleTail} aria-hidden />
      </div>
    </div>
  );
}
