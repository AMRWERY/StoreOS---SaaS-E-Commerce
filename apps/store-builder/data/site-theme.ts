/** Site-wide look & brand settings the merchant controls. */

export interface SiteTheme {
  primary: string
  /** Dark areas (dark navbar/footer, black buttons). */
  secondary: string
  background: string
  text: string
  headingFont: string
  bodyFont: string
  radius: 'none' | 'small' | 'medium' | 'large'
  buttonStyle: 'default' | 'square' | 'pill'
}

/** Defaults reproduce the blocks' built-in look (indigo + neutral). */
export const DEFAULT_THEME: SiteTheme = {
  primary: '#4f46e5',
  secondary: '#171717',
  background: '#ffffff',
  text: '#171717',
  headingFont: 'Inter',
  bodyFont: 'Inter',
  radius: 'medium',
  buttonStyle: 'default',
}

export interface Announcement {
  enabled: boolean
  text: string
  /** Per-language text (multi-language stores). */
  textI18n?: Partial<Record<'en' | 'ar', string>>
  bg: string
  color: string
}

export const DEFAULT_ANNOUNCEMENT: Announcement = {
  enabled: false,
  text: 'Free shipping on orders over $50',
  bg: '#4f46e5',
  color: '#ffffff',
}

export interface SiteSettings {
  logoUrl: string
  faviconUrl: string
  email: string
  phone: string
  address: string
  social: Record<'instagram' | 'facebook' | 'x' | 'tiktok' | 'youtube' | 'whatsapp', string>
  gaId: string
  pixelId: string
  customCss: string
  maintenance: boolean
  maintenanceMessage: string
  maintenanceMessageI18n?: Partial<Record<'en' | 'ar', string>>
  /** Custom JavaScript added to the published site's <head> (after cookie consent when the banner is on). */
  headScripts: string
  /** Ask visitors for cookie consent before loading analytics / custom scripts. */
  cookieBanner: boolean
}

export const DEFAULT_SITE_SETTINGS: SiteSettings = {
  logoUrl: '',
  faviconUrl: '',
  email: '',
  phone: '',
  address: '',
  social: { instagram: '', facebook: '', x: '', tiktok: '', youtube: '', whatsapp: '' },
  gaId: '',
  pixelId: '',
  customCss: '',
  maintenance: false,
  maintenanceMessage: 'We are getting things ready. Please check back soon.',
  headScripts: '',
  cookieBanner: true,
}

export const SOCIAL_ICONS: Record<keyof SiteSettings['social'], string> = {
  instagram: 'ph:instagram-logo-bold',
  facebook: 'ph:facebook-logo-bold',
  x: 'ph:x-logo-bold',
  tiktok: 'ph:tiktok-logo-bold',
  youtube: 'ph:youtube-logo-bold',
  whatsapp: 'ph:whatsapp-logo-bold',
}

export const FONT_OPTIONS = [
  { value: 'Inter', label: 'Inter' },
  { value: 'DM Sans', label: 'DM Sans' },
  { value: 'Poppins', label: 'Poppins' },
  { value: 'Space Grotesk', label: 'Space Grotesk' },
  { value: 'Playfair Display', label: 'Playfair Display (serif)' },
  { value: 'Lora', label: 'Lora (serif)' },
  { value: 'Cairo', label: 'Cairo (Arabic + Latin)' },
  { value: 'Tajawal', label: 'Tajawal (Arabic + Latin)' },
  { value: 'IBM Plex Sans Arabic', label: 'IBM Plex Sans Arabic' },
  { value: 'Noto Kufi Arabic', label: 'Noto Kufi Arabic' },
  { value: 'system-ui', label: 'System UI' },
]

/** Google Fonts stylesheet for the fonts in use (null when only system fonts are used). */
export function googleFontsHref(fonts: string[]): string | null {
  const families = [...new Set(fonts)].filter((f) => f && f !== 'system-ui')
  if (!families.length) return null
  return (
    'https://fonts.googleapis.com/css2?' +
    families.map((f) => `family=${encodeURIComponent(f).replace(/%20/g, '+')}:wght@400;500;600;700;800`).join('&') +
    '&display=swap'
  )
}

const stack = (font: string) => (font === 'system-ui' ? 'system-ui, sans-serif' : `'${font}', system-ui, sans-serif`)

/** True when a #rrggbb color is dark enough that light text should sit on it. */
export function isDarkColor(hex: string): boolean {
  const m = /^#?([0-9a-f]{6})$/i.exec(hex.trim())
  if (!m) return false
  const n = parseInt(m[1], 16)
  const [r, g, b] = [(n >> 16) & 255, (n >> 8) & 255, n & 255].map((v) => {
    const c = v / 255
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4
  })
  return 0.2126 * r + 0.7152 * g + 0.0722 * b < 0.35
}

export interface ThemePreset {
  id: string
  label: string
  theme: Partial<SiteTheme>
}

export const THEME_PRESETS: ThemePreset[] = [
  { id: 'light', label: 'Light', theme: { primary: '#4f46e5', secondary: '#171717', background: '#ffffff', text: '#171717' } },
  { id: 'dark', label: 'Dark', theme: { primary: '#818cf8', secondary: '#27272a', background: '#0b0b12', text: '#f4f4f5' } },
  { id: 'warm', label: 'Warm', theme: { primary: '#c2410c', secondary: '#431407', background: '#fffbf5', text: '#292524' } },
  { id: 'ocean', label: 'Ocean', theme: { primary: '#0369a1', secondary: '#082f49', background: '#f8fcff', text: '#0c1a26' } },
  { id: 'rose', label: 'Rose', theme: { primary: '#e11d48', secondary: '#4c0519', background: '#fff8f9', text: '#27121a' } },
  { id: 'midnight', label: 'Midnight', theme: { primary: '#22d3ee', secondary: '#111827', background: '#0f172a', text: '#e2e8f0' } },
]

/** CSS custom properties applied on the site root (`.sb-site`). */
export function themeStyleVars(t: SiteTheme): Record<string, string> {
  return {
    '--site-surface': `color-mix(in srgb, ${t.background} 90%, ${t.text})`,
    '--site-surface-2': `color-mix(in srgb, ${t.background} 82%, ${t.text})`,
    '--site-border': `color-mix(in srgb, ${t.background} 72%, ${t.text})`,
    '--site-muted': `color-mix(in srgb, ${t.text} 68%, ${t.background})`,
    '--site-muted-2': `color-mix(in srgb, ${t.text} 48%, ${t.background})`,
    '--site-primary': t.primary,
    '--site-primary-soft': `color-mix(in srgb, ${t.primary} 14%, ${t.background})`,
    '--site-primary-dark': `color-mix(in srgb, ${t.primary} 85%, black)`,
    '--site-secondary': t.secondary,
    '--site-secondary-dark': `color-mix(in srgb, ${t.secondary} 85%, black)`,
    '--site-bg': t.background,
    '--site-text': t.text,
    '--site-heading-font': stack(t.headingFont),
    '--site-body-font': stack(t.bodyFont),
  }
}

/** Theme corner radius → the shared `data-corners` vocabulary. */
export const RADIUS_TO_CORNERS: Record<SiteTheme['radius'], string | undefined> = {
  none: 'sharp',
  small: 'soft',
  medium: undefined,
  large: 'round',
}
