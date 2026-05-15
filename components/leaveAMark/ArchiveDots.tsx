"use client";

import type { CSSProperties } from "react";
import type { Gradient } from "./constants";
import { todayId } from "./AIThreads";
import type { AnnotationItem } from "./types";
import styles from "./LeaveAMark.module.css";

export type ArchiveDotsProps = {
  items: AnnotationItem[];
  gradient: Gradient;
  scrollY: number;
  onDotClick: (item: AnnotationItem) => void;
};

function tooltipText(it: AnnotationItem): string {
  const blob = [it.text, ...(it.thread ?? []).map((m) => m.text)].filter(Boolean).join(" — ");
  return blob.length <= 60 ? blob : `${blob.slice(0, 60)}…`;
}

export function ArchiveDots({ items, gradient, scrollY, onDotClick }: ArchiveDotsProps) {
  const today = todayId();
  const archived = items.filter((it) => it.sessionId && it.sessionId !== today);
  if (archived.length === 0) return null;

  return (
    <div className={styles.archiveDotsLayer} aria-hidden>
      {archived.map((it) => (
        <button
          key={it.id}
          type="button"
          data-lam-ui
          className={styles.archiveDot}
          style={
            {
              top: it.y - scrollY,
              "--from": gradient.from,
              "--to": gradient.to,
            } as CSSProperties
          }
          title={tooltipText(it)}
          onClick={(e) => {
            e.stopPropagation();
            onDotClick(it);
          }}
        />
      ))}
    </div>
  );
}
