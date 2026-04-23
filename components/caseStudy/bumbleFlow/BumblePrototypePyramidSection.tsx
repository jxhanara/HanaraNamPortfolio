"use client";

import { useMemo, useState } from "react";
import type { CSSProperties } from "react";
import {
  bumblePrototypeInteractive,
  type BumblePyramidTierSlug,
} from "@/content/bumbleFlowCaseStudy";
import cs from "../caseStudy.module.css";
import py from "./bumblePrototypePyramid.module.css";

const DEFAULT_SLUG: BumblePyramidTierSlug = "premium-premium";

type PyramidBullet = string | { readonly boldPrefix: string; readonly text: string };

function isBoldBullet(b: PyramidBullet): b is { readonly boldPrefix: string; readonly text: string } {
  return typeof b === "object" && b !== null && "boldPrefix" in b;
}

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
          <div className={py.pyramidColumn}>
            <div
              className={py.pyramidImageWrap}
              role="group"
              aria-label="Use case tiers"
            >
              <img
                src="/assets/bumbleflow/pyramid_complete.png"
                alt="Pyramid showing three use-case tiers: Premium × Premium, Premium × Free, and Free × Free."
                className={py.pyramidImage}
                draggable={false}
              />
              {bumblePrototypeInteractive.pyramidTiers.map((tier) => {
                const tierClass =
                  tier.level === 1
                    ? py.hitTier1
                    : tier.level === 2
                      ? py.hitTier2
                      : py.hitTier3;
                const isActive = tier.slug === active.slug;
                return (
                  <button
                    key={tier.slug}
                    type="button"
                    className={`${py.tierHit} ${tierClass} ${isActive ? py.tierHitActive : ""}`}
                    aria-pressed={isActive}
                    aria-label={tier.pairingLabel}
                    onClick={() => setActiveSlug(tier.slug)}
                  />
                );
              })}
            </div>
          </div>

          <div className={py.detailBelow}>
            <div
              className={py.detailRow}
              style={
                {
                  "--detail-badge-fill": active.accentColor,
                } as CSSProperties
              }
            >
              <span className={py.detailBadge} aria-hidden>
                {active.level}
              </span>
              <div className={py.detailCopy}>
                <h3 className={py.detailTitle}>{active.detailTitle}</h3>
                <p className={py.detailLead}>{active.detailLead}</p>
                {active.detailSections.map((section) => (
                  <div key={section.heading} className={py.detailSection}>
                    <h4 className={py.detailSectionTitle}>{section.heading}</h4>
                    <ul className={py.detailList}>
                      {section.bullets.map((bullet, i) => (
                        <li key={i} className={py.detailListItem}>
                          {isBoldBullet(bullet) ? (
                            <>
                              <strong className={py.detailBulletLead}>{bullet.boldPrefix}</strong>
                              {bullet.text}
                            </>
                          ) : (
                            bullet
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
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
