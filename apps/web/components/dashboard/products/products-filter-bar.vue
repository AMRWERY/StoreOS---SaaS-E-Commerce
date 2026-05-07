<template>
  <div>
    <div
      class="bg-bg-primary border border-border-subtle rounded-2xl p-3 flex flex-col md:flex-row items-center justify-between gap-4 mb-8"
    >
      <!-- Dropdowns -->
      <div class="flex flex-wrap items-center gap-3">
        <VDropdownMenu width="w-48" align="start">
          <template #trigger="{ open }">
            <VButton
              variant="none"
              :className="`flex items-center gap-2 px-4 py-2 bg-bg-overlay border border-border-subtle rounded-xl text-xs font-bold transition-all ${
                open
                  ? 'text-tx-primary border-border-default'
                  : 'text-tx-secondary hover:text-tx-primary'
              }`"
            >
              {{ t("dashboard.products.category") }}:
              <span class="text-tx-primary">{{ selectedCategory }}</span>
              <Icon
                name="ph:caret-down-bold"
                :class="`transition-transform ${open ? 'rotate-180' : ''}`"
              />
            </VButton>
          </template>

          <template #default="{ close }">
            <div class="flex flex-col gap-1">
              <button
                v-for="cat in categories"
                :key="cat"
                @click="selectCategory(cat, close)"
                :class="`text-start px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                  selectedCategory === cat
                    ? 'bg-brand/20 text-brand'
                    : 'text-tx-secondary hover:bg-bg-elevated hover:text-tx-primary'
                }`"
              >
                {{ cat }}
              </button>
            </div>
          </template>
        </VDropdownMenu>

        <!-- Status Dropdown -->
        <VDropdownMenu width="w-48" align="start">
          <template #trigger="{ open }">
            <VButton
              variant="none"
              :className="`flex items-center gap-2 px-4 py-2 bg-bg-overlay border border-border-subtle rounded-xl text-xs font-bold transition-all ${
                open
                  ? 'text-tx-primary border-border-default'
                  : 'text-tx-secondary hover:text-tx-primary'
              }`"
            >
              {{ t("dashboard.products.status") }}:
              <span :class="selectedStatus.colorClass">{{
                selectedStatus.label
              }}</span>
              <div
                v-if="selectedStatus.dotClass"
                :class="`w-1.5 h-1.5 rounded-full ${selectedStatus.dotClass}`"
              ></div>
              <Icon
                name="ph:caret-down-bold"
                :class="`transition-transform ${open ? 'rotate-180' : ''}`"
              />
            </VButton>
          </template>

          <template #default="{ close }">
            <div class="flex flex-col gap-1">
              <button
                v-for="status in statuses"
                :key="status.label"
                @click="selectStatus(status, close)"
                :class="`text-start px-3 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${
                  selectedStatus.label === status.label
                    ? 'bg-brand/20 text-brand'
                    : 'text-tx-secondary hover:bg-bg-elevated hover:text-tx-primary'
                }`"
              >
                <span>{{ status.label }}</span>
                <div
                  v-if="status.dotClass"
                  :class="`w-1.5 h-1.5 rounded-full ${status.dotClass} ms-auto`"
                ></div>
              </button>
            </div>
          </template>
        </VDropdownMenu>

        <!-- Stock Dropdown -->
        <VDropdownMenu width="w-48" align="start">
          <template #trigger="{ open }">
            <VButton
              variant="none"
              :className="`flex items-center gap-2 px-4 py-2 bg-bg-overlay border border-border-subtle rounded-xl text-xs font-bold transition-all ${
                open
                  ? 'text-tx-primary border-border-default'
                  : 'text-tx-secondary hover:text-tx-primary'
              }`"
            >
              {{ t("dashboard.products.stock") }}:
              <span class="text-tx-primary">{{ selectedStock }}</span>
              <Icon
                name="ph:caret-down-bold"
                :class="`transition-transform ${open ? 'rotate-180' : ''}`"
              />
            </VButton>
          </template>

          <template #default="{ close }">
            <div class="flex flex-col gap-1">
              <button
                v-for="stock in stockOptions"
                :key="stock"
                @click="selectStock(stock, close)"
                :class="`text-start px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                  selectedStock === stock
                    ? 'bg-brand/20 text-brand'
                    : 'text-tx-secondary hover:bg-bg-elevated hover:text-tx-primary'
                }`"
              >
                {{ stock }}
              </button>
            </div>
          </template>
        </VDropdownMenu>
      </div>

      <!-- View Mode Toggle -->
      <div
        class="flex items-center bg-bg-overlay p-1 rounded-xl border border-border-subtle"
      >
        <VButton
          variant="none"
          @click="$emit('update:viewMode', 'grid')"
          :className="`p-2 rounded-lg transition-all ${
            viewMode === 'grid' ? 'bg-brand/20 text-brand' : 'text-tx-muted'
          }`"
        >
          <Icon name="ph:grid-four-fill" />
        </VButton>
        <VButton
          variant="none"
          @click="$emit('update:viewMode', 'list')"
          :className="`p-2 rounded-lg transition-all ${
            viewMode === 'list' ? 'bg-brand/20 text-brand' : 'text-tx-muted'
          }`"
        >
          <Icon name="ph:list-bold" />
        </VButton>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const { t } = useI18n()
const props = defineProps<{
  viewMode: string;
}>();

const emit = defineEmits<{
  (e: "update:viewMode", value: string): void;
  (e: "update:category", value: string): void;
  (e: "update:status", value: string): void;
  (e: "update:stock", value: string): void;
}>();

const categories = ["All", "ELECTRONICS", "FASHION", "BEAUTY", "FURNITURE"];
const selectedCategory = ref("All");

const selectCategory = (category: string, close: () => void) => {
  selectedCategory.value = category;
  emit("update:category", category);
  close();
};

const statuses = [
  { label: "All", colorClass: "text-tx-primary", dotClass: "" },
  { label: "Active", colorClass: "text-success", dotClass: "bg-success" },
  {
    label: "Draft",
    colorClass: "text-tx-secondary",
    dotClass: "bg-tx-secondary",
  },
  { label: "Archived", colorClass: "text-accent", dotClass: "bg-amber-500" },
];

const selectedStatus = ref(statuses[1]); // Default to Active as in previous hardcoded mode

const selectStatus = (status: any, close: () => void) => {
  selectedStatus.value = status;
  emit("update:status", status.label);
  close();
};

const stockOptions = ["Filter", "In Stock", "Low Stock", "Out of Stock"];
const selectedStock = ref("Filter");

const selectStock = (stock: string, close: () => void) => {
  selectedStock.value = stock;
  emit("update:stock", stock);
  close();
};
</script>