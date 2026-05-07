<template>
  <div class="space-y-2">
    <label v-if="label" class="block text-[10px] font-bold tracking-wider text-tx-secondary">{{ label
    }}</label>
    <div class="relative">
      <select :value="modelValue"
        class="w-full appearance-none rounded-md border border-border-subtle bg-bg-elevated py-2 pe-8 ps-3 text-[12px] font-medium text-tx-primary outline-none focus:border-brand focus:ring-2 focus:ring-brand-dim"
        @change="$emit('update:modelValue', ($event.target as HTMLSelectElement).value)">
        <option v-for="opt in options" :key="opt.value" :value="opt.value">
          {{ opt.label }}
        </option>
      </select>
      <Icon name="ph:caret-down-bold"
        class="pointer-events-none absolute end-2 top-1/2 size-4 -translate-y-1/2 text-tx-muted" />
    </div>
  </div>
</template>

<script lang="ts" setup>
const { t } = useI18n()
defineProps<{
  modelValue: string
  label?: string
  options: { value: string, label: string }[]
}>()

defineEmits<{
  'update:modelValue': [value: string]
}>()
</script>