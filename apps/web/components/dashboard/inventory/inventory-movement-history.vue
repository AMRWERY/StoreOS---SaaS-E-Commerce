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
      <table class="w-full text-start">
        <thead class="text-[9px] font-black text-gray-600 tracking-widest border-b border-white/5 bg-black/40">
          <tr>
            <th class="px-6 py-4">Date & Time</th>
            <th class="px-6 py-4">Product</th>
            <th class="px-6 py-4">Type</th>
            <th class="px-6 py-4 text-end">Qty Change</th>
            <th class="px-6 py-4 text-end">New Stock</th>
            <th class="px-6 py-4">Reason</th>
            <th class="px-6 py-4 text-end">Staff</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-white/[0.03]">
          <tr v-for="log in historyLogs" :key="log.id" class="group hover:bg-white/[0.02] transition-colors">
            <td class="px-6 py-4 text-[10px] font-bold text-gray-500 tracking-widest">{{ log.date }}</td>
            <td class="px-6 py-4 text-xs font-bold">{{ log.product }}</td>
            <td class="px-6 py-4">
              <span class="text-[9px] font-black tracking-widest px-2.5 py-1 rounded"
                :class="log.type === 'Add' ? 'bg-emerald-500/10 text-emerald-500' : log.type === 'Remove' ? 'bg-red-500/10 text-red-500' : 'bg-blue-500/10 text-blue-500'">
                {{ log.type }}
              </span>
            </td>
            <td class="px-6 py-4 text-sm font-bold text-end">
              <span :class="log.change > 0 ? 'text-emerald-500' : log.change < 0 ? 'text-red-500' : 'text-gray-400'">
                {{ log.change > 0 ? '+' + log.change : log.change }}
              </span>
            </td>
            <td class="px-6 py-4 text-sm font-bold text-gray-300 text-end">{{ log.newStock }}</td>
            <td class="px-6 py-4 text-xs font-medium text-gray-400">{{ log.reason }}</td>
            <td class="px-6 py-4 text-xs font-bold text-gray-500 text-end tracking-wider">{{ log.staff }}</td>
          </tr>
        </tbody>
      </table>
    </section>
  </div>
</template>

<script lang="ts" setup>
defineProps<{
  historyLogs: any[]
}>()
</script>