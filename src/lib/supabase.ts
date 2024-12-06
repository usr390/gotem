import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
  }
});

// Log when Supabase client is initialized
console.log('🔌 Supabase client initialized');

// Check if we have a session at startup
const session = localStorage.getItem('sb-' + supabaseUrl + '-auth-token');
console.log('📦 Initial stored session:', !!session);