"use client";

import { useState } from "react";
import { GRADIENTS, gradById, gradCSS, randomName } from "./constants";
import type { GradientId } from "./constants";
import type { VisitorCard } from "./types";
import styles from "./LeaveAMark.module.css";

type CardSettingsProps = {
  card: VisitorCard | null;
  onClose: () => void;
  onUpdate: (c: VisitorCard) => void;
};

export function CardSettings({ card, onClose, onUpdate }: CardSettingsProps) {
  const [name, setName] = useState(card?.name || "");
  const [gradId, setGradId] = useState<GradientId>(card?.color || "aurora");
  const grad = gradById(gradId);

  const save = () => {
    const finalName = (name.trim() || card?.name || "Anon").slice(0, 24);
    if (!card) return;
    onUpdate({ ...card, name: finalName, color: gradId });
    onClose();
  };

  return (
    <div data-lam-ui className={styles.settingsPanel} onPointerDown={(e) => e.stopPropagation()}>
      <button type="button" className={styles.settingsClose} onClick={onClose} aria-label="Close">
        ×
      </button>
      <p className={styles.settingsTitle}>Your card</p>
      <div className={styles.settingsCardPreview} style={{ background: gradCSS(grad), color: grad.text }}>
        <span
          className={styles.settingsPreviewLabel}
          style={{ fontFamily: "var(--font-instrument-serif), Georgia, serif" }}
        >
          Hanara&apos;s World
        </span>
        <span
          className={styles.settingsPreviewName}
          style={{ fontFamily: "var(--font-instrument-serif), Georgia, serif" }}
        >
          {(name.trim() || card?.name || "—").slice(0, 24)}
        </span>
      </div>
      <label className={styles.settingsField}>
        <span className={styles.settingsLabel}>Name</span>
        <div className={styles.settingsRow}>
          <input
            className={styles.settingsInput}
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={card?.name}
            maxLength={24}
          />
          <button
            type="button"
            className={styles.settingsRefresh}
            onClick={() => setName(randomName())}
            aria-label="Random name"
            title="Random"
          >
            ↺
          </button>
        </div>
      </label>
      <div className={styles.settingsField}>
        <span className={styles.settingsLabel}>Card color</span>
        <div className={styles.swatchRow}>
          {GRADIENTS.map((g) => (
            <button
              key={g.id}
              type="button"
              className={`${styles.swatch} ${gradId === g.id ? styles.swatchSelected : ""}`}
              style={{ background: gradCSS(g) }}
              onClick={() => setGradId(g.id)}
              aria-label={g.name}
              title={g.name}
            />
          ))}
        </div>
      </div>
      <button type="button" className={styles.settingsSave} onClick={save}>
        Save
      </button>
    </div>
  );
}
