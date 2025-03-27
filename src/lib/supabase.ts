
import { createClient } from '@supabase/supabase-js';
import { Database } from './database.types';

// Check for environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// Create a mock Supabase client when credentials are missing
const createMockClient = () => {
  console.warn('Using mock Supabase client. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your environment variables for production use.');
  
  return {
    from: () => ({
      select: () => ({
        eq: () => ({
          single: () => Promise.resolve({ data: null, error: null }),
          data: null,
          error: null
        }),
        data: null,
        error: null
      }),
      insert: () => ({
        select: () => ({
          single: () => Promise.resolve({ data: null, error: null })
        }),
        data: null,
        error: null
      }),
      update: () => ({
        eq: () => Promise.resolve({ data: null, error: null }),
        data: null,
        error: null
      }),
      delete: () => ({
        eq: () => Promise.resolve({ data: null, error: null }),
        data: null,
        error: null
      })
    }),
    auth: {
      getSession: () => Promise.resolve({ data: { session: null } }),
      onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
      signUp: () => Promise.resolve({ data: null, error: null }),
      signInWithPassword: () => Promise.resolve({ data: null, error: null }),
      signOut: () => Promise.resolve({ error: null }),
      resetPasswordForEmail: () => Promise.resolve({ data: null, error: null })
    }
  };
};

// Create either a real client or a mock one depending on environment variables
export const supabase = (supabaseUrl && supabaseAnonKey) 
  ? createClient<Database>(supabaseUrl, supabaseAnonKey)
  : createMockClient() as unknown as ReturnType<typeof createClient<Database>>;

// Define the Database type for type checking
export type { Database };
