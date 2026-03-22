<template>
  <div>
    <section class="bg-[#0c0c0e] border border-white/5 rounded-3xl overflow-hidden shadow-2xl">
      <div class="p-6 border-b border-white/5 flex justify-between items-center bg-white/[0.01]">
        <h2 class="font-bold flex items-center gap-2">
          <icon name="ph:clock-counter-clockwise-bold" class="text-indigo-500" /> Movement History
        </h2>
        <button
          class="text-[10px] font-black tracking-widest text-indigo-400 hover:text-indigo-300 hover:underline transition-colors mt-0.5 ms-2">
          View Full Log
        </button>
      </div>
      <VTable :headers="headers" :items="historyLogs">
        <template #cell(date)="{ item }">
          <span class="text-[10px] font-bold text-gray-500 tracking-widest">{{ item.date }}</span>
        </template>
        <template #cell(product)="{ item }">
          <span class="text-xs font-bold">{{ item.product }}</span>
        </template>
        <template #cell(type)="{ item }">
          <span class="text-[9px] font-black tracking-widest px-2.5 py-1 rounded"
            :class="item.type === 'Add' ? 'bg-emerald-500/10 text-emerald-500' : item.type === 'Remove' ? 'bg-red-500/10 text-red-500' : 'bg-blue-500/10 text-blue-500'">
            {{ item.type }}
          </span>
        </template>
        <template #cell(change)="{ item }">
          <span :class="item.change > 0 ? 'text-emerald-500' : item.change < 0 ? 'text-red-500' : 'text-gray-400'">
            {{ item.change > 0 ? '+' + item.change : item.change }}
          </span>
        </template>
        <template #cell(newStock)="{ item }">
          <span class="text-sm font-bold text-gray-300">{{ item.newStock }}</span>
        </template>
        <template #cell(reason)="{ item }">
          <span class="text-xs font-medium text-gray-400">{{ item.reason }}</span>
        </template>
        <template #cell(staff)="{ item }">
          <span class="text-xs font-bold text-gray-500 tracking-wider">{{ item.staff }}</span>
        </template>
      </VTable>
    </section>
  </div>
</template>

<script lang="ts" setup>
const headers = [
  { label: 'Date & Time', key: 'date', align: 'start' },
  { label: 'Product', key: 'product', align: 'start' },
  { label: 'Type', key: 'type', align: 'start' },
  { label: 'Qty Change', key: 'change', align: 'end' },
  { label: 'New Stock', key: 'newStock', align: 'end' },
  { label: 'Reason', key: 'reason', align: 'start' },
  { label: 'Staff', key: 'staff', align: 'end' }
]

defineProps<{
  historyLogs: any[]
}>()
</script>