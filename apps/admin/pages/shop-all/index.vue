<template>
  <div>
    <div class="space-y-0">
      <div
        class="min-h-screen text-tx-primary selection:bg-brand/30 p-6 lg:p-10"
      >
        <!-- --- BREADCRUMBS --- -->
        <LazyVBreadcrumb :items="breadcrumbItems" />

        <div class="flex flex-col lg:flex-row gap-12 mt-6">
          <!-- SIDEBAR FILTERS -->
          <product-sidebar
            title="All Products"
            :totalItems="248"
            :categories="categories"
            :colors="colors"
            :sizes="sizes"
            v-model="filterState"
            @clear="clearFilters"
          />

          <!-- MAIN PRODUCT LISTING -->
          <main class="flex-1 space-y-8">
            <!-- Toolbar -->
            <product-toolbar
              v-model:viewMode="viewMode"
              v-model:selectedSort="selectedSort"
            />

            <!-- Product Grid -->
            <div
              :class="[
                viewMode === 'grid'
                  ? 'grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6'
                  : 'flex flex-col gap-6',
              ]"
            >
              <product-card
                v-for="p in products"
                :key="p.id"
                :product="p"
                :viewMode="viewMode"
              />
            </div>

            <!-- Pagination & Load More -->
            <div
              class="flex flex-col items-center gap-10 py-12 border-t border-border-subtle"
            >
              <LazyVPagination
                :total="248"
                :perPage="24"
                v-model:currentPage="currentPage"
              />
            </div>
          </main>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { FilterState } from "@/types/products";

const { t } = useI18n();

const viewMode = ref<"grid" | "list">("grid");
const selectedSort = ref("Popularity");
const currentPage = ref(1);

const filterState = ref<FilterState>({
  category: "Electronics",
  priceMin: 0,
  priceMax: 5000,
  selectedSize: "M",
  selectedColor: "Indigo",
});

const clearFilters = () => {
  filterState.value = {
    category: "",
    priceMin: 0,
    priceMax: 5000,
    selectedSize: "",
    selectedColor: "",
  };
};

const breadcrumbItems = [
  { label: "Home", to: "/" },
  { label: "All Products", active: true },
];

const catalogStore = useCatalogStore();
const {
  shopAllProducts: products,
  shopAllCategories: categories,
  shopAllColors: colors,
  shopAllSizes: sizes,
} = storeToRefs(catalogStore);

useSeoMeta({
  title: "All Products",
  description:
    "Browse our full catalog. Filter by category, price, and availability. Fast worldwide shipping on all orders.",
  ogTitle: "All Products | StoreOS Store",
  ogDescription:
    "Browse our full catalog. Filter by category, price, and availability.",
  ogType: "website",
  twitterTitle: "All Products | StoreOS Store",
  twitterDescription: "Browse our full catalog. Fast worldwide shipping.",
});
</script>