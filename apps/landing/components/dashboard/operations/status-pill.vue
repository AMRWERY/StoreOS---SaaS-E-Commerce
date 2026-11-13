<template>
  <span
    class="inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-semibold whitespace-nowrap"
    :class="toneClass"
  >
    <slot />
  </span>
</template>

<script lang="ts" setup>
import type { Tone } from '@/types/operations'

const props = defineProps<{ tone?: Tone }>()

const toneClass = computed(
  () =>
    ({
      success: 'bg-success-dim text-success',
      warning: 'bg-warning-dim text-warning',
      danger: 'bg-danger-dim text-danger',
      info: 'bg-info-dim text-info',
      purple: 'bg-status-purple/15 text-status-purple',
      neutral: 'bg-bg-elevated text-tx-secondary border border-border-subtle',
    })[props.tone ?? 'neutral'],
)
</script>
