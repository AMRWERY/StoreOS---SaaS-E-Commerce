import type { PageSection, SectionType } from '@/types/sections'
import { getSectionDefinition } from '@/data/section-registry'

export type StoreLocale = 'en' | 'ar'

export const STORE_LOCALES: { code: StoreLocale; label: string; native: string; dir: 'ltr' | 'rtl' }[] = [
  { code: 'en', label: 'English', native: 'English', dir: 'ltr' },
  { code: 'ar', label: 'Arabic', native: 'العربية', dir: 'rtl' },
]

export const localeDir = (code: StoreLocale) => STORE_LOCALES.find((l) => l.code === code)?.dir ?? 'ltr'

/** Translations live next to the base settings: `settings.i18n.ar.heading`. */
type I18nBag = Partial<Record<StoreLocale, Record<string, unknown>>>

const NON_TEXT_KEY = /(color|colour|url|href|link|image|img|src|icon|align|style|layout|variant|position|anchor|css|class|id|type|size|width|height|source|embed|date|handle|number|phone|email|code)/i

/**
 * Only copy a setting is translated when it is text (or a repeater of text).
 * Uses the block's schema when it has one, otherwise a key-name heuristic (legacy blocks).
 */
export function isTranslatableKey(type: SectionType, key: string, value: unknown): boolean {
  if (key === 'i18n') return false
  const def = getSectionDefinition(type)
  const field = def?.groups?.flatMap((g) => g.fields).find((f) => f.key === key)
  if (field) return field.type === 'text' || field.type === 'textarea' || field.type === 'repeater'
  if (Array.isArray(value)) return true
  return typeof value === 'string' && !NON_TEXT_KEY.test(key)
}

/** Section with the chosen locale's translations laid over its base settings. */
export function localizeSection(section: PageSection, locale: StoreLocale, defaultLocale: StoreLocale): PageSection {
  if (locale === defaultLocale) return section
  const overrides = (section.settings.i18n as I18nBag | undefined)?.[locale]
  if (!overrides) return section
  return { ...section, settings: { ...section.settings, ...overrides } }
}

/** Split a settings patch into base keys and per-locale translations. */
export function routePatch(
  section: PageSection,
  patch: Record<string, unknown>,
  locale: StoreLocale,
  defaultLocale: StoreLocale,
): Record<string, unknown> {
  if (locale === defaultLocale) return patch
  const base: Record<string, unknown> = {}
  const translated: Record<string, unknown> = {}
  for (const [key, value] of Object.entries(patch)) {
    if (isTranslatableKey(section.type, key, value)) translated[key] = value
    else base[key] = value
  }
  if (!Object.keys(translated).length) return base
  const bag = (section.settings.i18n as I18nBag | undefined) ?? {}
  return { ...base, i18n: { ...bag, [locale]: { ...(bag[locale] ?? {}), ...translated } } }
}
