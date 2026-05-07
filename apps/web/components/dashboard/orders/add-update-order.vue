<template>
  <div>
    <div class="min-h-screen bg-bg-base text-tx-primary -mt-4 pb-20">
      <LazyVBreadcrumb
        class="mb-6"
        :overrides="{
          'add-update-order': isEdit
            ? t('dashboard.orders.editOrder')
            : t('dashboard.orders.createOrder'),
        }"
      />

      <!-- Header -->
      <header class="flex items-center justify-between mb-6">
        <div class="flex items-center gap-6">
          <LazyVBackButton
            to="/dashboard/orders"
            :label="t('dashboard.orders.title')"
          />
          <div>
            <h1 class="text-3xl font-bold tracking-tight">
              {{
                isEdit
                  ? t("dashboard.orders.editOrder")
                  : t("dashboard.orders.createNewOrder")
              }}
            </h1>
            <p class="text-xs text-tx-secondary mt-1 font-medium">
              {{
                isEdit
                  ? t("dashboard.orders.editOrderSubtitle")
                  : t("dashboard.orders.createOrderSubtitle")
              }}
            </p>
          </div>
        </div>

        <div class="flex items-center gap-3">
          <LazyVButton
            variant="none"
            to="/dashboard/orders"
            className="px-5 py-2.5 bg-bg-elevated hover:bg-bg-elevated border border-border-subtle rounded-xl text-xs font-bold transition-all text-tx-secondary hover:text-tx-primary"
          >
            {{ t("common.discard") }}
          </LazyVButton>
          <LazyVButton
            @click="saveOrder"
            className="px-8 py-2.5 bg-brand hover:bg-brand-hover text-tx-primary rounded-xl text-xs font-bold transition-all shadow-lg shadow-brand/20"
          >
            {{
              isEdit
                ? t("common.saveChanges")
                : t("dashboard.orders.createOrder")
            }}
          </LazyVButton>
        </div>
      </header>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Left side: Main Form -->
        <div class="lg:col-span-2 space-y-8">
          <!-- Customer Selection -->
          <section
            class="bg-bg-primary border border-border-subtle rounded-2xl px-4 py-3.5"
          >
            <h3
              class="text-xs font-black tracking-[0.15em] flex items-center gap-2 mb-8"
            >
              <Icon name="ph:user-bold" class="text-brand" />
              {{ t("dashboard.orders.customerInfo") }}
            </h3>

            <div class="grid grid-cols-2 gap-6">
              <div class="relative">
                <Icon
                  name="ph:magnifying-glass-bold"
                  class="absolute start-4 top-[38px] text-tx-muted z-10 pointer-events-none"
                />
                <LazyVInput
                  :label="t('dashboard.orders.searchCustomer')"
                  :placeholder="t('dashboard.orders.searchCustomerPlaceholder')"
                  inputClass="!ps-10"
                />
              </div>
              <LazyVInput
                :label="t('dashboard.orders.contactEmail')"
                type="email"
                v-model="form.email"
                placeholder="customer@example.com"
              />
            </div>

            <div
              class="mt-8 p-6 bg-bg-elevated border border-border-subtle rounded-2xl flex items-center justify-between group hover:border-border-default transition-colors cursor-pointer"
            >
              <div class="flex items-center gap-4">
                <div
                  class="w-10 h-10 rounded-full bg-bg-elevated flex items-center justify-center text-tx-muted group-hover:text-brand transition-colors"
                >
                  <Icon name="ph:plus-bold" />
                </div>
                <div>
                  <h4 class="text-sm font-bold">
                    {{ t("dashboard.orders.newCustomer") }}
                  </h4>
                  <p class="text-[10px] text-tx-muted font-medium mt-0.5">
                    {{ t("dashboard.orders.newCustomerDesc") }}
                  </p>
                </div>
              </div>
              <Icon
                name="ph:caret-right-bold"
                class="text-tx-muted group-hover:text-tx-primary transition-colors"
              />
            </div>
          </section>

          <!-- Order Items -->
          <section
            class="bg-bg-primary border border-border-subtle rounded-2xl overflow-hidden"
          >
            <div
              class="p-6 border-b border-border-subtle flex justify-between items-center bg-bg-elevated"
            >
              <h3
                class="text-xs font-black tracking-[0.15em] flex items-center gap-2"
              >
                <Icon name="ph:package-bold" class="text-brand" />
                {{ t("dashboard.orders.productSelection") }}
              </h3>
              <LazyVButton
                variant="none"
                className="text-[10px] font-black text-brand tracking-widest flex items-center gap-1.5 hover:text-tx-primary transition-colors"
              >
                <Icon name="ph:plus-circle-bold" class="text-sm" />
                {{ t("dashboard.products.addProduct") }}
              </LazyVButton>
            </div>

            <div class="px-4 py-3.5">
              <div
                v-if="form.items.length === 0"
                class="py-12 flex flex-col items-center text-center"
              >
                <div
                  class="w-16 h-16 bg-bg-elevated rounded-2xl flex items-center justify-center text-tx-muted mb-4 border border-border-subtle"
                >
                  <Icon name="ph:shopping-cart-bold" class="text-2xl" />
                </div>
                <h4 class="text-sm font-bold text-tx-secondary">
                  {{ t("dashboard.orders.noProductsYet") }}
                </h4>
                <p class="text-[10px] text-tx-muted mt-1 max-w-[200px]">
                  {{ t("dashboard.orders.noProductsDesc") }}
                </p>
              </div>

              <div v-else class="space-y-3">
                <div
                  v-for="item in form.items"
                  :key="item.id"
                  class="flex items-center gap-4 p-4 bg-bg-elevated border border-border-subtle rounded-2xl group hover:border-border-default transition-all"
                >
                  <img
                    :src="item.image"
                    class="w-14 h-14 rounded-xl object-cover border border-border-subtle grayscale opacity-70"
                  />
                  <div class="flex-1 min-w-0">
                    <h5 class="text-sm font-bold truncate">{{ item.name }}</h5>
                    <p class="text-[10px] text-tx-muted font-bold mt-0.5">
                      {{ item.variant }}
                    </p>
                    <p class="text-[9px] text-tx-muted font-medium">
                      SKU: {{ item.sku }}
                    </p>
                  </div>
                  <div class="flex items-center gap-3 shrink-0">
                    <div
                      class="flex items-center gap-1 bg-bg-primary border border-border-default rounded-lg overflow-hidden"
                    >
                      <LazyVButton
                        variant="none"
                        className="px-2.5 py-1.5 text-tx-secondary hover:text-tx-primary transition-colors text-xs"
                        @click="item.qty = Math.max(1, item.qty - 1)"
                      >
                        <Icon name="ph:minus-bold" />
                      </LazyVButton>
                      <span
                        class="text-xs font-bold px-2 min-w-[24px] text-center"
                        >{{ item.qty }}</span
                      >
                      <LazyVButton
                        variant="none"
                        className="px-2.5 py-1.5 text-tx-secondary hover:text-tx-primary transition-colors text-xs"
                        @click="item.qty++"
                      >
                        <Icon name="ph:plus-bold" />
                      </LazyVButton>
                    </div>
                    <span
                      class="text-sm font-bold text-brand min-w-[60px] text-end"
                      >${{ (item.price * item.qty).toFixed(2) }}</span
                    >
                    <LazyVButton
                      variant="none"
                      className="p-1.5 text-tx-muted hover:text-danger transition-colors opacity-0 group-hover:opacity-100"
                      @click="
                        form.items = form.items.filter((i) => i.id !== item.id)
                      "
                    >
                      <Icon name="ph:x-bold" class="text-xs" />
                    </LazyVButton>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <!-- Order Notes -->
          <section
            class="bg-bg-primary border border-border-subtle rounded-2xl px-4 py-3.5"
          >
            <h3
              class="text-xs font-black tracking-[0.15em] flex items-center gap-2 mb-8"
            >
              <Icon name="ph:notebook-bold" class="text-brand" />
              {{ t("dashboard.orders.orderNotes") }}
            </h3>
            <textarea
              v-model="form.notes"
              :placeholder="t('dashboard.orders.orderNotesPlaceholder')"
              class="w-full bg-bg-primary border border-border-default rounded-2xl p-5 text-sm h-32 focus:outline-none focus:border-brand transition-colors placeholder:text-tx-muted resize-none"
            ></textarea>
          </section>
        </div>

        <!-- Right side: Meta Panels -->
        <aside class="space-y-8">
          <!-- Status & Tags -->
          <section
            class="bg-bg-primary border border-border-subtle rounded-2xl p-6 shadow-2xl"
          >
            <h3
              class="text-[10px] font-black text-tx-muted tracking-widest mb-6 px-1"
            >
              {{ t("dashboard.orders.orderStatus") }}
            </h3>
            <div class="space-y-6">
              <div class="space-y-2">
                <label
                  class="text-[9px] font-bold text-tx-muted tracking-widest ps-1"
                  >{{ t("dashboard.orders.paymentStatus") }}</label
                >
                <select
                  v-model="form.paymentStatus"
                  class="w-full bg-bg-primary border border-border-default rounded-xl py-2.5 px-4 text-xs font-bold focus:outline-none focus:border-brand transition-all select-scrollbar cursor-pointer appearance-none"
                >
                  <option value="PAID">Paid</option>
                  <option value="UNPAID">Unpaid</option>
                  <option value="COD">Cash on Delivery</option>
                </select>
              </div>
              <div class="space-y-2">
                <label
                  class="text-[9px] font-bold text-tx-muted tracking-widest ps-1"
                  >{{ t("dashboard.orders.fulfillmentStatus") }}</label
                >
                <select
                  v-model="form.status"
                  class="w-full bg-bg-primary border border-border-default rounded-xl py-2.5 px-4 text-xs font-bold focus:outline-none focus:border-brand transition-all select-scrollbar cursor-pointer appearance-none"
                >
                  <option value="NEW">New</option>
                  <option value="CONFIRMED">Confirmed</option>
                  <option value="PROCESSING">Processing</option>
                  <option value="SHIPPED">Shipped</option>
                  <option value="DELIVERED">Delivered</option>
                </select>
              </div>
            </div>
          </section>

          <!-- Summary Statistics -->
          <section
            class="bg-bg-primary border border-border-subtle rounded-2xl p-6 shadow-2xl relative overflow-hidden"
          >
            <div
              class="absolute -end-8 -top-8 w-24 h-24 bg-brand/5 rounded-full blur-2xl"
            ></div>
            <h3
              class="text-[10px] font-black text-tx-muted tracking-widest mb-8 px-1 relative z-10"
            >
              {{ t("dashboard.orders.orderSummary") }}
            </h3>

            <div class="space-y-4 relative z-10 px-1">
              <div class="flex justify-between text-xs font-bold text-tx-muted">
                <span>{{ t("dashboard.orders.subtotal") }}</span>
                <span class="text-tx-primary">$0.00</span>
              </div>
              <div class="flex justify-between text-xs font-bold text-tx-muted">
                <span>{{ t("dashboard.orders.shipping") }}</span>
                <span class="text-tx-primary">$0.00</span>
              </div>
              <div class="flex justify-between text-xs font-bold text-tx-muted">
                <span>{{ t("dashboard.orders.discount") }}</span>
                <span class="text-danger">-$0.00</span>
              </div>
              <div
                class="flex justify-between items-center pt-4 border-t border-border-subtle"
              >
                <span
                  class="text-sm font-black text-tx-primary tracking-widest"
                  >{{ t("dashboard.orders.total") }}</span
                >
                <span class="text-2xl font-bold text-brand">$0.00</span>
              </div>
            </div>
          </section>

          <!-- Tags Panel -->
          <section
            class="bg-bg-primary border border-border-subtle rounded-2xl p-6 shadow-2xl"
          >
            <h3
              class="text-[10px] font-black text-tx-muted tracking-widest mb-6 px-1"
            >
              {{ t("dashboard.orders.tagsAndCategory") }}
            </h3>
            <div class="space-y-4">
              <LazyVInput
                :placeholder="t('dashboard.orders.addTagPlaceholder')"
              />
              <div class="flex flex-wrap gap-2 pt-2">
                <span
                  v-for="tag in ['Manual', 'B2B', 'Urgent']"
                  :key="tag"
                  class="bg-bg-elevated text-tx-secondary text-[9px] font-black px-2.5 py-1 rounded tracking-wider border border-border-subtle hover:text-tx-primary hover:border-border-default transition-all cursor-default"
                >
                  {{ tag }}
                </span>
              </div>
            </div>
          </section>
        </aside>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const { t } = useI18n();
const localePath = useLocalePath();
const route = useRoute();
const isEdit = computed(() => !!route.query.id);

const form = reactive({
  email: "ethan.l@designstack.io",
  items: [
    {
      id: 1,
      name: "Velocity Elite Runner",
      variant: "Size: 42 | Crimson",
      sku: "VER-42-CRIM",
      image: "/img/product-01.avif",
      price: 189,
      qty: 1,
    },
    {
      id: 2,
      name: "Urban Stealth Hoodie",
      variant: "Size: L | Charcoal",
      sku: "USH-L-CHA",
      image: "/img/product-02.avif",
      price: 95,
      qty: 2,
    },
    {
      id: 3,
      name: "Minimal Leather Watch",
      variant: "Black Dial | Brown Strap",
      sku: "MLW-BK-BR",
      image: "/img/product-03.avif",
      price: 340,
      qty: 1,
    },
  ] as any[],
  notes: "",
  status: "NEW",
  paymentStatus: "UNPAID",
});

const saveOrder = () => {
  console.log("Saving order...", form);
  setTimeout(() => {
    navigateTo(localePath("/dashboard/orders"));
  }, 1000);
};
</script>