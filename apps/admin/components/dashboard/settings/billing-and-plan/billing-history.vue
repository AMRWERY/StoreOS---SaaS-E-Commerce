<template>
  <div>
    <section
      class="lg:col-span-12 bg-bg-primary border border-border-subtle rounded-2xl overflow-hidden"
    >
      <!-- Section header -->
      <div
        class="px-4 py-3.5 flex justify-between items-center border-b border-border-subtle"
      >
        <div>
          <h3 class="font-bold text-lg">
            {{ t("dashboard.settings.billing.billingHistory") }}
          </h3>
          <p class="text-xs text-tx-muted font-medium mt-1">
            {{ t("dashboard.settings.billing.billingHistoryDesc") }}
          </p>
        </div>
        <div class="flex gap-3">
          <button
            class="p-2.5 bg-bg-elevated border border-border-subtle rounded-xl text-tx-secondary hover:text-tx-primary transition-colors"
          >
            <Icon name="ph:sliders-horizontal-bold" />
          </button>
          <button
            class="p-2.5 bg-bg-elevated border border-border-subtle rounded-xl text-tx-secondary hover:text-tx-primary transition-colors"
          >
            <Icon name="ph:export-bold" />
          </button>
        </div>
      </div>

      <!-- VTable -->
      <div class="p-4">
        <LazyVTable :headers="headers" :items="invoices">
          <template #cell(id)="{ item }">
            <span
              class="text-xs font-bold text-tx-secondary group-hover:text-brand transition-colors"
            >
              {{ item.id }}
            </span>
          </template>
          <template #cell(date)="{ item }">
            <span class="text-sm font-medium text-tx-secondary">{{
              item.date
            }}</span>
          </template>
          <template #cell(amount)="{ item }">
            <span class="text-sm font-bold text-tx-primary">{{
              item.amount
            }}</span>
          </template>
          <template #cell(status)="{ item }">
            <span
              class="rounded-full px-2 py-0.5 text-[10px] font-semibold bg-success-dim text-success"
            >
              {{ item.status }}
            </span>
          </template>
          <template #cell(action)="{}">
            <button class="text-tx-muted hover:text-brand transition-colors">
              <Icon name="ph:download-simple-bold" class="text-lg" />
            </button>
          </template>
        </LazyVTable>
        <button
          class="w-full py-6 text-[10px] font-black tracking-widest text-tx-muted hover:text-tx-primary transition-colors"
        >
          {{ t("dashboard.settings.billing.viewAllInvoices") }}
        </button>
      </div>
    </section>
  </div>
</template>

<script lang="ts" setup>
import type { TableHeader } from "@storeos/ui/types/v-table";

const { t } = useI18n();

const headers = computed<TableHeader[]>(() => [
  { label: t("dashboard.settings.billing.invoiceId"), key: "id" },
  { label: t("dashboard.orders.date"), key: "date" },
  { label: t("dashboard.settings.billing.amount"), key: "amount" },
  { label: t("common.status"), key: "status", align: "center" },
  { label: t("common.actions"), key: "action", align: "end" },
]);

const invoices = [
  {
    id: "INV-2026-009",
    date: "Sep 24, 2026",
    amount: "$261.50",
    status: "PAID",
  },
  {
    id: "INV-2026-008",
    date: "Aug 24, 2026",
    amount: "$249.00",
    status: "PAID",
  },
  {
    id: "INV-2026-007",
    date: "Jul 24, 2026",
    amount: "$249.00",
    status: "PAID",
  },
];
</script>