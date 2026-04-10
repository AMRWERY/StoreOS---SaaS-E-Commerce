CREATE TABLE store_themes (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  store_id    UUID UNIQUE NOT NULL REFERENCES stores(id) ON DELETE CASCADE,

  -- Brand Colors
  primary_color     TEXT DEFAULT '#6366F1',
  secondary_color   TEXT DEFAULT '#F97316',
  bg_color          TEXT DEFAULT '#FFFFFF',
  text_color        TEXT DEFAULT '#0F0F1A',
  surface_color     TEXT DEFAULT '#F8F8FC',
  border_color      TEXT DEFAULT '#E4E4EF',
  success_color     TEXT DEFAULT '#059669',
  danger_color      TEXT DEFAULT '#DC2626',

  -- Typography
  heading_font      TEXT DEFAULT 'IBM Plex Sans',
  body_font         TEXT DEFAULT 'IBM Plex Sans',
  font_size_base    INT DEFAULT 15,
  heading_weight    INT DEFAULT 700,

  -- Shapes
  border_radius     TEXT DEFAULT 'medium',
  -- none | small | medium | large | full
  button_style      TEXT DEFAULT 'rounded',
  -- square | rounded | pill

  -- Layout
  container_width   INT DEFAULT 1280,
  navbar_style      TEXT DEFAULT 'default',
  -- default | centered | minimal | transparent
  navbar_bg         TEXT DEFAULT '#FFFFFF',
  navbar_text_color TEXT DEFAULT '#0F0F1A',
  footer_style      TEXT DEFAULT 'default',
  -- default | minimal | expanded

  -- Announcement Bar
  show_announcement_bar  BOOLEAN DEFAULT FALSE,
  announcement_text      TEXT,
  announcement_bg        TEXT DEFAULT '#6366F1',
  announcement_color     TEXT DEFAULT '#FFFFFF',

  -- Feature Toggles
  show_search       BOOLEAN DEFAULT TRUE,
  show_wishlist     BOOLEAN DEFAULT TRUE,
  show_cart_drawer  BOOLEAN DEFAULT TRUE,

  created_at  TIMESTAMPTZ DEFAULT NOW(),
  updated_at  TIMESTAMPTZ DEFAULT NOW()
);

CREATE TRIGGER store_themes_updated_at
  BEFORE UPDATE ON store_themes
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- Auto-create default theme when store is created
CREATE OR REPLACE FUNCTION create_default_theme()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO store_themes (store_id)
  VALUES (NEW.id)
  ON CONFLICT (store_id) DO NOTHING;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_store_created_create_theme
  AFTER INSERT ON stores
  FOR EACH ROW EXECUTE FUNCTION create_default_theme();
