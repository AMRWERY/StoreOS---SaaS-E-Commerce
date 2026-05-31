<template>
  <div class="px-8 py-6">
    <hr :style="{ borderColor: str('color', '#E4E4EF'), borderTopWidth: `${num('thickness', 1)}px` }"
      :class="str('width', 'full') === 'narrow' ? 'mx-auto max-w-sm' : str('width') === 'medium' ? 'mx-auto max-w-2xl' : ''" />
  </div>
</template>

<script lang="ts" setup>
import type { PageSection } from '@/types/sections'

const props = defineProps<{ section: PageSection }>()
const str = (key: string, fallback = '') => String(props.section.settings[key] ?? fallback)
const num = (key: string, fallback: number) => Number(props.section.settings[key] ?? fallback)
</script>