"use client";

import { createPortal } from "react-dom";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { CSSProperties } from "react";
import type { Gradient } from "./constants";
import { fmtDateLabel, todayId } from "./AIThreads";
import type { AnnotationItem } from "./types";
import styles from "./LeaveAMark.module.css";

export type ArchivePanelProps = {
  open: boolean;
  onClose: () => void;
  items: AnnotationItem[];
  gradient: Gradient;
  onScrollTo: (item: AnnotationItem) => void;
};

type FilterTab = "all" | "open" | "resolved";

function threadPreview(it: AnnotationItem): string {
  const visitorText =
    it.text?.trim() ||
    (it.thread ?? []).find((m) => m.from === "visitor")?.text?.trim() ||
    "";
  return visitorText;
}

function replyCount(it: AnnotationItem): number {
  return (it.thread ?? []).filter((m) => m.from === "ai").length;
}

function aiReplyTexts(it: AnnotationItem): string[] {
  return (it.thread ?? []).filter((m) => m.from === "ai").map((m) => m.text.trim()).filter(Boolean);
}

function itemRecency(it: AnnotationItem): number {
  const ts = it.thread?.length ? Math.max(...it.thread.map((m) => m.at)) : 0;
  return ts || it.y;
}

function kindLabel(kind: AnnotationItem["kind"]): string {
  if (kind === "sticky") return "sticky";
  if (kind === "comment") return "comment";
  return "text";
}

