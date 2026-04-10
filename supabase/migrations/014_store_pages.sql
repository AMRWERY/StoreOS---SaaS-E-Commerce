CREATE TABLE store_pages (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  store_id     UUID NOT NULL REFERENCES stores(id) ON DELETE CASCADE,
  type         TEXT NOT NULL DEFAULT 'page',
  -- system types: home | product | category | cart |
  --               checkout | order_confirmed | track | search
  -- custom types: page
  slug         TEXT NOT NULL,
  title        TEXT NOT NULL,
  seo_title    TEXT,
  seo_desc     TEXT,
  og_image     TEXT,
  is_published BOOLEAN DEFAULT TRUE,
  is_system    BOOLEAN DEFAULT FALSE,
  show_in_nav  BOOLEAN DEFAULT FALSE,
  nav_label    TEXT,
  nav_order    INT DEFAULT 0,
  created_at   TIMESTAMPTZ DEFAULT NOW(),
  updated_at   TIMESTAMPTZ DEFAULT NOW(),

  UNIQUE(store_id, slug),
  CONSTRAINT valid_page_type CHECK (
    type IN (
      'home', 'product', 'category', 'cart',
      'checkout', 'order_confirmed', 'track',
      'search', 'page'
    )
  )
);

CREATE INDEX idx_pages_store   ON store_pages(store_id);
CREATE INDEX idx_pages_nav     ON store_pages(store_id, show_in_nav, nav_order);

CREATE TRIGGER store_pages_updated_at
  BEFORE UPDATE ON store_pages
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- Auto-create system pages when store is created
CREATE OR REPLACE FUNCTION create_default_pages()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO store_pages (store_id, type, slug, title, is_system, is_published)
  VALUES
    (NEW.id, 'home',            'home',            'Home',            TRUE, TRUE),
    (NEW.id, 'product',         'product',         'Product Page',    TRUE, TRUE),
    (NEW.id, 'category',        'category',        'Category Page',   TRUE, TRUE),
    (NEW.id, 'cart',            'cart',            'Cart',            TRUE, TRUE),
    (NEW.id, 'checkout',        'checkout',        'Checkout',        TRUE, TRUE),
    (NEW.id, 'order_confirmed', 'order-confirmed', 'Order Confirmed', TRUE, TRUE),
    (NEW.id, 'track',           'track',           'Order Tracking',  TRUE, TRUE)
  ON CONFLICT (store_id, slug) DO NOTHING;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_store_created_create_pages
  AFTER INSERT ON stores
  FOR EACH ROW EXECUTE FUNCTION create_default_pages();
