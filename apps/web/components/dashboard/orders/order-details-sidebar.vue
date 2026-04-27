<template>
  <div>
    <div
      class="fixed inset-0 z-50 overflow-hidden"
      @click.self="$emit('close')"
    >
      <div
        class="absolute inset-0 bg-bg-overlay backdrop-blur-sm transition-opacity"
      ></div>
      <aside
        class="absolute end-0 top-0 h-full w-full max-w-[480px] bg-bg-primary border-s border-border-subtle shadow-2xl flex flex-col transform transition-transform duration-300"
      >
        <div class="px-4 py-3.5 flex-1 overflow-y-auto hide-scrollbar">
          <!-- Detail Header -->
          <div class="flex justify-between items-center mb-6">
            <div class="flex items-center gap-3">
              <span class="text-sm font-bold text-brand"
                >#SO-{{ order.id }}</span
              >
              <span
                :class="[
                  getOrderStatusClass(order.orderStatus),
                  'rounded-full px-2 py-0.5 text-[10px] font-semibold',
                ]"
                >{{ order.orderStatus }}</span
              >
            </div>
            <VButton
              @click="$emit('close')"
              variant="none"
              className="w-10 h-10 flex items-center justify-center bg-bg-elevated hover:bg-bg-elevated rounded-xl text-tx-secondary hover:text-tx-primary transition-colors"
            >
              <Icon name="ph:x-bold" />
            </VButton>
          </div>

          <!-- Customer Info -->
          <div class="mb-6">
            <h3
              class="text-[10px] font-black text-tx-muted tracking-[0.2em] mb-6"
            >
              {{ t("dashboard.orders.customerInfo") }}
            </h3>
            <div class="flex items-center gap-4 mb-6">
              <div
                :class="[
                  order.avatarBg,
                  'w-12 h-12 rounded-xl flex items-center justify-center text-sm font-black border border-border-subtle',
                ]"
              >
                {{ order.initials }}
              </div>
              <div>
                <h4 class="font-bold text-tx-primary">{{ order.customer }}</h4>
                <p class="text-xs text-tx-secondary">
                  {{ order.email || "ethan.laurent@designstack.io" }}
                </p>
              </div>
            </div>
            <div
              class="bg-bg-elevated border border-border-subtle rounded-2xl p-5"
            >
              <div class="flex justify-between items-start mb-2">
                <span class="text-[10px] font-black text-tx-secondary">{{
                  t("dashboard.orders.shipping")
                }}</span>
                <Icon name="ph:map-pin-bold" class="text-tx-muted" />
              </div>
              <p class="text-xs text-tx-secondary leading-relaxed font-medium">
                88 Market St, Suite 200<br />San Francisco, CA 94103
              </p>
            </div>
          </div>

          <!-- Items -->
          <div>
            <div class="flex justify-between items-center mb-6">
              <h3 class="text-[10px] font-black text-tx-muted tracking-[0.2em]">
                {{ t("dashboard.orders.items") }} ({{ order.itemsCount }})
              </h3>
              <VButton
                variant="none"
                className="text-[10px] font-bold text-brand hover:underline"
                @click="
                  navigateTo({
                    path: localePath('/dashboard/orders/order-form'),
                    query: { id: order.id },
                  })
                "
                >{{ t("dashboard.orders.edit") }}
              </VButton>
            </div>
            <div class="space-y-4">
              <div v-for="i in 2" :key="i" class="flex items-center gap-4">
                <div
                  class="w-12 h-12 bg-bg-elevated border border-border-subtle rounded-xl overflow-hidden shrink-0"
                >
                  <img
                    :src="`/img/product-0${(i % 3) + 1}.avif`"
                    class="w-full h-full object-cover grayscale opacity-80"
                  />
                </div>
                <div class="flex-1 min-w-0">
                  <h5 class="text-xs font-bold truncate text-tx-primary">
                    Velocity Elite Runner
                  </h5>
                  <p class="text-[10px] text-tx-muted font-medium">
                    Size 42 | Color: Crimson
                  </p>
                </div>
                <div class="text-end">
                  <p class="text-xs font-bold text-tx-primary">$189.00</p>
                  <p class="text-[10px] text-tx-muted font-black">×1</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Price Summary -->
          <div class="mt-12 pt-8 border-t border-border-subtle space-y-4">
            <div
              class="flex justify-between text-xs font-bold text-tx-secondary"
            >
              <span>{{ t("dashboard.orders.subtotal") }}</span>
              <span>$1,088.00</span>
            </div>
            <div
              class="flex justify-between text-xs font-bold text-tx-secondary"
            >
              <span>{{ t("dashboard.orders.shippingExpress") }}</span>
              <span>$162.00</span>
            </div>
            <div class="flex justify-between items-end pt-4">
              <span
                class="text-sm font-black text-tx-primary tracking-widest"
                >{{ t("dashboard.orders.total") }}</span
              >
              <span class="text-xl font-bold text-brand"
                >${{ order.total }}</span
              >
            </div>
          </div>
        </div>

        <!-- Detail Footer Actions -->
        <div class="p-6 border-t border-border-subtle bg-bg-primary flex gap-3">
          <VButton
            className="flex-1 bg-brand hover:bg-brand-hover text-tx-primary py-3.5 rounded-xl text-xs font-black tracking-widest transition-all shadow-lg shadow-brand/10"
          >
            {{ t("dashboard.orders.confirmOrder") }}
          </VButton>
          <VButton
            variant="none"
            className="w-12 h-12 bg-bg-elevated hover:bg-bg-elevated border border-border-subtle rounded-xl flex items-center justify-center transition-colors"
          >
            <Icon name="ph:printer-bold" class="text-lg text-tx-secondary" />
          </VButton>
        </div>
      </aside>
    </div>
  </div>
</template>

<script lang="ts" setup>
const localePath = useLocalePath();

defineProps<{
  order: any;
}>();

defineEmits(["close"]);

const getOrderStatusClass = (status: string) => {
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
    case "REFUNDED":
      return "bg-danger-dim text-danger";
    default:
      return "bg-bg-elevated text-tx-secondary";
  }
};
</script>