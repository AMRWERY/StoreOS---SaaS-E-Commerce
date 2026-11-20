export type SectionType =
  | 'hero_banner'
  | 'hero_slideshow'
  | 'hero_split'
  | 'hero_video'
  | 'products_grid'
  | 'products_carousel'
  | 'product_featured'
  | 'categories_grid'
  | 'rich_text'
  | 'image_text'
  | 'image_gallery'
  | 'banner_full'
  | 'banner_split'
  | 'countdown_timer'
  | 'testimonials'
  | 'trust_badges'
  | 'logo_bar'
  | 'faq_accordion'
  | 'newsletter_form'
  | 'contact_form'
  | 'video_embed'
  | 'spacer'
  | 'divider'
  | 'custom_html'
  | 'product_detail'
  | 'product_tabs'
  | 'product_reviews'
  | 'related_products'
  | 'collection_header'
  | 'collection_products'
  | 'cart_items'
  | 'search_results'
  | 'order_tracking'
  | 'bundle_deal'
  | 'flash_sale'
  | 'size_guide'
  | 'features_grid'
  | 'stats_counter'
  | 'steps_process'
  | 'pricing_table'
  | 'team_members'
  | 'cta_banner'
  | 'social_feed'
  | 'map_location'
  | 'tabs_content'
  | 'columns_text'
  | 'icon_list'
  | 'quote_block'
  | 'comparison_table'
  | 'marquee_text'
  | 'blog_posts'
  | 'announcement_bar'
  | 'breadcrumbs'
  | 'button_group'
  | 'coupon_banner'
  | 'floating_chat'

export const SECTION_TYPE_LABELS: Record<SectionType, string> = {
  hero_banner: 'Hero banner',
  hero_slideshow: 'Hero slideshow',
  hero_split: 'Split hero',
  hero_video: 'Hero video',
  products_grid: 'Products grid',
  products_carousel: 'Products carousel',
  product_featured: 'Featured product',
  categories_grid: 'Categories grid',
  rich_text: 'Rich text',
  image_text: 'Image & text',
  image_gallery: 'Image gallery',
  banner_full: 'Full-width banner',
  banner_split: 'Split banner',
  countdown_timer: 'Countdown',
  testimonials: 'Testimonials',
  trust_badges: 'Trust badges',
  logo_bar: 'Logo bar',
  faq_accordion: 'FAQ',
  newsletter_form: 'Newsletter',
  contact_form: 'Contact form',
  video_embed: 'Video',
  spacer: 'Spacer',
  divider: 'Divider',
  custom_html: 'Custom HTML',
  product_detail: 'Product detail',
  product_tabs: 'Product tabs',
  product_reviews: 'Product reviews',
  related_products: 'Related products',
  collection_header: 'Collection header',
  collection_products: 'Collection products',
  cart_items: 'Cart',
  search_results: 'Search results',
  order_tracking: 'Order tracking',
  bundle_deal: 'Bundle deal',
  flash_sale: 'Flash sale',
  size_guide: 'Size guide',
  features_grid: 'Features grid',
  stats_counter: 'Stats counter',
  steps_process: 'Steps / process',
  pricing_table: 'Pricing table',
  team_members: 'Team members',
  cta_banner: 'Call to action',
  social_feed: 'Social feed',
  map_location: 'Map & location',
  tabs_content: 'Tabs',
  columns_text: 'Text columns',
  icon_list: 'Icon list',
  quote_block: 'Quote',
  comparison_table: 'Comparison table',
  marquee_text: 'Scrolling text',
  blog_posts: 'Blog posts',
  announcement_bar: 'Announcement bar',
  breadcrumbs: 'Breadcrumbs',
  button_group: 'Buttons',
  coupon_banner: 'Coupon banner',
  floating_chat: 'Floating chat button',
}

export interface PageSection {
  id: string
  page_id: string
  store_id: string
  type: SectionType
  settings: Record<string, unknown>
  sort_order: number
  is_hidden: boolean
}

export type StorePageType =
  | 'home'
  | 'product'
  | 'category'
  | 'cart'
  | 'checkout'
  | 'order_confirmed'
  | 'track'
  | 'page'
  | 'search'

export interface StorePage {
  id: string
  store_id: string
  type: StorePageType
  slug: string
  title: string
  seo_title: string | null
  seo_desc: string | null
  og_image?: string | null
  is_published: boolean
  is_system: boolean
  show_in_nav: boolean
  nav_label?: string | null
  nav_order: number
}

export interface SectionRegistryEntry {
  type: SectionType
  name: string
  category: string
  description: string
  popular?: boolean
  thumbnail: string
}

// ── Section definitions (registry) ─────────────────────────────────

export type SectionCategory =
  | 'hero'
  | 'products'
  | 'product_page'
  | 'collection'
  | 'cart'
  | 'content'
  | 'media'
  | 'social_proof'
  | 'marketing'
  | 'forms'
  | 'layout'

export const SECTION_CATEGORY_LABELS: Record<SectionCategory, string> = {
  hero: 'Hero & banners',
  products: 'Products',
  product_page: 'Product page',
  collection: 'Collection & search',
  cart: 'Cart & orders',
  content: 'Content',
  media: 'Media',
  social_proof: 'Trust & social proof',
  marketing: 'Promotions',
  forms: 'Forms & contact',
  layout: 'Layout & utilities',
}

interface FieldBase {
  key: string
  label: string
  hint?: string
}

export type SimpleFieldDef =
  | (FieldBase & { type: 'text' | 'textarea' | 'url' | 'image' | 'color'; placeholder?: string; rows?: number })
  | (FieldBase & { type: 'number'; min?: number; max?: number; step?: number; unit?: string })
  | (FieldBase & { type: 'toggle' })
  | (FieldBase & {
      type: 'select'
      options: { value: string; label: string; /** Phosphor icon, shown in card display. */ icon?: string; description?: string }[]
      /** `cards` renders visual option cards (use for the block's "Design" picker). */
      display?: 'cards'
    })

export type FieldDef =
  | SimpleFieldDef
  | (FieldBase & {
      type: 'repeater'
      /** Fields shown for every item (no nested repeaters). */
      itemFields: SimpleFieldDef[]
      /** Template for a freshly added item. */
      newItem: Record<string, unknown>
    })

export interface FieldGroup {
  title: string
  open?: boolean
  fields: FieldDef[]
}

export interface SectionDefinition {
  type: SectionType
  name: string
  category: SectionCategory
  description: string
  /** Phosphor icon, e.g. `ph:shopping-bag-bold`. */
  icon: string
  popular?: boolean
  /** Page types this block is meant for (omit = anywhere). */
  pages?: StorePageType[]
  /** Settings a freshly added section starts with. Renderers fall back to these too. */
  defaults: Record<string, unknown>
  /** Schema for the generic settings form. Legacy blocks have hand-written forms and omit it. */
  groups?: FieldGroup[]
}
