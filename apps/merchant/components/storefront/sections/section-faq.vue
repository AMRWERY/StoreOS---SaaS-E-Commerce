<template>
  <div class="px-8 py-14">
    <h2 class="mb-8 text-center text-xl font-bold text-neutral-900">
      {{ str('heading', str('title', 'Frequently asked questions')) }}
    </h2>
    <div class="mx-auto max-w-2xl divide-y divide-neutral-200 border-t border-neutral-200">
      <template v-if="displayItems.length">
        <details v-for="(item, i) in displayItems" :key="i" class="group">
          <summary
            class="flex cursor-pointer items-center justify-between py-4 text-sm font-medium text-neutral-900 list-none">
            {{ item.question || item.q || `Sample question ${i + 1}?` }}
            <Icon name="ph:plus-bold"
              class="shrink-0 text-sm text-neutral-500 transition-transform group-open:rotate-45" />
          </summary>
          <p v-if="item.answer || item.a" class="pb-4 text-sm text-neutral-600 leading-relaxed">
            {{ item.answer || item.a }}
          </p>
        </details>
      </template>
      <template v-else>
        <div v-for="i in 4" :key="i" class="flex items-center justify-between py-4">
          <p class="text-sm font-medium text-neutral-900">Sample question {{ i }}?</p>
          <Icon name="ph:plus-bold" class="shrink-0 text-sm text-neutral-500" />
        </div>
      </template>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { PageSection } from '@/types/sections'

const props = defineProps<{ section: PageSection }>()

const str = (key: string, fallback = '') => String(props.section.settings[key] ?? fallback)

const displayItems = computed(() => (props.section.settings['items'] as any[]) ?? [])
</script>