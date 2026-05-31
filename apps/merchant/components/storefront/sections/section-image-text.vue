<template>
  <div class="grid min-h-[280px] grid-cols-2">
    <div :class="str('image_side', 'left') === 'right' ? 'order-last' : ''" class="bg-cover bg-center bg-neutral-200"
      :style="{ backgroundImage: `url('${str('image_url') || 'https://images.unsplash.com/photo-1513519245088-0e12902e35ca?w=800&q=80'}')` }" />
    <div class="flex flex-col justify-center px-10 py-12">
      <h2 class="text-2xl font-bold text-neutral-900">
        {{ str('heading', str('headline', 'Our story')) }}
      </h2>
      <p class="mt-4 text-[15px] leading-relaxed text-neutral-600">
        {{ str('body', 'Tell your brand story, highlight what makes you special.') }}
      </p>
      <button v-if="str('cta_text')" type="button"
        class="mt-6 w-fit rounded-md bg-neutral-900 px-6 py-2.5 text-sm font-bold text-white">
        {{ str('cta_text') }}
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { PageSection } from '@/types/sections'

const props = defineProps<{ section: PageSection }>()

const str = (key: string, fallback = '') => String(props.section.settings[key] ?? fallback)
</script>