<template>
  <div class="flex-1 min-w-0 space-y-6">
    <!-- Order ID & Tracker -->
    <section class="bg-bg-primary border border-border-subtle rounded-[16px] p-8">
      <div class="flex flex-col sm:flex-row justify-between gap-6 mb-12">
        <div>
          <p class="text-[10px] font-black tracking-[0.2em] text-tx-muted mb-3">{{ $t('storefront.checkout.orderIdentification') }}</p>
          <div class="flex items-center gap-3">
            <h2 class="text-2xl font-bold tracking-tighter">{{ orderId }}</h2>
            <button title="Copy order ID" class="text-tx-muted hover:text-brand transition-colors"
              @click="copyOrderId">
              <Icon name="ph:copy-bold" class="w-4 h-4" />
            </button>
          </div>
        </div>
        <div class="sm:text-end">
          <p class="text-[10px] font-black tracking-[0.2em] text-tx-muted mb-3">{{ $t('storefront.checkout.estimatedDelivery') }}</p>
          <p class="text-lg font-bold text-tx-primary">{{ estimatedDelivery }}</p>
        </div>
      </div>

      <!-- Status Tracker -->
      <div class="relative pt-10 pb-4">
        <div class="absolute top-[47px] start-0 w-full h-[2px] bg-border-subtle" />
        <div class="absolute top-[47px] start-0 w-1/4 h-[2px] bg-brand shadow-[0_0_10px_rgba(99,102,241,0.5)]" />

        <div class="relative flex justify-between">
          <div v-for="step in trackerSteps" :key="step.label" class="flex flex-col items-center">
            <div class="w-4 h-4 rounded-full border-2 z-10 transition-all duration-500" :class="{
              'bg-brand border-brand': step.status === 'completed',
              'bg-white border-brand shadow-[0_0_15px_#fff]': step.status === 'active',
              'bg-bg-primary border-border-subtle': step.status === 'pending',
            }" />
            <span class="mt-4 text-[9px] font-black tracking-widest"
              :class="step.status === 'pending' ? 'text-tx-muted' : 'text-tx-secondary'">
              {{ step.label }}
            </span>
          </div>
        </div>
      </div>
    </section>

    <!-- Shipment Details -->
    <section class="bg-bg-primary border border-border-subtle rounded-[16px] p-8">
      <div class="flex items-center justify-between mb-8">
        <h3 class="text-base font-bold tracking-tight">{{ $t('storefront.checkout.shipmentDetails') }}</h3>
        <span class="text-[11px] font-bold text-tx-muted tracking-widest">
          {{ items.length }} {{ $t('storefront.shop.items') }}
        </span>
      </div>

      <div class="space-y-6">
        <div v-for="item in items" :key="item.id" class="flex items-center gap-5 group">
          <div class="w-16 h-16 rounded-[10px] overflow-hidden bg-black border border-border-subtle shrink-0">
            <img :src="item.img" :alt="item.name"
              class="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
          </div>
          <div class="flex-1 min-w-0">
            <h4 class="text-[14px] font-bold text-tx-primary group-hover:text-brand transition-colors truncate">
              {{ item.name }}
            </h4>
            <p class="text-[11px] text-tx-muted mt-1 font-medium tracking-tighter truncate">{{ item.meta }}</p>
          </div>
          <div class="text-end shrink-0">
            <p class="text-sm font-bold text-tx-primary tracking-tighter">
              <span class="text-[11px] text-tx-muted me-1">$</span>{{ item.price }}
            </p>
            <p class="text-[10px] font-black text-tx-muted mt-1">{{ $t('storefront.checkout.qty') }}: {{ item.qty }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Row -->
    <div class="flex flex-col sm:flex-row items-center justify-end gap-5 pt-2">
      <nuxt-link-locale to="/shop-all"
        class="text-[11px] font-bold text-tx-secondary hover:text-tx-primary transition-colors tracking-[0.2em] flex items-center gap-2 group">
        {{ $t('storefront.checkout.continueShopping') }}
        <Icon name="ph:arrow-right" class="w-4 h-4 group-hover:translate-x-1 transition-transform" />
      </nuxt-link-locale>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { ReviewItem, TrackerStep } from '@/types/checkout'

const props = defineProps<{
  orderId: string
  estimatedDelivery: string
  items: ReviewItem[]
  trackerSteps: TrackerStep[]
}>()

const copyOrderId = async () => {
  await navigator.clipboard.writeText(props.orderId).catch(() => { })
}
</script>