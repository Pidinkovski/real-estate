/*
  # Construction Company Landing Page — Initial Schema

  ## Overview
  Creates all tables needed for the ARKON construction company website.

  ## New Tables

  ### 1. `projects`
  Stores featured construction/architecture projects displayed on the landing page.
  - `id` — UUID primary key
  - `name` — Project display name
  - `location` — City and country
  - `sqm` — Square meters (integer)
  - `category` — e.g. "Residential", "Commercial", "Hospitality"
  - `image_url` — Full image URL (Pexels)
  - `description` — Short project description
  - `year` — Completion year
  - `featured` — Whether to highlight on front page
  - `created_at` — Timestamp

  ### 2. `blog_posts`
  Editorial blog articles previewed on the landing page.
  - `id` — UUID primary key
  - `title` — Article headline
  - `category` — e.g. "Architecture", "Interior Design", "Industry News"
  - `image_url` — Cover image URL
  - `read_time` — Estimated read time in minutes
  - `excerpt` — Short teaser text
  - `slug` — URL-safe identifier
  - `published_at` — Publication timestamp
  - `created_at` — Timestamp

  ### 3. `contact_requests`
  Stores quote / consultation form submissions from visitors.
  - `id` — UUID primary key
  - `name` — Submitter's full name
  - `email` — Contact email
  - `phone` — Optional phone number
  - `message` — Project description / inquiry
  - `project_type` — e.g. "Residential", "Commercial", "Renovation"
  - `budget_range` — Optional budget indication
  - `created_at` — Timestamp

  ## Security
  - RLS enabled on all tables
  - `projects` and `blog_posts`: publicly readable (SELECT only for anon)
  - `contact_requests`: INSERT for anon (public form submissions); no public SELECT
*/

-- ============================================================
-- PROJECTS TABLE
-- ============================================================
CREATE TABLE IF NOT EXISTS projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  location text NOT NULL,
  sqm integer NOT NULL DEFAULT 0,
  category text NOT NULL DEFAULT 'Residential',
  image_url text NOT NULL DEFAULT '',
  description text NOT NULL DEFAULT '',
  year integer NOT NULL DEFAULT 2024,
  featured boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view projects"
  ON projects FOR SELECT
  TO anon, authenticated
  USING (true);

-- ============================================================
-- BLOG POSTS TABLE
-- ============================================================
CREATE TABLE IF NOT EXISTS blog_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  category text NOT NULL DEFAULT 'Architecture',
  image_url text NOT NULL DEFAULT '',
  read_time integer NOT NULL DEFAULT 5,
  excerpt text NOT NULL DEFAULT '',
  slug text UNIQUE NOT NULL,
  published_at timestamptz NOT NULL DEFAULT now(),
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view blog posts"
  ON blog_posts FOR SELECT
  TO anon, authenticated
  USING (true);

-- ============================================================
-- CONTACT REQUESTS TABLE
-- ============================================================
CREATE TABLE IF NOT EXISTS contact_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL DEFAULT '',
  message text NOT NULL DEFAULT '',
  project_type text NOT NULL DEFAULT 'Residential',
  budget_range text NOT NULL DEFAULT '',
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE contact_requests ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit a contact request"
  ON contact_requests FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- ============================================================
-- SEED: PROJECTS
-- ============================================================
INSERT INTO projects (name, location, sqm, category, image_url, description, year, featured) VALUES
  ('Skyline Residence', 'Dubai, UAE', 580, 'Residential', 'https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=1200', 'A sweeping penthouse residence overlooking the Dubai Marina, featuring floor-to-ceiling glazing and bespoke stonework throughout.', 2023, true),
  ('The Meridian Tower', 'Vienna, Austria', 12400, 'Commercial', 'https://images.pexels.com/photos/2098427/pexels-photo-2098427.jpeg?auto=compress&cs=tinysrgb&w=1200', 'Mixed-use commercial tower delivering 34 floors of Grade-A office space, retail, and sky terraces in Vienna''s 1st district.', 2024, true),
  ('Villa Aurum', 'Monaco', 820, 'Residential', 'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=1200', 'An ultra-premium hillside villa fusing Mediterranean tradition with contemporary minimalism, clad in Italian travertine.', 2023, true),
  ('Azure Spa & Resort', 'Dubrovnik, Croatia', 6500, 'Hospitality', 'https://images.pexels.com/photos/261102/pexels-photo-261102.jpeg?auto=compress&cs=tinysrgb&w=1200', 'A boutique coastal resort carved into the limestone cliffs above the Adriatic. Infinity pool, spa, and 48 suites.', 2022, false),
  ('Haus Krone', 'Munich, Germany', 430, 'Residential', 'https://images.pexels.com/photos/1115804/pexels-photo-1115804.jpeg?auto=compress&cs=tinysrgb&w=1200', 'Contemporary family villa in Bogenhausen. Passive-house certified with radiant heating, a wine cellar, and home cinema.', 2024, false),
  ('Harbour Gate Offices', 'Amsterdam, Netherlands', 3800, 'Commercial', 'https://images.pexels.com/photos/374870/pexels-photo-374870.jpeg?auto=compress&cs=tinysrgb&w=1200', 'A sustainable Class-A office campus on the IJ waterfront — BREEAM Excellent rated, with 2 km of cycle facilities.', 2023, false)
ON CONFLICT DO NOTHING;

-- ============================================================
-- SEED: BLOG POSTS
-- ============================================================
INSERT INTO blog_posts (title, category, image_url, read_time, excerpt, slug, published_at) VALUES
  (
    'The New Language of Luxury: How Material Honesty Is Redefining Premium Interiors',
    'Interior Design',
    'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=1200',
    6,
    'Stone, timber, and raw concrete are no longer reserved for industrial spaces. We explore how today''s most sought-after interiors celebrate material truth over surface decoration.',
    'new-language-of-luxury-material-honesty',
    now() - interval '5 days'
  ),
  (
    'Building in Europe vs. the Gulf: Navigating Standards, Climate, and Expectation',
    'Architecture',
    'https://images.pexels.com/photos/2119713/pexels-photo-2119713.jpeg?auto=compress&cs=tinysrgb&w=1200',
    8,
    'From Eurocode structural requirements to Dubai''s Green Building Regulations, our technical directors compare the realities of high-end construction across two very different regulatory environments.',
    'building-europe-vs-gulf-standards',
    now() - interval '14 days'
  ),
  (
    'Turnkey or Traditional? Why More Developers Are Choosing the Single-Partner Model',
    'Industry Insights',
    'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=1200',
    5,
    'Coordinating architects, contractors, and interior teams used to mean months of friction. Here''s why end-to-end delivery is rapidly becoming the preferred model for discerning clients.',
    'turnkey-vs-traditional-single-partner-model',
    now() - interval '21 days'
  )
ON CONFLICT DO NOTHING;
