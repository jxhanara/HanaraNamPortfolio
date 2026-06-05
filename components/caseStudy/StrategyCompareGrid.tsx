"use client";

import { useEffect, useState } from "react";
import styles from "./strategyCompare.module.css";

const MOBILE_QUERY = "(max-width: 720px)";

export type StrategyCompareRow = {
  from: { title: string; body: string };
  to: { title: string; body: string };
};

type StrategyCompareGridProps = {
  fromLabel: string;
  toLabel: string;
  rows: readonly StrategyCompareRow[];
  accent: "bumble" | "trippy";
};

function FromCell({ title, body }: { title: string; body: string }) {
  return (
    <div className={styles.cell}>
      <p className={styles.rowTitleFrom}>{title}</p>
      <p className={styles.rowBody}>{body}</p>
    </div>
  );
}

function ToCell({ title, body }: { title: string; body: string }) {
  return (
    <div className={styles.cell}>
      <p className={styles.rowTitleTo}>{title}</p>
      <p className={styles.rowBody}>{body}</p>
    </div>
  );
}

export function StrategyCompareGrid({
  fromLabel,
  toLabel,
  rows,
  accent,
}: StrategyCompareGridProps) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;
    const mql = window.matchMedia(MOBILE_QUERY);
    const sync = () => setIsMobile(mql.matches);
    sync();
    mql.addEventListener("change", sync);
    return () => mql.removeEventListener("change", sync);
  }, []);

  return (
    <div className={styles.compare} data-accent={accent}>
      <div className={styles.compareDesktop} aria-hidden={isMobile}>
        <div className={styles.compareHead}>
          <p className={styles.fromColLabel}>{fromLabel}</p>
          <p className={styles.toColLabel}>{toLabel}</p>
        </div>
        {rows.map((row) => (
          <div key={row.from.title} className={styles.compareRow}>
            <FromCell title={row.from.title} body={row.from.body} />
            <ToCell title={row.to.title} body={row.to.body} />
          </div>
        ))}
      </div>

      <div className={styles.compareMobile} aria-hidden={!isMobile}>
        <div className={styles.pivotBlock}>
          <p className={`${styles.fromColLabel} ${styles.pivotBlockLabel}`}>{fromLabel}</p>
          {rows.map((row) => (
            <div key={row.from.title} className={styles.pivotItem}>
              <FromCell title={row.from.title} body={row.from.body} />
            </div>
          ))}
        </div>
        <div className={styles.pivotBlock}>
          <p className={`${styles.toColLabel} ${styles.pivotBlockLabel}`}>{toLabel}</p>
          {rows.map((row) => (
            <div key={row.to.title} className={styles.pivotItem}>
              <ToCell title={row.to.title} body={row.to.body} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
