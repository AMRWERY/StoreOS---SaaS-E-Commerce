import type { Localized } from '@/types/shop'

/** Picks the active-locale string from mock data shaped `{ en, ar }`. */
export function useLocalized() {
  const { locale } = useI18n()
  const loc = (value: Localized | undefined | null) => (value ? (locale.value === 'ar' ? value.ar : value.en) : '')
  return { loc }
}

/** Gradient tones built only from design-token colours. */
export const TONE_CLASSES = [
  'from-brand-dim to-bg-elevated',
  'from-accent-dim to-bg-elevated',
  'from-info-dim to-bg-elevated',
  'from-success-dim to-bg-elevated',
  'from-status-purple-dim to-bg-elevated',
  'from-warning-dim to-bg-elevated',
]
export const toneClass = (tone: number) => TONE_CLASSES[tone % TONE_CLASSES.length]!
