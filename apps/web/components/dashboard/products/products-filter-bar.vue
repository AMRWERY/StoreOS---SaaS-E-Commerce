<template>
  <div>
    <div
      class="bg-[#0c0c0e] border border-white/5 rounded-2xl p-3 flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
      <!-- Dropdowns -->
      <div class="flex flex-wrap items-center gap-3">
        <VDropdownMenu width="w-48" align="start">
          <template #trigger="{ open }">
            <VButton variant="none"
              :className="`flex items-center gap-2 px-4 py-2 bg-black/40 border border-white/5 rounded-xl text-xs font-bold transition-all ${open ? 'text-white border-white/20' : 'text-gray-400 hover:text-white'}`">
              Category: <span class="text-white">{{ selectedCategory }}</span>
              <icon name="ph:caret-down-bold" :class="`transition-transform ${open ? 'rotate-180' : ''}`" />
            </VButton>
          </template>

          <template #default="{ close }">
            <div class="flex flex-col gap-1">
              <button v-for="cat in categories" :key="cat" @click="selectCategory(cat, close)"
                :class="`text-start px-3 py-2 rounded-lg text-sm font-medium transition-all ${selectedCategory === cat ? 'bg-indigo-500/20 text-indigo-400' : 'text-gray-400 hover:bg-white/5 hover:text-white'}`">
                {{ cat }}
              </button>
            </div>
          </template>
        </VDropdownMenu>

        <!-- Status Dropdown -->
        <VDropdownMenu width="w-48" align="start">
          <template #trigger="{ open }">
            <VButton variant="none"
              :className="`flex items-center gap-2 px-4 py-2 bg-black/40 border border-white/5 rounded-xl text-xs font-bold transition-all ${open ? 'text-white border-white/20' : 'text-gray-400 hover:text-white'}`">
              Status: <span :class="selectedStatus.colorClass">{{ selectedStatus.label }}</span>
              <div v-if="selectedStatus.dotClass" :class="`w-1.5 h-1.5 rounded-full ${selectedStatus.dotClass}`"></div>
              <icon name="ph:caret-down-bold" :class="`transition-transform ${open ? 'rotate-180' : ''}`" />
            </VButton>
          </template>

          <template #default="{ close }">
            <div class="flex flex-col gap-1">
              <button v-for="status in statuses" :key="status.label" @click="selectStatus(status, close)"
                :class="`text-start px-3 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${selectedStatus.label === status.label ? 'bg-indigo-500/20 text-indigo-400' : 'text-gray-400 hover:bg-white/5 hover:text-white'}`">
                <span>{{ status.label }}</span>
                <div v-if="status.dotClass" :class="`w-1.5 h-1.5 rounded-full ${status.dotClass} ms-auto`"></div>
              </button>
            </div>
          </template>
        </VDropdownMenu>

        <!-- Stock Dropdown -->
        <VDropdownMenu width="w-48" align="start">
          <template #trigger="{ open }">
            <VButton variant="none"
              :className="`flex items-center gap-2 px-4 py-2 bg-black/40 border border-white/5 rounded-xl text-xs font-bold transition-all ${open ? 'text-white border-white/20' : 'text-gray-400 hover:text-white'}`">
              Stock: <span class="text-white">{{ selectedStock }}</span>
              <icon name="ph:caret-down-bold" :class="`transition-transform ${open ? 'rotate-180' : ''}`" />
            </VButton>
          </template>

          <template #default="{ close }">
            <div class="flex flex-col gap-1">
              <button v-for="stock in stockOptions" :key="stock" @click="selectStock(stock, close)"
                :class="`text-start px-3 py-2 rounded-lg text-sm font-medium transition-all ${selectedStock === stock ? 'bg-indigo-500/20 text-indigo-400' : 'text-gray-400 hover:bg-white/5 hover:text-white'}`">
                {{ stock }}
              </button>
            </div>
          </template>
        </VDropdownMenu>
      </div>

      <!-- View Mode Toggle -->
      <div class="flex items-center bg-black/40 p-1 rounded-xl border border-white/5">
        <VButton variant="none" @click="$emit('update:viewMode', 'grid')"
          :className="`p-2 rounded-lg transition-all ${viewMode === 'grid' ? 'bg-indigo-500/20 text-indigo-400' : 'text-gray-600'}`">
          <icon name="ph:grid-four-fill" />
        </VButton>
        <VButton variant="none" @click="$emit('update:viewMode', 'list')"
          :className="`p-2 rounded-lg transition-all ${viewMode === 'list' ? 'bg-indigo-500/20 text-indigo-400' : 'text-gray-600'}`">
          <icon name="ph:list-bold" />
        </VButton>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const props = defineProps<{
  viewMode: string
}>()

const emit = defineEmits<{
  (e: 'update:viewMode', value: string): void
  (e: 'update:category', value: string): void
  (e: 'update:status', value: string): void
  (e: 'update:stock', value: string): void
}>()

const categories = ['All', 'ELECTRONICS', 'FASHION', 'BEAUTY', 'FURNITURE']
const selectedCategory = ref('All')

const selectCategory = (category: string, close: () => void) => {
  selectedCategory.value = category
  emit('update:category', category)
  close()
}

const statuses = [
  { label: 'All', colorClass: 'text-white', dotClass: '' },
  { label: 'Active', colorClass: 'text-emerald-500', dotClass: 'bg-emerald-500' },
  { label: 'Draft', colorClass: 'text-gray-400', dotClass: 'bg-gray-400' },
  { label: 'Archived', colorClass: 'text-amber-500', dotClass: 'bg-amber-500' }
]

const selectedStatus = ref(statuses[1]) // Default to Active as in previous hardcoded mode

const selectStatus = (status: any, close: () => void) => {
  selectedStatus.value = status
  emit('update:status', status.label)
  close()
}

const stockOptions = ['Filter', 'In Stock', 'Low Stock', 'Out of Stock']
const selectedStock = ref('Filter')

const selectStock = (stock: string, close: () => void) => {
  selectedStock.value = stock
  emit('update:stock', stock)
  close()
}
</script>