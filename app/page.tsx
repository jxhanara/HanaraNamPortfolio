import {
  CapabilitiesSection,
  HeroSection,
  MediaStrip,
  ProjectCard,
  SiteFooter,
  SiteNav,
} from "@/components/home";
import { BUMBLE_FLOW_STRIP_VIDEOS } from "@/components/home/bumbleFlowStrip";
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

export default function HomePage() {
  return (
    <div className={styles.page}>
      <SiteNav />
      <main className={styles.main}>
        <HeroSection />
        <div id="portfolios" className={styles.portfolios}>
          <div className={styles.projectBlock}>
            <ProjectCard
              id="trippy"
              title="TRIPPY"
              description={TRIPPY_DESC}
              dateLabel="2024 - 2025"
              imageSrc="/images/trippyportfoliothumbnail.png"
              imageAlt="Trippy portfolio preview"
              href="/trippy-case-study"
            />
          </div>
          <div className={styles.projectBlock}>
            <ProjectCard
              title="Bumble Flow"
              description={BUMBLE_DESC}
              dateLabel="2026"
              imageSrc="/images/bumbleflowthumbnail.png"
              imageAlt="Bumble Flow project preview"
              href="https://hanaranam.com/3/bumbleflow"
              external
            />
          </div>
          <MediaStrip
            videos={BUMBLE_FLOW_STRIP_VIDEOS}
            variant="bumble"
            ariaLabel="Bumble Flow prototype recordings"
          />
          <div className={styles.projectBlock}>
            <ProjectCard
              title="UI for AI"
              description="coming soon..."
              dateLabel="2025 - 2026"
              imageSrc="/images/uiforaithumbnail.png"
              imageAlt="UI for AI project preview"
            />
          </div>
        </div>
        <CapabilitiesSection />
      </main>
      <SiteFooter />
    </div>
  );
}
