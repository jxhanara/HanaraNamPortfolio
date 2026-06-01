import "server-only";
import { createClient } from "@supabase/supabase-js";

// Service-role client. NEVER import this from a client component — the service
// key bypasses Row Level Security and must stay on the server only.
const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

export const supabaseAdmin = createClient(url, serviceKey, {
  auth: { persistSession: false, autoRefreshToken: false },
});