export function ArchivePanel({ open, onClose, items, gradient, onScrollTo }: ArchivePanelProps) {
  const panelRef = useRef<HTMLElement | null>(null);
  const [mounted, setMounted] = useState(false);
  const [filter, setFilter] = useState<FilterTab>("all");
  const [search, setSearch] = useState("");
  const [openGroups, setOpenGroups] = useState<Set<string>>(new Set());
  const [aiPreviewId, setAiPreviewId] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const sortedSessionIds = useMemo(() => {
    const ids = Array.from(new Set(items.map((i) => i.sessionId).filter(Boolean) as string[]));
    return ids.sort((a, b) => (a < b ? 1 : a > b ? -1 : 0));
  }, [items]);

  useEffect(() => {
    if (!open) return;
    const first = sortedSessionIds[0];
    setOpenGroups(first ? new Set([first]) : new Set());
  }, [open, sortedSessionIds]);

  useEffect(() => {
    if (!open) {
      setAiPreviewId(null);
      return;
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return items.filter((it) => {
      if (filter === "open" && it.status === "resolved") return false;
      if (filter === "resolved" && it.status !== "resolved") return false;
      if (!q) return true;
      return threadPreview(it).toLowerCase().includes(q);
    });
  }, [items, filter, search]);

  const groups = useMemo(() => {
    const map = new Map<string, AnnotationItem[]>();
    for (const it of filtered) {
      const sid = it.sessionId ?? "";
      if (!sid) continue;
      const arr = map.get(sid) ?? [];
      arr.push(it);
      map.set(sid, arr);
    }
    Array.from(map.values()).forEach((arr) => {
      arr.sort((a, b) => itemRecency(b) - itemRecency(a));
    });
    return sortedSessionIds.filter((sid) => map.has(sid)).map((sid) => ({ sid, items: map.get(sid)! }));
  }, [filtered, sortedSessionIds]);

  const counts = useMemo(() => {
    const all = items.length;
    const openC = items.filter((i) => i.status !== "resolved").length;
    const resolved = items.filter((i) => i.status === "resolved").length;
    return { all, open: openC, resolved };
  }, [items]);

  const toggleGroup = useCallback((sid: string) => {
    setOpenGroups((prev) => {
      const next = new Set(prev);
      if (next.has(sid)) next.delete(sid);
      else next.add(sid);
      return next;
    });
  }, []);

  if (!open || !mounted) return null;

  const emptyNoItems = items.length === 0;
  const emptyFiltered = !emptyNoItems && filtered.length === 0;
  const emptySearch = emptyFiltered && search.trim().length > 0;
  const emptyFilter = emptyFiltered && search.trim().length === 0;

  return createPortal(
    <>
      <aside
        ref={panelRef}
        className={styles.archivePanel}
        aria-label="Archive"
        data-lam-ui
        style={{ "--from": gradient.from, "--to": gradient.to } as CSSProperties}
      >
        <header className={styles.archiveHeader}>
          <div className={styles.archiveHeaderRow}>
            <div className={styles.archiveHeaderTitles}>
              <h2 className={styles.archiveTitle}>Archive</h2>
              <p className={styles.archiveSubtitle}>your notes from previous visits</p>
            </div>
            <button type="button" className={styles.archiveCloseBtn} onClick={onClose} aria-label="Close archive">
              ×
            </button>
          </div>
        </header>

        <div className={styles.archiveTabs} role="tablist">
          <button
            type="button"
            role="tab"
            aria-selected={filter === "all"}
            className={`${styles.archiveTab} ${filter === "all" ? styles.archiveTabActive : ""}`}
            onClick={() => setFilter("all")}
          >
            All <span className={styles.archiveTabCount}>{counts.all}</span>
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={filter === "open"}
            className={`${styles.archiveTab} ${filter === "open" ? styles.archiveTabActive : ""}`}
            onClick={() => setFilter("open")}
          >
            Open <span className={styles.archiveTabCount}>{counts.open}</span>
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={filter === "resolved"}
            className={`${styles.archiveTab} ${filter === "resolved" ? styles.archiveTabActive : ""}`}
            onClick={() => setFilter("resolved")}
          >
            Resolved <span className={styles.archiveTabCount}>{counts.resolved}</span>
          </button>
        </div>

        <div className={styles.archiveSearchRow}>
          <input
            type="search"
            className={styles.archiveSearch}
            placeholder="Search…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            aria-label="Search archive"
          />
        </div>

        <div className={styles.archiveBody}>
          {emptyNoItems ? (
            <p className={styles.archiveEmpty}>nothing here yet.</p>
          ) : emptySearch ? (
            <p className={styles.archiveEmpty}>nothing matches that search.</p>
          ) : emptyFilter ? (
            <p className={styles.archiveEmpty}>nothing in this tab.</p>
          ) : (
            groups.map(({ sid, items: groupItems }) => {
              const expanded = openGroups.has(sid);
              return (
                <section key={sid} className={styles.archiveGroup}>
                  <button
                    type="button"
                    className={styles.archiveGroupHead}
                    onClick={() => toggleGroup(sid)}
                    aria-expanded={expanded}
                  >
                    <span className={styles.archiveGroupChevron} aria-hidden>
                      {expanded ? "▼" : "▶"}
                    </span>
                    <span className={styles.archiveGroupLabel}>{fmtDateLabel(sid)}</span>
                    <span className={styles.archiveGroupMeta}>{groupItems.length}</span>
                  </button>
                  {expanded ? (
                    <ul className={styles.archiveList}>
                      {groupItems.map((it) => {
                        const prev = threadPreview(it);
                        const line1 = prev.slice(0, 80) + (prev.length > 80 ? "…" : "");
                        const resolved = it.status === "resolved";
                        const rc = replyCount(it);
                        const aiLines = aiReplyTexts(it);
                        const showAi = aiPreviewId === it.id && aiLines.length > 0;
                        return (
                          <li key={it.id} className={styles.archiveRowItem}>
                            <div
                              role="button"
                              tabIndex={0}
                              className={`${styles.archiveRow} ${resolved ? styles.archiveRowResolved : ""}`}
                              onClick={(e) => {
                                if ((e.target as HTMLElement).closest("[data-archive-reply-toggle]")) return;
                                onScrollTo(it);
                              }}
                              onKeyDown={(e) => {
                                if (e.key === "Enter" || e.key === " ") {
                                  e.preventDefault();
                                  onScrollTo(it);
                                }
                              }}
                            >
                              <span
                                className={styles.archiveRowDot}
                                style={
                                  resolved
                                    ? { background: "rgba(255,255,255,0.18)" }
                                    : { background: `linear-gradient(135deg, ${gradient.from}, ${gradient.to})` }
                                }
                              >
                                {resolved ? (
                                  <span style={{ fontSize: "7px", color: "#fff", lineHeight: 1 }}>✓</span>
                                ) : null}
                              </span>
                              <span className={styles.archiveRowText}>
                                <span className={styles.archiveRowLine1}>{line1}</span>
                                <span className={styles.archiveRowDate}>
                                  {fmtDateLabel(it.sessionId ?? sid ?? todayId())}
                                </span>
                                <span className={styles.archiveRowMeta}>
                                  {kindLabel(it.kind)}
                                  {rc > 0 ? (
                                    <>
                                      <span aria-hidden> · </span>
                                      <button
                                        type="button"
                                        data-archive-reply-toggle
                                        className={styles.archiveRowReplyBtn}
                                        aria-expanded={showAi}
                                        aria-label={rc === 1 ? "Show AI reply" : `Show ${rc} AI replies`}
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          setAiPreviewId((id) => (id === it.id ? null : it.id));
                                        }}
                                      >
                                        {rc} {rc === 1 ? "reply" : "replies"}
                                      </button>
                                    </>
                                  ) : null}
                                </span>
                              </span>
                              <span className={styles.archiveRowArrow} aria-hidden>
                                →
                              </span>
                            </div>
                            {showAi ? (
                              <div className={styles.archiveRowAiPreview} data-lam-ui>
                                {aiLines.map((text, i) => (
                                  <p key={i} className={styles.archiveRowAiLine}>
                                    {text}
                                  </p>
                                ))}
                              </div>
                            ) : null}
                          </li>
                        );
                      })}
                    </ul>
                  ) : null}
                </section>
              );
            })
          )}
        </div>
      </aside>
    </>,
    document.body,
  );
}
