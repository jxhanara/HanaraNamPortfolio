import {
  CapabilitiesSection,
  HeroSection,
  MediaStrip,
  ProjectCard,
  SiteNav,
} from "@/components/home";
import { SiteFooter } from "@/components/SiteFooter";
import { BUMBLE_FLOW_STRIP_VIDEOS } from "@/components/home/bumbleFlowStrip";
import { TRIPPY_STRIP_VIDEOS } from "@/components/home/trippyStrip";
import { UiForAiThumbnail } from "@/components/home/UiForAiThumbnail";
import { NasaThumbnail } from "@/components/home/NasaThumbnail";
import styles from "@/components/home/styles.module.css";

const TRIPPY_DESC = (
  <>
    An intelligent travel planning app I designed as the sole Product Designer at
    Trippy, a startup focused on AI-powered itinerary planning and local discovery.
  </>
);

const BUMBLE_DESC = (
  <>
    Redesigning dating from passive matching to active coordination—helping users
    turn matches into real plans through shared intent and availability.
  </>
);

const UI_FOR_AI_DESC = (
  <>
    Exploring how AI interfaces can support re-entry, memory, and momentum across
    interrupted work.
  </>
);

const NASA_DESC = (
  <>
    Designing for a future where astronauts and Earth can no longer work in real time,
    creating tools for asynchronous coordination on Mars missions.
  </>
);

export default function HomePage() {
  return (
    <div className={styles.page}>
      <SiteNav />
      <div className={styles.marketingScale}>
        <main className={styles.main}>
          <HeroSection />
          <div id="portfolios" className={styles.portfolios}>
            <div className={styles.projectBlock}>
              <ProjectCard
                id="bumble-flow"
                title="Bumble Flow"
                description={BUMBLE_DESC}
                dateLabel="2026"
                imageSrc="/images/bumbleflowthumbnail.png"
                imageAlt="Bumble Flow project preview"
                href="/bumble-flow-case-study"
              />
            </div>
            <MediaStrip
              videos={BUMBLE_FLOW_STRIP_VIDEOS}
              variant="bumble"
              ariaLabel="Bumble Flow prototype recordings"
            />
            <div className={styles.projectBlock}>
              <ProjectCard
                id="trippy"
                title="TRIPPY"
                description={TRIPPY_DESC}
                dateLabel="2024 – 2026"
                imageSrc="/images/trippyportfoliothumbnail.png"
                imageAlt="Trippy portfolio preview"
                href="/trippy-case-study"
              />
            </div>
            <MediaStrip
              videos={TRIPPY_STRIP_VIDEOS}
              variant="trippy"
              ariaLabel="Trippy prototype recordings"
            />
            <div className={styles.projectBlock}>
              <ProjectCard
                id="ui-for-ai"
                title="UI for AI"
                description={UI_FOR_AI_DESC}
                dateLabel="2025 - 2026"
                imageAlt="UI for AI project preview"
                thumbnail={<UiForAiThumbnail />}
                href="/ui-for-ai-case-study"
              />
            </div>
            <div className={`${styles.projectBlock} ${styles.projectBlockComingSoon}`} aria-disabled>
              <ProjectCard
                id="nasa"
                title="NASA (MHCI Capstone)"
                description={NASA_DESC}
                dateLabel="2026"
                imageAlt="NASA MHCI Capstone project preview"
                thumbnail={<NasaThumbnail />}
              />
            </div>
          </div>
          <CapabilitiesSection />
        </main>
        <SiteFooter />
      </div>
    </div>
  );
}
