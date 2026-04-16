<template>
  <div class="space-y-2">
    <label class="block text-[10px] font-bold tracking-wider text-tx-secondary">{{ label }}</label>
    <div class="flex items-center gap-2">
      <input :value="modelValue" type="color"
        class="size-10 cursor-pointer rounded-md border border-border-subtle bg-bg-elevated p-0.5"
        @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)">
      <input :value="modelValue" type="text"
        class="min-w-0 flex-1 rounded-md border border-border-subtle bg-bg-elevated px-3 py-2 text-[12px] text-tx-primary outline-none focus:border-brand"
        @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)">
    </div>
  </div>
</template>

<script lang="ts" setup>
defineProps<{
  modelValue: string
  label: string
}>()

defineEmits<{
  'update:modelValue': [value: string]
}>()
</script>