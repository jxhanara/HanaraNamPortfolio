"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { bumblePrototypeInteractive } from "@/content/bumbleFlowCaseStudy";
import py from "./bumblePrototypePyramid.module.css";

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

/** Vibe coding pipeline diagram — nested inside the Prototype section. */
export function BumbleVibeCodingPipelineBlock() {
  const vc = bumblePrototypeInteractive.vibeCoding;

  return (
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
  );
}
