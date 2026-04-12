-- Optional outbound link for curated / syndicated posts.
-- When set, blog cards open this URL in a new tab instead of an on-site article page.

ALTER TABLE blog_posts
  ADD COLUMN IF NOT EXISTS external_url text;

COMMENT ON COLUMN blog_posts.external_url IS 'If set (https...), "Read article" / card opens this URL in a new tab.';
