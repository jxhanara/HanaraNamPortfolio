"use client";

import { useEffect, useRef, useState } from "react";
import type { CSSProperties, TransitionEvent } from "react";
import { AIThread } from "./AIThread";
import { todayId } from "./AIThreads";
import type { Gradient } from "./constants";
import type { AnnotationItem as Ann } from "./types";
import styles from "./LeaveAMark.module.css";

type AnnotationItemProps = {
  item: Ann;
  onChange: (next: Ann) => void;
  onDelete: (id: string) => void;
  gradient: Gradient;
  pageContext?: string;
};

export function AnnotationItem({ item, onChange, onDelete, gradient, pageContext }: AnnotationItemProps) {
  const [editing, setEditing] = useState(item.text === "" && !!item._fresh);
  const [commentPeekOpen, setCommentPeekOpen] = useState(false);
  const textRef = useRef<HTMLTextAreaElement>(null);
  const drag = useRef<{ dx: number; dy: number } | null>(null);
  const ref = useRef<HTMLDivElement>(null);

  const [flyAnimArmed, setFlyAnimArmed] = useState(false);

  useEffect(() => {
    if (!item.resolveFlying) {
      setFlyAnimArmed(false);
      return;
    }
    const id = requestAnimationFrame(() => {
      requestAnimationFrame(() => setFlyAnimArmed(true));
    });
    return () => cancelAnimationFrame(id);
  }, [item.resolveFlying]);

  const handleResolveFlyEnd = (e: TransitionEvent<HTMLDivElement>) => {
    if (e.target !== e.currentTarget) return;
    if (!item.resolveFlying) return;
    if (e.propertyName !== "transform") return;
    onChange({
      ...item,
      resolveFlying: false,
      offCanvas: true,
      status: "resolved",
      collapsed: true,
    });
  };

  const commentDocked = item.kind === "comment" && item.text.trim().length > 0 && !item._fresh && !editing;

  useEffect(() => {
    if (editing) {
      const id = requestAnimationFrame(() => {
        textRef.current?.focus({ preventScroll: true });
      });
      return () => cancelAnimationFrame(id);
    }
  }, [editing]);

  const startDrag = (e: React.PointerEvent) => {
    drag.current = {
      dx: e.clientX + window.scrollX - item.x,
      dy: e.clientY + window.scrollY - item.y,
    };
    ref.current?.setPointerCapture(e.pointerId);
  };

  const onPointerDown = (e: React.PointerEvent) => {
    const t = e.target as HTMLElement;
    if (t.tagName === "TEXTAREA") return;
    if (t.closest("button") && !t.closest("[data-lam-anno-drag]")) return;

    if (t.closest("[data-lam-anno-drag]")) {
      startDrag(e);
      return;
    }

    if (item.kind === "sticky" && t.closest(`.${styles.stickyText}`)) {
      setEditing(true);
      return;
    }
    if (
      item.kind === "text" &&
      (t.closest(`.${styles.textLabelText}`) || t.closest(`.${styles.textLabelInput}`))
    ) {
      setEditing(true);
      return;
    }
    if (item.kind === "comment" && t.closest(`.${styles.commentBubble}`)) {
      setCommentPeekOpen(true);
      setEditing(true);
    }
  };

  useEffect(() => {
    if (item.kind !== "comment" || !commentDocked || !commentPeekOpen) return;
    const onDocPointerDown = (e: PointerEvent) => {
      const t = e.target as Node;
      if (ref.current?.contains(t)) return;
      setCommentPeekOpen(false);
    };
    document.addEventListener("pointerdown", onDocPointerDown, true);
    return () => document.removeEventListener("pointerdown", onDocPointerDown, true);
  }, [item.kind, commentDocked, commentPeekOpen]);

  const commentLead = commentDocked ? (
    <>
      <button
        type="button"
        className={`${styles.commentPin} ${item.aiState === "thinking" && !commentPeekOpen ? styles.commentPinThinking : ""}`}
        aria-label="Show or hide comment"
        title="Show or hide comment"
        onClick={() => setCommentPeekOpen((p) => !p)}
      />
      <span className={styles.commentDragStrip} data-lam-anno-drag aria-hidden title="Drag" />
    </>
  ) : (
    <button
      type="button"
      className={styles.commentPin}
      data-lam-anno-drag
      aria-label="Drag comment"
      title="Drag"
    />
  );

  const onPointerMove = (e: React.PointerEvent) => {
    if (!drag.current) return;
    onChange({
      ...item,
      x: e.clientX + window.scrollX - drag.current.dx,
      y: e.clientY + window.scrollY - drag.current.dy,
    });
  };

  const onPointerUp = () => {
    drag.current = null;
  };

  const cardInnerGradientStyle = {
    left: 0,
    top: 0,
    "--from": gradient.from,
    "--to": gradient.to,
  } as CSSProperties;

  const commonStyle = { left: item.x, top: item.y } as CSSProperties;

  const commonHandlers = {
    onPointerDown,
    onPointerMove,
    onPointerUp,
    onPointerCancel: onPointerUp,
  };

  const flyRootClass = `${styles.annoFlyRoot} ${flyAnimArmed && item.resolveFlying ? styles.annoFlyRootAnimating : ""}`;

  const finishStickyOrText = (text: string) => {
    setEditing(false);
    onChange({ ...item, text: text.trim(), _fresh: false });
  };

  const finishWithThread = (text: string) => {
    setEditing(false);
    const trimmed = text.trim();
    if (!trimmed) {
      if (item._fresh) {
        onDelete(item.id);
        return;
      }
      onChange({ ...item, text: trimmed, _fresh: false });
      if (item.kind === "comment") setCommentPeekOpen(false);
      return;
    }
    onChange({
      ...item,
      text: trimmed,
      _fresh: false,
      sessionId: item.sessionId || todayId(),
      thread: item.thread?.length
        ? item.thread
        : [{ from: "visitor", text: trimmed, at: Date.now() }],
      aiState: item.aiState === "done" ? "done" : "thinking",
      status: item.status || "open",
    });
    if (item.kind === "comment") setCommentPeekOpen(true);
  };

  if (item.kind === "sticky") {
    return (
      <div
        className={flyRootClass}
        style={{ left: item.x, top: item.y }}
        onTransitionEnd={handleResolveFlyEnd}
      >
        <div
          ref={ref}
          data-lam-item
          data-lam-item-id={item.id}
          data-lam-jump-highlight={item._highlightFlash ? "true" : undefined}
          className={styles.sticky}
          style={cardInnerGradientStyle}
          {...commonHandlers}
        >
          <button
            type="button"
            className={styles.annDelete}
            onClick={() => onDelete(item.id)}
            onPointerDown={(e) => e.stopPropagation()}
            aria-label="Delete"
          >
            ×
          </button>
          {editing ? (
            <textarea
              ref={textRef}
              className={styles.stickyText}
              value={item.text}
              onChange={(e) => onChange({ ...item, text: e.target.value })}
              onBlur={(e) => finishWithThread((e.target as HTMLTextAreaElement).value)}
              onPointerDown={(e) => e.stopPropagation()}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  finishWithThread((e.currentTarget as HTMLTextAreaElement).value);
                }
              }}
              placeholder="leave a thought…"
            />
          ) : (
            <div className={styles.stickyText} onClick={() => setEditing(true)}>
              {item.text || <span style={{ opacity: 0.5 }}>leave a thought…</span>}
            </div>
          )}
          {item.thread && item.thread.length > 0 ? (
            <AIThread item={item} onChange={onChange} gradient={gradient} compact pageContext={pageContext} />
          ) : null}
          <div className={styles.stickyTape} data-lam-anno-drag aria-hidden title="Drag" />
        </div>
      </div>
    );
  }

  if (item.kind === "text") {
    return (
      <div ref={ref} data-lam-item className={styles.textLabel} style={commonStyle} {...commonHandlers}>
        <span className={styles.annoDragGrip} data-lam-anno-drag aria-hidden title="Drag" />
        <button
          type="button"
          className={`${styles.annDelete} ${styles.annDeleteSm}`}
          onClick={() => onDelete(item.id)}
          onPointerDown={(e) => e.stopPropagation()}
          aria-label="Delete"
        >
          ×
        </button>
        {editing ? (
          <textarea
            ref={textRef}
            className={styles.textLabelInput}
            value={item.text}
            onChange={(e) => onChange({ ...item, text: e.target.value })}
            onBlur={(e) => finishStickyOrText((e.target as HTMLTextAreaElement).value)}
            onPointerDown={(e) => e.stopPropagation()}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                finishStickyOrText((e.currentTarget as HTMLTextAreaElement).value);
              }
            }}
            placeholder="type…"
          />
        ) : (
          <div className={styles.textLabelText} onClick={() => setEditing(true)}>
            {item.text || <span style={{ opacity: 0.5 }}>type…</span>}
          </div>
        )}
      </div>
    );
  }

  if (item.kind === "comment") {
    return (
      <div
        className={flyRootClass}
        style={{ left: item.x, top: item.y }}
        onTransitionEnd={handleResolveFlyEnd}
      >
        <div
          ref={ref}
          data-lam-item
          data-lam-item-id={item.id}
          data-lam-jump-highlight={item._highlightFlash ? "true" : undefined}
          className={`${styles.comment} ${commentDocked ? styles.commentDocked : ""} ${commentPeekOpen ? styles.commentPeekOpen : ""}`}
          style={cardInnerGradientStyle}
          {...commonHandlers}
        >
          <div className={styles.commentLead}>{commentLead}</div>
          <div className={styles.commentBubble}>
            <button
              type="button"
              className={`${styles.annDelete} ${styles.annDeleteSm}`}
              onClick={(e) => {
                e.stopPropagation();
                if (item._fresh && !item.text.trim()) {
                  onDelete(item.id);
                  return;
                }
                setCommentPeekOpen(false);
              }}
              onPointerDown={(e) => e.stopPropagation()}
              aria-label={item._fresh && !item.text.trim() ? "Cancel" : "Minimize"}
            >
              ×
            </button>
            <div className={styles.commentAuthor}>
              {item.author} <span>·</span> just now
            </div>
            {editing ? (
              <textarea
                ref={textRef}
                className={styles.commentInput}
                value={item.text}
                onChange={(e) => onChange({ ...item, text: e.target.value })}
                onBlur={(e) => finishWithThread((e.target as HTMLTextAreaElement).value)}
                onPointerDown={(e) => e.stopPropagation()}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    finishWithThread((e.currentTarget as HTMLTextAreaElement).value);
                  }
                }}
                placeholder="add a comment…"
              />
            ) : (
              <div className={styles.commentText} onClick={() => setEditing(true)}>
                {item.text || <span style={{ opacity: 0.5 }}>add a comment…</span>}
              </div>
            )}
            {item.thread && item.thread.length > 0 ? (
              <AIThread
                item={item}
                onChange={onChange}
                gradient={gradient}
                pageContext={pageContext}
                surfaceOpen={!commentDocked || commentPeekOpen}
              />
            ) : null}
          </div>
        </div>
      </div>
    );
  }

  return null;
}
