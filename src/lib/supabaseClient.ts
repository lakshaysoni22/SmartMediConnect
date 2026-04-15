import { createClient, type SupabaseClient } from '@supabase/supabase-js';

const projectRef = (import.meta.env.VITE_SUPABASE_PROJECT_REF as string | undefined)?.trim();
const explicitUrl = (import.meta.env.VITE_SUPABASE_URL as string | undefined)?.trim();

/** Full URL, or built from project ref: https://<ref>.supabase.co */
const supabaseUrl =
  explicitUrl ||
  (projectRef && /^[a-z0-9]{15,40}$/i.test(projectRef) ? `https://${projectRef}.supabase.co` : undefined);

const supabaseKey = (
  (import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY as string | undefined) ||
  (import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined)
)?.trim();

let browserClient: SupabaseClient | null = null;

if (import.meta.env.DEV) {
  if (supabaseKey && !supabaseUrl) {
    console.warn(
      '[SmartMediConnect / Supabase] URL missing. Add either:\n' +
        '  • VITE_SUPABASE_URL=https://xxxx.supabase.co\n' +
        '  • OR VITE_SUPABASE_PROJECT_REF=xxxx (from dashboard URL / project settings)\n' +
        'File: .env.local — then restart npm run dev.'
    );
  }
  if (!supabaseKey) {
    console.warn(
      '[SmartMediConnect / Supabase] Add VITE_SUPABASE_PUBLISHABLE_KEY (or VITE_SUPABASE_ANON_KEY) in .env.local'
    );
  }
}

/**
 * Returns a singleton Supabase client when URL + publishable (or anon) key are set.
 * Otherwise returns null — callers should no-op gracefully.
 */
export function getSupabase(): SupabaseClient | null {
  if (!supabaseUrl || !supabaseKey) {
    return null;
  }
  if (!browserClient) {
    browserClient = createClient(supabaseUrl, supabaseKey, {
      auth: {
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: true
      }
    });
  }
  return browserClient;
}

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseKey);
