-- Enable RLS
ALTER TABLE store_themes  ENABLE ROW LEVEL SECURITY;
ALTER TABLE store_pages   ENABLE ROW LEVEL SECURITY;
ALTER TABLE page_sections ENABLE ROW LEVEL SECURITY;

-- ─────────────────────────────────────────
-- STORE THEMES
-- ─────────────────────────────────────────

CREATE POLICY "Members can view store theme"
  ON store_themes FOR SELECT
  USING (is_store_member(store_id));

CREATE POLICY "Members can update store theme"
  ON store_themes FOR UPDATE
  USING (is_store_member(store_id));

CREATE POLICY "System can insert theme"
  ON store_themes FOR INSERT
  WITH CHECK (TRUE);

CREATE POLICY "Public can view theme for storefront"
  ON store_themes FOR SELECT
  USING (TRUE);

-- ─────────────────────────────────────────
-- STORE PAGES
-- ─────────────────────────────────────────

CREATE POLICY "Members can manage pages"
  ON store_pages FOR ALL
  USING (is_store_member(store_id));

CREATE POLICY "Public can view published pages"
  ON store_pages FOR SELECT
  USING (is_published = TRUE);

CREATE POLICY "System can insert pages"
  ON store_pages FOR INSERT
  WITH CHECK (TRUE);

CREATE OR REPLACE FUNCTION prevent_system_page_delete()
RETURNS TRIGGER AS $$
BEGIN
  IF OLD.is_system = TRUE THEN
    RAISE EXCEPTION 'Cannot delete system pages';
  END IF;
  RETURN OLD;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER no_delete_system_pages
  BEFORE DELETE ON store_pages
  FOR EACH ROW EXECUTE FUNCTION prevent_system_page_delete();

-- ─────────────────────────────────────────
-- PAGE SECTIONS
-- ─────────────────────────────────────────

CREATE POLICY "Members can manage sections"
  ON page_sections FOR ALL
  USING (is_store_member(store_id));

CREATE POLICY "Public can view sections"
  ON page_sections FOR SELECT
  USING (is_hidden = FALSE);

CREATE POLICY "System can insert sections"
  ON page_sections FOR INSERT
  WITH CHECK (TRUE);

-- ─────────────────────────────────────────
-- HELPER VIEWS (for builder performance)
-- ─────────────────────────────────────────

CREATE OR REPLACE VIEW page_with_sections AS
SELECT
  p.id          AS page_id,
  p.store_id,
  p.slug        AS page_slug,
  p.title       AS page_title,
  p.type        AS page_type,
  p.is_published,
  p.is_system,
  p.seo_title,
  p.seo_desc,
  COALESCE(
    JSON_AGG(
      JSON_BUILD_OBJECT(
        'id',         s.id,
        'type',       s.type,
        'settings',   s.settings,
        'sort_order', s.sort_order,
        'is_hidden',  s.is_hidden
      )
      ORDER BY s.sort_order
    ) FILTER (WHERE s.id IS NOT NULL),
    '[]'
  ) AS sections
FROM store_pages p
LEFT JOIN page_sections s
  ON s.page_id = p.id
GROUP BY p.id;
