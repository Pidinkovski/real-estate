import { supabase } from '@/lib/supabase';
import type { Project, BlogPost } from '@/lib/supabase';
import LandingClient from '@/components/LandingClient';

export const dynamic = 'force-dynamic';

async function getProjects(): Promise<Project[]> {
  const { data } = await supabase
    .from('projects')
    .select('*')
    .order('created_at', { ascending: false });
  return data ?? [];
}

async function getBlogPosts(): Promise<BlogPost[]> {
  const { data } = await supabase
    .from('blog_posts')
    .select('*')
    .order('published_at', { ascending: false })
    .limit(3);
  return data ?? [];
}

export default async function Home() {
  const [projects, posts] = await Promise.all([getProjects(), getBlogPosts()]);
  return <LandingClient projects={projects} posts={posts} />;
}
