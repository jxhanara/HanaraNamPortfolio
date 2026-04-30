"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AnnotationItem } from "./AnnotationItem";
import { Character } from "./Character";
import type { CharacterPose } from "./Character";
import { CharacterLauncher } from "./CharacterLauncher";
import { EdgeGlow, type EdgeGlowMode } from "./EdgeGlow";
import { gradById, gradCSS, TOOLBAR_POS_KEY } from "./constants";
import styles from "./LeaveAMark.module.css";
import type { GradientId } from "./constants";
import { PenCanvas } from "./PenCanvas";
import { loadCard, saveCard } from "./storage";
import { Toast } from "./Toast";
import { Toolbar, type ToolId } from "./Toolbar";
import { VisitorCard } from "./VisitorCard";
import type { AnnotationItem as AnnItem } from "./types";
import type { Stroke } from "./types";
import type { ToolbarPos } from "./types";
import type { VisitorCard as VisitorCardT } from "./types";
import { useLeaveAMarkNavOptional } from "./LeaveAMarkNavContext";

type Phase =
  | "idle"
  | "drawingGlow"
  | "centering"
  | "cardIn"
  | "card"
  | "editing"
  | "exiting";

function isPlacementUiTarget(target: EventTarget | null): boolean {
  if (!(target instanceof Element)) return false;
  if (target.closest("textarea, input")) return true;
  return Boolean(
    target.closest("[data-lam-ui]") ||
      target.closest("[data-lam-item]") ||
      target.closest("a") ||
      target.closest("button"),
  );
}

export function LeaveAMark() {
  const [desktop, setDesktop] = useState(false);
  const [hydrated, setHydrated] = useState(false);
  const [phase, setPhase] = useState<Phase>("idle");
  const [card, setCard] = useState<VisitorCardT | null>(null);
  const cardRef = useRef<VisitorCardT | null>(null);
  cardRef.current = card;
  const [characterPos, setCharacterPos] = useState<"corner" | "center">("corner");
  const [characterPose, setCharacterPose] = useState<CharacterPose>("idle");
  const [tool, setTool] = useState<string>("pointer");
  const [items, setItems] = useState<AnnItem[]>([]);
  const [strokes, setStrokes] = useState<Stroke[]>([]);
  const [toolbarPos, setToolbarPos] = useState<ToolbarPos | null>(null);
  const [toast, setToast] = useState<{ text: string } | null>(null);
  const [showVisitorEditor, setShowVisitorEditor] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [docHeight, setDocHeight] = useState(0);

  const lamNav = useLeaveAMarkNavOptional();
  const gradient = useMemo(() => gradById(card?.color), [card?.color]);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const fn = () => setDesktop(mq.matches);
    fn();
    mq.addEventListener("change", fn);
    return () => mq.removeEventListener("change", fn);
  }, []);

  useEffect(() => {
    const c = loadCard();
    if (c) {
      setCard(c);
      setItems(c.annotations?.items ?? []);
      setStrokes(c.annotations?.strokes ?? []);
    }
    let tp: ToolbarPos | null = null;
    try {
      tp = JSON.parse(localStorage.getItem(TOOLBAR_POS_KEY) || "null");
    } catch {
      tp = null;
    }
    if (tp && typeof tp.x === "number" && typeof tp.y === "number") {
      setToolbarPos({
        x: tp.x,
        y: tp.y,
        dock: tp.dock === "left" || tp.dock === "right" ? tp.dock : "none",
      });
    } else {
      const w = 540;
      const h = 64;
      setToolbarPos({
        x: Math.max(12, (window.innerWidth - w) / 2),
        y: window.innerHeight - h - 36,
        dock: "none",
      });
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!toolbarPos) return;
    try {
      localStorage.setItem(TOOLBAR_POS_KEY, JSON.stringify(toolbarPos));
    } catch {
      /* ignore */
    }
  }, [toolbarPos]);

  useEffect(() => {
    if (!lamNav) return;
    lamNav.registerPillHandler(() => setShowVisitorEditor(true));
    return () => lamNav.registerPillHandler(null);
  }, [lamNav]);

  useEffect(() => {
    if (!lamNav) return;
    if (phase === "editing" && card && desktop && hydrated) {
      lamNav.setSlot({
        visitorName: card.name,
        gradientCSS: gradCSS(gradient),
      });
    } else {
      lamNav.setSlot(null);
    }
  }, [lamNav, phase, card, desktop, hydrated, gradient]);

  useEffect(() => {
    if (!card) return;
    const persistItems = items.map(({ _fresh, ...r }) => r);
    const persistStrokes = strokes.map((s) => {
      const { _tmp, ...r } = s;
      return r;
    });
    saveCard({ ...card, annotations: { items: persistItems, strokes: persistStrokes } });
  }, [items, strokes, card]);

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
    setPhase("exiting");
    setCharacterPose("wave");
    window.setTimeout(() => {
      setPhase("idle");
      setCharacterPose("idle");
      setTool("pointer");
      setToast({ text: `See you next time, ${card?.name || "friend"} ✦` });
      window.setTimeout(() => setToast(null), 3000);
    }, 1500);
  }, [card?.name]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      if (showVisitorEditor) {
        setShowVisitorEditor(false);
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
  }, [phase, finishExit, showVisitorEditor]);

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
      };
      setItems((it) => [...it, newItem]);
      setTool("pointer");
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
      annotations: { items: [], strokes: [] },
    };
    saveCard(newCard);
    setCard(newCard);
    setItems([]);
    setStrokes([]);
    setPhase("editing");
    setCharacterPos("corner");
    setCharacterPose("active");
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
              {items.map((it) => (
                <AnnotationItem
                  key={it.id}
                  item={it}
                  gradient={gradient}
                  onChange={(next) =>
                    setItems((arr) => arr.map((x) => (x.id === next.id ? { ...next, _fresh: false } : x)))
                  }
                  onDelete={(id) => setItems((arr) => arr.filter((x) => x.id !== id))}
                />
              ))}
            </div>
          </div>
        </div>
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
              saveCard(next);
              setShowVisitorEditor(false);
            }}
            onCancel={() => setShowVisitorEditor(false)}
          />
        ) : null}

        {(phase === "cardIn" || phase === "card") && (
          <VisitorCard mode="create" initial={null} onConfirm={confirmCard} onCancel={cancelCard} />
        )}

        {phase === "editing" && toolbarPos ? (
          <Toolbar
            tool={tool}
            setTool={(t) => setTool(t)}
            onDone={finishExit}
            onUndo={() => setStrokes((s) => s.slice(0, -1))}
            canUndo={strokes.length > 0}
            canEraseInk={strokes.some((s) => s.kind === "pen" || s.kind === "highlight")}
            gradient={gradient}
            position={toolbarPos}
            setPosition={setToolbarPos}
          />
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
