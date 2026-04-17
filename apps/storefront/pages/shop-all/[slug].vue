<template>
  <div>
    <div class="min-h-screen bg-[#08080E] text-[#F0F0FF] selection:bg-[#6366F1]/30 p-6 lg:p-12">
      <!-- --- BREADCRUMBS --- -->
      <VBreadcrumb :items="breadcrumbItems" class="mb-10" />

      <div class="grid grid-cols-1 lg:grid-cols-12 gap-16 max-w-7xl mx-auto">
        <!-- ==========================================
           LEFT: IMAGE GALLERY
           ========================================== -->
        <div class="lg:col-span-6 space-y-6">
          <div
            class="relative w-full lg:max-w-[540px] mx-auto pt-[92%] rounded-[16px] bg-[#0D0D18] border border-[#1C1C30] overflow-hidden group">
            <img :src="productImages[activeImage]"
              class="absolute inset-0 w-full h-full object-cover transition-all duration-700 grayscale-[10%] group-hover:grayscale-0 group-hover:scale-105" />
            <span
              class="absolute top-6 start-6 bg-[#F97316] rounded-full px-4 py-1 text-[10px] font-black text-white tracking-widest shadow-lg shadow-orange-950/20">HOT</span>
          </div>

          <div class="flex gap-4">
            <div v-for="(img, idx) in productImages" :key="idx" @click="activeImage = idx"
              class="flex-1 relative pt-[20%] sm:pt-[15%] lg:pt-[22%] rounded-[12px] bg-[#0D0D18] border cursor-pointer overflow-hidden transition-all duration-300"
              :class="[activeImage === idx ? 'border-[#6366F1] ring-2 ring-[#6366F1]/20' : 'border-[#1C1C30] hover:border-[#262640]']">
              <img :src="img" class="absolute inset-0 w-full h-full object-cover"
                :class="{ 'opacity-50': activeImage !== idx }" />
            </div>
          </div>
        </div>

        <!-- ==========================================
           RIGHT: PRODUCT INFO
           ========================================== -->
        <div class="lg:col-span-6 space-y-10">
          <div>
            <span class="text-[11px] font-black tracking-[0.4em] text-[#6366F1]">Premium Accessories</span>
            <h1 class="mt-2 text-5xl font-bold tracking-tight">Essential Timepiece</h1>

            <div class="mt-6 flex items-baseline gap-4">
              <div class="flex items-baseline gap-2">
                <span class="text-4xl font-bold text-white tracking-tighter">$3,200</span>
              </div>
              <span class="text-[16px] text-[#50506A] line-through">$3,700</span>
              <div
                class="bg-[#10B981]/10 border border-[#10B981]/20 px-2 py-0.5 rounded text-[10px] font-black text-[#10B981] tracking-widest">
                Save $ 500 [14%]
              </div>
            </div>
          </div>

          <p class="text-[15px] leading-relaxed text-[#8888AA] font-normal">
            A meticulously crafted timepiece designed for the modern professional. Featuring a brushed stainless steel
            case and genuine leather strap.
          </p>

          <!-- Color Select -->
          <div class="space-y-4">
            <div class="flex justify-between items-center">
              <h4 class="text-[11px] font-black tracking-[0.2em] text-[#50506A]">Color: <span class="text-[#F0F0FF]">{{
                selectedColor }}</span></h4>
            </div>
            <div class="flex gap-3">
              <div v-for="color in colors" :key="color.name" @click="selectedColor = color.name"
                class="w-8 h-8 rounded-full cursor-pointer p-0.5 border-2 transition-all"
                :class="[selectedColor === color.name ? 'border-[#6366F1]' : 'border-transparent']">
                <div :class="[color.hex, 'w-full h-full rounded-full border border-black/20']"></div>
              </div>
            </div>
          </div>

          <!-- Size Select -->
          <div class="space-y-4">
            <h4 class="text-[11px] font-black tracking-[0.2em] text-[#50506A]">Size</h4>
            <div class="flex gap-2">
              <button v-for="size in ['38mm', '42mm']" :key="size" @click="selectedSize = size"
                class="px-6 py-2 rounded-[8px] border text-[12px] font-bold transition-all"
                :class="[selectedSize === size ? 'bg-[#6366F1] border-[#6366F1] text-white' : 'bg-[#0D0D18] border-[#1C1C30] text-[#8888AA] hover:border-[#8888AA]']">
                {{ size }}
              </button>
            </div>
          </div>

          <!-- Actions -->
          <div class="flex gap-4 pt-4">
            <div class="h-[52px] bg-[#0D0D18] border border-[#1C1C30] rounded-[10px] flex items-center p-1">
              <button @click="decrement"
                class="w-10 h-full flex items-center justify-center text-[#50506A] hover:text-[#F0F0FF] transition-colors">
                <Icon name="solar:minus-linear" class="w-4 h-4" />
              </button>
              <span class="w-10 text-center font-bold">{{ quantity }}</span>
              <button @click="increment"
                class="w-10 h-full flex items-center justify-center text-[#50506A] hover:text-[#F0F0FF] transition-colors">
                <Icon name="solar:plus-linear" class="w-4 h-4" />
              </button>
            </div>
            <button
              class="flex-1 bg-[#6366F1] hover:bg-[#818CF8] text-white rounded-[10px] font-bold text-[14px] tracking-[0.2em] transition-all flex items-center justify-center gap-3 shadow-[0_0_20px_rgba(99,102,241,0.2)]">
              <Icon name="solar:cart-large-minimalistic-bold" class="w-5 h-5" />
              Add to Cart
            </button>
            <button
              class="flex-1 border border-[#1C1C30] hover:bg-white/5 text-[#F0F0FF] rounded-[10px] font-bold text-[14px] tracking-[0.2em] transition-all">
              Buy Now
            </button>
          </div>

          <div class="flex items-center gap-2 pt-4">
            <div class="w-2 h-2 rounded-full bg-[#10B981] shadow-[0_0_8px_rgba(16,185,129,0.5)]"></div>
            <span class="text-[11px] font-bold text-[#10B981] tracking-widest">In Stock</span>
          </div>

          <!-- Accordion Mockup -->
          <div class="border-t border-[#1C1C30] pt-6 space-y-6">
            <div v-for="section in ['Description', 'Specifications', 'Shipping & Returns']" :key="section"
              class="flex justify-between items-center cursor-pointer group">
              <h4 class="text-[12px] font-bold tracking-widest group-hover:text-[#6366F1] transition-colors"
                :class="{ 'text-[#6366F1]': section === 'Description' }">{{ section }}</h4>
              <Icon :name="section === 'Description' ? 'solar:alt-arrow-up-linear' : 'solar:alt-arrow-down-linear'"
                class="w-4 h-4 text-[#50506A]" />
            </div>
            <p class="text-[13px] text-[#50506A] leading-relaxed">
              Every curve and edge of the Essential Timepiece is engineered for aesthetic harmony and functional
              excellence. The sapphire crystal glass provides unmatched scratch resistance.
            </p>
          </div>
        </div>
      </div>

      <!-- ==========================================
         BOTTOM: RELATED PRODUCTS
         ========================================== -->
      <section class="mt-32 border-t border-[#1C1C30] pt-20">
        <div class="flex items-end justify-between mb-8">
          <div>
            <h2 class="text-3xl font-bold tracking-tight">Related Products</h2>
            <p class="text-[13px] text-[#50506A] mt-2">Refined items you might also appreciate.</p>
          </div>
          <nuxt-link-locale to="/shop-all"
            class="text-[11px] font-bold text-[#6366F1] hover:text-[#818CF8] transition-colors tracking-widest flex items-center gap-2">
            View All
            <Icon name="solar:arrow-right-linear" class="w-4 h-4" />
          </nuxt-link-locale>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div v-for="item in relatedProducts" :key="item.id" class="group cursor-pointer h-full">
            <div
              class="h-full flex flex-col rounded-[12px] bg-[#0D0D18] border border-[#1C1C30] p-3 transition-all group-hover:border-[#6366F1]/40 overflow-hidden">
              <!-- Image Wrapper -->
              <div class="relative w-full pt-[100%] rounded-[8px] overflow-hidden bg-black/40 mb-5">
                <img :src="item.img"
                  class="absolute inset-0 w-full h-full object-cover opacity-80 transition-all duration-700 grayscale-[40%] group-hover:grayscale-0 group-hover:scale-105" />
                <div v-if="item.tag"
                  class="absolute top-4 start-4 bg-[#F97316] rounded-full px-3 py-0.5 text-[9px] font-black text-white tracking-widest shadow-lg">
                  {{ item.tag }}
                </div>
              </div>

              <!-- Information -->
              <div class="flex-1 flex flex-col px-1">
                <p class="text-[10px] font-black text-[#50506A] tracking-[0.2em]">{{ item.cat }}</p>
                <h3
                  class="text-[15px] font-medium text-[#8888AA] group-hover:text-[#F0F0FF] transition-colors line-clamp-1">
                  {{ item.name }}
                </h3>
                <p class="mt-auto pt-3 text-[#F0F0FF] font-bold text-[16px]">
                  <span class="text-[11px] text-[#50506A] me-1">$</span>{{ item.price.toLocaleString() }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useCatalogStore } from '@/stores/catalog'

