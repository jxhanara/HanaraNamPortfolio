/** Inline style so Next/Image keeps intrinsic aspect ratio at fluid width. */
export const caseStudyResponsiveImageStyle = {
  width: "100%",
  height: "auto",
} as const;

/** Default sizes for full-rail case study art (matches --case-study-rail). */
export const caseStudyRailImageSizes =
  "(max-width: 1024px) 100vw, min(1180px, 92vw)";
