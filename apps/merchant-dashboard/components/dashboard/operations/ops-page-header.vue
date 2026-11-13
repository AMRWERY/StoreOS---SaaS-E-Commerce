<template>
  <div>
    <LazyVBreadcrumb />
    <header class="flex flex-wrap items-center justify-between gap-4">
      <div class="flex items-center gap-3">
        <h1 class="text-3xl font-bold tracking-tight">{{ title }}</h1>
        <span
          v-if="count !== undefined"
          class="bg-bg-elevated px-2 py-0.5 rounded text-[10px] font-semibold text-tx-muted font-mono mt-1"
        >
          {{ count }}
        </span>
      </div>
      <div class="flex items-center gap-3"><slot /></div>
    </header>
    <p v-if="subtitle" class="text-sm text-tx-muted mt-2">{{ subtitle }}</p>
  </div>
</template>

<script lang="ts" setup>
defineProps<{
  title: string
  subtitle?: string
  count?: number | string
}>()
</script>
