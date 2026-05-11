import {
  ACTIVE_VISITOR_ID_KEY,
  LEGACY_CARD_STORAGE_KEY,
  visitorStorageKey,
} from "./constants";
import { normalizePagePath } from "./pagePath";
import type {
  PageAnnotations,
  VisitorCardMeta,
  VisitorStoredDocument,
} from "./types";

type LegacyVisitorBlob = {
  id?: string;
  name?: string;
  color?: VisitorCardMeta["color"];
  no?: string;
  createdAt?: string;
  annotations?: PageAnnotations;
};

function emptyPage(): PageAnnotations {
  return { items: [], strokes: [] };
}

function clonePageAnnotations(a: PageAnnotations): PageAnnotations {
  return JSON.parse(JSON.stringify(a)) as PageAnnotations;
}

function stripTransient(annotations: PageAnnotations): PageAnnotations {
  return {
    items: annotations.items.map(({ _fresh, ...r }) => r),
    strokes: annotations.strokes.map((s) => {
      const { _tmp, ...r } = s;
      return r;
    }),
  };
}

/** One-time migration from flat `leaveAMark.v1` → `hanara-portfolio-visitor-{id}`. */
export function tryMigrateLegacyStorage(): void {
  if (typeof window === "undefined") return;
  const raw = localStorage.getItem(LEGACY_CARD_STORAGE_KEY);
  if (!raw) return;
  try {
    const legacy = JSON.parse(raw) as LegacyVisitorBlob;
    const id = legacy.id;
    if (!id || typeof id !== "string") return;
    const card: VisitorCardMeta = {
      id,
      name: typeof legacy.name === "string" ? legacy.name : "",
      color: legacy.color ?? "aurora",
      no: typeof legacy.no === "string" ? legacy.no : "",
      createdAt: typeof legacy.createdAt === "string" ? legacy.createdAt : "",
    };
    const ann = legacy.annotations ?? emptyPage();
    const doc: VisitorStoredDocument = {
      card,
      annotationsByPage: {
        "/": {
          items: Array.isArray(ann.items) ? ann.items : [],
          strokes: Array.isArray(ann.strokes) ? ann.strokes : [],
        },
      },
    };
    localStorage.setItem(visitorStorageKey(id), JSON.stringify(doc));
    localStorage.setItem(ACTIVE_VISITOR_ID_KEY, id);
    localStorage.removeItem(LEGACY_CARD_STORAGE_KEY);
  } catch {
    /* ignore corrupt legacy */
  }
}

export function getActiveVisitorId(): string | null {
  if (typeof window === "undefined") return null;
  try {
    const id = localStorage.getItem(ACTIVE_VISITOR_ID_KEY);
    return id && id.length > 0 ? id : null;
  } catch {
    return null;
  }
}

export function setActiveVisitorId(id: string): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(ACTIVE_VISITOR_ID_KEY, id);
  } catch {
    /* ignore */
  }
}

function normalizeStoredDoc(raw: unknown): VisitorStoredDocument | null {
  if (!raw || typeof raw !== "object") return null;
  const o = raw as Record<string, unknown>;
  const c = o.card as VisitorCardMeta | undefined;
  if (!c?.id) return null;
  const byPage = o.annotationsByPage;
  const annotationsByPage: Record<string, PageAnnotations> = {};
  if (byPage && typeof byPage === "object") {
    for (const [k, v] of Object.entries(byPage as Record<string, PageAnnotations>)) {
      if (!v || typeof v !== "object") continue;
      annotationsByPage[k] = {
        items: Array.isArray(v.items) ? v.items : [],
        strokes: Array.isArray(v.strokes) ? v.strokes : [],
      };
    }
  }
  return { card: c, annotationsByPage };
}

export function readVisitorDocument(visitorId: string): VisitorStoredDocument | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(visitorStorageKey(visitorId));
    if (!raw) return null;
    return normalizeStoredDoc(JSON.parse(raw));
  } catch {
    return null;
  }
}

export function writeVisitorDocument(visitorId: string, doc: VisitorStoredDocument): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(visitorStorageKey(visitorId), JSON.stringify(doc));
  } catch {
    /* ignore quota */
  }
}

export function loadActiveVisitorCard(): VisitorCardMeta | null {
  tryMigrateLegacyStorage();
  if (typeof window === "undefined") return null;
  const id = getActiveVisitorId();
  if (!id) return null;
  const doc = readVisitorDocument(id);
  if (!doc) {
    try {
      localStorage.removeItem(ACTIVE_VISITOR_ID_KEY);
    } catch {
      /* ignore */
    }
    return null;
  }
  return doc.card;
}

export function loadAnnotationsForPage(visitorId: string, pathname: string): PageAnnotations {
  const doc = readVisitorDocument(visitorId);
  if (!doc) return emptyPage();
  const key = normalizePagePath(pathname);
  const raw = doc.annotationsByPage[key];
  if (!raw) return emptyPage();
  return clonePageAnnotations({
    items: raw.items ?? [],
    strokes: raw.strokes ?? [],
  });
}

export function savePageAnnotations(
  visitorId: string,
  pathname: string,
  annotations: PageAnnotations,
): void {
  const doc = readVisitorDocument(visitorId);
  if (!doc) return;
  const key = normalizePagePath(pathname);
  doc.annotationsByPage[key] = stripTransient(annotations);
  writeVisitorDocument(visitorId, doc);
}

export function saveVisitorCardMeta(meta: VisitorCardMeta): void {
  let doc = readVisitorDocument(meta.id);
  if (!doc) {
    doc = { card: { ...meta }, annotationsByPage: {} };
  } else {
    doc = { ...doc, card: { ...meta } };
  }
  writeVisitorDocument(meta.id, doc);
}

export function saveNewVisitorSession(meta: VisitorCardMeta): void {
  writeVisitorDocument(meta.id, { card: { ...meta }, annotationsByPage: {} });
  setActiveVisitorId(meta.id);
}
