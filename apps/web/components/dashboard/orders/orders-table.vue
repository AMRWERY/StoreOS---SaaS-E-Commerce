<template>
  <div>
    <!-- Table Header Labels -->
    <div
      class="grid grid-cols-12 px-6 py-4 text-[10px] font-black text-gray-600 tracking-widest border-b border-white/5">
      <div class="col-span-3 flex items-center gap-4">
        <div @click="$emit('select-all')"
          class="w-4 h-4 border rounded cursor-pointer transition-all flex items-center justify-center"
          :class="isAllSelected ? 'bg-indigo-600 border-indigo-600' : 'border-white/10 bg-white/5'">
          <icon v-if="isAllSelected" name="ph:check-bold" class="text-[10px] text-white" />
        </div>
        Order & Customer
      </div>
      <div class="col-span-2 text-center">Items Total</div>
      <div class="col-span-2 text-center">Payment</div>
      <div class="col-span-2 text-center">Status</div>
      <div class="col-span-1 text-center">Date</div>
      <div class="col-span-2 text-end">Actions</div>
    </div>

    <!-- Order List Items -->
    <div class="space-y-4 mt-4">
      <div v-for="order in orders" :key="order.id" @click="$emit('select-order', order)"
        class="grid grid-cols-12 items-center px-6 py-5 bg-[#0c0c0e] border rounded-2xl transition-all cursor-pointer group"
        :class="[
          order.orderStatus === 'NEW' ? 'border-indigo-500/30 ring-1 ring-orange-500/10 border-s-[3px] border-s-orange-500 shadow-[0_0_15px_-5px_rgba(249,115,22,0.1)]' : 'border-white/5 hover:border-white/10',
          order.active ? 'bg-white/[0.02]' : ''
        ]">
        <div class="col-span-3 flex items-center gap-4">
          <div @click.stop="$emit('toggle-selection', order.id)"
            class="w-4 h-4 border rounded transition-all flex items-center justify-center shrink-0"
            :class="selectedIds.includes(order.id) ? 'bg-indigo-600 border-indigo-600' : 'border-white/20 bg-white/5 group-hover:border-white/40'">
            <icon v-if="selectedIds.includes(order.id)" name="ph:check-bold" class="text-[10px] text-white" />
          </div>
          <VButton variant="none" :to="`/dashboard/orders/${order.id}`" @click.stop
            className="flex flex-col text-xs font-bold text-gray-500 hover:text-indigo-400 transition-colors w-12 shrink-0">
            #SO-{{ order.id }}
          </VButton>
          <div
            :class="[order.avatarBg, 'w-8 h-8 rounded-lg flex items-center justify-center text-[10px] font-black shrink-0']">
            {{ order.initials }}
          </div>
          <div class="flex flex-col">
            <span class="text-sm font-bold text-white">{{ order.customer }}</span>
            <span class="text-[10px] text-gray-500 font-medium">{{ order.phone }}</span>
          </div>
        </div>

        <div class="col-span-2 flex flex-col items-center">
          <div class="flex -space-s-2 mb-1">
            <div class="w-6 h-6 bg-white/10 border border-black rounded-md overflow-hidden relative">
              <img :src="`/img/product-0${(order.id % 3) + 1}.png`" class="w-full h-full object-cover" />
            </div>
            <div v-if="order.itemsCount > 1"
              class="w-6 h-6 bg-gray-900 border border-black rounded-md flex items-center justify-center text-[8px] font-bold text-gray-400">
              +{{ order.itemsCount - 1 }}
            </div>
          </div>
          <span class="text-[10px] text-gray-500 font-black">{{ order.itemsCount }} Items</span>
        </div>

        <div class="col-span-2 text-center flex flex-col items-center gap-1.5">
          <span class="text-sm font-bold">${{ order.total }}</span>
          <span
            :class="[getPaymentStatusClass(order.paymentStatus), 'text-[8px] font-black px-1.5 py-0.5 rounded flex items-center gap-1']">
            <div class="w-1 h-1 rounded-full bg-current"></div> {{ order.paymentStatus || 'UNPAID' }}
          </span>
        </div>

        <div class="col-span-2 text-center">
          <span
            :class="[getOrderStatusClass(order.orderStatus), 'text-[9px] font-black px-2.5 py-1 rounded-md tracking-wider']">
            {{ order.orderStatus }}
          </span>
        </div>

        <div class="col-span-1 text-center">
          <span class="text-xs text-gray-600">{{ order.time }}</span>
        </div>

        <div class="col-span-2 flex items-center justify-end gap-2">
          <VButton variant="none"
            className="p-2 text-gray-500 hover:text-indigo-400 transition-colors hidden group-hover:block"
            @click.stop="">
            <icon name="ph:check-circle-bold" class="text-lg" />
          </VButton>
          <VButton variant="none"
            className="p-2 text-gray-500 hover:text-red-400 transition-colors hidden group-hover:block" @click.stop="">
            <icon name="ph:x-circle-bold" class="text-lg" />
          </VButton>
          <VButton variant="none" className="p-2 text-gray-500 hover:text-white transition-colors" @click.stop="">
            <icon name="ph:dots-three-bold" class="text-lg" />
          </VButton>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
defineProps<{
  orders: Array<any>;
  selectedIds: Array<number>;
  isAllSelected?: boolean;
}>();

defineEmits(['select-order', 'toggle-selection', 'select-all']);

const getPaymentStatusClass = (status: string) => {
  switch (status) {
    case 'PAID': return 'bg-emerald-500/10 text-emerald-500'
    case 'UNPAID': return 'bg-amber-500/10 text-amber-500'
    case 'COD': return 'bg-gray-500/10 text-gray-500'
    default: return 'bg-amber-500/10 text-amber-500'
  }
}

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
