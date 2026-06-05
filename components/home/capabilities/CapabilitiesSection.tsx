"use client";

import { useEffect, useState } from "react";
import { CAPABILITIES } from "./data";
import styles from "./capabilities.module.css";

const MOBILE_CAP_QUERY = "(max-width: 800px)";

function TabCaret({ expanded }: { expanded: boolean }) {
  return (
    <span
      className={`${styles.tabCaret} ${expanded ? styles.tabCaretExpanded : ""}`}
      aria-hidden
    >
      <svg viewBox="0 0 12 8" width="12" height="8" fill="none">
        <path
          d="M1 1.5 6 6.5 11 1.5"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}

function CapabilityDetail({ oneLiner, paras }: { oneLiner: string; paras: readonly string[] }) {
  return (
    <>
      <h3 className={styles.detailTitle}>{oneLiner}</h3>
      <div className={styles.detailBody}>
        {paras.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </div>
    </>
  );
}

export function CapabilitiesSection() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [expandedIdx, setExpandedIdx] = useState<number | null>(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;
    const mql = window.matchMedia(MOBILE_CAP_QUERY);
    setIsMobile(mql.matches);
    const handleChange = (event: MediaQueryListEvent) => {
      setIsMobile(event.matches);
      if (event.matches) {
        setExpandedIdx((prev) => (prev === null ? activeIdx : prev));
      } else {
        setExpandedIdx(null);
      }
    };
    mql.addEventListener("change", handleChange);
    return () => mql.removeEventListener("change", handleChange);
  }, [activeIdx]);

  const active = CAPABILITIES[activeIdx];

  const handleTabClick = (index: number) => {
    if (isMobile) {
      setExpandedIdx((prev) => (prev === index ? null : index));
      setActiveIdx(index);
      return;
    }
    setActiveIdx(index);
  };

  return (
    <section className={styles.section} aria-labelledby="capabilities-heading">
      <div className={styles.inner}>
        <header className={styles.header}>
          <h2 id="capabilities-heading" className={styles.title}>
            How I can <em>help</em> —
          </h2>
        </header>

        <div className={styles.stage}>
          <div
            className={styles.tabs}
            role={isMobile ? undefined : "tablist"}
            aria-label={isMobile ? undefined : "Capabilities"}
          >
            {CAPABILITIES.map((c, i) => {
              const isActive = i === activeIdx;
              const isExpanded = isMobile && expandedIdx === i;

              return (
                <div
                  key={c.id}
                  className={`${styles.tabItem} ${isExpanded ? styles.tabItemExpanded : ""}`}
                >
                  <button
                    type="button"
                    role={isMobile ? undefined : "tab"}
                    aria-selected={isMobile ? undefined : isActive}
                    aria-expanded={isMobile ? isExpanded : undefined}
                    id={`cap-tab-${c.id}`}
                    aria-controls={
                      isMobile ? `cap-panel-${c.id}` : `cap-panel-${c.id}-desktop`
                    }
                    className={`${styles.tab} ${isActive ? styles.tabActive : ""}`}
                    onClick={() => handleTabClick(i)}
                  >
                    <span className={styles.tabNum}>{c.num}</span>
                    <span className={styles.tabBody}>
                      <span className={styles.tabTitle}>{c.title}</span>
                      <span className={styles.tabSub}>{c.oneLiner}</span>
                    </span>
                    <TabCaret expanded={isMobile ? isExpanded : isActive} />
                  </button>

                  <div
                    id={`cap-panel-${c.id}`}
                    className={`${styles.tabPanel} ${
                      isExpanded ? styles.tabPanelOpen : ""
                    }`}
                    role={isMobile ? "region" : undefined}
                    aria-labelledby={isMobile ? `cap-tab-${c.id}` : undefined}
                    aria-hidden={isMobile ? !isExpanded : true}
                  >
                    <div className={styles.tabPanelInner}>
                      <CapabilityDetail oneLiner={c.oneLiner} paras={c.paras} />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div
            className={styles.detail}
            role="tabpanel"
            id={`cap-panel-${active.id}-desktop`}
            aria-labelledby={`cap-tab-${active.id}`}
            aria-live="polite"
            key={active.id}
          >
            <CapabilityDetail oneLiner={active.oneLiner} paras={active.paras} />
          </div>
        </div>
      </div>
    </section>
  );
}
