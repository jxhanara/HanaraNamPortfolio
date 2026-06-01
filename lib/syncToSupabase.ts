import type { AnnotationItem } from "@/components/leaveAMark/types";
import type { VisitorCard } from "@/components/leaveAMark/types";

// All Supabase writes now go through the server route /api/lam/track, which uses
// the service-role key. The browser never talks to Supabase directly, so the
// database can stay fully locked down with RLS. localStorage remains the source
// of truth for the visitor's own session, so these calls fail quietly.

/** An annotation with no text and no conversation is a placeholder the visitor abandoned. */
export function isEmptyAnnotation(item: {
  text?: string;
  thread?: { text: string }[];
}): boolean {
  const hasText = (item.text ?? "").trim().length > 0;
  const hasThread = (item.thread ?? []).some((m) => (m.text ?? "").trim().length > 0);
  return !hasText && !hasThread;
}

async function track(body: Record<string, unknown>): Promise<void> {
  if (typeof window === "undefined") return;
  try {
    await fetch("/api/lam/track", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      keepalive: true,
    });
  } catch {
    /* localStorage is the source of truth */
  }
}

export async function syncVisitor(card: VisitorCard): Promise<void> {
  await track({ kind: "visitor", card });
}

export async function syncPageAnnotations(
  visitorId: string,
  pagePath: string,
  items: AnnotationItem[],
): Promise<void> {
  const meaningful = items.filter((it) => !isEmptyAnnotation(it));
  if (meaningful.length === 0) return;
  await track({ kind: "annotations", visitorId, pagePath, items: meaningful });
}

export async function syncContactInfo(visitorId: string, contactInfo: string): Promise<void> {
  await track({ kind: "contact", visitorId, contactInfo });
}

export type LoggedQuestion = {
  visitorId?: string | null;
  visitorName?: string | null;
  pagePath?: string | null;
  question: string;
  answer: string;
  matched: boolean;
  kind?: string | null;
};

/** Records every visitor question + whether the library could answer it (for growing the library). */
export async function logQuestion(q: LoggedQuestion): Promise<void> {
  if (!q.question.trim()) return;
  await track({
    kind: "question",
    visitorId: q.visitorId ?? null,
    visitorName: q.visitorName ?? null,
    pagePath: q.pagePath ?? null,
    question: q.question,
    answer: q.answer,
    matched: q.matched,
    questionKind: q.kind ?? null,
  });
}
