<template>
  <div class="h-2 w-full rounded-full bg-bg-elevated overflow-hidden" role="presentation">
    <div
      class="h-full rounded-full transition-all duration-300"
      :class="toneClass"
      :style="{ width: `${clamped}%`, opacity }"
    />
  </div>
</template>

<script lang="ts" setup>
const props = withDefaults(
  defineProps<{
    pct: number
    tone?: 'brand' | 'success' | 'warning' | 'danger' | 'info' | 'accent'
    opacity?: number
  }>(),
  { tone: 'brand', opacity: 1 },
)

const clamped = computed(() => Math.min(100, Math.max(0, props.pct)))
const toneClass = computed(
  () =>
    ({
      brand: 'bg-brand',
      success: 'bg-success',
      warning: 'bg-warning',
      danger: 'bg-danger',
      info: 'bg-info',
      accent: 'bg-accent',
    })[props.tone],
)
</script>
