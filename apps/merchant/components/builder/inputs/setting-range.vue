<template>
  <LazyVRangeInput
    :model-value="modelValue"
    :label="label"
    :min="min"
    :max="max"
    :step="step"
    :unit="unit"
    @update:model-value="$emit('update:modelValue', $event as number)"
  />
</template>

<script lang="ts" setup>
withDefaults(
  defineProps<{
    modelValue: number;
    label: string;
    min?: number;
    max?: number;
    step?: number;
    unit?: string;
  }>(),
  { min: 0, max: 100, step: 1, unit: "" },
);

defineEmits<{
  "update:modelValue": [value: number];
}>();
</script>
