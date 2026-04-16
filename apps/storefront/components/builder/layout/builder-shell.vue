<template>
  <div class="flex min-h-0 w-full flex-1 flex-col gap-6 xl:flex-row xl:items-stretch xl:gap-0">
    <BuilderPreview class="min-h-[480px] min-w-0 flex-1 xl:h-full xl:min-h-0" />

    <BuilderRightPanel />

    <AddSectionModal />

    <PublishModal />

    <CreatePageModal />

    <DeletePageModal />

    <TemplatePickerModal />

    <PlanGateOverlay />
  </div>
</template>

<script lang="ts" setup>
const store = useBuilderStore()
const route = useRoute()

const hero = reactive<BuilderEditorHero>({
  headline: 'Redefining Minimalist Design.',
  subheadline:
    'Discover a curated collection of artisanal furniture designed for the modern sanctuary.',
  buttonText: 'Shop Collection',
})

provide(builderEditorHeroKey, hero)

onMounted(() => {
  store.loadPageBySlug(String(route.params.pageSlug ?? 'home'))
})

// When the user navigates to a different page slug via the URL or pages list
watch(
  () => route.params.pageSlug,
  (slug) => {
    if (slug) store.loadPageBySlug(String(slug))
  },
)

// Keep hero inject in sync with the selected hero_banner section settings
watch(
  () => store.selectedSection,
  (s) => {
    if (s?.type !== 'hero_banner') return
    hero.headline = String(s.settings.headline ?? hero.headline)
    hero.subheadline = String(s.settings.subheadline ?? hero.subheadline)
    hero.buttonText = String(s.settings.buttonText ?? hero.buttonText)
  },
  { immediate: true },
)

// When the settings panel edits the hero inject, push back to the store
watch(
  hero,
  () => {
    const s = store.selectedSection
    if (s?.type !== 'hero_banner') return
    const next = {
      headline: hero.headline,
      subheadline: hero.subheadline,
      buttonText: hero.buttonText,
    }
    const cur = s.settings
    if (
      String(cur.headline) === next.headline
      && String(cur.subheadline) === next.subheadline
      && String(cur.buttonText) === next.buttonText
    ) {
      return
    }
    store.updateSectionSettings(s.id, next)
  },
  { deep: true },
)
</script>
