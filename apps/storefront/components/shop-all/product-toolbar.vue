<template>
  <div class="flex items-center justify-between bg-bg-primary border border-border-subtle rounded-[12px] p-2 px-4 shadow-xl">
    <div class="flex gap-1 p-1 bg-black/20 rounded-[8px]">
      <button @click="$emit('update:viewMode', 'grid')"
        :class="viewMode === 'grid' ? 'bg-border-subtle text-brand shadow-lg shadow-[#6366F1]/10' : 'text-tx-muted'"
        class="p-2 px-4 rounded-[6px] transition-all flex items-center gap-2">
        <Icon name="solar:widget-2-bold" class="w-4 h-4" />
        <span class="text-[11px] font-bold tracking-widest">{{ $t('storefront.shop.grid') }}</span>
      </button>
      <button @click="$emit('update:viewMode', 'list')"
        :class="viewMode === 'list' ? 'bg-border-subtle text-brand shadow-lg shadow-[#6366F1]/10' : 'text-tx-muted'"
        class="p-2 px-4 rounded-[6px] transition-all flex items-center gap-2">
        <Icon name="solar:list-bold" class="w-4 h-4" />
        <span class="text-[11px] font-bold tracking-widest">{{ $t('storefront.shop.list') }}</span>
      </button>
    </div>

    <div class="flex items-center gap-4">
      <span class="text-[10px] font-black text-tx-muted tracking-widest">{{ $t('storefront.shop.sortBy') }}</span>
      <div class="relative group">
        <div
          class="bg-black/20 border border-border-subtle rounded-[8px] p-2 px-4 text-[12px] font-semibold flex items-center gap-6 cursor-pointer hover:border-brand/40 transition-all">
          {{ selectedSort }}
          <Icon name="solar:alt-arrow-down-linear" class="w-4 h-4 text-tx-muted" />
        </div>
        <!-- Mock Dropdown -->
        <div class="absolute top-full end-0 mt-2 w-48 bg-bg-primary border border-border-subtle rounded-xl shadow-2xl opacity-0 translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all z-50 p-2">
          <div v-for="opt in sortOptions" :key="opt" @click="$emit('update:selectedSort', opt)"
            class="px-3 py-2 text-[12px] font-medium text-tx-secondary hover:text-tx-primary hover:bg-border-subtle rounded-lg cursor-pointer transition-all">
            {{ opt }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps<{
  viewMode: 'grid' | 'list';
  selectedSort: string;
}>();

const { t } = useI18n()
const sortOptions = computed(() => [
  t('storefront.shop.popularity'),
  t('storefront.shop.newest'),
  t('storefront.shop.priceLowHigh'),
  t('storefront.shop.priceHighLow'),
])

defineEmits(['update:viewMode', 'update:selectedSort']);
</script>
