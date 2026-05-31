<template>
  <div class="grid min-h-[320px] grid-cols-2">
    <div :class="str('image_side', 'right') === 'left' ? 'order-last' : ''"
      class="flex flex-col justify-center bg-neutral-900 px-10 py-12">
      <h2 class="text-2xl font-bold text-white">
        {{ str('headline', 'Split Hero') }}
      </h2>
      <p class="mt-3 text-sm text-neutral-400">
        {{ str('subheadline', 'Supporting text goes right here.') }}
      </p>
      <button v-if="str('cta_text', 'Learn More')" type="button"
        class="mt-6 w-fit rounded-md bg-white px-6 py-2.5 text-xs font-bold text-neutral-900">
        {{ str('cta_text', 'Learn More') }}
      </button>
    </div>
    <div class="bg-cover bg-center bg-neutral-700"
      :style="{ backgroundImage: `url('${str('image_url') || 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80'}')` }" />
  </div>
</template>

<script lang="ts" setup>
import type { PageSection } from '@/types/sections'

const props = defineProps<{ section: PageSection }>()

const str = (key: string, fallback = '') => String(props.section.settings[key] ?? fallback)
</script>