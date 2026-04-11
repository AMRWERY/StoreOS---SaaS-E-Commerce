import type { PageSection } from './sections'

export type DeviceMode = 'desktop' | 'tablet' | 'mobile'

export type PanelMode =
  | 'section-settings'
  | 'page-settings'
  | 'theme-settings'
  | 'empty'

export interface HistoryEntry {
  sections: PageSection[]
}

export interface BuilderState {
  currentPageSlug: string
  selectedSectionId: string | null
  hoveredSectionId: string | null
  device: DeviceMode
  panelMode: PanelMode
  isDirty: boolean
  isSaving: boolean
  isPublishing: boolean
  history: HistoryEntry[]
  historyIndex: number
}

/** Aligns with `store_themes` (migration 013). */
export interface StoreTheme {
  id: string
  store_id: string
  primary_color: string
  secondary_color: string
  bg_color: string
  text_color: string
  surface_color: string
  border_color: string
  success_color: string
  danger_color: string
  heading_font: string
  body_font: string
  font_size_base: number
  heading_weight: number
  border_radius: 'none' | 'small' | 'medium' | 'large' | 'full'
  button_style: 'square' | 'rounded' | 'pill'
  container_width: number
  navbar_style: 'default' | 'centered' | 'minimal' | 'transparent'
  navbar_bg: string
  navbar_text_color: string
  footer_style: 'default' | 'minimal' | 'expanded'
  show_announcement_bar: boolean
  announcement_text: string | null
  announcement_bg: string
  announcement_color: string
  show_search: boolean
  show_wishlist: boolean
  show_cart_drawer: boolean
}

export interface BuilderSidebarSection {
  id: number
  name: string
  active: boolean
  /** When true, section is hidden on the storefront (eye-slash in list). */
  hidden: boolean
}
