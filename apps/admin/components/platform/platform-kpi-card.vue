<template>
  <div class="card px-4 py-3.5 transition-colors hover:border-border-default">
    <div class="mb-4 flex items-start justify-between">
      <h3 class="text-eyebrow">{{ label }}</h3>
      <Icon :name="icon" class="text-xl" :class="iconColor || 'text-brand'" />
    </div>
    <p class="font-mono text-[22px] font-semibold tracking-tight text-tx-primary">{{ value }}</p>
    <p v-if="sub" class="mt-2 font-mono text-[10px] font-medium text-tx-muted">{{ sub }}</p>
  </div>
</template>

<script lang="ts" setup>
defineProps<{
  label: string
  value: string
  icon: string
  iconColor?: string
  sub?: string
}>()
</script>
