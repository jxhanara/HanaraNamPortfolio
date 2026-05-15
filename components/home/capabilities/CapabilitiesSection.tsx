"use client";

import { useState } from "react";
import { CAPABILITIES } from "./data";
import styles from "./capabilities.module.css";

export function CapabilitiesSection() {
  const [activeIdx, setActiveIdx] = useState(0);
  const active = CAPABILITIES[activeIdx];

  return (
    <section className={styles.section} aria-labelledby="capabilities-heading">
      <div className={styles.inner}>
        <header className={styles.header}>
          <h2 id="capabilities-heading" className={styles.title}>
            How I can <em>help</em> —
          </h2>
        </header>

        <div className={styles.stage}>
          <div className={styles.tabs} role="tablist" aria-label="Capabilities">
            {CAPABILITIES.map((c, i) => (
              <button
                key={c.id}
                type="button"
                role="tab"
                aria-selected={i === activeIdx}
                id={`cap-tab-${c.id}`}
                aria-controls={`cap-panel-${c.id}`}
                className={`${styles.tab} ${i === activeIdx ? styles.tabActive : ""}`}
                onClick={() => setActiveIdx(i)}
              >
                <span className={styles.tabNum}>{c.num}</span>
                <span className={styles.tabBody}>
                  <span className={styles.tabTitle}>{c.title}</span>
                  <span className={styles.tabSub}>{c.oneLiner}</span>
                </span>
              </button>
            ))}
          </div>

          <div
            className={styles.detail}
            role="tabpanel"
            id={`cap-panel-${active.id}`}
            aria-labelledby={`cap-tab-${active.id}`}
            aria-live="polite"
            key={active.id}
          >
            <h3 className={styles.detailTitle}>{active.oneLiner}</h3>
            <div className={styles.detailBody}>
              {active.paras.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
