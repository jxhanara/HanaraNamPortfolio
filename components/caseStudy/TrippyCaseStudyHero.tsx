import { trippyCaseStudyMeta } from "@/content/trippyCaseStudy";
import { MediaStrip } from "@/components/home/MediaStrip";
import { TRIPPY_STRIP_VIDEOS } from "@/components/home/trippyStrip";
import h from "./trippyHero.module.css";

export function TrippyCaseStudyHero() {
  return (
    <header className={h.hero} aria-label="Trippy case study">
      <div className={h.head}>
        <h1 className={h.title}>{trippyCaseStudyMeta.title}</h1>
        <p className={h.tagline}>{trippyCaseStudyMeta.subtitle}</p>

        <div className={h.metaRail}>
          <div className={h.meta}>
            {trippyCaseStudyMeta.heroMeta.map((row) => (
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
          videos={TRIPPY_STRIP_VIDEOS}
          variant="trippy"
          ariaLabel="Trippy product recordings"
          className={h.phonesStrip}
        />
      </div>
    </header>
  );
}
