<template>
  <div class="h-full">
    <section class="bg-[#0c0c0e] border border-white/5 rounded-3xl overflow-hidden flex flex-col h-full">
      <div class="p-6 flex justify-between items-center border-b border-white/5">
        <h3 class="font-bold text-lg">Recent Orders</h3>
        <VButton variant="none" className="text-[10px] font-black text-indigo-500 tracking-widest hover:underline">View
          All</VButton>
      </div>
      <div class="overflow-x-auto flex-1 h-full">
      <VTable :headers="headers" :items="orders">
        <template #cell(id)="{ item }">
          <span class="font-bold text-gray-500">{{ item.id }}</span>
        </template>
        <template #cell(customer)="{ item }">
          <span class="font-bold">{{ item.customer }}</span>
        </template>
        <template #cell(items)="{ item }">
          <span class="text-gray-500">{{ item.items }}</span>
        </template>
        <template #cell(total)="{ item }">
          <span class="font-bold">{{ item.total }}</span>
        </template>
        <template #cell(status)="{ item }">
          <span
            :class="[getStatusClass(item.status), 'text-[9px] font-black px-2.5 py-1 rounded-full whitespace-nowrap']">
            {{ item.status }}
          </span>
        </template>
        <template #cell(time)="{ item }">
          <span class="text-xs text-gray-600">{{ item.time }}</span>
        </template>
      </VTable>
      </div>
    </section>
  </div>
</template>

<script lang="ts" setup>
const headers = [
  { label: 'Order #', key: 'id', align: 'start' },
  { label: 'Customer', key: 'customer', align: 'start' },
  { label: 'Items', key: 'items', align: 'start' },
  { label: 'Total', key: 'total', align: 'center' },
  { label: 'Status', key: 'status', align: 'center' },
  { label: 'Time', key: 'time', align: 'end' }
]

const orders = [
  { id: '#SO-9821', customer: 'Marcus Holloway', items: '03', total: '$420.00', status: 'NEW', time: '2m ago' },
  { id: '#SO-9819', customer: 'Sarah Jenkins', items: '01', total: '$89.00', status: 'CONFIRMED', time: '14m ago' },
  { id: '#SO-9815', customer: 'Elena Rodriguez', items: '05', total: '$1,250.00', status: 'PROCESSING', time: '28m ago' },
  { id: '#SO-9812', customer: 'David Chen', items: '02', total: '$315.50', status: 'SHIPPED', time: '1h ago' },
  { id: '#SO-9089', customer: 'Lisa Ray', items: '01', total: '$45.00', status: 'DELIVERED', time: '2h ago' },
  { id: '#SO-9805', customer: 'Tom Baker', items: '01', total: '$210.00', status: 'CANCELLED', time: '3h ago' },
  { id: '#SO-9801', customer: 'Anna Schmidt', items: '04', total: '$890.00', status: 'SHIPPED', time: '5h ago' },
  { id: '#SO-9798', customer: 'James Miller', items: '02', total: '$150.25', status: 'DELIVERED', time: '8h ago' },
]

const getStatusClass = (status: string) => {
  switch (status) {
    case 'NEW': return 'bg-orange-500/10 text-orange-500'
    case 'CONFIRMED': return 'bg-indigo-500/10 text-indigo-500'
    case 'PROCESSING': return 'bg-yellow-500/10 text-yellow-500'
    case 'SHIPPED': return 'bg-blue-500/10 text-blue-500'
    case 'DELIVERED': return 'bg-emerald-500/10 text-emerald-500'
    case 'CANCELLED': return 'bg-red-500/10 text-red-500'
    default: return 'bg-gray-500/10 text-gray-500'
  }
}
</script>