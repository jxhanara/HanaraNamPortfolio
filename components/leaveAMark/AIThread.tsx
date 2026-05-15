"use client";

import { useEffect, useRef, useState } from "react";
import type { CSSProperties, Key, ReactNode } from "react";
import type { Gradient } from "./constants";
import { generateAIReply } from "./AIThreads";
import type { AnnotationItem, ThreadMessage } from "./types";
import styles from "./LeaveAMark.module.css";

export type AIThreadProps = {
  item: AnnotationItem;
  onChange: (next: AnnotationItem) => void;
  gradient: Gradient;
  compact?: boolean;
  pageContext?: string;
  /** When false (e.g. comment bubble collapsed), follow-up draft UI closes. Sticky omits → treated as true. */
  surfaceOpen?: boolean;
};

export function AIThread({ item, onChange, gradient, compact, pageContext, surfaceOpen = true }: AIThreadProps) {
  const [followUpOpen, setFollowUpOpen] = useState(false);
  const [followDraft, setFollowDraft] = useState("");
  const followTaRef = useRef<HTMLTextAreaElement>(null);
  const itemRef = useRef(item);
  itemRef.current = item;
  const onChangeRef = useRef(onChange);
  onChangeRef.current = onChange;

  const thread = item.thread ?? [];
  const canFollowUp =
    item.status !== "resolved" &&
    item.aiState === "done" &&
    thread.length > 0 &&
    thread[thread.length - 1]?.from === "ai";

  useEffect(() => {
    if (item.aiState !== "thinking") return;
    const cur = itemRef.current;
    const t = cur.thread ?? [];
    let cancelled = false;
    generateAIReply(t, pageContext).then((text) => {
      if (cancelled) return;
      const latest = itemRef.current;
      if (latest.id !== cur.id || latest.aiState !== "thinking") return;
      onChangeRef.current({
        ...latest,
        thread: [...(latest.thread ?? []), { from: "ai", text, at: Date.now() }],
        aiState: "done",
      });
    });
    return () => {
      cancelled = true;
    };
  }, [item.aiState, item.id, pageContext]);

  useEffect(() => {
    if (surfaceOpen) return;
    setFollowUpOpen(false);
    setFollowDraft("");
  }, [surfaceOpen]);

  useEffect(() => {
    if (!followUpOpen) return;
    const id = requestAnimationFrame(() => {
      followTaRef.current?.focus({ preventScroll: true });
    });
    return () => cancelAnimationFrame(id);
  }, [followUpOpen]);

  const submitFollowUp = () => {
    const t = followDraft.trim();
    if (!t) return;
    const cur = itemRef.current;
    onChange({
      ...cur,
      thread: [...(cur.thread ?? []), { from: "visitor", text: t, at: Date.now() }],
      aiState: "thinking",
    });
    setFollowDraft("");
    setFollowUpOpen(false);
  };

  const wrap = compact ? styles.aiThreadWrapCompact : styles.aiThreadWrap;

  const gradientCss = {
    "--from": gradient.from,
    "--to": gradient.to,
    borderLeftColor: gradient.from,
  } as CSSProperties;

  const sparkleCss = {
    background: `linear-gradient(135deg, ${gradient.from}, ${gradient.to})`,
  } as CSSProperties;

  const thinkingHeader = (
    <>
      <div className={styles.aiThreadReplyHeader}>
        <span className={styles.aiThreadSparkle} style={sparkleCss} aria-hidden>
          ✦
        </span>
        <span className={styles.aiThreadAuthorLabel}>Hanara&apos;s AI</span>
      </div>
      <span className={styles.aiThreadDots} aria-label="thinking">
        <span />
        <span />
        <span />
      </span>
    </>
  );

  const renderAiReply = (text: string, key: Key) => (
    <div key={key} className={styles.aiThreadReplyBlock} style={gradientCss}>
      <div className={styles.aiThreadReplyHeader}>
        <span className={styles.aiThreadSparkle} style={sparkleCss} aria-hidden>
          ✦
        </span>
        <span className={styles.aiThreadAuthorLabel}>Hanara&apos;s AI</span>
      </div>
      <p className={styles.aiThreadReplyText}>{text}</p>
    </div>
  );

  const buildConversationNodes = (t: ThreadMessage[], trailingThinking: boolean) => {
    const out: ReactNode[] = [];
    if (t.length >= 2 && t[1].from === "ai") {
      out.push(renderAiReply(t[1].text, `ai-${t[1].at}`));
    }
    for (let i = 2; i < t.length; i += 2) {
      const vm = t[i];
      if (vm?.from === "visitor") {
        out.push(
          <p key={`v-${vm.at}`} className={styles.aiThreadFollowQuestion}>
            {vm.text}
          </p>,
        );
      }
      const am = t[i + 1];
      if (am?.from === "ai") {
        out.push(renderAiReply(am.text, `ai-${am.at}`));
      } else if (trailingThinking && vm?.from === "visitor" && i + 1 >= t.length) {
        out.push(
          <div key={`thinking-after-${vm.at}`} className={styles.aiThreadReplyBlock} style={gradientCss}>
            {thinkingHeader}
          </div>,
        );
      }
    }
    if (trailingThinking && t.length === 1 && t[0]?.from === "visitor") {
      out.push(
        <div key="thinking-initial" className={styles.aiThreadReplyBlock} style={gradientCss}>
          {thinkingHeader}
        </div>,
      );
    }
    return out;
  };

  if (item.resolveFlying) {
    return null;
  }

  if (item.aiState === "thinking") {
    return (
      <div className={wrap} data-lam-ui>
        <div className={styles.aiThreadStack}>{buildConversationNodes(thread, true)}</div>
      </div>
    );
  }

  if (item.status === "resolved" && item.collapsed) {
    return (
      <div className={wrap} data-lam-ui>
        <button
          type="button"
          className={styles.aiThreadResolvedDot}
          aria-label="Show resolved thread"
          title="Show resolved thread"
          onClick={(e) => {
            e.stopPropagation();
            onChange({ ...item, collapsed: false });
          }}
        >
          ✓
        </button>
      </div>
    );
  }

  if (item.status === "resolved" && !item.collapsed) {
    return (
      <div className={`${wrap} ${styles.aiThreadResolvedWrap}`} data-lam-ui>
        <div className={styles.aiThreadResolvedBody}>
          {(item.thread ?? []).map((m) => (
            <p key={m.at + m.from} className={m.from === "ai" ? styles.aiThreadAiLineMuted : styles.aiThreadVisLineMuted}>
              {m.text}
            </p>
          ))}
        </div>
        <button
          type="button"
          className={styles.aiThreadCollapseLink}
          onClick={(e) => {
            e.stopPropagation();
            onChange({ ...item, collapsed: true });
          }}
        >
          collapse
        </button>
      </div>
    );
  }

  if (item.aiState === "error") {
    return (
      <div className={wrap} data-lam-ui>
        {thread.length > 0 ? <div className={styles.aiThreadStack}>{buildConversationNodes(thread, false)}</div> : null}
        <p className={styles.aiThreadError}>couldn&apos;t reach the model. try again.</p>
        <button
          type="button"
          className={styles.aiThreadBtnSecondary}
          onClick={(e) => {
            e.stopPropagation();
            onChange({ ...item, aiState: "thinking" });
          }}
        >
          retry
        </button>
      </div>
    );
  }

  return (
    <div className={wrap} data-lam-ui>
      {thread.length >= 2 ? <div className={styles.aiThreadStack}>{buildConversationNodes(thread, false)}</div> : null}

      {item.aiState === "done" && item.status !== "resolved" ? (
        <div className={styles.aiThreadActions}>
          <button
            type="button"
            className={styles.aiThreadBtnResolve}
            style={{ background: `linear-gradient(135deg, ${gradient.from}, ${gradient.to})` } as CSSProperties}
            onClick={(e) => {
              e.stopPropagation();
              onChange({ ...item, status: "resolved", collapsed: true, resolveFlying: true });
            }}
          >
            ✓ Mark as resolved
          </button>
          {canFollowUp && !followUpOpen ? (
            <button
              type="button"
              className={styles.aiThreadBtnFollow}
              onClick={(e) => {
                e.stopPropagation();
                setFollowUpOpen(true);
              }}
            >
              Ask a follow-up
            </button>
          ) : null}
        </div>
      ) : null}

      {followUpOpen ? (
        <div className={styles.aiThreadFollowBox} onPointerDown={(e) => e.stopPropagation()}>
          <textarea
            ref={followTaRef}
            className={styles.aiThreadFollowTa}
            value={followDraft}
            onChange={(e) => setFollowDraft(e.target.value)}
            onPointerDown={(e) => e.stopPropagation()}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                submitFollowUp();
              }
            }}
            placeholder="one follow-up…"
            rows={3}
          />
        </div>
      ) : null}
    </div>
  );
}
