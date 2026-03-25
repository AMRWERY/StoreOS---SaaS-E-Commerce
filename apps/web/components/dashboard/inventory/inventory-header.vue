<template>
  <div>
    <VBreadcrumb :items="[
      { label: 'Dashboard', to: '/dashboard' },
      { label: 'Catalog' },
      { label: 'Inventory', active: true }
    ]" />
    <div class="space-y-6">
      <!-- Top Row -->
      <header class="flex items-center justify-between">
        <div class="flex items-center gap-3">
          <h1 class="text-3xl font-bold tracking-tight">Inventory</h1>
          <span class="bg-white/5 px-2 py-0.5 rounded text-[10px] font-black text-gray-500 tracking-widest mt-1">
            {{ totalProducts }} Total
          </span>
        </div>
        <div class="flex items-center gap-4">
          <VButton variant="secondary" className="px-5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2">
            <icon name="ph:file-csv-bold" class="text-sm" />
            Import CSV
          </VButton>
          <VButton @click="$emit('adjust')"
            className="bg-indigo-600 hover:bg-indigo-500 text-white px-5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 transition-all shadow-lg shadow-indigo-600/20">
            <icon name="ph:plus-bold" />
            Adjust Stock
          </VButton>
        </div>
      </header>

      <!-- Search & Filters Row -->
      <div class="flex items-center gap-4">
        <VSearchInput 
          :modelValue="search" 
          @update:modelValue="$emit('update:search', $event)" 
          wrapperClass="flex-1 min-w-[300px]" 
          placeholder="Search products, SKU, or category..." 
        />

        <VDropdownMenu width="w-48" align="start">
          <template #trigger="{ open }">
            <button :class="open ? 'bg-white/5 border-white/20' : 'bg-[#0c0c0e] border-white/5 hover:bg-white/5'"
              class="flex items-center gap-2 px-5 py-3.5 rounded-2xl text-xs font-bold text-gray-400 transition-colors">
              Category: <span class="text-white ms-1">{{ category }}</span>
              <icon name="ph:caret-down-bold" class="transition-transform duration-200"
                :class="open ? 'rotate-180' : ''" />
            </button>
          </template>
          <template #default="{ close }">
            <div class="flex flex-col gap-1 p-1">
              <button v-for="cat in ['All', 'ELECTRONICS', 'PERIPHERALS', 'DISPLAYS', 'FURNITURE']" :key="cat"
                @click="$emit('update:category', cat); close()"
                class="text-start px-3 py-2 rounded-xl text-xs font-bold hover:bg-white/5 transition-colors"
                :class="category === cat ? 'text-indigo-400 bg-indigo-500/5' : 'text-gray-400'">
                {{ cat }}
              </button>
            </div>
          </template>
        </VDropdownMenu>

        <VDropdownMenu width="w-48" align="start">
          <template #trigger="{ open }">
            <button :class="open ? 'bg-white/5 border-white/20' : 'bg-[#0c0c0e] border-white/5 hover:bg-white/5'"
              class="flex items-center gap-2 px-5 py-3.5 rounded-2xl text-xs font-bold text-gray-400 transition-colors">
              Stock Status: <span class="text-white ms-1">{{ status }}</span>
              <icon name="ph:caret-down-bold" class="transition-transform duration-200"
                :class="open ? 'rotate-180' : ''" />
            </button>
          </template>
          <template #default="{ close }">
            <div class="flex flex-col gap-1 p-1">
              <button v-for="st in ['Any', 'In Stock', 'Low Stock', 'Out of Stock']" :key="st"
                @click="$emit('update:status', st); close()"
                class="text-start px-3 py-2 rounded-xl text-xs font-bold hover:bg-white/5 transition-colors"
                :class="status === st ? 'text-indigo-400 bg-indigo-500/5' : 'text-gray-400'">
                {{ st }}
              </button>
            </div>
          </template>
        </VDropdownMenu>

        <button
          @click="clearFilters"
          class="text-[10px] font-black tracking-widest text-indigo-400 hover:text-indigo-300 hover:underline transition-colors ms-2 shrink-0">
          Clear filters
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps({
  totalProducts: { type: Number, required: true },
  search: { type: String, default: '' },
  category: { type: String, default: 'All' },
  status: { type: String, default: 'Any' }
})

const emit = defineEmits(['adjust', 'update:search', 'update:category', 'update:status'])

const clearFilters = () => {
  emit('update:search', '')
  emit('update:category', 'All')
  emit('update:status', 'Any')
}
</script>