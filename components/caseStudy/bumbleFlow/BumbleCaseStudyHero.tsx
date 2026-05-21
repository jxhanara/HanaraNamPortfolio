import { bumbleCaseStudyMeta } from "@/content/bumbleFlowCaseStudy";
import { MediaStrip } from "@/components/home/MediaStrip";
import { BUMBLE_FLOW_STRIP_VIDEOS } from "@/components/home/bumbleFlowStrip";
import h from "./bumbleHero.module.css";

export function BumbleCaseStudyHero() {
  return (
    <header className={h.hero} aria-label="Bumble Flow case study">
      <div className={h.head}>
        <h1 className={h.title}>{bumbleCaseStudyMeta.title}</h1>
        <p className={h.tagline}>{bumbleCaseStudyMeta.subtitle}</p>

        <div className={h.metaRail}>
          <div className={h.meta}>
            {bumbleCaseStudyMeta.heroMeta.map((row) => (
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
          videos={BUMBLE_FLOW_STRIP_VIDEOS}
          variant="bumble"
          ariaLabel="Bumble Flow prototype recordings"
          className={h.phonesStrip}
        />
      </div>
    </header>
  );
}
