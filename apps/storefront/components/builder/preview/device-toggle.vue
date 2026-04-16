<template>
  <div class="flex items-center rounded-lg border border-border-subtle bg-bg-elevated p-0.5" role="group"
    aria-label="Preview device">
    <button v-for="v in viewports" :key="v.id" type="button" :title="v.title" class="rounded-md p-1.5 transition-all"
      :class="modelValue === v.id
        ? 'bg-bg-overlay text-brand shadow-sm'
        : 'text-tx-muted hover:text-tx-secondary'
        " @click="$emit('update:modelValue', v.id)">
      <Icon :name="v.icon" class="text-base" />
    </button>
  </div>
</template>

<script lang="ts" setup>
import type { DeviceMode } from '@/types/builder'

defineProps<{
  modelValue: DeviceMode
}>()

defineEmits<{
  'update:modelValue': [value: DeviceMode]
}>()

const viewports = [
  { id: 'desktop' as const, title: 'Desktop', icon: 'ph:desktop-bold' },
  { id: 'tablet' as const, title: 'Tablet', icon: 'ph:device-tablet-bold' },
  { id: 'mobile' as const, title: 'Mobile', icon: 'ph:device-mobile-bold' },
]
</script>