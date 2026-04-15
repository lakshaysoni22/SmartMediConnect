/**
 * Validates .env.local key *names* and non-empty values for app features (never prints secret values).
 */
import { readFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';

const envPath = resolve(process.cwd(), '.env.local');

function parseEnv(raw) {
  /** @type {Record<string, string>} */
  const out = {};
  for (const line of raw.split('\n')) {
    const t = line.trim();
    if (!t || t.startsWith('#')) continue;
    const eq = t.indexOf('=');
    if (eq === -1) continue;
    const k = t.slice(0, eq).trim();
    let v = t.slice(eq + 1).trim();
    if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'"))) {
      v = v.slice(1, -1);
    }
    out[k] = v;
  }
  return out;
}

if (!existsSync(envPath)) {
  console.error('[check-env] No .env.local — copy .env.example and rename.');
  process.exit(1);
}

const env = parseEnv(readFileSync(envPath, 'utf8'));
const has = (k) => Boolean(env[k]?.trim());

const ref = env.VITE_SUPABASE_PROJECT_REF?.trim() ?? '';
const refOk = ref && /^[a-z0-9]{15,40}$/i.test(ref);
const supabaseUrlOk = has('VITE_SUPABASE_URL') || refOk;
const supabaseKeyOk = has('VITE_SUPABASE_PUBLISHABLE_KEY') || has('VITE_SUPABASE_ANON_KEY');

console.log('[check-env] .env.local found.');

const refDefined = Object.prototype.hasOwnProperty.call(env, 'VITE_SUPABASE_PROJECT_REF');
const refVal = String(env.VITE_SUPABASE_PROJECT_REF ?? '').trim();
if (refDefined && !refVal) {
  console.error(
    '[check-env] VITE_SUPABASE_PROJECT_REF= is empty — paste your Reference ID after = (Supabase → Project Settings → General).'
  );
}
const urlDefined = Object.prototype.hasOwnProperty.call(env, 'VITE_SUPABASE_URL');
const urlVal = String(env.VITE_SUPABASE_URL ?? '').trim();
if (urlDefined && !urlVal) {
  console.error('[check-env] VITE_SUPABASE_URL is set but empty — use full https://xxxx.supabase.co URL.');
}

if (!supabaseUrlOk) {
  console.warn('[check-env] Supabase URL: set VITE_SUPABASE_URL or valid VITE_SUPABASE_PROJECT_REF.');
}
if (!supabaseKeyOk) {
  console.warn('[check-env] Supabase key: set VITE_SUPABASE_PUBLISHABLE_KEY or VITE_SUPABASE_ANON_KEY.');
}
if (supabaseUrlOk && supabaseKeyOk) {
  console.log('[check-env] Supabase: required variables look OK (names present, non-empty).');
}

if (!has('VITE_GOOGLE_MAPS_API_KEY')) {
  console.warn('[check-env] Maps: VITE_GOOGLE_MAPS_API_KEY missing or empty — Google Maps JS API disabled.');
} else {
  console.log('[check-env] Maps: VITE_GOOGLE_MAPS_API_KEY is set.');
}

if (!has('VITE_GEMINI_API_KEY')) {
  console.log('[check-env] Gemini: optional VITE_GEMINI_API_KEY unset — health bot uses fallbacks.');
} else {
  console.log('[check-env] Gemini: VITE_GEMINI_API_KEY is set.');
}

const supabaseReady = supabaseUrlOk && supabaseKeyOk;
if (!supabaseReady) {
  console.error('[check-env] Fix Supabase env above, then retry. (Optional: run app without check → npm run dev)');
  process.exit(1);
}
process.exit(0);
