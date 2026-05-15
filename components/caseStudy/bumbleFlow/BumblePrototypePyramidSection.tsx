"use client";

import { useLayoutEffect, useMemo, useRef, useState } from "react";
import {
  bumblePrototypeInteractive,
  type BumblePrototypeScenarioId,
} from "@/content/bumbleFlowCaseStudy";
import cs from "../caseStudy.module.css";
import py from "./bumblePrototypePyramid.module.css";

const DEFAULT_SCENARIO: BumblePrototypeScenarioId = "premium-premium";

function PipelineArrow() {
  return (
    <span className={py.pipelineArrowGlyph} aria-hidden>
      →
    </span>
  );
}

type PipelineFit = { scale: number; cw: number; iw: number; ih: number };

function VibeCodingPipelineDiagram({
  ariaLabel,
  bullets,
}: {
  ariaLabel: string;
  bullets: readonly string[];
}) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const rowRef = useRef<HTMLDivElement>(null);
  const [fit, setFit] = useState<PipelineFit | null>(null);

  useLayoutEffect(() => {
    const vp = viewportRef.current;
    const row = rowRef.current;
    if (!vp || !row) return;

    const measure = () => {
      const cw = vp.getBoundingClientRect().width;
      const iw = row.offsetWidth;
      const ih = row.offsetHeight;
      if (cw <= 0 || iw <= 0 || ih <= 0) return;
      const inset = 6;
      const scale = Math.min(1, (cw - inset) / iw);
      setFit({ scale, cw, iw, ih });
    };

    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(vp);
    return () => ro.disconnect();
  }, [bullets]);

  const measured = fit !== null && fit.cw > 0 && fit.iw > 0;
  const scaledH = measured ? fit.ih * fit.scale : undefined;
  const clipLeft = measured ? Math.max(0, (fit.cw - fit.iw * fit.scale) / 2) : 0;

  return (
    <div ref={viewportRef} className={py.pipelineViewport}>
      <div
        className={py.pipelineFitClip}
        style={
          measured
            ? { width: fit.cw, height: scaledH }
            : { width: "100%", minHeight: 120 }
        }
      >
        <div
          className={py.pipelineScaleHost}
          style={
            measured
              ? {
                  position: "absolute",
                  left: `${clipLeft}px`,
                  top: 0,
                  width: fit.iw,
                  height: fit.ih,
                  transform: `scale(${fit.scale}) translateZ(0)`,
                  transformOrigin: "top left",
                }
              : { position: "relative" }
          }
        >
          <div ref={rowRef} className={py.pipeline} role="img" aria-label={ariaLabel}>
            <div className={py.pipelineLead}>
              <div className={py.pipelineLeadColInputs}>
                <div className={`${py.pipelineInputStack} ${py.pipelineInputStackStretch}`}>
                  <p className={py.pipelinePill}>Need Statement</p>
                  <p className={py.pipelinePill}>Prioritized Requirements and Constraints List</p>
                  <p className={py.pipelinePill}>Specifications List</p>
                </div>
              </div>
              <PipelineArrow />
              <div className={py.pipelineLeadColPrd}>
                <div className={py.pipelinePrdCard}>
                  <p className={py.pipelinePrdTitle}>PRD Prompt</p>
                  <ul className={py.pipelinePrdList}>
                    {bullets.map((b) => (
                      <li key={b}>{b}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            <PipelineArrow />
            <div className={py.pipelineCol}>
              <div className={py.pipelineDocCard}>
                <p className={py.pipelineDocTitle}>
                  Product
                  <br />
                  Requirements
                  <br />
                  Document
                </p>
              </div>
            </div>
            <PipelineArrow />
            <div className={py.pipelineCol}>
              <div className={py.pipelineVibeCard}>
                <p className={py.pipelineVibeLine}>VIBE</p>
                <p className={py.pipelineVibeLine}>CODING</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

type ScenarioPhoneSlot = {
  viewerLabel: string;
  iframeSrc: string | null;
  placeholderTitle?: string;
  placeholderHint?: string;
};

function ScenarioPhoneFrame({
  slot,
  designW,
  designH,
}: {
  slot: ScenarioPhoneSlot;
  designW: number;
  designH: number;
}) {
  const live = Boolean(slot.iframeSrc);
  const screenRef = useRef<HTMLDivElement>(null);
  const [frame, setFrame] = useState({ scale: 1, cw: 0, ch: 0 });

  useLayoutEffect(() => {
    if (!live) return;
    const node = screenRef.current;
    if (!node) return;

    const measure = () => {
      /* clientWidth/Height match the content box and stay in sync with the absolute iframe layer. */
      const cw = node.clientWidth;
      const ch = node.clientHeight;
      if (cw <= 0 || ch <= 0) return;
      /* Small inset for rounded-corner mask; then hard-fit so scaled paint never exceeds the glass
         (avoids right-edge clipping when aspect-ratio + max-height makes subpixel width drift). */
      const insetX = 4;
      const insetY = 4;
      let s = Math.min(1, (cw - insetX) / designW, (ch - insetY) / designH);
      let scaledW = designW * s;
      let scaledH = designH * s;
      if (scaledW > cw) s *= cw / scaledW;
      if (scaledH > ch) s *= ch / scaledH;
      setFrame({ scale: s, cw, ch });
    };

    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(node);
    return () => ro.disconnect();
  }, [live, designW, designH]);

  const s = frame.scale;
  // Outer clip box is designW·scale px wide; transform:scale alone does not shrink layout width.
  const measured = frame.cw > 0 && frame.ch > 0;
  const scaledW = measured ? Math.min(designW * s, frame.cw) : 0;
  const scaledH = measured ? Math.min(designH * s, frame.ch) : 0;
  const sClip =
    measured && designW > 0 && designH > 0
      ? Math.min(s, scaledW / designW, scaledH / designH)
      : s;
  const clipLeft = measured ? Math.max(0, (frame.cw - designW * sClip) / 2) : 0;
  const clipTop = measured ? Math.max(0, (frame.ch - designH * sClip) / 2) : 0;

  return (
    <div className={py.phoneColumn}>
      <p className={py.phoneViewerLabel}>{slot.viewerLabel}</p>
      <div className={live ? py.iphoneDevice : py.iphoneDeviceMuted}>
        <div className={live ? py.iphoneMetal : py.iphoneMetalMuted}>
          <div
            ref={screenRef}
            className={`${py.iphoneScreen} ${live ? "" : py.iphoneScreenMuted}`}
          >
            {live ? (
              <div className={py.iphoneNotch} aria-hidden>
                <span className={py.iphoneNotchSpeaker} />
                <span className={py.iphoneNotchCam} />
              </div>
            ) : null}
            {live && slot.iframeSrc ? (
              <div className={py.iframeViewport}>
                {measured ? (
                  <div
                    className={py.iframeScaleClip}
                    style={{
                      position: "absolute",
                      left: `${clipLeft}px`,
                      top: `${clipTop}px`,
                      width: designW * sClip,
                      height: designH * sClip,
                      overflow: "hidden",
                    }}
                  >
                    <div
                      className={py.iframeScaleHost}
                      style={{
                        width: designW,
                        height: designH,
                        transform: `scale(${sClip}) translateZ(0)`,
                        transformOrigin: "top left",
                      }}
                    >
                      <iframe
                        className={py.protoIframe}
                        src={slot.iframeSrc}
                        title={`${slot.viewerLabel} prototype`}
                        width={designW}
                        height={designH}
                        loading="lazy"
                        sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
                        referrerPolicy="no-referrer-when-downgrade"
                      />
                    </div>
                  </div>
                ) : null}
              </div>
            ) : (
              <div className={py.placeholderInner}>
                <span className={py.placeholderEmoji} aria-hidden>
                  📱
                </span>
                <p className={py.placeholderTitle}>
                  {"placeholderTitle" in slot && slot.placeholderTitle
                    ? slot.placeholderTitle
                    : "Prototype coming soon"}
                </p>
                {"placeholderHint" in slot && slot.placeholderHint ? (
                  <p className={py.placeholderHint}>{slot.placeholderHint}</p>
                ) : null}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export function BumblePrototypePyramidSection() {
  const [activeId, setActiveId] = useState<BumblePrototypeScenarioId>(DEFAULT_SCENARIO);

  const scenarios = bumblePrototypeInteractive.prototypeScenarios;
  const designW = bumblePrototypeInteractive.prototypeDesignWidth;
  const designH = bumblePrototypeInteractive.prototypeDesignHeight;

  const active = useMemo(
    () => scenarios.find((s) => s.id === activeId) ?? scenarios[0],
    [activeId, scenarios],
  );

  const s = active;

  const methods = bumblePrototypeInteractive.prototypeMethods;
  const vc = bumblePrototypeInteractive.vibeCoding;

  return (
    <section id="prototype" className={cs.section}>
      <div className={py.prototypeRail}>
        <p className={`${cs.sectionEyebrow} ${py.prototypeInRail}`}>{bumblePrototypeInteractive.eyebrow}</p>
        <h2 className={`${cs.h2} ${py.prototypeInRail}`}>{bumblePrototypeInteractive.title}</h2>
        <div className={cs.reflectionIntro}>
          {bumblePrototypeInteractive.introLead.map((p) => (
            <p key={p.slice(0, 48)} className={`${cs.body} ${py.prototypeInRail}`}>
              {p}
            </p>
          ))}
        </div>

        <div className={py.methodGrid}>
          {methods.map((m) => (
            <div key={m.methodLabel} className={py.methodCard}>
              <p className={py.methodKicker}>{m.methodLabel}</p>
              <h3 className={py.methodTitle}>{m.title}</h3>
              <p className={py.methodBody}>{m.body}</p>
              <p className={py.methodTag}>{m.tag}</p>
            </div>
          ))}
        </div>

      <div className={py.prototypeStructureRule} aria-hidden />

      <div className={py.scenarioRoot}>
        <p className={py.prototypeSegmentPill}>{bumblePrototypeInteractive.scenariosEyebrow}</p>

        <div className={py.tabArea}>
          <div className={py.prototypeTabList} role="tablist" aria-label="Prototype scenarios">
            {scenarios.map((sc) => {
              const selected = sc.id === activeId;
              return (
                <button
                  key={sc.id}
                  type="button"
                  role="tab"
                  id={`scenario-tab-${sc.id}`}
                  aria-selected={selected}
                  aria-controls="scenario-panel-active"
                  tabIndex={selected ? 0 : -1}
                  className={`${py.tab} ${selected ? py.tabActive : ""}`}
                  onClick={() => setActiveId(sc.id)}
                >
                  {sc.tabLabel}
                </button>
              );
            })}
          </div>
        </div>

        <article
          key={s.id}
          id="scenario-panel-active"
          role="tabpanel"
          aria-labelledby={`scenario-tab-${s.id}`}
          className={py.scenarioPanel}
        >
          <h3 className={py.scenarioTitle}>{s.title}</h3>
          {s.description.map((para) => (
            <p key={para.slice(0, 40)} className={py.scenarioDesc}>
              {para}
            </p>
          ))}

          <div className={py.profileBand}>
            <div className={py.profileCard}>
              <div className={py.profileTop}>
                <div
                  className={`${py.avatar}${s.userA.initial.length > 1 ? ` ${py.avatarCompact}` : ""}`}
                  aria-hidden
                >
                  {s.userA.initial}
                </div>
                <div className={py.profileMeta}>
                  <p className={py.profileName}>{s.userA.name}</p>
                  <span className={`${py.badge} ${s.userA.badge === "Free" ? py.badgeFree : ""}`}>
                    {s.userA.badge}
                  </span>
                </div>
              </div>
              <ul className={py.profileLines}>
                {s.userA.lines.map((line) => (
                  <li key={line} className={py.profileLine}>
                    {line}
                  </li>
                ))}
              </ul>
            </div>

            <div className={py.profileArrow} aria-hidden>
              ↔
            </div>

            <div className={py.profileCard}>
              <div className={py.profileTop}>
                <div
                  className={`${py.avatar}${s.userB.initial.length > 1 ? ` ${py.avatarCompact}` : ""}`}
                  aria-hidden
                >
                  {s.userB.initial}
                </div>
                <div className={py.profileMeta}>
                  <p className={py.profileName}>{s.userB.name}</p>
                  <span className={`${py.badge} ${s.userB.badge === "Free" ? py.badgeFree : ""}`}>
                    {s.userB.badge}
                  </span>
                </div>
              </div>
              <ul className={py.profileLines}>
                {s.userB.lines.map((line) => (
                  <li key={line} className={py.profileLine}>
                    {line}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className={py.phoneRow}>
            <ScenarioPhoneFrame slot={s.phoneLeft} designW={designW} designH={designH} />
            <ScenarioPhoneFrame slot={s.phoneRight} designW={designW} designH={designH} />
          </div>
        </article>

        <div className={py.pipelineSection}>
          <p className={py.prototypeSegmentPill}>{vc.eyebrow}</p>
          <div className={py.pipelineIntro}>
            {vc.intro.map((para, i) => (
              <p key={i} className={py.pipelineIntroBody}>
                {para}
              </p>
            ))}
          </div>
          <div className={py.pipelineShell}>
            <VibeCodingPipelineDiagram ariaLabel={vc.diagramAriaLabel} bullets={vc.prdBullets} />
          </div>
        </div>
      </div>
      </div>
    </section>
  );
}
