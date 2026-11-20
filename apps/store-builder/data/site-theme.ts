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

/** CSS custom properties applied on the site root (`.sb-site`). */
export function themeStyleVars(t: SiteTheme): Record<string, string> {
  return {
    '--site-primary': t.primary,
    '--site-primary-soft': `color-mix(in srgb, ${t.primary} 10%, white)`,
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
