"use client";

import { useMemo, useState } from "react";
import {
  bumblePrototypeInteractive,
  type BumblePyramidTierSlug,
} from "@/content/bumbleFlowCaseStudy";
import cs from "../caseStudy.module.css";
import py from "./bumblePrototypePyramid.module.css";

const DEFAULT_SLUG: BumblePyramidTierSlug = "premium-premium";

export function BumblePrototypePyramidSection() {
  const [activeSlug, setActiveSlug] = useState<BumblePyramidTierSlug>(DEFAULT_SLUG);

  const active = useMemo(
    () =>
      bumblePrototypeInteractive.pyramidTiers.find((t) => t.slug === activeSlug) ??
      bumblePrototypeInteractive.pyramidTiers[0],
    [activeSlug],
  );

  return (
    <section id="prototype" className={cs.section}>
      <p className={cs.sectionEyebrow}>{bumblePrototypeInteractive.eyebrow}</p>
      <h2 className={cs.h2}>{bumblePrototypeInteractive.title}</h2>
      <div className={cs.reflectionIntro}>
        {bumblePrototypeInteractive.intro.map((p) => (
          <p key={p.slice(0, 48)} className={cs.body}>
            {p}
          </p>
        ))}
      </div>

      <div className={`${py.shell} ${py.grid}`}>
        <div className={py.leftStack}>
          <div className={py.leftTopRow}>
            <div className={py.diamondWrap}>
              <div className={py.diamond} role="group" aria-label="Use case tiers">
                {bumblePrototypeInteractive.pyramidTiers.map((tier) => {
                  const tierClass =
                    tier.level === 1 ? py.tier1 : tier.level === 2 ? py.tier2 : py.tier3;
                  const isActive = tier.slug === active.slug;
                  return (
                    <button
                      key={tier.slug}
                      type="button"
                      className={`${py.tierBtn} ${tierClass} ${isActive ? py.tierBtnActive : ""}`}
                      aria-pressed={isActive}
                      onClick={() => setActiveSlug(tier.slug)}
                    >
                      <span className={py.tierLevel} aria-hidden>
                        {tier.level}
                      </span>
                      <span className={py.tierLabel}>{tier.pairingLabel}</span>
                    </button>
                  );
                })}
              </div>
            </div>
            <p className={py.hint}>{bumblePrototypeInteractive.pyramidHint}</p>
          </div>

          <div className={py.detailBelow}>
            <div className={py.detailRow}>
              <span className={py.detailBadge} aria-hidden>
                {active.level}
              </span>
              <div>
                <h3 className={py.detailTitle}>{active.detailTitle}</h3>
                <p className={py.detailBody}>{active.detailBody}</p>
              </div>
            </div>
          </div>
        </div>

        <div
          className={`${py.rightPane} ${active.showPrototypeEmbed ? "" : py.rightPaneEmpty}`}
          aria-label={active.showPrototypeEmbed ? "Interactive prototype" : undefined}
        >
          {active.showPrototypeEmbed ? (
            <>
              <iframe
                className={py.embedFrame}
                src={bumblePrototypeInteractive.prototypeEmbedUrl}
                title="Bumble Flow interactive prototype"
                loading="lazy"
                sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
                referrerPolicy="no-referrer-when-downgrade"
              />
              <p className={py.embedCaption}>
                Live build —{" "}
                <a
                  href={bumblePrototypeInteractive.prototypeEmbedUrl}
                  target="_blank"
                  rel="noreferrer"
                  style={{ color: "rgba(255, 255, 255, 0.72)", textDecoration: "underline" }}
                >
                  Open in new tab
                </a>
              </p>
            </>
          ) : null}
        </div>
      </div>
    </section>
  );
}
