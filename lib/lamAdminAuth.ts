import "server-only";
import { cookies } from "next/headers";

export const LAM_ADMIN_COOKIE = "lam_admin";

/** Server-only passcode. Falls back to the legacy public var so local dev keeps working. */
export function adminCode(): string {
  return process.env.LAM_ADMIN_CODE ?? process.env.NEXT_PUBLIC_LAM_ADMIN_CODE ?? "";
}

/** True when the request carries a valid admin session cookie. */
export function isAdminAuthed(): boolean {
  const code = adminCode();
  if (!code) return false; // no passcode configured → treat as locked
  const jar = cookies();
  return jar.get(LAM_ADMIN_COOKIE)?.value === code;
}
