<template>
  <div class="space-y-1.5">
    <label v-if="label" :for="id" class="block text-xs font-medium text-tx-secondary">
      {{ label }}<span v-if="required" class="text-danger ms-0.5" aria-hidden="true">*</span>
    </label>
    <div class="relative">
      <select
        :id="id"
        :value="modelValue"
        :disabled="disabled"
        :aria-invalid="!!error"
        :class="[
          'w-full appearance-none bg-bg-primary border rounded-xl ps-4 pe-10 py-3 text-sm outline-none transition-colors duration-200 disabled:opacity-50',
          modelValue ? 'text-tx-primary' : 'text-tx-muted',
          error ? 'border-danger' : 'border-border-default focus:border-brand',
        ]"
        @change="emit('update:modelValue', ($event.target as HTMLSelectElement).value)"
      >
        <option v-if="placeholder" value="" disabled>{{ placeholder }}</option>
        <option v-for="o in options" :key="o.value" :value="o.value" class="text-tx-primary bg-bg-primary">{{ o.label }}</option>
      </select>
      <Icon name="lucide:chevron-down" class="w-4 h-4 text-tx-muted pointer-events-none absolute top-1/2 -translate-y-1/2 end-3.5" />
    </div>
    <p v-if="error" class="text-xs text-danger">{{ error }}</p>
  </div>
</template>

<script lang="ts" setup>
defineProps<{
  modelValue: string
  options: { value: string; label: string }[]
  label?: string
  placeholder?: string
  error?: string
  required?: boolean
  disabled?: boolean
}>()
const emit = defineEmits<{ 'update:modelValue': [value: string] }>()
const id = useId()
</script>
