<template>
  <div class="h-full">
    <section class="bg-[#0c0c0e] border border-white/5 rounded-3xl overflow-hidden flex flex-col h-full">
      <div class="p-6 flex justify-between items-center border-b border-white/5">
        <h3 class="font-bold text-lg">Recent Orders</h3>
        <VButton variant="none" className="text-[10px] font-black text-indigo-500 tracking-widest hover:underline">View
          All</VButton>
      </div>
      <div class="overflow-x-auto flex-1 h-full">
        <table class="w-full text-start text-sm">
          <thead class="text-[10px] font-black text-gray-600 tracking-widest">
            <tr class="border-b border-white/5">
              <th class="px-6 py-4 text-start">Order #</th>
              <th class="px-6 py-4 text-start">Customer</th>
              <th class="px-6 py-4 text-start">Items</th>
              <th class="px-6 py-4 text-center">Total</th>
              <th class="px-6 py-4 text-center">Status</th>
              <th class="px-6 py-4 text-end">Time</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-white/[0.03]">
            <tr v-for="order in orders" :key="order.id" class="group hover:bg-white/[0.02] transition-colors">
              <td class="px-6 py-4 font-bold text-gray-500">{{ order.id }}</td>
              <td class="px-6 py-4 font-bold">{{ order.customer }}</td>
              <td class="px-6 py-4 text-gray-500">{{ order.items }}</td>
              <td class="px-6 py-4 text-center font-bold">{{ order.total }}</td>
              <td class="px-6 py-4 text-center">
                <span
                  :class="[getStatusClass(order.status), 'text-[9px] font-black px-2.5 py-1 rounded-full whitespace-nowrap']">
                  {{ order.status }}
                </span>
              </td>
              <td class="px-6 py-4 text-end text-xs text-gray-600">{{ order.time }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  </div>
</template>

<script lang="ts" setup>
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