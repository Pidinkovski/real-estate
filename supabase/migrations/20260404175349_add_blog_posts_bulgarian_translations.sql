/*
  # Add Bulgarian translations to blog_posts

  1. Changes
    - `blog_posts` table: add `title_bg`, `excerpt_bg`, `category_bg` optional columns for Bulgarian content
  2. Data
    - Populate Bulgarian translations for the 3 existing articles
*/

ALTER TABLE blog_posts
  ADD COLUMN IF NOT EXISTS title_bg text,
  ADD COLUMN IF NOT EXISTS excerpt_bg text,
  ADD COLUMN IF NOT EXISTS category_bg text;

UPDATE blog_posts
SET
  title_bg = 'Новият език на лукса: Как материалната честност предефинира premium интериорите',
  excerpt_bg = 'Камък, дърво и необработен бетон вече не са запазени за индустриални пространства. Изследваме как днешните най-търсени интериори прославят истинността на материалите пред повърхностната декорация.',
  category_bg = 'Интериорен дизайн'
WHERE slug = 'new-language-of-luxury-material-honesty';

UPDATE blog_posts
SET
  title_bg = 'Строителство в Европа срещу Персийския залив: Навигиране на стандарти, климат и очаквания',
  excerpt_bg = 'От изискванията на Еврокод до Дубайските зелени строителни наредби — нашите технически директори сравняват реалностите на висококласното строителство в два много различни регулаторни контекста.',
  category_bg = 'Архитектура'
WHERE slug = 'building-europe-vs-gulf-standards';

UPDATE blog_posts
SET
  title_bg = 'До ключ или традиционно? Защо все повече предприемачи избират модела с един партньор',
  excerpt_bg = 'Координирането на архитекти, изпълнители и интериорни екипи означаваше месеци на триене. Ето защо доставката от край до край бързо се превръща в предпочитания модел за взискателни клиенти.',
  category_bg = 'Индустриални прозрения'
WHERE slug = 'turnkey-vs-traditional-single-partner-model';
