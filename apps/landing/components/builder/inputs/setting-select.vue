<template>
  <LazyVSelectInput
    :model-value="modelValue"
    :label="label"
    :options="options"
    select-class="!rounded-md !border-border-subtle !bg-bg-elevated !py-2 !pe-8 !ps-3 !text-[12px] font-medium"
    @update:model-value="$emit('update:modelValue', $event)"
  />
</template>

<script lang="ts" setup>
defineProps<{
  modelValue: string;
  label?: string;
  options: { value: string; label: string }[];
}>();

defineEmits<{
  "update:modelValue": [value: string];
}>();
</script>
