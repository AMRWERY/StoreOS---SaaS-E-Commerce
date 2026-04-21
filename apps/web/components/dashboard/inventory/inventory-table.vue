<template>
  <div>
    <section class="bg-bg-primary border border-border-subtle rounded-2xl overflow-hidden shadow-2xl">
      <div class="px-4 py-3.5 border-b border-border-subtle flex justify-between items-center bg-bg-elevated">
        <h2 class="font-bold flex items-center gap-2">
          <Icon name="ph:squares-four-bold" class="text-brand" />{{ $t('dashboard.inventory.inventoryList') }}
        </h2>
        <div class="flex items-center gap-4">
          <span class="text-[10px] font-bold text-tx-muted">{{ $t('dashboard.inventory.showing', { count: items.length }) }}</span>
        </div>
      </div>

      <VTable :headers="headers" :items="paginatedItems">
        <!-- Product Details -->
        <template #cell(name)="{ item }">
          <div class="flex items-center gap-4">
            <div class="relative w-11 h-11 rounded-lg overflow-hidden border border-border-subtle bg-black">
              <img :src="item.image"
                class="w-full h-full object-cover grayscale opacity-80 group-hover/row:grayscale-0 group-hover/row:opacity-100 transition-all" />
            </div>
            <div class="min-w-0">
              <h4 class="text-sm font-bold truncate">{{ item.name }}</h4>
              <p class="text-[10px] text-tx-secondary font-bold tracking-widest mt-0.5">SKU: {{ item.sku }}</p>
            </div>
          </div>
        </template>

        <!-- Category -->
        <template #cell(category)="{ item }">
          <span class="text-[10px] font-black text-tx-secondary tracking-wider bg-bg-elevated px-2 py-1 rounded">
            {{ item.category }}
          </span>
        </template>

        <!-- Current Stock -->
        <template #cell(current)="{ item }">
          <div v-if="item.current === 0" class="text-[11px] font-black tracking-widest text-danger">{{ $t('dashboard.inventory.outOfStock') }}</div>
          <div v-else-if="item.current <= item.threshold" class="text-[11px] font-black tracking-widest text-accent">
            {{ $t('dashboard.inventory.low') }}: {{ item.current }}
          </div>
          <div v-else class="text-[11px] font-black tracking-widest text-success">{{ item.current }}</div>
        </template>

        <!-- Incoming -->
        <template #cell(incoming)="{ item }">
          <span v-if="item.incoming > 0" class="text-sm font-bold text-brand">+{{ item.incoming }}</span>
          <span v-else class="text-sm font-bold text-tx-muted">-</span>
        </template>

        <!-- Threshold (Inline Edit) -->
        <template #cell(threshold)="{ item }">
          <div class="flex items-center gap-2 group/edit cursor-pointer w-fit" @click.stop="startEditThreshold(item)">
            <template v-if="editingId === item.id">
              <input type="number" v-model="editValue" @blur="saveThreshold(item)" @keyup.enter="saveThreshold(item)"
                @keyup.esc="editingId = null"
                class="w-16 bg-black border border-indigo-500/50 rounded px-2 py-1 text-xs font-bold focus:outline-none"
                ref="thresholdInput" autofocus />
            </template>
            <template v-else>
              <span class="text-sm font-bold text-tx-secondary group-hover/edit:text-tx-primary transition-colors">{{
                item.threshold }}</span>
              <Icon name="ph:pencil-simple-bold"
                class="text-tx-muted opacity-0 group-hover/edit:opacity-100 transition-all group-hover/edit:text-brand" />
            </template>
          </div>
        </template>

        <!-- Last Updated -->
        <template #cell(lastUpdated)="{ item }">
          <span class="text-[10px] font-bold text-tx-muted tracking-wider">{{ item.lastUpdated }}</span>
        </template>

        <!-- Quick Adjust -->
        <template #cell(quickAdjust)="{ item }">
          <div
            class="inline-flex items-center bg-black border border-border-default rounded-lg overflow-hidden transition-colors"
            @click.stop>
            <button class="px-2.5 py-1.5 hover:bg-bg-elevated hover:text-tx-primary text-tx-secondary transition-colors"
              @click="$emit('quick-adjust', item, -1)">
              <Icon name="ph:minus-bold" class="text-[10px]" />
            </button>
            <span class="text-xs font-bold px-2 min-w-[32px] text-center">{{ item.current }}</span>
            <button class="px-2.5 py-1.5 hover:bg-bg-elevated hover:text-tx-primary text-tx-secondary transition-colors"
              @click="$emit('quick-adjust', item, 1)">
              <Icon name="ph:plus-bold" class="text-[10px]" />
            </button>
          </div>
        </template>

        <!-- Actions -->
        <template #cell(actions)="{ item }">
          <div class="flex items-center justify-end gap-1 text-tx-secondary" @click.stop>
            <button @click="$emit('view-history', item)"
              class="hover:text-tx-primary hover:bg-bg-elevated p-2 rounded-lg transition-colors border border-transparent hover:border-border-default"
              title="View History">
              <Icon name="ph:clock-counter-clockwise-bold" class="w-4 h-4" />
            </button>
            <button @click="$emit('adjust', item)"
              class="hover:text-brand hover:bg-brand-dim p-2 rounded-lg transition-colors border border-transparent hover:border-brand/20"
              title="Adjust Stock">
              <Icon name="ph:sliders-horizontal-bold" class="w-4 h-4" />
            </button>
            <button
              class="hover:text-tx-primary hover:bg-bg-elevated p-2 rounded-lg transition-colors border border-transparent hover:border-border-default">
              <Icon name="ph:dots-three-bold" class="w-5 h-5" />
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
const { t } = useI18n()

const headers = computed(() => [
  { label: t('dashboard.inventory.productDetails'), key: 'name', align: 'start' },
  { label: t('dashboard.inventory.category'), key: 'category', align: 'start' },
  { label: t('dashboard.inventory.currentStock'), key: 'current', align: 'start' },
  { label: t('dashboard.inventory.incoming'), key: 'incoming', align: 'start' },
  { label: t('dashboard.inventory.threshold'), key: 'threshold', align: 'start' },
  { label: t('dashboard.inventory.lastUpdated'), key: 'lastUpdated', align: 'start' },
  { label: t('dashboard.inventory.quickAdjust'), key: 'quickAdjust', align: 'center' },
  { label: t('common.actions'), key: 'actions', align: 'end' }
])

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