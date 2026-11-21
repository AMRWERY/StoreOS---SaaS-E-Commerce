import type { PageSection } from '@/types/sections'
import { getSectionDefaults } from '@/data/section-registry'

/**
 * Read helpers for storefront section renderers.
 * Value lookup order: section.settings → registry defaults → explicit fallback.
 */
export const useSectionData = (section: MaybeRefOrGetter<PageSection>) => {
  const settings = computed<Record<string, unknown>>(() => {
    const s = toValue(section)
    return { ...getSectionDefaults(s.type), ...s.settings }
  })

  const str = (key: string, fallback = '') => {
    const v = settings.value[key]
    return v === undefined || v === null ? fallback : String(v)
  }

  const num = (key: string, fallback = 0) => {
    const n = Number(settings.value[key])
    return Number.isFinite(n) ? n : fallback
  }

  const bool = (key: string, fallback = false) => {
    const v = settings.value[key]
    return v === undefined || v === null ? fallback : Boolean(v)
  }

  /** Repeater values — always an array of plain records. */
  const list = <T = Record<string, any>>(key: string): T[] => {
    const v = settings.value[key]
    return Array.isArray(v) ? (v as T[]) : []
  }

  return { settings, str, num, bool, list }
}
