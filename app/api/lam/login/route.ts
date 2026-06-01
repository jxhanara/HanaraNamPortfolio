import { NextResponse } from "next/server";
import { adminCode, LAM_ADMIN_COOKIE } from "@/lib/lamAdminAuth";

export async function POST(req: Request) {
  let body: { code?: string };
  try {
    body = (await req.json()) as { code?: string };
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  const code = adminCode();
  if (!code) {
    return NextResponse.json({ ok: false, error: "no passcode configured" }, { status: 500 });
  }
  if (body.code !== code) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }

  const res = NextResponse.json({ ok: true });
  res.cookies.set(LAM_ADMIN_COOKIE, code, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 30, // 30 days
  });
  return res;
}
