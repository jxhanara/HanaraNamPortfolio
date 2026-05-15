"use client";

import { usePathname } from "next/navigation";
import type { CSSProperties } from "react";
import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { AnnotationItem } from "./AnnotationItem";
import { ArchiveDots } from "./ArchiveDots";
import { ArchivePanel } from "./ArchivePanel";
import { Character } from "./Character";
import { JumpSpotlight } from "./JumpSpotlight";
import { CharacterLauncher } from "./CharacterLauncher";
import { EdgeGlow, type EdgeGlowMode } from "./EdgeGlow";
import { gradById, gradCSS, TOOLBAR_POS_KEY } from "./constants";
import styles from "./LeaveAMark.module.css";
import type { GradientId } from "./constants";
import { syncPageAnnotations, syncVisitor } from "@/lib/syncToSupabase";
import { normalizePagePath } from "./pagePath";
import { PenCanvas } from "./PenCanvas";
import {
  loadActiveVisitorCard,
  loadAnnotationsForPage,
  saveNewVisitorSession,
  savePageAnnotations,
  saveVisitorCardMeta,
} from "./storage";
import { todayId } from "./AIThreads";
import { Toast } from "./Toast";
import { ExitContactCapture } from "./ExitContactCapture";
import { Toolbar } from "./Toolbar";
import { VisitorCard } from "./VisitorCard";
import type { AnnotationItem as AnnItem } from "./types";
import type { Stroke } from "./types";
import type { ToolbarPos } from "./types";
import type { VisitorCard as VisitorCardT } from "./types";
import { useLeaveAMarkNavOptional } from "./LeaveAMarkNavContext";
import { useLeaveAMarkSession } from "./LeaveAMarkSessionContext";

const ARCHIVE_PANEL_WIDTH_PX = 360;
const TOOLBAR_HORIZONTAL_HEIGHT_PX = 54;
const ARCHIVE_FLOAT_BTN_HEIGHT_PX = 44;

function readToolbarPosFromStorage(): ToolbarPos {
  try {
    const tp = JSON.parse(localStorage.getItem(TOOLBAR_POS_KEY) || "null");
    if (tp && typeof tp.x === "number" && typeof tp.y === "number") {
      return {
        x: tp.x,
        y: tp.y,
        dock: tp.dock === "left" || tp.dock === "right" ? tp.dock : "none",
      };
    }
  } catch {
    /* ignore */
  }
  const w = 540;
  const h = 64;
  return {
    x: Math.max(12, (window.innerWidth - w) / 2),
    y: window.innerHeight - h - 36,
    dock: "none",
  };
}

function isPlacementUiTarget(target: EventTarget | null): boolean {
  if (!(target instanceof Element)) return false;
  if (target.closest("textarea, input")) return true;
  return Boolean(
    target.closest("[data-lam-ui]") ||
      target.closest("[data-lam-item]") ||
      target.closest("button"),
  );
}

function itemsForStorage(items: AnnItem[]): AnnItem[] {
  return items.map(({ _fresh, resolveFlying, _highlightFlash, ...r }) => r);
}

function strokesForStorage(strokes: Stroke[]): Omit<Stroke, "_tmp">[] {
  return strokes.map((s) => {
    const { _tmp, ...r } = s;
    return r;
  });
}

