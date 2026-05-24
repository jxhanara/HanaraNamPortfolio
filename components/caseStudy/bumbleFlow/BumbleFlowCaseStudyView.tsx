import { bumbleToc } from "@/content/bumbleFlowCaseStudy";
import { SiteNav } from "@/components/home/SiteNav";
import homeStyles from "@/components/home/styles.module.css";
import { SiteFooter } from "@/components/SiteFooter";
import { CaseStudyTocNav } from "../CaseStudyTocNav";
import cs from "../caseStudy.module.css";
import { BumbleCaseStudyHero } from "./BumbleCaseStudyHero";
import { BumbleChallengeSection } from "./BumbleChallengeSection";
import { BumbleCoreComponentsSection } from "./BumbleCoreComponentsSection";
import { MoreCaseStudiesSection } from "../MoreCaseStudiesSection";
import { BumbleOverviewSection } from "./BumbleOverviewSection";
import { BumblePrototypeSection } from "./BumblePrototypeSection";
import { BumbleReflectionSection } from "./BumbleReflectionSection";
import { BumbleResearchSection } from "./BumbleResearchSection";
import { BumbleSolutionSection } from "./BumbleSolutionSection";
import { BumbleStrategySection } from "./BumbleStrategySection";
import { BumbleValidationSection } from "./BumbleValidationSection";

export function BumbleFlowCaseStudyView() {
  return (
    <div className={homeStyles.page} data-site-rail="case-study">
      <SiteNav />
      <div id="top" className={`${cs.caseStudyPage} ${cs.caseStudyPageAccentBumble}`}>
        <div className={cs.shellTrack}>
          <div className={cs.shellMain}>
            <BumbleCaseStudyHero />
            <BumbleOverviewSection />
            <BumbleChallengeSection />
            <BumblePrototypeSection />
            <BumbleResearchSection />
            <BumbleValidationSection />
            <BumbleStrategySection />
            <BumbleSolutionSection />
            <BumbleCoreComponentsSection />
            <BumbleReflectionSection />
            <MoreCaseStudiesSection currentSlug="bumble-flow" />
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
