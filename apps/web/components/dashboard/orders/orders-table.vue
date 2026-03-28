<template>
  <div>
    <!-- Table Header Labels -->
    <div
      class="grid grid-cols-12 px-6 py-4 text-[10px] font-black text-tx-muted tracking-widest border-b border-border-subtle">
      <div class="col-span-3 flex items-center gap-4">
        <div @click="$emit('select-all')"
          class="w-4 h-4 border rounded cursor-pointer transition-all flex items-center justify-center"
          :class="isAllSelected ? 'bg-brand border-brand' : 'border-border-default bg-bg-elevated'">
          <Icon v-if="isAllSelected" name="ph:check-bold" class="text-[10px] text-tx-primary" />
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
        class="grid grid-cols-12 items-center px-6 py-5 bg-bg-primary border rounded-2xl transition-all cursor-pointer group"
        :class="[
          order.orderStatus === 'NEW' ? 'border-brand/30 ring-1 ring-accent/10 border-s-[3px] border-s-orange-500 shadow-[0_0_15px_-5px_rgba(249,115,22,0.1)]' : 'border-border-subtle hover:border-border-default',
          order.active ? 'bg-bg-elevated' : ''
        ]">
        <div class="col-span-3 flex items-center gap-4">
          <div @click.stop="$emit('toggle-selection', order.id)"
            class="w-4 h-4 border rounded transition-all flex items-center justify-center shrink-0"
            :class="selectedIds.includes(order.id) ? 'bg-brand border-brand' : 'border-border-default bg-bg-elevated group-hover:border-border-default'">
            <Icon v-if="selectedIds.includes(order.id)" name="ph:check-bold" class="text-[10px] text-tx-primary" />
          </div>
          <VButton variant="none" :to="`/dashboard/orders/${order.id}`" @click.stop
            className="flex flex-col text-xs font-mono font-bold text-tx-secondary hover:text-brand transition-colors w-12 shrink-0">
            #SO-{{ order.id }}
          </VButton>
          <div
            :class="[order.avatarBg, 'w-8 h-8 rounded-lg flex items-center justify-center text-[10px] font-black shrink-0']">
            {{ order.initials }}
          </div>
          <div class="flex flex-col">
            <span class="text-sm font-bold text-tx-primary">{{ order.customer }}</span>
            <span class="text-[10px] text-tx-secondary font-medium">{{ order.phone }}</span>
          </div>
        </div>

        <div class="col-span-2 flex flex-col items-center">
          <div class="flex -space-s-2 mb-1">
            <div class="w-6 h-6 bg-bg-elevated border border-black rounded-md overflow-hidden relative">
              <img :src="`/img/product-0${(order.id % 3) + 1}.avif`" class="w-full h-full object-cover" />
            </div>
            <div v-if="order.itemsCount > 1"
              class="w-6 h-6 bg-bg-elevated border border-black rounded-md flex items-center justify-center text-[8px] font-bold text-tx-secondary">
              +{{ order.itemsCount - 1 }}
            </div>
          </div>
          <span class="text-[10px] text-tx-secondary font-black">{{ order.itemsCount }} Items</span>
        </div>

        <div class="col-span-2 text-center flex flex-col items-center gap-1.5">
          <span class="font-mono text-sm font-bold">${{ order.total }}</span>
          <span
            :class="[getPaymentStatusClass(order.paymentStatus), 'rounded-full px-2 py-0.5 text-[10px] font-semibold flex items-center gap-1']">
            <div class="w-1 h-1 rounded-full bg-current"></div> {{ order.paymentStatus || 'UNPAID' }}
          </span>
        </div>

        <div class="col-span-2 text-center">
          <span
            :class="[getOrderStatusClass(order.orderStatus), 'rounded-full px-2 py-0.5 text-[10px] font-semibold']">
            {{ order.orderStatus }}
          </span>
        </div>

        <div class="col-span-1 text-center">
          <span class="text-xs text-tx-muted">{{ order.time }}</span>
        </div>

        <div class="col-span-2 flex items-center justify-end gap-2">
          <VButton variant="none"
            className="p-2 text-tx-secondary hover:text-brand transition-colors hidden group-hover:block"
            @click.stop="">
            <Icon name="ph:check-circle-bold" class="text-lg" />
          </VButton>
          <VButton variant="none"
            className="p-2 text-tx-secondary hover:text-danger transition-colors hidden group-hover:block" @click.stop="">
            <Icon name="ph:x-circle-bold" class="text-lg" />
          </VButton>
          <VButton variant="none" className="p-2 text-tx-secondary hover:text-tx-primary transition-colors" @click.stop="">
            <Icon name="ph:dots-three-bold" class="text-lg" />
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
    case 'PAID': return 'bg-success-dim text-success'
    case 'UNPAID': return 'bg-danger-dim text-danger'
    case 'COD': return 'bg-bg-elevated text-tx-secondary'
    default: return 'bg-danger-dim text-danger'
  }
}

const getOrderStatusClass = (status: string) => {
  switch (status) {
    case 'NEW': return 'bg-accent-dim text-accent'
    case 'CONFIRMED': return 'bg-info-dim text-info'
    case 'PROCESSING': return 'bg-status-yellow-dim text-status-yellow'
    case 'SHIPPED': return 'bg-status-purple-dim text-status-purple'
    case 'DELIVERED': return 'bg-success-dim text-success'
    case 'CANCELLED': return 'bg-danger-dim text-danger'
    case 'REFUNDED': return 'bg-danger-dim text-danger'
    default: return 'bg-bg-elevated text-tx-secondary'
  }
}
</script>
