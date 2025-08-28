import { createClient } from '@supabase/supabase-js';

const rawUrl = (import.meta.env.VITE_SUPABASE_URL || '').trim();
const rawKey = (import.meta.env.VITE_SUPABASE_ANON_KEY || '').trim();
const safeKey = rawKey.replace(/[\r\n\t ]+/g, '');

if (!rawUrl) console.error('[Supabase] VITE_SUPABASE_URL is empty');
if (!rawKey) console.error('[Supabase] VITE_SUPABASE_ANON_KEY is empty');
if (/\s/.test(rawKey)) console.warn('[Supabase] ANON key had whitespace; sanitized (dev only).');

export const supabase = createClient(rawUrl, safeKey, {
  auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: true },
});