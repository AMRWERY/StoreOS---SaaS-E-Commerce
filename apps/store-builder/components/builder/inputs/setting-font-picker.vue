<template>
  <lazy-setting-select
    :model-value="modelValue"
    :label="label"
    :options="fontOptions"
    @update:model-value="$emit('update:modelValue', $event)"
  />
</template>

<script lang="ts" setup>
import { FONT_OPTIONS } from "@/data/site-theme";

const { t } = useI18n();

defineProps<{
  modelValue: string;
  label?: string;
}>();

defineEmits<{
  "update:modelValue": [value: string];
}>();

const fontOptions = FONT_OPTIONS;
</script>