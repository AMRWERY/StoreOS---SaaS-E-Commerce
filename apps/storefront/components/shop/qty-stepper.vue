<template>
  <div class="inline-flex items-center rounded-full border border-border-default bg-bg-primary" role="group" :aria-label="t('shop.common.quantity')">
    <button type="button" class="w-9 h-9 flex items-center justify-center text-tx-secondary hover:text-tx-primary transition-colors duration-200 disabled:opacity-40" :disabled="modelValue <= min" :aria-label="t('shop.common.decrease')" @click="emit('update:modelValue', modelValue - 1)">
      <Icon name="lucide:minus" class="w-4 h-4" />
    </button>
    <span class="w-8 text-center font-mono text-sm text-tx-primary" aria-live="polite">{{ modelValue }}</span>
    <button type="button" class="w-9 h-9 flex items-center justify-center text-tx-secondary hover:text-tx-primary transition-colors duration-200 disabled:opacity-40" :disabled="modelValue >= max" :aria-label="t('shop.common.increase')" @click="emit('update:modelValue', modelValue + 1)">
      <Icon name="lucide:plus" class="w-4 h-4" />
    </button>
  </div>
</template>

<script lang="ts" setup>
withDefaults(defineProps<{ modelValue: number; min?: number; max?: number }>(), { min: 1, max: 20 })
const emit = defineEmits<{ 'update:modelValue': [value: number] }>()
const { t } = useI18n()
</script>
