<template>
  <div class="space-y-2">
    <div class="flex items-center justify-between gap-2">
      <label class="text-[10px] font-bold tracking-wider text-tx-secondary">{{ label }}</label>
      <span class="text-[11px] text-tx-muted">{{ modelValue }}{{ unit }}</span>
    </div>
    <input :value="modelValue" type="range" :min="min" :max="max" :step="step"
      class="h-2 w-full cursor-pointer appearance-none rounded-full bg-bg-elevated accent-brand"
      @input="$emit('update:modelValue', Number(($event.target as HTMLInputElement).value))">
  </div>
</template>

<script lang="ts" setup>
withDefaults(
  defineProps<{
    modelValue: number
    label: string
    min?: number
    max?: number
    step?: number
    unit?: string
  }>(),
  { min: 0, max: 100, step: 1, unit: '' },
)

defineEmits<{
  'update:modelValue': [value: number]
}>()
</script>