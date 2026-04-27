<template>
  <div>
    <VBreadcrumb />

    <div class="space-y-6">
      <!-- Top Row -->
      <header class="flex items-center justify-between">
        <div class="flex items-center gap-3">
          <h1 class="text-3xl font-bold tracking-tight">
            {{ t("dashboard.inventory.title") }}
          </h1>
          <span
            class="bg-bg-elevated px-2 py-0.5 rounded text-[10px] font-black text-tx-secondary tracking-widest mt-1"
          >
            {{ totalProducts }} {{ t("dashboard.inventory.total") }}
          </span>
        </div>
        <div class="flex items-center gap-4">
          <VButton
            variant="secondary"
            className="px-5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2"
          >
            <Icon name="ph:file-csv-bold" class="text-sm" />
            {{ t("dashboard.inventory.importCsv") }}
          </VButton>
          <VButton
            @click="$emit('adjust')"
            className="bg-brand hover:bg-brand-hover text-tx-primary px-5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 transition-all shadow-lg shadow-brand/20"
          >
            <Icon name="ph:plus-bold" />
            {{ t("dashboard.inventory.adjustStock") }}
          </VButton>
        </div>
      </header>

      <!-- Search & Filters Row -->
      <div class="flex items-center gap-4">
        <VSearchInput
          :modelValue="search"
          @update:modelValue="$emit('update:search', $event)"
          wrapperClass="flex-1 min-w-[300px]"
          :placeholder="t('dashboard.inventory.searchPlaceholder')"
        />

        <VDropdownMenu width="w-48" align="start">
          <template #trigger="{ open }">
            <button
              :class="
                open
                  ? 'bg-bg-elevated border-border-default'
                  : 'bg-bg-primary border-border-subtle hover:bg-bg-elevated'
              "
              class="flex items-center gap-2 px-5 py-3.5 rounded-2xl text-xs font-bold text-tx-secondary transition-colors"
            >
              {{ t("dashboard.products.category") }}:
              <span class="text-tx-primary ms-1">{{ category }}</span>
              <Icon
                name="ph:caret-down-bold"
                class="transition-transform duration-200"
                :class="open ? 'rotate-180' : ''"
              />
            </button>
          </template>
          <template #default="{ close }">
            <div class="flex flex-col gap-1 p-1">
              <button
                v-for="cat in [
                  'All',
                  'ELECTRONICS',
                  'PERIPHERALS',
                  'DISPLAYS',
                  'FURNITURE',
                ]"
                :key="cat"
                @click="
                  $emit('update:category', cat);
                  close();
                "
                class="text-start px-3 py-2 rounded-xl text-xs font-bold hover:bg-bg-elevated transition-colors"
                :class="
                  category === cat
                    ? 'text-brand bg-brand/5'
                    : 'text-tx-secondary'
                "
              >
                {{ cat }}
              </button>
            </div>
          </template>
        </VDropdownMenu>

        <VDropdownMenu width="w-48" align="start">
          <template #trigger="{ open }">
            <button
              :class="
                open
                  ? 'bg-bg-elevated border-border-default'
                  : 'bg-bg-primary border-border-subtle hover:bg-bg-elevated'
              "
              class="flex items-center gap-2 px-5 py-3.5 rounded-2xl text-xs font-bold text-tx-secondary transition-colors"
            >
              {{ t("dashboard.inventory.stockStatus") }}:
              <span class="text-tx-primary ms-1">{{ status }}</span>
              <Icon
                name="ph:caret-down-bold"
                class="transition-transform duration-200"
                :class="open ? 'rotate-180' : ''"
              />
            </button>
          </template>
          <template #default="{ close }">
            <div class="flex flex-col gap-1 p-1">
              <button
                v-for="st in ['Any', 'In Stock', 'Low Stock', 'Out of Stock']"
                :key="st"
                @click="
                  $emit('update:status', st);
                  close();
                "
                class="text-start px-3 py-2 rounded-xl text-xs font-bold hover:bg-bg-elevated transition-colors"
                :class="
                  status === st ? 'text-brand bg-brand/5' : 'text-tx-secondary'
                "
              >
                {{ st }}
              </button>
            </div>
          </template>
        </VDropdownMenu>

        <button
          @click="clearFilters"
          class="text-[10px] font-black tracking-widest text-brand hover:text-brand hover:underline transition-colors ms-2 shrink-0"
        >
          {{ t("common.clearFilters") }}
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps({
  totalProducts: { type: Number, required: true },
  search: { type: String, default: "" },
  category: { type: String, default: "All" },
  status: { type: String, default: "Any" },
});

const emit = defineEmits([
  "adjust",
  "update:search",
  "update:category",
  "update:status",
]);

const clearFilters = () => {
  emit("update:search", "");
  emit("update:category", "All");
  emit("update:status", "Any");
};
</script>