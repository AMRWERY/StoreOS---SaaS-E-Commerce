<template>
  <div>
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <!-- Top Products -->
      <div class="bg-bg-primary border border-border-subtle rounded-2xl overflow-hidden">
        <div class="p-6 border-b border-border-subtle flex justify-between items-center">
          <h3 class="font-bold">Top Products</h3>
          <button class="text-[10px] font-black text-brand tracking-widest hover:underline">View
            All</button>
        </div>
        <div class="relative overflow-x-auto">
          <VTable :headers="productHeaders" :items="products">
            <template #cell(product)="{ item }">
              <div class="flex items-center gap-4">
                <div class="w-10 h-10 bg-bg-elevated rounded-xl overflow-hidden border border-border-subtle">
                  <img :src="`https://source.unsplash.com/random/100x100?sig=${item.name}`"
                    class="w-full h-full object-cover grayscale opacity-60" />
                </div>
                <div>
                  <p class="text-sm font-bold">{{ item.name }}</p>
                  <p class="text-[9px] text-tx-muted font-bold tracking-tight">{{ item.category }}</p>
                </div>
              </div>
            </template>
            <template #cell(sales)="{ item }">
              <span class="text-sm font-bold text-tx-secondary">{{ item.sales }}</span>
            </template>
            <template #cell(revenue)="{ item }">
              <span class="font-bold text-sm">{{ item.revenue }}</span>
            </template>
          </VTable>
        </div>
      </div>

      <!-- Top Customers -->
      <div class="bg-bg-primary border border-border-subtle rounded-2xl overflow-hidden">
        <div class="p-6 border-b border-border-subtle flex justify-between items-center">
          <h3 class="font-bold">Top Customers</h3>
          <button class="text-[10px] font-black text-brand tracking-widest hover:underline">View
            All</button>
        </div>
        <div class="relative overflow-x-auto">
          <VTable :headers="customerHeaders" :items="customers">
            <template #cell(customer)="{ item }">
              <div class="flex items-center gap-4">
                <img :src="`https://i.pravatar.cc/100?u=${item.name}`"
                  class="w-10 h-10 rounded-xl border border-border-subtle" />
                <div>
                  <p class="text-sm font-bold">{{ item.name }}</p>
                  <p class="text-[9px] text-tx-muted font-bold tracking-tight">{{ item.type }}</p>
                </div>
              </div>
            </template>
            <template #cell(orders)="{ item }">
              <span class="text-sm font-bold text-tx-secondary">{{ item.orders }}</span>
            </template>
            <template #cell(spent)="{ item }">
              <span class="font-bold text-sm">{{ item.spent }}</span>
            </template>
          </VTable>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { TableHeader } from '@storeos/ui/types/v-table'
import type { Product, Customer } from '@/types/analytics'

defineProps<{
  products: Product[]
  customers: Customer[]
}>()

const productHeaders: TableHeader[] = [
  { label: 'Product', key: 'product' },
  { label: 'Sales', key: 'sales' },
  { label: 'Revenue', key: 'revenue', align: 'end' }
]

const customerHeaders: TableHeader[] = [
  { label: 'Customer', key: 'customer' },
  { label: 'Orders', key: 'orders', align: 'center' },
  { label: 'Total Spent', key: 'spent', align: 'end' }
]
</script>