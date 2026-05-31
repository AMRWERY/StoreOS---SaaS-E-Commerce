<template>
  <div class="px-8 py-14" :class="align === 'center' ? 'text-center' : align === 'right' ? 'text-right' : ''">
    <h2 v-if="str('heading', str('headline'))" class="text-2xl font-bold text-neutral-900">
      {{ str('heading', str('headline')) }}
    </h2>
    <div class="mx-auto mt-4 text-[15px] leading-relaxed text-neutral-600"
      :style="str('max_width') ? { maxWidth: str('max_width') } : { maxWidth: '42rem' }">
      {{ str('body', 'Start writing your content here.') }}
    </div>
    <button v-if="str('cta_text')" type="button"
      class="mt-6 inline-flex rounded-md bg-neutral-900 px-6 py-2.5 text-sm font-bold text-white hover:bg-neutral-800">
      {{ str('cta_text') }}
    </button>
  </div>
</template>

<script lang="ts" setup>
import type { PageSection } from '@/types/sections'

const props = defineProps<{ section: PageSection }>()
const str = (key: string, fallback = '') => String(props.section.settings[key] ?? fallback)
const align = computed(() => str('align', 'center'))
</script>