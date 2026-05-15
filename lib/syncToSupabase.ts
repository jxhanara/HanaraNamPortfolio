import { supabase } from "./supabase";
import type { AnnotationItem } from "@/components/leaveAMark/types";
import type { VisitorCard } from "@/components/leaveAMark/types";

export async function syncVisitor(card: VisitorCard): Promise<void> {
  try {
    await supabase.from("visitors").upsert(
      {
        id: card.id,
        name: card.name,
        color: card.color,
        no: card.no,
        last_seen_at: new Date().toISOString(),
      },
      { onConflict: "id" },
    );
  } catch {
    /* localStorage is source of truth */
  }
}

export async function syncAnnotation(
  visitorId: string,
  pagePath: string,
  item: AnnotationItem,
): Promise<void> {
  try {
    await supabase.from("annotations").upsert(
      {
        id: item.id,
        visitor_id: visitorId,
        page_path: pagePath,
        kind: item.kind,
        x: item.x,
        y: item.y,
        text: item.text,
        session_id: item.sessionId ?? new Date().toISOString().slice(0, 10),
        status: item.status ?? "open",
      },
      { onConflict: "id" },
    );

    if (item.thread && item.thread.length > 0) {
      for (const msg of item.thread) {
        await supabase.from("threads").upsert(
          {
            annotation_id: item.id,
            from_role: msg.from,
            text: msg.text,
            created_at: new Date(msg.at).toISOString(),
          },
          { onConflict: "annotation_id,created_at" },
        );
      }
    }
  } catch {
    /* silent fail */
  }
}

export async function syncPageAnnotations(
  visitorId: string,
  pagePath: string,
  items: AnnotationItem[],
): Promise<void> {
  for (const item of items) {
    await syncAnnotation(visitorId, pagePath, item);
  }
}

export async function syncContactInfo(visitorId: string, contactInfo: string): Promise<void> {
  try {
    await supabase.from("visitors").update({ contact_info: contactInfo }).eq("id", visitorId);
  } catch {
    /* silent fail */
  }
}
