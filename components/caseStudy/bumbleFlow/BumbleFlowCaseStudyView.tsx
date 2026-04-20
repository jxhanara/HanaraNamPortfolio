import { bumbleCaseStudyMeta, bumbleToc } from "@/content/bumbleFlowCaseStudy";
import { MediaStrip } from "@/components/home/MediaStrip";
import { BUMBLE_FLOW_STRIP_VIDEOS } from "@/components/home/bumbleFlowStrip";
import { SiteNav } from "@/components/home/SiteNav";
import homeStyles from "@/components/home/styles.module.css";
import { CaseStudyFooter } from "../CaseStudyFooter";
import { CaseStudyTocNav } from "../CaseStudyTocNav";
import cs from "../caseStudy.module.css";
import { BumbleChallengeSection } from "./BumbleChallengeSection";
import { BumbleCoreComponentsSection } from "./BumbleCoreComponentsSection";
import { BumbleNextProjectSection } from "./BumbleNextProjectSection";
import { BumbleOverviewSection } from "./BumbleOverviewSection";
import { BumblePrototypeSection } from "./BumblePrototypeSection";
import { BumbleReflectionSection } from "./BumbleReflectionSection";
import { BumbleResearchSection } from "./BumbleResearchSection";
import { BumbleScenariosSection } from "./BumbleScenariosSection";
import { BumbleSolutionSection } from "./BumbleSolutionSection";
import { BumbleStrategySection } from "./BumbleStrategySection";
import { BumbleValidationSection } from "./BumbleValidationSection";

export function BumbleFlowCaseStudyView() {
  return (
    <div className={homeStyles.page}>
      <SiteNav />
      <div id="top" className={cs.caseStudyPage}>
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
            <BumbleStrategySection />
            <BumbleValidationSection />
            <BumbleSolutionSection />
            <BumbleScenariosSection />
            <BumbleCoreComponentsSection />
            <BumblePrototypeSection />
            <BumbleReflectionSection />
            <BumbleNextProjectSection />
          </div>

          <div className={cs.tocWrap}>
            <CaseStudyTocNav items={bumbleToc} />
          </div>
        </div>

        <CaseStudyFooter />
      </div>
    </div>
  );
}
