<template>
  <div class="space-y-2">
    <label v-if="label" class="block text-[10px] font-bold tracking-wider text-tx-secondary">{{ label
    }}</label>
    <input :value="modelValue" :type="inputType" :placeholder="placeholder"
      class="w-full rounded-md border border-border-subtle bg-bg-elevated px-3 py-2 text-[13px] text-tx-primary outline-none transition-colors placeholder:text-tx-muted focus:border-brand focus:ring-2 focus:ring-brand-dim hover:border-border-default"
      @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)">
  </div>
</template>

<script lang="ts" setup>
withDefaults(
  defineProps<{
    modelValue: string
    label?: string
    placeholder?: string
    inputType?: 'text' | 'url' | 'email' | 'number'
  }>(),
  { inputType: 'text' },
)

defineEmits<{
  'update:modelValue': [value: string]
}>()
</script>