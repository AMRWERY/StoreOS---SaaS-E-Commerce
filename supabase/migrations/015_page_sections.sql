CREATE TABLE page_sections (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  page_id    UUID NOT NULL REFERENCES store_pages(id) ON DELETE CASCADE,
  store_id   UUID NOT NULL REFERENCES stores(id) ON DELETE CASCADE,
  type       TEXT NOT NULL,
  settings   JSONB DEFAULT '{}',
  sort_order INT DEFAULT 0,
  is_hidden  BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),

  CONSTRAINT valid_section_type CHECK (
    type IN (
      'hero_banner', 'hero_slideshow', 'hero_split', 'hero_video',
      'products_grid', 'products_carousel', 'product_featured',
      'categories_grid', 'rich_text', 'image_text', 'image_gallery',
      'banner_full', 'banner_split', 'countdown_timer',
      'testimonials', 'trust_badges', 'logo_bar',
      'faq_accordion', 'newsletter_form', 'contact_form',
      'video_embed', 'spacer', 'divider', 'custom_html'
    )
  )
);

CREATE INDEX idx_sections_page  ON page_sections(page_id, sort_order);
CREATE INDEX idx_sections_store ON page_sections(store_id);

CREATE TRIGGER page_sections_updated_at
  BEFORE UPDATE ON page_sections
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- Optional: seed default homepage sections from application after onboarding.
-- Example function (not attached — wire via app layer if needed):
CREATE OR REPLACE FUNCTION seed_default_home_sections()
RETURNS TRIGGER AS $$
DECLARE
  v_page_id UUID;
BEGIN
  SELECT id INTO v_page_id
  FROM store_pages
  WHERE store_id = NEW.id AND slug = 'home';

  IF v_page_id IS NOT NULL THEN
    INSERT INTO page_sections (page_id, store_id, type, settings, sort_order)
    VALUES
    (
      v_page_id, NEW.id, 'hero_banner',
      '{
        "headline": "Welcome to our store",
        "subheadline": "Discover our latest collection",
        "cta_text": "Shop Now",
        "cta_url": "/products",
        "height": "large",
        "content_position": "center",
        "overlay_opacity": 35,
        "text_color": "#ffffff"
      }',
      0
    ),
    (
      v_page_id, NEW.id, 'products_grid',
      '{
        "title": "New Arrivals",
        "show_title": true,
        "source": "all",
        "columns_desktop": 4,
        "columns_mobile": 2,
        "products_count": 8,
        "show_view_all": true,
        "card_style": "default"
      }',
      1
    ),
    (
      v_page_id, NEW.id, 'trust_badges',
      '{
        "items": [
          {"icon": "truck", "label": "Free Shipping", "desc": "On orders over EGP 500"},
          {"icon": "shield-check", "label": "Secure Payment", "desc": "SSL encrypted"},
          {"icon": "arrow-uturn-left", "label": "Easy Returns", "desc": "Within 7 days"},
          {"icon": "chat-bubble-left", "label": "Support", "desc": "We are here to help"}
        ],
        "layout": "row",
        "style": "icon-left"
      }',
      2
    );
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
