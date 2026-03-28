<template>
  <div>
    <div class="relative group" :class="wrapperClass">
      <Icon name="ph:magnifying-glass"
        class="absolute start-4 top-1/2 -translate-y-1/2 text-tx-secondary group-focus-within:text-brand transition-colors" />
      <input type="text" :placeholder="placeholder" :value="modelValue"
        @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
        class="w-full bg-bg-primary border border-border-subtle rounded-md ps-11 pe-4 py-2 text-[12px] text-tx-primary focus:outline-none focus:border-brand transition-all placeholder:text-tx-muted"
        :class="inputClass" />
    </div>
  </div>
</template>

<script lang="ts" setup>
defineProps({
  modelValue: {
    type: String,
    default: ''
  },
  placeholder: {
    type: String,
    default: 'Search...'
  },
  wrapperClass: {
    type: String,
    default: ''
  },
  inputClass: {
    type: String,
    default: ''
  }
})

defineEmits(['update:modelValue'])
</script>
