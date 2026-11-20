/** Navbar / footer designs the merchant can pick from. */

export type NavbarStyle =
  | 'classic'
  | 'centered'
  | 'dark'
  | 'minimal'
  | 'split'
  | 'floating'
  | 'announcement'
  | 'search'
  | 'transparent'

export type FooterStyle =
  | 'columns'
  | 'centered'
  | 'newsletter'
  | 'minimal'
  | 'big-brand'
  | 'split'
  | 'cards'
  | 'payments'

export interface ChromeStyleOption<T extends string> {
  value: T
  label: string
  description: string
  /** Dark designs get a dark thumbnail background. */
  dark: boolean
}

export const NAVBAR_STYLE_OPTIONS: ChromeStyleOption<NavbarStyle>[] = [
  { value: 'classic', label: 'Classic', description: 'Logo · links · icons', dark: false },
  { value: 'centered', label: 'Centered', description: 'Logo centered · links below', dark: false },
  { value: 'dark', label: 'Dark', description: 'Dark bg · white text · CTA', dark: true },
  { value: 'minimal', label: 'Minimal', description: 'Clean · cart badge', dark: false },
  { value: 'split', label: 'Split + CTA', description: 'Logo · centered links · button', dark: false },
  { value: 'floating', label: 'Floating pill', description: 'Rounded bar with shadow', dark: false },
  { value: 'announcement', label: 'With promo bar', description: 'Announcement strip on top', dark: false },
  { value: 'search', label: 'Search first', description: 'Wide search · links below', dark: false },
  { value: 'transparent', label: 'Transparent', description: 'Sits over your hero image', dark: true },
]

export const FOOTER_STYLE_OPTIONS: ChromeStyleOption<FooterStyle>[] = [
  { value: 'columns', label: 'Columns', description: 'Dark · multi-column links', dark: true },
  { value: 'centered', label: 'Centered', description: 'Light · centered links', dark: false },
  { value: 'newsletter', label: 'Newsletter', description: 'Dark · signup card', dark: true },
  { value: 'minimal', label: 'Minimal', description: 'One slim row', dark: false },
  { value: 'big-brand', label: 'Big brand', description: 'Giant wordmark', dark: true },
  { value: 'split', label: 'Split', description: 'Signup left · links right', dark: false },
  { value: 'cards', label: 'Link cards', description: 'Each column in a card', dark: false },
  { value: 'payments', label: 'Payments', description: 'Links + payment badges', dark: false },
]
