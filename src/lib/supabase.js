// Supabase Client Initialization Helper
import { createClient } from '@supabase/supabase-js';

const envUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseUrl = (envUrl && envUrl.trim() !== '') ? envUrl : 'https://ffmqyqhxuhilsrwxujpd.supabase.co';
const envKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabaseAnonKey = (envKey && envKey.trim() !== '') ? envKey : 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZmbXF5cWh4dWhpbHNyd3h1anBkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODgwODYwMjQsImV4cCI6MjEwMzY2MjAyNH0.CekNQSipRrQuHKZdTJfmZ_lgQ3z6-Rv-onXd6SmnddI';

let supabaseClient;
try {
  supabaseClient = createClient(supabaseUrl, supabaseAnonKey);
} catch (e) {
  console.warn('Supabase client fallback initialized', e);
  supabaseClient = {
    from: () => ({
      select: async () => ({ data: [], error: null }),
      insert: async () => ({ data: [], error: null }),
      upsert: async () => ({ data: [], error: null })
    })
  };
}

export const supabase = supabaseClient;
