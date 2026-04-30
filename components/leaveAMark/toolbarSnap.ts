import type { ToolbarDock, ToolbarPos } from "./types";

const MARGIN = 8;
/** Release anywhere within this distance of an edge snaps flush to that wall. */
const STICK_RELEASE = 120;
/** While dragging, pull to the wall within this distance. */
const STICK_DRAG = 72;

function inferDock(nx: number, ny: number, barW: number, barH: number): ToolbarDock {
  const atLeft = Math.abs(nx - MARGIN) < 4;
  const atRight = Math.abs(nx - (window.innerWidth - barW - MARGIN)) < 4;
  if (atLeft) return "left";
  if (atRight) return "right";
  void ny;
  void barH;
  return "none";
}

function clampXY(x: number, y: number, barW: number, barH: number): { x: number; y: number } {
  return {
    x: Math.max(MARGIN, Math.min(window.innerWidth - barW - MARGIN, x)),
    y: Math.max(MARGIN, Math.min(window.innerHeight - barH - MARGIN, y)),
  };
}

/** Clamp toolbar top-left so the full bar stays inside the viewport. */
export function clampToolbarIntoViewport(
  x: number,
  y: number,
  barW: number,
  barH: number,
): ToolbarPos {
  const { x: nx, y: ny } = clampXY(x, y, barW, barH);
  return { x: nx, y: ny, dock: inferDock(nx, ny, barW, barH) };
}

/** During drag: magnet to nearest viewport edge when close. */
export function magneticDragPosition(
  x: number,
  y: number,
  barW: number,
  barH: number,
): ToolbarPos {
  let { x: nx, y: ny } = clampXY(x, y, barW, barH);
  const distL = nx - MARGIN;
  const distR = window.innerWidth - barW - MARGIN - nx;
  const distT = ny - MARGIN;
  const distB = window.innerHeight - barH - MARGIN - ny;
  if (distL < STICK_DRAG && distL <= distR) nx = MARGIN;
  else if (distR < STICK_DRAG) nx = window.innerWidth - barW - MARGIN;
  if (distT < STICK_DRAG && distT <= distB) ny = MARGIN;
  else if (distB < STICK_DRAG) ny = window.innerHeight - barH - MARGIN;
  return { x: nx, y: ny, dock: inferDock(nx, ny, barW, barH) };
}

/** On pointer up: always stick to the nearest wall if within STICK_RELEASE of any edge. */
export function snapToolbarPosition(x: number, y: number, barW: number, barH: number): ToolbarPos {
  let { x: nx, y: ny } = clampXY(x, y, barW, barH);
  const distL = nx - MARGIN;
  const distR = window.innerWidth - barW - MARGIN - nx;
  const distT = ny - MARGIN;
  const distB = window.innerHeight - barH - MARGIN - ny;
  if (distL < STICK_RELEASE && distL <= distR) nx = MARGIN;
  else if (distR < STICK_RELEASE) nx = window.innerWidth - barW - MARGIN;
  if (distT < STICK_RELEASE && distT <= distB) ny = MARGIN;
  else if (distB < STICK_RELEASE) ny = window.innerHeight - barH - MARGIN;
  return { x: nx, y: ny, dock: inferDock(nx, ny, barW, barH) };
}
