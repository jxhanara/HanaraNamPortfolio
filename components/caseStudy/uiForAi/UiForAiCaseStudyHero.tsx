import { uiForAiCaseStudyMeta } from "@/content/uiForAiCaseStudy";
import { MediaStrip } from "@/components/home/MediaStrip";
import h from "../bumbleFlow/bumbleHero.module.css";

export function UiForAiCaseStudyHero() {
  return (
    <header className={h.hero} aria-label="Context Switching case study">
      <div className={h.head}>
        <h1 className={h.title}>{uiForAiCaseStudyMeta.title}</h1>
        <p className={h.tagline}>{uiForAiCaseStudyMeta.subtitle}</p>

        <div className={h.metaRail}>
          <div className={h.meta}>
            {uiForAiCaseStudyMeta.heroMeta.map((row) => (
              <div key={row.label} className={h.metaItem}>
                <p className={h.metaLabel}>{row.label}</p>
                <p className={h.metaValue}>{row.value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className={h.phones}>
        <MediaStrip
          ariaLabel="Prototype recording placeholder"
          className={h.phonesStrip}
        />
      </div>
    </header>
  );
}
