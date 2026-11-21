import type { SectionCategory, SectionDefinition, SectionType, StorePageType } from "@/types/sections"
/**
 * Registry of every block a merchant can add. Each file in `./sections/`
 * default-exports one SectionDefinition (or an array of them); adding a block
 * means dropping a new file there plus its renderer in
 * `components/storefront/sections/section-<type-with-dashes>.vue`.
 */
const modules = import.meta.glob<{ default: SectionDefinition | SectionDefinition[] }>(
  './sections/*.ts',
  { eager: true },
)

const definitions: SectionDefinition[] = Object.values(modules).flatMap((m) =>
  Array.isArray(m.default) ? m.default : [m.default],
)

const byType = new Map<SectionType, SectionDefinition>(definitions.map((d) => [d.type, d]))

export const SECTION_DEFINITIONS: readonly SectionDefinition[] = definitions

export const getSectionDefinition = (type: SectionType): SectionDefinition | undefined => {
  return byType.get(type)
}

export const getSectionDefaults = (type: SectionType): Record<string, unknown> => {
  return byType.get(type)?.defaults ?? {}
}

/** Fresh, independent copy of a block's default settings. */
export const createSectionSettings = (type: SectionType): Record<string, unknown> => {
  return JSON.parse(JSON.stringify(getSectionDefaults(type)))
}

export const definitionsByCategory = (
  pageType?: StorePageType,
): { category: SectionCategory; items: SectionDefinition[] }[] => {
  const map = new Map<SectionCategory, SectionDefinition[]>()
  for (const d of definitions) {
    if (pageType && d.pages && !d.pages.includes(pageType)) continue
    if (!map.has(d.category)) map.set(d.category, [])
    map.get(d.category)!.push(d)
  }
  return [...map.entries()].map(([category, items]) => ({ category, items }))
}
