import { createClient } from '@supabase/supabase-js';

// Supabase client configuration - provide defaults for missing env vars
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://tbvfyhtkrvetmcibalfb.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRidmZ5aHRrcnZldG1jaWJhbGZiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTYyMzg3MzYsImV4cCI6MjA3MTgxNDczNn0.depr2savD-hvx6f18aZJLfvg7oWBLBxlDu4q9tmkg3w';

// Always log configuration to debug
console.log('🔧 Supabase Configuration:', {
  url: supabaseUrl || 'NOT SET',
  hasKey: !!supabaseAnonKey,
  keyLength: supabaseAnonKey.length,
  env: import.meta.env
});

// Validate configuration
if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Supabase configuration is missing!');
  if (import.meta.env.DEV) {
    console.error('URL:', supabaseUrl);
    console.error('Key exists:', !!supabaseAnonKey);
  }
}

// Create Supabase client with proper auth settings
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    storageKey: 'sb-tbvfyhtkrvetmcibalfb-auth-token', // Use full storage key
    storage: window.localStorage,
    detectSessionInUrl: true,
    autoRefreshToken: true,
    flowType: 'pkce', // Use PKCE flow for better security
    debug: import.meta.env.DEV // Enable debug mode only in development
  }
});

// Database types (to be generated from Supabase)
export interface Profile {
  id: string;
  username: string;
  full_name?: string;
  avatar_url?: string;
  bio?: string;
  created_at: string;
  updated_at: string;
}

export interface Tool {
  id: string;
  name: string;
  slug: string;
  description: string;
  logo_url?: string;
  logo_emoji?: string;
  category: string;
  pricing: 'Free' | 'Freemium' | 'Paid' | 'Enterprise';
  website_url?: string;
  features?: string[];
  tags?: string[];
  rating: number;
  review_count: number;
  created_at: string;
  updated_at: string;
}

export interface Review {
  id: string;
  tool_id: string;
  user_id: string;
  rating: number;
  title?: string;
  content: string;
  pros?: string[];
  cons?: string[];
  created_at: string;
  updated_at: string;
}

export interface UserFavorite {
  id: string;
  user_id: string;
  tool_id: string;
  created_at: string;
}

export interface Collection {
  id: string;
  user_id: string;
  name: string;
  description?: string;
  is_public: boolean;
  created_at: string;
  updated_at: string;
}

export interface CollectionTool {
  id: string;
  collection_id: string;
  tool_id: string;
  added_at: string;
}