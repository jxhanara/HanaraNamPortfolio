"use client";

import { useEffect, useRef, useState } from "react";
import type { Gradient } from "./constants";
import type { Stroke } from "./types";
import {
  findStrokeIndexToErase,
  straightenHighlightPoints,
  strokeSamplesOverReadableText,
} from "./strokeUtils";
import styles from "./LeaveAMark.module.css";

type PenCanvasProps = {
  tool: string;
  gradient: Gradient;
  strokes: Stroke[];
  setStrokes: React.Dispatch<React.SetStateAction<Stroke[]>>;
};

function pathFromPoints(pts: { x: number; y: number }[]): string {
  if (!pts.length) return "";
  let d = `M ${pts[0].x} ${pts[0].y}`;
  for (let i = 1; i < pts.length; i++) d += ` L ${pts[i].x} ${pts[i].y}`;
  return d;
}

export function PenCanvas({ tool, gradient, strokes, setStrokes }: PenCanvasProps) {
  const ref = useRef<SVGSVGElement>(null);
  const drawing = useRef<Stroke | null>(null);
  const [size, setSize] = useState({ w: 0, h: 0 });

  useEffect(() => {
    const onResize = () => {
      setSize({
        w: window.innerWidth,
        h: document.documentElement.scrollHeight,
      });
    };
    onResize();
    window.addEventListener("resize", onResize);
    const ro = new ResizeObserver(onResize);
    ro.observe(document.body);
    return () => {
      window.removeEventListener("resize", onResize);
      ro.disconnect();
    };
  }, []);

  const drawActive = tool === "pen" || tool === "highlight";
  const eraserActive = tool === "eraser";
  const canvasInteractive = drawActive || eraserActive;

  const onDown = (e: React.PointerEvent) => {
    if (eraserActive) {
      e.preventDefault();
      const x = e.clientX + window.scrollX;
      const y = e.clientY + window.scrollY;
      setStrokes((s) => {
        const idx = findStrokeIndexToErase(x, y, s);
        if (idx < 0) return s;
        return s.filter((_, i) => i !== idx);
      });
      ref.current?.setPointerCapture(e.pointerId);
      return;
    }
    if (!drawActive) return;
    e.preventDefault();
    const x = e.clientX + window.scrollX;
    const y = e.clientY + window.scrollY;
    drawing.current = {
      kind: tool as "pen" | "highlight",
      color: tool === "pen" ? gradient.from : gradient.to,
      points: [{ x, y }],
    };
    ref.current?.setPointerCapture(e.pointerId);
  };

  const onMove = (e: React.PointerEvent) => {
    if (!drawing.current) return;
    const x = e.clientX + window.scrollX;
    const y = e.clientY + window.scrollY;
    drawing.current.points.push({ x, y });
    setStrokes((s) => {
      const cleaned = s.filter((x) => !x._tmp);
      return [...cleaned, { ...drawing.current!, _tmp: true }];
    });
  };

  const onUp = () => {
    if (!drawing.current) return;
    const stroke = drawing.current;
    drawing.current = null;
    let points = stroke.points;
    if (stroke.kind === "highlight" && strokeSamplesOverReadableText(points)) {
      points = straightenHighlightPoints(points);
    }
    setStrokes((s) => {
      const cleaned = s.filter((x) => !x._tmp);
      return [...cleaned, { kind: stroke.kind, color: stroke.color, points }];
    });
  };

  const cursorClass =
    tool === "pen"
      ? styles.cursorPen
      : tool === "highlight"
        ? styles.cursorHighlight
        : tool === "eraser"
          ? styles.cursorEraser
          : "";

  return (
    <svg
      ref={ref}
      data-lam-ui
      className={`${styles.penCanvas} ${canvasInteractive ? styles.penCanvasActive : ""} ${cursorClass}`}
      width={size.w}
      height={size.h}
      onPointerDown={onDown}
      onPointerMove={onMove}
      onPointerUp={onUp}
      onPointerCancel={onUp}
    >
      {strokes.map((s, i) => (
        <path
          key={i}
          d={pathFromPoints(s.points)}
          stroke={s.color}
          strokeWidth={s.kind === "highlight" ? 18 : 2.5}
          strokeOpacity={s.kind === "highlight" ? 0.32 : 0.95}
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      ))}
    </svg>
  );
}
