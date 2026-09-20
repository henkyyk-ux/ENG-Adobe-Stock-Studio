/**
 * ENG Adobe Stock Studio — Supabase Server Client
 * Uses SUPABASE_SECRET_KEY — server-side only.
 * NEVER import this file from browser/client components.
 */

import { createClient, type SupabaseClient } from '@supabase/supabase-js';

let serverClient: SupabaseClient | null = null;

export function getServerSupabase(): SupabaseClient {
  if (serverClient) return serverClient;

  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SECRET_KEY;

  if (!url || !key) {
    throw new Error(
      'SUPABASE_URL and SUPABASE_SECRET_KEY must be set in environment variables. ' +
      'Copy .env.example to .env.local and fill in your Supabase credentials.'
    );
  }

  serverClient = createClient(url, key, {
    auth: { persistSession: false },
  });

  return serverClient;
}
