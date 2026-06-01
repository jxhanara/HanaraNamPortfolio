import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { isEmptyAnnotation } from "@/lib/syncToSupabase";

type ThreadMsg = { from: "visitor" | "ai"; text: string; at: number };
type AnnItem = {
  id: string;
  kind: string;
  x: number;
  y: number;
  text: string;
  status?: "open" | "resolved";
  sessionId?: string;
  thread?: ThreadMsg[];
};

function check(context: string, error: unknown): void {
  if (!error) return;
  const e = error as { message?: string; code?: string; details?: string; hint?: string };
  const msg =
    e.message ?? (typeof error === "string" ? error : JSON.stringify(error)) ?? "error";
  const full = `${context}: ${msg}` + (e.code ? ` (code ${e.code})` : "") + (e.hint ? ` | ${e.hint}` : "");
  console.warn(`[lam/track] ${full}`);
  throw new Error(full);
}

async function writeAnnotation(visitorId: string, pagePath: string, item: AnnItem) {
  if (isEmptyAnnotation(item)) return;
  const { error } = await supabaseAdmin.from("annotations").upsert(
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
  check("annotations upsert", error);

  for (const msg of item.thread ?? []) {
    if (!msg.text?.trim()) continue;
    const { error: tErr } = await supabaseAdmin.from("threads").upsert(
      {
        annotation_id: item.id,
        from_role: msg.from,
        text: msg.text,
        created_at: new Date(msg.at).toISOString(),
      },
      { onConflict: "annotation_id,created_at" },
    );
    check("threads upsert", tErr);
  }
}

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = (await req.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  try {
    const kind = body.kind as string;

    if (kind === "visitor") {
      const card = body.card as { id: string; name: string; color: string; no: string };
      if (!card?.id) return NextResponse.json({ ok: false }, { status: 400 });
      const { error } = await supabaseAdmin.from("visitors").upsert(
        {
          id: card.id,
          name: card.name,
          color: card.color,
          no: card.no,
          last_seen_at: new Date().toISOString(),
        },
        { onConflict: "id" },
      );
      check("visitors upsert", error);
      return NextResponse.json({ ok: true });
    }

    if (kind === "annotations") {
      const visitorId = body.visitorId as string;
      const pagePath = body.pagePath as string;
      const items = (body.items as AnnItem[]) ?? [];
      if (!visitorId || !pagePath) return NextResponse.json({ ok: false }, { status: 400 });
      for (const item of items) {
        await writeAnnotation(visitorId, pagePath, item);
      }
      return NextResponse.json({ ok: true });
    }

    if (kind === "question") {
      const question = (body.question as string) ?? "";
      if (!question.trim()) return NextResponse.json({ ok: true });
      const { error } = await supabaseAdmin.from("questions").insert({
        visitor_id: (body.visitorId as string) ?? null,
        visitor_name: (body.visitorName as string) ?? null,
        page_path: (body.pagePath as string) ?? null,
        question,
        answer: (body.answer as string) ?? "",
        matched: Boolean(body.matched),
        kind: (body.questionKind as string) ?? null,
      });
      check("questions insert", error);
      return NextResponse.json({ ok: true });
    }

    if (kind === "contact") {
      const visitorId = body.visitorId as string;
      const contactInfo = body.contactInfo as string;
      if (!visitorId || typeof contactInfo !== "string") {
        return NextResponse.json({ ok: false }, { status: 400 });
      }
      const { error } = await supabaseAdmin
        .from("visitors")
        .update({ contact_info: contactInfo })
        .eq("id", visitorId);
      check("contact update", error);
      return NextResponse.json({ ok: true });
    }

    return NextResponse.json({ ok: false, error: "unknown kind" }, { status: 400 });
  } catch (e) {
    return NextResponse.json(
      { ok: false, error: e instanceof Error ? e.message : "error" },
      { status: 500 },
    );
  }
}
