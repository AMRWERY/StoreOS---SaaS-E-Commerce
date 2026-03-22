<template>
  <div>
    <div class="fixed inset-0 z-50 overflow-hidden" @click.self="$emit('close')">
      <div class="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"></div>
      <aside
        class="absolute end-0 top-0 h-full w-full max-w-[480px] bg-[#080809] border-l border-white/5 shadow-2xl flex flex-col transform transition-transform duration-300">
        <div class="p-8 flex-1 overflow-y-auto hide-scrollbar">
          <!-- Detail Header -->
          <div class="flex justify-between items-center mb-10">
            <div class="flex items-center gap-3">
              <span class="text-sm font-bold text-indigo-400">#SO-{{ order.id }}</span>
              <span
                :class="[getOrderStatusClass(order.orderStatus), 'text-[9px] font-black px-2.5 py-1 rounded tracking-widest']">{{
                  order.orderStatus }}</span>
            </div>
            <VButton @click="$emit('close')"
              variant="none"
              className="w-10 h-10 flex items-center justify-center bg-white/5 hover:bg-white/10 rounded-xl text-gray-400 hover:text-white transition-colors">
              <icon name="ph:x-bold" />
            </VButton>
          </div>

          <!-- Customer Info -->
          <div class="mb-12">
            <h3 class="text-[10px] font-black text-gray-600 tracking-[0.2em] mb-6">Customer Information</h3>
            <div class="flex items-center gap-4 mb-6">
              <div
                :class="[order.avatarBg, 'w-12 h-12 rounded-xl flex items-center justify-center text-sm font-black border border-white/5']">
                {{ order.initials }}
              </div>
              <div>
                <h4 class="font-bold text-white">{{ order.customer }}</h4>
                <p class="text-xs text-gray-500">{{ order.email || 'ethan.laurent@designstack.io' }}</p>
              </div>
            </div>
            <div class="bg-white/[0.02] border border-white/5 rounded-2xl p-5">
              <div class="flex justify-between items-start mb-2">
                <span class="text-[10px] font-black text-gray-500">Shipping</span>
                <icon name="ph:map-pin-bold" class="text-gray-600" />
              </div>
              <p class="text-xs text-gray-400 leading-relaxed font-medium">
                88 Market St, Suite 200<br />San Francisco, CA 94103
              </p>
            </div>
          </div>

          <!-- Items -->
          <div>
            <div class="flex justify-between items-center mb-6">
              <h3 class="text-[10px] font-black text-gray-600 tracking-[0.2em]">Items ({{ order.itemsCount }})</h3>
              <VButton variant="none" className="text-[10px] font-bold text-indigo-400 hover:underline" @click="navigateTo(`/dashboard/orders/order-form?id=${order.id}`)">Edit</VButton>
            </div>
            <div class="space-y-4">
              <div v-for="i in 2" :key="i" class="flex items-center gap-4">
                <div class="w-12 h-12 bg-gray-900 border border-white/5 rounded-xl overflow-hidden shrink-0">
                  <img :src="`/img/product-0${(i % 3) + 1}.png`"
                    class="w-full h-full object-cover grayscale opacity-80" />
                </div>
                <div class="flex-1 min-w-0">
                  <h5 class="text-xs font-bold truncate text-white">Velocity Elite Runner</h5>
                  <p class="text-[10px] text-gray-600 font-medium">Size 42 | Color: Crimson</p>
                </div>
                <div class="text-end">
                  <p class="text-xs font-bold text-white">$189.00</p>
                  <p class="text-[10px] text-gray-600 font-black">×1</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Price Summary -->
          <div class="mt-12 pt-8 border-t border-white/5 space-y-4">
            <div class="flex justify-between text-xs font-bold text-gray-500">
              <span>Subtotal</span>
              <span>$1,088.00</span>
            </div>
            <div class="flex justify-between text-xs font-bold text-gray-500">
              <span>Shipping (Express)</span>
              <span>$162.00</span>
            </div>
            <div class="flex justify-between items-end pt-4">
              <span class="text-sm font-black text-white tracking-widest">Total</span>
              <span class="text-xl font-bold text-indigo-400">${{ order.total }}</span>
            </div>
          </div>
        </div>

        <!-- Detail Footer Actions -->
        <div class="p-6 border-t border-white/5 bg-[#0c0c0e] flex gap-3">
          <VButton
            className="flex-1 bg-indigo-600 hover:bg-indigo-500 text-white py-3.5 rounded-xl text-xs font-black tracking-widest transition-all shadow-lg shadow-indigo-600/10">
            Confirm Order
          </VButton>
          <VButton variant="none"
            className="w-12 h-12 bg-white/5 hover:bg-white/10 border border-white/5 rounded-xl flex items-center justify-center transition-colors">
            <icon name="ph:printer-bold" class="text-lg text-gray-400" />
          </VButton>
        </div>
      </aside>
    </div>
  </div>
</template>

<script lang="ts" setup>
defineProps<{
  order: any;
}>();

defineEmits(['close']);

const getOrderStatusClass = (status: string) => {
  switch (status) {
    case 'NEW': return 'bg-orange-500/10 text-orange-500'
    case 'CONFIRMED': return 'bg-indigo-500/10 text-indigo-500'
    case 'PROCESSING': return 'bg-yellow-500/10 text-yellow-500'
    case 'SHIPPED': return 'bg-blue-500/10 text-blue-500'
    case 'DELIVERED': return 'bg-emerald-500/10 text-emerald-500'
    case 'CANCELLED': return 'bg-red-500/10 text-red-500'
    case 'REFUNDED': return 'bg-purple-500/10 text-purple-400'
    default: return 'bg-gray-500/10 text-gray-500'
  }
}
</script>