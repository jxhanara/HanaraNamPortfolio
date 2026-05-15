"use client";

import type { CSSProperties, Dispatch, SetStateAction } from "react";
import { useId, useLayoutEffect, useRef, useState } from "react";
import type { Gradient } from "./constants";
import styles from "./LeaveAMark.module.css";
import type { ToolbarDock, ToolbarPos } from "./types";
import { ToolbarIcon } from "./toolbarIcons";
import { clampToolbarIntoViewport, magneticDragPosition, snapToolbarPosition } from "./toolbarSnap";

const TOOLS = [
  { id: "pointer", label: "Pointer", Icon: ToolbarIcon.pointer },
  { id: "sticky", label: "Sticky", Icon: ToolbarIcon.sticky },
  { id: "text", label: "Text", Icon: ToolbarIcon.text },
  { id: "comment", label: "Comment", Icon: ToolbarIcon.comment },
] as const;

export type ToolId = (typeof TOOLS)[number]["id"];

type ToolbarProps = {
  tool: string;
  setTool: (t: ToolId) => void;
  onDone: () => void;
  gradient: Gradient;
  position: ToolbarPos;
  setPosition: Dispatch<SetStateAction<ToolbarPos>>;
};

export function Toolbar({ tool, setTool, onDone, gradient, position, setPosition }: ToolbarProps) {
  const [collapsed, setCollapsed] = useState(false);
  const [confirming, setConfirming] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const drag = useRef<{ dx: number; dy: number } | null>(null);
  const dragMoved = useRef(false);
  const prevCollapsed = useRef(collapsed);
  const starGradId = `lam-star-${useId().replace(/:/g, "")}`;

  const dock: ToolbarDock = position.dock ?? "none";

  useLayoutEffect(() => {
    if (prevCollapsed.current && !collapsed) {
      const el = ref.current;
      if (el) {
        const r = el.getBoundingClientRect();
        setPosition((prev) => clampToolbarIntoViewport(prev.x, prev.y, r.width, r.height));
      }
    }
    prevCollapsed.current = collapsed;
  }, [collapsed, setPosition]);

  useLayoutEffect(() => {
    if (collapsed) return;
    const onResize = () => {
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      setPosition((prev) => clampToolbarIntoViewport(prev.x, prev.y, r.width, r.height));
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [collapsed, setPosition]);

  const onPointerDown = (e: React.PointerEvent) => {
    const t = e.target as HTMLElement;
    const el = ref.current;
    if (!el) return;

    if (collapsed) {
      if (!t.closest("[data-lam-toolbar-drag]")) return;
      dragMoved.current = false;
      const r = el.getBoundingClientRect();
      drag.current = { dx: e.clientX - r.left, dy: e.clientY - r.top };
      el.setPointerCapture(e.pointerId);
      return;
    }

    const fromGrip = !!t.closest("[data-lam-toolbar-drag]");
    const fromBarChrome = t === el;
    if (!fromGrip && !fromBarChrome) {
      if (t.closest("button, input")) return;
      return;
    }

    dragMoved.current = false;
    const r = el.getBoundingClientRect();
    drag.current = { dx: e.clientX - r.left, dy: e.clientY - r.top };
    el.setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!drag.current) return;
    dragMoved.current = true;
    const x = e.clientX - drag.current.dx;
    const y = e.clientY - drag.current.dy;
    const el = ref.current;
    const w = el?.getBoundingClientRect().width ?? 360;
    const h = el?.getBoundingClientRect().height ?? 64;
    setPosition((prev) => magneticDragPosition(x, y, w, h));
  };

  const onPointerUp = () => {
    if (!drag.current) return;
    if (dragMoved.current && ref.current) {
      const r = ref.current.getBoundingClientRect();
      setPosition(snapToolbarPosition(r.left, r.top, r.width, r.height));
    } else if (collapsed && !dragMoved.current) {
      setCollapsed(false);
    }
    drag.current = null;
    dragMoved.current = false;
  };

  const style = {
    left: position.x,
    top: position.y,
    "--tool-from": gradient.from,
    "--tool-to": gradient.to,
  } as CSSProperties;

  const dockClass =
    dock === "left" ? styles.toolbarDockLeft : dock === "right" ? styles.toolbarDockRight : "";

  return (
    <div
      data-lam-ui
      className={`${styles.toolbar} ${dockClass} ${collapsed ? styles.toolbarCollapsed : ""}`}
      ref={ref}
      style={style}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
    >
      {collapsed ? (
        <button
          type="button"
          data-lam-toolbar-drag
          className={styles.collapsedPill}
          aria-label="Expand toolbar (drag to move)"
          style={
            {
              "--tool-from": gradient.from,
              "--tool-to": gradient.to,
            } as CSSProperties
          }
        >
          <svg viewBox="0 0 64 64" width="38" height="38" aria-hidden>
            <defs>
              <linearGradient id={starGradId} x1="0" y1="0" x2="1" y2="1">
                <stop offset="0" stopColor={gradient.from} />
                <stop offset="1" stopColor={gradient.to} />
              </linearGradient>
            </defs>
            <path
              d="M32 4 C 33.5 22, 42 30.5, 60 32 C 42 33.5, 33.5 42, 32 60 C 30.5 42, 22 33.5, 4 32 C 22 30.5, 30.5 22, 32 4 Z"
              fill={`url(#${starGradId})`}
            />
          </svg>
        </button>
      ) : confirming ? (
        <div className={styles.confirmToolbar}>
          <div className={styles.confirmRow}>
            <span className={styles.confirmText}>Done for now?</span>
            <button type="button" className={styles.confirmYes} onClick={onDone}>
              Save + exit
            </button>
            <button type="button" className={styles.confirmNo} onClick={() => setConfirming(false)}>
              Keep going
            </button>
          </div>
        </div>
      ) : (
        <>
          <button
            type="button"
            data-lam-toolbar-drag
            className={styles.dragHandle}
            aria-label="Drag toolbar"
            tabIndex={-1}
          >
            <span />
            <span />
            <span />
          </button>
          {TOOLS.map((t) => (
            <button
              key={t.id}
              type="button"
              className={`${styles.toolBtn} ${tool === t.id ? styles.toolBtnActive : ""}`}
              onClick={() => setTool(t.id)}
              aria-pressed={tool === t.id}
              title={t.label}
            >
              <span className={styles.toolIcon}>
                <t.Icon />
              </span>
              <span className={styles.toolLabel}>{t.label}</span>
            </button>
          ))}
          <span className={styles.toolDivider} />
          <button
            type="button"
            className={`${styles.toolBtn} ${styles.doneBtn}`}
            onClick={() => setConfirming(true)}
            title="Done"
          >
            <span className={styles.toolIcon}>
              <ToolbarIcon.done />
            </span>
            <span className={styles.toolLabel}>Done</span>
          </button>
          <button
            type="button"
            className={styles.collapseBtn}
            onClick={() => setCollapsed(true)}
            aria-label="Collapse toolbar"
          >
            <ToolbarIcon.caret />
          </button>
        </>
      )}
    </div>
  );
}
