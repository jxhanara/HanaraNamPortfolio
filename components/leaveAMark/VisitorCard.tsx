"use client";

import { useEffect, useState } from "react";
import {
  GRADIENTS,
  gradById,
  gradCSS,
  randomName,
  randomNo,
  todayLabel,
} from "./constants";
import type { GradientId } from "./constants";
import styles from "./LeaveAMark.module.css";

export type VisitorCardConfirm = {
  name: string;
  color: GradientId;
  no: string;
  createdAt: string;
};

type VisitorCardProps = {
  mode?: "create" | "edit";
  initial: { name?: string; color?: GradientId; no?: string; createdAt?: string } | null;
  onConfirm: (data: VisitorCardConfirm) => void;
  onCancel: () => void;
};

export function VisitorCard({ mode = "create", initial, onConfirm, onCancel }: VisitorCardProps) {
  const [name, setName] = useState(initial?.name || "");
  const [placeholder, setPlaceholder] = useState(() => randomName());
  const [gradId, setGradId] = useState<GradientId>(initial?.color || "aurora");
  const [no] = useState(initial?.no || randomNo());
  const [date] = useState(initial?.createdAt ? initial.createdAt : todayLabel());
  const [appear, setAppear] = useState(false);
  const grad = gradById(gradId);

  useEffect(() => {
    const t = setTimeout(() => setAppear(true), 30);
    return () => clearTimeout(t);
  }, []);

  const finalName = (name.trim() || placeholder).slice(0, 24);

  return (
    <div data-lam-ui className={`${styles.cardStage} ${appear ? styles.cardStageIn : ""}`}>
      <div className={styles.cardDim} onClick={onCancel} aria-hidden />
      <div className={styles.cardWrap}>
        <div className={styles.card} style={{ background: gradCSS(grad), color: grad.text }}>
          <div className={styles.cardNoise} aria-hidden />
          <div className={styles.cardHeader}>
            <span
              className={styles.cardWorld}
              style={{ fontFamily: "var(--font-instrument-serif), Georgia, serif" }}
            >
              Hanara&apos;s World
            </span>
            <span className={styles.cardStar} aria-hidden>
              ✦
            </span>
          </div>
          <div className={styles.cardNameWrap}>
            <input
              className={styles.cardNameInline}
              style={{ color: grad.text }}
              value={name}
              placeholder={placeholder}
              onChange={(e) => setName(e.target.value)}
              maxLength={24}
              autoFocus={mode === "create"}
              aria-label="Your name"
            />
            <button
              type="button"
              className={styles.cardRefreshInline}
              onClick={() => setPlaceholder(randomName())}
              aria-label="Suggest another name"
              title="Suggest another"
              style={{ color: grad.text }}
            >
              ↺
            </button>
          </div>
          <div className={styles.cardMeta}>
            <div className={styles.cardMetaCol}>
              <span className={styles.cardMetaLabel}>VISITOR</span>
              <span className={styles.cardMetaValue}>{finalName}</span>
            </div>
            <div className={styles.cardMetaCol}>
              <span className={styles.cardMetaLabel}>ISSUED ON</span>
              <span className={styles.cardMetaValue}>{date}</span>
            </div>
            <div className={styles.cardMetaCol}>
              <span className={styles.cardMetaLabel}>NO.</span>
              <span className={styles.cardMetaValue}>{no}</span>
            </div>
          </div>
          <div className={styles.cardSig}>
            <svg viewBox="0 0 200 30" width="100%" height="28" aria-hidden>
              <path
                d="M2 22 C 18 8, 30 28, 50 18 S 90 6, 110 22 S 150 26, 178 12"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinecap="round"
                opacity=".7"
              />
            </svg>
            <span className={styles.cardSigLabel}>SIGNATURE</span>
          </div>
        </div>

        <div className={styles.swatchRow} role="radiogroup" aria-label="Card color">
          {GRADIENTS.map((g) => (
            <button
              key={g.id}
              type="button"
              role="radio"
              aria-checked={gradId === g.id}
              aria-label={g.name}
              className={`${styles.swatch} ${gradId === g.id ? styles.swatchSelected : ""}`}
              style={{ background: gradCSS(g) }}
              onClick={() => setGradId(g.id)}
              title={g.name}
            />
          ))}
        </div>

        <button
          type="button"
          className={styles.enterBtn}
          onClick={() => onConfirm({ name: finalName, color: gradId, no, createdAt: date })}
        >
          {mode === "edit" ? (
            "Save changes"
          ) : (
            <>
              ENTER <span aria-hidden>→</span>
            </>
          )}
        </button>
        <p className={styles.cardFootnote}>
          {mode === "edit"
            ? "Updates apply to this browser and your welcome message."
            : "Your annotations are saved to this browser"}
        </p>
      </div>
    </div>
  );
}
