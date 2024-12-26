import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

// Add timeout and error handling
const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true
  },
  global: {
    fetch: (url, options = {}) => {
      const timeout = 10000; // 10 seconds timeout
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), timeout);

      return fetch(url, {
        ...options,
        signal: controller.signal
      }).finally(() => clearTimeout(timeoutId));
    }
  }
});

// Test connection immediately
supabase.from('public_sessions').select('count', { count: 'exact', head: true })
  .then(() => {
    console.log('Supabase connection successful');
  })
  .catch(error => {
    console.error('Supabase connection error:', error);
  });

export { supabase };