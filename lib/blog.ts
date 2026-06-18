import type { BlogPost } from '@/lib/supabase';

export type BlogArticle = BlogPost & {
  gallery: string[];
  sections: {
    title: string;
    body: string;
  }[];
  highlights: string[];
};

export const BLOG_ARTICLES: BlogArticle[] = [
  {
    id: 'bathroom-project-2026',
    title: 'Modern Bathroom With Warm Light and Clean Detail',
    title_bg: 'Модерна баня с топла светлина и прецизен детайл',
    category: 'Bathroom Design',
    category_bg: 'Бани и интериор',
    image_url: '/blog/bathroom-vanity.jpg',
    read_time: 4,
    excerpt:
      'A compact bathroom concept where warm lighting, stone textures, glass, and custom furniture create a calm, finished interior.',
    excerpt_bg:
      'Идея за съвременна баня, в която топлото осветление, каменните текстури, стъклото и мебелите по размер създават спокойно и завършено усещане.',
    slug: 'moderna-banya-s-topla-svetlina',
    published_at: '2026-06-18T00:00:00.000Z',
    created_at: '2026-06-18T00:00:00.000Z',
    gallery: [
      '/blog/bathroom-vanity.jpg',
      '/blog/bathroom-shower.jpg',
      '/blog/bathroom-plan.jpg',
    ],
    highlights: [
      'Скрито LED осветление за по-меко и премиум усещане',
      'Окачен шкаф и мивка с чиста линия, за да се пази лекота в пространството',
      'Стъклена душ зона, която не затваря визуално банята',
      'Топли метални акценти, които добавят характер без излишна тежест',
    ],
    sections: [
      {
        title: 'Идеята',
        body:
          'Тази баня е разработена като спокойна, модерна зона с изчистена геометрия и топло осветление. Целта е пространството да изглежда подредено, светло и удобно за ежедневна употреба, без да губи усещането за лукс.',
      },
      {
        title: 'Разпределение и удобство',
        body:
          'При компактните бани най-важно е всеки елемент да има точно място. Душ зоната е отделена със стъкло, тоалетната остава прибрана в ниша, а шкафът под мивката дава практично съхранение, без да натежава визуално.',
      },
      {
        title: 'Материали и атмосфера',
        body:
          'Комбинацията от каменни текстури, дървесен нюанс и топли метални детайли прави интериора едновременно модерен и уютен. Скритото осветление подчертава стените и мебелите, като създава по-дълбоко и завършено усещане.',
      },
      {
        title: 'Какво прави банята завършена',
        body:
          'Завършеният вид не идва само от красиви плочки. Той идва от съвпадението между осветление, мебели по размер, правилна душ зона, цветове и детайли. Когато тези елементи са планирани предварително, резултатът изглежда спокоен и професионален.',
      },
    ],
  },
];

export function getBlogArticle(slug: string) {
  return BLOG_ARTICLES.find((article) => article.slug === slug);
}
