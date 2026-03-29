import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Project = {
  id: string;
  name: string;
  location: string;
  sqm: number;
  category: string;
  image_url: string;
  description: string;
  year: number;
  featured: boolean;
  created_at: string;
};

export type BlogPost = {
  id: string;
  title: string;
  category: string;
  image_url: string;
  read_time: number;
  excerpt: string;
  slug: string;
  published_at: string;
  created_at: string;
};

export type ContactRequest = {
  name: string;
  email: string;
  phone?: string;
  message: string;
  project_type: string;
  budget_range?: string;
};
