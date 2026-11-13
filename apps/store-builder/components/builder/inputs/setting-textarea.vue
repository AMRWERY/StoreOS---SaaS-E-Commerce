<template>
  <LazyVTextareaInput
    :model-value="modelValue"
    :label="label"
    :placeholder="placeholder"
    :rows="rows"
    textarea-class="!rounded-md !border-border-subtle !bg-bg-elevated !px-3 !py-2.5 !text-[12px] !leading-relaxed"
    @update:model-value="$emit('update:modelValue', $event)"
  />
</template>

<script lang="ts" setup>
withDefaults(
  defineProps<{
    modelValue: string;
    label?: string;
    placeholder?: string;
    rows?: number;
  }>(),
  { rows: 4 },
);

defineEmits<{
  "update:modelValue": [value: string];
}>();
</script>
