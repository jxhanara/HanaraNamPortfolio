"use client";

import { useCallback, useEffect, useState } from "react";
import Image, { type StaticImageData } from "next/image";
import { caseStudyResponsiveImageStyle } from "../caseStudyMedia";
import u from "./uiForAiCaseStudy.module.css";

export type WhatChangedSlide = {
  src: StaticImageData;
  alt: string;
};

type Props = {
  slides: readonly WhatChangedSlide[];
};

export function UiForAiWhatChangedGallery({ slides }: Props) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const close = useCallback(() => setOpenIndex(null), []);

  const goPrev = useCallback(() => {
    setOpenIndex((current) =>
      current === null ? null : (current - 1 + slides.length) % slides.length,
    );
  }, [slides.length]);

  const goNext = useCallback(() => {
    setOpenIndex((current) =>
      current === null ? null : (current + 1) % slides.length,
    );
  }, [slides.length]);

  useEffect(() => {
    if (openIndex === null) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
      if (event.key === "ArrowLeft") goPrev();
      if (event.key === "ArrowRight") goNext();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [openIndex, close, goPrev, goNext]);

  const activeSlide = openIndex === null ? null : slides[openIndex];

  return (
    <>
      <div className={u.whatChangedMedia}>
        {slides.map((slide, index) => (
          <button
            key={slide.alt}
            type="button"
            className={`${u.ideaImageFrame} ${u.whatChangedThumb}`}
            onClick={() => setOpenIndex(index)}
            aria-label={`View enlarged: ${slide.alt}`}
          >
            <Image
              src={slide.src}
              alt={slide.alt}
              className={u.ideaImage}
              sizes="(max-width: 600px) 100vw, 50vw"
              style={caseStudyResponsiveImageStyle}
            />
          </button>
        ))}
      </div>

      {activeSlide && openIndex !== null ? (
        <div
          className={u.whatChangedLightbox}
          role="dialog"
          aria-modal="true"
          aria-label="What changed prototype images"
          onClick={close}
        >
          <div
            className={u.whatChangedLightboxPanel}
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              className={u.whatChangedLightboxClose}
              onClick={close}
              aria-label="Close"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path
                  d="M6 6L18 18M18 6L6 18"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            <button
              type="button"
              className={`${u.whatChangedLightboxNav} ${u.whatChangedLightboxNavPrev}`}
              onClick={goPrev}
              aria-label="Previous image"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path
                  d="M15 5L8 12L15 19"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            <div className={u.whatChangedLightboxImageWrap}>
              <Image
                src={activeSlide.src}
                alt={activeSlide.alt}
                className={u.whatChangedLightboxImage}
                sizes="(max-width: 1200px) 92vw, 1180px"
                style={caseStudyResponsiveImageStyle}
                priority
              />
            </div>

            <button
              type="button"
              className={`${u.whatChangedLightboxNav} ${u.whatChangedLightboxNavNext}`}
              onClick={goNext}
              aria-label="Next image"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path
                  d="M9 5L16 12L9 19"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            <div className={u.whatChangedLightboxDots} role="tablist" aria-label="Image pagination">
              {slides.map((slide, index) => (
                <button
                  key={slide.alt}
                  type="button"
                  role="tab"
                  aria-selected={index === openIndex}
                  aria-label={`Image ${index + 1} of ${slides.length}`}
                  className={`${u.whatChangedLightboxDot} ${
                    index === openIndex ? u.whatChangedLightboxDotActive : ""
                  }`}
                  onClick={() => setOpenIndex(index)}
                />
              ))}
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
