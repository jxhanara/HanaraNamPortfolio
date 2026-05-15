import { bumbleCaseStudyMeta, bumbleToc } from "@/content/bumbleFlowCaseStudy";
import { MediaStrip } from "@/components/home/MediaStrip";
import { BUMBLE_FLOW_STRIP_VIDEOS } from "@/components/home/bumbleFlowStrip";
import { SiteNav } from "@/components/home/SiteNav";
import homeStyles from "@/components/home/styles.module.css";
import { SiteFooter } from "@/components/SiteFooter";
import { CaseStudyTocNav } from "../CaseStudyTocNav";
import cs from "../caseStudy.module.css";
import { BumbleChallengeSection } from "./BumbleChallengeSection";
import { BumbleCoreComponentsSection } from "./BumbleCoreComponentsSection";
import { BumbleNextProjectSection } from "./BumbleNextProjectSection";
import { BumbleOverviewSection } from "./BumbleOverviewSection";
import { BumblePrototypePyramidSection } from "./BumblePrototypePyramidSection";
import { BumbleReflectionSection } from "./BumbleReflectionSection";
import { BumbleResearchSection } from "./BumbleResearchSection";
import { BumbleSolutionSection } from "./BumbleSolutionSection";
import { BumbleStrategySection } from "./BumbleStrategySection";
import { BumbleValidationSection } from "./BumbleValidationSection";

export function BumbleFlowCaseStudyView() {
  return (
    <div className={homeStyles.page}>
      <SiteNav />
      <div id="top" className={`${cs.caseStudyPage} ${cs.caseStudyPageAccentBumble}`}>
        <div className={cs.heroOuter}>
          <div className={cs.heroCard}>
            <div className={cs.heroTop}>
              <h1 className={cs.heroTitle}>{bumbleCaseStudyMeta.title}</h1>
              <p className={cs.heroSubtitle}>{bumbleCaseStudyMeta.subtitle}</p>
            </div>
            <div className={cs.heroMedia}>
              <MediaStrip
                videos={BUMBLE_FLOW_STRIP_VIDEOS}
                variant="bumble"
                ariaLabel="Bumble Flow prototype recordings"
              />
            </div>
          </div>
        </div>

        <div className={cs.shellTrack}>
          <div className={cs.shellMain}>
            <BumbleOverviewSection />
            <BumbleChallengeSection />
            <BumbleResearchSection />
            <BumbleValidationSection />
            <BumbleStrategySection />
            <BumbleSolutionSection />
            <BumblePrototypePyramidSection />
            <BumbleCoreComponentsSection />
            <BumbleReflectionSection />
            <BumbleNextProjectSection />
          </div>

          <div className={cs.tocWrap}>
            <CaseStudyTocNav items={bumbleToc} />
          </div>
        </div>

        <SiteFooter />
      </div>
    </div>
  );
}
