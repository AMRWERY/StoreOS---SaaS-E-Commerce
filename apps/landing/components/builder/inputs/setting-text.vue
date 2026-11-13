<template>
  <LazyVInput
    :model-value="modelValue"
    :type="inputType"
    :label="label"
    :placeholder="placeholder"
    input-class="!w-full !rounded-md !border-border-subtle !bg-bg-elevated !px-3 !py-2 !text-[13px] !text-tx-primary !outline-none !transition-colors placeholder:!text-tx-muted focus:!border-brand focus:!ring-2 focus:!ring-brand-dim hover:!border-border-default"
    @update:model-value="$emit('update:modelValue', $event)"
  />
</template>

<script lang="ts" setup>
const { t } = useI18n();

withDefaults(
  defineProps<{
    modelValue: string;
    label?: string;
    placeholder?: string;
    inputType?: "text" | "url" | "email" | "number";
  }>(),
  { inputType: "text" },
);

defineEmits<{
  "update:modelValue": [value: string];
}>();
</script>