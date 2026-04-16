<template>
  <Teleport to="body">
    <div v-if="addSectionOpen" class="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-6" role="dialog"
      aria-modal="true" aria-labelledby="add-section-title">
      <div class="absolute inset-0 bg-black/65 backdrop-blur-sm" aria-hidden="true" @click="addSectionOpen = false" />
      <div
        class="relative max-h-[min(90vh,880px)] w-full max-w-4xl overflow-y-auto rounded-2xl border border-border-subtle bg-bg-base p-6 shadow-2xl">
        <header class="mb-6 flex items-start justify-between gap-4">
          <div>
            <h2 id="add-section-title" class="text-lg font-bold tracking-wide text-tx-primary">
              Add section
            </h2>
            <p class="mt-1 text-sm text-tx-secondary">
              Choose a block; it is appended to the end of the page.
            </p>
          </div>
          <button type="button"
            class="rounded-lg border border-border-subtle p-2 text-tx-muted transition-colors hover:bg-bg-elevated hover:text-tx-primary"
            @click="addSectionOpen = false">
            <Icon name="ph:x-bold" class="text-xl" />
          </button>
        </header>
        <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <section-template-card v-for="item in builderSectionTemplates" :key="item.id" :title="item.title"
            :description="item.description" :popular="item.popular" :variant="item.variant"
            @select="addFromTemplate(item.id)" />
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script lang="ts" setup>
import { builderSectionTemplates } from '@/data/builder-section-templates'
import type { PageSection, SectionType } from '@/types/sections'

const { addSectionOpen } = useBuilderModals()
const store = useBuilderStore()

const templateToType: Record<string, SectionType> = {
  blank: 'spacer',
  'split-hero': 'hero_split',
  'feature-grid': 'products_grid',
  'simple-text': 'rich_text',
  'metrics-row': 'trust_badges',
  'contact-form': 'contact_form',
  'logo-cloud': 'logo_bar',
}

function defaultSettings(type: SectionType): Record<string, unknown> {
  switch (type) {
    case 'rich_text':
      return { heading: 'New block', body: 'Start writing…' }
    case 'products_grid':
      return { heading: 'Products', columns: 3 }
    case 'hero_split':
      return { headline: 'Split hero', subheadline: 'Supporting line.' }
    case 'trust_badges':
      return { heading: 'Why shop with us' }
    case 'contact_form':
      return { heading: 'Contact us', submitLabel: 'Send' }
    case 'logo_bar':
      return { heading: 'As seen in' }
    case 'spacer':
      return { height: 48 }
    default:
      return {}
  }
}

function addFromTemplate(templateId: string) {
  const page = store.currentPage
  if (!page)
    return
  const type = templateToType[templateId] ?? 'rich_text'
  const id = `sec_${crypto.randomUUID().slice(0, 8)}`
  const section: PageSection = {
    id,
    page_id: page.id,
    store_id: page.store_id,
    type,
    settings: defaultSettings(type),
    sort_order: store.sections.length,
    is_hidden: false,
  }
  store.appendSection(section)
  addSectionOpen.value = false
}
</script>