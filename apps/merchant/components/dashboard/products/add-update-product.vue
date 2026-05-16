<template>
  <div>
    <div class="min-h-screen text-tx-primary -mt-5">
      <LazyVBreadcrumb
        class="mb-6"
        :overrides="{
          'add-update-product': isEdit
            ? t('dashboard.products.editProduct')
            : t('dashboard.products.createProduct'),
        }"
      />

      <div class="flex items-center gap-6">
        <LazyVBackButton
          to="/dashboard/products"
          :label="t('dashboard.products.title')"
        />
        <div>
          <h1 class="text-3xl font-bold tracking-tight">
            {{
              isEdit
                ? t("dashboard.products.editProduct")
                : t("dashboard.products.createNewProduct")
            }}
          </h1>
          <p class="text-xs text-tx-secondary mt-1 font-medium">
            {{
              isEdit
                ? t("dashboard.products.editSubtitle")
                : t("dashboard.products.createSubtitle")
            }}
          </p>
        </div>
      </div>

      <div
        class="max-w-[1400px] mx-auto px-4 py-3.5 lg:px-4 lg:py-3.5 grid grid-cols-1 lg:grid-cols-12 gap-8 -mt-5"
      >
        <!-- Left Column: Main Editor -->
        <div class="lg:col-span-8 space-y-8">
          <!-- Basic Information -->
          <section
            class="bg-bg-primary border border-border-subtle rounded-2xl px-4 py-3.5"
          >
            <div class="flex justify-between items-center mb-8">
              <h3 class="text-xs font-black tracking-[0.2em] text-tx-secondary">
                {{ t("dashboard.products.basicInfo") }}
              </h3>
              <span class="text-[9px] font-bold text-brand/50"
                >DRAFT-ID: 8823-AQ</span
              >
            </div>

            <div class="space-y-6">
              <LazyVInput
                v-model="product.name"
                :label="t('dashboard.products.productName')"
                placeholder="e.g. Kinetic Series: Modular Rack v2"
                inputClass="!w-full !bg-bg-primary !border-border-default !rounded-xl !px-5 !py-4 !text-lg !font-bold focus:!outline-none focus:!border-brand !transition-colors"
              />

              <div class="space-y-2">
                <label class="text-[10px] font-bold text-tx-muted">{{
                  t("dashboard.products.description")
                }}</label>
                <textarea
                  v-model="product.description"
                  :placeholder="t('dashboard.products.descriptionPlaceholder')"
                  class="w-full bg-bg-primary border border-border-default rounded-xl px-5 py-4 text-sm min-h-[160px] focus:outline-none focus:border-brand resize-y transition-colors"
                ></textarea>
              </div>

              <div class="grid grid-cols-2 gap-6">
                <div class="space-y-2">
                  <label class="text-[10px] font-bold text-tx-muted">{{
                    t("dashboard.products.category")
                  }}</label>
                  <div class="relative">
                    <select
                      v-model="product.category"
                      class="w-full bg-bg-primary border border-border-default rounded-xl px-5 py-4 text-sm appearance-none focus:outline-none focus:border-brand outline-none transition-colors"
                    >
                      <option v-for="cat in categories" :key="cat" :value="cat">
                        {{ cat }}
                      </option>
                    </select>
                    <Icon
                      name="ph:caret-down-bold"
                      class="absolute end-5 top-1/2 -translate-y-1/2 text-tx-muted pointer-events-none"
                    />
                  </div>
                </div>
                <div class="flex items-end pb-3">
                  <button
                    @click="showCategoryModal = true"
                    type="button"
                    class="text-[10px] font-bold text-brand hover:text-brand transition-colors hover:underline"
                  >
                    + {{ t("dashboard.products.createCategory") }}
                  </button>
                </div>
              </div>
            </div>
          </section>

          <!-- Media Assets -->
          <section
            class="bg-bg-primary border border-border-subtle rounded-2xl px-4 py-3.5"
          >
            <div class="flex justify-between items-center mb-8">
              <h3 class="text-xs font-black tracking-[0.2em] text-tx-secondary">
                {{ t("dashboard.products.mediaAssets") }}
              </h3>
            </div>
            <div class="grid grid-cols-3 gap-4">
              <LazyVDropdownMenu
                class="aspect-square [&>div]:h-full [&>div>div:first-child]:h-full"
                wrapperClass="h-full w-full bg-bg-primary border-2 border-dashed border-border-subtle rounded-2xl flex flex-col items-center justify-center group cursor-pointer hover:bg-bg-elevated transition-all"
                icon=""
                title=""
                subtitle=""
              >
                <Icon
                  name="ph:upload-simple-bold"
                  class="text-2xl text-tx-muted group-hover:text-brand mb-2"
                />
                <p class="text-[10px] font-bold text-tx-muted">
                  {{ t("dashboard.products.dragDrop") }}
                </p>
              </LazyVDropdownMenu>
              <div
                class="aspect-square bg-bg-elevated rounded-2xl overflow-hidden border border-border-subtle relative group cursor-pointer"
              >
                <img
                  src="/img/product-01.avif"
                  class="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all opacity-60"
                />
              </div>
              <div
                class="aspect-square bg-bg-elevated rounded-2xl overflow-hidden border border-border-subtle relative group cursor-pointer"
              >
                <img
                  src="/img/product-02.avif"
                  class="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all opacity-60"
                />
                <div
                  class="absolute top-2 end-2 w-5 h-5 bg-bg-overlay rounded-md flex items-center justify-center text-[10px]"
                >
                  2
                </div>
              </div>
            </div>
          </section>

          <!-- Financials -->
          <section
            class="bg-bg-primary border border-border-subtle rounded-2xl px-4 py-3.5"
          >
            <h3
              class="text-xs font-black tracking-[0.2em] text-tx-secondary mb-8"
            >
              {{ t("dashboard.products.financials") }}
            </h3>
            <div class="grid grid-cols-3 gap-6 mb-8">
              <LazyVInput
                v-model="product.price"
                type="number"
                :label="t('dashboard.products.price')"
                inputClass="!bg-bg-primary !border-border-default !rounded-xl !ps-9 !pe-5 !py-4 !text-sm focus:!border-brand !outline-none"
              >
                <template #prefix>
                  <span
                    class="absolute start-5 top-1/2 -translate-y-1/2 text-tx-muted text-sm z-10 pointer-events-none"
                    >$</span
                  >
                </template>
              </LazyVInput>

              <LazyVInput
                v-model="product.comparePrice"
                type="number"
                :label="t('dashboard.products.compareAt')"
                inputClass="!bg-bg-primary !border-border-default !rounded-xl !ps-9 !pe-5 !py-4 !text-sm focus:!border-brand !outline-none"
              >
                <template #prefix>
                  <span
                    class="absolute start-5 top-1/2 -translate-y-1/2 text-tx-muted text-sm z-10 pointer-events-none"
                    >$</span
                  >
                </template>
              </LazyVInput>

              <LazyVInput
                v-model="product.cost"
                type="number"
                :label="t('dashboard.products.costPerItem')"
                inputClass="!bg-bg-primary !border-border-default !rounded-xl !ps-9 !pe-5 !py-4 !text-sm focus:!border-brand !outline-none"
              >
                <template #prefix>
                  <span
                    class="absolute start-5 top-1/2 -translate-y-1/2 text-tx-muted text-sm z-10 pointer-events-none"
                    >$</span
                  >
                </template>
              </LazyVInput>
            </div>
            <div
              class="flex items-center justify-between p-5 bg-bg-elevated border border-border-subtle rounded-2xl"
            >
              <div class="flex items-center gap-4">
                <span class="text-xs text-tx-secondary font-medium"
                  >{{ t("dashboard.products.projectedMargin") }}:</span
                >
                <span
                  class="rounded-full px-2 py-0.5 text-[10px] font-semibold bg-success-dim text-success"
                  >{{ t("dashboard.products.margin") }} : {{ margin }}%</span
                >
              </div>
              <div class="text-end">
                <span class="text-xs text-tx-secondary font-medium me-2"
                  >{{ t("dashboard.products.profit") }}:</span
                >
                <span class="text-lg font-bold text-tx-primary"
                  >${{ profit }}</span
                >
              </div>
            </div>
          </section>
        </div>

        <!-- Right Column: Sidebar Widgets -->
        <aside class="lg:col-span-4 space-y-8 lg:sticky lg:top-8 self-start">
          <!-- Status Card -->
          <section
            class="bg-bg-primary border border-border-subtle rounded-2xl px-4 py-3.5"
          >
            <div class="flex justify-between items-center mb-6">
              <h3 class="text-[10px] font-black text-tx-muted tracking-widest">
                {{ t("dashboard.products.status") }}
              </h3>
              <div class="flex items-center gap-1.5">
                <div
                  class="w-1.5 h-1.5 rounded-full"
                  :class="
                    product.status === 'Active' ? 'bg-success' : 'bg-tx-muted'
                  "
                ></div>
                <span class="text-[10px] font-bold tracking-tighter">{{
                  product.status
                }}</span>
              </div>
            </div>

            <!-- Segmented Control -->
            <div
              class="bg-bg-primary p-1 rounded-xl flex border border-border-subtle mb-6"
            >
              <button
                @click="toggleStatus('Draft')"
                class="flex-1 py-2 text-[10px] font-black tracking-widest rounded-lg transition-all"
                :class="
                  product.status === 'Draft'
                    ? 'bg-bg-elevated text-tx-primary shadow-sm'
                    : 'text-tx-muted'
                "
              >
                {{ t("dashboard.products.draft") }}
              </button>
              <button
                @click="toggleStatus('Active')"
                class="flex-1 py-2 text-[10px] font-black tracking-widest rounded-lg transition-all"
                :class="
                  product.status === 'Active'
                    ? 'bg-brand text-tx-primary shadow-lg'
                    : 'text-tx-muted'
                "
              >
                {{ t("dashboard.products.active") }}
              </button>
            </div>

            <div class="space-y-4 pt-4 border-t border-border-subtle">
              <label
                class="flex items-center justify-between group cursor-pointer"
              >
                <span
                  class="text-xs font-bold text-tx-secondary group-hover:text-tx-primary"
                  >{{ t("dashboard.products.allSalesChannels") }}</span
                >
                <input
                  type="checkbox"
                  checked
                  class="accent-brand w-4 h-4 bg-bg-primary rounded border-border-default"
                />
              </label>
              <label
                class="flex items-center justify-between group cursor-pointer"
              >
                <span
                  class="text-xs font-bold text-tx-secondary group-hover:text-tx-primary"
                  >{{ t("dashboard.products.shopifyInventory") }}</span
                >
                <input
                  type="checkbox"
                  class="accent-brand w-4 h-4 bg-bg-primary rounded border-border-default"
                />
              </label>
            </div>

            <div class="flex gap-3 mt-8">
              <LazyVButton
                variant="none"
                className="flex-1 bg-bg-elevated hover:bg-bg-elevated py-3 rounded-xl text-[10px] font-black tracking-widest transition-colors"
              >
                {{ t("dashboard.products.saveDraft") }}</LazyVButton
              >
              <LazyVButton
                variant="none"
                className="flex-1 bg-brand hover:bg-brand-hover py-3 rounded-xl text-[10px] font-black tracking-widest shadow-lg shadow-brand/20 transition-all"
              >
                {{ t("dashboard.products.publish") }}</LazyVButton
              >
            </div>
          </section>

          <!-- Organization -->
          <section
            class="bg-bg-primary border border-border-subtle rounded-2xl px-4 py-3.5"
          >
            <h3
              class="text-[10px] font-black text-tx-muted tracking-widest mb-6"
            >
              {{ t("dashboard.products.organization") }}
            </h3>
            <div class="space-y-6">
              <div class="space-y-3">
                <label class="text-[9px] font-bold text-tx-muted">{{
                  t("dashboard.products.tags")
                }}</label>
                <div
                  class="bg-bg-primary border border-border-default rounded-xl p-3 flex flex-wrap gap-2"
                >
                  <span
                    v-for="tag in product.tags"
                    :key="tag"
                    class="bg-brand-dim text-brand text-[9px] font-black px-2 py-1 rounded flex items-center gap-1.5"
                  >
                    {{ tag }}
                    <Icon
                      name="ph:x-bold"
                      class="cursor-pointer hover:text-tx-primary"
                    />
                  </span>
                  <input
                    type="text"
                    placeholder="+ Add"
                    class="bg-transparent text-[9px] font-bold outline-none w-12"
                  />
                </div>
              </div>

              <div class="space-y-3">
                <label class="text-[9px] font-bold text-tx-muted">{{
                  t("dashboard.products.collections")
                }}</label>
                <div class="space-y-3">
                  <label
                    v-for="c in [
                      'Winter Collection 2026',
                      'Tools Essentials',
                      'Staff Picks',
                    ]"
                    :key="c"
                    class="flex items-center justify-between group cursor-pointer"
                  >
                    <span
                      class="text-xs font-medium text-tx-secondary group-hover:text-tx-primary"
                      >{{ c }}</span
                    >
                    <input
                      type="checkbox"
                      :checked="c.includes('Winter')"
                      class="accent-brand w-3.5 h-3.5 bg-bg-primary border-border-default rounded"
                    />
                  </label>
                </div>
              </div>
            </div>
          </section>
        </aside>
      </div>
    </div>

    <!-- Dilaog -->
    <LazyVDialog
      v-model="showCategoryModal"
      :title="t('dashboard.products.createCategory')"
      maxWidth="md"
    >
      <div class="space-y-6">
        <LazyVInput
          v-model="newCategoryName"
          :label="t('dashboard.products.categoryName')"
          placeholder="e.g. Peripherals"
          inputClass="!bg-bg-primary !border-border-default !rounded-xl !px-5 !py-4 !text-sm focus:!border-brand"
        />
      </div>
      <template #footer>
        <LazyVButton
          variant="none"
          className="bg-brand hover:bg-brand-hover text-tx-primary px-5 py-2.5 rounded-lg text-xs font-bold shadow-lg shadow-brand/20 transition-all"
          @click="handleCreateCategory"
        >
          {{ t("dashboard.products.createCategory") }}
        </LazyVButton>
      </template>
    </LazyVDialog>
  </div>
