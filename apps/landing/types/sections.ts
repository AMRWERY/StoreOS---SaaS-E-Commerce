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
