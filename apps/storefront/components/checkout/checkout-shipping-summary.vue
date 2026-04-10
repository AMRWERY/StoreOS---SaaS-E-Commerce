<template>
  <aside class="lg:col-span-3 space-y-6">
    <div class="bg-[#0D0D18] border border-[#1C1C30] rounded-[16px] p-10">

      <!-- Header -->
      <div class="flex items-center justify-between mb-10">
        <h2 class="text-xl font-bold">Order Summary</h2>
        <div class="flex items-center gap-2 bg-[#6366F1]/10 px-2 py-1 rounded-[6px]">
          <Icon name="ph:shopping-bag-fill" class="w-3 h-3 text-[#6366F1]" />
          <span class="text-[9px] font-black text-[#6366F1] tracking-widest">
            {{ items.length }} Items
          </span>
        </div>
      </div>

      <!-- Product List -->
      <div class="space-y-6 mb-10 border-b border-[#1C1C30] pb-10">
        <div v-for="item in items" :key="item.id" class="flex items-center gap-5 group">
          <div class="w-16 h-16 rounded-[8px] overflow-hidden bg-black border border-[#1C1C30] shrink-0">
            <img :src="item.img" :alt="item.name"
              class="w-full h-full object-cover opacity-80 grayscale-[20%] group-hover:grayscale-0 transition-all duration-500" />
          </div>
          <div class="flex-1 min-w-0">
            <h4 class="text-[13px] font-bold text-white leading-tight truncate">{{ item.name }}</h4>
            <p class="text-[10px] text-[#50506A] mt-1 font-medium tracking-tighter">{{ item.meta }}</p>
            <p class="text-[9px] font-bold text-[#6366F1] mt-1 tracking-widest">Qty: {{ item.qty }}</p>
          </div>
          <p class="font-mono text-[13px] font-bold text-[#8888AA] shrink-0">EGP {{ item.price }}</p>
        </div>
      </div>

      <!-- Price Breakdown -->
      <div class="space-y-4 mb-10 text-[13px] font-medium text-[#8888AA]">
        <div class="flex justify-between">
          <span>Subtotal</span>
          <span class="font-mono text-[#F0F0FF]">EGP {{ subtotal }}</span>
        </div>
        <div class="flex justify-between items-center">
          <span>Shipping</span>
          <span class="font-mono text-[#6366F1] font-bold">+ EGP {{ shipping }}</span>
        </div>
        <div class="flex justify-between">
          <span>VAT (14%)</span>
          <span class="font-mono">EGP {{ vat }}</span>
        </div>
      </div>

      <!-- Total Due -->
      <div class="pt-8 border-t border-[#1C1C30] space-y-2">
        <div class="flex items-baseline justify-between">
          <span class="text-[14px] font-bold tracking-widest text-[#F0F0FF]">Total Due</span>
          <div class="text-end">
            <p class="font-mono text-[32px] font-bold text-[#6366F1] tracking-tighter leading-none">
              <span class="text-[14px] me-1 opacity-60">EGP</span>{{ total }}
            </p>
          </div>
        </div>
        <p class="text-end text-[9px] font-black text-[#50506A] tracking-[0.2em]">All Taxes Included</p>
      </div>
    </div>

    <!-- Security Badge -->
    <div class="bg-black/20 border border-[#1C1C30] rounded-[12px] p-4 px-6 flex items-center gap-4">
      <Icon name="ph:shield-check-fill" class="w-5 h-5 text-[#6366F1] shrink-0" />
      <p class="text-[11px] font-bold text-[#50506A] tracking-widest">
        Secure AES-256 Bit Terminal Encryption Active
      </p>
    </div>
  </aside>
</template>

<script lang="ts" setup>
export interface ShippingSummaryItem {
  id: number
  name: string
  meta: string
  qty: string
  price: string
  img: string
}

const props = defineProps<{
  items: ShippingSummaryItem[]
  subtotal: string
  shipping: string
  vat: string
  total: string
}>()
</script>
