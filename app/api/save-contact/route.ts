import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as { visitorId?: string; contactInfo?: string };
    if (!body.visitorId || typeof body.contactInfo !== "string") {
      return NextResponse.json({ ok: false }, { status: 400 });
    }
    await supabaseAdmin
      .from("visitors")
      .update({ contact_info: body.contactInfo })
      .eq("id", body.visitorId);
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
