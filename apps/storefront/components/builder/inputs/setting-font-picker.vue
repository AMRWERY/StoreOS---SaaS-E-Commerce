<template>
  <setting-select :model-value="modelValue" :label="label" :options="fontOptions"
    @update:model-value="$emit('update:modelValue', $event)" />
</template>

<script lang="ts" setup>
defineProps<{
  modelValue: string
  label?: string
}>()

defineEmits<{
  'update:modelValue': [value: string]
}>()

const fontOptions = [
  { value: 'Inter', label: 'Inter' },
  { value: 'DM Sans', label: 'DM Sans' },
  { value: 'Playfair Display', label: 'Playfair Display' },
  { value: 'Space Grotesk', label: 'Space Grotesk' },
  { value: 'system-ui', label: 'System UI' },
] as const
</script>