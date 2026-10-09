import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Don't crash the whole site when env vars are missing — sections fall back to
// static content, and forms report a friendly error instead.
export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

if (!isSupabaseConfigured) {
  console.warn('Supabase env vars missing (VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY). Using fallback content.');
}

export const supabase = createClient(
  supabaseUrl || 'https://placeholder.supabase.co',
  supabaseAnonKey || 'placeholder-anon-key'
);

export const NOT_CONFIGURED_MESSAGE =
  'Online submissions are temporarily unavailable. Please call or email us instead.';

// ==================== Types ====================

export type MenuCategory = 'coffee' | 'tea' | 'desserts' | 'food' | 'cold_drinks';

export interface MenuItem {
  id: string;
  name: string;
  description: string | null;
  price: number;
  category: MenuCategory;
  image_url: string | null;
  is_featured: boolean;
  sort_order: number;
  created_at: string;
}

export interface Event {
  id: string;
  title: string;
  description: string | null;
  event_date: string;
  event_time: string;
  location: string | null;
  capacity: number;
  image_url: string | null;
  created_at: string;
}

export interface Reservation {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  date: string;
  time: string;
  party_size: number;
  notes: string | null;
  status: string;
  created_at: string;
}

export interface Message {
  id: string;
  name: string;
  email: string;
  subject: string | null;
  message: string;
  created_at: string;
}

export interface Review {
  id: string;
  name: string;
  rating: number;
  comment: string | null;
  is_approved: boolean;
  created_at: string;
}
