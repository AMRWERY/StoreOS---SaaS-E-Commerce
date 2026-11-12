<template>
  <div class="mb-5 flex flex-wrap items-start justify-between gap-3">
    <div class="min-w-0">
      <h1 class="text-xl font-bold tracking-tight text-tx-primary">{{ title }}</h1>
      <p v-if="subtitle" class="mt-1 text-xs text-tx-muted">{{ subtitle }}</p>
    </div>
    <div v-if="$slots.actions" class="flex flex-wrap items-center gap-2">
      <slot name="actions" />
    </div>
  </div>
</template>

<script lang="ts" setup>
defineProps<{
  title: string
  subtitle?: string
}>()
</script>
