import { createSectionSettings } from '@/data/section-registry'
import type { PageSection, SectionType, StorePageType } from '@/types/sections'

export interface PageTemplateSection {
  type: SectionType
  /** Overrides merged over the block's defaults. */
  settings?: Record<string, unknown>
}

export interface PageTemplate {
  id: string
  name: string
  description: string
  icon: string
  /** Page type this template is designed for. */
  pageType: StorePageType
  sections: PageTemplateSection[]
}

export const PAGE_TEMPLATES: PageTemplate[] = [
  {
    id: 'blank',
    name: 'Blank page',
    description: 'Start with nothing and add your own blocks',
    icon: 'ph:file-bold',
    pageType: 'page',
    sections: [],
  },
  {
    id: 'home-boutique',
    name: 'Minimal boutique',
    description: 'Hero, categories, best sellers, testimonials, newsletter',
    icon: 'ph:storefront-bold',
    pageType: 'home',
    sections: [
      { type: 'announcement_bar' },
      { type: 'hero_banner' },
      { type: 'trust_badges' },
      { type: 'categories_grid' },
      { type: 'products_grid', settings: { heading: 'Best sellers' } },
      { type: 'features_grid' },
      { type: 'testimonials' },
      { type: 'newsletter_form' },
    ],
  },
  {
    id: 'home-conversion',
    name: 'High-conversion',
    description: 'Urgency bar, flash sale, bundle, social proof, FAQ',
    icon: 'ph:lightning-bold',
    pageType: 'home',
    sections: [
      { type: 'announcement_bar' },
      { type: 'hero_split' },
      { type: 'logo_bar' },
      { type: 'flash_sale' },
      { type: 'product_featured' },
      { type: 'bundle_deal' },
      { type: 'testimonials' },
      { type: 'faq_accordion' },
      { type: 'cta_banner' },
    ],
  },
  {
    id: 'home-editorial',
    name: 'Editorial lookbook',
    description: 'Full-bleed imagery, story blocks, journal and social feed',
    icon: 'ph:camera-bold',
    pageType: 'home',
    sections: [
      { type: 'hero_slideshow' },
      { type: 'image_text' },
      { type: 'image_gallery' },
      { type: 'quote_block' },
      { type: 'products_carousel' },
      { type: 'blog_posts' },
      { type: 'social_feed' },
    ],
  },
  {
    id: 'product-page',
    name: 'Product page',
    description: 'Gallery & buy box, tabs, size guide, reviews, related items',
    icon: 'ph:tag-bold',
    pageType: 'product',
    sections: [
      { type: 'breadcrumbs' },
      { type: 'product_detail' },
      { type: 'product_tabs' },
      { type: 'size_guide' },
      { type: 'product_reviews' },
      { type: 'related_products' },
    ],
  },
  {
    id: 'collection-page',
    name: 'Collection page',
    description: 'Collection header with filters, sorting and pagination',
    icon: 'ph:squares-four-bold',
    pageType: 'category',
    sections: [{ type: 'collection_header' }, { type: 'collection_products' }],
  },
  {
    id: 'cart-page',
    name: 'Cart page',
    description: 'Cart lines, coupon, summary and recommendations',
    icon: 'ph:shopping-cart-bold',
    pageType: 'cart',
    sections: [
      { type: 'cart_items' },
      { type: 'related_products', settings: { heading: 'You may also like' } },
    ],
  },
  {
    id: 'search-page',
    name: 'Search page',
    description: 'Search box with suggestions and results grid',
    icon: 'ph:magnifying-glass-bold',
    pageType: 'search',
    sections: [{ type: 'search_results' }],
  },
  {
    id: 'track-page',
    name: 'Order tracking',
    description: 'Track an order by number and email',
    icon: 'ph:package-bold',
    pageType: 'track',
    sections: [{ type: 'order_tracking' }, { type: 'faq_accordion' }],
  },
  {
    id: 'about-page',
    name: 'About us',
    description: 'Story, numbers, team and a call to action',
    icon: 'ph:users-three-bold',
    pageType: 'page',
    sections: [
      { type: 'rich_text', settings: { heading: 'Our story', body: 'Tell customers who you are, why you started and what you stand for.' } },
      { type: 'stats_counter' },
      { type: 'columns_text' },
      { type: 'team_members' },
      { type: 'cta_banner' },
    ],
  },
  {
    id: 'contact-page',
    name: 'Contact us',
    description: 'Contact form, store location and common questions',
    icon: 'ph:envelope-simple-bold',
    pageType: 'page',
    sections: [
      { type: 'rich_text', settings: { heading: 'Get in touch', body: 'We usually reply within one business day.' } },
      { type: 'contact_form' },
      { type: 'map_location' },
      { type: 'faq_accordion' },
    ],
  },
  {
    id: 'faq-page',
    name: 'FAQ & policies',
    description: 'Questions, shipping steps and contact options',
    icon: 'ph:question-bold',
    pageType: 'page',
    sections: [
      { type: 'rich_text', settings: { heading: 'Help center', body: 'Everything you need to know about orders, shipping and returns.' } },
      { type: 'tabs_content' },
      { type: 'faq_accordion' },
      { type: 'steps_process' },
      { type: 'button_group' },
    ],
  },
  {
    id: 'landing-page',
    name: 'Promo landing page',
    description: 'Campaign page with benefits, steps, pricing and CTA',
    icon: 'ph:rocket-launch-bold',
    pageType: 'page',
    sections: [
      { type: 'hero_banner' },
      { type: 'features_grid' },
      { type: 'steps_process' },
      { type: 'pricing_table' },
      { type: 'comparison_table' },
      { type: 'testimonials' },
      { type: 'cta_banner' },
    ],
  },
  {
    id: 'blog-page',
    name: 'Journal / blog',
    description: 'Latest stories with a newsletter signup',
    icon: 'ph:newspaper-bold',
    pageType: 'page',
    sections: [
      { type: 'rich_text', settings: { heading: 'The journal', body: 'Stories, guides and news from our team.' } },
      { type: 'blog_posts' },
      { type: 'newsletter_form' },
    ],
  },
  // ── More home page designs ────────────────────────────────────────
  {
    id: 'home-bold',
    name: 'Bold & energetic',
    description: 'Video hero, scrolling ticker, carousel, social feed',
    icon: 'ph:fire-bold',
    pageType: 'home',
    sections: [
      { type: 'hero_video' },
      { type: 'marquee_text', settings: { variant: 'display' } },
      { type: 'products_carousel' },
      { type: 'features_grid', settings: { variant: 'cards' } },
      { type: 'social_feed', settings: { variant: 'mosaic' } },
      { type: 'cta_banner', settings: { variant: 'floating-card' } },
    ],
  },
  {
    id: 'home-catalog',
    name: 'Catalog / big store',
    description: 'Promo bar, categories, deals, new arrivals, trust badges',
    icon: 'ph:storefront-bold',
    pageType: 'home',
    sections: [
      { type: 'announcement_bar' },
      { type: 'hero_split' },
      { type: 'categories_grid' },
      { type: 'products_grid', settings: { heading: 'New arrivals' } },
      { type: 'flash_sale', settings: { variant: 'banner' } },
      { type: 'products_grid', settings: { heading: 'Best sellers', card_style: 'sale' } },
      { type: 'trust_badges' },
      { type: 'newsletter_form' },
    ],
  },
  {
    id: 'home-brand-story',
    name: 'Brand story',
    description: 'Story-led: slideshow, numbers, team and testimonials',
    icon: 'ph:heart-bold',
    pageType: 'home',
    sections: [
      { type: 'hero_slideshow' },
      { type: 'rich_text', settings: { heading: 'Made with care', body: 'Share what makes your brand different and why customers love it.' } },
      { type: 'stats_counter', settings: { variant: 'divided-band' } },
      { type: 'image_text' },
      { type: 'team_members', settings: { variant: 'minimal-circles' } },
      { type: 'testimonials' },
      { type: 'cta_banner', settings: { variant: 'split' } },
    ],
  },
  {
    id: 'home-minimal',
    name: 'Ultra minimal',
    description: 'Clean hero, one grid, a quote and a signup',
    icon: 'ph:circle-half-bold',
    pageType: 'home',
    sections: [
      { type: 'hero_split' },
      { type: 'products_grid', settings: { heading: 'Selected pieces' } },
      { type: 'quote_block', settings: { variant: 'plain' } },
      { type: 'newsletter_form' },
    ],
  },
  {
    id: 'home-sale',
    name: 'Big sale',
    description: 'Countdown, coupon, flash deals and FAQ',
    icon: 'ph:percent-bold',
    pageType: 'home',
    sections: [
      { type: 'announcement_bar', settings: { variant: 'pill' } },
      { type: 'hero_banner' },
      { type: 'countdown_timer' },
      { type: 'coupon_banner', settings: { variant: 'ticket' } },
      { type: 'flash_sale', settings: { variant: 'grid' } },
      { type: 'products_grid', settings: { heading: 'Everything on sale', card_style: 'sale' } },
      { type: 'faq_accordion' },
    ],
  },

  // ── More product page designs ─────────────────────────────────────
  {
    id: 'product-gallery',
    name: 'Gallery first',
    description: 'Sticky gallery with buy box, trust badges and tabs',
    icon: 'ph:images-bold',
    pageType: 'product',
    sections: [
      { type: 'breadcrumbs', settings: { variant: 'plain' } },
      { type: 'product_detail', settings: { variant: 'split' } },
      { type: 'trust_badges' },
      { type: 'product_tabs', settings: { variant: 'pills' } },
      { type: 'related_products', settings: { variant: 'carousel' } },
    ],
  },
  {
    id: 'product-story',
    name: 'Storytelling',
    description: 'Stacked layout with features, bundle and reviews',
    icon: 'ph:book-open-bold',
    pageType: 'product',
    sections: [
      { type: 'product_detail', settings: { variant: 'stacked' } },
      { type: 'image_text' },
      { type: 'features_grid', settings: { variant: 'cards' } },
      { type: 'bundle_deal', settings: { variant: 'banner' } },
      { type: 'product_reviews', settings: { variant: 'banner' } },
      { type: 'related_products' },
    ],
  },
  {
    id: 'product-minimal',
    name: 'Minimal',
    description: 'Classic buy box with accordion details',
    icon: 'ph:circle-half-bold',
    pageType: 'product',
    sections: [
      { type: 'product_detail', settings: { variant: 'classic' } },
      { type: 'product_tabs', settings: { variant: 'accordion' } },
      { type: 'related_products', settings: { variant: 'list' } },
    ],
  },
  {
    id: 'product-conversion',
    name: 'High-conversion',
    description: 'Promo bar, bundle, size guide, reviews and FAQ',
    icon: 'ph:lightning-bold',
    pageType: 'product',
    sections: [
      { type: 'announcement_bar', settings: { variant: 'minimal' } },
      { type: 'product_detail' },
      { type: 'bundle_deal', settings: { variant: 'cards' } },
      { type: 'size_guide', settings: { variant: 'split' } },
      { type: 'product_reviews', settings: { variant: 'sidebar' } },
      { type: 'faq_accordion' },
      { type: 'related_products' },
    ],
  },

  // ── More collection designs ───────────────────────────────────────
  {
    id: 'collection-banner',
    name: 'Banner + top filters',
    description: 'Hero banner with filters across the top',
    icon: 'ph:rectangle-bold',
    pageType: 'category',
    sections: [
      { type: 'collection_header', settings: { variant: 'banner' } },
      { type: 'collection_products', settings: { variant: 'top' } },
    ],
  },
  {
    id: 'collection-minimal',
    name: 'Minimal grid',
    description: 'Just a title and a clean product grid',
    icon: 'ph:circle-half-bold',
    pageType: 'category',
    sections: [
      { type: 'collection_header', settings: { variant: 'minimal' } },
      { type: 'collection_products', settings: { variant: 'minimal' } },
    ],
  },
  {
    id: 'collection-featured',
    name: 'Featured + grid',
    description: 'Split header, a spotlight product, then the grid',
    icon: 'ph:star-bold',
    pageType: 'category',
    sections: [
      { type: 'collection_header', settings: { variant: 'split' } },
      { type: 'product_featured' },
      { type: 'collection_products', settings: { variant: 'sidebar' } },
      { type: 'cta_banner', settings: { variant: 'centered' } },
    ],
  },

  // ── More cart / search / tracking designs ─────────────────────────
  {
    id: 'cart-cards',
    name: 'Cart with cards',
    description: 'Card layout, trust badges and suggestions',
    icon: 'ph:shopping-cart-bold',
    pageType: 'cart',
    sections: [
      { type: 'cart_items', settings: { variant: 'cards' } },
      { type: 'trust_badges' },
      { type: 'related_products', settings: { heading: 'Complete your order', variant: 'carousel' } },
    ],
  },
  {
    id: 'cart-compact',
    name: 'Compact cart',
    description: 'Slim cart with a coupon reminder',
    icon: 'ph:shopping-bag-bold',
    pageType: 'cart',
    sections: [
      { type: 'coupon_banner', settings: { variant: 'pill' } },
      { type: 'cart_items', settings: { variant: 'compact' } },
    ],
  },
  {
    id: 'search-visual',
    name: 'Visual search',
    description: 'List results with category shortcuts',
    icon: 'ph:magnifying-glass-bold',
    pageType: 'search',
    sections: [
      { type: 'search_results', settings: { variant: 'list' } },
      { type: 'categories_grid' },
    ],
  },
  {
    id: 'search-minimal',
    name: 'Minimal search',
    description: 'Search box and a clean results grid',
    icon: 'ph:circle-half-bold',
    pageType: 'search',
    sections: [{ type: 'search_results', settings: { variant: 'minimal' } }],
  },
  {
    id: 'track-minimal',
    name: 'Compact tracking',
    description: 'Compact tracker with a contact form',
    icon: 'ph:package-bold',
    pageType: 'track',
    sections: [
      { type: 'order_tracking', settings: { variant: 'compact' } },
      { type: 'contact_form' },
    ],
  },
  {
    id: 'track-timeline',
    name: 'Timeline tracking',
    description: 'Vertical timeline with help and FAQ',
    icon: 'ph:truck-bold',
    pageType: 'track',
    sections: [
      { type: 'order_tracking', settings: { variant: 'timeline' } },
      { type: 'steps_process' },
      { type: 'faq_accordion' },
    ],
  },

  // ── More content pages ────────────────────────────────────────────
  {
    id: 'about-team',
    name: 'About + team',
    description: 'Story, mission columns and the people behind it',
    icon: 'ph:users-bold',
    pageType: 'page',
    sections: [
      { type: 'hero_split' },
      { type: 'columns_text', settings: { variant: 'feature-rows' } },
      { type: 'team_members', settings: { variant: 'cards' } },
      { type: 'logo_bar' },
      { type: 'cta_banner' },
    ],
  },
  {
    id: 'contact-minimal',
    name: 'Contact (simple)',
    description: 'Short intro and a contact form',
    icon: 'ph:chat-circle-bold',
    pageType: 'page',
    sections: [
      { type: 'rich_text', settings: { heading: 'Contact us', body: 'Questions? We would love to hear from you.' } },
      { type: 'contact_form' },
    ],
  },
  {
    id: 'store-locator',
    name: 'Store locator',
    description: 'Map, opening hours and contact form',
    icon: 'ph:map-pin-bold',
    pageType: 'page',
    sections: [
      { type: 'map_location', settings: { variant: 'split' } },
      { type: 'contact_form' },
    ],
  },
  {
    id: 'policies-page',
    name: 'Shipping & returns',
    description: 'Tabbed policies with steps and FAQ',
    icon: 'ph:truck-bold',
    pageType: 'page',
    sections: [
      { type: 'rich_text', settings: { heading: 'Shipping & returns', body: 'Everything about delivery times, costs and returns.' } },
      { type: 'tabs_content', settings: { variant: 'vertical' } },
      { type: 'steps_process', settings: { variant: 'cards' } },
      { type: 'faq_accordion' },
    ],
  },
  {
    id: 'size-guide-page',
    name: 'Size guide',
    description: 'Size chart with measuring help',
    icon: 'ph:ruler-bold',
    pageType: 'page',
    sections: [
      { type: 'rich_text', settings: { heading: 'Size guide', body: 'Find your perfect fit.' } },
      { type: 'size_guide', settings: { variant: 'table' } },
      { type: 'faq_accordion' },
    ],
  },
  {
    id: 'lookbook-page',
    name: 'Lookbook',
    description: 'Gallery, quote, journal and social feed',
    icon: 'ph:camera-bold',
    pageType: 'page',
    sections: [
      { type: 'hero_slideshow' },
      { type: 'image_gallery' },
      { type: 'quote_block', settings: { variant: 'bar' } },
      { type: 'blog_posts', settings: { variant: 'featured' } },
      { type: 'social_feed', settings: { variant: 'circles' } },
    ],
  },
  {
    id: 'pricing-page',
    name: 'Plans & wholesale',
    description: 'Pricing table, comparison and FAQ',
    icon: 'ph:tag-bold',
    pageType: 'page',
    sections: [
      { type: 'rich_text', settings: { heading: 'Plans & pricing', body: 'Choose what works for you.' } },
      { type: 'pricing_table', settings: { variant: 'cards' } },
      { type: 'comparison_table', settings: { variant: 'table' } },
      { type: 'faq_accordion' },
      { type: 'cta_banner', settings: { variant: 'centered' } },
    ],
  },
  {
    id: 'blog-grid',
    name: 'Journal (list)',
    description: 'List-style stories with a signup',
    icon: 'ph:newspaper-bold',
    pageType: 'page',
    sections: [
      { type: 'rich_text', settings: { heading: 'Stories', body: 'News, guides and behind the scenes.' } },
      { type: 'blog_posts', settings: { variant: 'list' } },
      { type: 'newsletter_form' },
    ],
  },
]

export const getPageTemplate = (id: string) => PAGE_TEMPLATES.find((t) => t.id === id)

/** Materialize a template into concrete sections for a page. */
export function buildTemplateSections(
  templateId: string,
  pageId: string,
  storeId: string,
): PageSection[] {
  const template = getPageTemplate(templateId)
  if (!template) return []
  return template.sections.map((s, i) => ({
    id: `sec_${crypto.randomUUID().slice(0, 8)}`,
    page_id: pageId,
    store_id: storeId,
    type: s.type,
    settings: { ...createSectionSettings(s.type), ...(s.settings ?? {}) },
    sort_order: i,
    is_hidden: false,
  }))
}
