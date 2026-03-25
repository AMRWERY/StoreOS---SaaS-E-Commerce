<template>
  <div>
    <section class="bg-[#0c0c0e] border border-white/5 rounded-3xl overflow-hidden shadow-2xl">
      <VTable :headers="headers" :items="paginatedCustomers">
        <!-- Customer Info -->
        <template #cell(customer)="{ item }">
          <div class="flex items-center gap-4">
            <div
              :class="[item.avatarBg, 'w-10 h-10 rounded-xl flex items-center justify-center text-xs font-black shrink-0']">
              {{ item.initials }}
            </div>
            <div class="min-w-0 text-start">
              <h4 class="text-sm font-bold group-hover:text-white transition-colors">{{ item.name }}</h4>
              <p class="text-[10px] text-gray-500 font-bold mt-0.5 tracking-tight">{{ item.phone }}</p>
              <p class="text-[9px] text-gray-700 font-medium truncate">{{ item.email }}</p>
            </div>
          </div>
        </template>

        <!-- Location -->
        <template #cell(location)="{ item }">
          <p class="text-xs text-gray-400 font-medium leading-relaxed">{{ item.location }}</p>
        </template>

        <!-- Orders -->
        <template #cell(orders)="{ item }">
          <span class="text-sm font-bold text-gray-400">{{ item.orders }}</span>
        </template>

        <!-- Total Spent -->
        <template #cell(totalSpent)="{ item }">
          <span class="font-bold text-sm">${{ item.totalSpent }}</span>
        </template>

        <!-- Last Active -->
        <template #cell(lastActive)="{ item }">
          <p class="text-[11px] text-gray-500 font-medium">{{ item.lastActive }}</p>
        </template>

        <!-- Tags -->
        <template #cell(tags)="{ item }">
          <div class="flex flex-wrap gap-1.5">
            <span v-for="tag in item.tags" :key="tag.text"
              :class="[tag.color, 'text-[8px] font-black px-2 py-0.5 rounded tracking-widest']">
              {{ tag.text }}
            </span>
          </div>
        </template>

        <!-- Actions -->
        <template #cell(actions)="{ item }">
          <div class="flex justify-end gap-3 text-gray-600">
            <VButton variant="none" className="hover:text-white transition-colors"
              :to="`/dashboard/customers/${item.id}`">
              <Icon name="ph:eye-bold" />
            </VButton>
            <VButton variant="none" className="hover:text-white transition-colors">
              <Icon name="ph:shopping-cart-bold" />
            </VButton>
            <VButton variant="none" className="hover:text-white transition-colors">
              <Icon name="ph:dots-three-vertical-bold" />
            </VButton>
          </div>
        </template>
      </VTable>

      <VPagination :total="customers.length" :per-page="perPage" :current-page="currentPage"
        @update:current-page="$emit('update:currentPage', $event)" />
    </section>
  </div>
</template>

<script lang="ts" setup>
import type { TableHeader } from '@storeos/ui/types/v-table'

const props = defineProps<{
  customers: any[]
  currentPage: number
}>()

defineEmits(['update:currentPage'])

const perPage = 3

const paginatedCustomers = computed(() => {
  const start = (props.currentPage - 1) * perPage
  const end = start + perPage
  return props.customers.slice(start, end)
})

const headers: TableHeader[] = [
  { label: 'Customer', key: 'customer' },
  { label: 'Location', key: 'location' },
  { label: 'Orders', key: 'orders', align: 'center' },
  { label: 'Total Spent', key: 'totalSpent' },
  { label: 'Last Active', key: 'lastActive' },
  { label: 'Tags', key: 'tags' },
  { label: 'Actions', key: 'actions', align: 'end' }
]
</script>