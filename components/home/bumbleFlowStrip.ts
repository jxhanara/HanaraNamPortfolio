import type { MediaStripVideoSource } from "./MediaStripVideoCell";

/** Web-optimized export of `BumbleFlow_Kevin` (served from public). */
const KEVIN_SRC = "/assets/bumbleflow/BumbleFlow_Kevin.mp4";

/** Served from `public/assets/bumbleflow/` (left → right). */
export const BUMBLE_FLOW_STRIP_VIDEOS: readonly MediaStripVideoSource[] = [
  { src: KEVIN_SRC, start: 3, end: 71 },
  { src: KEVIN_SRC, start: 76 },
  { src: "/assets/bumbleflow/BumbleFlow_EdgeCase.mp4" },
];