const route = useRoute()

const slugParam = computed(() => String(route.params.slug ?? ''))

const titleFromSlug = (slug: string) => {
  if (!slug) return 'Product'
  return slug
    .split('-')
    .filter(Boolean)
    .map(w => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ')
}

const product = computed(() => ({
  name: titleFromSlug(slugParam.value),
  description: 'A meticulously crafted timepiece designed for the modern professional. Featuring a brushed stainless steel case and genuine leather strap.',
  price: 3200,
  image: '/img/product-07.avif',
}))

const breadcrumbItems = computed(() => [
  { label: 'Home', to: '/' },
  { label: 'Shop All', to: '/shop-all' },
  { label: product.value.name, active: true }
]);

const selectedColor = ref('Silver');
const selectedSize = ref('42mm');
const quantity = ref(1);
const activeImage = ref(0);

const productImages = [
  '/img/product-01.avif',
  '/img/product-02.avif',
  '/img/product-03.avif',
  '/img/product-04.avif'
];

const colors = [
  { name: 'Silver', hex: 'bg-[#E5E7EB]' },
  { name: 'Black', hex: 'bg-[#1F2937]' },
  { name: 'Lavender', hex: 'bg-[#A78BFA]' }
];

const catalogStore = useCatalogStore()
const { relatedProducts } = storeToRefs(catalogStore)

// --- Utilities ---
const increment = () => quantity.value++;
const decrement = () => quantity.value > 1 && quantity.value--;

useSeoMeta({
  title: () => product.value.name,
  description: () => `${product.value.description} Price: $${product.value.price}. Fast shipping.`,
  ogTitle: () => `${product.value.name} | StoreOS Store`,
  ogDescription: () => product.value.description,
  ogType: 'website',
  ogImage: () => product.value.image,
  twitterCard: 'summary_large_image',
  twitterTitle: () => product.value.name,
  twitterDescription: () => product.value.description,
  twitterImage: () => product.value.image,
})
</script>