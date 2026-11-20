<template>
  <lazy-setting-toggle
    v-if="field.type === 'toggle'"
    :model-value="Boolean(modelValue)"
    :label="field.label"
    :hint="field.hint"
    @update:model-value="(v: boolean) => $emit('update:modelValue', v)"
  />

  <lazy-setting-radio-cards
    v-else-if="field.type === 'select' && field.display === 'cards'"
    :model-value="String(modelValue ?? '')"
    :label="field.label"
    :options="field.options"
    @update:model-value="(v: string) => $emit('update:modelValue', v)"
  />

  <lazy-setting-select
    v-else-if="field.type === 'select'"
    :model-value="String(modelValue ?? '')"
    :label="field.label"
    :options="field.options"
    @update:model-value="(v: string) => $emit('update:modelValue', v)"
  />

  <lazy-setting-range
    v-else-if="field.type === 'number'"
    :model-value="Number(modelValue ?? 0)"
    :label="field.label"
    :min="field.min ?? 0"
    :max="field.max ?? 100"
    :step="field.step ?? 1"
    :unit="field.unit ?? ''"
    @update:model-value="(v: number) => $emit('update:modelValue', v)"
  />

  <lazy-setting-color
    v-else-if="field.type === 'color'"
    :model-value="String(modelValue ?? '#ffffff')"
    :label="field.label"
    @update:model-value="(v: string) => $emit('update:modelValue', v)"
  />

  <lazy-setting-textarea
    v-else-if="field.type === 'textarea'"
    :model-value="String(modelValue ?? '')"
    :label="field.label"
    :placeholder="field.placeholder"
    :rows="field.rows ?? 3"
    @update:model-value="(v: string) => $emit('update:modelValue', v)"
  />

  <image-upload-field
    v-else-if="field.type === 'image'"
    :model-value="String(modelValue ?? '')"
    :label="field.label"
    @update:model-value="(v: string) => $emit('update:modelValue', v)"
  />

  <lazy-setting-text
    v-else
    :model-value="String(modelValue ?? '')"
    :label="field.label"
    :placeholder="placeholder"
    :input-type="field.type === 'url' ? 'url' : 'text'"
    @update:model-value="(v: string) => $emit('update:modelValue', v)"
  />
</template>

<script lang="ts" setup>
import type { SimpleFieldDef } from "@/types/sections";

const props = defineProps<{ field: SimpleFieldDef; modelValue: unknown }>();

const placeholder = computed(() =>
  "placeholder" in props.field ? props.field.placeholder : undefined,
);
defineEmits<{ "update:modelValue": [value: unknown] }>();
</script>
