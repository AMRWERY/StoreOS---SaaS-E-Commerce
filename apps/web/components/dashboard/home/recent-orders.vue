<template>
  <div class="h-full">
    <section
      class="bg-bg-primary border border-border-subtle rounded-2xl overflow-hidden flex flex-col h-full"
    >
      <div
        class="p-6 flex justify-between items-center border-b border-border-subtle"
      >
        <h3 class="font-bold text-lg">
          {{ t("dashboard.home.recentOrders") }}
        </h3>
        <VButton
          variant="none"
          className="text-[10px] font-black text-brand tracking-widest hover:underline"
          >{{ t("common.viewAll") }}</VButton
        >
      </div>
      <div class="overflow-x-auto flex-1 h-full">
        <VTable :headers="headers" :items="orders">
          <template #cell(id)="{ item }">
            <span class="font-bold text-tx-secondary">{{ item.id }}</span>
          </template>
          <template #cell(customer)="{ item }">
            <span class="font-bold">{{ item.customer }}</span>
          </template>
          <template #cell(items)="{ item }">
            <span class="text-tx-secondary">{{ item.items }}</span>
          </template>
          <template #cell(total)="{ item }">
            <span class="font-bold">{{ item.total }}</span>
          </template>
          <template #cell(status)="{ item }">
            <span
              :class="[
                getStatusClass(item.status),
                'rounded-full px-2 py-0.5 text-[10px] font-semibold whitespace-nowrap',
              ]"
            >
              {{ item.status }}
            </span>
          </template>
          <template #cell(time)="{ item }">
            <span class="text-xs text-tx-muted">{{ item.time }}</span>
          </template>
        </VTable>
      </div>
    </section>
  </div>
</template>

<script lang="ts" setup>
const { recentOrders: orders } = storeToRefs(useDashboardStore());

const { t } = useI18n();

const headers = computed(() => [
  { label: t("dashboard.orders.orderNumber"), key: "id", align: "start" },
  { label: t("dashboard.orders.customer"), key: "customer", align: "start" },
  { label: t("dashboard.orders.items"), key: "items", align: "start" },
  { label: t("dashboard.orders.total"), key: "total", align: "center" },
  { label: t("dashboard.orders.status"), key: "status", align: "center" },
  { label: t("dashboard.orders.time"), key: "time", align: "end" },
]);

const getStatusClass = (status: string) => {
  switch (status) {
    case "NEW":
      return "bg-accent-dim text-accent";
    case "CONFIRMED":
      return "bg-info-dim text-info";
    case "PROCESSING":
      return "bg-status-yellow-dim text-status-yellow";
    case "SHIPPED":
      return "bg-status-purple-dim text-status-purple";
    case "DELIVERED":
      return "bg-success-dim text-success";
    case "CANCELLED":
      return "bg-danger-dim text-danger";
    default:
      return "bg-bg-elevated text-tx-secondary";
  }
};
</script>