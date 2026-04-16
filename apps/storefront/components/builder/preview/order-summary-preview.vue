<template>
  <div class="min-h-screen bg-neutral-50 text-neutral-900">
    <!-- Top bar -->
    <div class="border-b border-neutral-200 bg-white px-8 py-4">
      <div class="flex items-center justify-between">
        <span class="text-base font-bold tracking-[0.15em]">{{ store.storeName }}</span>
        <span class="text-xs text-neutral-400">Need help? <span class="font-medium text-indigo-600">Contact support</span></span>
      </div>
    </div>

    <div class="mx-auto max-w-2xl px-4 py-12">

      <!-- Success banner -->
      <div class="mb-8 overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-neutral-200">
        <div class="bg-indigo-600 px-6 py-4">
          <div class="flex items-center gap-3">
            <div class="flex size-10 shrink-0 items-center justify-center rounded-full bg-white/20">
              <Icon name="ph:check-bold" class="text-xl text-white" />
            </div>
            <div>
              <p class="text-[11px] font-semibold text-indigo-200">Order confirmed</p>
              <p class="text-lg font-bold text-white">Thank you, John!</p>
            </div>
          </div>
        </div>
        <div class="px-6 py-4">
          <p class="text-sm text-neutral-600">
            Your order <span class="font-bold text-neutral-900">#ORD-00492</span> has been placed and is being processed.
            A confirmation email has been sent to <span class="font-medium text-neutral-800">john@email.com</span>.
          </p>
        </div>
      </div>

      <!-- Order details -->
      <div class="mb-4 rounded-2xl border border-neutral-200 bg-white p-6">
        <div class="mb-5 flex items-center justify-between">
          <h2 class="text-sm font-bold text-neutral-900">Order details</h2>
          <span class="rounded-full bg-green-50 px-3 py-1 text-[10px] font-bold text-green-600">Processing</span>
        </div>

        <div class="space-y-4">
          <div v-for="(item, i) in MOCK_ITEMS" :key="i" class="flex items-center gap-4">
            <div
              class="size-16 shrink-0 rounded-xl border border-neutral-100 bg-neutral-50 bg-contain bg-center bg-no-repeat"
              :style="{ backgroundImage: `url('${item.img}')` }"
            />
            <div class="min-w-0 flex-1">
              <p class="text-sm font-semibold text-neutral-900">{{ item.name }}</p>
              <p class="text-xs text-neutral-400">{{ item.variant }}</p>
            </div>
            <p class="shrink-0 text-sm font-bold text-neutral-900">{{ item.price }}</p>
          </div>
        </div>

        <div class="mt-5 space-y-2 border-t border-neutral-100 pt-4 text-xs">
          <div class="flex justify-between text-neutral-600">
            <span>Subtotal</span>
            <span class="font-medium text-neutral-900">$240.00</span>
          </div>
          <div class="flex justify-between text-neutral-600">
            <span>Shipping</span>
            <span class="font-medium text-neutral-900">$10.00</span>
          </div>
          <div class="flex justify-between text-neutral-600">
            <span>Taxes</span>
            <span class="font-medium text-neutral-900">$25.00</span>
          </div>
          <div class="flex justify-between border-t border-neutral-200 pt-2">
            <span class="text-sm font-bold text-neutral-900">Total</span>
            <span class="text-sm font-bold text-indigo-600">$275.00</span>
          </div>
        </div>
      </div>

      <!-- Delivery info -->
      <div class="mb-6 grid grid-cols-2 gap-4">
        <div class="rounded-2xl border border-neutral-200 bg-white p-4">
          <div class="mb-2 flex items-center gap-2">
            <Icon name="ph:map-pin-bold" class="text-indigo-500" />
            <p class="text-xs font-bold text-neutral-900">Shipping to</p>
          </div>
          <p class="text-xs text-neutral-600 leading-relaxed">
            John Doe<br />
            123 Main Street<br />
            New York, NY 10001
          </p>
        </div>
        <div class="rounded-2xl border border-neutral-200 bg-white p-4">
          <div class="mb-2 flex items-center gap-2">
            <Icon name="ph:package-bold" class="text-indigo-500" />
            <p class="text-xs font-bold text-neutral-900">Estimated delivery</p>
          </div>
          <p class="text-sm font-semibold text-neutral-900">Apr 20–22, 2026</p>
          <p class="text-[10px] text-neutral-400 mt-1">Standard shipping (3–5 days)</p>
        </div>
      </div>

      <!-- CTA -->
      <div class="flex flex-col gap-3 sm:flex-row">
        <button type="button" class="flex-1 rounded-2xl bg-indigo-600 py-3.5 text-sm font-bold text-white hover:bg-indigo-700">
          Continue shopping
        </button>
        <button type="button" class="flex-1 rounded-2xl border border-neutral-200 bg-white py-3.5 text-sm font-semibold text-neutral-700 hover:bg-neutral-50">
          Track my order
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const store = useBuilderStore()

const MOCK_ITEMS = [
  { img: '/img/category-01.avif', name: 'Modern Smart Speaker', variant: 'White · 1×', price: '$99.00' },
  { img: '/img/category-02.avif', name: 'Casual Running Shoes', variant: 'Size 42 · 1×', price: '$80.00' },
  { img: '/img/category-03.avif', name: 'Minimalist Lamp', variant: 'Black · 1×', price: '$61.00' },
]
</script>
