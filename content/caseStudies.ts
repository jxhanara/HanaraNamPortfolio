/** Shared promo data for portfolio case studies (home + “More case studies” rails). */

export type CaseStudySlug = "bumble-flow" | "trippy" | "ui-for-ai";

export type CaseStudyPromo = {
  slug: CaseStudySlug;
  title: string;
  description: string;
  href: string;
  imageSrc: string;
  imageAlt: string;
};

export const portfolioCaseStudies: readonly CaseStudyPromo[] = [
  {
    slug: "bumble-flow",
    title: "Bumble Flow",
    description:
      "Redesigning dating from passive matching to active coordination — turning matches into real plans through shared intent and availability.",
    href: "/bumble-flow-case-study",
    imageSrc: "/images/bumbleflowthumbnail.png",
    imageAlt: "Bumble Flow project preview",
  },
  {
    slug: "trippy",
    title: "Trippy",
    description:
      "An intelligent travel planning app — AI-powered itineraries, vibe-based discovery, and local community in one place.",
    href: "/trippy-case-study",
    imageSrc: "/images/trippyportfoliothumbnail.png",
    imageAlt: "Trippy portfolio preview",
  },
  {
    slug: "ui-for-ai",
    title: "UI for AI",
    description:
      "Exploring how AI interfaces can support re-entry, memory, and momentum across interrupted work.",
    href: "/ui-for-ai-case-study",
    imageSrc: "/images/uiforaithumbnail.png",
    imageAlt: "UI for AI project preview",
  },
] as const;
