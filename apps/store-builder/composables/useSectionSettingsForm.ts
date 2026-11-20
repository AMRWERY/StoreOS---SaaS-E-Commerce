import { localizeSection, routePatch } from "@/data/localize"

/**
 * Two-way fields bound to `selectedSection.settings` for non–hero-banner panels.
 */
export function useSectionSettingsForm() {
  const store = useBuilderStore()

  /** The selected section as seen in the language being edited (translations laid over the base copy). */
  const section = computed(() => {
    const s = store.selectedSection
    return s ? localizeSection(s, store.contentLocale, store.defaultLocale) : null
  })

  function patch(p: Record<string, unknown>) {
    const s = store.selectedSection
    if (s)
      store.updateSectionSettings(s.id, routePatch(s, p, store.contentLocale, store.defaultLocale))
  }

  function str(key: string, fallback = '') {
    return computed({
      get: () => String(section.value?.settings[key] ?? fallback),
      set: (v: string) => {
        patch({ [key]: v })
      },
    })
  }

  function num(key: string, fallback = 0) {
    return computed({
      get: () => Number(section.value?.settings[key] ?? fallback),
      set: (v: number) => {
        patch({ [key]: v })
      },
    })
  }

  function bool(key: string, fallback = false) {
    return computed({
      get: () => Boolean(section.value?.settings[key] ?? fallback),
      set: (v: boolean) => {
        patch({ [key]: v })
      },
    })
  }

  return { section, patch, str, num, bool }
}
