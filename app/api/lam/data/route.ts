import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { isAdminAuthed } from "@/lib/lamAdminAuth";

export async function GET() {
  if (!isAdminAuthed()) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }

  try {
    const [v, a, t, q] = await Promise.all([
      supabaseAdmin.from("visitors").select("*").order("last_seen_at", { ascending: false }),
      supabaseAdmin.from("annotations").select("*"),
      supabaseAdmin.from("threads").select("*").order("created_at", { ascending: true }),
      supabaseAdmin.from("questions").select("*").order("created_at", { ascending: false }),
    ]);

    // Be resilient: a single missing/misconfigured table shouldn't blank the
    // whole dashboard. Log the offenders and return whatever loaded.
    const warnings: string[] = [];
    for (const [name, res] of [
      ["visitors", v],
      ["annotations", a],
      ["threads", t],
      ["questions", q],
    ] as const) {
      if (res.error) {
        warnings.push(`${name}: ${res.error.message}`);
        console.warn(`[lam/data] ${name} query failed:`, res.error.message);
      }
    }

    return NextResponse.json({
      ok: true,
      visitors: v.data ?? [],
      annotations: a.data ?? [],
      threads: t.data ?? [],
      questions: q.data ?? [],
      warnings,
    });
  } catch (e) {
    return NextResponse.json(
      { ok: false, error: e instanceof Error ? e.message : "error" },
      { status: 500 },
    );
  }
}
