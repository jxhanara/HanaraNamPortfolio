"use client";

import { usePathname } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import type { CSSProperties } from "react";
import { gradById } from "./constants";
import type { Gradient } from "./constants";
import { normalizePagePath } from "./pagePath";
import { ArchivePanel } from "./ArchivePanel";
import type { AnnotationItem as AnnItem } from "./types";
import styles from "./LeaveAMark.module.css";
import replay from "./Replay.module.css";

const PARAM = "lamReplay";

type VisitorRow = { id: string; name: string | null; color: string | null };
type AnnoRow = {
  id: string;
  visitor_id: string;
  page_path: string;
  kind: string;
  x: number;
  y: number;
  text: string;
  session_id: string | null;
  status: string | null;
};
type ThreadRow = {
  annotation_id: string;
  from_role: "visitor" | "ai";
  text: string;
  created_at: string;
};

/**
 * When the URL has `?lamReplay=<visitorId>`, overlays that visitor's comments
 * (read-only) at their exact positions on the real page, plus their archive.
 * Mounted globally so it works on every case study / page.
 */
export function ReplayOverlay() {
  const pathname = usePathname() || "/";
  const pageKey = useMemo(() => normalizePagePath(pathname), [pathname]);

  const [visitorId, setVisitorId] = useState<string | null>(null);
  const [visitor, setVisitor] = useState<VisitorRow | null>(null);
  const [items, setItems] = useState<AnnItem[]>([]);
  const [activePin, setActivePin] = useState<string | null>(null);
  const [archiveOpen, setArchiveOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [docHeight, setDocHeight] = useState(0);

  // Read the replay target from the URL (and keep it in sync with nav / back).
  useEffect(() => {
    const read = () => {
      const sp = new URLSearchParams(window.location.search);
      setVisitorId(sp.get(PARAM));
    };
    read();
    window.addEventListener("popstate", read);
    return () => window.removeEventListener("popstate", read);
  }, [pathname]);

  const active = !!visitorId;

  // Fetch this visitor's annotations + threads for the current page.
  useEffect(() => {
    if (!visitorId) {
      setVisitor(null);
      setItems([]);
      return;
    }
    let cancelled = false;
    (async () => {
      let annos: AnnoRow[] = [];
      let threads: ThreadRow[] = [];
      let vrow: VisitorRow | null = null;
      try {
        const res = await fetch(
          `/api/lam/replay?visitorId=${encodeURIComponent(visitorId)}&page=${encodeURIComponent(pageKey)}`,
          { cache: "no-store" },
        );
        if (res.ok) {
          const json = await res.json();
          vrow = (json.visitor as VisitorRow | null) ?? null;
          annos = (json.annotations as AnnoRow[]) ?? [];
          threads = (json.threads as ThreadRow[]) ?? [];
        }
      } catch {
        /* not authed / no data → render nothing */
      }
      if (cancelled) return;

      const tByA = new Map<string, ThreadRow[]>();
      for (const t of threads) {
        const arr = tByA.get(t.annotation_id) ?? [];
        arr.push(t);
        tByA.set(t.annotation_id, arr);
      }
      setVisitor(vrow);
      setItems(
        annos
          .filter((a) => {
            const hasText = (a.text ?? "").trim().length > 0;
            const hasThread = (tByA.get(a.id) ?? []).some((m) => (m.text ?? "").trim().length > 0);
            return hasText || hasThread;
          })
          .map((a) => ({
          id: a.id,
          kind: (a.kind as AnnItem["kind"]) ?? "comment",
          x: a.x,
          y: a.y,
          text: a.text ?? "",
          author: vrow?.name ?? "Visitor",
          status: a.status === "resolved" ? "resolved" : "open",
          sessionId: a.session_id ?? undefined,
          thread: (tByA.get(a.id) ?? []).map((m) => ({
            from: m.from_role,
            text: m.text,
            at: new Date(m.created_at).getTime(),
          })),
        })),
      );
    })();
    return () => {
      cancelled = true;
    };
  }, [visitorId, pageKey]);

  // Keep the pin layer aligned with scroll + document height (same as live mode).
  useEffect(() => {
    if (!active) return;
    const onScroll = () => setScrollY(window.scrollY);
    const measure = () => setDocHeight(document.documentElement.scrollHeight);
    onScroll();
    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", measure);
    const t = window.setInterval(measure, 1000);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", measure);
      window.clearInterval(t);
    };
  }, [active, items.length]);

  const gradient = useMemo(() => gradById(visitor?.color ?? undefined), [visitor?.color]);

  const exit = useCallback(() => {
    const url = new URL(window.location.href);
    url.searchParams.delete(PARAM);
    window.history.replaceState({}, "", url.pathname + url.search + url.hash);
    setVisitorId(null);
    setActivePin(null);
    setArchiveOpen(false);
  }, []);

  if (!active) return null;

  const resolvedCount = items.filter((i) => i.status === "resolved").length;

  return (
    <>
      <div
        className={replay.banner}
        style={{ "--from": gradient.from, "--to": gradient.to } as CSSProperties}
      >
        <span className={replay.bannerDot} />
        <span className={replay.bannerText}>
          Replaying <strong>{visitor?.name ?? "visitor"}</strong>&apos;s session · {items.length}{" "}
          comment{items.length === 1 ? "" : "s"} on <code>{pageKey}</code>
        </span>
        <button className={replay.bannerBtn} onClick={() => setArchiveOpen((o) => !o)}>
          Archive ({resolvedCount})
        </button>
        <button className={replay.bannerExit} onClick={exit}>
          Exit ✕
        </button>
      </div>

      <div className={styles.pageSyncedLayer}>
        <div
          className={styles.syncInner}
          style={{ height: docHeight, transform: `translateY(-${scrollY}px)` }}
        >
          <div className={styles.annotationLayer}>
            {items.map((it) => (
              <ReplayPin
                key={it.id}
                item={it}
                gradient={gradient}
                open={activePin === it.id}
                onToggle={() => setActivePin((p) => (p === it.id ? null : it.id))}
              />
            ))}
          </div>
        </div>
      </div>

      {items.length > 0 ? (
        <ArchivePanel
          open={archiveOpen}
          onClose={() => setArchiveOpen(false)}
          items={items}
          gradient={gradient}
          onScrollTo={(it) => {
            window.scrollTo({
              top: Math.max(0, it.y - window.innerHeight / 2),
              behavior: "smooth",
            });
            setActivePin(it.id);
          }}
        />
      ) : null}
    </>
  );
}

