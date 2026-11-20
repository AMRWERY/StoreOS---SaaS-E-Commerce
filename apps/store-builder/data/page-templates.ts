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
