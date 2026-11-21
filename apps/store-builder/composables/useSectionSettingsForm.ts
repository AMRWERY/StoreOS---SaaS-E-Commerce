import { localizeSection, routePatch } from "@/data/localize"

/**
 * Two-way fields bound to `selectedSection.settings` for non–hero-banner panels.
 */
export const useSectionSettingsForm = () => {
  const store = useBuilderStore()

  /** The selected section as seen in the language being edited (translations laid over the base copy). */
  const section = computed(() => {
    const s = store.selectedSection
    return s ? localizeSection(s, store.contentLocale, store.defaultLocale) : null
  })

  const patch = (p: Record<string, unknown>) => {
    const s = store.selectedSection
    if (s)
      store.updateSectionSettings(s.id, routePatch(s, p, store.contentLocale, store.defaultLocale))
  }

  const str = (key: string, fallback = '') => {
    return computed({
      get: () => String(section.value?.settings[key] ?? fallback),
      set: (v: string) => {
        patch({ [key]: v })
      },
    })
  }

  const num = (key: string, fallback = 0) => {
    return computed({
      get: () => Number(section.value?.settings[key] ?? fallback),
      set: (v: number) => {
        patch({ [key]: v })
      },
    })
  }

  const bool = (key: string, fallback = false) => {
    return computed({
      get: () => Boolean(section.value?.settings[key] ?? fallback),
      set: (v: boolean) => {
        patch({ [key]: v })
      },
    })
  }

  return { section, patch, str, num, bool }
}
