<template>
  <div>
    <section class="lg:col-span-12 bg-[#0c0c0e] border border-white/5 rounded-[2.5rem] overflow-hidden">
      <!-- Section header -->
      <div class="p-8 flex justify-between items-center border-b border-white/5">
        <div>
          <h3 class="font-bold text-lg">Billing History</h3>
          <p class="text-xs text-gray-600 font-medium mt-1">Download and manage your historical invoices.</p>
        </div>
        <div class="flex gap-3">
          <button
            class="p-2.5 bg-white/5 border border-white/5 rounded-xl text-gray-500 hover:text-white transition-colors">
            <Icon name="ph:sliders-horizontal-bold" />
          </button>
          <button
            class="p-2.5 bg-white/5 border border-white/5 rounded-xl text-gray-500 hover:text-white transition-colors">
            <Icon name="ph:export-bold" />
          </button>
        </div>
      </div>

      <!-- VTable -->
      <div class="p-4">
        <VTable :headers="headers" :items="invoices">
          <template #cell(id)="{ item }">
            <span class="text-xs font-bold text-gray-500 group-hover:text-indigo-400 transition-colors">
              {{ item.id }}
            </span>
          </template>
          <template #cell(date)="{ item }">
            <span class="text-sm font-medium text-gray-400">{{ item.date }}</span>
          </template>
          <template #cell(amount)="{ item }">
            <span class="text-sm font-bold text-white">{{ item.amount }}</span>
          </template>
          <template #cell(status)="{ item }">
            <span
              class="bg-emerald-500/10 text-emerald-500 text-[9px] font-black px-2.5 py-1 rounded tracking-widest border border-emerald-500/10">
              {{ item.status }}
            </span>
          </template>
          <template #cell(action)="{ }">
            <button class="text-gray-700 hover:text-indigo-400 transition-colors">
              <Icon name="ph:download-simple-bold" class="text-lg" />
            </button>
          </template>
        </VTable>
        <button
          class="w-full py-6 text-[10px] font-black tracking-widest text-gray-700 hover:text-white transition-colors">
          View All Invoices
        </button>
      </div>
    </section>
  </div>
</template>

<script lang="ts" setup>
import type { TableHeader } from '@storeos/ui/types/v-table'

const headers: TableHeader[] = [
  { label: 'Invoice ID', key: 'id' },
  { label: 'Date', key: 'date' },
  { label: 'Amount', key: 'amount' },
  { label: 'Status', key: 'status', align: 'center' },
  { label: 'Action', key: 'action', align: 'end' },
]

const invoices = [
  { id: 'INV-2024-009', date: 'Sep 24, 2024', amount: '$261.50', status: 'PAID' },
  { id: 'INV-2024-008', date: 'Aug 24, 2024', amount: '$249.00', status: 'PAID' },
  { id: 'INV-2024-007', date: 'Jul 24, 2024', amount: '$249.00', status: 'PAID' },
]
</script>