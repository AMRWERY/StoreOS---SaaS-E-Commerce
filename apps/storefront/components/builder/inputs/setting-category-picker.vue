<template>
  <setting-select :model-value="modelValue" :label="label" :options="options"
    @update:model-value="$emit('update:modelValue', $event)" />
</template>

<script lang="ts" setup>
const { t } = useI18n()
withDefaults(
  defineProps<{
    modelValue: string
    label?: string
  }>(),
  { label: 'Category' },
)

defineEmits<{
  'update:modelValue': [value: string]
}>()

const options = [
  { value: '', label: 'Select…' },
  { value: 'living', label: 'Living room' },
  { value: 'bedroom', label: 'Bedroom' },
  { value: 'kitchen', label: 'Kitchen' },
  { value: 'sale', label: 'Sale' },
]
</script>