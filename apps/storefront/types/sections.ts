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
