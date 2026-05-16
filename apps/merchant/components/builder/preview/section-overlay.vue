<template>
  <div class="pointer-events-none absolute inset-0 z-[5] rounded-sm transition-shadow" :class="selected
    ? 'ring-2 ring-inset ring-brand shadow-[inset_0_0_0_1px_rgba(99,102,241,0.35)]'
    : highlighted
      ? 'ring-1 ring-inset ring-brand/40'
      : ''
    " aria-hidden="true" />
</template>

<script lang="ts" setup>
const { t } = useI18n()
defineProps<{
  selected?: boolean
  highlighted?: boolean
}>()
</script>