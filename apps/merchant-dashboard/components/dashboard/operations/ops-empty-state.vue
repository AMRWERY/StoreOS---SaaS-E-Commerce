<template>
  <div class="flex flex-col items-center justify-center gap-2 py-14 text-center">
    <Icon :name="icon || 'ph:tray-bold'" class="text-3xl text-tx-muted" />
    <p class="text-sm font-semibold text-tx-secondary">{{ title }}</p>
    <p v-if="hint" class="text-xs text-tx-muted">{{ hint }}</p>
  </div>
</template>

<script lang="ts" setup>
defineProps<{ title: string; hint?: string; icon?: string }>()
</script>
