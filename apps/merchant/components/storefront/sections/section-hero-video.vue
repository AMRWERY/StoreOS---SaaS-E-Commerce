<template>
  <div class="relative flex min-h-[380px] items-center justify-center bg-neutral-900"
    :style="str('poster_url') ? { backgroundImage: `url('${str('poster_url')}')`, backgroundSize: 'cover', backgroundPosition: 'center' } : {}">
    <div class="absolute inset-0 bg-black/40" />
    <Icon name="ph:play-circle-fill" class="absolute text-8xl text-white/20" />
    <div class="relative z-10 text-center">
      <h2 v-if="str('headline')" class="text-3xl font-bold text-white">
        {{ str('headline') }}
      </h2>
      <p v-if="str('subheadline')" class="mt-3 text-sm text-neutral-400">
        {{ str('subheadline') }}
      </p>
      <p v-else class="mt-3 text-sm text-neutral-400">
        Add a video URL in the settings panel.
      </p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { PageSection } from '@/types/sections'

const props = defineProps<{ section: PageSection }>()

const str = (key: string, fallback = '') => String(props.section.settings[key] ?? fallback)
</script>