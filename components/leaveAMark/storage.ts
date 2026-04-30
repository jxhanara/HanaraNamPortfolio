import { STORAGE_KEY } from "./constants";
import type { VisitorCard } from "./types";

export function loadCard(): VisitorCard | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as VisitorCard;
  } catch {
    return null;
  }
}

export function saveCard(c: VisitorCard): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(c));
  } catch {
    /* ignore quota */
  }
}
