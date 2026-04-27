<template>
  <div>
    <section
      class="bg-bg-primary border border-border-subtle rounded-2xl overflow-hidden shadow-2xl"
    >
      <div
        class="px-4 py-3.5 flex justify-between items-center bg-bg-elevated border-b border-border-subtle"
      >
        <h2 class="font-bold text-lg">
          {{ t("dashboard.settings.shipping.configuredZones") }}
        </h2>
        <div class="flex items-center gap-4 text-tx-secondary">
          <button class="hover:text-tx-primary transition-colors">
            <Icon name="ph:sliders-horizontal-bold" />
          </button>
          <button class="hover:text-tx-primary transition-colors">
            <Icon name="ph:dots-three-vertical-bold" />
          </button>
        </div>
      </div>

      <VTable :headers="headers" :items="zones" tableClass="w-full text-start">
        <template #cell(name)="{ item }">
          <span
            class="text-sm font-bold group-hover:text-tx-primary transition-colors"
            >{{ item.name }}</span
          >
        </template>

        <template #cell(regions)="{ item }">
          <div class="flex items-center gap-1.5 flex-wrap">
            <span
              v-for="region in item.regions"
              :key="region"
              class="bg-bg-elevated text-[9px] font-black text-tx-secondary px-2 py-0.5 rounded tracking-tighter"
            >
              {{ region }}
            </span>
            <span
              v-if="item.extraCount"
              class="text-[9px] font-bold text-tx-muted"
              >+{{ item.extraCount }}</span
            >
          </div>
        </template>

        <template #cell(flatPrice)="{ item }">
          <div class="flex items-center justify-end gap-2">
            <span class="text-[10px] font-bold text-tx-muted">$</span>
            <span class="text-sm font-bold text-tx-secondary">{{
              item.flatPrice
            }}</span>
          </div>
        </template>

        <template #cell(freeAbove)="{ item }">
          <div class="flex items-center justify-end gap-2">
            <span
              v-if="item.freeAbove !== 'NOT AVAILABLE'"
              class="text-[10px] font-bold text-tx-muted"
              >$</span
            >
            <span
              :class="[
                item.freeAbove === 'NOT AVAILABLE'
                  ? 'italic text-tx-muted text-[10px]'
                  : 'text-sm font-bold text-tx-secondary',
              ]"
            >
              {{ item.freeAbove }}
            </span>
          </div>
        </template>
      </VTable>

      <div class="p-6 border-t border-border-subtle text-center">
        <button
          class="text-[10px] font-black tracking-[0.2em] text-tx-muted hover:text-brand transition-colors flex items-center justify-center gap-2 mx-auto"
        >
          <Icon name="ph:caret-up-down-bold" />
          {{ t("dashboard.settings.shipping.viewAllZones") }}
        </button>
      </div>
    </section>
  </div>
</template>

<script lang="ts" setup>
import type { TableHeader } from "@storeos/ui/types/v-table";
import type { ShippingZone } from "@/types/shipping-logistics";

const { t } = useI18n();

const headers = computed<TableHeader[]>(() => [
  { label: t("dashboard.settings.shipping.zoneName"), key: "name" },
  { label: t("dashboard.settings.shipping.regions"), key: "regions" },
  {
    label: t("dashboard.settings.shipping.flatPrice"),
    key: "flatPrice",
    align: "end",
  },
  {
    label: t("dashboard.settings.shipping.freeAbove"),
    key: "freeAbove",
    align: "end",
  },
]);

const zones = ref<ShippingZone[]>([
  {
    name: "Domestic - US",
    regions: ["ALL_US"],
    extraCount: 2,
    flatPrice: "5.00",
    freeAbove: "75.00",
  },
  {
    name: "European Union",
    regions: ["DE", "FR", "IT"],
    extraCount: 24,
    flatPrice: "18.50",
    freeAbove: "150.00",
  },
  {
    name: "Asia Pacific",
    regions: ["JP", "SG", "AU"],
    flatPrice: "22.00",
    freeAbove: "NOT AVAILABLE",
  },
  {
    name: "Canada & Mexico",
    regions: ["CA", "MX"],
    flatPrice: "12.00",
    freeAbove: "100.00",
  },
]);
</script>