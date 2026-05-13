<template>
  <div class="min-h-0 flex-1 overflow-y-auto">
    <div class="mx-auto max-w-6xl">
      <header class="mb-8 flex items-start justify-between gap-4">
        <div>
          <h1 class="text-lg font-bold tracking-wide text-tx-primary md:text-xl">
            All Sections
          </h1>
          <p class="mt-1 text-sm text-tx-secondary">
            Choose a section template to add to your page.
          </p>
        </div>
        <nuxt-link-locale :to="`/dashboard/builder/${store.currentPage?.slug ?? 'home'}`"
          class="flex items-center gap-1.5 rounded-lg border border-border-subtle px-3 py-2 text-[11px] font-bold text-tx-secondary transition-colors hover:bg-bg-elevated hover:text-tx-primary">
          <Icon name="ph:arrow-left-bold" class="text-[13px]" />
          Back to builder
        </nuxt-link-locale>
      </header>

      <div class="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
        <SectionTemplateCard v-for="item in builderSectionTemplates" :key="item.id" :title="item.title"
          :description="item.description" :popular="item.popular" :variant="item.variant" @select="onSelect(item)" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { builderSectionTemplates } from '@/data/builder-section-templates'
import type { BuilderSectionTemplate, SectionType } from '@/types/builder'
import type { PageSection } from '@/types/sections'

const store = useBuilderStore()
const localePath = useLocalePath()

const templateToType: Record<string, SectionType> = {
  blank: 'spacer',
  'split-hero': 'hero_split',
  'feature-grid': 'products_grid',
  'simple-text': 'rich_text',
  'metrics-row': 'trust_badges',
  'contact-form': 'contact_form',
  'logo-cloud': 'logo_bar',
}

const defaultSettings = (type: SectionType): Record<string, unknown> => {
  switch (type) {
    case 'rich_text': return { heading: 'New block', body: 'Start writing…' }
    case 'products_grid': return { heading: 'Products', columns: 3 }
    case 'hero_split': return { headline: 'Split hero', subheadline: 'Supporting line.' }
    case 'trust_badges': return { heading: 'Why shop with us' }
    case 'contact_form': return { heading: 'Contact us', submitLabel: 'Send' }
    case 'logo_bar': return { heading: 'As seen in' }
    case 'spacer': return { height: 48 }
    default: return {}
  }
};

const onSelect = async (item: BuilderSectionTemplate) => {
  const page = store.currentPage
  if (!page) return
  const type = (templateToType[item.id] ?? 'rich_text') as SectionType
  const section: PageSection = {
    id: `sec_${crypto.randomUUID().slice(0, 8)}`,
    page_id: page.id,
    store_id: page.store_id,
    type,
    settings: defaultSettings(type),
    sort_order: store.sections.length,
    is_hidden: false,
  }
  store.appendSection(section)
  await navigateTo(localePath(`/dashboard/builder/${page.slug}`))
};

definePageMeta({ layout: 'builder' })

useSeoMeta({
  title: () => `Builder — ${pageSlug.value || "Page"}`,
  robots: "noindex, nofollow",
});
</script>