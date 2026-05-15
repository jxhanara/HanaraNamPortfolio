import { NextResponse } from "next/server";
import { syncContactInfo } from "@/lib/syncToSupabase";

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as { visitorId?: string; contactInfo?: string };
    if (!body.visitorId || typeof body.contactInfo !== "string") {
      return NextResponse.json({ ok: false }, { status: 400 });
    }
    await syncContactInfo(body.visitorId, body.contactInfo);
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
