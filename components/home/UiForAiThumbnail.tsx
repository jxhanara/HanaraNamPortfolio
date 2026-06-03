"use client";

import t from "./uiForAiThumbnail.module.css";

export function UiForAiThumbnail() {
  return (
    <div className={t.thumb}>
      <div className={t.laptop}>
        <div className={t.screen}>
          <span className={t.notch} aria-hidden />
          <div className={t.display}>
            <video
              className={t.media}
              src="/assets/uiforai/ContextSwitching_SearchJumpBackIn.mp4"
              muted
              loop
              autoPlay
              playsInline
              preload="auto"
              aria-label="UI for AI Re-Entry panel — recall search and jump back in"
            />
          </div>
        </div>
        <div className={t.base} aria-hidden />
      </div>
    </div>
  );
}
