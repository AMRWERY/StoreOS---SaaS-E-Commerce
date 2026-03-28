<template>
  <div>
    <div class="flex items-center gap-3 group cursor-pointer" @click="$emit('update:modelValue', !modelValue)">
      <span v-if="label" class="text-[10px] font-bold text-tx-muted tracking-widest select-none">{{ label
        }}</span>
      <button type="button" class="w-10 h-5 rounded-full p-1 transition-colors relative outline-none shrink-0"
        :class="modelValue ? 'bg-brand' : 'bg-bg-elevated border border-border-default'">
        <div class="w-3 h-3 bg-white rounded-full transition-all duration-300 absolute top-1"
          :class="modelValue ? 'start-6' : 'start-1'"></div>
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
defineProps<{
  modelValue: boolean
  label?: string
}>()

defineEmits<{
  (e: 'update:modelValue', value: boolean): void
}>()
</script>
