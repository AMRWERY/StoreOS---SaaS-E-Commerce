<template>
  <div>
    <section class="lg:col-span-12 bg-bg-primary border border-border-subtle rounded-2xl overflow-hidden">
      <!-- Section header -->
      <div class="px-4 py-3.5 flex justify-between items-center border-b border-border-subtle">
        <div>
          <h3 class="font-bold text-lg">Billing History</h3>
          <p class="text-xs text-tx-muted font-medium mt-1">Download and manage your historical invoices.</p>
        </div>
        <div class="flex gap-3">
          <button
            class="p-2.5 bg-bg-elevated border border-border-subtle rounded-xl text-tx-secondary hover:text-tx-primary transition-colors">
            <Icon name="ph:sliders-horizontal-bold" />
          </button>
          <button
            class="p-2.5 bg-bg-elevated border border-border-subtle rounded-xl text-tx-secondary hover:text-tx-primary transition-colors">
            <Icon name="ph:export-bold" />
          </button>
        </div>
      </div>

      <!-- VTable -->
      <div class="p-4">
        <VTable :headers="headers" :items="invoices">
          <template #cell(id)="{ item }">
            <span class="font-mono text-xs font-bold text-tx-secondary group-hover:text-brand transition-colors">
              {{ item.id }}
            </span>
          </template>
          <template #cell(date)="{ item }">
            <span class="font-mono text-sm font-medium text-tx-secondary">{{ item.date }}</span>
          </template>
          <template #cell(amount)="{ item }">
            <span class="font-mono text-sm font-bold text-tx-primary">{{ item.amount }}</span>
          </template>
          <template #cell(status)="{ item }">
            <span class="rounded-full px-2 py-0.5 text-[10px] font-semibold bg-success-dim text-success">
              {{ item.status }}
            </span>
          </template>
          <template #cell(action)="{ }">
            <button class="text-tx-muted hover:text-brand transition-colors">
              <Icon name="ph:download-simple-bold" class="text-lg" />
            </button>
          </template>
        </VTable>
        <button
          class="w-full py-6 text-[10px] font-black tracking-widest text-tx-muted hover:text-tx-primary transition-colors">
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