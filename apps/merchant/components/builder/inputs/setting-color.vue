<template>
  <LazyVColorInput
    :model-value="modelValue"
    :label="label"
    @update:model-value="$emit('update:modelValue', $event)"
  />
</template>

<script lang="ts" setup>
defineProps<{
  modelValue: string;
  label: string;
}>();

defineEmits<{
  "update:modelValue": [value: string];
}>();
</script>
