import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, Clock } from 'lucide-react';
import { BLOG_ARTICLES, getBlogArticle } from '@/lib/blog';

type BlogArticlePageProps = {
  params: {
    slug: string;
  };
};

export function generateStaticParams() {
  return BLOG_ARTICLES.map((article) => ({ slug: article.slug }));
}

export function generateMetadata({ params }: BlogArticlePageProps) {
  const article = getBlogArticle(params.slug);
  if (!article) return {};

  return {
    title: `${article.title_bg ?? article.title} | VS Studio`,
    description: article.excerpt_bg ?? article.excerpt,
  };
}

export default function BlogArticlePage({ params }: BlogArticlePageProps) {
  const article = getBlogArticle(params.slug);
  if (!article) notFound();

  const title = article.title_bg ?? article.title;
  const excerpt = article.excerpt_bg ?? article.excerpt;
  const category = article.category_bg ?? article.category;
  const date = new Date(article.published_at).toLocaleDateString('bg-BG', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <main className="min-h-screen bg-[#080E1C] text-slate-100">
      <section className="relative overflow-hidden border-b border-white/5">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{ backgroundImage: `url(${article.image_url})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#080E1C]/80 via-[#080E1C]/85 to-[#080E1C]" />

        <div className="container-wide section-padding relative z-10 py-10 md:py-16 lg:py-20">
          <Link
            href="/#blog"
            className="mb-10 inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-slate-400 transition-colors hover:text-gold"
          >
            <ArrowLeft size={14} />
            Назад към сайта
          </Link>

          <div className="max-w-4xl">
            <span className="mb-5 inline-flex bg-gold px-3 py-1.5 text-xs font-semibold uppercase tracking-widest text-obsidian">
              {category}
            </span>
            <h1 className="font-display text-4xl font-bold leading-tight text-white md:text-5xl lg:text-6xl">
              {title}
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-slate-300 md:text-lg">
              {excerpt}
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-3 text-sm text-slate-400">
              <Clock size={14} />
              <span>{article.read_time} мин четене</span>
              <span className="text-slate-700">·</span>
              <span>{date}</span>
            </div>
          </div>
        </div>
      </section>

      <section className="container-wide section-padding py-12 md:py-16 lg:py-20">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_320px] lg:gap-14">
          <article className="min-w-0">
            <div className="overflow-hidden rounded-2xl border border-white/10">
              <img src={article.image_url} alt={title} className="h-auto w-full object-cover" />
            </div>

            <div className="mt-10 space-y-10">
              {article.sections.map((section) => (
                <section key={section.title}>
                  <h2 className="font-display text-2xl font-semibold text-white md:text-3xl">
                    {section.title}
                  </h2>
                  <p className="mt-4 text-sm leading-7 text-slate-300 md:text-base">
                    {section.body}
                  </p>
                </section>
              ))}
            </div>

            <div className="mt-12 grid gap-4 md:grid-cols-2">
              {article.gallery.map((image, index) => (
                <div
                  key={image}
                  className={index === 0 ? 'overflow-hidden rounded-2xl md:col-span-2' : 'overflow-hidden rounded-2xl'}
                >
                  <img src={image} alt={`${title} ${index + 1}`} className="h-full w-full object-cover" />
                </div>
              ))}
            </div>
          </article>

          <aside className="lg:sticky lg:top-8 lg:self-start">
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
              <h2 className="font-display text-xl font-semibold text-white">Акценти в проекта</h2>
              <div className="mt-5 space-y-4">
                {article.highlights.map((item) => (
                  <div key={item} className="border-l border-gold/50 pl-4 text-sm leading-6 text-slate-300">
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}
