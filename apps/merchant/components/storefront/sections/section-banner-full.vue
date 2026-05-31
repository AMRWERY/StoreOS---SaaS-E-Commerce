<template>
  <div class="flex min-h-[200px] items-center justify-center px-8 py-12 text-center"
    :style="str('image_url') ? { backgroundImage: `linear-gradient(rgba(0,0,0,0.4),rgba(0,0,0,0.4)),url('${str('image_url')}')`, backgroundSize: 'cover', backgroundPosition: 'center' } : { backgroundColor: '#171717' }">
    <div>
      <h2 class="text-2xl font-bold text-white">
        {{ str('heading', 'Special Offer') }}
      </h2>
      <p class="mt-3 text-neutral-300">
        {{ str('subheading', 'Limited time deal — don\'t miss out') }}
      </p>
      <button v-if="str('cta_text', 'Shop Now')" type="button"
        class="mt-6 rounded-md bg-white px-8 py-2.5 text-sm font-bold text-neutral-900">
        {{ str('cta_text', 'Shop Now') }}
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { PageSection } from '@/types/sections'

const props = defineProps<{ section: PageSection }>()

const str = (key: string, fallback = '') => String(props.section.settings[key] ?? fallback)
</script>