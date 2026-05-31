<template>
  <div class="px-8 py-14">
    <h2 class="mb-8 text-center text-xl font-bold text-neutral-900">
      {{ str('heading', str('title', 'What our customers say')) }}
    </h2>
    <div class="grid grid-cols-3 gap-6">
      <div v-for="(item, i) in displayItems" :key="i"
        class="rounded-xl border border-neutral-200 bg-white p-6 shadow-sm">
        <div class="mb-3 flex text-amber-400">
          <Icon v-for="s in 5" :key="s" name="ph:star-fill" class="text-sm" />
        </div>
        <p class="text-sm text-neutral-600">"{{ item.text }}"</p>
        <p class="mt-4 text-xs font-semibold text-neutral-800">— {{ item.name }}</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { PageSection } from '@/types/sections'

const props = defineProps<{ section: PageSection }>()
const str = (key: string, fallback = '') => String(props.section.settings[key] ?? fallback)

const FALLBACK_ITEMS = [
  { text: 'Great product, highly recommended to everyone who values quality!', name: 'Happy Customer 1' },
  { text: 'Fast shipping and exactly as described. Will definitely order again.', name: 'Happy Customer 2' },
  { text: 'Exceeded my expectations. The quality is outstanding for the price.', name: 'Happy Customer 3' },
]

const displayItems = computed(() => {
  const items = props.section.settings['items'] as any[]
  return items?.length ? items : FALLBACK_ITEMS
})
</script>