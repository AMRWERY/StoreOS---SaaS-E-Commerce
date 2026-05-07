<template>
  <div
    class="mx-auto flex h-full min-h-[520px] w-full flex-col overflow-hidden rounded-t-xl bg-white shadow-[0_24px_80px_rgba(0,0,0,0.45)] ring-1 ring-white/10 transition-[max-width] duration-300"
    :class="frameClass">
    <slot />
  </div>
</template>

<script lang="ts" setup>
const { t } = useI18n()
import type { DeviceMode } from '@/types/builder'

const props = defineProps<{
  device: DeviceMode
}>()

const frameClass = computed(() => {
  switch (props.device) {
    case 'mobile':
      return 'max-w-[390px]'
    case 'tablet':
      return 'max-w-[768px]'
    default:
      return 'max-w-[1100px]'
  }
})
</script>