</template>

<script lang="ts" setup>
const { t } = useI18n();
const route = useRoute();
const isEdit = computed(() => !!route.query.id);

const showCategoryModal = ref(false);
const newCategoryName = ref("");
const categories = ref(["Hardware Components", "Accessories"]);

const handleCreateCategory = () => {
  if (newCategoryName.value.trim()) {
    categories.value.push(newCategoryName.value.trim());
    product.value.category = newCategoryName.value.trim();
    showCategoryModal.value = false;
    newCategoryName.value = "";
  }
};

const product = ref({
  name: "Kinetic Series: Modular Rack v2",
  description: "Provides detailed specifications and operational features...",
  category: "Hardware Components",
  price: 249.0,
  comparePrice: 0.0,
  cost: 116.55,
  sku: "KNT-MOD-2-BLK",
  barcode: "8123456789",
  quantity: 124,
  status: "Draft", // Draft or Active
  tags: ["MODULAR", "KINETIC"],
  trackInventory: true,
  hasVariants: true,
});

// --- Logic ---
const margin = computed(() => {
  if (!product.value.price) return 0;
  return (
    ((product.value.price - product.value.cost) / product.value.price) *
    100
  ).toFixed(0);
});

const profit = computed(() =>
  (product.value.price - product.value.cost).toFixed(2)
);

const toggleStatus = (status: string) => (product.value.status = status);

definePageMeta({
  layout: "dashboard",
});

useHead({
  titleTemplate: () => "Product Form",
});
</script>