/**
 * Normalized route key for per-page annotation buckets (runtime pathname).
 * Trailing slashes removed (except root); lowercase.
 */
export function normalizePagePath(pathname: string): string {
  let p = pathname.trim().toLowerCase();
  while (p.length > 1 && p.endsWith("/")) {
    p = p.slice(0, -1);
  }
  return p || "/";
}
