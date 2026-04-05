'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowUpRight, Clock } from 'lucide-react';
import type { BlogPost } from '@/lib/supabase';
import SectionWrapper from '@/components/shared/SectionWrapper';
import { useLang } from '@/lib/i18n';

interface BlogPreviewProps {
  posts: BlogPost[];
}

const FALLBACK_POSTS: BlogPost[] = [
  {
    id: '1',
    title: 'The New Language of Luxury: How Material Honesty Is Redefining Premium Interiors',
    title_bg: 'Новият език на лукса: Как материалната честност предефинира premium интериорите',
    category: 'Interior Design',
    category_bg: 'Интериорен дизайн',
    image_url: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=1200',
    read_time: 6,
    excerpt: 'Stone, timber, and raw concrete are no longer reserved for industrial spaces. We explore how today\'s most sought-after interiors celebrate material truth over surface decoration.',
    excerpt_bg: 'Камък, дърво и необработен бетон вече не са запазени за индустриални пространства. Изследваме как днешните най-търсени интериори прославят истинността на материалите пред повърхностната декорация.',
    slug: 'new-language-of-luxury-material-honesty',
    published_at: '2026-03-24T10:40:52.521787+00:00',
    created_at: '2026-03-29T10:40:52.521787+00:00',
  },
  {
    id: '2',
    title: 'Building in Europe vs. the Gulf: Navigating Standards, Climate, and Expectation',
    title_bg: 'Строителство в Европа срещу Персийския залив: Навигиране на стандарти, климат и очаквания',
    category: 'Architecture',
    category_bg: 'Архитектура',
    image_url: 'https://images.pexels.com/photos/2119713/pexels-photo-2119713.jpeg?auto=compress&cs=tinysrgb&w=1200',
    read_time: 8,
    excerpt: 'From Eurocode structural requirements to Dubai\'s Green Building Regulations, our technical directors compare the realities of high-end construction across two very different regulatory environments.',
    excerpt_bg: 'От изискванията на Еврокод до Дубайските зелени строителни наредби — нашите технически директори сравняват реалностите на висококласното строителство в два много различни регулаторни контекста.',
    slug: 'building-europe-vs-gulf-standards',
    published_at: '2026-03-15T10:40:52.521787+00:00',
    created_at: '2026-03-29T10:40:52.521787+00:00',
  },
  {
    id: '3',
    title: 'Turnkey or Traditional? Why More Developers Are Choosing the Single-Partner Model',
    title_bg: 'До ключ или традиционно? Защо все повече предприемачи избират модела с един партньор',
    category: 'Industry Insights',
    category_bg: 'Индустриални прозрения',
    image_url: 'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=1200',
    read_time: 5,
    excerpt: 'Coordinating architects, contractors, and interior teams used to mean months of friction. Here\'s why end-to-end delivery is rapidly becoming the preferred model for discerning clients.',
    excerpt_bg: 'Координирането на архитекти, изпълнители и интериорни екипи означаваше месеци на триене. Ето защо доставката от край до край бързо се превръща в предпочитания модел за взискателни клиенти.',
    slug: 'turnkey-vs-traditional-single-partner-model',
    published_at: '2026-03-08T10:40:52.521787+00:00',
    created_at: '2026-03-29T10:40:52.521787+00:00',
  },
];

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
}

function getPostText(post: BlogPost, lang: string) {
  const isBg = lang === 'bg';
  return {
    title: (isBg && post.title_bg) ? post.title_bg : post.title,
    excerpt: (isBg && post.excerpt_bg) ? post.excerpt_bg : post.excerpt,
    category: (isBg && post.category_bg) ? post.category_bg : post.category,
  };
}

export default function BlogPreview({ posts }: BlogPreviewProps) {
  const activePosts = posts.length > 0 ? posts : FALLBACK_POSTS;
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });
  const { t, lang } = useLang();

  const [featured, ...rest] = activePosts;

  return (
    <section id="blog" ref={ref} className="py-28 md:py-36 bg-obsidian relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />

      <div className="container-wide section-padding">
        <SectionWrapper className="mb-16 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-8 h-px bg-gold" />
            <span className="text-xs font-medium tracking-[0.25em] uppercase text-gold">{t.blog.label}</span>
            <div className="w-8 h-px bg-gold" />
          </div>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
            {t.blog.title1}<br />
            <span className="italic text-gold">{t.blog.title2}</span>
          </h2>
          <button className="inline-flex items-center gap-2 text-xs tracking-widest uppercase text-slate-400 hover:text-gold transition-colors group">
            {t.blog.allArticles}
            <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </SectionWrapper>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
          {featured && (() => {
            const { title, excerpt, category } = getPostText(featured, lang);
            return (
              <motion.article
                initial={{ opacity: 0, y: 40 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.1 }}
                className="lg:col-span-3 group cursor-pointer"
              >
                <div className="relative h-[280px] md:h-[360px] lg:h-[440px] overflow-hidden rounded-2xl mb-6">
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                    style={{ backgroundImage: `url(${featured.image_url})` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-obsidian/60 to-transparent" />
                  <div className="absolute top-4 left-4">
                    <span className="text-xs px-3 py-1.5 bg-gold text-obsidian font-semibold tracking-widest uppercase">
                      {category}
                    </span>
                  </div>
                </div>
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <Clock size={12} className="text-slate-500" />
                    <span className="text-xs text-slate-500">{featured.read_time} {t.blog.minRead}</span>
                    <span className="text-slate-700">·</span>
                    <span className="text-xs text-slate-500">{formatDate(featured.published_at)}</span>
                  </div>
                  <h3 className="font-display text-xl md:text-2xl lg:text-3xl font-semibold text-white leading-snug group-hover:text-gold transition-colors duration-300 mb-3">
                    {title}
                  </h3>
                  <p className="text-xs md:text-sm text-slate-500 leading-relaxed line-clamp-2">{excerpt}</p>
                  <div className="mt-4 flex items-center gap-1.5 text-xs text-gold">
                    {t.blog.readArticle}
                    <ArrowUpRight size={12} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                </div>
              </motion.article>
            );
          })()}

          <div className="lg:col-span-2 flex flex-col gap-4">
            {rest.map((post, i) => {
              const { title, category } = getPostText(post, lang);
              return (
                <motion.article
                  key={post.id}
                  initial={{ opacity: 0, x: 30 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.7, delay: 0.2 + i * 0.15 }}
                  className="group cursor-pointer border border-white/5 rounded-2xl hover:border-white/10 transition-all duration-300 flex gap-0 overflow-hidden"
                >
                  <div className="relative w-28 md:w-32 lg:w-40 shrink-0 h-full min-h-[120px] md:min-h-[140px] overflow-hidden">
                    <div
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                      style={{ backgroundImage: `url(${post.image_url})` }}
                    />
                  </div>
                  <div className="p-4 md:p-5 flex flex-col justify-between">
                    <div>
                      <span className="text-[10px] md:text-xs text-gold tracking-widest uppercase">{category}</span>
                      <h3 className="font-display text-sm md:text-base font-semibold text-white leading-snug mt-2 group-hover:text-gold transition-colors duration-300 line-clamp-3">
                        {title}
                      </h3>
                    </div>
                    <div className="flex items-center gap-1.5 md:gap-2 mt-3">
                      <Clock size={11} className="text-slate-500" />
                      <span className="text-xs text-slate-500">{post.read_time} {t.blog.min}</span>
                      <span className="text-slate-700">·</span>
                      <span className="text-xs text-slate-500">{formatDate(post.published_at)}</span>
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
