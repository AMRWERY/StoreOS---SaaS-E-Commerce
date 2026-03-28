<template>
  <div>
    <div class="space-y-0">
      <div class="min-h-screen text-[#F0F0FF] selection:bg-[#6366F1]/30 p-6 lg:p-10">
        <!-- --- BREADCRUMBS --- -->
        <VBreadcrumb :items="breadcrumbItems" />

        <div class="flex flex-col lg:flex-row gap-12 mt-6">
          <!-- SIDEBAR FILTERS -->
          <product-sidebar title="All Products" :totalItems="248" :categories="categories" :colors="colors"
            :sizes="sizes" v-model="filterState" @clear="clearFilters" />

          <!-- MAIN PRODUCT LISTING -->
          <main class="flex-1 space-y-8">
            <!-- Toolbar -->
            <product-toolbar v-model:viewMode="viewMode" v-model:selectedSort="selectedSort" />

            <!-- Product Grid -->
            <div :class="[
              viewMode === 'grid'
                ? 'grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6'
                : 'flex flex-col gap-6'
            ]">
              <product-card v-for="p in products" :key="p.id" :product="p" :viewMode="viewMode" />
            </div>

            <!-- Pagination & Load More -->
            <div class="flex flex-col items-center gap-10 py-12 border-t border-[#1C1C30]">
              <VPagination :total="248" :perPage="24" v-model:currentPage="currentPage" />
            </div>
          </main>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { FilterState } from '@/types/products';

const viewMode = ref<'grid' | 'list'>('grid');
const selectedSort = ref('Popularity');
const currentPage = ref(1);

const filterState = ref<FilterState>({
  category: 'Electronics',
  priceMin: 0,
  priceMax: 5000,
  selectedSize: 'M',
  selectedColor: 'Indigo'
});

const clearFilters = () => {
  filterState.value = {
    category: '',
    priceMin: 0,
    priceMax: 5000,
    selectedSize: '',
    selectedColor: ''
  };
};

const breadcrumbItems = [
  { label: 'Home', to: '/' },
  { label: 'All Products', active: true }
];

// --- Mock Data ---
const categories = ['Apparel', 'Electronics', 'Home Decor', 'Beauty', 'Accessories'];

const sizes = ['S', 'M', 'L', 'XL', 'XXL'];

const colors = [
  { name: 'Indigo', bg: 'bg-[#6366F1]' },
  { name: 'White', bg: 'bg-[#FFFFFF]' },
  { name: 'Purple', bg: 'bg-[#A78BFA]' },
  { name: 'Green', bg: 'bg-[#10B981]' },
  { name: 'Red', bg: 'bg-[#EF4444]' }
];

const products = [
  { id: 1, name: 'AeroSprint Pro Trainer', cat: 'FOOTWEAR', price: 2499, oldPrice: 3200, tag: 'NEW', tagColor: 'bg-[#6366F1]', img: '/img/product-09.avif' },
  { id: 2, name: 'Sonic-X Studio Headphones', cat: 'AUDIO', price: 4850, tag: 'SALE', tagColor: 'bg-[#F97316]', img: '/img/product-010.avif' },
  { id: 3, name: 'Core Chronograph Silver', cat: 'ACCESSORIES', price: 1200, img: '/img/product-011.avif' },
  { id: 4, name: 'Titanium Aviator Shade', cat: 'EYEWEAR', price: 3400, img: '/img/product-012.avif' },
  { id: 5, name: 'Retro-M Digital Compact', cat: 'PHOTOGRAPHY', price: 9800, img: '/img/product-013.avif' },
  { id: 6, name: 'Volt Matrix Runner', cat: 'FOOTWEAR', price: 2150, img: '/img/product-014.avif' },
  { id: 7, name: 'Hydra-Rich Night Serum', cat: 'BEAUTY', price: 950, tag: 'NEW', tagColor: 'bg-[#6366F1]', img: '/img/product-015.avif' },
  { id: 8, name: 'Insta-Flex Classic Camera', cat: 'PHOTOGRAPHY', price: 1890, img: '/img/product-016.avif' },
];

useSeoMeta({
  title: 'All Products',
  description: 'Browse our full catalog. Filter by category, price, and availability. Fast worldwide shipping on all orders.',
  ogTitle: 'All Products | StoreOS Store',
  ogDescription: 'Browse our full catalog. Filter by category, price, and availability.',
  ogType: 'website',
  twitterTitle: 'All Products | StoreOS Store',
  twitterDescription: 'Browse our full catalog. Fast worldwide shipping.',
});
</script>