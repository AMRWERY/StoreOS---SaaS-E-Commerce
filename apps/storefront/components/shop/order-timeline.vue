<template>
  <ol v-if="status !== 'cancelled'" class="relative space-y-0">
    <li v-for="(step, i) in STEPS" :key="step" class="relative flex gap-4 pb-8 last:pb-0">
      <span v-if="i < STEPS.length - 1" :class="['absolute top-8 bottom-0 start-[15px] w-0.5', i < currentIndex ? 'bg-brand' : 'bg-border-default']" aria-hidden="true" />
      <span :class="['relative z-10 w-8 h-8 rounded-full flex items-center justify-center shrink-0 border-2 transition-colors duration-300',
        i <= currentIndex ? 'bg-brand border-brand text-white' : 'bg-bg-base border-border-default text-tx-muted']">
        <Icon :name="i < currentIndex ? 'lucide:check' : ICONS[step]" class="w-4 h-4" />
      </span>
      <div class="pt-1">
        <p :class="['text-sm font-medium', i <= currentIndex ? 'text-tx-primary' : 'text-tx-muted']">{{ t(`shop.orderStatus.${step}`) }}</p>
        <p class="text-xs text-tx-muted mt-0.5">{{ t(`shop.orderStatus.${step}Desc`) }}</p>
      </div>
    </li>
  </ol>
  <div v-else class="rounded-2xl bg-danger-dim px-5 py-4 flex items-start gap-3">
    <Icon name="lucide:circle-x" class="w-5 h-5 text-danger shrink-0 mt-0.5" />
    <div>
      <p class="text-sm font-medium text-tx-primary">{{ t('shop.orderStatus.cancelled') }}</p>
      <p class="text-xs text-tx-secondary mt-0.5">{{ t('shop.orderStatus.cancelledDesc') }}</p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { OrderStatus } from '@/types/shop'

const props = defineProps<{ status: OrderStatus }>()
const { t } = useI18n()

const STEPS = ['placed', 'confirmed', 'shipped', 'out_for_delivery', 'delivered'] as const
const ICONS: Record<string, string> = {
  placed: 'lucide:receipt',
  confirmed: 'lucide:badge-check',
  shipped: 'lucide:package',
  out_for_delivery: 'lucide:truck',
  delivered: 'lucide:house',
}
const currentIndex = computed(() => STEPS.indexOf(props.status as typeof STEPS[number]))
</script>
