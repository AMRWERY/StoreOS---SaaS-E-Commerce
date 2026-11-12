<template>
  <div class="flex flex-col items-center gap-2 px-6 py-10 text-center text-tx-muted">
    <Icon :name="icon || 'ph:folder-open'" class="text-3xl opacity-30" />
    <p class="text-xs font-semibold text-tx-secondary">{{ title }}</p>
    <p v-if="hint" class="text-[11px]">{{ hint }}</p>
  </div>
</template>

<script lang="ts" setup>
defineProps<{
  title: string
  hint?: string
  icon?: string
}>()
</script>
