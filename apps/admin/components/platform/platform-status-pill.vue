<template>
  <span
    class="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold whitespace-nowrap"
    :class="toneClass"
  >
    <span class="h-1 w-1 rounded-full bg-current"></span>
    {{ label }}
  </span>
</template>

<script lang="ts" setup>
import type { PlatformTone } from '@/types/platform'

const props = defineProps<{
  label: string
  tone: PlatformTone
}>()

const TONES: Record<PlatformTone, string> = {
  success: 'bg-success-dim text-success',
  warning: 'bg-warning-dim text-warning',
  danger: 'bg-danger-dim text-danger',
  info: 'bg-info-dim text-info',
  neutral: 'bg-bg-elevated text-tx-secondary',
  brand: 'bg-brand-dim text-brand',
  purple: 'bg-status-purple-dim text-status-purple',
  yellow: 'bg-status-yellow-dim text-status-yellow',
}

const toneClass = computed(() => TONES[props.tone])
</script>
