<template>
  <div class="border-t border-neutral-200 px-8 py-10">
    <p v-if="str('heading', str('title'))" class="mb-8 text-center text-xs font-bold tracking-widest text-neutral-400">
      {{ str('heading', str('title', 'As seen in')) }}
    </p>
    <div class="flex items-center justify-center gap-10" :class="bool('grayscale', true) ? 'opacity-35 grayscale' : ''">
      <template v-if="logos.length">
        <img v-for="(logo, i) in logos" :key="i" :src="logo.url || logo" :alt="logo.name || `Logo ${i + 1}`"
          class="h-8 w-auto object-contain" />
      </template>
      <template v-else>
        <div v-for="i in 5" :key="i" class="h-6 w-20 rounded bg-neutral-500" />
      </template>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { PageSection } from '@/types/sections'

const props = defineProps<{ section: PageSection }>()
const str = (key: string, fallback = '') => String(props.section.settings[key] ?? fallback)
const bool = (key: string, fallback = false) => Boolean(props.section.settings[key] ?? fallback)

const logos = computed(() => (props.section.settings['logos'] as any[]) ?? [])
</script>