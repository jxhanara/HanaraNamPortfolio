import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { isAdminAuthed } from "@/lib/lamAdminAuth";

export async function GET(req: Request) {
  // Replaying a visitor's session is owner-only — same gate as the dashboard.
  if (!isAdminAuthed()) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const visitorId = searchParams.get("visitorId");
  const page = searchParams.get("page");
  if (!visitorId || !page) {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  try {
    const [vRes, aRes] = await Promise.all([
      supabaseAdmin.from("visitors").select("id,name,color").eq("id", visitorId).maybeSingle(),
      supabaseAdmin
        .from("annotations")
        .select("*")
        .eq("visitor_id", visitorId)
        .eq("page_path", page),
    ]);
    const annotations = aRes.data ?? [];
    const ids = annotations.map((a) => a.id as string);

    let threads: unknown[] = [];
    if (ids.length) {
      const tRes = await supabaseAdmin
        .from("threads")
        .select("*")
        .in("annotation_id", ids)
        .order("created_at", { ascending: true });
      threads = tRes.data ?? [];
    }

    return NextResponse.json({
      ok: true,
      visitor: vRes.data ?? null,
      annotations,
      threads,
    });
  } catch (e) {
    return NextResponse.json(
      { ok: false, error: e instanceof Error ? e.message : "error" },
      { status: 500 },
    );
  }
}
