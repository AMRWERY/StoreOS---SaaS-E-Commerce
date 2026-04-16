<template>
  <div class="min-h-screen bg-neutral-50 text-neutral-900">
    <!-- Top bar -->
    <div class="border-b border-neutral-200 bg-white px-8 py-4">
      <div class="flex items-center justify-between">
        <span class="text-base font-bold tracking-[0.15em]">{{ store.storeName }}</span>
        <nav class="flex items-center gap-1 text-xs text-neutral-400">
          <span class="font-medium text-neutral-900">Cart</span>
          <Icon name="ph:caret-right-bold" class="text-[10px]" />
          <span class="font-semibold text-indigo-600">Information</span>
          <Icon name="ph:caret-right-bold" class="text-[10px]" />
          <span>Shipping</span>
          <Icon name="ph:caret-right-bold" class="text-[10px]" />
          <span>Payment</span>
        </nav>
      </div>
    </div>

    <div class="mx-auto max-w-5xl px-4 py-8">
      <div class="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_360px]">

        <!-- Left: Form -->
        <div class="space-y-6">
          <!-- Contact -->
          <div class="rounded-2xl border border-neutral-200 bg-white p-6">
            <h2 class="mb-4 text-sm font-bold text-neutral-900">Contact information</h2>
            <div class="space-y-3">
              <div>
                <label class="mb-1 block text-xs font-medium text-neutral-500">Email address</label>
                <div class="flex rounded-xl border border-neutral-200 bg-neutral-50 px-3 py-2.5 text-sm text-neutral-400">
                  customer@email.com
                </div>
              </div>
              <label class="flex items-center gap-2 text-xs text-neutral-500">
                <span class="size-4 rounded border border-neutral-200 bg-white" />
                Email me with news and offers
              </label>
            </div>
          </div>

          <!-- Shipping -->
          <div class="rounded-2xl border border-neutral-200 bg-white p-6">
            <h2 class="mb-4 text-sm font-bold text-neutral-900">Shipping address</h2>
            <div class="grid grid-cols-2 gap-3">
              <div>
                <label class="mb-1 block text-xs font-medium text-neutral-500">First name</label>
                <div class="rounded-xl border border-neutral-200 bg-neutral-50 px-3 py-2.5 text-sm text-neutral-400">John</div>
              </div>
              <div>
                <label class="mb-1 block text-xs font-medium text-neutral-500">Last name</label>
                <div class="rounded-xl border border-neutral-200 bg-neutral-50 px-3 py-2.5 text-sm text-neutral-400">Doe</div>
              </div>
              <div class="col-span-2">
                <label class="mb-1 block text-xs font-medium text-neutral-500">Address</label>
                <div class="rounded-xl border border-neutral-200 bg-neutral-50 px-3 py-2.5 text-sm text-neutral-400">123 Main Street</div>
              </div>
              <div>
                <label class="mb-1 block text-xs font-medium text-neutral-500">City</label>
                <div class="rounded-xl border border-neutral-200 bg-neutral-50 px-3 py-2.5 text-sm text-neutral-400">New York</div>
              </div>
              <div>
                <label class="mb-1 block text-xs font-medium text-neutral-500">ZIP code</label>
                <div class="rounded-xl border border-neutral-200 bg-neutral-50 px-3 py-2.5 text-sm text-neutral-400">10001</div>
              </div>
            </div>
          </div>

          <!-- Payment -->
          <div class="rounded-2xl border border-neutral-200 bg-white p-6">
            <h2 class="mb-4 text-sm font-bold text-neutral-900">Payment</h2>
            <div class="space-y-3">
              <div>
                <label class="mb-1 block text-xs font-medium text-neutral-500">Card number</label>
                <div class="flex items-center justify-between rounded-xl border border-neutral-200 bg-neutral-50 px-3 py-2.5">
                  <span class="text-sm text-neutral-400">•••• •••• •••• 4242</span>
                  <Icon name="ph:credit-card-bold" class="text-neutral-400" />
                </div>
              </div>
              <div class="grid grid-cols-2 gap-3">
                <div>
                  <label class="mb-1 block text-xs font-medium text-neutral-500">Expiry</label>
                  <div class="rounded-xl border border-neutral-200 bg-neutral-50 px-3 py-2.5 text-sm text-neutral-400">MM / YY</div>
                </div>
                <div>
                  <label class="mb-1 block text-xs font-medium text-neutral-500">Security code</label>
                  <div class="flex items-center justify-between rounded-xl border border-neutral-200 bg-neutral-50 px-3 py-2.5">
                    <span class="text-sm text-neutral-400">CVC</span>
                    <Icon name="ph:question-bold" class="text-xs text-neutral-300" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <button type="button" class="w-full rounded-2xl bg-indigo-600 py-4 text-sm font-bold text-white shadow-md hover:bg-indigo-700">
            Place order — $275.00
          </button>
          <p class="text-center text-[10px] text-neutral-400">
            <Icon name="ph:lock-bold" class="me-0.5 text-[11px]" />
            Payments secured with 256-bit SSL encryption
          </p>
        </div>

        <!-- Right: Order summary -->
        <div class="space-y-4">
          <div class="rounded-2xl border border-neutral-200 bg-white p-5">
            <h2 class="mb-4 text-sm font-bold text-neutral-900">Order summary</h2>

            <div class="space-y-3">
              <div v-for="(item, i) in MOCK_ITEMS" :key="i" class="flex items-center gap-3">
                <div class="relative shrink-0">
                  <div
                    class="size-14 rounded-xl border border-neutral-100 bg-neutral-50 bg-contain bg-center bg-no-repeat"
                    :style="{ backgroundImage: `url('${item.img}')` }"
                  />
                  <span class="absolute -end-1.5 -top-1.5 flex size-4 items-center justify-center rounded-full bg-neutral-600 text-[9px] font-bold text-white">
                    {{ item.qty }}
                  </span>
                </div>
                <div class="min-w-0 flex-1">
                  <p class="truncate text-xs font-semibold text-neutral-900">{{ item.name }}</p>
                  <p class="text-[10px] text-neutral-400">{{ item.variant }}</p>
                </div>
                <p class="shrink-0 text-xs font-bold text-neutral-900">{{ item.price }}</p>
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
                <span>Taxes (10%)</span>
                <span class="font-medium text-neutral-900">$25.00</span>
              </div>
              <div class="flex justify-between border-t border-neutral-200 pt-2">
                <span class="text-sm font-bold text-neutral-900">Total</span>
                <span class="text-sm font-bold text-indigo-600">$275.00</span>
              </div>
            </div>
          </div>

          <!-- Trust badges -->
          <div class="flex gap-2 rounded-xl border border-neutral-200 bg-white px-4 py-3 text-[10px] text-neutral-500">
            <Icon name="ph:shield-check-bold" class="shrink-0 text-green-500" />
            Secure checkout. Your data is never shared with third parties.
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const store = useBuilderStore()

const MOCK_ITEMS = [
  { img: '/img/category-01.avif', name: 'Modern Smart Speaker', variant: 'White · 1×', qty: 1, price: '$99.00' },
  { img: '/img/category-02.avif', name: 'Casual Running Shoes', variant: 'Size 42 · 1×', qty: 1, price: '$80.00' },
  { img: '/img/category-03.avif', name: 'Minimalist Lamp', variant: 'Black · 1×', qty: 1, price: '$61.00' },
]
</script>
