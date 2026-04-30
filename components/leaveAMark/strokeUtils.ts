import type { Stroke } from "./types";

export type Pt = { x: number; y: number };

export function distPointToSegment(
  px: number,
  py: number,
  ax: number,
  ay: number,
  bx: number,
  by: number,
): number {
  const abx = bx - ax;
  const aby = by - ay;
  const apx = px - ax;
  const apy = py - ay;
  const ab2 = abx * abx + aby * aby || 1e-9;
  let t = (apx * abx + apy * aby) / ab2;
  t = Math.max(0, Math.min(1, t));
  const qx = ax + t * abx;
  const qy = ay + t * aby;
  return Math.hypot(px - qx, py - qy);
}

export function minDistToStroke(px: number, py: number, points: Pt[]): number {
  if (points.length < 2) return Math.hypot(px - points[0].x, py - points[0].y);
  let m = Infinity;
  for (let i = 1; i < points.length; i++) {
    m = Math.min(
      m,
      distPointToSegment(px, py, points[i - 1].x, points[i - 1].y, points[i].x, points[i].y),
    );
  }
  return m;
}

/** Collapse highlight to a horizontal line across the stroke’s span. */
export function straightenHighlightPoints(points: Pt[]): Pt[] {
  if (points.length < 2) return points;
  const xs = points.map((p) => p.x);
  const ys = points.map((p) => p.y);
  const minX = Math.min(...xs);
  const maxX = Math.max(...xs);
  const y = ys.reduce((a, b) => a + b, 0) / ys.length;
  return [
    { x: minX, y },
    { x: maxX, y },
  ];
}

const TEXT_TAGS = new Set([
  "P",
  "SPAN",
  "H1",
  "H2",
  "H3",
  "H4",
  "H5",
  "H6",
  "LI",
  "A",
  "STRONG",
  "EM",
  "B",
  "I",
  "TD",
  "TH",
  "FIGCAPTION",
  "BLOCKQUOTE",
  "LABEL",
]);

const BLOCK_TEXT_TAGS = new Set([
  "DIV",
  "SECTION",
  "ARTICLE",
  "MAIN",
  "ASIDE",
  "HEADER",
  "FOOTER",
  "FIGURE",
  "TIME",
]);

function hasMeaningfulText(el: Element): boolean {
  const txt = el.textContent?.replace(/\s+/g, " ").trim();
  return !!txt && txt.length >= 2;
}

function isBlockTextCarrier(el: Element): boolean {
  if (!BLOCK_TEXT_TAGS.has(el.tagName)) return false;
  const txt = el.textContent?.replace(/\s+/g, " ").trim();
  if (!txt || txt.length < 8) return false;
  const style = window.getComputedStyle(el);
  if (style.visibility === "hidden" || style.display === "none" || Number(style.opacity) === 0) return false;
  return true;
}

function isLamOverlayElement(el: Element): boolean {
  return Boolean(el.closest("[data-lam-ui]") || el.closest("[data-lam-item]"));
}

/**
 * True if any sample point lies over readable page text (skips drawing layer / LAM UI
 * so hits resolve to content underneath).
 */
export function strokeSamplesOverReadableText(points: Pt[], samples = 7): boolean {
  if (typeof document === "undefined" || points.length === 0) return false;
  const n = Math.max(2, Math.min(samples, points.length));
  for (let i = 0; i < n; i++) {
    const t = n === 1 ? 0 : i / (n - 1);
    const idx = Math.round(t * (points.length - 1));
    const { x, y } = points[idx];
    const vx = x - window.scrollX;
    const vy = y - window.scrollY;
    if (vx < 0 || vy < 0 || vx > window.innerWidth || vy > window.innerHeight) continue;
    const stack = document.elementsFromPoint(vx, vy);
    for (const el of stack) {
      if (!(el instanceof Element)) continue;
      if (isLamOverlayElement(el)) continue;
      if (el instanceof SVGElement) continue;
      if (el.tagName === "SCRIPT" || el.tagName === "STYLE" || el.tagName === "NOSCRIPT") continue;
      if (TEXT_TAGS.has(el.tagName) && hasMeaningfulText(el)) return true;
      if (isBlockTextCarrier(el)) return true;
    }
  }
  return false;
}

export function findStrokeIndexToErase(px: number, py: number, strokes: Stroke[]): number {
  let best = -1;
  let bestD = Infinity;
  strokes.forEach((s, i) => {
    const d = minDistToStroke(px, py, s.points);
    const thresh = s.kind === "highlight" ? 22 : 9;
    if (d <= thresh && d < bestD) {
      bestD = d;
      best = i;
    }
  });
  return best;
}
