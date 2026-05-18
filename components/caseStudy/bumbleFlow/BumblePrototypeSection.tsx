"use client";

import { useState } from "react";
import { bumblePrototypeSection, type BumblePrototypeTabId } from "@/content/bumbleFlowCaseStudy";
import cs from "../caseStudy.module.css";
import { PrototypeDualPhoneWalkthrough } from "./BumblePrototypeDualPhoneSection";
import { BumbleVibeCodingPipelineBlock } from "./BumblePrototypePyramidSection";
import ps from "./bumblePrototypeSection.module.css";
import py from "./bumblePrototypePyramid.module.css";

const DEFAULT_TAB: BumblePrototypeTabId = "premium-premium";

export function BumblePrototypeSection() {
  const [activeTab, setActiveTab] = useState<BumblePrototypeTabId>(DEFAULT_TAB);
  const tabs = bumblePrototypeSection.tabs;
  const pp = bumblePrototypeSection.premiumPremium;

  return (
    <section id="prototype" className={cs.section}>
      <div className={ps.rail}>
        <p className={cs.sectionEyebrow}>{bumblePrototypeSection.eyebrow}</p>
        <h2 className={cs.h2}>{bumblePrototypeSection.title}</h2>

        <div className={py.tabArea}>
          <div className={py.prototypeTabList} role="tablist" aria-label="Prototype scenarios">
            {tabs.map((tab) => {
              const selected = tab.id === activeTab;
              return (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  id={`prototype-tab-${tab.id}`}
                  aria-selected={selected}
                  aria-controls={`prototype-panel-${tab.id}`}
                  tabIndex={selected ? 0 : -1}
                  className={`${py.tab} ${selected ? py.tabActive : ""}`}
                  onClick={() => setActiveTab(tab.id)}
                >
                  {tab.tabLabel}
                </button>
              );
            })}
          </div>
        </div>

        <div
          id={`prototype-panel-${activeTab}`}
          role="tabpanel"
          aria-labelledby={`prototype-tab-${activeTab}`}
          className={ps.tabPanel}
        >
          {activeTab === "premium-premium" ? (
            <>
              <h3 className={ps.tabTitle}>{pp.title}</h3>
              <p className={ps.tabDescription}>{pp.description}</p>
              <PrototypeDualPhoneWalkthrough />
            </>
          ) : (
            <div className={ps.tabEmpty} aria-hidden />
          )}
        </div>

        <BumbleVibeCodingPipelineBlock />
      </div>
    </section>
  );
}
