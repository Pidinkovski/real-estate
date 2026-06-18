import { supabase } from '@/lib/supabase';
import type { Project, BlogPost } from '@/lib/supabase';
import LandingClient from '@/components/LandingClient';

export const dynamic = 'force-dynamic';

const featuredProjects: Project[] = [
  {
    id: 'modern-living-room',
    name: 'Модерен хол с характер',
    location: 'Частен дом',
    sqm: 42,
    category: 'Интериор',
    image_url: '/projects/modern-living-room.jpg',
    description:
      'Дневна зона с модерна ТВ стена, вертикални декоративни ламели и прецизно подбрано осветление. Пространство, създадено за комфорт, визуален баланс и усещане за завършен интериор.',
    year: 2026,
    featured: true,
    created_at: '2026-06-17T00:00:00.000Z',
  },
  {
    id: 'modern-dining-kitchen',
    name: 'Кухня и трапезария в светъл ритъм',
    location: 'Частен дом',
    sqm: 42,
    category: 'Интериор',
    image_url: '/projects/modern-dining-kitchen.jpg',
    description:
      'Светла кухня и трапезария с изчистени линии, гланцови повърхности и акцентно осветление. Пространство, в което ежедневният комфорт се среща с елегантна, завършена визия.',
    year: 2026,
    featured: true,
    created_at: '2026-06-17T00:00:00.000Z',
  },
  {
    id: 'modern-exterior-facade',
    name: 'Модерна фасада с прецизен детайл',
    location: 'Частен дом',
    sqm: 120,
    category: 'Екстериор',
    image_url: '/projects/modern-exterior-facade.jpg',
    description:
      'Съвременна фасадна визия с чисти линии, устойчиви материали и подреден външен подход. Изпълнение, което дава завършен характер на целия имот.',
    year: 2026,
    featured: true,
    created_at: '2026-06-18T00:00:00.000Z',
  },
];

async function getProjects(): Promise<Project[]> {
  return featuredProjects;
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
