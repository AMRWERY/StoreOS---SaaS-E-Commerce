<template>
  <div class="space-y-1.5">
    <label v-if="label" :for="id" class="block text-xs font-medium text-tx-secondary">
      {{ label }}<span v-if="required" class="text-danger ms-0.5" aria-hidden="true">*</span>
    </label>
    <input
      :id="id"
      :value="modelValue"
      :type="type"
      :placeholder="placeholder"
      :autocomplete="autocomplete"
      :inputmode="inputmode"
      :required="required"
      :disabled="disabled"
      :dir="dir"
      :aria-invalid="!!error"
      :class="[
        'w-full bg-bg-primary border rounded-xl px-4 py-3 text-sm text-tx-primary placeholder:text-tx-muted outline-none transition-colors duration-200 disabled:opacity-50',
        mono ? 'font-mono' : '',
        error ? 'border-danger' : 'border-border-default focus:border-brand',
      ]"
      @input="emit('update:modelValue', ($event.target as HTMLInputElement).value)"
    >
    <p v-if="error" class="text-xs text-danger">{{ error }}</p>
    <p v-else-if="hint" class="text-xs text-tx-muted">{{ hint }}</p>
  </div>
</template>

<script lang="ts" setup>
withDefaults(defineProps<{
  modelValue: string
  label?: string
  type?: string
  placeholder?: string
  autocomplete?: string
  inputmode?: 'text' | 'tel' | 'email' | 'numeric'
  error?: string
  hint?: string
  required?: boolean
  disabled?: boolean
  mono?: boolean
  dir?: 'ltr' | 'rtl' | 'auto'
}>(), { type: 'text', inputmode: 'text', dir: undefined })

const emit = defineEmits<{ 'update:modelValue': [value: string] }>()
const id = useId()
</script>
