<template>
  <span class="inline-flex items-baseline gap-2 flex-wrap">
    <span :class="['font-mono font-semibold text-tx-primary', sizeClass]">{{ formatMoney(amount) }}</span>
    <span v-if="compareAt && compareAt > amount" class="font-mono text-xs text-tx-muted line-through">{{ formatMoney(compareAt) }}</span>
  </span>
</template>

<script lang="ts" setup>
const props = withDefaults(defineProps<{ amount: number; compareAt?: number; size?: 'sm' | 'md' | 'lg' }>(), { size: 'md' })
const { formatMoney } = useShopFormat()
const sizeClass = computed(() => ({ sm: 'text-sm', md: 'text-base', lg: 'text-2xl' })[props.size])
</script>
