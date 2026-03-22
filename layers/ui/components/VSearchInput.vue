<template>
  <div>
    <div class="relative group" :class="wrapperClass">
      <icon name="ph:magnifying-glass"
        class="absolute start-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-indigo-500 transition-colors" />
      <input type="text" :placeholder="placeholder" :value="modelValue"
        @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
        class="w-full bg-[#0c0c0e] border border-white/5 rounded-2xl ps-11 pe-4 py-3.5 text-sm focus:outline-none focus:border-indigo-500/50 transition-all placeholder:text-gray-600"
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