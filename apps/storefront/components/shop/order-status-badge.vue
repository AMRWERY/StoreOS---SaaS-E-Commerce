<template>
  <span :class="['inline-flex items-center rounded-full px-2.5 py-1 text-[10px] font-semibold', tone]">{{ t(`shop.orderStatus.${status}`) }}</span>
</template>

<script lang="ts" setup>
import type { OrderStatus } from '@/types/shop'

const props = defineProps<{ status: OrderStatus }>()
const { t } = useI18n()
const tone = computed(() => ({
  placed: 'bg-info-dim text-info',
  confirmed: 'bg-info-dim text-info',
  shipped: 'bg-status-purple-dim text-status-purple',
  out_for_delivery: 'bg-warning-dim text-warning',
  delivered: 'bg-success-dim text-success',
  cancelled: 'bg-danger-dim text-danger',
})[props.status])
</script>