function ReplayPin({
  item,
  gradient,
  open,
  onToggle,
}: {
  item: AnnItem;
  gradient: Gradient;
  open: boolean;
  onToggle: () => void;
}) {
  const resolved = item.status === "resolved";
  return (
    <div
      className={replay.pinRoot}
      style={
        { left: item.x, top: item.y, "--from": gradient.from, "--to": gradient.to } as CSSProperties
      }
    >
      <button
        className={`${replay.pin} ${resolved ? replay.pinResolved : ""}`}
        onClick={onToggle}
        title={item.text}
        aria-label={item.text || "comment"}
      >
        {resolved ? "✓" : ""}
      </button>
      {open ? (
        <div className={replay.bubble}>
          <div className={replay.bubbleAuthor}>{item.author}</div>
          {item.text ? <p className={replay.bubbleText}>{item.text}</p> : null}
          {(item.thread ?? []).map((m, i) => (
            <div key={i} className={m.from === "ai" ? replay.msgAi : replay.msgVisitor}>
              <span className={replay.msgRole}>
                {m.from === "ai" ? "Hanara's AI" : item.author}
              </span>
              {m.text}
            </div>
          ))}
          <span
            className={`${replay.statusTag} ${resolved ? replay.statusResolved : replay.statusOpen}`}
          >
            {resolved ? "resolved" : "open"}
          </span>
        </div>
      ) : null}
    </div>
  );
}
