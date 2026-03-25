<template>
  <div>
    <section class="bg-[#0c0c0e] border border-white/5 rounded-3xl overflow-hidden shadow-2xl">
      <div class="p-6 border-b border-white/5 flex justify-between items-center bg-white/[0.01]">
        <h2 class="font-bold flex items-center gap-2">
          <icon name="ph:squares-four-bold" class="text-indigo-500" />Inventory List
        </h2>
        <div class="flex items-center gap-4">
          <span class="text-[10px] font-bold text-gray-600">Showing {{ items.length }} items</span>
        </div>
      </div>
      
      <VTable :headers="headers" :items="paginatedItems">
        <!-- Product Details -->
        <template #cell(name)="{ item }">
          <div class="flex items-center gap-4">
            <div class="relative w-11 h-11 rounded-lg overflow-hidden border border-white/5 bg-black">
              <img :src="item.image"
                class="w-full h-full object-cover grayscale opacity-80 group-hover/row:grayscale-0 group-hover/row:opacity-100 transition-all" />
            </div>
            <div class="min-w-0">
              <h4 class="text-sm font-bold truncate">{{ item.name }}</h4>
              <p class="text-[10px] text-gray-500 font-bold tracking-widest mt-0.5">SKU: {{ item.sku }}</p>
            </div>
          </div>
        </template>

        <!-- Category -->
        <template #cell(category)="{ item }">
          <span class="text-[10px] font-black text-gray-500 tracking-wider bg-white/5 px-2 py-1 rounded">
            {{ item.category }}
          </span>
        </template>

        <!-- Current Stock -->
        <template #cell(current)="{ item }">
          <div v-if="item.current === 0" class="text-[11px] font-black tracking-widest text-red-500">OUT OF STOCK</div>
          <div v-else-if="item.current <= item.threshold" class="text-[11px] font-black tracking-widest text-amber-500">
            LOW: {{ item.current }}
          </div>
          <div v-else class="text-[11px] font-black tracking-widest text-emerald-500">{{ item.current }}</div>
        </template>

        <!-- Incoming -->
        <template #cell(incoming)="{ item }">
          <span v-if="item.incoming > 0" class="text-sm font-bold text-indigo-400">+{{ item.incoming }}</span>
          <span v-else class="text-sm font-bold text-gray-600">-</span>
        </template>

        <!-- Threshold (Inline Edit) -->
        <template #cell(threshold)="{ item }">
          <div class="flex items-center gap-2 group/edit cursor-pointer w-fit" @click.stop="startEditThreshold(item)">
            <template v-if="editingId === item.id">
              <input 
                type="number" 
                v-model="editValue" 
                @blur="saveThreshold(item)" 
                @keyup.enter="saveThreshold(item)"
                @keyup.esc="editingId = null"
                class="w-16 bg-black border border-indigo-500/50 rounded px-2 py-1 text-xs font-bold focus:outline-none"
                ref="thresholdInput"
                autofocus
              />
            </template>
            <template v-else>
              <span class="text-sm font-bold text-gray-400 group-hover/edit:text-white transition-colors">{{ item.threshold }}</span>
              <icon name="ph:pencil-simple-bold"
                class="text-gray-600 opacity-0 group-hover/edit:opacity-100 transition-all group-hover/edit:text-indigo-400" />
            </template>
          </div>
        </template>

        <!-- Last Updated -->
        <template #cell(lastUpdated)="{ item }">
          <span class="text-[10px] font-bold text-gray-600 tracking-wider">{{ item.lastUpdated }}</span>
        </template>

        <!-- Quick Adjust -->
        <template #cell(quickAdjust)="{ item }">
          <div class="inline-flex items-center bg-black border border-white/10 rounded-lg overflow-hidden transition-colors" @click.stop>
            <button class="px-2.5 py-1.5 hover:bg-white/10 hover:text-white text-gray-500 transition-colors"
              @click="$emit('quick-adjust', item, -1)">
              <icon name="ph:minus-bold" class="text-[10px]" />
            </button>
            <span class="text-xs font-bold px-2 min-w-[32px] text-center">{{ item.current }}</span>
            <button class="px-2.5 py-1.5 hover:bg-white/10 hover:text-white text-gray-500 transition-colors"
              @click="$emit('quick-adjust', item, 1)">
              <icon name="ph:plus-bold" class="text-[10px]" />
            </button>
          </div>
        </template>

        <!-- Actions -->
        <template #cell(actions)="{ item }">
          <div class="flex items-center justify-end gap-1 text-gray-500" @click.stop>
            <button
              @click="$emit('view-history', item)"
              class="hover:text-white hover:bg-white/10 p-2 rounded-lg transition-colors border border-transparent hover:border-white/10"
              title="View History">
              <icon name="ph:clock-counter-clockwise-bold" class="w-4 h-4" />
            </button>
            <button @click="$emit('adjust', item)"
              class="hover:text-indigo-400 hover:bg-indigo-500/10 p-2 rounded-lg transition-colors border border-transparent hover:border-indigo-500/20"
              title="Adjust Stock">
              <icon name="ph:sliders-horizontal-bold" class="w-4 h-4" />
            </button>
            <button
              class="hover:text-white hover:bg-white/10 p-2 rounded-lg transition-colors border border-transparent hover:border-white/10">
              <icon name="ph:dots-three-bold" class="w-5 h-5" />
            </button>
          </div>
        </template>
      </VTable>
      <VPagination :total="items.length" :per-page="perPage" :current-page="currentPage"
        @update:current-page="$emit('update:currentPage', $event)" />
    </section>
  </div>
</template>

<script lang="ts" setup>
const headers = [
  { label: 'Product Details', key: 'name', align: 'start' },
  { label: 'Category', key: 'category', align: 'start' },
  { label: 'Current Stock', key: 'current', align: 'start' },
  { label: 'Incoming', key: 'incoming', align: 'start' },
  { label: 'Threshold', key: 'threshold', align: 'start' },
  { label: 'Last Updated', key: 'lastUpdated', align: 'start' },
  { label: 'Quick Adjust', key: 'quickAdjust', align: 'center' },
  { label: 'Actions', key: 'actions', align: 'end' }
]

const props = defineProps<{
  items: any[]
  currentPage: number
}>()

const emit = defineEmits(['adjust', 'quick-adjust', 'view-history', 'update:currentPage'])

const perPage = 4

const paginatedItems = computed(() => {
  const start = (props.currentPage - 1) * perPage
  const end = start + perPage
  return props.items.slice(start, end)
})

const editingId = ref<number | null>(null)
const editValue = ref<number>(0)

const startEditThreshold = (item: any) => {
  editingId.value = item.id
  editValue.value = item.threshold
}

const saveThreshold = (item: any) => {
  if (editingId.value === item.id) {
    item.threshold = Number(editValue.value)
    editingId.value = null
  }
}
</script>