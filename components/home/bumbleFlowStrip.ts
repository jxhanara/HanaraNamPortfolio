import type { MediaStripVideoSource } from "./MediaStripVideoCell";

/** `assets/bumbleflow/BumbleFlow_PremiumxPremium(Kevin).mov` (served from public). */
const KEVIN_SRC = "/assets/bumbleflow/BumbleFlow_PremiumxPremium(Kevin).mov";

/** Served from `public/assets/bumbleflow/` (left → right). */
export const BUMBLE_FLOW_STRIP_VIDEOS: readonly MediaStripVideoSource[] = [
  { src: KEVIN_SRC, start: 3, end: 71 },
  { src: KEVIN_SRC, start: 76 },
  { src: "/assets/bumbleflow/BumbleFlow_EdgeCase.mov" },
];
