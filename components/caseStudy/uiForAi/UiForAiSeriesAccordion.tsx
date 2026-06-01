"use client";

import { useId, useState } from "react";
import { uiForAiOverviewSeries } from "@/content/uiForAiCaseStudy";
import u from "./uiForAiCaseStudy.module.css";

function ExternalLinkIcon() {
  return (
    <svg
      className={u.seriesLinkIcon}
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      aria-hidden
    >
      <path
        d="M3 11L11 3M11 3H5M11 3V9"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      className={`${u.seriesChevron} ${open ? u.seriesChevronOpen : ""}`}
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden
    >
      <path
        d="M4 6L8 10L12 6"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function UiForAiSeriesAccordion() {
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const { label, title, description, links } = uiForAiOverviewSeries;

  return (
    <div className={u.seriesAccordion}>
      <button
        type="button"
        className={u.seriesTrigger}
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((prev) => !prev)}
      >
        <span className={u.seriesTriggerCopy}>
          <span className={u.seriesTriggerLabel}>{label}</span>
          <span className={u.seriesTriggerTitle}>{title}</span>
          <span className={u.seriesTriggerMeta}>
            · {links.length} related reads
          </span>
        </span>
        <ChevronIcon open={open} />
      </button>

      <div
        id={panelId}
        className={`${u.seriesPanel} ${open ? u.seriesPanelOpen : ""}`}
        aria-hidden={!open}
        {...(!open ? { inert: true } : {})}
      >
        <div className={u.seriesPanelInner}>
          <p className={u.seriesPanelDesc}>{description}</p>
          <div className={u.seriesLinkGrid}>
            {links.map((link) => (
              <a
                key={link.href}
                className={u.seriesLinkCard}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                <ExternalLinkIcon />
                <span className={u.seriesLinkCardTitle}>{link.title}</span>
                <span className={u.seriesLinkCardSubtitle}>{link.subtitle}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