export function LeaveAMark() {
  const {
    phase,
    setPhase,
    characterPos,
    setCharacterPos,
    characterPose,
    setCharacterPose,
    tool,
    setTool,
    showVisitorEditor,
    setShowVisitorEditor,
  } = useLeaveAMarkSession();

  const [desktop, setDesktop] = useState(false);
  const [hydrated, setHydrated] = useState(false);
  const [card, setCard] = useState<VisitorCardT | null>(null);
  const cardRef = useRef<VisitorCardT | null>(null);
  cardRef.current = card;
  const [items, setItems] = useState<AnnItem[]>([]);
  const [strokes, setStrokes] = useState<Stroke[]>([]);
  const [toolbarPos, setToolbarPos] = useState<ToolbarPos>(() =>
    typeof window === "undefined"
      ? { x: 12, y: 400, dock: "none" }
      : readToolbarPosFromStorage(),
  );
  const [toast, setToast] = useState<{ text: string } | null>(null);
  const [archiveOpen, setArchiveOpen] = useState(false);
  const [showExitCapture, setShowExitCapture] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [docHeight, setDocHeight] = useState(0);

  const pathname = usePathname() || "/";
  const pageKey = useMemo(() => normalizePagePath(pathname), [pathname]);
  const pageKeyRef = useRef(pageKey);
  pageKeyRef.current = pageKey;
  const itemsRef = useRef(items);
  const strokesRef = useRef(strokes);
  const prevPageKeyRef = useRef<string | null>(null);
  const prevCardIdRef = useRef<string | null>(null);
  const isSwitchingPage = useRef(false);
  const prevSlotRef = useRef<{ visitorName: string; gradientCSS: string } | null>(null);

  const lamNav = useLeaveAMarkNavOptional();
  const gradient = useMemo(() => gradById(card?.color), [card?.color]);
  const gradientCSS = useMemo(() => gradCSS(gradient), [gradient]);

  const visibleItems = useMemo(() => {
    const tid = todayId();
    return items.filter((it) => {
      if (it._highlightFlash) return true;
      if (it.offCanvas) return false;
      if (it.sessionId && it.sessionId !== tid) return false;
      if (
        (it.kind === "sticky" || it.kind === "comment") &&
        it.status === "resolved" &&
        !it.resolveFlying
      ) {
        return false;
      }
      return true;
    });
  }, [items]);

  const archivedItems = useMemo(() => {
    const tid = todayId();
    return items.filter((it) => it.sessionId && it.sessionId !== tid);
  }, [items]);

  const jumpHighlightItem = useMemo(() => items.find((it) => it._highlightFlash) ?? null, [items]);

  const archiveListItems = useMemo(() => {
    const tid = todayId();
    return items.filter((it) => {
      if (it.kind === "text") return false;
      if (it.sessionId && it.sessionId !== tid) return true;
      if ((it.kind === "sticky" || it.kind === "comment") && it.offCanvas) return true;
      if (
        (it.kind === "sticky" || it.kind === "comment") &&
        it.status === "resolved" &&
        !it.resolveFlying
      ) {
        return true;
      }
      return false;
    });
  }, [items]);

  const archiveBtnOffset = useMemo(() => {
    const dock = toolbarPos.dock ?? "none";
    if (dock === "left" || dock === "right") {
      return { bottom: 28 as const };
    }
    return {
      top: toolbarPos.y + (TOOLBAR_HORIZONTAL_HEIGHT_PX - ARCHIVE_FLOAT_BTN_HEIGHT_PX) / 2,
    };
  }, [toolbarPos]);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const fn = () => setDesktop(mq.matches);
    fn();
    mq.addEventListener("change", fn);
    return () => mq.removeEventListener("change", fn);
  }, []);

  useEffect(() => {
    itemsRef.current = items;
    strokesRef.current = strokes;
  }, [items, strokes]);

  useEffect(() => {
    setHydrated(true);
    const existingCard = loadActiveVisitorCard();
    if (existingCard) {
      syncVisitor(existingCard);
    }
  }, []);

  useEffect(() => {
    if (!card?.id || !pageKey || phase !== "editing") return;
    const id = window.setTimeout(() => {
      syncPageAnnotations(card.id, pageKey, itemsRef.current);
    }, 2000);
    return () => window.clearTimeout(id);
  }, [items, card?.id, pageKey, phase]);

  useLayoutEffect(() => {
    if (!hydrated) return;

    isSwitchingPage.current = true;

    let effectiveCard = cardRef.current;
    if (!effectiveCard?.id) {
      const restored = loadActiveVisitorCard();
      if (restored) {
        effectiveCard = restored;
        setCard(restored);
      }
    }

    const cid = effectiveCard?.id ?? null;

    if (!cid) {
      if (prevCardIdRef.current && prevPageKeyRef.current) {
        savePageAnnotations(prevCardIdRef.current, prevPageKeyRef.current, {
          items: itemsForStorage(itemsRef.current),
          strokes: strokesForStorage(strokesRef.current),
        });
      }
      prevCardIdRef.current = null;
      prevPageKeyRef.current = null;
      setItems([]);
      setStrokes([]);
      isSwitchingPage.current = false;
      return;
    }

    const prevCid = prevCardIdRef.current;
    const prevPk = prevPageKeyRef.current;

    const shellForVisitor = (vid: string): VisitorCardT | null =>
      effectiveCard?.id === vid ? effectiveCard : null;

    if (prevCid && prevPk) {
      if (prevCid === cid && prevPk !== pageKey) {
        savePageAnnotations(
          prevCid,
          prevPk,
          {
            items: itemsForStorage(itemsRef.current),
            strokes: strokesForStorage(strokesRef.current),
          },
          shellForVisitor(prevCid),
        );
      } else if (prevCid !== cid) {
        savePageAnnotations(
          prevCid,
          prevPk,
          {
            items: itemsForStorage(itemsRef.current),
            strokes: strokesForStorage(strokesRef.current),
          },
          shellForVisitor(prevCid),
        );
      }
    }

    prevCardIdRef.current = cid;
    prevPageKeyRef.current = pageKey;

    const bucket = loadAnnotationsForPage(cid, pageKey);
    setItems(bucket.items);
    setStrokes(bucket.strokes);
    isSwitchingPage.current = false;
  }, [hydrated, card?.id, pageKey]);

  const flushAnnotationsToDisk = useCallback(() => {
    const cid = cardRef.current?.id;
    if (!cid) return;
    savePageAnnotations(
      cid,
      pageKeyRef.current,
      {
        items: itemsForStorage(itemsRef.current),
        strokes: strokesForStorage(strokesRef.current),
      },
      cardRef.current,
    );
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(TOOLBAR_POS_KEY, JSON.stringify(toolbarPos));
    } catch {
      /* ignore */
    }
  }, [toolbarPos]);

  useLayoutEffect(() => {
    if (!archiveOpen) {
      document.documentElement.style.paddingRight = "";
      return;
    }
    document.documentElement.style.paddingRight = `${ARCHIVE_PANEL_WIDTH_PX}px`;
    return () => {
      document.documentElement.style.paddingRight = "";
    };
  }, [archiveOpen]);

  useEffect(() => {
    if (phase !== "editing") {
      setArchiveOpen(false);
      setShowExitCapture(false);
    }
  }, [phase]);

  useEffect(() => {
    if (archiveListItems.length === 0) setArchiveOpen(false);
  }, [archiveListItems.length]);

  useEffect(() => {
    if (phase !== "editing") return;
    if (tool === "pen" || tool === "highlight" || tool === "eraser") {
      setTool("pointer");
    }
  }, [phase, tool, setTool]);

  useEffect(() => {
    if (!lamNav) return;
    lamNav.registerPillHandler(() => setShowVisitorEditor(true));
    return () => lamNav.registerPillHandler(null);
  }, [lamNav]);

  useEffect(() => {
    if (!lamNav) return;
    if (phase === "editing" && card && desktop && hydrated) {
      const next = { visitorName: card.name, gradientCSS };
      const prev = prevSlotRef.current;
      if (prev && prev.visitorName === next.visitorName && prev.gradientCSS === next.gradientCSS) {
        return;
      }
      prevSlotRef.current = next;
      lamNav.setSlot(next);
    } else {
      if (prevSlotRef.current !== null) {
        prevSlotRef.current = null;
        lamNav.setSlot(null);
      }
    }
  }, [lamNav, phase, card, desktop, hydrated, gradientCSS]);

  useEffect(() => {
    if (!card?.id) return;
    if (isSwitchingPage.current) return;
    savePageAnnotations(
      card.id,
      pageKey,
      {
        items: itemsForStorage(items),
        strokes: strokesForStorage(strokes),
      },
      card,
    );
  }, [items, strokes, card, pageKey]);

  useEffect(() => {
    const onPageHide = () => flushAnnotationsToDisk();
    window.addEventListener("pagehide", onPageHide);
    return () => window.removeEventListener("pagehide", onPageHide);
  }, [flushAnnotationsToDisk]);

  const prevPhaseRef = useRef(phase);
  useEffect(() => {
    const prev = prevPhaseRef.current;
    prevPhaseRef.current = phase;
    if (prev === "editing" && phase !== "editing") {
      flushAnnotationsToDisk();
    }
  }, [phase, flushAnnotationsToDisk]);

  useEffect(() => {
    if (phase !== "editing") return;
    const measure = () => {
      setScrollY(window.scrollY);
      setDocHeight(document.documentElement.scrollHeight);
    };
    measure();
    window.addEventListener("scroll", measure, { passive: true });
    window.addEventListener("resize", measure);
    return () => {
      window.removeEventListener("scroll", measure);
      window.removeEventListener("resize", measure);
    };
  }, [phase]);

  const launch = useCallback(() => {
    if (phase !== "idle") return;
    setPhase("drawingGlow");
    setCharacterPose("active");
    window.setTimeout(() => {
      setPhase("centering");
      setCharacterPos("center");
    }, 800);
    window.setTimeout(() => {
      setCharacterPose("tap");
    }, 1300);
    window.setTimeout(() => {
      if (cardRef.current) {
        setPhase("editing");
        setCharacterPos("corner");
        setCharacterPose("active");
      } else {
        setPhase("cardIn");
      }
    }, 1700);
  }, [phase]);

  const finishExit = useCallback(() => {
    flushAnnotationsToDisk();
    if (card?.id && pageKey) {
      syncPageAnnotations(card.id, pageKey, itemsRef.current);
    }
    setShowExitCapture(true);
  }, [card?.id, pageKey, flushAnnotationsToDisk]);

  const doExit = useCallback(() => {
    setShowExitCapture(false);
    setPhase("exiting");
    setCharacterPose("wave");
    window.setTimeout(() => {
      setPhase("idle");
      setCharacterPose("idle");
      setTool("pointer");
      setToast({ text: `See you next time, ${card?.name || "friend"} ✦` });
      window.setTimeout(() => setToast(null), 3000);
    }, 1500);
  }, [card?.name, setCharacterPose, setPhase, setTool, setToast]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      if (showVisitorEditor) {
        setShowVisitorEditor(false);
        return;
      }
      if (archiveOpen) {
        setArchiveOpen(false);
        return;
      }
      if (phase === "editing" && showExitCapture) {
        doExit();
        return;
      }
      if (phase === "editing") finishExit();
      else if (phase === "cardIn" || phase === "card") {
        setPhase("idle");
        setCharacterPos("corner");
        setCharacterPose("idle");
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [phase, finishExit, doExit, showVisitorEditor, archiveOpen, showExitCapture]);

  useEffect(() => {
    if (phase !== "editing") return;
    if (!["sticky", "text", "comment"].includes(tool)) return;
    const onDown = (e: PointerEvent) => {
      if (isPlacementUiTarget(e.target)) return;
      const x = e.clientX + window.scrollX;
      const y = e.clientY + window.scrollY;
      const id = "a" + Math.random().toString(36).slice(2, 9);
      const kind = tool as "sticky" | "text" | "comment";
      const newItem: AnnItem = {
        id,
        kind,
        x,
        y,
        text: "",
        _fresh: true,
        author: card?.name || "you",
        sessionId: todayId(),
      };
      setItems((it) => {
        const pruned = it.filter((x) => !(x._fresh && !x.text.trim()));
        return [...pruned, newItem];
      });
    };
    window.addEventListener("pointerdown", onDown, true);
    return () => window.removeEventListener("pointerdown", onDown, true);
  }, [tool, phase, card?.name]);

  const confirmCard = (data: {
    name: string;
    color: GradientId;
    no: string;
    createdAt: string;
  }) => {
    const newCard: VisitorCardT = {
      id: "v" + Math.random().toString(36).slice(2, 9),
      ...data,
    };
    saveNewVisitorSession(newCard);
    setCard(newCard);
    setItems([]);
    setStrokes([]);
    setPhase("editing");
    setCharacterPos("corner");
    setCharacterPose("active");
    syncVisitor(newCard);
  };

  const cancelCard = () => {
    setPhase("idle");
    setCharacterPos("corner");
    setCharacterPose("idle");
  };

  const edgeMode: EdgeGlowMode =
    phase === "idle"
      ? "off"
      : phase === "drawingGlow" ||
          phase === "centering" ||
          phase === "cardIn" ||
          phase === "card"
        ? "drawing"
        : phase === "editing"
          ? "breathing"
          : "fading";

  const showDim = phase === "centering" || phase === "cardIn" || phase === "card";

  if (!desktop || !hydrated) return null;

  return (
    <div className={styles.leaveAMark}>
      {phase === "editing" ? (
        <>
          <div className={styles.pageSyncedLayer} aria-hidden={false}>
            <div
              className={styles.syncInner}
              style={{
                height: docHeight,
                transform: `translateY(-${scrollY}px)`,
              }}
            >
              <PenCanvas tool={tool} gradient={gradient} strokes={strokes} setStrokes={setStrokes} />
              <div className={styles.annotationLayer}>
                {visibleItems.map((it) => (
                  <AnnotationItem
                    key={it.id}
                    item={it}
                    gradient={gradient}
                    pageContext={`Portfolio page: ${pageKey}`}
                    onChange={(next) =>
                      setItems((arr) => arr.map((x) => (x.id === next.id ? { ...next, _fresh: false } : x)))
                    }
                    onDelete={(id) => setItems((arr) => arr.filter((x) => x.id !== id))}
                  />
                ))}
              </div>
            </div>
          </div>
          {archivedItems.length > 0 ? (
            <ArchiveDots
              items={items}
              gradient={gradient}
              scrollY={scrollY}
              onDotClick={(it) => {
                setArchiveOpen(true);
                window.scrollTo({ top: it.y - 200, behavior: "smooth" });
              }}
            />
          ) : null}
          {jumpHighlightItem ? (
            <JumpSpotlight itemId={jumpHighlightItem.id} gradient={gradient} />
          ) : null}
        </>
      ) : null}

      <EdgeGlow gradient={gradient} mode={edgeMode} />
        {showDim ? <div className={styles.dimOverlay} /> : null}

        <div
          className={`${styles.charStage} ${
            characterPos === "corner" ? styles.charStagePosCorner : styles.charStagePosCenter
          }`}
          aria-hidden={phase === "idle"}
        >
          {(phase === "drawingGlow" ||
            phase === "centering" ||
            phase === "cardIn" ||
            phase === "card" ||
            phase === "exiting") && <Character pose={characterPose} gradient={gradient} />}
        </div>

        {phase === "idle" && (
          <div className={styles.launcherStage}>
            <CharacterLauncher
              onLaunch={launch}
              hasCard={!!card}
              visitorName={card?.name}
              gradient={gradient}
            />
          </div>
        )}

        {showVisitorEditor && card ? (
          <VisitorCard
            key={`${card.id}-edit`}
            mode="edit"
            initial={{
              name: card.name,
              color: card.color,
              no: card.no,
              createdAt: card.createdAt,
            }}
            onConfirm={(data) => {
              const next = { ...card, ...data };
              setCard(next);
              saveVisitorCardMeta(next);
              setShowVisitorEditor(false);
            }}
            onCancel={() => setShowVisitorEditor(false)}
          />
        ) : null}

        {(phase === "cardIn" || phase === "card") && (
          <VisitorCard mode="create" initial={null} onConfirm={confirmCard} onCancel={cancelCard} />
        )}

        {phase === "editing" && showExitCapture && card ? (
          <ExitContactCapture
            visitorId={card.id}
            visitorName={card.name}
            gradient={gradient}
            onDone={doExit}
          />
        ) : null}
        {phase === "editing" ? (
          <Toolbar
            tool={tool}
            setTool={(t) => setTool(t)}
            onDone={finishExit}
            gradient={gradient}
            position={toolbarPos}
            setPosition={setToolbarPos}
          />
        ) : null}

        {phase === "editing" && archiveListItems.length > 0 ? (
          <>
            <ArchivePanel
              open={archiveOpen}
              onClose={() => setArchiveOpen(false)}
              items={archiveListItems}
              gradient={gradient}
              onScrollTo={(it) => {
                window.setTimeout(() => {
                  window.scrollTo({
                    top: Math.max(0, it.y - window.innerHeight / 2),
                    behavior: "smooth",
                  });
                  setItems((prev) =>
                    prev.map((x) => (x.id === it.id ? { ...x, _highlightFlash: true } : x)),
                  );
                  window.setTimeout(() => {
                    setItems((prev) =>
                      prev.map((x) => (x.id === it.id ? { ...x, _highlightFlash: false } : x)),
                    );
                  }, 2000);
                }, 180);
              }}
            />
            <button
              data-lam-ui
              type="button"
              className={`${styles.navArchiveFloat} ${archiveOpen ? styles.navArchiveFloatActive : ""}`}
              aria-pressed={archiveOpen}
              onClick={() => setArchiveOpen((o) => !o)}
              style={
                {
                  left: 20,
                  ...("top" in archiveBtnOffset
                    ? { top: archiveBtnOffset.top, bottom: "auto" }
                    : { bottom: archiveBtnOffset.bottom, top: "auto" }),
                  "--from": gradient.from,
                  "--to": gradient.to,
                } as unknown as CSSProperties
              }
            >
              <span className={styles.navArchiveInner}>
                <svg
                  className={styles.navArchiveIcon}
                  width={18}
                  height={18}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.65}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden
                >
                  <path d="M21 8v13H3V8" />
                  <path d="M1 3h22v5H1V3z" />
                  <path d="M10 12h4" />
                </svg>
                <span className={styles.navArchiveLabel}>Archive</span>
              </span>
              {archiveListItems.length > 0 ? <span className={styles.navArchiveDot} aria-hidden /> : null}
            </button>
          </>
        ) : null}

        {phase === "editing" && ["sticky", "text", "comment"].includes(tool) ? (
          <div data-lam-ui className={styles.placeHint}>
            <span className={styles.placeHintDot} style={{ background: gradCSS(gradient) }} />
            click anywhere to place{" "}
            {tool === "comment" ? "a comment" : tool === "text" ? "text" : "a sticky note"} · esc to exit
          </div>
        ) : null}

      {toast ? <Toast text={toast.text} gradient={gradient} /> : null}
    </div>
  );
}
