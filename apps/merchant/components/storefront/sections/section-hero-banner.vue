<template>
  <div class="relative flex min-h-[340px] items-center bg-neutral-800 bg-cover bg-center ps-16 pe-8 py-20" :style="{
    backgroundImage: `linear-gradient(90deg, rgba(15,15,20,0.75) 0%, rgba(15,15,20,0.35) 45%, transparent 100%), url('${str('image_url') || 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1400&q=80'}')`,
  }">
    <div class="relative z-10 max-w-xl">
      <h2 class="text-3xl font-bold leading-tight tracking-tight text-white md:text-4xl lg:text-[2.75rem]">
        {{ str('headline', 'Redefining Minimalist Design.') }}
      </h2>
      <p class="mt-4 max-w-lg text-[15px] leading-relaxed text-white/85">
        {{ str('subheadline', 'Discover a curated collection of artisanal furniture designed for the modern sanctuary.')
        }}
      </p>
      <div class="mt-8 flex flex-wrap gap-3">
        <button v-if="str('cta_text', 'Shop Collection')" type="button"
          class="rounded-md bg-white px-8 py-3 text-xs font-bold tracking-[0.2em] text-neutral-900 shadow-lg transition hover:bg-neutral-100">
          {{ str('cta_text', 'Shop Collection') }}
        </button>
        <button v-if="str('second_cta_text')" type="button"
          class="rounded-md border border-white px-8 py-3 text-xs font-bold tracking-[0.2em] text-white transition hover:bg-white/10">
          {{ str('second_cta_text') }}
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { PageSection } from '@/types/sections'

const props = defineProps<{ section: PageSection }>()

const str = (key: string, fallback = '') => String(props.section.settings[key] ?? fallback)
</script>